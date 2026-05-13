import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "FishTech Precision Feeding System · Daniel Chadambuka",
  description:
    "Closed-loop edge-AI instrument for African pond aquaculture. Raspberry Pi 5 with Hailo NPU, custom-trained YOLO vision, stratified biomass estimation, and an automated auger feeder. Late-stage prototype, industrialising for pilot deployment in 2026.",
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
