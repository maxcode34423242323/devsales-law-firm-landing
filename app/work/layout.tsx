import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Web Design Portfolio & Industry References",
  description: "Explore premium website references across legal, healthcare, roofing, HVAC, remodeling, luxury construction and other US service industries.",
  alternates: { canonical: "/work" },
  openGraph: { type: "website", locale: "en_US", siteName: "DevilSales Web", title: "Web Design Portfolio & Industry References", description: "Digital experiences selected for ambitious US service businesses.", url: "/work", images: [{ url: "/opengraph-image", width: 1200, height: 630 }] },
  twitter: { card: "summary_large_image", title: "Web Design Portfolio & Industry References", description: "Digital experiences selected for ambitious US service businesses.", images: ["/opengraph-image"] },
};

export default function WorkLayout({ children }: { children: React.ReactNode }) {
  return children;
}
