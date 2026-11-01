"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { usePathname, useRouter } from "next/navigation";
import {
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
} from "react";
import { CONTACT_LINKS, EMAIL } from "@/lib/contactLinks";
import { PROJECTS, SITE_URL } from "@/lib/projectSchema";
import { HAS_TESTIMONIALS } from "@/data/testimonials";

type Group = "Sections" | "Projects" | "Pages" | "Actions";

type Item = {
  id: string;
  group: Group;
  label: string;
  hint: string;
  /** Extra words the search also matches. */
  keywords?: string;
  href?: string;
  action?: "copy-email";
};

const SECTIONS: [string, string][] = [
  ["Home", "home"],
  ["Services", "services"],
  ["Work", "projects"],
  ["Achievements", "achievements"],
  ["How I build", "how-i-build"],
  ["About", "about"],
  // Only while a quote with written permission is published (testimonials.ts).
  ...(HAS_TESTIMONIALS ? ([["Testimonials", "testimonials"]] as [string, string][]) : []),
  ["Contact", "contact"],
];

function local(url: string) {
  if (url === SITE_URL) return "/#projects";
  return url.startsWith(SITE_URL) ? url.slice(SITE_URL.length) : url;
}

function buildItems(): Item[] {
  const items: Item[] = SECTIONS.map(([label, id]) => ({
    id: `section-${id}`,
    group: "Sections",
    label,
    hint: "Section",
    href: `/#${id}`,
  }));

  for (const p of PROJECTS) {
    const href = local(p.url);
    const isCaseStudy = p.caseStudy !== undefined && href === p.caseStudy;
    items.push({
      id: `project-${p.slug}`,
      group: "Projects",
      label: p.name,
      hint: isCaseStudy ? "Case study" : href.startsWith("http") ? "Live site" : "Project",
      keywords: p.keywords.join(" "),
      href,
    });
    if (p.caseStudy && !isCaseStudy) {
      items.push({
        id: `case-${p.slug}`,
        group: "Projects",
        label: `${p.name} case study`,
        hint: "Case study",
        keywords: p.keywords.join(" "),
        href: p.caseStudy,
      });
    }
  }

  items.push({
    id: "page-hire",
    group: "Pages",
    label: "Hiring? Start here",
    hint: "Page",
    keywords: "hire recruiter job roles availability cv",
    href: "/hire",
  });

  items.push(
    { id: "resume", group: "Actions", label: "Download résumé", hint: "PDF", keywords: "resume cv", href: CONTACT_LINKS.resume },
    { id: "copy-email", group: "Actions", label: "Copy email", hint: EMAIL, keywords: "mail contact", action: "copy-email" },
    { id: "whatsapp", group: "Actions", label: "WhatsApp", hint: "Message", keywords: "chat phone contact", href: CONTACT_LINKS.whatsapp },
    { id: "github", group: "Actions", label: "GitHub", hint: "DACDaniels", keywords: "code repositories", href: CONTACT_LINKS.github },
    { id: "linkedin", group: "Actions", label: "LinkedIn", hint: "Profile", keywords: "profile", href: CONTACT_LINKS.linkedin },
  );
  return items;
}

/**
 * Fuzzy score: a straight substring wins, then letters in order with small
 * gaps. Returns -1 when the query does not match at all.
 */
function score(query: string, item: Item): number {
  const q = query.toLowerCase().replace(/\s+/g, " ").trim();
  if (!q) return 0;
  const label = item.label.toLowerCase();
  const hay = `${label} ${item.keywords?.toLowerCase() ?? ""} ${item.group.toLowerCase()}`;
  const at = label.indexOf(q);
  if (at === 0) return 1000 - label.length;
  if (at > 0) return 800 - at;
  if (hay.includes(q)) return 600;
  let s = 0;
  let pos = -1;
  for (const ch of q) {
    if (ch === " ") continue;
    const next = hay.indexOf(ch, pos + 1);
    if (next === -1) return -1;
    s += next === pos + 1 ? 6 : Math.max(0, 3 - (next - pos) / 8);
    pos = next;
  }
  return s;
}

export function CommandPalette({ open, onClose }: { open: boolean; onClose: () => void }) {
  const reduceMotion = useReducedMotion() ?? false;
  const router = useRouter();
  const pathname = usePathname();
  const items = useMemo(() => buildItems(), []);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const [copied, setCopied] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const returnFocus = useRef<HTMLElement | null>(null);
  const baseId = useId();
  const listId = `${baseId}-list`;

  const results = useMemo(() => {
    if (!query.trim()) return items;
    return items
      .map((item, i) => ({ item, s: score(query, item), i }))
      .filter((r) => r.s >= 0)
      .sort((a, b) => b.s - a.s || a.i - b.i)
      .map((r) => r.item);
  }, [items, query]);

  // Open: remember focus, lock scroll, focus the search. Close: give focus back.
  useEffect(() => {
    if (!open) return;
    // State starts fresh on every open: the launcher remounts this component.
    returnFocus.current = document.activeElement as HTMLElement | null;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const t = window.setTimeout(() => inputRef.current?.focus(), 0);
    return () => {
      window.clearTimeout(t);
      document.body.style.overflow = prev;
      returnFocus.current?.focus?.();
    };
  }, [open]);

  // Keep the highlighted option in view.
  useEffect(() => {
    const el = listRef.current?.querySelector<HTMLElement>(`[data-index="${active}"]`);
    el?.scrollIntoView({ block: "nearest" });
  }, [active]);

  const run = useCallback(
    async (item: Item | undefined) => {
      if (!item) return;
      if (item.action === "copy-email") {
        try {
          await navigator.clipboard.writeText(EMAIL);
          setCopied(true);
        } catch {
          window.location.href = CONTACT_LINKS.email;
        }
        return;
      }
      const href = item.href;
      if (!href) return;
      onClose();
      if (href.startsWith("http") || href.endsWith(".pdf")) {
        window.open(href, "_blank", "noopener,noreferrer");
      } else if (href.startsWith("/#") && pathname === "/") {
        // Same page: a real hash change, so the filter chips hear it too.
        window.location.hash = href.slice(1);
      } else {
        router.push(href);
      }
    },
    [onClose, pathname, router],
  );

  const onKeyDown = (e: ReactKeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Escape") {
      e.preventDefault();
      onClose();
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((a) => (results.length ? (a + 1) % results.length : 0));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => (results.length ? (a - 1 + results.length) % results.length : 0));
    } else if (e.key === "Home" && e.ctrlKey) {
      e.preventDefault();
      setActive(0);
    } else if (e.key === "End" && e.ctrlKey) {
      e.preventDefault();
      setActive(Math.max(0, results.length - 1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      void run(results[active]);
    } else if (e.key === "Tab") {
      // Focus trap: Tab moves between the search box and the close button only.
      const focusables = dialogRef.current?.querySelectorAll<HTMLElement>("input, button");
      if (!focusables || focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  };

  let lastGroup: Group | null = null;
  const activeItem = results[active];

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          key="palette"
          className="fixed inset-0 z-[90] flex items-start justify-center px-4 pt-[12vh] sm:pt-[16vh]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduceMotion ? 0.01 : 0.18 }}
        >
          <div
            aria-hidden
            className="absolute inset-0 bg-[rgba(8,8,8,0.72)] backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-label="Search the site"
            onKeyDown={onKeyDown}
            className="relative w-full max-w-[600px] overflow-hidden rounded-[16px] border border-white/[0.08] bg-bg-elevated shadow-[0_32px_80px_-24px_rgba(0,0,0,0.8),0_16px_48px_-16px_rgba(0,229,192,0.18)]"
            initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -8, scale: 0.98 }}
            animate={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -6, scale: 0.985 }}
            transition={reduceMotion ? { duration: 0.01 } : { type: "spring", stiffness: 520, damping: 38 }}
          >
            <div className="flex items-center gap-3 border-b border-border px-4">
              <svg aria-hidden width="16" height="16" viewBox="0 0 16 16" fill="none" className="shrink-0 text-accent">
                <circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="1.6" />
                <path d="M11 11l3.5 3.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              </svg>
              <input
                ref={inputRef}
                type="text"
                role="combobox"
                aria-expanded="true"
                aria-controls={listId}
                aria-autocomplete="list"
                aria-activedescendant={activeItem ? `${baseId}-${activeItem.id}` : undefined}
                aria-label="Search sections, projects and actions"
                placeholder="Search sections, projects, actions"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setActive(0);
                }}
                autoComplete="off"
                spellCheck={false}
                className="h-14 min-w-0 flex-1 bg-transparent font-body text-[16px] text-text-primary placeholder:text-text-tertiary focus:outline-none"
              />
              <button
                type="button"
                onClick={onClose}
                className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-md font-mono text-[11px] text-text-tertiary transition-colors duration-200 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent active:opacity-80"
              >
                <span aria-hidden>Esc</span>
                <span className="sr-only">Close search</span>
              </button>
            </div>

            <ul
              ref={listRef}
              id={listId}
              role="listbox"
              aria-label="Results"
              className="max-h-[min(420px,56vh)] overflow-y-auto overscroll-contain p-2"
            >
              {results.length === 0 ? (
                <li className="px-3 py-8 text-center text-[14px] text-text-tertiary" role="presentation">
                  Nothing matches. Try a project name, a section or &ldquo;email&rdquo;.
                </li>
              ) : (
                results.map((item, i) => {
                  const showGroup = !query.trim() && item.group !== lastGroup;
                  lastGroup = item.group;
                  const selected = i === active;
                  const hint = item.action === "copy-email" && copied ? "Copied" : item.hint;
                  return (
                    <li key={item.id} role="presentation">
                      {showGroup ? (
                        <div
                          role="presentation"
                          className="px-3 pt-3 pb-1.5 font-mono text-[10px] uppercase tracking-[0.15em] text-text-tertiary"
                        >
                          {item.group}
                        </div>
                      ) : null}
                      <div
                        id={`${baseId}-${item.id}`}
                        role="option"
                        aria-selected={selected}
                        data-index={i}
                        onMouseMove={() => setActive(i)}
                        onClick={() => void run(item)}
                        className={`relative flex min-h-[44px] cursor-pointer items-center justify-between gap-4 rounded-[10px] px-3 py-2 text-[14px] transition-colors duration-150 ${
                          selected ? "bg-accent/[0.09] text-text-primary" : "text-text-secondary"
                        }`}
                      >
                        {selected ? (
                          <span aria-hidden className="absolute top-2 bottom-2 left-0 w-[2px] rounded-full bg-accent" />
                        ) : null}
                        <span className="min-w-0 truncate">{item.label}</span>
                        <span
                          className={`shrink-0 font-mono text-[11px] ${
                            item.action === "copy-email" && copied ? "text-accent" : "text-text-tertiary"
                          }`}
                        >
                          {hint}
                        </span>
                      </div>
                    </li>
                  );
                })
              )}
            </ul>

            <div className="hidden items-center gap-4 border-t border-border px-4 py-2.5 font-mono text-[10px] text-text-tertiary sm:flex">
              <span>↑ ↓ to move</span>
              <span>Enter to open</span>
              <span>Esc to close</span>
            </div>
            <p className="sr-only" aria-live="polite">
              {copied ? "Email copied" : `${results.length} results`}
            </p>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
