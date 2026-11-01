import { OG_SIZE, caseStudyOgImage } from "@/lib/caseStudyOgImage";

export const runtime = "nodejs";
export const alt = "FishTech Feeder · Project";
export const size = OG_SIZE;
export const contentType = "image/png";

export default async function OpengraphImage() {
  return caseStudyOgImage({
    eyebrow: "// project",
    badge: "Prototype",
    titleLines: ["FishTech", "Feeder."],
    blurb:
      "Working prototype of a solar automatic fish feeder in welded steel. Counted auger revolutions meter each dose, a spinning disc spreads it. No internet.",
    footNote: "Working prototype · ZAS 2026",
    panelBackground: "linear-gradient(145deg, #3A2E12 0%, #1E1708 60%, #0E0B04 100%)",
    panel: (
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0px" }}>
        <div style={{ display: "flex", width: "0", height: "0", borderLeft: "110px solid transparent", borderRight: "110px solid transparent", borderTop: "120px solid #9AA3A8" }} />
        <div style={{ display: "flex", width: "190px", height: "120px", background: "#7D868B", borderRadius: "6px", border: "2px solid #FFC04D" }} />
        <div style={{ display: "flex", width: "150px", height: "10px", marginTop: "18px", borderRadius: "5px", background: "#FFC04D" }} />
        <div style={{ display: "flex", gap: "120px", marginTop: "-4px" }}>
          <div style={{ display: "flex", width: "8px", height: "120px", background: "#5F676B" }} />
          <div style={{ display: "flex", width: "8px", height: "120px", background: "#5F676B" }} />
        </div>
      </div>
    ),
  });
}
