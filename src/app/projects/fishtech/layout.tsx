import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "FishTech Smart Feed System — Daniel Chadambuka",
  description:
    "Computer vision pipeline for fish biomass estimation using YOLOv8 and length-weight regression. Final-year research prototype, NUST Zimbabwe, November 2025.",
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
