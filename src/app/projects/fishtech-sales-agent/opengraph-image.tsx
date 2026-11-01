import { OG_MONO, OG_SIZE, OgBubble, OgPhone, caseStudyOgImage } from "@/lib/caseStudyOgImage";

export const runtime = "nodejs";
export const alt = "FishTech Sales Agent & Ops · Case study";
export const size = OG_SIZE;
export const contentType = "image/png";

// Panel in FishTech's Deep Ocean: a phone with a chat and a quotation PDF.
export default async function OpengraphImage() {
  return caseStudyOgImage({
    titleLines: ["FishTech", "Sales Agent", "& Ops."],
    blurb:
      "An agent on FishTech's WhatsApp line. Answers in English or Shona, prices from one list, sends PDF quotations. Code checks every reply.",
    footNote: "WhatsApp agent · ops console",
    panelBackground: "linear-gradient(145deg, #0B4A6B 0%, #04263F 55%, #021626 100%)",
    panel: (
      <OgPhone>
        <OgBubble side="left" width="70%" />
        <OgBubble side="right" width="82%" accent />
        <OgBubble side="right" width="60%" accent />
        <OgBubble side="left" width="55%" />
        <div
          style={{
            display: "flex",
            alignSelf: "flex-end",
            alignItems: "center",
            gap: "8px",
            width: "82%",
            padding: "10px",
            borderRadius: "12px",
            background: "rgba(0,229,192,0.18)",
            border: "1px solid rgba(0,229,192,0.5)",
            color: "#00E5C0",
            fontFamily: OG_MONO,
            fontSize: "12px",
          }}
        >
          <span style={{ display: "flex", width: "22px", height: "28px", borderRadius: "4px", border: "2px solid #00E5C0" }} />
          Quotation.pdf
        </div>
        <OgBubble side="left" width="48%" />
      </OgPhone>
    ),
  });
}
