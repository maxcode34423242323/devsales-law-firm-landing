import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SMS Program",
  description: "Information about the DevilSales Web SMS communications program and opt-in terms.",
  alternates: { canonical: "/sms-optin" },
  robots: { index: false, follow: true },
};

export default function SmsOptinLayout({ children }: { children: React.ReactNode }) { return children; }
