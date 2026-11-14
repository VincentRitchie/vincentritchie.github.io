"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Play, FileText, Clapperboard } from "lucide-react";
import {
  Reveal,
  Icon,
  accentMap,
  type Accent,
} from "./shared";
import { VideoCarousel } from "./video-carousel";
import { PdfViewerModal, useScrollLock } from "./pdf-viewer-modal";
import {
  policeCategory,
  policeReconstructions,
  type PoliceProduction,
} from "@/lib/police-reconstructions";
import { assetPath } from "@/lib/asset-path";
import { cn } from "@/lib/utils";

/**
 * PoliceReconstructions: "Police Bodycam & Dashcam Reconstructions"
 * category inside the Selected Work section.
 *
 * Renders one card per completed production. Selecting a card opens a
 * full production showcase modal containing the description, capability
 * tags, the interactive video carousel and (when a correct case study
 * exists for that production) the "View Technical Case Study" button,
 * which opens the PDF in the integrated document viewer stacked above
 * the showcase; closing it returns to the showcase without losing the
 * visitor's place.
 *
 * Fully data-driven from src/lib/police-reconstructions.ts: future
 * batches only add media + registry entries.
 */
export function PoliceReconstructions() {
  const [active, setActive] = useState<PoliceProduction | null>(null);

  useScrollLock(active !== null);

  return (
    <div className="mt-16 border-t border-border/40 pt-12">
      {/* Category subheading, consistent with section heading language */}
      <Reveal>
        <div className="max-w-3xl">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-sky-400/30 bg-sky-500/15 px-3.5 py-1.5 text-xs font-medium uppercase tracking-[0.18em] text-sky-200">
            <span className="h-1.5 w-1.5 rounded-full bg-current animate-pulse-glow" />
            {policeCategory.eyebrow}
          </div>
          <h3 className="font-display text-2xl font-bold leading-tight tracking-tight text-foreground sm:text-3xl">
            {policeCategory.title}
          </h3>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
            {policeCategory.intro}
          </p>
        </div>
      </Reveal>

      {/* Production cards */}
      <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2">
        {policeReconstructions.map((p, i) => {
          const a = accentMap[p.accent as Accent];
          return (
            <Reveal key={p.id} delay={i * 0.07}>
              <button
                onClick={() => setActive(p)}
                aria-label={`Open showcase: ${p.title}`}
                className="group relative block h-full w-full overflow-hidden rounded-2xl border border-border bg-card/60 text-left backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-violet-400/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400/60"
              >
                {/* Cover */}
                <div className="relative aspect-[47/26] w-full overflow-hidden">
                  <img
                    src={assetPath(p.cover)}
                    alt={`${p.title} production cover`}
                    loading="lazy"
                    decoding="async"
                    draggable={false}
                    className="h-full w-full select-none object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/85 via-background/10 to-transparent" />
                  {/* Status + clip count badges */}
                  <div className="absolute left-3 top-3 flex flex-wrap gap-2">
                    <span
                      className={cn(
                        "inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider backdrop-blur-md",
                        a.border,
                        a.bg,
                        a.text
                      )}
                    >
                      {p.status}
                    </span>
                    <span className="inline-flex items-center gap-1 rounded-full border border-white/15 bg-background/60 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-foreground/90 backdrop-blur-md">
                      <Clapperboard className="h-3 w-3" />
                      {p.clips.length} clips
                    </span>
                  </div>
                  {p.technicalCaseStudy && (
                    <span className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full border border-emerald-400/30 bg-emerald-500/15 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-emerald-200 backdrop-blur-md">
                      <FileText className="h-3 w-3" />
                      Case study
                    </span>
                  )}
                  {/* Hover affordance */}
                  <div className="absolute bottom-3 right-3 grid h-11 w-11 place-items-center rounded-full border border-white/20 bg-background/60 text-foreground backdrop-blur-md transition-all group-hover:border-violet-400/50 group-hover:bg-violet-500/30 group-hover:shadow-[0_0_28px_-6px_rgba(168,85,247,0.8)]">
                    <Play className="h-5 w-5" />
                  </div>
                </div>

                {/* Body */}
                <div className="relative p-5 sm:p-6">
                  <p
                    className={cn(
                      "text-[11px] font-semibold uppercase tracking-wider",
                      a.text
                    )}
                  >
                    {p.category}
                  </p>
                  <h4 className="mt-1.5 font-display text-lg font-semibold leading-snug text-foreground">
                    {p.title}
                  </h4>
                  <p className="mt-2.5 line-clamp-3 text-sm leading-relaxed text-muted-foreground">
                    {p.summary}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {p.tags.slice(0, 4).map((t) => (
                      <span
                        key={t}
                        className="rounded-md border border-border/60 bg-background/40 px-2 py-0.5 text-[10px] font-medium text-muted-foreground"
                      >
                        {t}
                      </span>
                    ))}
                    {p.tags.length > 4 && (
                      <span className="rounded-md border border-border/60 bg-background/40 px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
                        +{p.tags.length - 4}
                      </span>
                    )}
                  </div>
                  <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-violet-200 transition-colors group-hover:text-violet-100">
                    <span className="grid h-8 w-8 place-items-center rounded-full border border-violet-400/40 bg-violet-500/15">
                      <Play className="h-3.5 w-3.5" />
                    </span>
                    Watch the showcase
                  </span>
                </div>
              </button>
            </Reveal>
          );
        })}
      </div>

      {/* Production showcase modal */}
      <AnimatePresence>
        {active && (
          <ProductionShowcase
            production={active}
            onClose={() => setActive(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

/**
 * ProductionShowcase: full detail modal for a single production:
 * cover banner, title, description, tags, video carousel, case study.
 */
function ProductionShowcase({
  production,
  onClose,
}: {
  production: PoliceProduction;
  onClose: () => void;
}) {
  const [pdfOpen, setPdfOpen] = useState(false);
  const a = accentMap[production.accent as Accent];

  // Escape closes the top-most layer first: while the case-study viewer
  // is open, Escape is handled by the viewer itself and must not also
  // dismiss the showcase underneath.
  useEffect(() => {
    if (pdfOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [pdfOpen, onClose]);

  return (
    <>
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-[80] flex items-center justify-center bg-background/95 p-3 backdrop-blur-xl sm:p-6"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`${production.title} showcase`}
    >
      {/* Close */}
      <button
        onClick={onClose}
        aria-label="Close showcase"
        className="absolute right-4 top-4 z-20 grid h-11 w-11 place-items-center rounded-full border border-border bg-card/70 text-foreground backdrop-blur-md transition-all hover:bg-card hover:shadow-[0_0_24px_-6px_rgba(217,70,239,0.6)] sm:right-6 sm:top-6"
      >
        <X className="h-5 w-5" />
      </button>

      <motion.div
        initial={{ opacity: 0, y: 28, scale: 0.985 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 18, scale: 0.99 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        onClick={(e) => e.stopPropagation()}
        className="relative flex max-h-[92vh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-[0_0_80px_-20px_rgba(139,92,246,0.45)]"
      >
        {/* Scrollable body */}
        <div className="min-h-0 flex-1 overflow-y-auto">
          {/* Cover banner */}
          <div className="relative aspect-[47/26] max-h-64 w-full overflow-hidden sm:max-h-72">
            <img
              src={assetPath(production.cover)}
              alt={`${production.title} production cover`}
              draggable={false}
              className="h-full w-full select-none object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-card via-card/25 to-transparent" />
            <div className="absolute bottom-4 left-5 right-5 sm:left-7 sm:right-7">
              <p
                className={cn(
                  "text-[11px] font-semibold uppercase tracking-wider",
                  a.text
                )}
              >
                {production.category}
              </p>
              <h3 className="mt-1 font-display text-xl font-bold leading-tight text-foreground sm:text-2xl">
                {production.title}
              </h3>
            </div>
          </div>

          <div className="p-5 sm:p-7">
            {/* Description */}
            <p className="text-sm leading-relaxed text-muted-foreground sm:text-[0.95rem]">
              {production.summary}
            </p>

            {/* Tags */}
            <div className="mt-4 flex flex-wrap gap-1.5">
              {production.tags.map((t) => (
                <span
                  key={t}
                  className="rounded-md border border-border/60 bg-background/40 px-2 py-0.5 text-[10px] font-medium text-muted-foreground"
                >
                  {t}
                </span>
              ))}
            </div>

            {/* Video carousel */}
            <div className="mt-6">
              <p className="mb-3 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                <Icon name={production.icon} className="h-4 w-4" />
                Production clips · {production.clips.length} independent
                excerpts
              </p>
              <VideoCarousel
                clips={production.clips}
                label={`${production.title} clip carousel`}
              />
            </div>

            {/* Disclosure + case study */}
            <div className="mt-6 flex flex-col gap-4 border-t border-border/60 pt-5 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-xs leading-relaxed text-muted-foreground">
                These clips are AI-generated reconstructions, not authentic
                police recordings.
              </p>
              {production.technicalCaseStudy ? (
                <button
                  onClick={() => setPdfOpen(true)}
                  className="inline-flex shrink-0 items-center gap-2 rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-600 px-5 py-2.5 text-sm font-semibold text-white shadow-[0_0_30px_-8px_rgba(217,70,239,0.7)] transition-all hover:shadow-[0_0_44px_-6px_rgba(217,70,239,0.9)] hover:-translate-y-0.5"
                >
                  <FileText className="h-4 w-4" />
                  View Technical Case Study
                </button>
              ) : (
                <span className="inline-flex shrink-0 items-center gap-2 rounded-full border border-border/70 bg-background/40 px-4 py-2 text-xs text-muted-foreground">
                  <FileText className="h-3.5 w-3.5" />
                  Technical case study in preparation
                </span>
              )}
            </div>
          </div>
        </div>
      </motion.div>
      </motion.div>

      {/* Case study viewer, stacked above the showcase as a sibling
          so backdrop clicks do not bubble into the showcase layer. */}
      <PdfViewerModal
        open={pdfOpen}
        onClose={() => setPdfOpen(false)}
        src={production.technicalCaseStudy ?? ""}
        title={production.caseStudyLabel ?? `${production.title}: Technical Case Study`}
        subtitle="Read online · AI-generated reconstruction portfolio"
      />
    </>
  );
}
