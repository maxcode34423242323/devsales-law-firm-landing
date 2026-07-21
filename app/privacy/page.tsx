import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function PrivacyPage() {
  return (
    <main className="legal-page">
      <Navbar />

      <section className="legal-shell">
        <h1 className="text-5xl font-bold">Privacy Policy</h1>

        <div className="legal-copy space-y-10">
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-white">
              Information We Collect
            </h2>

            <p>
              DEVILSALES DI COMERZAN MAXIM respects your privacy and is
              committed to protecting your personal information.
            </p>

            <p>
              Information submitted through our website forms may include your
              name, company name, business email address, mobile phone number,
              company website, country, industry, project budget, company size,
              preferred launch timeline and project details.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-white">
              How We Use Your Information
            </h2>

            <p>
              We use the information you provide to evaluate project requests,
              prepare quotations, schedule appointments, respond to enquiries,
              provide customer support, communicate service-related updates and
              improve our services.
            </p>

            <p>
              We do not sell or rent your personal information.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-white">
              SMS Communications
            </h2>

            <p>
              If you voluntarily provide your mobile phone number and select
              the SMS consent checkbox on our website, you expressly agree to
              receive SMS messages from DEVILSALES regarding your enquiry,
              quotations, appointment scheduling, project updates, customer
              support and service-related notifications.
            </p>

            <p>
              Message frequency varies. Message and data rates may apply.
            </p>

            <p>
              Reply <strong className="text-white">STOP</strong> at any time to
              unsubscribe. Reply{" "}
              <strong className="text-white">HELP</strong> for assistance.
            </p>

            <p>
              Consent to receive SMS messages is not a condition of purchase.
            </p>

            <p>
              Mobile information will not be shared with third parties or
              affiliates for marketing or promotional purposes.
            </p>

            <p>
              Text messaging originator opt-in data and consent will not be
              shared with any third parties.
            </p>

            <p>
              Additional information about our SMS program is available in our{" "}
              <Link
                href="/sms-policy"
                className="font-medium text-white underline underline-offset-4"
              >
                SMS Terms &amp; Conditions
              </Link>
              .
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-white">
              Data Sharing
            </h2>

            <p>
              We may share personal information only with service providers
              that help us operate our website, process enquiries, maintain our
              systems or deliver requested services.
            </p>

            <p>
              These providers may use the information only for the purpose for
              which it was provided and are not permitted to use it for their
              own marketing.
            </p>

            <p>
              We may also disclose information when required by law or when
              necessary to protect our legal rights.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-white">
              Data Retention
            </h2>

            <p>
              We retain personal information only for as long as reasonably
              necessary to respond to enquiries, provide services, comply with
              legal obligations and resolve disputes.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-white">
              Your Rights
            </h2>

            <p>
              Depending on applicable law, you may request access to,
              correction of or deletion of your personal information by
              contacting us.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-white">
              Security
            </h2>

            <p>
              We use reasonable administrative and technical measures to
              protect personal information against unauthorized access, loss,
              misuse or disclosure.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-white">
              Changes to This Privacy Policy
            </h2>

            <p>
              We may update this Privacy Policy when necessary. Any updated
              version will be published on this page.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-white">Contact</h2>

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
        </div>
      </section>

      <Footer />
    </main>
  );
}
