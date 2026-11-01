import type { MetadataRoute } from "next";

const BASE = "https://dev.danielchadambuka.com";

const PROJECT_PAGES = [
  "fishtech",
  "health-and-longevity",
  "endoscopy-suite",
  "fishtech-sales-agent",
  "fishtech-consultancy",
  "fishtech-feeder",
  "steadyhands",
  "this-portfolio",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    {
      url: `${BASE}/`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${BASE}/hire`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    ...PROJECT_PAGES.map((slug) => ({
      url: `${BASE}/projects/${slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
