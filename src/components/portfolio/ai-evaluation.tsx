"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Reveal, Section, SectionHeading, Icon } from "./shared";
import {
  aiEvaluation,
  dataAnnotation,
  rubricEvaluation,
  hallucinationDetection,
} from "@/lib/portfolio-data";
import { ScanSearch, Tags, ListChecks, ShieldAlert, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

const tabs = [
  { id: "evaluation", label: "Multimodal Prompting", icon: ScanSearch, accent: "violet" as const },
  { id: "annotation", label: "Text-to-Image", icon: Tags, accent: "blue" as const },
  { id: "rubric", label: "Image-to-Video", icon: ListChecks, accent: "magenta" as const },
  { id: "hallucination", label: "Voice & Sequencing", icon: ShieldAlert, accent: "violet" as const },
];

export function AiEvaluation() {
  const [active, setActive] = useState("evaluation");

  return (
    <Section id="multimodal-prompting" className="border-t border-border/40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Multimodal Prompt Engineering"
          title={
            <>
              A structured, evidence-based approach to{" "}
              <span className="text-gradient">multimodal AI production</span>
            </>
          }
          intro={aiEvaluation.intro}
          accent="violet"
        />

        {/* Tabs */}
        <Reveal delay={0.1}>
          <div className="mt-10 flex flex-wrap gap-2">
            {tabs.map((t) => {
              const isActive = active === t.id;
              const TabIcon = t.icon;
              return (
                <button
                  key={t.id}
                  onClick={() => setActive(t.id)}
                  className={cn(
                    "inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-all",
                    isActive
                      ? t.accent === "violet"
                        ? "border-violet-400/50 bg-violet-500/20 text-violet-100 shadow-[0_0_30px_-8px_rgba(168,85,247,0.7)]"
                        : t.accent === "magenta"
                        ? "border-fuchsia-400/50 bg-fuchsia-500/20 text-fuchsia-100 shadow-[0_0_30px_-8px_rgba(217,70,239,0.7)]"
                        : "border-sky-400/50 bg-sky-500/20 text-sky-100 shadow-[0_0_30px_-8px_rgba(59,130,246,0.7)]"
                      : "border-border bg-card/40 text-muted-foreground hover:text-foreground"
                  )}
                >
                  <TabIcon className="h-4 w-4" />
                  <span className="hidden sm:inline">{t.label}</span>
                  <span className="sm:hidden">
                    {t.label.split(" ")[0]}
                  </span>
                </button>
              );
            })}
          </div>
        </Reveal>

        {/* Tab panels */}
        <div className="mt-8">
          <AnimatePresence mode="wait">
            {active === "evaluation" && (
              <motion.div
                key="evaluation"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.3 }}
              >
                <EvaluationPanel />
              </motion.div>
            )}
            {active === "annotation" && (
              <motion.div
                key="annotation"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.3 }}
              >
                <AnnotationPanel />
              </motion.div>
            )}
            {active === "rubric" && (
              <motion.div
                key="rubric"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.3 }}
              >
                <RubricPanel />
              </motion.div>
            )}
            {active === "hallucination" && (
              <motion.div
                key="hallucination"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.3 }}
              >
                <HallucinationPanel />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </Section>
  );
}

/* ---------- Workflow steps renderer ---------- */
function WorkflowSteps({ steps }: { steps: { step: string; body: string }[] }) {
  return (
    <ol className="relative space-y-4 border-l border-violet-400/20 pl-6">
      {steps.map((s, i) => (
        <li key={i} className="relative">
          <span className="absolute -left-[1.65rem] grid h-6 w-6 place-items-center rounded-full border border-violet-400/40 bg-background text-[10px] font-bold text-violet-200">
            {i + 1}
          </span>
          <p className="font-medium text-foreground">{s.step}</p>
          <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{s.body}</p>
        </li>
      ))}
    </ol>
  );
}

function EvaluationPanel() {
  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      <div className="space-y-6">
        <div className="rounded-2xl border border-border bg-card/50 p-6">
          <h4 className="font-display text-base font-semibold text-foreground">
            What multimodal prompt engineering means to me
          </h4>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            {aiEvaluation.whatItMeans}
          </p>
        </div>
        <div className="rounded-2xl border border-violet-400/20 bg-violet-500/5 p-6">
          <h4 className="mb-4 font-display text-base font-semibold text-foreground">
            My multimodal workflow
          </h4>
          <WorkflowSteps steps={aiEvaluation.workflow} />
        </div>
      </div>
      <div className="space-y-6">
        <div className="rounded-2xl border border-border bg-card/50 p-6">
          <h4 className="mb-4 font-display text-base font-semibold text-foreground">
            What I look for in generated outputs
          </h4>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {aiEvaluation.lookFor.map((item) => (
              <div
                key={item.label}
                className="rounded-xl border border-border/60 bg-background/40 p-3"
              >
                <p className="flex items-center gap-2 text-sm font-medium text-violet-200">
                  <CheckCircle2 className="h-3.5 w-3.5 shrink-0" />
                  {item.label}
                </p>
                <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-2xl border border-fuchsia-400/20 bg-fuchsia-500/5 p-6">
          <h4 className="font-display text-base font-semibold text-foreground">
            Professional value
          </h4>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            {aiEvaluation.professionalValue}
          </p>
        </div>
        <div className="rounded-2xl border border-sky-400/20 bg-sky-500/5 p-6">
          <h4 className="font-display text-base font-semibold text-foreground">
            Related experience
          </h4>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            {aiEvaluation.relatedExperience}
          </p>
        </div>
      </div>
    </div>
  );
}

function AnnotationPanel() {
  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      <div className="rounded-2xl border border-sky-400/20 bg-sky-500/5 p-6">
        <h4 className="font-display text-base font-semibold text-foreground">
          Why text-to-image identity matters
        </h4>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          {dataAnnotation.whyItMatters}
        </p>
        <h4 className="mt-6 mb-4 font-display text-base font-semibold text-foreground">
          My text-to-image approach
        </h4>
        <ol className="space-y-2.5">
          {dataAnnotation.approach.map((s, i) => (
            <li key={i} className="flex gap-3 text-sm leading-relaxed text-muted-foreground">
              <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full border border-sky-400/40 bg-background text-[10px] font-bold text-sky-200">
                {i + 1}
              </span>
              {s}
            </li>
          ))}
        </ol>
      </div>
      <div className="rounded-2xl border border-border bg-card/50 p-6">
        <h4 className="mb-4 font-display text-base font-semibold text-foreground">
          Text-to-image principles
        </h4>
        <div className="space-y-3">
          {dataAnnotation.principles.map((p) => (
            <div key={p.label} className="rounded-xl border border-border/60 bg-background/40 p-3">
              <p className="text-sm font-medium text-sky-200">{p.label}</p>
              <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{p.body}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function RubricPanel() {
  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      <div className="rounded-2xl border border-fuchsia-400/20 bg-fuchsia-500/5 p-6">
        <h4 className="font-display text-base font-semibold text-foreground">
          Why image-to-video matters
        </h4>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          {rubricEvaluation.intro}
        </p>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          Image-to-video is where motion is born — and where character identity, environment and continuity are most at risk. A weak motion output can break an otherwise strong visual production, so motion generation is treated as a serious production stage with its own review checkpoint.
        </p>
      </div>
      <div className="rounded-2xl border border-border bg-card/50 p-6">
        <h4 className="mb-4 font-display text-base font-semibold text-foreground">
          My image-to-video methods
        </h4>
        <div className="space-y-3">
          {rubricEvaluation.methods.map((m) => (
            <div key={m.label} className="rounded-xl border border-border/60 bg-background/40 p-4">
              <p className="flex items-center gap-2 text-sm font-semibold text-fuchsia-200">
                <ListChecks className="h-4 w-4 shrink-0" />
                {m.label}
              </p>
              <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">{m.body}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function HallucinationPanel() {
  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      <div className="space-y-6">
        <div className="rounded-2xl border border-violet-400/20 bg-violet-500/5 p-6">
          <h4 className="font-display text-base font-semibold text-foreground">
            Why voice production matters
          </h4>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            {hallucinationDetection.whyDangerous}
          </p>
        </div>
        <div className="rounded-2xl border border-border bg-card/50 p-6">
          <h4 className="mb-4 font-display text-base font-semibold text-foreground">
            My voice production & sequencing process
          </h4>
          <ol className="space-y-2.5">
            {hallucinationDetection.process.map((s, i) => (
              <li key={i} className="flex gap-3 text-sm leading-relaxed text-muted-foreground">
                <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full border border-violet-400/40 bg-background text-[10px] font-bold text-violet-200">
                  {i + 1}
                </span>
                {s}
              </li>
            ))}
          </ol>
        </div>
      </div>
      <div className="rounded-2xl border border-border bg-card/50 p-6">
        <h4 className="mb-4 font-display text-base font-semibold text-foreground">
          Techniques I apply
        </h4>
        <div className="space-y-3">
          {hallucinationDetection.techniques.map((t) => (
            <div key={t.label} className="rounded-xl border border-border/60 bg-background/40 p-4">
              <p className="flex items-center gap-2 text-sm font-medium text-violet-200">
                <ShieldAlert className="h-4 w-4 shrink-0" />
                {t.label}
              </p>
              <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{t.body}</p>
            </div>
          ))}
        </div>
        <div className="mt-5 rounded-xl border border-fuchsia-400/20 bg-fuchsia-500/5 p-4">
          <p className="text-sm leading-relaxed text-muted-foreground">
            <span className="font-semibold text-fuchsia-200">Value for long-form AI content: </span>
            Voice production and sequencing close the loop on AI-assisted film. A weak voice, mistimed line or disconnected audio track can break an otherwise strong visual production. My approach treats voice, sequencing and final review as a serious production stage — not an afterthought.
          </p>
        </div>
      </div>
    </div>
  );
}
