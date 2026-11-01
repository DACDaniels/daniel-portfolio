import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";

const TITLE = "Hiring? Start here";
const DESCRIPTION =
  "Daniel Chadambuka for hiring teams: the roles he fits, five live systems with live status, how he works, availability and education. Open to full-time software engineering roles, remote or in Zimbabwe.";
const SHARE_TITLE = `${TITLE} · Daniel Chadambuka`;

// The root layout adds " · Daniel Chadambuka" to the title. Canonical and
// Open Graph are set here so the page is not read as a copy of the home page.
export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/hire" },
  openGraph: {
    title: SHARE_TITLE,
    description: DESCRIPTION,
    type: "profile",
    locale: "en_US",
    url: "/hire",
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

export default function HireLayout({ children }: { children: ReactNode }) {
  return children;
}
