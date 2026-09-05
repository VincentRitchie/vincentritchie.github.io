"use client";

import { Reveal, Section, SectionHeading, GlowCard, accentMap } from "./shared";
import { education, languages } from "@/lib/portfolio-data";
import { GraduationCap, Globe, CheckCircle2 } from "lucide-react";

/**
 * Education & Languages section.
 *
 * Renders CV-aligned education and languages data. Returns null if both lists
 * are empty (so the public site stays clean if data is missing).
 */
export function EducationLanguages() {
  if (education.length === 0 && languages.length === 0) return null;

  return (
    <Section id="education-languages" className="border-t border-border/40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Education & Languages"
          title={
            <>
              Education &amp; <span className="text-gradient">languages</span>
            </>
          }
          intro="Academic background and languages that support my professional practice across multimodal prompt engineering, generative AI content and AI video production."
          accent="blue"
        />

        <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Education */}
          {education.length > 0 && (
            <Reveal>
              <div className="h-full rounded-2xl border border-sky-400/20 bg-sky-500/5 p-7">
                <div className="mb-4 flex items-center gap-3">
                  <div className="grid h-11 w-11 place-items-center rounded-xl border border-sky-400/30 bg-sky-500/15 text-sky-300">
                    <GraduationCap className="h-5 w-5" />
                  </div>
                  <h3 className="font-display text-lg font-semibold text-foreground">
                    Education
                  </h3>
                </div>
                <div className="space-y-3">
                  {education.map((e) => (
                    <div
                      key={e.id}
                      className="rounded-xl border border-border/60 bg-background/40 p-4"
                    >
                      <p className="text-sm font-semibold text-foreground">
                        {e.qualification}
                      </p>
                      <p className="mt-1 text-xs font-medium text-sky-200">
                        {e.institution}
                      </p>
                      <p className="mt-1 inline-flex items-center gap-1.5 text-[11px] text-muted-foreground">
                        <CheckCircle2 className="h-3 w-3" />
                        {e.period}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          )}

          {/* Languages */}
          {languages.length > 0 && (
            <Reveal delay={0.1}>
              <div className="h-full rounded-2xl border border-violet-400/20 bg-violet-500/5 p-7">
                <div className="mb-4 flex items-center gap-3">
                  <div className="grid h-11 w-11 place-items-center rounded-xl border border-violet-400/30 bg-violet-500/15 text-violet-300">
                    <Globe className="h-5 w-5" />
                  </div>
                  <h3 className="font-display text-lg font-semibold text-foreground">
                    Languages
                  </h3>
                </div>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {languages.map((l, i) => {
                    const accent = (["violet", "magenta", "blue"] as const)[i % 3];
                    const a = accentMap[accent];
                    return (
                      <div
                        key={l.id}
                        className={`rounded-xl border ${a.border} ${a.bg} p-4`}
                      >
                        <p className={`text-sm font-semibold ${a.text}`}>{l.name}</p>
                        <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                          {l.level}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </Reveal>
          )}
        </div>
      </div>
    </Section>
  );
}
