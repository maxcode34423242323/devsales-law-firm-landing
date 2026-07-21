import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms governing access to the DevilSales Web website and our digital services.",
  alternates: { canonical: "/terms" },
  robots: { index: false, follow: true },
};

export default function TermsLayout({ children }: { children: React.ReactNode }) { return children; }
