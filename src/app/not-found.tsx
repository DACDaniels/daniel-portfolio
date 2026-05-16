import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "404 · Lost in the pond — Daniel Chadambuka",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <main className="relative flex min-h-screen w-full flex-col overflow-hidden bg-bg-primary text-text-primary">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 -right-40 h-[600px] w-[600px] rounded-full bg-accent opacity-[0.10] blur-[120px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-40 -left-40 h-[480px] w-[480px] rounded-full bg-accent opacity-[0.06] blur-[120px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.035] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.6 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
        }}
      />

      <header className="relative z-10 mx-auto flex w-full max-w-[1400px] items-center justify-between px-6 pt-8 md:px-10">
        <Link
          href="/"
          className="font-heading text-2xl font-bold tracking-tight text-text-primary transition-colors duration-300 hover:text-accent"
        >
          DAC<span className="text-accent">.</span>
        </Link>
        <span
          className="font-mono text-[11px] uppercase text-text-tertiary"
          style={{ letterSpacing: "0.2em" }}
        >
          {"// status 404"}
        </span>
      </header>

      <section className="relative z-10 mx-auto flex w-full max-w-[960px] flex-1 flex-col justify-center px-6 py-20 md:px-10">
        <div
          className="font-mono text-[12px] uppercase text-accent"
          style={{ letterSpacing: "0.22em" }}
        >
          {"// not-found.tsx"}
        </div>

        <h1
          className="mt-6 font-heading font-bold text-text-primary"
          style={{
            fontSize: "clamp(3.5rem, 12vw, 10rem)",
            letterSpacing: "-0.05em",
            lineHeight: 0.9,
          }}
        >
          404
          <span
            className="ml-3 inline-block align-baseline"
            style={{
              width: "0.16em",
              height: "0.16em",
              borderRadius: "0.025em",
              background: "var(--accent)",
              filter: "drop-shadow(0 0 24px rgba(0, 229, 192, 0.5))",
            }}
            aria-hidden
          />
        </h1>

        <p
          className="mt-8 max-w-xl text-lg leading-[1.7] text-text-secondary md:text-xl"
          style={{ fontFamily: "var(--font-dm-sans)" }}
        >
          This page slipped through the net. The route you tried doesn&apos;t
          exist, or it moved while you were swimming over.
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-4">
          <Link
            href="/"
            className="group relative inline-flex min-h-[48px] items-center gap-2 overflow-hidden rounded-full bg-accent px-7 py-3.5 text-sm font-semibold text-bg-primary shadow-[0_12px_32px_-8px_rgba(0,229,192,0.5)] transition-shadow duration-300 hover:shadow-[0_16px_40px_-8px_rgba(0,229,192,0.75)]"
          >
            <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/35 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full" />
            <span className="relative inline-flex items-center gap-2">
              Back to the home page
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                className="transition-transform duration-300 group-hover:translate-x-0.5"
                aria-hidden
              >
                <path
                  d="M2 7h10m0 0L8 3m4 4L8 11"
                  stroke="currentColor"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </Link>

          <Link
            href="/projects/fishtech"
            className="min-h-[48px] rounded-full border border-accent/60 px-7 py-3.5 text-sm font-semibold text-accent transition-colors duration-300 hover:border-accent hover:bg-accent/10"
          >
            See the FishTech case study
          </Link>
        </div>
      </section>

      <footer className="relative z-10 mx-auto w-full max-w-[1400px] px-6 pb-10 md:px-10">
        <div
          className="flex flex-col gap-3 border-t border-white/[0.06] pt-6 text-text-tertiary sm:flex-row sm:items-center sm:justify-between"
          style={{
            fontFamily: "var(--font-jetbrains-mono)",
            fontSize: "11px",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
          }}
        >
          <span>Daniel Chadambuka · Harare, Zimbabwe</span>
          <span className="inline-flex items-center gap-2">
            <span
              aria-hidden
              className="inline-block h-1.5 w-1.5 rounded-full bg-accent"
              style={{ boxShadow: "0 0 8px var(--accent)" }}
            />
            <span>Available for work</span>
          </span>
        </div>
      </footer>
    </main>
  );
}
