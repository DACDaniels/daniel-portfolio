export function EndoscopySuiteMock() {
  return (
    <div
      aria-hidden
      inert
      className="relative flex h-full w-full items-center justify-center bg-gradient-to-br from-[#16376F] to-[#061430] p-4"
    >
      <div className="w-[88%] overflow-hidden rounded-sm bg-[#F3F6F9] shadow-[0_8px_24px_rgba(0,0,0,0.35)]">
        <div className="flex items-center gap-1 bg-[#DDE5EE] px-2 py-1.5">
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
            endoscopy-suite.pages.dev
          </span>
        </div>
        <div className="flex items-center justify-between border-t border-black/5 bg-white px-3 py-1.5">
          <span
            className="text-[#0E2858]"
            style={{
              fontFamily: 'Georgia, "Times New Roman", serif',
              fontSize: "9px",
              letterSpacing: "0.01em",
            }}
          >
            The Endoscopy Suite
          </span>
          <div className="flex gap-3">
            {["Procedures", "Emergencies", "Refer", "Book"].map((item) => (
              <span
                key={item}
                className="text-[#3F5068]"
                style={{ fontFamily: "system-ui, sans-serif", fontSize: "7px" }}
              >
                {item}
              </span>
            ))}
          </div>
        </div>
        <div className="px-4 pb-4 pt-5">
          <div
            className="text-[#0B1A30]"
            style={{
              fontFamily: 'Georgia, "Times New Roman", serif',
              fontSize: "19px",
              letterSpacing: "-0.015em",
              lineHeight: 1.15,
            }}
          >
            Every scope and operation,
            <br />
            <span className="italic text-[#875C1F]">in plain words.</span>
          </div>
          <div
            className="mt-2 text-[#67788E]"
            style={{
              fontFamily: "system-ui, sans-serif",
              fontSize: "7px",
              letterSpacing: "0.04em",
            }}
          >
            Belvedere, Harare · Monday to Saturday
          </div>
          <div className="mt-3 flex items-center gap-2">
            <span
              className="rounded-full bg-[#0E2858] px-2.5 py-1 text-white"
              style={{ fontFamily: "system-ui, sans-serif", fontSize: "7px" }}
            >
              Pick an open time
            </span>
            <span
              className="rounded-full border border-[#0E2858]/25 px-2.5 py-1 text-[#0E2858]"
              style={{ fontFamily: "system-ui, sans-serif", fontSize: "7px" }}
            >
              Choose your procedure
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
