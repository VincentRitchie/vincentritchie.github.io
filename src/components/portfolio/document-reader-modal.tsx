"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, FileText, ChevronLeft, ChevronRight } from "lucide-react";
import { assetPath } from "@/lib/asset-path";
import { documentPageSrc, type WorkDocument } from "@/lib/work-documents";

/* ------------------------------------------------------------------ */
/* Scroll-lock counter: supports stacked overlays (document reader     */
/* opened on top of the work explorer) without prematurely restoring   */
/* body scroll.                                                        */
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
 * Counter-based body scroll lock for stacked overlays. While `active` is
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
 * DocumentReaderModal: shared, responsive, read-only in-site document
 * viewer used by every professional evidence document on the site (case
 * studies, illustrated guides and the CV).
 *
 * - Renders optimized page IMAGES generated from the private source PDFs
 *   during development: no native PDF embed, no download toolbar, no
 *   print controls in the site's authored interface.
 * - Pages are lazily loaded (loading="lazy"): only pages near the
 *   viewport are fetched, so opening a 19-page case study does not
 *   download all pages at once.
 * - Prev/next page navigation with a live page indicator, keyboard
 *   support (Escape closes; ArrowLeft/ArrowRight turn pages) and
 *   scroll-through reading.
 * - Escape, backdrop click and the Close button all dismiss the reader
 *   and return the visitor to where they were.
 * - Optional `pdfSrc` fallback: when a full-stack admin upload only
 *   exists as a PDF file, the reader falls back to a sandboxed embed
 *   with the viewer toolbar hidden where the browser supports it.
 */
export function DocumentReaderModal({
  open,
  onClose,
  doc,
  pdfSrc,
}: {
  open: boolean;
  onClose: () => void;
  /** Document to display (page images inside the site reader). */
  doc: WorkDocument;
  /**
   * Optional direct PDF path override (admin-uploaded files in
   * full-stack mode). When provided, the reader uses a sandboxed embed
   * instead of the pre-rendered page images.
   */
  pdfSrc?: string | null;
}) {
  const restoreFocusRef = useRef<HTMLElement | null>(null);

  useScrollLock(open);

  // Remember the element that opened the reader; when the reader closes,
  // return focus to it so keyboard users keep their place.
  useEffect(() => {
    if (!open) return;
    restoreFocusRef.current = document.activeElement as HTMLElement | null;
    return () => {
      restoreFocusRef.current?.focus?.();
    };
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <ReaderBackdrop onClose={onClose} label={doc.title}>
          <ReaderPanel
            key={`${doc.pagesDir}-${doc.pageCount}`}
            doc={doc}
            pdfSrc={pdfSrc ?? null}
            onClose={onClose}
          />
        </ReaderBackdrop>
      )}
    </AnimatePresence>
  );
}

function ReaderBackdrop({
  onClose,
  label,
  children,
}: {
  onClose: () => void;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-[90] flex items-center justify-center bg-background/95 p-3 backdrop-blur-xl sm:p-6"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={label}
    >
      {children}
    </motion.div>
  );
}

/**
 * ReaderPanel: the reader content. Mounted only while the reader is open,
 * so page state starts fresh (page 1, scroll at top) on every open.
 */
function ReaderPanel({
  doc,
  pdfSrc,
  onClose,
}: {
  doc: WorkDocument;
  pdfSrc: string | null;
  onClose: () => void;
}) {
  const [page, setPage] = useState(1);
  const scrollRef = useRef<HTMLDivElement>(null);
  const pageRefs = useRef<(HTMLDivElement | null)[]>([]);
  const closeRef = useRef<HTMLButtonElement>(null);
  const pageCount = doc.pageCount;

  // Focus the close button when the reader opens.
  useEffect(() => {
    closeRef.current?.focus();
  }, []);

  const goToPage = useCallback(
    (n: number) => {
      const clamped = Math.max(1, Math.min(pageCount, n));
      setPage(clamped);
      const el = pageRefs.current[clamped - 1];
      const container = scrollRef.current;
      if (el && container) {
        container.scrollTo({
          top: el.offsetTop - container.offsetTop - 8,
          behavior: "smooth",
        });
      }
    },
    [pageCount]
  );

  // Keyboard: Escape closes; arrow keys turn pages.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowRight" || e.key === "PageDown") {
        e.preventDefault();
        goToPage(page + 1);
      } else if (e.key === "ArrowLeft" || e.key === "PageUp") {
        e.preventDefault();
        goToPage(page - 1);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose, page, goToPage]);

  // Track the current page while the visitor scrolls through the pages.
  useEffect(() => {
    if (pdfSrc) return;
    const container = scrollRef.current;
    if (!container) return;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const top = container.scrollTop + 48;
        let current = 1;
        for (let i = 0; i < pageRefs.current.length; i += 1) {
          const el = pageRefs.current[i];
          if (el && el.offsetTop - container.offsetTop <= top) current = i + 1;
        }
        setPage((prev) => (prev === current ? prev : current));
      });
    };
    container.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      container.removeEventListener("scroll", onScroll);
    };
  }, [pdfSrc]);

  return (
    <motion.div
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
            {doc.title}
          </p>
          {doc.subtitle && (
            <p className="truncate text-[11px] uppercase tracking-wider text-muted-foreground">
              {doc.subtitle}
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

      {/* Document body */}
      {pdfSrc ? (
        <div className="relative flex-1 bg-background/40">
          <iframe
            src={`${assetPath(pdfSrc)}#toolbar=0&navpanes=0&view=FitH`}
            title={doc.title}
            className="absolute inset-0 h-full w-full border-0"
          />
        </div>
      ) : (
        <div
          ref={scrollRef}
          className="relative flex-1 overflow-y-auto bg-background/40"
        >
          <div className="mx-auto flex max-w-[860px] flex-col gap-4 px-3 py-4 sm:px-6">
            {Array.from({ length: pageCount }, (_, i) => i + 1).map((n) => (
              <div
                key={n}
                ref={(el) => {
                  pageRefs.current[n - 1] = el;
                }}
                className="overflow-hidden rounded-lg border border-border/60 bg-card shadow-sm"
              >
                <img
                  src={assetPath(documentPageSrc(doc, n))}
                  alt={`${doc.title}, page ${n} of ${pageCount}`}
                  loading="lazy"
                  decoding="async"
                  draggable={false}
                  onContextMenu={(e) => e.preventDefault()}
                  className="block w-full select-none"
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Page navigation */}
      {!pdfSrc && (
        <div className="flex items-center justify-between gap-3 border-t border-border/70 bg-background/60 px-4 py-2.5 sm:px-6">
          <button
            onClick={() => goToPage(page - 1)}
            disabled={page <= 1}
            className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background/60 px-3.5 py-1.5 text-xs font-semibold text-foreground transition-all hover:border-violet-400/40 hover:bg-violet-500/10 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <ChevronLeft className="h-3.5 w-3.5" />
            Previous page
          </button>
          <p
            className="text-xs font-semibold tabular-nums text-muted-foreground"
            aria-live="polite"
          >
            Page {page} of {pageCount}
          </p>
          <button
            onClick={() => goToPage(page + 1)}
            disabled={page >= pageCount}
            className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background/60 px-3.5 py-1.5 text-xs font-semibold text-foreground transition-all hover:border-violet-400/40 hover:bg-violet-500/10 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Next page
            <ChevronRight className="h-3.5 w-3.5" />
          </button>
        </div>
      )}
    </motion.div>
  );
}
