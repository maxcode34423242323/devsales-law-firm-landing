import { NextResponse } from "next/server";

type ContactRequestBody = {
  fullName?: string;
  companyName?: string;
  businessEmail?: string;
  phone?: string;
  country?: string;
  industry?: string;
  serviceNeeded?: string;
  budget?: string;
  projectDetails?: string;
  companySize?: string;
  timeline?: string;
  smsConsent?: boolean;
  leadSource?: string;
  gclid?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
  landingPage?: string;
  referrer?: string;
};

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidPhone(phone: string) {
  return /^\+1[\s.-]?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/.test(phone.trim());
}

function escapeTelegramHtml(value: unknown) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

async function upsertHubSpotContact(token: string, body: ContactRequestBody) {
  const [firstname, ...rest] = String(body.fullName).trim().split(/\s+/);
  const properties = {
    email: body.businessEmail,
    firstname: firstname || "",
    lastname: rest.join(" "),
    phone: body.phone,
    company: body.companyName,
  };

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
      `https://api.hubapi.com/crm/v3/objects/contacts/${encodeURIComponent(String(body.businessEmail))}?idProperty=email`,
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

// HubSpot's budget_tier/service_needed Deal properties are fixed-option
// dropdowns with exact allowed strings, different from what the site's
// forms display to visitors — map to the closest allowed option instead
// of sending the raw value (HubSpot rejects the whole Deal otherwise).
const HUBSPOT_BUDGET_TIER: Record<string, string> = {
  "Below $10,000": "Below $10,000",
  "$10,000 - $20,000": "$10,000–$20,000",
  "$20,000 - $50,000": "$20,000–$50,000",
  "$10,000 - $25,000": "$10,000–$20,000",
  "$25,000 - $50,000": "$20,000–$50,000",
  "$50,000+": "$50,000+",
};

const HUBSPOT_SERVICE_NEEDED: Record<string, string> = {
  "New custom law firm website": "New Website",
  "Law firm website redesign": "Website Redesign",
  "Website Redesign": "Website Redesign",
};

function mapToHubSpotOption(map: Record<string, string>, value?: string) {
  return value ? map[value] : undefined;
}

async function createHubSpotDeal(token: string, contactId: string, body: ContactRequestBody) {
  const properties: Record<string, string> = {
    dealname: `${body.companyName} — ${body.leadSource || "Web form"}`,
    gclid: body.gclid || "",
    utm_source: body.utm_source || "",
    utm_medium: body.utm_medium || "",
    utm_campaign: body.utm_campaign || "",
    utm_term: body.utm_term || "",
  };
  const budgetTier = mapToHubSpotOption(HUBSPOT_BUDGET_TIER, body.budget);
  const serviceNeeded = mapToHubSpotOption(HUBSPOT_SERVICE_NEEDED, body.serviceNeeded);
  if (budgetTier) properties.budget_tier = budgetTier;
  if (serviceNeeded) properties.service_needed = serviceNeeded;

  const dealRes = await fetch("https://api.hubapi.com/crm/v3/objects/deals", {
    method: "POST",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      properties,
      associations: [
        {
          to: { id: contactId },
          types: [{ associationCategory: "HUBSPOT_DEFINED", associationTypeId: 3 }],
        },
      ],
    }),
  });

  if (!dealRes.ok) {
    throw new Error(`HubSpot deal creation failed: ${dealRes.status} ${await dealRes.text()}`);
  }
}

async function syncToHubSpot(body: ContactRequestBody) {
  const token = process.env.HUBSPOT_ACCESS_TOKEN?.trim();
  if (!token) {
    console.error("HUBSPOT_ACCESS_TOKEN is missing — skipping HubSpot sync.");
    return;
  }
  const contactId = await upsertHubSpotContact(token, body);
  await createHubSpotDeal(token, contactId, body);
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as ContactRequestBody;
    const requiredFields: Array<keyof ContactRequestBody> = [
      "fullName",
      "companyName",
      "businessEmail",
      "phone",
      "country",
      "industry",
      "serviceNeeded",
      "budget",
      "projectDetails",
    ];

    for (const field of requiredFields) {
      if (!body[field] || !String(body[field]).trim()) {
        return NextResponse.json(
          { success: false, error: `Missing required field: ${field}` },
          { status: 400 },
        );
      }
    }

    if (!isValidEmail(String(body.businessEmail))) {
      return NextResponse.json(
        { success: false, error: "Invalid email address." },
        { status: 400 },
      );
    }

    if (!isValidPhone(String(body.phone))) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid US phone number. Include +1, for example +1 315 547 8952.",
        },
        { status: 400 },
      );
    }

    if (body.smsConsent !== true) {
      return NextResponse.json(
        { success: false, error: "SMS consent is required before submitting this form." },
        { status: 400 },
      );
    }

    const botToken = process.env.TELEGRAM_BOT_TOKEN?.trim();
    const chatId = process.env.TELEGRAM_CHAT_ID?.trim();

    if (!botToken || !chatId) {
      console.error("TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID is missing.");
      return NextResponse.json(
        { success: false, error: "Server configuration error." },
        { status: 500 },
      );
    }

    const field = (value: unknown) => escapeTelegramHtml(value || "Not provided");
    const telegramText = [
      "🔥 <b>New DevilSales Web lead</b>",
      "",
      `👤 <b>Name:</b> ${field(body.fullName)}`,
      `🏢 <b>Company:</b> ${field(body.companyName)}`,
      `🌎 <b>Country:</b> ${field(body.country)}`,
      "",
      `📧 <b>Email:</b> ${field(body.businessEmail)}`,
      `📱 <b>Phone:</b> ${field(body.phone)}`,
      "",
      `🏭 <b>Industry:</b> ${field(body.industry)}`,
      `🛠 <b>Service:</b> ${field(body.serviceNeeded)}`,
      `💰 <b>Budget:</b> ${field(body.budget)}`,
      `👥 <b>Company size:</b> ${field(body.companySize)}`,
      `⏳ <b>Timeline:</b> ${field(body.timeline)}`,
      "",
      "📝 <b>Project details:</b>",
      field(body.projectDetails),
      "",
      "✅ <b>SMS consent:</b> YES",
      "",
      "📊 <b>Attribution:</b>",
      `Source: ${field(body.leadSource)}`,
      `GCLID: ${field(body.gclid)}`,
      `UTM source: ${field(body.utm_source)}`,
      `UTM medium: ${field(body.utm_medium)}`,
      `UTM campaign: ${field(body.utm_campaign)}`,
      `UTM term: ${field(body.utm_term)}`,
      `UTM content: ${field(body.utm_content)}`,
      `Landing page: ${field(body.landingPage)}`,
      `Referrer: ${field(body.referrer)}`,
      "",
      `🕒 <b>Submitted:</b> ${escapeTelegramHtml(new Date().toISOString())}`,
    ].join("\n");

    const telegramResponse = await fetch(
      `https://api.telegram.org/bot${botToken}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: chatId,
          text: telegramText,
          parse_mode: "HTML",
          disable_web_page_preview: true,
        }),
        cache: "no-store",
      },
    );

    const telegramResult = await telegramResponse.json().catch(() => null);

    if (!telegramResponse.ok || !telegramResult?.ok) {
      console.error("Telegram delivery failed:", telegramResult ?? telegramResponse.statusText);
      return NextResponse.json(
        { success: false, error: "Telegram delivery failed." },
        { status: 502 },
      );
    }

    try {
      await syncToHubSpot(body);
    } catch (hubspotError) {
      console.error("HubSpot sync failed:", hubspotError);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { success: false, error: "Contact submission failed." },
      { status: 500 },
    );
  }
}
