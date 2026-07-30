"use client";

import { useEffect } from "react";
import Script from "next/script";
import { trackEvent } from "../lib/track";

export default function PricingLeadForm() {
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
          className="calendly-inline-widget pr-calendly-widget"
          data-url="https://calendly.com/jacobrds36/30min"
          style={{ minWidth: 320, height: 700 }}
        />
        <Script src="https://assets.calendly.com/assets/external/widget.js" strategy="lazyOnload" />
      </div>
    </div>
  );
}
