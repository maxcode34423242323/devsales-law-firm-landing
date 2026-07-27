import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Premium & Growth Website Packages | DevilSales Web",
  description:
    "Two ways to work with DevilSales Web: Premium custom platforms from $10,000, or Growth websites from $3,000 for businesses that need a fast, professional site.",
  alternates: { canonical: "/pricing" },
  openGraph: {
    title: "Premium & Growth Website Packages | DevilSales Web",
    description:
      "Two ways to work with DevilSales Web: Premium custom platforms from $10,000, or Growth websites from $3,000.",
    url: "/pricing",
    type: "website",
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
  },
  robots: { index: true, follow: true },
};

export default function PricingLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
