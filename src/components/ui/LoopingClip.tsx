"use client";

import { useEffect, useRef, useState } from "react";

type LoopingClipProps = {
  src: string;
  poster: string;
  label: string;
  /** CSS object-position for the cover crop, e.g. "50% 55%". */
  objectPosition?: string;
};

/**
 * Short, silent, looping clip. Nothing (video or poster) downloads until the
 * clip is close to the viewport. It plays only while on screen, and never
 * under prefers-reduced-motion (the poster stays as a still instead).
 */
export function LoopingClip({
  src,
  poster,
  label,
  objectPosition = "50% 50%",
}: LoopingClipProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [near, setNear] = useState(false);

  // Attach the sources shortly before the clip scrolls into view.
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setNear(true);
          observer.disconnect();
        }
      },
      { rootMargin: "300px 0px" },
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !near) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduce.matches) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          // play() rejects if the browser blocks it; the poster stays up.
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.25 },
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, [near]);

  return (
    <div className="relative h-full w-full">
      <video
        ref={videoRef}
        src={near ? src : undefined}
        poster={near ? poster : undefined}
        muted
        loop
        playsInline
        preload="none"
        aria-label={label}
        className="absolute inset-0 h-full w-full object-cover"
        style={{ objectPosition }}
      />
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent mix-blend-multiply"
      />
    </div>
  );
}
