import Script from "next/script";

export default function PricingLeadForm() {
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
