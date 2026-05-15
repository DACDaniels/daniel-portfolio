import { ImageResponse } from "next/og";

export const runtime = "nodejs";
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default async function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#080808",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "system-ui, -apple-system, Segoe UI, sans-serif",
          color: "#ffffff",
          fontWeight: 700,
          fontSize: 78,
          letterSpacing: "-0.04em",
          position: "relative",
        }}
      >
        <span
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(circle at 70% 20%, rgba(0,229,192,0.30), transparent 60%)",
            display: "flex",
          }}
        />
        <span style={{ position: "relative", display: "flex", alignItems: "baseline" }}>
          DAC<span style={{ color: "#00E5C0" }}>.</span>
        </span>
      </div>
    ),
    { ...size },
  );
}
