export function FishTechSmartFeedMock() {
  return (
    <div
      aria-hidden
      className="relative h-full w-full overflow-hidden bg-gradient-to-br from-[#06182a] to-[#143850]"
    >
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,229,192,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(0,229,192,0.06) 1px, transparent 1px)",
          backgroundSize: "16px 16px",
        }}
      />

      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 50% at 50% 50%, rgba(0,229,192,0.08), transparent 70%)",
        }}
      />

      <CharucoCorner />

      <DepthScale />

      <Detection
        top="22%"
        left="14%"
        width="38%"
        height="20%"
        label="fish · 0.94"
        lengthLabel="L ≈ 24cm"
        keypoints={[
          { x: 6, y: 50 },
          { x: 30, y: 38 },
          { x: 62, y: 52 },
          { x: 94, y: 56 },
        ]}
      />

      <Detection
        top="54%"
        left="44%"
        width="34%"
        height="18%"
        label="fish · 0.88"
        lengthLabel="L ≈ 21cm"
        keypoints={[
          { x: 4, y: 48 },
          { x: 28, y: 60 },
          { x: 60, y: 50 },
          { x: 94, y: 56 },
        ]}
      />

      <FeedReadout />
    </div>
  );
}

type Keypoint = { x: number; y: number };

function Detection({
  top,
  left,
  width,
  height,
  label,
  lengthLabel,
  keypoints,
}: {
  top: string;
  left: string;
  width: string;
  height: string;
  label: string;
  lengthLabel: string;
  keypoints: Keypoint[];
}) {
  return (
    <div
      className="absolute"
      style={{ top, left, width, height }}
    >
      <div
        className="absolute inset-0 rounded-[3px]"
        style={{
          border: "1.5px solid #00E5C0",
          boxShadow: "0 0 18px rgba(0,229,192,0.18)",
        }}
      />

      <svg
        aria-hidden
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className="absolute inset-0 h-full w-full"
      >
        <polyline
          points={keypoints.map((p) => `${p.x},${p.y}`).join(" ")}
          fill="none"
          stroke="rgba(0,229,192,0.6)"
          strokeWidth="0.6"
          strokeDasharray="2 1.5"
          vectorEffect="non-scaling-stroke"
        />
        {keypoints.map((p, i) => (
          <circle
            key={i}
            cx={p.x}
            cy={p.y}
            r="1.4"
            fill="#00E5C0"
            stroke="rgba(8,8,8,0.8)"
            strokeWidth="0.4"
            vectorEffect="non-scaling-stroke"
          />
        ))}
      </svg>

      <span
        className="absolute -top-[18px] left-0 inline-flex items-center gap-1 rounded-sm bg-black/85 px-1.5 py-[2px] text-accent"
        style={{
          fontFamily: "var(--font-jetbrains-mono)",
          fontSize: "8.5px",
          letterSpacing: "0.02em",
          lineHeight: 1,
        }}
      >
        {label}
      </span>

      <span
        className="absolute -bottom-[18px] right-0 inline-flex items-center gap-1 rounded-sm bg-black/85 px-1.5 py-[2px] text-white/90"
        style={{
          fontFamily: "var(--font-jetbrains-mono)",
          fontSize: "8.5px",
          letterSpacing: "0.02em",
          lineHeight: 1,
        }}
      >
        {lengthLabel}
      </span>
    </div>
  );
}

function CharucoCorner() {
  const cells = [
    [1, 0, 1, 0],
    [0, 1, 0, 1],
    [1, 0, 1, 0],
    [0, 1, 0, 1],
  ];
  return (
    <div
      aria-hidden
      className="absolute"
      style={{
        bottom: "8%",
        left: "6%",
        width: "44px",
        height: "44px",
        background: "rgba(0,0,0,0.6)",
        border: "1px solid rgba(0,229,192,0.45)",
        padding: "2px",
        boxShadow: "0 0 12px rgba(0,229,192,0.15)",
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gridTemplateRows: "repeat(4, 1fr)",
          width: "100%",
          height: "100%",
          gap: "1px",
        }}
      >
        {cells.flat().map((c, i) => (
          <span
            key={i}
            style={{
              background: c ? "#ffffff" : "#000000",
            }}
          />
        ))}
      </div>
      <span
        className="absolute -top-3 left-0 text-accent"
        style={{
          fontFamily: "var(--font-jetbrains-mono)",
          fontSize: "8px",
          letterSpacing: "0.1em",
        }}
      >
        charuco
      </span>
    </div>
  );
}

function DepthScale() {
  const ticks = [0, 0.25, 0.5, 0.75, 1];
  return (
    <div
      aria-hidden
      className="absolute"
      style={{
        right: "4%",
        top: "12%",
        bottom: "12%",
        width: "18px",
      }}
    >
      <div
        className="absolute"
        style={{
          left: "50%",
          top: 0,
          bottom: 0,
          width: "1px",
          background: "rgba(0,229,192,0.45)",
        }}
      />
      {ticks.map((t) => (
        <div
          key={t}
          className="absolute flex items-center gap-1"
          style={{
            top: `${t * 100}%`,
            left: 0,
            transform: "translateY(-50%)",
          }}
        >
          <span
            style={{
              width: "8px",
              height: "1px",
              background: "rgba(0,229,192,0.7)",
              marginLeft: "4px",
            }}
          />
          <span
            className="text-accent"
            style={{
              fontFamily: "var(--font-jetbrains-mono)",
              fontSize: "7px",
              letterSpacing: "0.02em",
            }}
          >
            {(t * 1.2).toFixed(1)}m
          </span>
        </div>
      ))}
      <span
        className="absolute text-accent"
        style={{
          top: "-14px",
          left: "0",
          fontFamily: "var(--font-jetbrains-mono)",
          fontSize: "7.5px",
          letterSpacing: "0.1em",
          textTransform: "uppercase",
        }}
      >
        depth
      </span>
    </div>
  );
}

function FeedReadout() {
  return (
    <div
      aria-hidden
      className="absolute"
      style={{
        top: "8%",
        right: "20%",
        background: "rgba(0,0,0,0.7)",
        border: "1px solid rgba(0,229,192,0.35)",
        borderRadius: "2px",
        padding: "4px 8px",
        backdropFilter: "blur(6px)",
      }}
    >
      <div
        className="text-white/45"
        style={{
          fontFamily: "var(--font-jetbrains-mono)",
          fontSize: "7px",
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          marginBottom: "1px",
        }}
      >
        dose
      </div>
      <div
        className="text-accent"
        style={{
          fontFamily: "var(--font-jetbrains-mono)",
          fontSize: "11px",
          fontWeight: 500,
          letterSpacing: "0.02em",
          lineHeight: 1,
        }}
      >
        42<span style={{ fontSize: "8px", marginLeft: "1px" }}>g</span>
      </div>
    </div>
  );
}
