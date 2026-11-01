import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { caseStudySchema } from "@/lib/projectSchema";

const TITLE = "FishTech Sales Agent & Ops";
const DESCRIPTION =
  "Case study: a large language model agent with tool use that answers fish-farming questions on FishTech's WhatsApp line in English or Shona, prices from one price list and sends PDF quotations, with code checks on every reply and an operations console behind it.";
const SHARE_TITLE = `${TITLE} · Daniel Chadambuka`;

// The root layout adds " · Daniel Chadambuka" to the title, so the title
// here is the page name only. Canonical, Open Graph and Twitter values must
// be set here, or the page inherits the home page's and Google treats it
// as a copy of the home page.
export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: {
    canonical: "/projects/fishtech-sales-agent",
  },
  openGraph: {
    title: SHARE_TITLE,
    description: DESCRIPTION,
    type: "article",
    locale: "en_US",
    url: "/projects/fishtech-sales-agent",
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

export default function SalesAgentCaseStudyLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(caseStudySchema("fishtech-sales-agent")),
        }}
      />
      {children}
    </>
  );
}
