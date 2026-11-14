"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, type PanInfo } from "framer-motion";
import { ChevronLeft, ChevronRight, Film } from "lucide-react";
import { cn } from "@/lib/utils";
import { assetPath } from "@/lib/asset-path";
import type { PoliceClip } from "@/lib/police-reconstructions";

/**
 * VideoCarousel: interactive multi-clip video showcase.
 *
 * Requirements implemented:
 * - One active video at a time (only the active clip is mounted, so
 *   simultaneous playback is impossible by construction).
 * - Previous/next navigation arrows (keyboard accessible buttons).
 * - Left/right swiping on touch devices (framer-motion drag).
 * - Clear current-clip indicator ("1 / 4").
 * - Native play/pause controls on each clip (keyboard operable).
 * - Original 752x416 (47:26) aspect ratio preserved via object-contain.
 * - Metadata-only initial loading (preload="metadata"): clips are not
 *   downloaded until the visitor opens/plays them.
 * - The previous clip is paused and unmounted on navigation.
 * - Arrow-key navigation when the carousel has focus.
 */
export function VideoCarousel({
  clips,
  label,
  className,
}: {
  clips: PoliceClip[];
  /** Accessible name for the carousel group. */
  label: string;
  className?: string;
}) {
  const count = clips.length;
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const go = useCallback(
    (dir: number) => {
      // Pause the outgoing clip before switching (it unmounts on switch).
      videoRef.current?.pause();
      setDirection(dir);
      setIndex((i) => (i + dir + count) % count);
    },
    [count]
  );

  const goTo = useCallback(
    (i: number) => {
      if (i === index) return;
      videoRef.current?.pause();
      setDirection(i > index ? 1 : -1);
      setIndex(i);
    },
    [index]
  );

  // Keyboard navigation when the carousel area has focus.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (
        !containerRef.current ||
        !document.activeElement ||
        !containerRef.current.contains(document.activeElement)
      )
        return;
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        go(-1);
      }
      if (e.key === "ArrowRight") {
        e.preventDefault();
        go(1);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go]);

  const onDragEnd = (
    _e: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) => {
    if (info.offset.x < -60) go(1);
    else if (info.offset.x > 60) go(-1);
  };

  const clip = clips[index];

  return (
    <div className={cn("w-full", className)}>
      <div
        ref={containerRef}
        tabIndex={0}
        role="group"
        aria-roledescription="carousel"
        aria-label={label}
        className="group relative overflow-hidden rounded-xl border border-border/70 bg-black outline-none focus-visible:ring-2 focus-visible:ring-violet-400/60"
      >
        {/* Stage: 47:26 = native 752x416 source ratio */}
        <div className="relative aspect-[47/26] w-full">
          <AnimatePresence initial={false} mode="popLayout">
            <motion.div
              key={index}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.16}
              onDragEnd={onDragEnd}
              initial={{ opacity: 0, x: direction >= 0 ? 60 : -60 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction >= 0 ? -60 : 60 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0 cursor-grab touch-pan-y active:cursor-grabbing"
            >
              {/*
                Only the active clip is mounted: metadata-only preload,
                native controls for play/pause, and unmount-on-navigate
                guarantees the previous video is always paused.
              */}
              <video
                ref={videoRef}
                key={clip.src}
                src={assetPath(clip.src)}
                controls
                playsInline
                preload="metadata"
                controlsList="nodownload"
                disablePictureInPicture
                aria-label={`${clip.title}, an AI-generated reconstruction clip`}
                className="h-full w-full select-none object-contain"
              />
            </motion.div>
          </AnimatePresence>

          {/* Soft edge veil for control legibility (non-interactive) */}
          <div className="pointer-events-none absolute inset-x-0 top-0 h-10 bg-gradient-to-b from-black/45 to-transparent" />

          {/* Counter badge */}
          <div className="glass-strong pointer-events-none absolute right-3 top-3 rounded-full px-3 py-1 text-[11px] font-semibold tabular-nums text-foreground">
            {index + 1} / {count}
          </div>
        </div>

        {/* Prev / next */}
        <button
          onClick={() => go(-1)}
          aria-label="Previous clip"
          className="absolute left-3 top-1/2 z-20 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full border border-violet-400/40 bg-background/60 text-violet-100 backdrop-blur-md transition-all hover:bg-violet-500/30 hover:shadow-[0_0_24px_-4px_rgba(168,85,247,0.7)]"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          onClick={() => go(1)}
          aria-label="Next clip"
          className="absolute right-3 top-1/2 z-20 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full border border-violet-400/40 bg-background/60 text-violet-100 backdrop-blur-md transition-all hover:bg-violet-500/30 hover:shadow-[0_0_24px_-4px_rgba(168,85,247,0.7)]"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      {/* Caption + clip indicators */}
      <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
        <div className="flex min-w-0 items-center gap-2">
          <Film className="h-4 w-4 shrink-0 text-fuchsia-300" />
          <p className="truncate text-sm font-medium text-foreground">
            {clip.title}
          </p>
        </div>
        <div className="flex gap-1.5">
          {clips.map((c, i) => (
            <button
              key={c.src}
              onClick={() => goTo(i)}
              aria-label={`Show clip ${i + 1} of ${count}: ${c.title}`}
              aria-current={i === index}
              className={cn(
                "h-1.5 rounded-full transition-all",
                i === index
                  ? "w-6 bg-gradient-to-r from-violet-400 to-fuchsia-400"
                  : "w-1.5 bg-foreground/30 hover:bg-foreground/50"
              )}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
