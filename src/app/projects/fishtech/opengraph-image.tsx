import { ImageResponse } from "next/og";

export const runtime = "nodejs";
export const alt = "FishTech Precision Feeding System — Case study";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
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
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "26px",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "14px",
                fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
                fontSize: "14px",
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: "#00E5C0",
              }}
            >
              <span style={{ display: "flex" }}>{"// case study"}</span>
              <span
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  border: "1px solid rgba(255,192,77,0.4)",
                  color: "#FFC04D",
                  padding: "5px 12px",
                  borderRadius: "999px",
                  fontSize: "12px",
                  letterSpacing: "0.18em",
                }}
              >
                <span
                  style={{
                    width: "7px",
                    height: "7px",
                    borderRadius: "999px",
                    background: "#FFC04D",
                    display: "flex",
                  }}
                />
                Building
              </span>
            </div>

            <div
              style={{
                fontSize: "82px",
                fontWeight: 700,
                letterSpacing: "-0.035em",
                lineHeight: 1.02,
                display: "flex",
                flexDirection: "column",
              }}
            >
              <span style={{ display: "flex" }}>FishTech</span>
              <span style={{ display: "flex" }}>Precision Feeding</span>
              <span style={{ display: "flex", color: "#00E5C0" }}>System.</span>
            </div>

            <div
              style={{
                maxWidth: "640px",
                fontSize: "22px",
                lineHeight: 1.45,
                color: "rgba(255,255,255,0.65)",
                display: "flex",
              }}
            >
              Closed-loop edge-AI instrument for African pond aquaculture.
              Raspberry Pi 5 + Hailo NPU, custom YOLO vision, automated auger feeder.
            </div>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
              fontSize: "15px",
              color: "rgba(255,255,255,0.5)",
              letterSpacing: "0.06em",
            }}
          >
            <span style={{ display: "flex" }}>
              Daniel Chadambuka · Software Engineer
            </span>
            <span style={{ display: "flex" }}>Pilot 2026</span>
          </div>
        </div>

        <div
          style={{
            width: "320px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            background:
              "linear-gradient(145deg, #0a1a2e 0%, #153a52 100%)",
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
          <div
            style={{
              position: "relative",
              width: "200px",
              height: "120px",
              border: "2px solid #00E5C0",
              borderRadius: "4px",
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "flex-start",
              padding: "4px 6px",
              boxShadow: "0 0 24px rgba(0,229,192,0.25)",
            }}
          >
            <span
              style={{
                position: "absolute",
                top: "-22px",
                left: "0",
                background: "rgba(0,0,0,0.85)",
                color: "#00E5C0",
                fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
                fontSize: "11px",
                padding: "2px 6px",
                letterSpacing: "0.05em",
                display: "flex",
              }}
            >
              fish · 0.94
            </span>
            <span
              style={{
                color: "rgba(0,229,192,0.7)",
                fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
                fontSize: "11px",
                display: "flex",
              }}
            >
              L ≈ 24cm
            </span>
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
