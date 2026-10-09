import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";

const TITLE = "FishTech Precision Feeding System";
const DESCRIPTION =
  "Closed-loop edge computer-vision instrument for smallholder pond aquaculture in Zimbabwe. Raspberry Pi 5 with Hailo NPU, custom-trained YOLO vision, stratified biomass estimation, and an automated auger feeder. Working prototype, pilot deployment in preparation.";
const SHARE_TITLE = `${TITLE} · Daniel Chadambuka`;

// The root layout adds " · Daniel Chadambuka" to the title, so the title
// here is the page name only. Canonical, Open Graph and Twitter values must
// be set here, or the page inherits the home page's and Google treats it
// as a copy of the home page.
export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: {
    canonical: "/projects/fishtech",
  },
  openGraph: {
    title: SHARE_TITLE,
    description: DESCRIPTION,
    type: "article",
    locale: "en_US",
    url: "/projects/fishtech",
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

export default function FishTechCaseStudyLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <>{children}</>;
}
