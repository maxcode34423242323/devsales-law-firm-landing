import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Our Web Design Team",
  description: "Tell DevilSales Web about your website, redesign or digital growth project. Serving ambitious service businesses across the United States.",
  alternates: { canonical: "/contact" },
  openGraph: { type: "website", locale: "en_US", siteName: "DevilSales Web", title: "Contact DevilSales Web", description: "Start a custom website or redesign project with our US-focused digital studio.", url: "/contact", images: [{ url: "/opengraph-image", width: 1200, height: 630 }] },
  twitter: { card: "summary_large_image", title: "Contact DevilSales Web", description: "Start a custom website or redesign project with our US-focused digital studio.", images: ["/opengraph-image"] },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
