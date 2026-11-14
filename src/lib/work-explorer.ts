/**
 * Selected Work nested explorer: hierarchy registry.
 *
 * Implements the data-driven relationship
 *   parent work card > subcategory (optional) > project > project evidence
 * for the Selected Work section. The top-level cards come from
 * portfolio-data.ts (or the admin DB in full-stack mode); this registry
 * maps each parent card (by slugified title) to its nested content.
 *
 * The labels here are semantic destinations INSIDE the Selected Work
 * experience: no standalone page sections are created for them.
 *
 * ADDING FUTURE WORK:
 *   - More police/dashcam productions: add media + one entry in
 *     src/lib/police-reconstructions.ts. They appear inside the Police
 *     Bodycam & Dashcam subcategory automatically.
 *   - More CCTV reconstructions: add media + one entry in
 *     src/lib/true-crime-reconstructions.ts.
 *   - More 3D documentaries: add media + one entry in
 *     src/lib/documentary-productions.ts.
 *   - More CVAT practices: add media + one entry in
 *     src/lib/cvat-practice.ts.
 *   - Robotics annotation evidence (Turing work): when approved artifacts
 *     exist, register a node for the "Robot-Arm Video Annotation (Turing)"
 *     card here with its evidence tabs. Until then the card keeps its
 *     professional summary and opens nothing.
 *
 * PUNCTUATION: no em dashes (U+2014) in authored text;
 * scripts/check-punctuation.py enforces this at build time.
 */

import {
  policeCategory,
  policeReconstructions,
  type PoliceProduction,
} from "./police-reconstructions";
import {
  trueCrimeCategory,
  trueCrimeProductions,
  type TrueCrimeProduction,
} from "./true-crime-reconstructions";
import {
  documentaryCategory,
  documentaryProductions,
  type DocumentaryProject,
} from "./documentary-productions";
import {
  cvatImageAnnotationCategory,
  cvatVideoTrackingCategory,
  cvatVideoTrackingPractices,
  type CvatPracticeProject,
} from "./cvat-practice";
import type { WorkDocument } from "./work-documents";

/* ------------------------------------------------------------------ */
/* Unified project model used by the explorer UI                       */
/* ------------------------------------------------------------------ */

export type ExplorerMediaKind =
  | "carousel"
  | "single-video"
  | "gallery";

export type WorkProject = {
  id: string;
  title: string;
  category: string;
  status: string;
  summary: string;
  tags: string[];
  cover: string;
  accent: "violet" | "magenta" | "blue";
  icon: string;
  /** How the primary media block renders. */
  mediaKind: ExplorerMediaKind;
  /** Carousel clips (mediaKind === "carousel"). */
  clips?: { src: string; title: string }[];
  /** Single connected video (mediaKind === "single-video"). */
  video?: { src: string; title: string };
  /** Evidence image gallery (mediaKind === "gallery"). */
  gallery?: { src: string; caption: string; kind: "screenshot" | "diagram" }[];
  /** Stage aspect ratio class for the video stage. */
  aspectClass: string;
  /** Read-only documents (case studies, guides). */
  documents: WorkDocument[];
  /** Optional external streaming link (e.g. full documentary). */
  externalLink?: { label: string; url: string };
  /** Optional case-context note separating documented record from reconstruction. */
  documentedNote?: string;
  /** Short disclosure line (e.g. AI-generated reconstruction notice). */
  disclosure?: string;
  /** Enables the "Inspect Annotation Structure" evidence button. */
  hasAnnotationStructure?: boolean;
};

export type WorkSubcategory = {
  id: string;
  label: string;
  description: string;
  projects: WorkProject[];
  /**
   * When a subcategory has no approved project artifacts yet, this note is
   * shown instead of empty placeholder cards.
   */
  pendingNote?: string;
};

export type WorkCategoryNode = {
  /** Slug of the parent work card this node hangs from. */
  cardSlug: string;
  /** Parent category title (mirrors the card). */
  title: string;
  /** Short intro shown when the parent is opened. */
  intro: string;
  /** Subcategory chooser (level 2) when present, otherwise direct projects. */
  subcategories?: WorkSubcategory[];
  /** Direct project list when the parent has no subcategory level. */
  projects?: WorkProject[];
};

/* ------------------------------------------------------------------ */
/* Mappers from the existing production registries                    */
/* ------------------------------------------------------------------ */

function fromPolice(p: PoliceProduction): WorkProject {
  return {
    id: p.id,
    title: p.title,
    category: p.category,
    status: p.status,
    summary: p.summary,
    tags: p.tags,
    cover: p.cover,
    accent: p.accent,
    icon: p.icon,
    mediaKind: "carousel",
    clips: p.clips,
    aspectClass: "aspect-[47/26]",
    documents: p.caseStudy ? [p.caseStudy] : [],
    disclosure:
      "These clips are AI-generated reconstructions, not authentic police recordings.",
  };
}

function fromTrueCrime(p: TrueCrimeProduction): WorkProject {
  return {
    id: p.id,
    title: p.title,
    category: p.category,
    status: p.status,
    summary: p.summary,
    tags: p.tags,
    cover: p.cover,
    accent: p.accent,
    icon: p.icon,
    mediaKind: "single-video",
    video: p.video,
    aspectClass: "aspect-video",
    documents: p.caseStudy ? [p.caseStudy] : [],
    documentedNote: p.documentedNote,
    disclosure: trueCrimeCategory.disclosure,
  };
}

function fromDocumentary(p: DocumentaryProject): WorkProject {
  return {
    id: p.id,
    title: p.title,
    category: p.category,
    status: p.status,
    summary: p.summary,
    tags: p.tags,
    cover: p.cover,
    accent: p.accent,
    icon: p.icon,
    mediaKind: "carousel",
    clips: p.clips,
    aspectClass: "aspect-video",
    documents: p.caseStudy ? [p.caseStudy] : [],
    externalLink: p.externalLink,
    documentedNote: p.documentedNote,
    disclosure: p.disclosure,
  };
}

function fromCvatPractice(p: CvatPracticeProject): WorkProject {
  return {
    id: p.id,
    title: p.title,
    category: p.category,
    status: p.status,
    summary: p.summary,
    tags: p.tags,
    cover: p.cover,
    accent: p.accent,
    icon: p.icon,
    mediaKind: "gallery",
    gallery: p.gallery,
    aspectClass: "aspect-video",
    documents: p.documents,
    disclosure: p.disclosure,
    hasAnnotationStructure: p.hasAnnotationStructure,
  };
}

/* ------------------------------------------------------------------ */
/* Registry                                                            */
/* ------------------------------------------------------------------ */

export const workExplorer: Record<string, WorkCategoryNode> = {
  "ai-true-crime-reconstruction-production": {
    cardSlug: "ai-true-crime-reconstruction-production",
    title: "AI True-Crime Reconstruction Production",
    intro: trueCrimeCategory.intro,
    subcategories: [
      {
        id: "police-bodycam-dashcam",
        label: "Police Bodycam & Dashcam Reconstructions",
        description: policeCategory.intro,
        projects: policeReconstructions.map(fromPolice),
      },
      {
        id: "cctv-reconstructions",
        label: "CCTV Reconstructions",
        description:
          "Stationary-camera reconstructions of documented encounters, built from case records because no original surveillance footage is available to the production. Framing, image response and human movement are composed to stay plausible for the recorded viewpoint while never being presented as original CCTV evidence.",
        projects: trueCrimeProductions.map(fromTrueCrime),
      },
    ],
  },
  "ai-3d-documentary-video-production": {
    cardSlug: "ai-3d-documentary-video-production",
    title: "AI 3D Documentary Video Production",
    intro: documentaryCategory.intro,
    projects: documentaryProductions.map(fromDocumentary),
  },
  "cvat-image-annotation-video-tracking-practice": {
    cardSlug: "cvat-image-annotation-video-tracking-practice",
    title: "CVAT Image Annotation & Video Tracking Practice",
    intro:
      "Structured, project-based annotation practice following the CVAT Academy curriculum, organized into image exercises and video tracking practices. Each practice publishes only the evidence its files actually support.",
    subcategories: [
      {
        id: "image-annotation",
        label: cvatImageAnnotationCategory.label,
        description: cvatImageAnnotationCategory.intro,
        projects: [],
        pendingNote: cvatImageAnnotationCategory.pendingNote,
      },
      {
        id: "video-tracking",
        label: cvatVideoTrackingCategory.label,
        description: cvatVideoTrackingCategory.intro,
        projects: cvatVideoTrackingPractices.map(fromCvatPractice),
      },
    ],
  },
};

/** Same slugify algorithm as src/lib/content.ts (keep the two in sync). */
function slugify(s: string) {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

/**
 * Resolves the nested explorer node for a top-level work card by its
 * title (works for both the static fallback data and admin DB rows).
 * Returns undefined for cards without nested content.
 */
export function findWorkNode(projectTitle: string): WorkCategoryNode | undefined {
  return workExplorer[slugify(projectTitle)];
}

/** Short count chips shown on a parent card's explore affordance. */
export function summarizeNode(node: WorkCategoryNode): string[] {
  if (node.subcategories) {
    const total = node.subcategories.reduce((n, s) => n + s.projects.length, 0);
    return [
      `${node.subcategories.length} ${
        node.subcategories.length === 1 ? "category" : "categories"
      }`,
      `${total} ${total === 1 ? "production" : "productions"}`,
    ];
  }
  const n = node.projects?.length ?? 0;
  return [`${n} ${n === 1 ? "project" : "projects"}`];
}
