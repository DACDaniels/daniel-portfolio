export function FishTechWebsiteMock() {
  return (
    <div
      aria-hidden
      className="relative flex h-full w-full items-center justify-center bg-gradient-to-br from-[#0a1e2c] to-[#0e3447] p-4"
    >
      <div className="w-[88%] overflow-hidden rounded-sm bg-[#0a1623] shadow-[0_8px_24px_rgba(0,0,0,0.45)]">
        <div className="flex items-center gap-1 border-b border-white/[0.06] bg-[#081420] px-2 py-1.5">
          <span className="block h-1.5 w-1.5 rounded-full bg-white/15" />
          <span className="block h-1.5 w-1.5 rounded-full bg-white/15" />
          <span className="block h-1.5 w-1.5 rounded-full bg-white/15" />
          <span
            className="ml-2 text-white/40"
            style={{
              fontFamily: "var(--font-jetbrains-mono)",
              fontSize: "8px",
            }}
          >
            fishtech.co.zw
          </span>
        </div>

        <div className="flex items-center justify-between border-b border-white/[0.04] bg-[#091826] px-2 py-1">
          <div className="flex items-center gap-1">
            <span
              className="block h-2 w-2 rounded-sm"
              style={{
                background: "linear-gradient(135deg, #00E5C0, #00a07e)",
              }}
            />
            <span
              className="text-white/85"
              style={{
                fontFamily: "var(--font-geist)",
                fontSize: "8px",
                fontWeight: 700,
                letterSpacing: "-0.02em",
              }}
            >
              FishTech
            </span>
          </div>
          <div className="flex gap-2.5">
            {["Services", "Process", "Contact"].map((item) => (
              <span
                key={item}
                className="text-white/40"
                style={{
                  fontFamily: "var(--font-dm-sans)",
                  fontSize: "6.5px",
                }}
              >
                {item}
              </span>
            ))}
          </div>
        </div>

        <div className="relative bg-[#0a1623] px-3 py-4 text-left">
          <div
            className="inline-flex items-center gap-1 rounded-full border border-accent/30 bg-accent/[0.08] px-1.5 py-0.5 text-accent"
            style={{
              fontFamily: "var(--font-jetbrains-mono)",
              fontSize: "5.5px",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              marginBottom: "5px",
            }}
          >
            <span
              className="block h-[3px] w-[3px] rounded-full bg-accent"
              aria-hidden
            />
            Zimbabwe aquaculture
          </div>
          <div
            className="text-white"
            style={{
              fontFamily: "var(--font-geist)",
              fontWeight: 700,
              fontSize: "13px",
              letterSpacing: "-0.025em",
              lineHeight: 1.1,
              marginBottom: "4px",
            }}
          >
            Precision
            <br />
            aquaculture
            <span style={{ color: "#00E5C0" }}>.</span>
          </div>
          <div
            className="text-white/55"
            style={{
              fontFamily: "var(--font-dm-sans)",
              fontSize: "7px",
              lineHeight: 1.5,
              maxWidth: "75%",
              marginBottom: "6px",
            }}
          >
            Edge-AI feeding systems engineered for African pond conditions.
          </div>

          <div className="flex items-center gap-1.5">
            <span
              className="inline-flex items-center gap-1 rounded-full bg-[#25D366] px-2 py-1 text-[#0a1623]"
              style={{
                fontFamily: "var(--font-dm-sans)",
                fontSize: "6.5px",
                fontWeight: 600,
              }}
            >
              <span
                style={{
                  width: "5px",
                  height: "5px",
                  borderRadius: "999px",
                  background: "#0a1623",
                  display: "inline-block",
                }}
              />
              WhatsApp us
            </span>
            <span
              className="inline-flex items-center rounded-full border border-white/15 px-2 py-1 text-white/70"
              style={{
                fontFamily: "var(--font-dm-sans)",
                fontSize: "6.5px",
                fontWeight: 500,
              }}
            >
              How it works
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
