"use client";

import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Braces, AlertTriangle, ShieldCheck } from "lucide-react";
import { cvatStructure } from "@/lib/cvat-annotation-structure";
import { useScrollLock } from "./document-reader-modal";

/**
 * AnnotationStructureModal: read-only, sanitized view of the CVAT export's
 * label ontology and supported attributes for the packaging robotic arm
 * practice. Shows verified structure information only: no raw
 * bounding-box coordinates, no track arrays, no owner details, no task
 * URLs and no full XML. This is a viewing aid, not a dataset download.
 */
export function AnnotationStructureModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const restoreFocusRef = useRef<HTMLElement | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useScrollLock(open);

  useEffect(() => {
    if (open) {
      restoreFocusRef.current = document.activeElement as HTMLElement | null;
      closeRef.current?.focus();
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    return () => {
      restoreFocusRef.current?.focus?.();
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.stopPropagation();
        onClose();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[90] flex items-center justify-center bg-background/95 p-3 backdrop-blur-xl sm:p-6"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label="Annotation structure: CVAT for video 1.1 XML export summary"
        >
          {/* Close */}
          <button
            ref={closeRef}
            onClick={onClose}
            aria-label="Close annotation structure view"
            className="absolute right-4 top-4 z-10 grid h-11 w-11 place-items-center rounded-full border border-border bg-card/70 text-foreground backdrop-blur-md transition-all hover:bg-card hover:shadow-[0_0_24px_-6px_rgba(217,70,239,0.6)] sm:right-6 sm:top-6"
          >
            <X className="h-5 w-5" />
          </button>

          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.99 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative flex max-h-[92vh] w-full max-w-3xl flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-[0_0_80px_-20px_rgba(139,92,246,0.45)]"
          >
            {/* Header */}
            <div className="flex items-center gap-3 border-b border-border/70 bg-background/60 px-4 py-3 sm:px-6">
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-violet-400/30 bg-violet-500/15 text-violet-300">
                <Braces className="h-4 w-4" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-foreground">
                  {cvatStructure.title}
                </p>
                <p className="truncate text-[11px] uppercase tracking-wider text-muted-foreground">
                  {cvatStructure.subtitle}
                </p>
              </div>
            </div>

            {/* Body */}
            <div className="min-h-0 flex-1 overflow-y-auto p-4 sm:p-6">
              {/* Overview facts */}
              <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3">
                {cvatStructure.overview.map((o) => (
                  <div
                    key={o.label}
                    className="rounded-xl border border-border/60 bg-background/40 p-3"
                  >
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                      {o.label}
                    </p>
                    <p className="mt-1 text-sm font-semibold leading-snug text-foreground">
                      {o.value}
                    </p>
                  </div>
                ))}
              </div>

              {/* Label ontology */}
              <p className="mt-6 mb-3 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                Label ontology and attributes
              </p>
              <div className="space-y-2.5">
                {cvatStructure.labels.map((label) => (
                  <div
                    key={label.name}
                    className="rounded-xl border border-border/60 bg-background/40 p-3.5"
                  >
                    <div className="flex flex-wrap items-center gap-2">
                      <code className="rounded-md border border-violet-400/30 bg-violet-500/10 px-2 py-0.5 text-xs font-semibold text-violet-200">
                        {label.name}
                      </code>
                      <span className="rounded-full border border-border/60 bg-background/60 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                        {label.type === "tag" ? "event tag" : "rectangle"}
                      </span>
                      {label.configuredWithoutTrack ? (
                        <span className="rounded-full border border-amber-400/40 bg-amber-500/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-amber-200">
                          configured · no exported track
                        </span>
                      ) : (
                        <span className="rounded-full border border-emerald-400/30 bg-emerald-500/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-emerald-200">
                          {label.exportedTracks}{" "}
                          {label.exportedTracks === 1 ? "track" : "tracks"}
                        </span>
                      )}
                    </div>
                    <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                      {label.role}
                    </p>
                    {label.attributes.length > 0 && (
                      <ul className="mt-2.5 space-y-1.5">
                        {label.attributes.map((attr) => (
                          <li
                            key={attr.name}
                            className="flex flex-wrap items-baseline gap-x-2 gap-y-1 text-xs text-muted-foreground"
                          >
                            <code className="rounded border border-border/70 bg-background/60 px-1.5 py-0.5 text-[11px] font-semibold text-sky-200">
                              {attr.name}
                            </code>
                            <span>
                              {attr.mutable ? "mutable" : "immutable"} ·{" "}
                              {attr.valueCount} values · e.g.{" "}
                              {attr.exampleValues.join(", ")}
                            </span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>

              {/* Track distribution */}
              <p className="mt-6 mb-3 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                Exported tracks by label
              </p>
              <div className="flex flex-wrap gap-2">
                {cvatStructure.trackDistribution.map((t) => (
                  <span
                    key={t.label}
                    className="inline-flex items-center gap-1.5 rounded-full border border-border/60 bg-background/40 px-3 py-1 text-xs text-muted-foreground"
                  >
                    <code className="font-semibold text-violet-200">
                      {t.label}
                    </code>
                    {t.tracks} {t.tracks === 1 ? "track" : "tracks"}
                  </span>
                ))}
              </div>

              {/* Open QA items */}
              <div className="mt-6 rounded-xl border border-amber-400/30 bg-amber-500/5 p-4">
                <p className="mb-2.5 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wider text-amber-200">
                  <AlertTriangle className="h-3.5 w-3.5" />
                  Open QA items, stated rather than hidden
                </p>
                <ul className="space-y-2">
                  {cvatStructure.qaNotes.map((note) => (
                    <li
                      key={note}
                      className="flex gap-2 text-xs leading-relaxed text-muted-foreground"
                    >
                      <span className="mt-1 h-1 w-1 shrink-0 rounded-full bg-amber-300" />
                      {note}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Sanitization note */}
              <div className="mt-4 flex items-start gap-2.5 rounded-xl border border-border/60 bg-background/40 p-4">
                <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-emerald-300" />
                <p className="text-xs leading-relaxed text-muted-foreground">
                  {cvatStructure.sanitizationNote}
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
