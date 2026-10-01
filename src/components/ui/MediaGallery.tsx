"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import type { KeyboardEvent, MouseEvent } from "react";

export type MediaItem = {
  src: string;
  alt: string;
  caption?: string;
  kind: "image" | "video";
  /** Required for video items: the still shown as the thumbnail. */
  poster?: string;
};

type MediaGalleryProps = {
  items: MediaItem[];
  layout: "strip" | "grid";
  className?: string;
};

const FOCUS_RING =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg-primary";

export function MediaGallery({ items, layout, className = "" }: MediaGalleryProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const thumbRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [active, setActive] = useState<number | null>(null);
  const lastOpened = useRef(0);

  const open = useCallback((index: number) => {
    lastOpened.current = index;
    setActive(index);
    dialogRef.current?.showModal();
  }, []);

  const close = useCallback(() => {
    dialogRef.current?.close();
  }, []);

  const step = useCallback(
    (delta: number) => {
      setActive((current) => {
        if (current === null) return current;
        const next = (current + delta + items.length) % items.length;
        lastOpened.current = next;
        return next;
      });
    },
    [items.length],
  );

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    // Fires for Escape, the close button and backdrop clicks alike.
    const handleClose = () => {
      setActive(null);
      thumbRefs.current[lastOpened.current]?.focus();
    };
    dialog.addEventListener("close", handleClose);
    return () => dialog.removeEventListener("close", handleClose);
  }, []);

  const onDialogKeyDown = (event: KeyboardEvent<HTMLDialogElement>) => {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      step(1);
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      step(-1);
    }
  };

  // Clicks on the empty area around the media (not the media itself) close it.
  const onBackdropClick = (event: MouseEvent<HTMLElement>) => {
    if (event.target === event.currentTarget) close();
  };

  // Four items would leave an orphan in a three-column grid, so they get one full row.
  const columns =
    layout === "grid"
      ? items.length === 4
        ? "grid-cols-2 md:grid-cols-4"
        : "grid-cols-2 md:grid-cols-3"
      : items.length >= 4
        ? "grid-cols-4"
        : "grid-cols-3";

  const current = active === null ? null : items[active];
  const thumbSizes =
    layout === "grid"
      ? "(max-width: 768px) 50vw, 330px"
      : "(max-width: 480px) 30vw, 150px";

  return (
    <>
      <ul className={`grid gap-2 md:gap-3 ${columns} ${className}`}>
        {items.map((item, index) => (
          <li key={item.src}>
            <button
              ref={(node) => {
                thumbRefs.current[index] = node;
              }}
              type="button"
              onClick={() => open(index)}
              aria-label={`Open ${item.kind === "video" ? "video" : "photo"}: ${item.alt}`}
              className={`group/thumb relative block aspect-[4/5] min-h-11 w-full min-w-11 cursor-pointer overflow-hidden rounded-2xl border border-border bg-bg-surface shadow-[0_8px_24px_-14px_rgba(0,229,192,0.18),0_0_0_1px_rgba(255,255,255,0.02)_inset] transition-[border-color] duration-300 hover:border-accent/30 active:border-accent/50 ${FOCUS_RING}`}
            >
              <Image
                src={item.kind === "video" ? (item.poster ?? item.src) : item.src}
                alt=""
                fill
                loading="lazy"
                sizes={thumbSizes}
                className="object-cover transition-transform duration-500 ease-out group-hover/thumb:scale-[1.04] motion-reduce:transition-none motion-reduce:group-hover/thumb:scale-100"
              />
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 to-transparent mix-blend-multiply"
              />
              {item.kind === "video" ? (
                <span
                  aria-hidden
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-full border border-accent/40 bg-black/70 text-accent backdrop-blur-sm">
                    <svg viewBox="0 0 16 16" className="ml-0.5 h-3.5 w-3.5" fill="currentColor">
                      <path d="M4 2.5v11l9-5.5z" />
                    </svg>
                  </span>
                </span>
              ) : null}
            </button>
          </li>
        ))}
      </ul>

      <dialog
        ref={dialogRef}
        onKeyDown={onDialogKeyDown}
        onClick={onBackdropClick}
        aria-label={current ? current.alt : "Media viewer"}
        className="m-auto h-dvh max-h-none w-screen max-w-none overflow-hidden bg-transparent p-0 text-text-primary backdrop:bg-black/85 backdrop:backdrop-blur-sm"
      >
        {current && active !== null ? (
          <div
            key={active}
            className="flex h-full w-full flex-col items-center justify-center gap-4 px-4 py-16 motion-safe:[animation:media-lightbox-in_220ms_cubic-bezier(0.2,0.8,0.2,1)] md:px-20"
            onClick={onBackdropClick}
          >
            <figure
              onClick={onBackdropClick}
              className="flex h-full w-full flex-col items-center justify-center gap-3"
            >
              <div className="relative h-full w-full">
                {current.kind === "video" ? (
                  <video
                    src={current.src}
                    poster={current.poster}
                    controls
                    playsInline
                    preload="metadata"
                    aria-label={current.alt}
                    className="absolute inset-0 m-auto max-h-full max-w-full rounded-2xl"
                  />
                ) : (
                  <Image
                    src={current.src}
                    alt={current.alt}
                    fill
                    loading="eager"
                    sizes="100vw"
                    className="object-contain"
                  />
                )}
              </div>
              <figcaption
                className="max-w-[60ch] text-center text-text-secondary"
                style={{
                  fontFamily: "var(--font-dm-sans)",
                  fontSize: "14px",
                  lineHeight: 1.6,
                }}
              >
                {current.caption ?? current.alt}
                <span
                  className="ml-3 text-text-tertiary"
                  style={{ fontFamily: "var(--font-jetbrains-mono)", fontSize: "11px" }}
                >
                  {active + 1} / {items.length}
                </span>
              </figcaption>
            </figure>
          </div>
        ) : null}

        <button
          type="button"
          onClick={close}
          aria-label="Close"
          className={`absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full border border-border bg-bg-elevated/80 text-text-primary transition-[border-color,color] duration-200 hover:border-accent/40 hover:text-accent active:border-accent ${FOCUS_RING}`}
        >
          <svg viewBox="0 0 16 16" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
            <path d="M3.5 3.5l9 9M12.5 3.5l-9 9" />
          </svg>
        </button>

        {items.length > 1 ? (
          <>
            <button
              type="button"
              onClick={() => step(-1)}
              aria-label="Previous"
              className={`absolute left-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-bg-elevated/80 text-text-primary transition-[border-color,color] duration-200 hover:border-accent/40 hover:text-accent active:border-accent md:left-6 ${FOCUS_RING}`}
            >
              <svg viewBox="0 0 16 16" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
                <path d="M10 3L5 8l5 5" />
              </svg>
            </button>
            <button
              type="button"
              onClick={() => step(1)}
              aria-label="Next"
              className={`absolute right-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-bg-elevated/80 text-text-primary transition-[border-color,color] duration-200 hover:border-accent/40 hover:text-accent active:border-accent md:right-6 ${FOCUS_RING}`}
            >
              <svg viewBox="0 0 16 16" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
                <path d="M6 3l5 5-5 5" />
              </svg>
            </button>
          </>
        ) : null}
      </dialog>
    </>
  );
}
