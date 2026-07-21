import type { Metadata } from "next";

const questions = [
  ["What services does DevilSales provide?", "We handle strategy, positioning, UI/UX design, custom website development, integrations and ongoing optimization as one connected engagement."],
  ["Can you show examples relevant to my industry?", "Yes. Our portfolio includes curated US-market references across legal, medical, dental, construction, home services and other high-value industries."],
  ["Which industries do you specialize in?", "We focus on service businesses where trust and lead quality matter: law firms, clinics, contractors, HVAC, roofing, remodeling, luxury builders, restoration and commercial landscaping."],
  ["What is a typical project timeline?", "Most custom website engagements take 6–12 weeks. The final schedule depends on scope, content readiness, integrations and the speed of feedback."],
  ["Do you provide ongoing support after launch?", "Yes. We can support analytics, content updates, technical maintenance, conversion improvements and new landing pages after launch."],
  ["Can you accommodate a tight deadline?", "Sometimes. We first confirm that the scope, approvals and content can support the requested launch date without compromising the result."],
  ["How does the creative process work?", "We move through discovery, positioning, structure, visual design, development, quality assurance and launch—with clear approvals at every major stage."],
  ["What makes DevilSales different?", "One accountable team connects business strategy, premium design and reliable development. Every screen is created for a commercial reason, not decoration alone."],
];

export const metadata: Metadata = {
  title: "Web Design & Development FAQ",
  description: "Answers about DevilSales Web services, project timelines, industries, support, process and custom website development engagements.",
  alternates: { canonical: "/faq" },
  openGraph: { type: "website", locale: "en_US", siteName: "DevilSales Web", title: "Web Design & Development FAQ", description: "Clear answers about scope, process, timing and working with DevilSales Web.", url: "/faq", images: [{ url: "/opengraph-image", width: 1200, height: 630 }] },
  twitter: { card: "summary_large_image", title: "Web Design & Development FAQ", description: "Clear answers about scope, process, timing and working with DevilSales Web.", images: ["/opengraph-image"] },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: questions.map(([name, text]) => ({
    "@type": "Question",
    name,
    acceptedAnswer: { "@type": "Answer", text },
  })),
};

export default function FaqLayout({ children }: { children: React.ReactNode }) {
  return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />{children}</>;
}
