import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "DevilSales Auto Website Case Study",
  description: "See how DevilSales designed a premium automotive brokerage platform with inventory management, lead capture and growth-ready technical foundations.",
  alternates: { canonical: "/work/devilsales-auto" },
  openGraph: { type: "article", locale: "en_US", siteName: "DevilSales Web", title: "DevilSales Auto Website Case Study", description: "A luxury automotive platform engineered for qualified leads and international growth.", url: "/work/devilsales-auto", images: [{ url: "/opengraph-image", width: 1200, height: 630 }] },
  twitter: { card: "summary_large_image", title: "DevilSales Auto Website Case Study", description: "A luxury automotive platform engineered for qualified leads and international growth.", images: ["/opengraph-image"] },
};

export default function CaseStudyLayout({ children }: { children: React.ReactNode }) {
  return children;
}
