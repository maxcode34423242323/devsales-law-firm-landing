import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Website Design Pricing: Starter, Growth & Premium Packages | DevilSales Web",
  description:
    "Transparent pricing for custom website design, AI automation and paid ads management. Starter from $3,000, Growth from $13,800, Premium from $36,300 — pick a package or mix services to fit your project.",
  alternates: { canonical: "/pricing" },
  openGraph: {
    title: "Website Design Pricing: Starter, Growth & Premium Packages | DevilSales Web",
    description:
      "Transparent pricing for custom website design, AI automation and paid ads management — pick a package or mix services to fit your project.",
    url: "/pricing",
    type: "website",
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
  },
  robots: { index: true, follow: true },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What's the difference between Premium and Growth?",
      acceptedAnswer: { "@type": "Answer", text: "Growth projects are focused, single-purpose websites built fast on a proven foundation. Premium projects involve custom platform work — CMS-driven content, integrations, CRM automation, or multi-stage user flows — which takes more strategy and development time." },
    },
    {
      "@type": "Question",
      name: "How much does a website actually cost?",
      acceptedAnswer: { "@type": "Answer", text: "It depends on the package: Starter starts at $3,000, Growth at $13,800, and Premium at $36,300. Final cost can shift slightly based on scope, integrations and content, and we'll confirm the exact number before any work begins." },
    },
    {
      "@type": "Question",
      name: "How long does a project take?",
      acceptedAnswer: { "@type": "Answer", text: "Growth websites typically launch in 2–4 weeks. Premium platforms usually take 6–10 weeks depending on scope and integrations." },
    },
    {
      "@type": "Question",
      name: "Can you redesign our existing website?",
      acceptedAnswer: { "@type": "Answer", text: "Yes, at either tier. We can preserve useful content and SEO equity while rebuilding the strategy, visual system and technical foundation." },
    },
    {
      "@type": "Question",
      name: "Will the website be ready for paid ads?",
      acceptedAnswer: { "@type": "Answer", text: "Yes. Every project ships with a clear conversion path and form, phone-click and lead tracking prepared for Google Ads and GA4." },
    },
    {
      "@type": "Question",
      name: "Do you provide SEO?",
      acceptedAnswer: { "@type": "Answer", text: "Yes — every build, Growth or Premium, includes technical SEO foundations by default. Ongoing content and search growth can be scoped separately based on your market and goals." },
    },
    {
      "@type": "Question",
      name: "Do you offer AI automation?",
      acceptedAnswer: { "@type": "Answer", text: "Yes — we can build an AI assistant directly into your site that answers visitor questions, qualifies leads and routes them straight to your CRM or phone. It's available as an add-on on either track." },
    },
    {
      "@type": "Question",
      name: "Do you provide ongoing support after launch?",
      acceptedAnswer: { "@type": "Answer", text: "Yes. Ongoing content updates, hosting and support can be scoped separately based on what the site needs after it goes live." },
    },
  ],
};

const offerSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: "Custom Website Design & Development",
  provider: { "@id": "https://www.devilsales.dev/#organization" },
  areaServed: { "@type": "Country", name: "United States" },
  url: "https://www.devilsales.dev/pricing",
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Website Packages",
    itemListElement: [
      { "@type": "Offer", name: "Starter — Quick Launch", price: "3000", priceCurrency: "USD", url: "https://www.devilsales.dev/pricing#tier-starter" },
      { "@type": "Offer", name: "Growth — Built to Grow", price: "13800", priceCurrency: "USD", url: "https://www.devilsales.dev/pricing#tier-growth" },
      { "@type": "Offer", name: "Premium — Full-Service Solution", price: "36300", priceCurrency: "USD", url: "https://www.devilsales.dev/pricing#tier-premium" },
    ],
  },
};

export default function PricingLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(offerSchema) }} />
      {children}
    </>
  );
}
