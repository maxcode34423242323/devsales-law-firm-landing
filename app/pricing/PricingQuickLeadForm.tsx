"use client";

import { FormEvent, useState } from "react";
import { motion } from "framer-motion";
import { trackEvent, splitName, normalizeUsPhone, isValidUsPhone } from "../lib/track";

type Status = "idle" | "submitting" | "success" | "error";

export default function PricingQuickLeadForm({ onClose }: { onClose: () => void }) {
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");
  const [form, setForm] = useState({
    fullName: "",
    companyName: "",
    businessEmail: "",
    phone: "",
    industry: "",
    budget: "",
  });

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!form.fullName.trim() || !form.companyName.trim() || !form.businessEmail.trim() || !form.phone.trim() || !form.industry.trim() || !form.budget) {
      setStatus("error");
      setMessage("Please fill in every field.");
      return;
    }
    if (!/^\S+@\S+\.\S+$/.test(form.businessEmail)) {
      setStatus("error");
      setMessage("Enter a valid email address.");
      return;
    }
    if (!isValidUsPhone(form.phone)) {
      setStatus("error");
      setMessage("Enter a valid 10-digit US phone number.");
      return;
    }

    setStatus("submitting");
    setMessage("");
    try {
      const params = new URLSearchParams(window.location.search);
      const keys = ["gclid", "utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"];
      const tracking: Record<string, string> = { landingPage: window.location.href, referrer: document.referrer };
      for (const key of keys) {
        tracking[key] = params.get(key) || sessionStorage.getItem(`ds_${key}`) || "";
      }

      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          phone: normalizeUsPhone(form.phone),
          country: "United States",
          serviceNeeded: "To be discussed",
          projectDetails: "Submitted via the quick contact popup.",
          smsConsent: true,
          leadSource: "Pricing page — quick popup",
          ...tracking,
        }),
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok || result.success === false) throw new Error(result.error || "Submission failed.");

      const { firstName, lastName } = splitName(form.fullName);
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: "form_submit_success",
        email: form.businessEmail,
        phone_number: normalizeUsPhone(form.phone),
        first_name: firstName,
        last_name: lastName,
        budget_tier: form.budget,
      });
      window.dataLayer.push({
        event: "pricing_lead",
        budget_tier: form.budget,
        service_needed: "Quick popup",
        industry: form.industry,
      });
      trackEvent("quick_form_submit_success");
      setStatus("success");
      setMessage("Thank you. We received your details and will contact you shortly.");
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "Something went wrong. Please try again.");
    }
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="pr-quick-overlay" onClick={onClose}>
      <motion.div initial={{ opacity: 0, y: 24, scale: .96 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 16, scale: .97 }} transition={{ duration: .3, ease: [.22, 1, .36, 1] }} className="pr-quick-modal" onClick={event => event.stopPropagation()}>
        <button type="button" className="pr-quick-close" onClick={onClose} aria-label="Close">×</button>
        {status === "success" ? (
          <div className="pr-quick-success">
            <span className="pr-success-check" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M4 12.5 9.5 18 20 6" /></svg></span>
            <h3>Message sent</h3>
            <p>{message}</p>
          </div>
        ) : (
          <form onSubmit={submit} noValidate>
            <h3>Book a Call</h3>
            <p className="pr-quick-sub">Get a callback from our team — takes 30 seconds.</p>
            <label><span>Full name</span><input value={form.fullName} onChange={e => setForm(f => ({ ...f, fullName: e.target.value }))} placeholder="Your name" autoComplete="name" /></label>
            <label><span>Company name</span><input value={form.companyName} onChange={e => setForm(f => ({ ...f, companyName: e.target.value }))} placeholder="Company name" autoComplete="organization" /></label>
            <label><span>Email</span><input type="email" value={form.businessEmail} onChange={e => setForm(f => ({ ...f, businessEmail: e.target.value }))} placeholder="you@email.com" autoComplete="email" required /></label>
            <label><span>Phone</span><input type="tel" value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} placeholder="(315) 547-8952" autoComplete="tel" required /></label>
            <label><span>Industry</span><input value={form.industry} onChange={e => setForm(f => ({ ...f, industry: e.target.value }))} placeholder="e.g. Auto dealership, HVAC, Law firm" /></label>
            <label><span>Project budget</span>
              <select value={form.budget} onChange={e => setForm(f => ({ ...f, budget: e.target.value }))}>
                <option value="">Select budget</option>
                <option>$3,000 - $10,000</option>
                <option>$10,000 - $20,000</option>
                <option>$20,000 - $50,000</option>
                <option>$50,000+</option>
              </select>
            </label>
            {message && status === "error" && <p className="pr-quick-error">{message}</p>}
            <button type="submit" className="pr-quick-submit" disabled={status === "submitting"}>{status === "submitting" ? "Submitting..." : "Submit"}</button>
          </form>
        )}
      </motion.div>
    </motion.div>
  );
}
