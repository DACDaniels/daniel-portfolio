import { OG_SIZE, OgPhone, caseStudyOgImage } from "@/lib/caseStudyOgImage";

export const runtime = "nodejs";
export const alt = "The Endoscopy Suite · Project";
export const size = OG_SIZE;
export const contentType = "image/png";

export default async function OpengraphImage() {
  return caseStudyOgImage({
    eyebrow: "// project",
    badge: "Live",
    titleLines: ["The Endoscopy", "Suite."],
    blurb:
      "Website for a Harare endoscopy and surgery practice. Services in plain words, preparation timetables, booking requests confirmed on WhatsApp.",
    footNote: "endoscopysuite.co.zw",
    panelBackground: "linear-gradient(145deg, #16376F 0%, #0B2148 50%, #061430 100%)",
    panel: (
      <OgPhone>
        <div style={{ display: "flex", height: "64px", borderRadius: "14px", background: "#16376F", border: "1px solid rgba(255,255,255,0.18)" }} />
        {[0, 1, 2, 3].map((i) => (
          <div key={i} style={{ display: "flex", height: "40px", borderRadius: "10px", background: i === 0 ? "rgba(0,229,192,0.22)" : "rgba(255,255,255,0.1)" }} />
        ))}
        <div style={{ display: "flex", height: "48px", borderRadius: "24px", background: "#25D366" }} />
      </OgPhone>
    ),
  });
}
