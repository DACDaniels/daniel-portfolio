import { ImageResponse } from "next/og";

export const runtime = "nodejs";
export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default async function Icon() {
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
          fontSize: 17,
          letterSpacing: "-0.06em",
        }}
      >
        <span style={{ display: "flex", alignItems: "baseline" }}>
          D<span style={{ color: "#00E5C0" }}>.</span>
        </span>
      </div>
    ),
    { ...size },
  );
}
