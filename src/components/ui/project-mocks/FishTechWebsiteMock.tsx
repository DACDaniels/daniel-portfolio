export function FishTechWebsiteMock() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center bg-gradient-to-br from-[#0e5066] to-[#1a7692] text-center">
      <div
        className="text-white/95"
        style={{
          fontFamily: "var(--font-geist), system-ui, sans-serif",
          fontWeight: 700,
          fontSize: "24px",
          letterSpacing: "-0.02em",
          lineHeight: 1,
        }}
      >
        FishTech
      </div>
      <div
        className="mt-0.5 text-white/60"
        style={{
          fontFamily: "system-ui, sans-serif",
          fontSize: "8px",
          letterSpacing: "0.3em",
          textTransform: "uppercase",
        }}
      >
        Consultancy
      </div>
      <div
        className="mt-3 flex h-5 w-5 items-center justify-center rounded-full bg-[#25D366] text-white"
        style={{
          fontFamily: "var(--font-geist), system-ui, sans-serif",
          fontWeight: 700,
          fontSize: "10px",
          lineHeight: 1,
        }}
      >
        W
      </div>
    </div>
  );
}
