import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], weight: ["300", "400", "500"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://www.devilsales.dev"),
  applicationName: "DevilSales Web",
  authors: [{ name: "DevilSales Web", url: "https://www.devilsales.dev" }],
  creator: "DevilSales Web",
  publisher: "DevilSales Web",
  category: "Web Design and Development",
  referrer: "origin-when-cross-origin",
  title: {
    default: "Custom Web Design & Development USA | DevilSales Web",
    template: "%s | DevilSales Web",
  },
  description:
    "Custom web design and development for US service businesses. Strategy, conversion-focused UX, fast development and growth systems from one accountable team.",
  keywords: [
    "custom web design USA",
    "website development company",
    "web design agency for service businesses",
    "conversion focused web design",
    "Next.js development agency",
    "professional website redesign",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "DevilSales Web",
    title: "Custom Web Design & Development USA | DevilSales Web",
    description:
      "Premium, conversion-focused websites for ambitious service businesses across the United States.",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "DevilSales Web — Digital experiences for serious growth" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Custom Web Design & Development USA | DevilSales Web",
    description: "Premium, conversion-focused websites for ambitious US service businesses.",
    images: ["/opengraph-image"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  formatDetection: { email: false, address: false, telephone: false },
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://www.devilsales.dev/#organization",
      name: "DevilSales Web",
      legalName: "DEVILSALES DI COMERZAN MAXIM",
      url: "https://www.devilsales.dev/",
      logo: "https://www.devilsales.dev/icon",
      email: "info@devilsales.dev",
      telephone: "+1-315-547-8952",
      sameAs: [
        "https://www.facebook.com/profile.php?id=61589616998618",
        "https://www.instagram.com/devilsales_web",
      ],
    },
    {
      "@type": "ProfessionalService",
      "@id": "https://www.devilsales.dev/#service",
      name: "DevilSales Web",
      url: "https://www.devilsales.dev/",
      image: "https://www.devilsales.dev/opengraph-image",
      email: "info@devilsales.dev",
      telephone: "+1-315-547-8952",
      priceRange: "$$$$",
      areaServed: { "@type": "Country", name: "United States" },
      serviceType: ["Web Strategy", "UI/UX Design", "Custom Website Development", "Website Redesign", "Technical SEO"],
      parentOrganization: { "@id": "https://www.devilsales.dev/#organization" },
    },
    {
      "@type": "WebSite",
      "@id": "https://www.devilsales.dev/#website",
      url: "https://www.devilsales.dev/",
      name: "DevilSales Web",
      inLanguage: "en-US",
      publisher: { "@id": "https://www.devilsales.dev/#organization" },
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-US">
      <body className={inter.className}>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
        <Script src="https://www.googletagmanager.com/gtag/js?id=AW-18337463652" strategy="afterInteractive" />
        <Script id="google-ads-gtag" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'AW-18337463652');
            gtag('config', 'G-MDZ35EQRC5');
          `}
        </Script>
        {children}
      </body>
    </html>
  );
}
