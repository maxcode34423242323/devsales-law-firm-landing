import { NextResponse } from "next/server";
import crypto from "node:crypto";

function verifyCalendlySignature(rawBody: string, signatureHeader: string | null, signingKey: string) {
  if (!signatureHeader) return false;
  const parts = Object.fromEntries(
    signatureHeader.split(",").map((kv) => kv.split("=") as [string, string]),
  );
  const t = parts.t;
  const v1 = parts.v1;
  if (!t || !v1) return false;

  const expected = crypto.createHmac("sha256", signingKey).update(`${t}.${rawBody}`).digest("hex");
  const expectedBuf = Buffer.from(expected);
  const receivedBuf = Buffer.from(v1);
  if (expectedBuf.length !== receivedBuf.length) return false;
  return crypto.timingSafeEqual(expectedBuf, receivedBuf);
}

function escapeTelegramHtml(value: unknown) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

async function sendTelegramMessage(text: string) {
  const botToken = process.env.TELEGRAM_BOT_TOKEN?.trim();
  const chatId = process.env.TELEGRAM_CHAT_ID?.trim();
  if (!botToken || !chatId) {
    console.error("TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID is missing — skipping Telegram notification.");
    return;
  }
  await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chat_id: chatId, text, parse_mode: "HTML", disable_web_page_preview: true }),
    cache: "no-store",
  });
}

async function upsertHubSpotContact(token: string, email: string, fullName: string, phone: string) {
  const [firstname, ...rest] = fullName.trim().split(/\s+/);
  const properties = { email, firstname: firstname || "", lastname: rest.join(" "), phone };

  const createRes = await fetch("https://api.hubapi.com/crm/v3/objects/contacts", {
    method: "POST",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify({ properties }),
  });

  if (createRes.ok) {
    const created = await createRes.json();
    return created.id as string;
  }

  if (createRes.status === 409) {
    const existingRes = await fetch(
      `https://api.hubapi.com/crm/v3/objects/contacts/${encodeURIComponent(email)}?idProperty=email`,
      { headers: { Authorization: `Bearer ${token}` } },
    );
    if (existingRes.ok) {
      const existing = await existingRes.json();
      await fetch(`https://api.hubapi.com/crm/v3/objects/contacts/${existing.id}`, {
        method: "PATCH",
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
        body: JSON.stringify({ properties }),
      });
      return existing.id as string;
    }
  }

  throw new Error(`HubSpot contact upsert failed: ${createRes.status} ${await createRes.text()}`);
}

async function createHubSpotDeal(token: string, contactId: string, dealName: string, utm: Record<string, string>) {
  const dealRes = await fetch("https://api.hubapi.com/crm/v3/objects/deals", {
    method: "POST",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      properties: { dealname: dealName, ...utm },
      associations: [
        { to: { id: contactId }, types: [{ associationCategory: "HUBSPOT_DEFINED", associationTypeId: 3 }] },
      ],
    }),
  });
  if (!dealRes.ok) {
    throw new Error(`HubSpot deal creation failed: ${dealRes.status} ${await dealRes.text()}`);
  }
}

type CalendlyTracking = {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
};

type CalendlyInviteePayload = {
  email?: string;
  name?: string;
  first_name?: string;
  last_name?: string;
  text_reminder_number?: string;
  tracking?: CalendlyTracking;
};

export async function POST(req: Request) {
  const rawBody = await req.text();
  const signingKey = process.env.CALENDLY_WEBHOOK_SIGNING_KEY?.trim();

  if (signingKey) {
    const signatureHeader = req.headers.get("calendly-webhook-signature");
    if (!verifyCalendlySignature(rawBody, signatureHeader, signingKey)) {
      return NextResponse.json({ success: false, error: "Invalid signature." }, { status: 401 });
    }
  } else {
    console.error("CALENDLY_WEBHOOK_SIGNING_KEY is missing — accepting webhook without signature verification.");
  }

  let body: { event?: string; payload?: CalendlyInviteePayload };
  try {
    body = JSON.parse(rawBody);
  } catch {
    return NextResponse.json({ success: false, error: "Invalid JSON." }, { status: 400 });
  }

  if (body.event !== "invitee.created") {
    return NextResponse.json({ success: true, ignored: true });
  }

  const invitee = body.payload || {};
  const email = invitee.email || "";
  const name = invitee.name || [invitee.first_name, invitee.last_name].filter(Boolean).join(" ") || "Not provided";
  const phone = invitee.text_reminder_number || "Not provided";
  const tracking = invitee.tracking || {};

  const field = (value: unknown) => escapeTelegramHtml(value || "Not provided");
  const telegramText = [
    "📅 <b>New Calendly booking — DevilSales Web</b>",
    "",
    `👤 <b>Name:</b> ${field(name)}`,
    `📧 <b>Email:</b> ${field(email)}`,
    `📱 <b>Phone:</b> ${field(phone)}`,
    "",
    "📊 <b>Attribution:</b>",
    `UTM source: ${field(tracking.utm_source)}`,
    `UTM medium: ${field(tracking.utm_medium)}`,
    `UTM campaign: ${field(tracking.utm_campaign)}`,
    `UTM term: ${field(tracking.utm_term)}`,
    `UTM content: ${field(tracking.utm_content)}`,
    "",
    `🕒 <b>Booked:</b> ${escapeTelegramHtml(new Date().toISOString())}`,
  ].join("\n");

  await sendTelegramMessage(telegramText);

  const hubspotToken = process.env.HUBSPOT_ACCESS_TOKEN?.trim();
  if (hubspotToken && email) {
    try {
      const contactId = await upsertHubSpotContact(hubspotToken, email, name, phone);
      await createHubSpotDeal(hubspotToken, contactId, `${name} — Calendly booking`, {
        utm_source: tracking.utm_source || "",
        utm_medium: tracking.utm_medium || "",
        utm_campaign: tracking.utm_campaign || "",
        utm_term: tracking.utm_term || "",
      });
    } catch (hubspotError) {
      console.error("HubSpot sync failed:", hubspotError);
    }
  }

  return NextResponse.json({ success: true });
}
