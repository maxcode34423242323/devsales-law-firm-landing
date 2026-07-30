export default function PricingLeadForm() {
  return (
    <div className="pr-form-wrap" id="get-started">
      <div className="pr-form-offset" aria-hidden="true" />
      <div className="pr-form pr-calendly-card">
        <p className="section-kicker">[ Book a call ]</p>
        <h2>Book a Free 15-Minute Strategy Call</h2>
        <p className="pr-calendly-sub">Pick a time below to confirm scope, timeline, and whether we&apos;re the right fit for your project.</p>
        <div className="pr-calendly-embed">
          {/* Paste your Calendly inline embed code here */}
          <span>Calendly embed goes here</span>
        </div>
      </div>
    </div>
  );
}
