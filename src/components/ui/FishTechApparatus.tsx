"use client";

export function FishTechApparatus() {
  return (
    <div className="relative h-full w-full overflow-hidden bg-gradient-to-b from-[#0d2538] via-[#0a1a2a] to-[#061421]">
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,229,192,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,229,192,0.04) 1px, transparent 1px)",
          backgroundSize: "20px 20px",
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(75% 60% at 50% 30%, rgba(0,229,192,0.08), transparent 70%)",
        }}
      />

      <svg
        viewBox="0 0 1200 720"
        className="absolute inset-0 h-full w-full"
        preserveAspectRatio="xMidYMid meet"
        aria-label="Side view of the FishTech apparatus showing the camera mast, auger feeder, and pond"
      >
        <defs>
          <linearGradient id="water" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgba(0,229,192,0.18)" />
            <stop offset="100%" stopColor="rgba(0,229,192,0)" />
          </linearGradient>
          <linearGradient id="steel" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#2a3340" />
            <stop offset="100%" stopColor="#0d1218" />
          </linearGradient>
          <linearGradient id="enclosure" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1d2530" />
            <stop offset="100%" stopColor="#0d1218" />
          </linearGradient>
          <pattern
            id="charucoPattern"
            width="6"
            height="6"
            patternUnits="userSpaceOnUse"
          >
            <rect width="3" height="3" fill="#ffffff" x="0" y="0" />
            <rect width="3" height="3" fill="#000000" x="3" y="0" />
            <rect width="3" height="3" fill="#000000" x="0" y="3" />
            <rect width="3" height="3" fill="#ffffff" x="3" y="3" />
          </pattern>
        </defs>

        <rect
          x="0"
          y="500"
          width="1200"
          height="220"
          fill="url(#water)"
        />
        <path
          d="M0 510 Q 100 502, 200 510 T 400 510 T 600 510 T 800 510 T 1000 510 T 1200 510"
          stroke="rgba(0,229,192,0.45)"
          strokeWidth="1.2"
          fill="none"
        />
        <path
          d="M0 540 Q 120 532, 240 540 T 480 540 T 720 540 T 960 540 T 1200 540"
          stroke="rgba(0,229,192,0.22)"
          strokeWidth="1"
          fill="none"
        />
        <path
          d="M0 570 Q 130 562, 260 570 T 520 570 T 780 570 T 1040 570 T 1200 570"
          stroke="rgba(0,229,192,0.14)"
          strokeWidth="1"
          fill="none"
        />

        <g transform="translate(540, 520)" style={{ filter: "drop-shadow(0 4px 12px rgba(0,229,192,0.25))" }}>
          <rect x="-6" y="-2" width="84" height="6" rx="1" fill="url(#steel)" />
          <rect x="-1" y="0" width="74" height="2" fill="rgba(0,229,192,0.3)" />
          <rect x="32" y="-10" width="14" height="14" rx="1" fill="url(#charucoPattern)" stroke="rgba(0,229,192,0.6)" strokeWidth="1" />
          <text
            x="50"
            y="22"
            fill="rgba(0,229,192,0.9)"
            fontFamily="var(--font-jetbrains-mono), monospace"
            fontSize="12"
            letterSpacing="0.05em"
          >
            ChArUco · ultrasonic
          </text>
        </g>

        <g transform="translate(820, 120)">
          <rect x="0" y="0" width="14" height="380" fill="url(#steel)" stroke="rgba(0,229,192,0.18)" strokeWidth="1" />
          <rect x="-6" y="370" width="26" height="12" fill="url(#steel)" />
          <rect x="-12" y="380" width="38" height="6" fill="url(#steel)" />

          <g>
            <rect x="-30" y="-44" width="74" height="46" rx="3" fill="url(#enclosure)" stroke="rgba(0,229,192,0.55)" strokeWidth="1.2" />
            <rect x="-22" y="-36" width="58" height="30" fill="#020608" stroke="rgba(0,229,192,0.5)" strokeWidth="0.8" />
            <circle cx="7" cy="-21" r="9" fill="#0a141d" stroke="rgba(0,229,192,0.7)" strokeWidth="1.2" />
            <circle cx="7" cy="-21" r="5" fill="rgba(0,229,192,0.18)" stroke="rgba(0,229,192,0.85)" strokeWidth="0.6" />
            <circle cx="7" cy="-21" r="1.6" fill="#00E5C0" />
            <text
              x="-30"
              y="-60"
              fill="rgba(0,229,192,0.95)"
              fontFamily="var(--font-jetbrains-mono), monospace"
              fontSize="12"
              letterSpacing="0.05em"
            >
              AI camera · IMX500
            </text>
          </g>

          <g transform="translate(20, 180)">
            <rect x="-6" y="-22" width="60" height="44" rx="3" fill="url(#enclosure)" stroke="rgba(0,229,192,0.5)" strokeWidth="1.2" />
            <rect x="0" y="-16" width="48" height="6" fill="rgba(0,229,192,0.18)" />
            <rect x="0" y="-6" width="48" height="3" fill="rgba(255,255,255,0.06)" />
            <rect x="0" y="0" width="48" height="3" fill="rgba(255,255,255,0.06)" />
            <rect x="0" y="6" width="48" height="3" fill="rgba(255,255,255,0.06)" />
            <text
              x="60"
              y="-10"
              fill="rgba(0,229,192,0.95)"
              fontFamily="var(--font-jetbrains-mono), monospace"
              fontSize="12"
              letterSpacing="0.05em"
            >
              Pi 5 · Hailo-8L · OLED
            </text>
            <text
              x="60"
              y="6"
              fill="rgba(255,255,255,0.45)"
              fontFamily="var(--font-jetbrains-mono), monospace"
              fontSize="10"
              letterSpacing="0.04em"
            >
              IP66 enclosure
            </text>
          </g>

          <g transform="translate(7, 320)">
            <rect x="-22" y="-22" width="58" height="32" rx="3" fill="url(#enclosure)" stroke="rgba(0,229,192,0.55)" strokeWidth="1.2" />
            <circle cx="-8" cy="-6" r="9" fill="none" stroke="rgba(0,229,192,0.7)" strokeWidth="1" />
            <path d="M-8 -6 L -1 -13 L 4 -3 L -3 4 Z" fill="rgba(0,229,192,0.6)" />
            <text
              x="42"
              y="-12"
              fill="rgba(0,229,192,0.95)"
              fontFamily="var(--font-jetbrains-mono), monospace"
              fontSize="12"
              letterSpacing="0.05em"
            >
              Auger feeder
            </text>
            <text
              x="42"
              y="2"
              fill="rgba(255,255,255,0.45)"
              fontFamily="var(--font-jetbrains-mono), monospace"
              fontSize="10"
              letterSpacing="0.04em"
            >
              Geared DC · 3D-printed
            </text>
          </g>

          <path
            d="M 17 60 Q 0 90 -20 130 Q -40 170 -50 230"
            stroke="rgba(0,229,192,0.25)"
            strokeWidth="1"
            strokeDasharray="3 3"
            fill="none"
          />
          <path
            d="M 17 60 Q 40 100 70 150 Q 100 200 120 250"
            stroke="rgba(0,229,192,0.25)"
            strokeWidth="1"
            strokeDasharray="3 3"
            fill="none"
          />
        </g>

        <g>
          <text
            x="60"
            y="60"
            fill="rgba(0,229,192,0.85)"
            fontFamily="var(--font-jetbrains-mono), monospace"
            fontSize="13"
            letterSpacing="0.18em"
          >
            // apparatus · side-view
          </text>
          <text
            x="60"
            y="100"
            fill="rgba(255,255,255,0.45)"
            fontFamily="var(--font-jetbrains-mono), monospace"
            fontSize="11"
            letterSpacing="0.08em"
          >
            Pond-edge installation · IP66 · ~1.8m mast
          </text>
        </g>

        <g transform="translate(80, 660)">
          <rect width="120" height="2" fill="rgba(0,229,192,0.35)" />
          <text
            y="20"
            fill="rgba(255,255,255,0.5)"
            fontFamily="var(--font-jetbrains-mono), monospace"
            fontSize="10"
            letterSpacing="0.08em"
          >
            1m scale
          </text>
        </g>
      </svg>

      <span
        className="absolute right-5 top-5 inline-flex items-center gap-1.5 rounded-full border border-[#FFC04D]/35 bg-black/70 px-2 py-1 text-[#FFC04D] backdrop-blur"
        style={{
          fontFamily: "var(--font-jetbrains-mono)",
          fontSize: "10px",
          letterSpacing: "0.08em",
          lineHeight: 1,
        }}
      >
        <span
          aria-hidden
          className="block h-[5px] w-[5px] rounded-full bg-[#FFC04D]"
          style={{ animation: "live-pulse 2s ease-in-out infinite" }}
        />
        Conceptual rendering
      </span>
    </div>
  );
}
