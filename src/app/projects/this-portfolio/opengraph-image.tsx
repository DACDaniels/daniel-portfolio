import { OG_MONO, OG_SIZE, caseStudyOgImage } from "@/lib/caseStudyOgImage";

export const runtime = "nodejs";
export const alt = "This Portfolio · Project";
export const size = OG_SIZE;
export const contentType = "image/png";

export default async function OpengraphImage() {
  return caseStudyOgImage({
    eyebrow: "// project",
    badge: "Meta",
    titleLines: ["This", "Portfolio."],
    blurb:
      "Next.js 16 and TypeScript. Live status checks of the systems it shows, a filter tested in every order, search checks on every build.",
    footNote: "github.com/DACDaniels/daniel-portfolio",
    panelBackground: "radial-gradient(circle at 30% 20%, #0f2a25 0%, #080808 70%)",
    panel: (
      <div style={{ display: "flex", flexDirection: "column", gap: "10px", padding: "28px", borderRadius: "16px", background: "#0d0d0d", border: "1px solid rgba(0,229,192,0.35)", fontFamily: OG_MONO, fontSize: "20px", color: "rgba(255,255,255,0.85)" }}>
        <div style={{ display: "flex", color: "rgba(255,255,255,0.45)" }}>{"// preflight"}</div>
        {["lint", "types", "build", "search", "filters"].map((s) => (
          <div key={s} style={{ display: "flex", gap: "12px" }}>
            <span style={{ display: "flex", width: "14px", height: "14px", marginTop: "5px", borderRadius: "4px", background: "#00E5C0" }} />
            <span>{s}</span>
          </div>
        ))}
      </div>
    ),
  });
}
