import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { caseStudySchema } from "@/lib/projectSchema";

const TITLE = "This Portfolio";
const DESCRIPTION =
  "Project: this portfolio. Next.js 16 and TypeScript, live status checks of the systems it shows, a project filter tested in every order and search checks that fail a bad build.";
const SHARE_TITLE = `${TITLE} · Daniel Chadambuka`;

// The root layout adds " · Daniel Chadambuka" to the title, so the title
// here is the page name only. Canonical and Open Graph values are set here,
// or the page inherits the home page's and Google treats it as a copy.
export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: {
    canonical: "/projects/this-portfolio",
  },
  openGraph: {
    title: SHARE_TITLE,
    description: DESCRIPTION,
    type: "article",
    locale: "en_US",
    url: "/projects/this-portfolio",
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

export default function ThisPortfolioLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(caseStudySchema("this-portfolio")),
        }}
      />
      {children}
    </>
  );
}
