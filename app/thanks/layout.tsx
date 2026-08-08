import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Booking Confirmed | DevilSales Web",
  description: "Your strategy call is confirmed. Here's what happens next.",
  alternates: { canonical: "/thanks" },
  robots: { index: false, follow: true },
};

export default function ThanksLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
