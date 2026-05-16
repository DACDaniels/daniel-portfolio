export function SteadyhandsMock() {
  return (
    <div
      aria-hidden
      inert
      className="relative flex h-full w-full items-center justify-center bg-gradient-to-br from-[#f5f5f0] to-[#e8e4d9] p-4"
    >
      <div className="w-[88%] overflow-hidden rounded-sm bg-white shadow-[0_8px_24px_rgba(0,0,0,0.25)]">
        <div className="flex items-center gap-1 bg-[#e6e2d6] px-2 py-1.5">
          <span className="block h-1.5 w-1.5 rounded-full bg-black/20" />
          <span className="block h-1.5 w-1.5 rounded-full bg-black/20" />
          <span className="block h-1.5 w-1.5 rounded-full bg-black/20" />
          <span
            className="ml-2 text-black/50"
            style={{
              fontFamily: "var(--font-jetbrains-mono)",
              fontSize: "8px",
            }}
          >
            steadyhandscatering.com
          </span>
        </div>
        <div className="flex justify-center gap-3 border-t border-black/5 bg-[#e6e2d6] px-2 py-1">
          {["Menu", "Order", "Events", "About"].map((item) => (
            <span
              key={item}
              className="text-black/50"
              style={{ fontFamily: "system-ui, sans-serif", fontSize: "8px" }}
            >
              {item}
            </span>
          ))}
        </div>
        <div className="bg-[#e8e4d9] px-3 py-4 text-center">
          <div
            className="text-[#2c2c28]"
            style={{
              fontFamily: '"Times New Roman", Times, serif',
              fontSize: "18px",
              letterSpacing: "-0.01em",
              marginBottom: "2px",
            }}
          >
            SteadyHands
          </div>
          <div
            className="text-black/50"
            style={{
              fontFamily: "system-ui, sans-serif",
              fontSize: "7px",
              letterSpacing: "0.25em",
            }}
          >
            @ BATA CLUB
          </div>
        </div>
      </div>
    </div>
  );
}
