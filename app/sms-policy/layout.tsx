import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SMS Terms & Conditions",
  description: "Terms and conditions for SMS communications from DevilSales Web.",
  alternates: { canonical: "/sms-policy" },
  robots: { index: false, follow: true },
};

export default function SmsPolicyLayout({ children }: { children: React.ReactNode }) { return children; }
