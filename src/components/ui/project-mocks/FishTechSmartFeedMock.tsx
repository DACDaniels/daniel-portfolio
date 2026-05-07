export function FishTechSmartFeedMock() {
  return (
    <div className="relative h-full w-full bg-gradient-to-br from-[#0a1a2e] to-[#153a52]">
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,229,192,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0,229,192,0.05) 1px, transparent 1px)",
          backgroundSize: "14px 14px",
        }}
      />

      <BoundingBox top="28%" left="18%" width="36%" height="22%" label="fish 0.94" />
      <BoundingBox top="52%" left="48%" width="32%" height="20%" label="fish 0.88" />
    </div>
  );
}

function BoundingBox({
  top,
  left,
  width,
  height,
  label,
}: {
  top: string;
  left: string;
  width: string;
  height: string;
  label: string;
}) {
  return (
    <div
      className="absolute rounded-sm"
      style={{
        top,
        left,
        width,
        height,
        border: "1.5px solid #00E5C0",
      }}
    >
      <span
        className="absolute text-accent"
        style={{
          top: "-12px",
          left: "0",
          fontFamily: "var(--font-jetbrains-mono)",
          fontSize: "8px",
          padding: "1px 4px",
          background: "rgba(0, 0, 0, 0.9)",
          lineHeight: 1,
        }}
      >
        {label}
      </span>
    </div>
  );
}
