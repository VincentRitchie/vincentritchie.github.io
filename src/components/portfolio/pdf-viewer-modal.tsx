"use client";

import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, FileText } from "lucide-react";
import { assetPath } from "@/lib/asset-path";

/* ------------------------------------------------------------------ */
/* Scroll-lock counter — supports stacked modals (case study opened   */
/* on top of a production showcase modal) without prematurely         */
/* restoring body scroll.                                             */
/* ------------------------------------------------------------------ */
let lockCount = 0;
function lockScroll() {
  lockCount += 1;
  if (lockCount === 1) document.body.style.overflow = "hidden";
}
function unlockScroll() {
  lockCount = Math.max(0, lockCount - 1);
  if (lockCount === 0) document.body.style.overflow = "";
}

/**
 * Counter-based body scroll lock for stacked modals. While `active` is
 * true the page behind cannot scroll; when several overlays are open,
 * scroll is only restored once ALL of them have closed.
 */
export function useScrollLock(active: boolean) {
  useEffect(() => {
    if (!active) return;
    lockScroll();
    return () => unlockScroll();
  }, [active]);
}

/**
 * PdfViewerModal — professional, responsive in-site document viewer.
 *
 * - Displays the PDF inside the site interface (no forced download,
 *   no download button in our UI).
 * - Uses the browser's native PDF engine with the Chrome/Edge
 *   `#toolbar=0` parameter so the viewer's own download toolbar is
 *   hidden where the browser supports it. Scroll-through reading,
 *   page navigation and zoom remain fully available.
 * - Escape key, backdrop click and the Close button all dismiss the
 *   viewer and return the visitor to where they were.
 * - Rendered above the production showcase modal (z-[90]) so case
 *   studies can be opened from inside a showcase without losing it.
 */
export function PdfViewerModal({
  open,
  onClose,
  src,
  title,
  subtitle,
}: {
  open: boolean;
  onClose: () => void;
  /** Logical public path to the PDF (wrapped with assetPath()). */
  src: string;
  title: string;
  subtitle?: string;
}) {
  const panelRef = useRef<HTMLDivElement>(null);

  useScrollLock(open);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
    };
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
          aria-label={title}
        >
          {/* Close */}
          <button
            onClick={onClose}
            aria-label="Close document viewer"
            className="absolute right-4 top-4 z-10 grid h-11 w-11 place-items-center rounded-full border border-border bg-card/70 text-foreground backdrop-blur-md transition-all hover:bg-card hover:shadow-[0_0_24px_-6px_rgba(217,70,239,0.6)] sm:right-6 sm:top-6"
          >
            <X className="h-5 w-5" />
          </button>

          <motion.div
            ref={panelRef}
            initial={{ opacity: 0, y: 24, scale: 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.99 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative flex h-full w-full max-w-5xl flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-[0_0_80px_-20px_rgba(139,92,246,0.45)]"
          >
            {/* Header */}
            <div className="flex items-center gap-3 border-b border-border/70 bg-background/60 px-4 py-3 sm:px-6">
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-violet-400/30 bg-violet-500/15 text-violet-300">
                <FileText className="h-4 w-4" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-foreground">
                  {title}
                </p>
                {subtitle && (
                  <p className="truncate text-[11px] uppercase tracking-wider text-muted-foreground">
                    {subtitle}
                  </p>
                )}
              </div>
              <button
                onClick={onClose}
                className="hidden shrink-0 items-center gap-1.5 rounded-full border border-border bg-background/60 px-4 py-1.5 text-xs font-semibold text-foreground transition-all hover:border-violet-400/40 hover:bg-violet-500/10 sm:inline-flex"
              >
                <X className="h-3.5 w-3.5" />
                Close
              </button>
            </div>

            {/* Document body — native PDF engine, toolbar hidden where supported */}
            <div className="relative flex-1 bg-background/40">
              <iframe
                src={`${assetPath(src)}#toolbar=0&navpanes=0&view=FitH`}
                title={title}
                className="absolute inset-0 h-full w-full border-0"
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
