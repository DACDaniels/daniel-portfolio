export function PortfolioMock() {
  return (
    <div className="relative flex h-full w-full items-center justify-center overflow-hidden bg-black p-4">
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(rgba(0,229,192,0.08) 1px, transparent 1px)",
          backgroundSize: "12px 12px",
        }}
      />
      <pre
        className="relative text-left text-white/90"
        style={{
          fontFamily: "var(--font-jetbrains-mono)",
          fontSize: "10px",
          lineHeight: 1.5,
          margin: 0,
        }}
      >
        <span className="text-white/35">{"// portfolio"}</span>
        {"\n"}
        <span className="text-[#ff7bac]">const</span>
        {" daniel = {\n  role: "}
        <span className="text-accent">{'"SWE"'}</span>
        {",\n  ships: "}
        <span className="text-[#ff7bac]">true</span>
        {"\n}"}
      </pre>
    </div>
  );
}
