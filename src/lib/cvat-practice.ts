/**
 * CVAT Image Annotation & Video Tracking Practice: project registry.
 *
 * Data-driven source of truth for individual CVAT practice projects opened
 * from the "CVAT Image Annotation & Video Tracking Practice" parent work
 * card inside Selected Work. The parent offers two subcategories: Image
 * Annotation and Video Tracking. This file holds the verified Video
 * Tracking practices; the Image Annotation subcategory currently presents
 * the existing curriculum summary without invented project artifacts until
 * approved evidence is supplied.
 *
 * BATCH GUIDE (future updates):
 *   1. Drop the new practice's media into
 *      public/portfolio/cvat/<practice-slug>/ following the same layout:
 *      cover.jpg, evidence/*.jpg, case-study/p-01.jpg..p-NN.jpg (page
 *      images generated from private source PDFs during development; the
 *      PDFs, DOCX sources and raw XML exports are never published).
 *   2. Add one entry to `cvatVideoTrackingPractices` (or the future image
 *      annotation registry once approved artifacts exist).
 *
 * EDITORIAL RULES:
 *   - Show only evidence types supported by the practice's actual files.
 *   - Never relabel the CVAT XML export as a JSON schema.
 *   - Never describe the export as an error-free, validated dataset.
 *   - PUNCTUATION: no em dashes (U+2014) in authored text;
 *     scripts/check-punctuation.py enforces this at build time.
 */

import type { WorkDocument } from "./work-documents";

export type CvatEvidenceImage = {
  /** Logical public path of the evidence image. */
  src: string;
  /** Caption shown under the image in the evidence gallery. */
  caption: string;
  /** Honest classification of what the image is. */
  kind: "screenshot" | "diagram";
};

export type CvatPracticeProject = {
  id: string;
  title: string;
  /** Short category line shown above the title on cards. */
  category: string;
  status: string;
  /** Concise professional description (60-100 words). */
  summary: string;
  /** Technical capability tags. */
  tags: string[];
  /** Project cover image (logical public path). */
  cover: string;
  /** Small evidence gallery of genuine case-study visuals. */
  gallery: CvatEvidenceImage[];
  /** Read-only documents opened from project-level buttons. */
  documents: WorkDocument[];
  /** Enables the "Inspect Annotation Structure" project-level button. */
  hasAnnotationStructure: boolean;
  /** Short disclosure line shown in the project detail. */
  disclosure: string;
  accent: "violet" | "magenta" | "blue";
  icon: string;
};

/** Copy for the Video Tracking subcategory inside the CVAT parent card. */
export const cvatVideoTrackingCategory = {
  label: "Video Tracking",
  intro:
    "Individual video-track annotation practices: persistent object identity, keyframe interpolation, occlusion handling and attribute review across moving footage. Each practice publishes only the evidence its files actually support.",
};

export const cvatVideoTrackingPractices: CvatPracticeProject[] = [
  {
    id: "cvat-packaging-robotic-arm",
    title: "CVAT Robotic Manipulation | Packaging and Pick-and-Place Annotation",
    category: "CVAT Video Tracking · Robotic Manipulation",
    status: "Independent Practice",
    summary:
      "Self-directed CVAT video annotation practice on a 24-second, 576-frame synthetic packaging sequence at 24 FPS, exported as CVAT for video 1.1 XML. The schema separates robot arm, gripper, identified workpieces, background inventory, conveyor and shipping carton, with temporal attributes tracking motion phase, grip state, part identity, location, grasp attempts and placement evidence. Nine tracks carry 3,034 box records, including interpolated states between 284 manually placed keyframes. Known QA items remain, including an overlapping workpiece identity and a configured robot_arm class without an exported track, so the export is a practice dataset rather than a validated deliverable.",
    tags: [
      "Temporal tracking",
      "Object identity",
      "Keyframe interpolation",
      "Occlusion handling",
      "Track attributes",
      "Annotation QA",
    ],
    cover: "/portfolio/cvat/packaging-robotic-arm/cover.jpg",
    gallery: [
      {
        src: "/portfolio/cvat/packaging-robotic-arm/evidence/evidence-cvat-tracks.jpg",
        caption:
          "CVAT interface during the B02 operation: tracked classes, attribute panels and per-frame state review.",
        kind: "screenshot",
      },
      {
        src: "/portfolio/cvat/packaging-robotic-arm/evidence/evidence-cvat-carton.jpg",
        caption:
          "CVAT interface near the shipping carton: placement evidence and occlusion attributes in the objects panel.",
        kind: "screenshot",
      },
      {
        src: "/portfolio/cvat/packaging-robotic-arm/evidence/evidence-ontology-diagram.jpg",
        caption:
          "Label ontology decision diagram: robot arm, gripper and workpiece as distinct tracked entities.",
        kind: "diagram",
      },
    ],
    documents: [
      {
        actionLabel: "View Annotation Case Study",
        title: "CVAT Robotic Manipulation Annotation Case Study",
        subtitle: "Read online · Decision-focused pick-and-place annotation case study",
        pagesDir: "/portfolio/cvat/packaging-robotic-arm/case-study",
        pageCount: 12,
      },
      {
        actionLabel: "View Robot Anatomy Guide",
        title: "CVAT Industrial Robot Anatomy: Illustrated Field Guide",
        subtitle: "Read online · Illustrated annotation boundary reference",
        pagesDir: "/portfolio/cvat/packaging-robotic-arm/anatomy-guide",
        pageCount: 12,
      },
    ],
    hasAnnotationStructure: true,
    disclosure:
      "Self-directed practice on synthetic footage. The XML export is a practice dataset, not a validated training deliverable.",
    accent: "violet",
    icon: "Workflow",
  },
];

/**
 * Copy for the Image Annotation subcategory inside the CVAT parent card.
 *
 * There are no approved image-annotation project artifacts published yet,
 * so this subcategory presents the existing verified curriculum summary
 * without invented project cards. When approved artifacts exist, add a
 * `cvatImageAnnotationPractices` registry and the explorer renders real
 * project tiles in their place.
 */
export const cvatImageAnnotationCategory = {
  label: "Image Annotation",
  intro:
    "Image exercises from the CVAT Academy curriculum: multi-object image datasets, crowded urban intersections, roadside markets, pedestrians, vehicles and complex object interactions.",
  pendingNote:
    "The image-annotation practice covers bounding boxes, polygons, brush-based masks, polygon-to-mask selection and custom JSON label schemas, as summarized on the parent work card. Individual exercise records appear here once their supporting artifacts are approved for publication; no placeholder projects are shown in the meantime.",
};
