"use client";

import { FormEvent, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { splitName } from "../lib/track";

type Status = "idle" | "submitting" | "success" | "error";

type FormState = {
  fullName: string;
  companyName: string;
  businessEmail: string;
  phone: string;
  budget: string;
  serviceNeeded: string;
  projectDetails: string;
  smsConsent: boolean;
};

const initialForm: FormState = {
  fullName: "",
  companyName: "",
  businessEmail: "",
  phone: "",
  budget: "",
  serviceNeeded: "",
  projectDetails: "",
  smsConsent: false,
};

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

export default function LeadForm() {
  const [step, setStep] = useState<1 | 2>(1);
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");
  const [form, setForm] = useState<FormState>(initialForm);
  const [tracking] = useState<Record<string, string>>(() => {
    if (typeof window === "undefined") return {};
    const params = new URLSearchParams(window.location.search);
    const keys = ["gclid", "utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"];
    const captured: Record<string, string> = {
      landingPage: window.location.href,
      referrer: document.referrer,
    };
    for (const key of keys) {
      const value = params.get(key) || sessionStorage.getItem(`ds_${key}`) || "";
      if (value) sessionStorage.setItem(`ds_${key}`, value);
      captured[key] = value;
    }
    return captured;
  });

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm(current => ({ ...current, [key]: value }));
  }

  function continueToStepTwo() {
    if (!form.fullName.trim() || !form.companyName.trim() || !form.businessEmail.trim() || !form.phone.trim()) {
      setStatus("error");
      setMessage("Complete all four contact fields before continuing.");
      return;
    }
    if (!/^\S+@\S+\.\S+$/.test(form.businessEmail)) {
      setStatus("error");
      setMessage("Enter a valid business email address.");
      return;
    }
    setStatus("idle");
    setMessage("");
    setStep(2);
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event: "law_firm_form_step_1_complete" });
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!form.budget || !form.serviceNeeded || !form.smsConsent) {
      setStatus("error");
      setMessage("Select a budget and service, and accept SMS consent.");
      return;
    }

    setStatus("submitting");
    setMessage("");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          country: "United States",
          industry: "Personal Injury Law Firm",
          leadSource: "Law firm Google Ads landing page",
          ...tracking,
        }),
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok || result.success === false) throw new Error(result.error || "Submission failed.");

      const qualified = form.budget !== "Below $10,000";
      const { firstName, lastName } = splitName(form.fullName);
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: "form_submit_success",
        email: form.businessEmail,
        phone_number: form.phone,
        first_name: firstName,
        last_name: lastName,
      });
      window.dataLayer.push({
        event: qualified ? "law_firm_qualified_lead" : "law_firm_below_budget_lead",
        budget_tier: form.budget,
        service_needed: form.serviceNeeded,
      });
      setForm(initialForm);
      setStep(1);
      setStatus("success");
      setMessage("Thank you. We received your project brief and will contact you shortly.");
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "Something went wrong. Please try again.");
    }
  }

  return (
    <div className="law-form-wrap" id="project-brief">
      <div className="law-form-offset" aria-hidden="true" />
      <form className="law-form" onSubmit={submit} noValidate>
        <div className="law-form-head">
          <div>
            <p className="section-kicker">[ Project brief ]</p>
            <h2>Send us a message</h2>
            <p>Fields marked with * are required.</p>
          </div>
          <span>0{step} / 02</span>
        </div>

        <div className="law-form-progress"><i style={{ width: step === 1 ? "50%" : "100%" }} /></div>

        {step === 1 ? (
          <div className="law-form-step">
            <div className="law-form-grid">
              <Field label="Full name *"><input value={form.fullName} onChange={e => update("fullName", e.target.value)} placeholder="Your name" autoComplete="name" /></Field>
              <Field label="Law firm name *"><input value={form.companyName} onChange={e => update("companyName", e.target.value)} placeholder="Firm name" autoComplete="organization" /></Field>
              <Field label="Business email *"><input type="email" value={form.businessEmail} onChange={e => update("businessEmail", e.target.value)} placeholder="you@lawfirm.com" autoComplete="email" /></Field>
              <Field label="US phone number *"><input type="tel" value={form.phone} onChange={e => update("phone", e.target.value)} placeholder="+1 315 547 8952" autoComplete="tel" /></Field>
            </div>
            <button type="button" className="law-form-primary" onClick={continueToStepTwo}><span>Submit</span><b>↗︎</b></button>
          </div>
        ) : (
          <div className="law-form-step">
            <div className="law-form-grid">
              <Field label="Project budget *">
                <select value={form.budget} onChange={e => update("budget", e.target.value)}>
                  <option value="">Select budget</option>
                  <option>Below $10,000</option>
                  <option>$10,000 - $20,000</option>
                  <option>$20,000 - $50,000</option>
                  <option>$50,000+</option>
                </select>
              </Field>
              <Field label="Service needed *">
                <select value={form.serviceNeeded} onChange={e => update("serviceNeeded", e.target.value)}>
                  <option value="">Select service</option>
                  <option>New custom law firm website</option>
                  <option>Law firm website redesign</option>
                </select>
              </Field>
              <Field label="Project details (optional)" wide>
                <textarea value={form.projectDetails} onChange={e => update("projectDetails", e.target.value)} placeholder="Write a message..." rows={5} />
              </Field>
            </div>
            <label className={`law-consent ${form.smsConsent ? "checked" : ""}`}>
              <input type="checkbox" checked={form.smsConsent} onChange={e => update("smsConsent", e.target.checked)} />
              <span>By checking this box, I agree to receive calls and SMS messages from DEVILSALES about my inquiry, estimates, scheduling and project updates. Message frequency varies. Message and data rates may apply. Reply STOP to unsubscribe and HELP for assistance. Consent is not a condition of purchase. See our <a href="/privacy" target="_blank">Privacy Policy</a> and <a href="/sms-policy" target="_blank">SMS Terms</a>.</span>
            </label>
            <div className="law-form-actions">
              <button type="button" className="law-form-back" onClick={() => { setStep(1); setMessage(""); setStatus("idle"); }}>← Back</button>
              <button type="submit" className="law-form-primary" disabled={status === "submitting"}><span>{status === "submitting" ? "Submitting..." : "Submit"}</span><b>↗︎</b></button>
            </div>
          </div>
        )}

        {message && status === "error" && <p className="law-form-message error">{message}</p>}
      </form>

      <AnimatePresence>
        {status === "success" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="law-success-overlay" onClick={() => { setStatus("idle"); setMessage(""); }}>
            <motion.div initial={{ opacity: 0, y: 24, scale: .96 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 16, scale: .97 }} transition={{ duration: .35, ease: [.22, 1, .36, 1] }} className="law-success-modal" onClick={event => event.stopPropagation()}>
              <span className="law-success-check" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M4 12.5 9.5 18 20 6" /></svg></span>
              <h3>Message sent</h3>
              <p>{message}</p>
              <button type="button" onClick={() => { setStatus("idle"); setMessage(""); }}>Close</button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function Field({ label, wide = false, children }: { label: string; wide?: boolean; children: React.ReactNode }) {
  return <label className={wide ? "wide" : ""}><span>{label}</span>{children}</label>;
}
