import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function TermsPage() {
  return (
    <main className="legal-page">
      <Navbar />

      <section className="legal-shell">
        <h1 className="text-5xl font-bold">Terms of Service</h1>

        <div className="legal-copy space-y-8">
          <p>
            By accessing this website you agree to these Terms of Service.
          </p>

          <p>
            DevSales Web provides web development, design, consulting and
            digital infrastructure services.
          </p>

          <p>
            All project timelines, pricing and deliverables are defined through
            separate agreements with clients.
          </p>

          <p>
            Content displayed on this website may not be copied, reproduced or
            distributed without written permission.
          </p>

          <p>
            DevSales Web reserves the right to update these terms at any time.
          </p>

          <p>
            Questions regarding these terms can be sent to:
            <br />
            info@devsales.dev
          </p>
        </div>
      </section>

      <Footer />
    </main>
  );
}
