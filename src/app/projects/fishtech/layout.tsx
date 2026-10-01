import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "FishTech Precision Feeding System · Daniel Chadambuka",
  description:
    "Closed-loop edge computer-vision instrument for smallholder pond aquaculture in Zimbabwe. Raspberry Pi 5 with Hailo NPU, custom-trained YOLO vision, stratified biomass estimation, and an automated auger feeder. Working prototype, pilot deployment in preparation.",
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
