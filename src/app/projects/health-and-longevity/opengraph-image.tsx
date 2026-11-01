import { OG_SIZE, OgPhone, caseStudyOgImage } from "@/lib/caseStudyOgImage";

export const runtime = "nodejs";
export const alt = "Health & Longevity · Case study";
export const size = OG_SIZE;
export const contentType = "image/png";

// Panel in the platform's own navy and green: a phone with its home tiles.
const TILES = ["#E4EEF8", "#FCE9E4", "#0B2A4A", "#E6F5E8", "#FDF3DC", "#FDF3DC"];

export default async function OpengraphImage() {
  return caseStudyOgImage({
    titleLines: ["Health &", "Longevity."],
    blurb:
      "Health platform for a Harare doctor. Paynow membership, consult booking, paid articles and lessons, nurse-aide matching. Encrypted, offline, run from a phone.",
    footNote: "healthandlongevity.co.zw",
    panelBackground: "linear-gradient(145deg, #0A5FA3 0%, #014A81 45%, #013761 100%)",
    panel: (
      <OgPhone>
        <div style={{ display: "flex", height: "70px", borderRadius: "14px", background: "#014A81", border: "1px solid rgba(143,226,155,0.35)" }} />
        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
          {TILES.map((color, i) => (
            <div key={i} style={{ display: "flex", width: "73px", height: "62px", borderRadius: "12px", background: color }} />
          ))}
        </div>
        <div style={{ display: "flex", height: "54px", borderRadius: "14px", background: "#0A5FA3" }} />
      </OgPhone>
    ),
  });
}
