"use client";

import Link from "next/link";
import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { trackEvent, splitName } from "../lib/track";

type FormData = {
  fullName: string;
  companyName: string;
  businessEmail: string;
  phone: string;
  country: string;
  industry: string;
  serviceNeeded: string;
  budget: string;
  projectDetails: string;
  companySize: string;
  timeline: string;
  smsConsent: boolean;
};

export default function ContactPage() {
  const [form, setForm] = useState<FormData>({
    fullName: "",
    companyName: "",
    businessEmail: "",
    phone: "",
    country: "",
    industry: "",
    serviceNeeded: "",
    budget: "",
    projectDetails: "",
    companySize: "",
    timeline: "",
    smsConsent: false,
  });

  const [errors, setErrors] = useState<
    Partial<Record<keyof FormData, string>>
  >({});
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState("");

  function handleChange(
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) {
    const target = event.target;
    const name = target.name as keyof FormData;

    const value =
      target instanceof HTMLInputElement && target.type === "checkbox"
        ? target.checked
        : target.value;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));

    setErrors((previous) => ({
      ...previous,
      [name]: "",
    }));

    setSuccess(false);
    setServerError("");
  }

  function validateForm() {
    const newErrors: Partial<Record<keyof FormData, string>> = {};

    if (!form.fullName.trim()) {
      newErrors.fullName = "Full name is required.";
    }

    if (!form.companyName.trim()) {
      newErrors.companyName = "Company name is required.";
    }

    if (!form.businessEmail.trim()) {
      newErrors.businessEmail = "Business email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.businessEmail)) {
      newErrors.businessEmail = "Enter a valid business email.";
    }

    if (!form.phone.trim()) {
      newErrors.phone = "Phone number with country code is required.";
    } else if (!/^\+1[\s.-]?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/.test(form.phone.trim())) {
      newErrors.phone =
        "Enter a valid US phone number with country code. Example: +1 315 547 8952";
    }

    if (!form.country.trim()) {
      newErrors.country = "Company country is required.";
    }

    if (!form.industry) {
      newErrors.industry = "Please select an industry.";
    }

    if (!form.serviceNeeded) {
      newErrors.serviceNeeded = "Please select a service.";
    }

    if (!form.budget) {
      newErrors.budget = "Please select a project budget.";
    }

    if (!form.projectDetails.trim()) {
      newErrors.projectDetails = "Project details are required.";
    } else if (form.projectDetails.trim().length < 30) {
      newErrors.projectDetails =
        "Please write at least 30 characters about your project.";
    }

    if (!form.smsConsent) {
      newErrors.smsConsent =
        "You must provide consent to receive SMS messages.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setServerError("");
    setSuccess(false);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        setServerError(
          data.error || "Something went wrong. Please try again."
        );
        return;
      }

      setSuccess(true);
      const { firstName, lastName } = splitName(form.fullName);
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: "form_submit_success",
        email: form.businessEmail,
        phone_number: form.phone,
        first_name: firstName,
        last_name: lastName,
      });

      setForm({
        fullName: "",
        companyName: "",
        businessEmail: "",
        phone: "",
        country: "",
        industry: "",
        serviceNeeded: "",
        budget: "",
        projectDetails: "",
        companySize: "",
        timeline: "",
        smsConsent: false,
      });
    } catch {
      setServerError("Connection error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  const inputClass =
    "mt-3 w-full rounded-[7px] border border-white/15 bg-white/5 px-4 py-4 text-white outline-none transition placeholder:text-white/30 focus:border-[#8d4cff] focus:ring-2 focus:ring-[#6100ff]/25";

  const labelClass = "text-sm font-normal text-white/70";
  const errorClass = "mt-2 text-sm text-red-500";

  return (
    <main className="inner-page">
      <Navbar />

      <section className="contact-page-shell">
        <div className="contact-hero">
          <div className="agency-flow" aria-hidden="true"><i/><i/><i/></div>
          <div className="contact-hero-copy"><p className="section-kicker !text-white/65">[ Start a project ]</p><h1>Contact Us</h1><p>Tell us where your business is today and where you want it to go. We&apos;ll turn that context into a clear next step.</p></div>
          <div className="contact-hero-stats"><div><strong>USA</strong><span>Nationwide focus</span></div><div><strong>$10K+</strong><span>Project engagement</span></div><div><strong>10</strong><span>High-value industries</span></div><div><strong>01</strong><span>Accountable team</span></div></div>
        </div>

        <div className="contact-main">
          <div className="contact-side">
            <p className="section-kicker">[ Get in touch ]</p>
            <h2>Let&apos;s build the website your business deserves.</h2>
            <p>Share your goals, current website and timeline. We review every qualified request personally and respond with the most useful next step.</p>
            <div className="contact-direct-card featured"><h3>DevilSales Web</h3><a href="tel:+13155478952" onClick={() => trackEvent("phone_click")}><ContactIcon type="phone"/><span><small>Call us</small>315-547-8952</span></a><a href="mailto:info@devilsales.dev" onClick={() => trackEvent("email_click")}><ContactIcon type="mail"/><span><small>Email us</small>info@devilsales.dev</span></a><div><ContactIcon type="location"/><span><small>Service area</small>United States · Nationwide</span></div></div>
          </div>

          <form
            id="project-brief"
            onSubmit={handleSubmit}
            className="contact-form"
          >
            <div className="contact-form-heading"><p className="section-kicker">[ Project brief ]</p><h2>Send us a message</h2><p>Fields marked with * are required.</p></div>
            <div className="contact-form-grid">
              <div>
                <label className={labelClass}>Full Name *</label>
                <input
                  name="fullName"
                  type="text"
                  value={form.fullName}
                  onChange={handleChange}
                  placeholder="Your name"
                  className={inputClass}
                />
                {errors.fullName && (
                  <p className={errorClass}>{errors.fullName}</p>
                )}
              </div>

              <div>
                <label className={labelClass}>Company Name *</label>
                <input
                  name="companyName"
                  type="text"
                  value={form.companyName}
                  onChange={handleChange}
                  placeholder="Company name"
                  className={inputClass}
                />
                {errors.companyName && (
                  <p className={errorClass}>{errors.companyName}</p>
                )}
              </div>

              <div>
                <label className={labelClass}>Business Email *</label>
                <input
                  name="businessEmail"
                  type="email"
                  value={form.businessEmail}
                  onChange={handleChange}
                  placeholder="you@company.com"
                  className={inputClass}
                />
                {errors.businessEmail && (
                  <p className={errorClass}>{errors.businessEmail}</p>
                )}
              </div>

              <div>
                <label className={labelClass}>
                  Phone Number With Country Code *
                </label>
                <input
                  name="phone"
                  type="tel"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="+1 315 547 8952"
                  className={inputClass}
                />
                {errors.phone && (
                  <p className={errorClass}>{errors.phone}</p>
                )}
              </div>

              <div>
                <label className={labelClass}>Company Country *</label>
                <input
                  name="country"
                  type="text"
                  value={form.country}
                  onChange={handleChange}
                  placeholder="New York, California, United States..."
                  className={inputClass}
                />
                {errors.country && (
                  <p className={errorClass}>{errors.country}</p>
                )}
              </div>

              <div>
                <label className={labelClass}>Industry *</label>
                <select
                  name="industry"
                  value={form.industry}
                  onChange={handleChange}
                  className={inputClass}
                >
                  <option value="">Select industry</option>
                  <option value="Automotive">Automotive</option>
                  <option value="Real Estate">Real Estate</option>
                  <option value="Legal">Legal</option>
                  <option value="Contractors & Home Services">Contractors &amp; Home Services</option>
                  <option value="Professional Services">Professional Services</option>
                  <option value="Luxury Brands">Luxury Brands</option>
                  <option value="E-Commerce">E-Commerce</option>
                  <option value="Healthcare">Healthcare</option>
                  <option value="Finance">Finance</option>
                  <option value="Technology">Technology</option>
                  <option value="Other">Other</option>
                </select>

                {errors.industry && (
                  <p className={errorClass}>{errors.industry}</p>
                )}
              </div>

              <div>
                <label className={labelClass}>Service Needed *</label>
                <select
                  name="serviceNeeded"
                  value={form.serviceNeeded}
                  onChange={handleChange}
                  className={inputClass}
                >
                  <option value="">Select service</option>
                  <option value="Custom Website Development">
                    Custom Website Development
                  </option>
                  <option value="E-Commerce Development">
                    E-Commerce Development
                  </option>
                  <option value="UI/UX Redesign">UI/UX Redesign</option>
                  <option value="Website Strategy & Design">Website Strategy &amp; Design</option>
                  <option value="Website Redesign">Website Redesign</option>
                  <option value="Ongoing Maintenance & Support">
                    Ongoing Maintenance & Support
                  </option>
                </select>

                {errors.serviceNeeded && (
                  <p className={errorClass}>{errors.serviceNeeded}</p>
                )}
              </div>

              <div>
                <label className={labelClass}>Project Budget *</label>
                <select
                  name="budget"
                  value={form.budget}
                  onChange={handleChange}
                  className={inputClass}
                >
                  <option value="">Select budget</option>
                  <option value="$10,000 - $25,000">
                    $10,000 - $25,000
                  </option>
                  <option value="$25,000 - $50,000">
                    $25,000 - $50,000
                  </option>
                  <option value="$50,000+">$50,000+</option>
                </select>

                {errors.budget && (
                  <p className={errorClass}>{errors.budget}</p>
                )}
              </div>

              <div>
                <label className={labelClass}>Company Size</label>
                <select
                  name="companySize"
                  value={form.companySize}
                  onChange={handleChange}
                  className={inputClass}
                >
                  <option value="">Select company size</option>
                  <option value="1-10 Employees">1-10 Employees</option>
                  <option value="11-50 Employees">11-50 Employees</option>
                  <option value="51-200 Employees">51-200 Employees</option>
                  <option value="200+ Employees">200+ Employees</option>
                </select>
              </div>

              <div>
                <label className={labelClass}>
                  Preferred Launch Timeline
                </label>
                <select
                  name="timeline"
                  value={form.timeline}
                  onChange={handleChange}
                  className={inputClass}
                >
                  <option value="">Select timeline</option>
                  <option value="ASAP">ASAP</option>
                  <option value="Within 30 Days">Within 30 Days</option>
                  <option value="1-3 Months">1-3 Months</option>
                  <option value="3-6 Months">3-6 Months</option>
                  <option value="Just Exploring">Just Exploring</option>
                </select>
              </div>

              <div className="contact-span">
                <label className={labelClass}>Project Details *</label>
                <textarea
                  name="projectDetails"
                  rows={6}
                  value={form.projectDetails}
                  onChange={handleChange}
                  placeholder="Tell us what you want to build or improve."
                  className={inputClass}
                />

                {errors.projectDetails && (
                  <p className={errorClass}>{errors.projectDetails}</p>
                )}
              </div>

              <div className={`consent-card contact-span ${form.smsConsent ? "checked" : ""}`}>
                <label className="flex cursor-pointer items-start gap-3">
                  <input
                    name="smsConsent"
                    type="checkbox"
                    checked={form.smsConsent}
                    onChange={handleChange}
                    className="consent-checkbox"
                  />

                  <span className="text-sm leading-6 text-white/65">
                    By checking this box and submitting this form, I agree to
                    receive SMS messages from DEVILSALES regarding my inquiry,
                    quotations, appointment scheduling, project updates,
                    customer support and service-related notifications. Message
                    frequency varies. Message and data rates may apply. Reply{" "}
                    <strong>STOP</strong> to unsubscribe and{" "}
                    <strong>HELP</strong> for assistance. Consent is not a
                    condition of purchase. See our{" "}
                    <Link
                      href="/privacy"
                      target="_blank"
                      className="font-medium underline underline-offset-2"
                    >
                      Privacy Policy
                    </Link>{" "}
                    and{" "}
                    <Link
                      href="/sms-policy"
                      target="_blank"
                      className="font-medium underline underline-offset-2"
                    >
                      SMS Terms &amp; Conditions
                    </Link>
                    .
                  </span>
                </label>

                {errors.smsConsent && (
                  <p className={errorClass}>{errors.smsConsent}</p>
                )}
              </div>

              {serverError && (
                <div className="contact-span rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-600">
                  {serverError}
                </div>
              )}

              {success && (
                <div className="contact-span rounded-xl border border-green-200 bg-green-50 p-4 text-sm text-green-700">
                  Your request has been sent successfully. We will review your
                  project and contact you shortly.
                </div>
              )}

              <button
                type="submit"
                disabled={loading || !form.smsConsent}
                className="contact-span rounded-full bg-white px-8 py-5 font-medium uppercase tracking-wider text-[#6100ff] transition hover:bg-[#8b4dff] hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
              >
                {loading ? "Sending..." : "Submit Project Request"}
              </button>
            </div>
          </form>
        </div>

        <section className="contact-resources">
          <div className="contact-resources-heading"><p className="section-kicker">[ Resources ]</p><h2>Everything you need to make the right next move.</h2><p>Explore our capabilities, understand project investment and review visual references for your industry.</p></div>
          <div className="contact-resource-grid">
            <Link href="/agency#services" className="contact-resource-card"><ResourceIcon type="services"/><h3>Services</h3><p>Explore strategy, UI/UX design, custom development and connected growth systems.</p><span>Explore services ↗</span></Link>
            <Link href="/contact#project-brief" className="contact-resource-card"><ResourceIcon type="investment"/><h3>Project Investment</h3><p>Choose the budget range, timeline and scope that best matches your business goals.</p><span>Plan your project ↗</span></Link>
            <Link href="/work" className="contact-resource-card"><ResourceIcon type="portfolio"/><h3>Portfolio</h3><p>Review real US-market website references across ten high-value service industries.</p><span>View portfolio ↗</span></Link>
          </div>
        </section>
      </section>

      <Footer />
    </main>
  );
}

function ContactIcon({type}:{type:"phone"|"mail"|"location"}) {
  if(type==="phone") return <span className="contact-icon" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M7.2 3.5 10 7.8 8.3 10c1.2 2.5 3.2 4.5 5.7 5.7l2.2-1.7 4.3 2.8-.7 3.2c-.2.8-.9 1.4-1.8 1.4C9.5 21.4 2.6 14.5 2.6 6c0-.9.6-1.6 1.4-1.8l3.2-.7Z"/></svg></span>;
  if(type==="mail") return <span className="contact-icon" aria-hidden="true"><svg viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m4 7 8 6 8-6"/></svg></span>;
  return <span className="contact-icon" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/></svg></span>;
}

function ResourceIcon({type}:{type:"services"|"investment"|"portfolio"}) {
  if(type==="services") return <span className="resource-icon" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M4 7h16M4 12h16M4 17h10"/><circle cx="8" cy="7" r="1.5"/><circle cx="16" cy="12" r="1.5"/><circle cx="10" cy="17" r="1.5"/></svg></span>;
  if(type==="investment") return <span className="resource-icon" aria-hidden="true"><svg viewBox="0 0 24 24"><ellipse cx="12" cy="6" rx="7" ry="3"/><path d="M5 6v5c0 1.7 3.1 3 7 3s7-1.3 7-3V6M5 11v5c0 1.7 3.1 3 7 3s7-1.3 7-3v-5"/></svg></span>;
  return <span className="resource-icon" aria-hidden="true"><svg viewBox="0 0 24 24"><rect x="5" y="3" width="14" height="18" rx="2"/><path d="M8 7h8M8 11h8M8 15h5"/></svg></span>;
}
