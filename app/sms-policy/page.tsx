import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function SmsPolicyPage() {
  return (
    <main className="legal-page">
      <Navbar />

      <section className="legal-shell">
        <h1 className="text-5xl font-bold">SMS Terms &amp; Conditions</h1>

        <div className="legal-copy space-y-10">
          <section className="space-y-4">
            <p>
              These SMS Terms &amp; Conditions explain how DEVILSALES DI
              COMERZAN MAXIM uses SMS communications for customers and website
              visitors who voluntarily provide their mobile phone number and
              consent to receive SMS messages.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-white">
              Business Information
            </h2>

            <p>
              DEVILSALES DI COMERZAN MAXIM
              <br />
              VAT: IT03128770355
              <br />
              Via Colombana 18
              <br />
              42022 Boretto (RE)
              <br />
              Italy
              <br />
              Email:{" "}
              <a
                href="mailto:info@devilsales.dev"
                className="text-white underline underline-offset-4"
              >
                info@devilsales.dev
              </a>
              <br />
              Phone: 315-547-8952
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-white">
              SMS Program Description
            </h2>

            <p>
              Customers may receive SMS messages from DEVILSALES regarding
              enquiries, quotations, appointment scheduling, project updates,
              customer support and service-related notifications.
            </p>

            <p>
              SMS messages are sent only after the customer voluntarily
              provides a mobile phone number and selects the SMS consent
              checkbox on our website.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-white">
              Consent and Opt-In
            </h2>

            <p>
              By selecting the SMS consent checkbox and submitting the website
              form, you expressly agree to receive SMS messages from
              DEVILSALES.
            </p>

            <p>
              Consent to receive SMS messages is not a condition of purchase.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-white">
              Message Frequency and Charges
            </h2>

            <p>
              Message frequency varies depending on your enquiry and
              interaction with DEVILSALES.
            </p>

            <p>
              Message and data rates may apply according to your mobile
              carrier&apos;s plan.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-white">Opt-Out</h2>

            <p>
              You may unsubscribe from SMS messages at any time by replying{" "}
              <strong className="text-white">STOP</strong>.
            </p>

            <p>
              After you reply STOP, you may receive one final confirmation
              message stating that you have been unsubscribed. No further SMS
              messages will be sent unless you opt in again.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-white">Help</h2>

            <p>
              Reply <strong className="text-white">HELP</strong> for
              assistance.
            </p>

            <p>
              You may also contact us at{" "}
              <a
                href="mailto:info@devilsales.dev"
                className="text-white underline underline-offset-4"
              >
                info@devilsales.dev
              </a>
              .
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-white">Privacy</h2>

            <p>
              Mobile information will not be shared with third parties or
              affiliates for marketing or promotional purposes.
            </p>

            <p>
              Text messaging originator opt-in data and consent will not be
              shared with any third parties.
            </p>

            <p>
              For more information about how we handle personal information,
              review our{" "}
              <Link
                href="/privacy"
                className="font-medium text-white underline underline-offset-4"
              >
                Privacy Policy
              </Link>
              .
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-white">
              Supported Keywords
            </h2>

            <p>
              Reply <strong className="text-white">START</strong> to subscribe,
              <strong className="text-white"> STOP</strong> to unsubscribe and
              <strong className="text-white"> HELP</strong> for assistance.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-white">
              Changes to These Terms
            </h2>

            <p>
              DEVILSALES may update these SMS Terms &amp; Conditions when
              necessary. Any updated version will be published on this page.
            </p>
          </section>
        </div>
      </section>

      <Footer />
    </main>
  );
}
