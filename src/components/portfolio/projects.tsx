"use client";

import { useRef, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { Section, SectionHeading, GlowCard, Icon, accentMap, type Accent, Reveal } from "./shared";
import { projects as defaultProjects } from "@/lib/portfolio-data";
import { ArrowUpRight, FolderOpen, Sparkles } from "lucide-react";
import {
  findWorkNode,
  summarizeNode,
  type WorkCategoryNode,
} from "@/lib/work-explorer";
import { WorkExplorerModal } from "./work-explorer";

type ProjectItem = typeof defaultProjects[number];

/**
 * Projects: the Selected Work section.
 *
 * Top-level professional work cards. Cards whose title maps to a nested
 * explorer node (true-crime reconstruction, 3D documentary production,
 * CVAT practice) open the nested project explorer: subcategory, then
 * project, then its media and read-only documents. Cards without nested
 * content keep their static presentation. Detailed project galleries are
 * NEVER rendered as permanent standalone sections below this grid.
 */
export function Projects({ projects = defaultProjects }: { projects?: ProjectItem[] } = {}) {
  const [explorerNode, setExplorerNode] = useState<WorkCategoryNode | null>(null);
  const openerRef = useRef<HTMLButtonElement | null>(null);

  return (
    <Section id="generative-ai-work" className="border-t border-border/40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Selected Work"
          title={
            <>
              Selected projects in AI video production, documentary
              reconstruction, and{" "}
              <span className="text-gradient">visual data annotation</span>.
            </>
          }
          accent="magenta"
        />

        <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((p, i) => {
            const accent = p.accent as Accent;
            const a = accentMap[accent];
            const node = findWorkNode(p.title);
            const counts = node ? summarizeNode(node) : [];

            const cardBody = (
              <>
                {/* header */}
                <div className="mb-4 flex items-start justify-between">
                  <div className={`grid h-12 w-12 place-items-center rounded-xl border ${a.iconWrap}`}>
                    <Icon name={p.icon} className="h-5 w-5" />
                  </div>
                  {p.placeholder ? (
                    <span className="inline-flex items-center gap-1 rounded-full border border-amber-400/40 bg-amber-500/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-amber-200">
                      Placeholder
                    </span>
                  ) : (
                    <span className={`inline-flex items-center gap-1 rounded-full border ${a.border} ${a.bg} px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider ${a.text}`}>
                      {p.status}
                    </span>
                  )}
                </div>

                <p className={`text-[11px] font-semibold uppercase tracking-wider ${a.text}`}>
                  {p.category}
                </p>
                <h3 className="mt-1 font-display text-lg font-semibold leading-snug text-foreground">
                  {p.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {p.summary}
                </p>

                {/* focus tags */}
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {p.focus.map((f) => (
                    <span
                      key={f}
                      className="rounded-md border border-border/60 bg-background/40 px-2 py-0.5 text-[10px] font-medium text-muted-foreground"
                    >
                      {f}
                    </span>
                  ))}
                </div>

                {/* value */}
                <div className="mt-5 grow rounded-xl border border-border/60 bg-background/40 p-3">
                  <p className="mb-1 flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                    <Sparkles className="h-3 w-3" />
                    Professional value
                  </p>
                  <p className="text-xs leading-relaxed text-muted-foreground">{p.value}</p>
                </div>

                {p.placeholder && (
                  <div className="mt-4 flex items-center gap-1.5 text-xs font-medium text-amber-200">
                    <ArrowUpRight className="h-3.5 w-3.5" />
                    Coming soon · not yet a client project
                  </div>
                )}

                {/* Nested explorer affordance: only on parent cards with
                    registered nested content. Clearly a clickable action,
                    distinct from the non-interactive status badge above. */}
                {node && (
                  <div className="mt-5 border-t border-border/60 pt-4">
                    <span className="inline-flex items-center gap-2 text-sm font-semibold text-violet-200 transition-colors group-hover/button:text-violet-100">
                      <span className="grid h-8 w-8 place-items-center rounded-full border border-violet-400/40 bg-violet-500/15">
                        <FolderOpen className="h-3.5 w-3.5" />
                      </span>
                      Explore projects
                    </span>
                    <span className="mt-2 flex flex-wrap gap-1.5">
                      {counts.map((c) => (
                        <span
                          key={c}
                          className="rounded-md border border-violet-400/25 bg-violet-500/10 px-2 py-0.5 text-[10px] font-medium text-violet-200"
                        >
                          {c}
                        </span>
                      ))}
                    </span>
                  </div>
                )}
              </>
            );

            return (
              <Reveal key={p.title} delay={(i % 3) * 0.06}>
                {node ? (
                  <button
                    onClick={() => {
                      openerRef.current = null;
                      setExplorerNode(node);
                    }}
                    aria-label={`Explore ${p.title} projects`}
                    className="group/button block h-full w-full text-left focus-visible:outline-none"
                  >
                    <GlowCard accent={accent} className="flex h-full flex-col transition-transform duration-300 hover:-translate-y-1 focus-visible:ring-2 focus-visible:ring-violet-400/60">
                      {cardBody}
                    </GlowCard>
                  </button>
                ) : (
                  <GlowCard accent={accent} className="flex h-full flex-col">
                    {cardBody}
                  </GlowCard>
                )}
              </Reveal>
            );
          })}
        </div>
      </div>

      {/* Nested project explorer overlay. Detailed galleries, carousels
          and document readers mount only while this is open. */}
      <AnimatePresence>
        {explorerNode && (
          <WorkExplorerModal
            node={explorerNode}
            onClose={() => setExplorerNode(null)}
          />
        )}
      </AnimatePresence>
    </Section>
  );
}
