import { OG_SIZE, OgPhone, caseStudyOgImage } from "@/lib/caseStudyOgImage";

export const runtime = "nodejs";
export const alt = "Steadyhands Catering · Project";
export const size = OG_SIZE;
export const contentType = "image/png";

export default async function OpengraphImage() {
  return caseStudyOgImage({
    eyebrow: "// project",
    badge: "Live",
    titleLines: ["Steadyhands", "Catering."],
    blurb:
      "Website and ordering platform for SteadyHands at Bata Club, Gweru. Online ordering with Paynow, WhatsApp orders, table and venue booking.",
    footNote: "steadyhandscatering.com",
    panelBackground: "linear-gradient(145deg, #f5f5f0 0%, #e8e4d9 100%)",
    panel: (
      <OgPhone>
        <div style={{ display: "flex", height: "70px", borderRadius: "14px", background: "#e8e4d9" }} />
        {[0, 1, 2].map((i) => (
          <div key={i} style={{ display: "flex", height: "46px", borderRadius: "10px", background: "rgba(255,255,255,0.12)" }} />
        ))}
        <div style={{ display: "flex", height: "48px", borderRadius: "24px", background: "#00E5C0" }} />
      </OgPhone>
    ),
  });
}
