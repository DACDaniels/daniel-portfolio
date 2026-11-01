import { OG_SIZE, OgPhone, caseStudyOgImage } from "@/lib/caseStudyOgImage";

export const runtime = "nodejs";
export const alt = "FishTech Consultancy · Project";
export const size = OG_SIZE;
export const contentType = "image/png";

export default async function OpengraphImage() {
  return caseStudyOgImage({
    eyebrow: "// project",
    badge: "Live",
    titleLines: ["FishTech", "Consultancy."],
    blurb:
      "Company site with prices from one shared feed and a pond calculator that sends to WhatsApp for a written quote.",
    footNote: "fishtech.co.zw",
    panelBackground: "linear-gradient(145deg, #0B4A6B 0%, #04263F 55%, #021626 100%)",
    panel: (
      <OgPhone>
        <div style={{ display: "flex", height: "110px", borderRadius: "14px", background: "rgba(0,229,192,0.14)", border: "2px dashed rgba(0,229,192,0.6)" }} />
        <div style={{ display: "flex", gap: "8px" }}>
          <div style={{ display: "flex", flex: 1, height: "40px", borderRadius: "10px", background: "rgba(255,255,255,0.12)" }} />
          <div style={{ display: "flex", flex: 1, height: "40px", borderRadius: "10px", background: "rgba(255,255,255,0.12)" }} />
        </div>
        <div style={{ display: "flex", height: "48px", borderRadius: "24px", background: "#25D366" }} />
      </OgPhone>
    ),
  });
}
