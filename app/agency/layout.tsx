import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Custom Web Design & Development USA",
  description:
    "Custom web design and development for US service businesses. Strategy, conversion-focused UX, fast development and growth systems from one accountable team.",
  alternates: { canonical: "/agency" },
  openGraph: {
    type: "website",
    url: "/agency",
    title: "Custom Web Design & Development USA | DevilSales Web",
    description:
      "Premium, conversion-focused websites for ambitious service businesses across the United States.",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "DevilSales Web — Digital experiences for serious growth" }],
  },
  robots: { index: true, follow: true },
};

export default function AgencyLayout({ children }: { children: React.ReactNode }) {
  return children;
}
