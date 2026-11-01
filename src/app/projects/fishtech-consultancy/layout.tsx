import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { caseStudySchema } from "@/lib/projectSchema";

const TITLE = "FishTech Consultancy";
const DESCRIPTION =
  "Project: FishTech's company site. Prices from one shared price feed, a pond calculator that sends to WhatsApp for a written quote, delivery by town and guides for search. Astro, TypeScript and GSAP on Vercel.";
const SHARE_TITLE = `${TITLE} · Daniel Chadambuka`;

// The root layout adds " · Daniel Chadambuka" to the title, so the title
// here is the page name only. Canonical and Open Graph values are set here,
// or the page inherits the home page's and Google treats it as a copy.
export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: {
    canonical: "/projects/fishtech-consultancy",
  },
  openGraph: {
    title: SHARE_TITLE,
    description: DESCRIPTION,
    type: "article",
    locale: "en_US",
    url: "/projects/fishtech-consultancy",
    siteName: "Daniel Chadambuka",
  },
  twitter: {
    card: "summary_large_image",
    title: SHARE_TITLE,
    description: DESCRIPTION,
  },
};

export const viewport: Viewport = {
  themeColor: "#080808",
};

export default function FishTechConsultancyLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(caseStudySchema("fishtech-consultancy")),
        }}
      />
      {children}
    </>
  );
}
