import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { caseStudySchema } from "@/lib/projectSchema";

const TITLE = "Steadyhands Catering";
const DESCRIPTION =
  "Project: the website and ordering platform for SteadyHands at Bata Club, Gweru. Online ordering with Paynow, WhatsApp orders, table and venue booking and events. Next.js, TypeScript and Node.js on Vercel.";
const SHARE_TITLE = `${TITLE} · Daniel Chadambuka`;

// The root layout adds " · Daniel Chadambuka" to the title, so the title
// here is the page name only. Canonical and Open Graph values are set here,
// or the page inherits the home page's and Google treats it as a copy.
export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: {
    canonical: "/projects/steadyhands",
  },
  openGraph: {
    title: SHARE_TITLE,
    description: DESCRIPTION,
    type: "article",
    locale: "en_US",
    url: "/projects/steadyhands",
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

export default function SteadyhandsLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(caseStudySchema("steadyhands")),
        }}
      />
      {children}
    </>
  );
}
