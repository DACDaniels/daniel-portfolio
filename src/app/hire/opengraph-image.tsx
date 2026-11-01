import { OG_SIZE, caseStudyOgImage } from "@/lib/caseStudyOgImage";

export const runtime = "nodejs";
export const alt = "Hiring? Start here · Daniel Chadambuka";
export const size = OG_SIZE;
export const contentType = "image/png";

const ROLES = ["Full-stack", "Systems and edge", "AI and automation"];

export default async function OpengraphImage() {
  return caseStudyOgImage({
    eyebrow: "// hiring",
    badge: "Open to work",
    titleLines: ["Hiring?", "Start here."],
    blurb:
      "Open to full-time software engineering roles, remote or in Zimbabwe. Five live systems, BSc Hons Computer Science, NUST.",
    footNote: "Harare · UTC+2",
    panelBackground:
      "linear-gradient(160deg, #0d1f1c 0%, #0b1513 55%, #080808 100%)",
    panel: (
      <div style={{ display: "flex", flexDirection: "column", gap: "14px", width: "100%" }}>
        {ROLES.map((role) => (
          <div
            key={role}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              padding: "16px 18px",
              borderRadius: "16px",
              border: "1px solid rgba(0,229,192,0.3)",
              background: "rgba(0,229,192,0.06)",
              fontSize: "20px",
              fontWeight: 600,
              color: "#ffffff",
            }}
          >
            <span style={{ display: "flex", width: "8px", height: "8px", borderRadius: "999px", background: "#00E5C0" }} />
            {role}
          </div>
        ))}
      </div>
    ),
  });
}
