"use client";

import { useEffect, useRef } from "react";
import Script from "next/script";
import { trackEvent } from "../lib/track";

const CALENDLY_BASE_URL = "https://calendly.com/jacobrds36/30min";

export default function PricingLeadForm() {
  const widgetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!widgetRef.current) return;
    const params = new URLSearchParams(window.location.search);
    const utmParams = new URLSearchParams();
    for (const key of ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"]) {
      const value = params.get(key);
      if (value) utmParams.set(key, value);
    }
    const query = utmParams.toString();
    widgetRef.current.setAttribute("data-url", query ? `${CALENDLY_BASE_URL}?${query}` : CALENDLY_BASE_URL);
  }, []);

  useEffect(() => {
    function handleCalendlyMessage(event: MessageEvent) {
      if (event.origin !== "https://calendly.com") return;
      if (event.data?.event !== "calendly.event_scheduled") return;

      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({ event: "form_submit_success", service_needed: "Calendly booking" });
      window.dataLayer.push({ event: "pricing_lead", service_needed: "Calendly booking" });
      trackEvent("calendly_booking_confirmed");
    }

    window.addEventListener("message", handleCalendlyMessage);
    return () => window.removeEventListener("message", handleCalendlyMessage);
  }, []);

  return (
    <div className="pr-form-wrap" id="get-started">
      <div className="pr-form-offset" aria-hidden="true" />
      <div className="pr-form pr-calendly-card">
        <p className="section-kicker">[ Book a call ]</p>
        <h2>Book a Free 30-Minute Strategy Call</h2>
        <p className="pr-calendly-sub">Pick a time below to confirm scope, timeline, and whether we&apos;re the right fit for your project.</p>
        <div
          ref={widgetRef}
          className="calendly-inline-widget pr-calendly-widget"
          data-url={CALENDLY_BASE_URL}
          style={{ minWidth: 320, height: 700 }}
        />
        <Script src="https://assets.calendly.com/assets/external/widget.js" strategy="lazyOnload" />
      </div>
    </div>
  );
}
