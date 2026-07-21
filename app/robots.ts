import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/api/"] }],
    sitemap: "https://www.devilsales.dev/sitemap.xml",
    host: "https://www.devilsales.dev",
  };
}
