"use client";

import dynamic from "next/dynamic";
import { useEffect, useState, useSyncExternalStore } from "react";
import { cn } from "@/lib/cn";

// Always on the page, but tiny: it only listens for Ctrl+K / Cmd+K and the
// navbar button. The palette itself is loaded the first time it is opened,
// so it adds nothing to the first page load.

const OPEN_EVENT = "open-command-palette";

const CommandPalette = dynamic(
  () => import("./CommandPalette").then((m) => m.CommandPalette),
  { ssr: false },
);

export function openCommandPalette() {
  window.dispatchEvent(new Event(OPEN_EVENT));
}

export function CommandPaletteLauncher() {
  const [loaded, setLoaded] = useState(false);
  const [open, setOpen] = useState(false);
  // Bumped on every open, so the palette remounts with a fresh search.
  const [session, setSession] = useState(0);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && !e.altKey && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setLoaded(true);
        setOpen((v) => {
          if (!v) setSession((n) => n + 1);
          return !v;
        });
      }
    };
    const onOpen = () => {
      setLoaded(true);
      setOpen((v) => {
        if (!v) setSession((n) => n + 1);
        return true;
      });
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener(OPEN_EVENT, onOpen);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener(OPEN_EVENT, onOpen);
    };
  }, []);

  if (!loaded) return null;
  return <CommandPalette key={session} open={open} onClose={() => setOpen(false)} />;
}

/** "⌘ K" on Mac, "Ctrl K" elsewhere. Server and first paint say Ctrl. */
const noSubscribe = () => () => undefined;

function clientShortcut() {
  const nav = navigator as Navigator & { userAgentData?: { platform?: string } };
  const platform = nav.userAgentData?.platform ?? navigator.platform ?? "";
  return /mac|iphone|ipad/i.test(platform) ? "⌘ K" : "Ctrl K";
}

export function useShortcutLabel() {
  return useSyncExternalStore(noSubscribe, clientShortcut, () => "Ctrl K");
}

/** The small hint button in the navbar. */
export function CommandPaletteHint({ className = "" }: { className?: string }) {
  const label = useShortcutLabel();
  return (
    <button
      type="button"
      onClick={openCommandPalette}
      aria-label={`Search the site (${label.replace("⌘", "Command")})`}
      aria-keyshortcuts="Control+K Meta+K"
      className={cn(
        "inline-flex min-h-[44px] items-center gap-2 rounded-full border border-white/10 px-3 font-mono text-[11px] tracking-[0.04em] text-text-tertiary transition-[border-color,color] duration-300 hover:border-accent/50 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg-primary active:opacity-80",
        className,
      )}
    >
      <svg aria-hidden width="12" height="12" viewBox="0 0 16 16" fill="none">
        <circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="1.6" />
        <path d="M11 11l3.5 3.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
      <kbd className="font-mono">{label}</kbd>
    </button>
  );
}
