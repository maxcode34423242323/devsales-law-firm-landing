import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Law Firm Web Design Agency | Custom Websites for Personal Injury Firms",
  description:
    "Conversion-focused custom websites for personal injury law firms. Strategy, UX, development and lead tracking from one accountable team.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Law Firm Web Design Agency | DevilSales Web",
    description:
      "Premium custom websites for personal injury law firms, built to create trust and generate qualified consultations.",
    url: "/",
    type: "website",
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
  },
  robots: { index: true, follow: true },
};

const schema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Law Firm Web Design",
  serviceType: "Custom website design and development for personal injury law firms",
  provider: { "@id": "https://www.devilsales.dev/#organization" },
  areaServed: { "@type": "Country", name: "United States" },
  url: "https://www.devilsales.dev/law-firm-web-design",
};

export default function LawFirmLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      {children}
    </>
  );
}
