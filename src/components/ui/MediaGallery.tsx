"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import type { KeyboardEvent, MouseEvent, ReactNode } from "react";

export type MediaItem = {
  src: string;
  alt: string;
  caption?: string;
  kind: "image" | "video";
  /** Required for video items: the still shown as the thumbnail. */
  poster?: string;
};

/**
 * Shows items[0] as a larger lead thumbnail next to `children`, with the
 * remaining items in the strip below. All items share one lightbox.
 */
type LeadOptions = {
  /** Wraps the lead thumbnail and children. */
  rowClassName: string;
  /** Size of the lead thumbnail (it keeps the 4:5 aspect). */
  thumbClassName: string;
  sizes: string;
  /** Extra classes for the lead image, e.g. object-top. */
  imageClassName?: string;
};

type MediaGalleryProps = {
  items: MediaItem[];
  layout: "strip" | "grid";
  /** Classes for the strip or grid list. */
  className?: string;
  lead?: LeadOptions;
  children?: ReactNode;
};

// Lightbox controls: colour changes are instant, only the scale is animated.
const CONTROL =
  "z-10 flex h-11 w-11 items-center justify-center rounded-full border border-white/30 bg-bg-elevated text-text-primary shadow-[0_8px_24px_-8px_rgba(0,0,0,0.7),0_0_0_1px_rgba(0,229,192,0.08)] transition-transform duration-200 ease-out hover:scale-105 hover:border-accent hover:bg-accent-dim hover:text-accent active:scale-95 motion-reduce:transition-none motion-reduce:hover:scale-100";

const FOCUS_RING =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg-primary";

export function MediaGallery({
  items,
  layout,
  className = "",
  lead,
  children,
}: MediaGalleryProps) {
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

  // Any click on the dark area closes the viewer. Clicks on the picture
  // itself, the video, the caption or a control do not.
  const onDialogClick = (event: MouseEvent<HTMLDialogElement>) => {
    const target = event.target as HTMLElement;
    if (target.closest("button, video, figcaption")) return;
    if (
      target instanceof HTMLImageElement &&
      isInsideContainedImage(target, event.clientX, event.clientY)
    ) {
      return;
    }
    close();
  };

  const firstListed = lead ? 1 : 0;
  const listed = items.slice(firstListed);

  // Four items would leave an orphan in a three-column grid, so they get one full row.
  const columns =
    layout === "grid"
      ? listed.length === 4
        ? "grid-cols-2 md:grid-cols-4"
        : "grid-cols-2 md:grid-cols-3"
      : listed.length >= 4
        ? "grid-cols-4"
        : "grid-cols-3";

  const current = active === null ? null : items[active];
  const thumbSizes =
    layout === "grid"
      ? "(max-width: 768px) 50vw, 330px"
      : "(max-width: 480px) 30vw, 150px";

  const renderThumb = (
    index: number,
    sizeClassName: string,
    sizes: string,
    imageClassName = "",
  ) => {
    const item = items[index];
    if (!item) return null;
    return (
      <button
        ref={(node) => {
          thumbRefs.current[index] = node;
        }}
        type="button"
        onClick={() => open(index)}
        aria-label={`Open ${item.kind === "video" ? "video" : "photo"}: ${item.alt}`}
        className={`group/thumb relative block aspect-[4/5] min-h-11 min-w-11 shrink-0 cursor-pointer overflow-hidden rounded-2xl border border-border bg-bg-surface shadow-[0_8px_24px_-14px_rgba(0,229,192,0.18),0_0_0_1px_rgba(255,255,255,0.02)_inset] hover:border-accent/30 active:border-accent/50 ${sizeClassName} ${FOCUS_RING}`}
      >
        <Image
          src={item.kind === "video" ? (item.poster ?? item.src) : item.src}
          alt=""
          fill
          loading="lazy"
          sizes={sizes}
          className={`object-cover transition-transform duration-500 ease-out group-hover/thumb:scale-[1.04] motion-reduce:transition-none motion-reduce:group-hover/thumb:scale-100 ${imageClassName}`}
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
    );
  };

  return (
    <>
      {lead ? (
        <div className={lead.rowClassName}>
          {renderThumb(0, lead.thumbClassName, lead.sizes, lead.imageClassName)}
          {children}
        </div>
      ) : null}

      {listed.length > 0 ? (
        <ul className={`grid gap-2 md:gap-3 ${columns} ${className}`}>
          {listed.map((item, i) => (
            <li key={item.src}>
              {renderThumb(i + firstListed, "w-full", thumbSizes)}
            </li>
          ))}
        </ul>
      ) : null}

      <dialog
        ref={dialogRef}
        onKeyDown={onDialogKeyDown}
        onClick={onDialogClick}
        aria-label={current ? current.alt : "Media viewer"}
        className="m-auto h-dvh max-h-none w-screen max-w-none overflow-hidden bg-transparent p-0 text-text-primary backdrop:bg-black/85 backdrop:backdrop-blur-sm"
      >
        {current && active !== null ? (
          <div
            key={active}
            className="flex h-full w-full flex-col items-center justify-center gap-4 px-4 py-16 motion-safe:[animation:media-lightbox-in_220ms_cubic-bezier(0.2,0.8,0.2,1)] md:px-20"
          >
            <figure className="flex h-full w-full flex-col items-center justify-center gap-3">
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
          className={`absolute right-4 top-4 md:right-6 md:top-6 ${CONTROL} ${FOCUS_RING}`}
        >
          <svg viewBox="0 0 16 16" className="h-[18px] w-[18px]" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
            <path d="M3.5 3.5l9 9M12.5 3.5l-9 9" />
          </svg>
        </button>

        {items.length > 1 ? (
          <>
            <button
              type="button"
              onClick={() => step(-1)}
              aria-label="Previous"
              className={`absolute left-3 top-[calc(50%-22px)] md:left-6 ${CONTROL} ${FOCUS_RING}`}
            >
              <svg viewBox="0 0 16 16" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
                <path d="M10 3L5 8l5 5" />
              </svg>
            </button>
            <button
              type="button"
              onClick={() => step(1)}
              aria-label="Next"
              className={`absolute right-3 top-[calc(50%-22px)] md:right-6 ${CONTROL} ${FOCUS_RING}`}
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

/** True when (x, y) lands on the visible picture of an object-fit: contain image. */
function isInsideContainedImage(img: HTMLImageElement, x: number, y: number) {
  const box = img.getBoundingClientRect();
  if (!img.naturalWidth || !img.naturalHeight) return true;
  const scale = Math.min(box.width / img.naturalWidth, box.height / img.naturalHeight);
  const width = img.naturalWidth * scale;
  const height = img.naturalHeight * scale;
  const left = box.left + (box.width - width) / 2;
  const top = box.top + (box.height - height) / 2;
  return x >= left && x <= left + width && y >= top && y <= top + height;
}
