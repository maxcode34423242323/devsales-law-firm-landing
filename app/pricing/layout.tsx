import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Premium & Growth Website Packages | DevilSales Web",
  description:
    "Two ways to work with DevilSales Web: custom Premium platforms for ambitious brands, or fast, professional Growth websites for businesses that need to launch quickly.",
  alternates: { canonical: "/pricing" },
  openGraph: {
    title: "Premium & Growth Website Packages | DevilSales Web",
    description:
      "Two ways to work with DevilSales Web: custom Premium platforms for ambitious brands, or fast, professional Growth websites.",
    url: "/pricing",
    type: "website",
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
  },
  robots: { index: true, follow: true },
};

export default function PricingLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
