// Structured data for the eight projects (schema.org), shared by the home
// page's ItemList and each case study's own entry, so both say the same.
// Same rules as the site copy: no phone, address, awards, prices or counts.
// scripts/check-seo.mjs fails the build if a case study loses its entry.

export const SITE_URL = "https://dev.danielchadambuka.com";
const PERSON = { "@id": `${SITE_URL}/#person` };

type ProjectEntry = {
  slug: string;
  type: "CreativeWork" | "SoftwareApplication" | "WebApplication" | "WebSite";
  name: string;
  url: string;
  description: string;
  /** Case-study path, when the project has one. */
  caseStudy?: string;
  applicationCategory?: string;
  keywords: string[];
};

export const PROJECTS: ProjectEntry[] = [
  {
    slug: "fishtech",
    type: "CreativeWork",
    name: "FishTech Precision Feeding System",
    url: `${SITE_URL}/projects/fishtech`,
    caseStudy: "/projects/fishtech",
    description:
      "Research prototype of a computer-vision-based precision feeding system for smallholder pond aquaculture in Zimbabwe. An overhead camera and a Raspberry Pi 5 with a Hailo accelerator measure tilapia and catfish at the pondside, estimate biomass with confidence intervals and set the feed dose. Runs on the device, no cloud. Pilot deployment in preparation.",
    keywords: ["Computer vision", "Edge AI", "YOLOv8-Pose", "Raspberry Pi", "FastAPI", "Aquaculture"],
  },
  {
    slug: "health-and-longevity",
    type: "WebApplication",
    name: "Health & Longevity",
    url: "https://www.healthandlongevity.co.zw",
    caseStudy: "/projects/health-and-longevity",
    applicationCategory: "HealthApplication",
    description:
      "Health platform for a Harare doctor and health educator: Paynow membership, video and in-person consult booking, paid articles and video lessons, nurse-aide requests, encrypted personal details, offline support and a phone-first admin area.",
    keywords: ["Astro", "React", "TypeScript", "Cloudflare Workers", "D1", "Paynow"],
  },
  {
    slug: "endoscopy-suite",
    type: "WebSite",
    name: "The Endoscopy Suite",
    url: "https://www.endoscopysuite.co.zw",
    description:
      "Website for a specialist endoscopy and surgery practice in Harare: services in plain words, preparation guides, an emergencies page with the phone number first, and appointment requests confirmed on WhatsApp.",
    keywords: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Cloudflare Pages"],
  },
  {
    slug: "fishtech-sales-agent",
    type: "SoftwareApplication",
    name: "FishTech Sales Agent & Ops",
    url: `${SITE_URL}/projects/fishtech-sales-agent`,
    caseStudy: "/projects/fishtech-sales-agent",
    applicationCategory: "BusinessApplication",
    description:
      "Large language model agent with tool use on FishTech's WhatsApp line. It answers fish-farming questions in English and Shona, prices from one price list and sends quotations as a PDF. Code checks every reply. An operations console holds every chat, client and quotation.",
    keywords: ["Python", "FastAPI", "LLM tool use", "WhatsApp Cloud API", "Render"],
  },
  {
    slug: "fishtech-consultancy",
    type: "WebSite",
    name: "FishTech Consultancy",
    url: "https://www.fishtech.co.zw",
    description:
      "Company site for a Zimbabwean fish-farming services business. Prices load from a single price list, and a pond calculator gives an instant cost that sends to WhatsApp for a written quote.",
    keywords: ["Astro", "TypeScript", "GSAP", "Vercel"],
  },
  {
    slug: "fishtech-feeder",
    type: "CreativeWork",
    name: "FishTech Feeder",
    url: `${SITE_URL}/#work-products-hardware`,
    description:
      "Working prototype of a solar-powered automatic fish feeder in welded steel. An auger meters each dose and a spinning disc spreads it; the daily ration comes from fish size and water temperature with no internet. Exhibited at the Zimbabwe Agricultural Show 2026.",
    keywords: ["ESP32", "Embedded", "Solar", "IoT"],
  },
  {
    slug: "steadyhands",
    type: "WebApplication",
    name: "Steadyhands Catering",
    url: "https://steadyhandscatering.com",
    applicationCategory: "ShoppingApplication",
    description:
      "Catering platform for a Harare caterer with online ordering, Paynow payments (EcoCash, OneMoney, Visa, Mastercard) and a WhatsApp ordering funnel. Live and taking orders.",
    keywords: ["Next.js", "TypeScript", "Node.js", "Paynow", "Vercel"],
  },
  {
    slug: "portfolio",
    type: "WebSite",
    name: "Daniel Chadambuka Portfolio",
    url: SITE_URL,
    description:
      "This portfolio: Next.js, TypeScript and Motion, built in a screenshot-driven loop, with live status checks of the systems it shows.",
    keywords: ["Next.js", "TypeScript", "Motion"],
  },
];

export function projectId(slug: string) {
  return `${SITE_URL}/#project-${slug}`;
}

function entry(p: ProjectEntry) {
  return {
    "@type": p.type,
    "@id": projectId(p.slug),
    name: p.name,
    url: p.url,
    description: p.description,
    author: PERSON,
    creator: PERSON,
    keywords: p.keywords.join(", "),
    ...(p.applicationCategory
      ? { applicationCategory: p.applicationCategory }
      : {}),
    ...(p.caseStudy
      ? { subjectOf: { "@type": "WebPage", url: `${SITE_URL}${p.caseStudy}` } }
      : {}),
  };
}

/** Home page: the eight projects, in the order the Projects section shows. */
export function projectItemList() {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": `${SITE_URL}/#projects`,
    name: "Projects by Daniel Chadambuka",
    itemListOrder: "https://schema.org/ItemListOrderAscending",
    numberOfItems: PROJECTS.length,
    itemListElement: PROJECTS.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: entry(p),
    })),
  };
}

/** A case study page: its project as the page's main entity. */
export function caseStudySchema(slug: string) {
  const p = PROJECTS.find((x) => x.slug === slug);
  if (!p || !p.caseStudy) throw new Error(`No case study for ${slug}`);
  return {
    "@context": "https://schema.org",
    ...entry(p),
    mainEntityOfPage: `${SITE_URL}${p.caseStudy}`,
  };
}
