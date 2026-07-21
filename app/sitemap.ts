import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date("2026-07-17");
  return [
    {
      url: "https://www.devilsales.dev/",
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: "https://www.devilsales.dev/contact",
      lastModified,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: "https://www.devilsales.dev/work",
      lastModified,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: "https://www.devilsales.dev/faq",
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: "https://www.devilsales.dev/work/devilsales-auto",
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];
}
