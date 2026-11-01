import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { caseStudySchema } from "@/lib/projectSchema";

const TITLE = "FishTech Feeder";
const DESCRIPTION =
  "Project: a working prototype of a solar-powered automatic fish feeder in welded steel. An auger meters each dose by counted revolutions and a spinning disc spreads it, with no internet. ESP32. Exhibited at the Zimbabwe Agricultural Show 2026.";
const SHARE_TITLE = `${TITLE} · Daniel Chadambuka`;

// The root layout adds " · Daniel Chadambuka" to the title, so the title
// here is the page name only. Canonical and Open Graph values are set here,
// or the page inherits the home page's and Google treats it as a copy.
export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: {
    canonical: "/projects/fishtech-feeder",
  },
  openGraph: {
    title: SHARE_TITLE,
    description: DESCRIPTION,
    type: "article",
    locale: "en_US",
    url: "/projects/fishtech-feeder",
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

export default function FishTechFeederLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(caseStudySchema("fishtech-feeder")),
        }}
      />
      {children}
    </>
  );
}
