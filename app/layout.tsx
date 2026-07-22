import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import StyledJsxRegistry from "./registry";
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
    default: "Law Firm Web Design Agency | Custom Websites from $10K",
    template: "%s | DevilSales Web",
  },
  description:
    "Conversion-focused custom websites for personal injury law firms. Strategy, UX, development and lead tracking from one accountable team. Projects start at $10,000.",
  keywords: [
    "law firm web design",
    "personal injury law firm website",
    "custom website for lawyers",
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
    title: "Law Firm Web Design Agency | DevilSales Web",
    description:
      "Premium custom websites for personal injury law firms, built to create trust and generate qualified consultations.",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "DevilSales Web — Custom law firm website design" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Law Firm Web Design Agency | DevilSales Web",
    description: "Premium custom websites for personal injury law firms, built to create trust and generate qualified consultations.",
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
    {
      "@type": "Service",
      name: "Law Firm Web Design",
      serviceType: "Custom website design and development for personal injury law firms",
      provider: { "@id": "https://www.devilsales.dev/#organization" },
      areaServed: { "@type": "Country", name: "United States" },
      offers: {
        "@type": "Offer",
        priceCurrency: "USD",
        price: "10000",
        description: "Custom law firm website projects start at $10,000.",
      },
      url: "https://www.devilsales.dev/",
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
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-56Z4GDPH"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        <Script id="gtm-container" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-56Z4GDPH');
          `}
        </Script>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
        <StyledJsxRegistry>{children}</StyledJsxRegistry>
      </body>
    </html>
  );
}
