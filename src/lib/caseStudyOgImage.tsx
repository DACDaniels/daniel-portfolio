import { ImageResponse } from "next/og";
import type { ReactNode } from "react";

// Share image for the live case studies, in the style of the FishTech one:
// near-black left panel with the title, a coloured right panel with a small
// drawing in the client's own colours.

export const OG_SIZE = { width: 1200, height: 630 };

const MONO = "ui-monospace, SFMono-Regular, Menlo, monospace";

type Props = {
  titleLines: string[];
  blurb: string;
  footNote: string;
  panelBackground: string;
  panel: ReactNode;
  /** Mono label top left. Defaults to the case-study label. */
  eyebrow?: string;
  /** Pill beside the label. Defaults to "Live". */
  badge?: string;
};

export function caseStudyOgImage({
  titleLines,
  blurb,
  footNote,
  panelBackground,
  panel,
  eyebrow = "// case study",
  badge = "Live",
}: Props) {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          background: "#080808",
          color: "#ffffff",
          fontFamily: "system-ui, -apple-system, Segoe UI, sans-serif",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "-160px",
            right: "-160px",
            width: "560px",
            height: "560px",
            borderRadius: "50%",
            background: "rgba(0, 229, 192, 0.22)",
            filter: "blur(120px)",
            display: "flex",
          }}
        />
        <div
          style={{
            display: "flex",
            flex: 1,
            flexDirection: "column",
            padding: "70px 72px",
            justifyContent: "space-between",
            position: "relative",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: "26px" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "14px",
                fontFamily: MONO,
                fontSize: "14px",
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: "#00E5C0",
              }}
            >
              <span style={{ display: "flex" }}>{eyebrow}</span>
              <span
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  border: "1px solid rgba(0,229,192,0.4)",
                  color: "#00E5C0",
                  padding: "5px 12px",
                  borderRadius: "999px",
                  fontSize: "12px",
                  letterSpacing: "0.18em",
                }}
              >
                <span style={{ width: "7px", height: "7px", borderRadius: "999px", background: "#00E5C0", display: "flex" }} />
                {badge}
              </span>
            </div>
            <div
              style={{
                fontSize: "78px",
                fontWeight: 700,
                letterSpacing: "-0.035em",
                lineHeight: 1.02,
                display: "flex",
                flexDirection: "column",
              }}
            >
              {titleLines.map((line, i) => (
                <span key={line} style={{ display: "flex", color: i === titleLines.length - 1 ? "#00E5C0" : "#ffffff" }}>
                  {line}
                </span>
              ))}
            </div>
            <div style={{ maxWidth: "640px", fontSize: "22px", lineHeight: 1.45, color: "rgba(255,255,255,0.65)", display: "flex" }}>
              {blurb}
            </div>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              fontFamily: MONO,
              fontSize: "15px",
              color: "rgba(255,255,255,0.5)",
              letterSpacing: "0.06em",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ display: "flex" }}>Daniel Chadambuka</span>
              <span style={{ display: "flex" }}>{footNote}</span>
            </div>
            <span style={{ display: "flex", fontSize: "13px", letterSpacing: "0.12em", textTransform: "uppercase", color: "#00E5C0" }}>
              Software Engineer | IT Solutions Specialist | Technology Innovator
            </span>
          </div>
        </div>
        <div
          style={{
            width: "320px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            background: panelBackground,
            borderLeft: "1px solid rgba(255,255,255,0.06)",
            position: "relative",
            padding: "40px 28px",
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage:
                "linear-gradient(rgba(0,229,192,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(0,229,192,0.07) 1px, transparent 1px)",
              backgroundSize: "20px 20px",
              display: "flex",
            }}
          />
          {panel}
        </div>
      </div>
    ),
    { ...OG_SIZE },
  );
}

/** A small phone drawn in the panel, holding a column of rows. */
export function OgPhone({ children }: { children: ReactNode }) {
  return (
    <div
      style={{
        position: "relative",
        width: "190px",
        height: "380px",
        borderRadius: "30px",
        border: "2px solid rgba(255,255,255,0.25)",
        background: "rgba(5,10,20,0.85)",
        padding: "22px 14px",
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        boxShadow: "0 0 32px rgba(0,229,192,0.18)",
      }}
    >
      {children}
    </div>
  );
}

export function OgBubble({ side, width, accent }: { side: "left" | "right"; width: string; accent?: boolean }) {
  return (
    <div
      style={{
        display: "flex",
        alignSelf: side === "left" ? "flex-start" : "flex-end",
        width,
        height: "34px",
        borderRadius: "12px",
        background: accent ? "rgba(0,229,192,0.22)" : "rgba(255,255,255,0.12)",
        border: accent ? "1px solid rgba(0,229,192,0.45)" : "1px solid rgba(255,255,255,0.08)",
      }}
    />
  );
}

export const OG_MONO = MONO;
