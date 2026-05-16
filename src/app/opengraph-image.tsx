import { ImageResponse } from "next/og";

export const runtime = "nodejs";
export const alt = "Daniel Chadambuka — Software Engineer";
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
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#080808",
          padding: "72px 80px",
          color: "#ffffff",
          fontFamily: "system-ui, -apple-system, Segoe UI, sans-serif",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "-220px",
            right: "-220px",
            width: "640px",
            height: "640px",
            borderRadius: "50%",
            background: "rgba(0, 229, 192, 0.22)",
            filter: "blur(120px)",
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-200px",
            left: "-200px",
            width: "520px",
            height: "520px",
            borderRadius: "50%",
            background: "rgba(0, 229, 192, 0.12)",
            filter: "blur(120px)",
            display: "flex",
          }}
        />

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            fontSize: "22px",
            fontWeight: 700,
            letterSpacing: "-0.01em",
            position: "relative",
          }}
        >
          <span style={{ display: "flex", alignItems: "baseline" }}>
            DAC<span style={{ color: "#00E5C0" }}>.</span>
          </span>
          <span
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
              fontSize: "13px",
              fontWeight: 500,
              letterSpacing: "0.2em",
              color: "rgba(255,255,255,0.5)",
              textTransform: "uppercase",
              marginLeft: "12px",
            }}
          >
            <span
              style={{
                width: "10px",
                height: "10px",
                borderRadius: "999px",
                background: "#00E5C0",
                boxShadow: "0 0 16px #00E5C0",
                display: "flex",
              }}
            />
            Available for work
          </span>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            position: "relative",
          }}
        >
          <div
            style={{
              fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
              fontSize: "16px",
              fontWeight: 500,
              letterSpacing: "0.22em",
              color: "#00E5C0",
              textTransform: "uppercase",
              marginBottom: "26px",
              display: "flex",
            }}
          >
            {"// Software Engineer"}
          </div>
          <div
            style={{
              fontSize: "128px",
              fontWeight: 700,
              letterSpacing: "-0.045em",
              lineHeight: 0.95,
              color: "#ffffff",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <span style={{ display: "flex" }}>Daniel</span>
            <span style={{ display: "flex" }}>
              Chadambuka
              <span
                style={{
                  display: "flex",
                  width: "22px",
                  height: "22px",
                  background: "#00E5C0",
                  marginLeft: "12px",
                  marginTop: "auto",
                  borderRadius: "3px",
                  boxShadow: "0 0 32px rgba(0, 229, 192, 0.6)",
                }}
              />
            </span>
          </div>
          <div
            style={{
              marginTop: "30px",
              maxWidth: "820px",
              fontSize: "26px",
              lineHeight: 1.45,
              color: "rgba(255,255,255,0.65)",
              fontWeight: 400,
              display: "flex",
            }}
          >
            Real-world systems. Computer vision on the edge,
            production web platforms, AI you can actually ship.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
            fontSize: "16px",
            color: "rgba(255,255,255,0.45)",
            letterSpacing: "0.06em",
            position: "relative",
          }}
        >
          <span style={{ display: "flex" }}>Harare · Zimbabwe</span>
          <span style={{ display: "flex" }}>dev.danielchadambuka.com</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
