"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  ChevronLeft,
  ChevronRight,
  Play,
  FileText,
  Film,
  Images,
  Braces,
  ExternalLink,
  MonitorPlay,
  Camera,
  PenTool,
} from "lucide-react";
import {
  Icon,
  accentMap,
  type Accent,
} from "./shared";
import { VideoCarousel } from "./video-carousel";
import { DocumentReaderModal, useScrollLock } from "./document-reader-modal";
import { AnnotationStructureModal } from "./annotation-structure-modal";
import type {
  WorkCategoryNode,
  WorkProject,
  WorkSubcategory,
} from "@/lib/work-explorer";
import type { WorkDocument } from "@/lib/work-documents";
import { assetPath } from "@/lib/asset-path";
import { cn } from "@/lib/utils";

/**
 * WorkExplorerModal: nested project explorer opened from a top-level
 * Selected Work card.
 *
 * Hierarchy implemented inside ONE overlay (no standalone page sections):
 *   level 1  subcategory chooser (when the parent defines subcategories)
 *            or the parent's direct project list
 *   level 2  project thumbnail cards for the selected subcategory
 *   level 3  project detail: video carousel or evidence gallery, short
 *            explanation, read-only documents, optional streaming link
 *
 * Interaction guarantees:
 * - Breadcrumb + Back control at every level; Escape and the Close button
 *   dismiss the explorer and restore focus to the opening card.
 * - Media mounts only when its project is opened; going back unmounts and
 *   pauses the previous media. No project media is preloaded up front.
 * - Body scroll stays locked while the explorer (or a stacked document
 *   reader) is open, so the visitor's page scroll position is preserved.
 * - Keyboard accessible buttons, visible focus rings, aria labels, and no
 *   horizontal overflow on small screens.
 */

type ExplorerLevel = "root" | "subcategory" | "project";

export function WorkExplorerModal({
  node,
  onClose,
}: {
  node: WorkCategoryNode;
  onClose: () => void;
}) {
  const [subcategory, setSubcategory] = useState<WorkSubcategory | null>(null);
  const [project, setProject] = useState<WorkProject | null>(null);
  const [doc, setDoc] = useState<WorkDocument | null>(null);
  const [structureOpen, setStructureOpen] = useState(false);
  const restoreFocusRef = useRef<HTMLElement | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);

  useScrollLock(true);

  const level: ExplorerLevel = project
    ? "project"
    : subcategory
    ? "subcategory"
    : "root";

  // Focus the close button when the explorer opens; remember the opener.
  useEffect(() => {
    restoreFocusRef.current = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    return () => {
      restoreFocusRef.current?.focus?.();
    };
  }, []);

  // Reset the scroll position whenever the level changes.
  useEffect(() => {
    bodyRef.current?.scrollTo({ top: 0 });
  }, [level, subcategory?.id, project?.id]);

  // Escape closes the top-most layer. While the document reader or the
  // annotation structure view is open, those layers handle Escape
  // themselves (with stopPropagation), so the explorer must stay put.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (doc || structureOpen) return;
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [doc, structureOpen, onClose]);

  const goBack = () => {
    if (project) {
      setProject(null);
    } else if (subcategory) {
      setSubcategory(null);
    } else {
      onClose();
    }
  };

  const activeProjects: WorkProject[] = useMemo(() => {
    if (subcategory) return subcategory.projects;
    return node.projects ?? [];
  }, [subcategory, node]);

  const crumbCurrent =
    project?.title ?? subcategory?.label ?? node.title;

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
        aria-label={`${node.title} project explorer`}
      >
        {/* Close */}
        <button
          ref={closeRef}
          onClick={onClose}
          aria-label="Close project explorer"
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
          className="relative flex max-h-[92vh] w-full max-w-5xl flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-[0_0_80px_-20px_rgba(139,92,246,0.45)]"
        >
          {/* Breadcrumb / navigation bar */}
          <div className="flex items-center gap-2 border-b border-border/70 bg-background/60 px-3 py-2.5 pr-16 sm:px-5 sm:py-3 sm:pr-20">
            <button
              onClick={goBack}
              aria-label={
                level === "root"
                  ? "Close project explorer"
                  : `Back to ${
                      project
                        ? subcategory
                          ? subcategory.label
                          : node.title
                        : node.title
                    }`
              }
              className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-border bg-background/60 text-foreground transition-all hover:border-violet-400/40 hover:bg-violet-500/10"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <nav
              aria-label="Work explorer navigation"
              className="min-w-0 flex-1"
            >
              <ol className="flex items-center gap-1.5 overflow-x-auto whitespace-nowrap text-xs sm:text-sm [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                <li>
                  <button
                    onClick={onClose}
                    className="rounded px-1 py-0.5 font-medium text-muted-foreground transition-colors hover:text-foreground"
                  >
                    Selected Work
                  </button>
                </li>
                <CrumbSeparator />
                <li>
                  {level === "root" ? (
                    <span
                      aria-current="page"
                      className="rounded px-1 py-0.5 font-semibold text-foreground"
                    >
                      {node.title}
                    </span>
                  ) : (
                    <button
                      onClick={() => {
                        setProject(null);
                        setSubcategory(null);
                      }}
                      className="rounded px-1 py-0.5 font-medium text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {node.title}
                    </button>
                  )}
                </li>
                {subcategory && (
                  <>
                    <CrumbSeparator />
                    <li>
                      {level === "subcategory" ? (
                        <span
                          aria-current="page"
                          className="rounded px-1 py-0.5 font-semibold text-foreground"
                        >
                          {subcategory.label}
                        </span>
                      ) : (
                        <button
                          onClick={() => setProject(null)}
                          className="rounded px-1 py-0.5 font-medium text-muted-foreground transition-colors hover:text-foreground"
                        >
                          {subcategory.label}
                        </button>
                      )}
                    </li>
                  </>
                )}
                {project && (
                  <>
                    <CrumbSeparator />
                    <li>
                      <span
                        aria-current="page"
                        className="max-w-[38vw] truncate rounded px-1 py-0.5 font-semibold text-foreground sm:max-w-[24rem]"
                      >
                        {project.title}
                      </span>
                    </li>
                  </>
                )}
              </ol>
            </nav>
          </div>

          {/* Scrollable body */}
          <div ref={bodyRef} className="min-h-0 flex-1 overflow-y-auto">
            <AnimatePresence mode="wait" initial={false}>
              {level === "root" && (
                <motion.div
                  key={`root-${node.cardSlug}`}
                  initial={{ opacity: 0, x: 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -24 }}
                  transition={{ duration: 0.28, ease: "easeOut" }}
                >
                  {node.subcategories ? (
                    <SubcategoryChooser
                      node={node}
                      onSelect={(s) => setSubcategory(s)}
                    />
                  ) : (
                    <ProjectList
                      intro={node.intro}
                      projects={activeProjects}
                      onOpen={(p) => setProject(p)}
                    />
                  )}
                </motion.div>
              )}

              {level === "subcategory" && subcategory && (
                <motion.div
                  key={`sub-${subcategory.id}`}
                  initial={{ opacity: 0, x: 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -24 }}
                  transition={{ duration: 0.28, ease: "easeOut" }}
                >
                  <ProjectList
                    intro={subcategory.description}
                    subcategoryLabel={subcategory.label}
                    projects={subcategory.projects}
                    pendingNote={subcategory.pendingNote}
                    onOpen={(p) => setProject(p)}
                  />
                </motion.div>
              )}

              {level === "project" && project && (
                <motion.div
                  key={`project-${project.id}`}
                  initial={{ opacity: 0, x: 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -24 }}
                  transition={{ duration: 0.28, ease: "easeOut" }}
                >
                  <ProjectDetail
                    project={project}
                    onOpenDoc={(d) => setDoc(d)}
                    onOpenStructure={() => setStructureOpen(true)}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </motion.div>

      {/* Stacked read-only document reader */}
      {doc && (
        <DocumentReaderModal
          open={doc !== null}
          onClose={() => setDoc(null)}
          doc={doc}
        />
      )}

      {/* Stacked annotation structure view */}
      <AnnotationStructureModal
        open={structureOpen}
        onClose={() => setStructureOpen(false)}
      />
    </>
  );
}

function CrumbSeparator() {
  return (
    <li aria-hidden className="text-muted-foreground/60">
      /
    </li>
  );
}

/* ------------------------------------------------------------------ */
/* Level 1: subcategory chooser                                        */
/* ------------------------------------------------------------------ */

const SUBCATEGORY_ICONS: Record<string, typeof Camera> = {
  "police-bodycam-dashcam": MonitorPlay,
  "cctv-reconstructions": Camera,
  "image-annotation": PenTool,
  "video-tracking": Film,
};

function SubcategoryChooser({
  node,
  onSelect,
}: {
  node: WorkCategoryNode;
  onSelect: (s: WorkSubcategory) => void;
}) {
  return (
    <div className="p-5 sm:p-7">
      <h3 className="font-display text-xl font-bold leading-tight text-foreground sm:text-2xl">
        {node.title}
      </h3>
      <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted-foreground sm:text-[0.95rem]">
        {node.intro}
      </p>

      <p className="mt-6 mb-3 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
        Choose a category
      </p>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {node.subcategories!.map((s) => {
          const IconCmp =
            SUBCATEGORY_ICONS[s.id] ?? ChevronRight;
          return (
            <button
              key={s.id}
              onClick={() => onSelect(s)}
              aria-label={`Open ${s.label}: ${
                s.projects.length > 0
                  ? `${s.projects.length} ${
                      s.projects.length === 1 ? "production" : "productions"
                    }`
                  : "practice summary"
              }`}
              className="group relative overflow-hidden rounded-2xl border border-border bg-background/40 p-5 text-left transition-all duration-300 hover:-translate-y-1 hover:border-violet-400/40 hover:shadow-[0_0_44px_-12px_rgba(168,85,247,0.6)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400/60"
            >
              <div className="flex items-start justify-between gap-3">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-violet-400/30 bg-violet-500/15 text-violet-300">
                  <IconCmp className="h-5 w-5" />
                </span>
                <span className="grid h-9 w-9 place-items-center rounded-full border border-border/70 bg-background/60 text-muted-foreground transition-all group-hover:border-violet-400/50 group-hover:bg-violet-500/20 group-hover:text-violet-100">
                  <ChevronRight className="h-4 w-4" />
                </span>
              </div>
              <p className="mt-4 font-display text-base font-semibold leading-snug text-foreground">
                {s.label}
              </p>
              <p className="mt-1 text-xs font-medium text-muted-foreground">
                {s.projects.length > 0
                  ? `${s.projects.length} ${
                      s.projects.length === 1
                        ? "production"
                        : "productions"
                    }`
                  : "Practice summary"}
              </p>
              <p className="mt-2.5 line-clamp-2 text-xs leading-relaxed text-muted-foreground">
                {s.description}
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Level 2: project thumbnail cards                                    */
/* ------------------------------------------------------------------ */

function ProjectList({
  intro,
  subcategoryLabel,
  projects,
  pendingNote,
  onOpen,
}: {
  intro: string;
  subcategoryLabel?: string;
  projects: WorkProject[];
  pendingNote?: string;
  onOpen: (p: WorkProject) => void;
}) {
  return (
    <div className="p-5 sm:p-7">
      {subcategoryLabel && (
        <p className="text-[11px] font-semibold uppercase tracking-wider text-violet-300">
          {subcategoryLabel}
        </p>
      )}
      <p className="mt-2 max-w-3xl text-sm leading-relaxed text-muted-foreground sm:text-[0.95rem]">
        {intro}
      </p>

      {projects.length === 0 ? (
        pendingNote && (
          <div className="mt-6 rounded-xl border border-border/60 bg-background/40 p-5">
            <p className="text-sm leading-relaxed text-muted-foreground">
              {pendingNote}
            </p>
          </div>
        )
      ) : (
        <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2">
          {projects.map((p) => (
            <ProjectCard key={p.id} project={p} onOpen={onOpen} />
          ))}
        </div>
      )}
    </div>
  );
}

function ProjectCard({
  project,
  onOpen,
}: {
  project: WorkProject;
  onOpen: (p: WorkProject) => void;
}) {
  const a = accentMap[project.accent as Accent];
  const mediaBadge =
    project.mediaKind === "carousel"
      ? `${project.clips?.length ?? 0} clips`
      : project.mediaKind === "single-video"
      ? "Showcase video"
      : `${project.gallery?.length ?? 0} evidence images`;

  return (
    <button
      onClick={() => onOpen(project)}
      aria-label={`Open project: ${project.title}`}
      className="group relative block h-full w-full overflow-hidden rounded-2xl border border-border bg-card/60 text-left backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-violet-400/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400/60"
    >
      {/* Cover */}
      <div className="relative aspect-[47/26] w-full overflow-hidden">
        <img
          src={assetPath(project.cover)}
          alt={`${project.title} project cover`}
          loading="lazy"
          decoding="async"
          draggable={false}
          className="h-full w-full select-none object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/85 via-background/10 to-transparent" />
        <div className="absolute left-3 top-3 flex flex-wrap gap-2">
          <span
            className={cn(
              "inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider backdrop-blur-md",
              a.border,
              a.bg,
              a.text
            )}
          >
            {project.status}
          </span>
          <span className="inline-flex items-center gap-1 rounded-full border border-white/15 bg-background/60 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-foreground/90 backdrop-blur-md">
            {project.mediaKind === "single-video" ? (
              <Film className="h-3 w-3" />
            ) : project.mediaKind === "carousel" ? (
              <Play className="h-3 w-3" />
            ) : (
              <Images className="h-3 w-3" />
            )}
            {mediaBadge}
          </span>
        </div>
        {project.documents.length > 0 && (
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
      <div className="relative p-5">
        <p
          className={cn(
            "text-[11px] font-semibold uppercase tracking-wider",
            a.text
          )}
        >
          {project.category}
        </p>
        <h4 className="mt-1.5 font-display text-base font-semibold leading-snug text-foreground">
          {project.title}
        </h4>
        <p className="mt-2.5 line-clamp-3 text-sm leading-relaxed text-muted-foreground">
          {project.summary}
        </p>
        <div className="mt-4 flex flex-wrap gap-1.5">
          {project.tags.slice(0, 4).map((t) => (
            <span
              key={t}
              className="rounded-md border border-border/60 bg-background/40 px-2 py-0.5 text-[10px] font-medium text-muted-foreground"
            >
              {t}
            </span>
          ))}
          {project.tags.length > 4 && (
            <span className="rounded-md border border-border/60 bg-background/40 px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
              +{project.tags.length - 4}
            </span>
          )}
        </div>
        <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-violet-200 transition-colors group-hover:text-violet-100">
          <span className="grid h-8 w-8 place-items-center rounded-full border border-violet-400/40 bg-violet-500/15">
            <Play className="h-3.5 w-3.5" />
          </span>
          Open project
        </span>
      </div>
    </button>
  );
}

/* ------------------------------------------------------------------ */
/* Level 3: project detail                                             */
/* ------------------------------------------------------------------ */

function ProjectDetail({
  project,
  onOpenDoc,
  onOpenStructure,
}: {
  project: WorkProject;
  onOpenDoc: (d: WorkDocument) => void;
  onOpenStructure: () => void;
}) {
  const a = accentMap[project.accent as Accent];

  return (
    <div>
      {/* Cover banner */}
      <div className="relative aspect-[47/26] max-h-64 w-full overflow-hidden sm:max-h-72">
        <img
          src={assetPath(project.cover)}
          alt={`${project.title} project cover`}
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
            {project.category}
          </p>
          <h3 className="mt-1 font-display text-xl font-bold leading-tight text-foreground sm:text-2xl">
            {project.title}
          </h3>
        </div>
      </div>

      <div className="p-5 sm:p-7">
        {/* Description */}
        <p className="text-sm leading-relaxed text-muted-foreground sm:text-[0.95rem]">
          {project.summary}
        </p>

        {/* Tags */}
        <div className="mt-4 flex flex-wrap gap-1.5">
          {project.tags.map((t) => (
            <span
              key={t}
              className="rounded-md border border-border/60 bg-background/40 px-2 py-0.5 text-[10px] font-medium text-muted-foreground"
            >
              {t}
            </span>
          ))}
        </div>

        {/* Primary media */}
        {project.mediaKind === "carousel" && project.clips && (
          <div className="mt-6">
            <p className="mb-3 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
              <Icon name={project.icon} className="h-4 w-4" />
              Selected excerpts · {project.clips.length} independent clips
            </p>
            <VideoCarousel
              clips={project.clips}
              label={`${project.title} clip carousel`}
              aspectClass={project.aspectClass}
            />
          </div>
        )}

        {project.mediaKind === "single-video" && project.video && (
          <div className="mt-6">
            <p className="mb-3 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
              <Icon name={project.icon} className="h-4 w-4" />
              Reconstruction showcase
            </p>
            <div className="overflow-hidden rounded-xl border border-border/70 bg-black">
              <div className="relative aspect-video w-full">
                {/* Single connected sequence: clean single-video player, no
                    carousel arrows and no artificial clip count. */}
                <video
                  src={assetPath(project.video.src)}
                  controls
                  playsInline
                  preload="metadata"
                  controlsList="nodownload"
                  disablePictureInPicture
                  aria-label={`${project.video.title}, an AI-generated reconstruction`}
                  className="h-full w-full select-none object-contain"
                />
              </div>
            </div>
            <div className="mt-3 flex items-center gap-2">
              <Film className="h-4 w-4 shrink-0 text-fuchsia-300" />
              <p className="text-sm font-medium text-foreground">
                {project.video.title}
              </p>
            </div>
          </div>
        )}

        {project.mediaKind === "gallery" && project.gallery && (
          <div className="mt-6">
            <p className="mb-3 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
              <Icon name={project.icon} className="h-4 w-4" />
              Evidence gallery · {project.gallery.length} items
            </p>
            <div className="space-y-4">
              {project.gallery.map((img) => (
                <figure
                  key={img.src}
                  className="overflow-hidden rounded-xl border border-border/70 bg-background/40"
                >
                  <div className="relative">
                    <img
                      src={assetPath(img.src)}
                      alt={img.caption}
                      loading="lazy"
                      decoding="async"
                      draggable={false}
                      onContextMenu={(e) => e.preventDefault()}
                      className="block w-full select-none object-contain"
                    />
                    <span
                      className={cn(
                        "absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider backdrop-blur-md",
                        img.kind === "screenshot"
                          ? "border-sky-400/40 bg-sky-500/20 text-sky-100"
                          : "border-amber-400/40 bg-amber-500/15 text-amber-100"
                      )}
                    >
                      {img.kind === "screenshot" ? (
                        <>
                          <MonitorPlay className="h-3 w-3" />
                          Software screenshot
                        </>
                      ) : (
                        <>
                          <PenTool className="h-3 w-3" />
                          Conceptual diagram
                        </>
                      )}
                    </span>
                  </div>
                  <figcaption className="border-t border-border/60 px-4 py-3 text-xs leading-relaxed text-muted-foreground">
                    {img.caption}
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        )}

        {/* Case context */}
        {project.documentedNote && (
          <div className="mt-6 rounded-xl border border-border/60 bg-background/40 p-4">
            <p className="mb-1.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
              Case context
            </p>
            <p className="text-xs leading-relaxed text-muted-foreground">
              {project.documentedNote}
            </p>
          </div>
        )}

        {/* Evidence actions */}
        {(project.documents.length > 0 ||
          project.hasAnnotationStructure ||
          project.externalLink) && (
          <div className="mt-6 flex flex-col gap-3 border-t border-border/60 pt-5 sm:flex-row sm:flex-wrap sm:items-center">
            {project.documents.map((d, i) => (
              <button
                key={d.pagesDir}
                onClick={() => onOpenDoc(d)}
                className={
                  i === 0
                    ? "inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-600 px-5 py-2.5 text-sm font-semibold text-white shadow-[0_0_30px_-8px_rgba(217,70,239,0.7)] transition-all hover:shadow-[0_0_44px_-6px_rgba(217,70,239,0.9)] hover:-translate-y-0.5"
                    : "inline-flex shrink-0 items-center justify-center gap-2 rounded-full border border-violet-400/40 bg-violet-500/10 px-5 py-2.5 text-sm font-semibold text-violet-100 transition-all hover:border-violet-400/60 hover:bg-violet-500/20 hover:-translate-y-0.5"
                }
              >
                <FileText className="h-4 w-4" />
                {d.actionLabel}
              </button>
            ))}

            {project.hasAnnotationStructure && (
              <button
                onClick={onOpenStructure}
                className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full border border-sky-400/40 bg-sky-500/10 px-5 py-2.5 text-sm font-semibold text-sky-100 transition-all hover:border-sky-400/60 hover:bg-sky-500/20 hover:-translate-y-0.5"
              >
                <Braces className="h-4 w-4" />
                Inspect Annotation Structure
              </button>
            )}

            {project.externalLink && (
              <a
                href={project.externalLink.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full border border-emerald-400/40 bg-emerald-500/10 px-5 py-2.5 text-sm font-semibold text-emerald-100 transition-all hover:border-emerald-400/60 hover:bg-emerald-500/20 hover:-translate-y-0.5"
              >
                <ExternalLink className="h-4 w-4" />
                {project.externalLink.label}
              </a>
            )}
          </div>
        )}

        {/* Disclosure */}
        {project.disclosure && (
          <p className="mt-5 text-xs leading-relaxed text-muted-foreground">
            {project.disclosure}
          </p>
        )}
      </div>
    </div>
  );
}
