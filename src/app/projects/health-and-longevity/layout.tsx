import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";

const TITLE = "Health & Longevity";
const DESCRIPTION =
  "Case study: a live health platform for a Harare doctor. Paynow membership, video and in-person consult booking, paid articles and video lessons, nurse-aide matching, encrypted personal data, offline support and a phone-first admin area. Astro, React, Cloudflare Workers and D1.";
const SHARE_TITLE = `${TITLE} · Daniel Chadambuka`;

// The root layout adds " · Daniel Chadambuka" to the title, so the title
// here is the page name only. Canonical, Open Graph and Twitter values must
// be set here, or the page inherits the home page's and Google treats it
// as a copy of the home page.
export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: {
    canonical: "/projects/health-and-longevity",
  },
  openGraph: {
    title: SHARE_TITLE,
    description: DESCRIPTION,
    type: "article",
    locale: "en_US",
    url: "/projects/health-and-longevity",
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

export default function HealthLongevityCaseStudyLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <>{children}</>;
}
