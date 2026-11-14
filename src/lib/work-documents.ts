/**
 * Shared read-only document model for the portfolio.
 *
 * The website presents professional evidence (case studies, guides and the
 * CV) as optimized, lazily loaded page images inside the site's document
 * reader. Original source PDFs are NOT published: they are converted to
 * page images during development and only the images ship in `public/`.
 *
 * PUNCTUATION: website-authored text in this file must not contain em
 * dashes (U+2014). scripts/check-punctuation.py enforces this at build
 * time; use commas, colons, semicolons or parentheses instead.
 */

export type WorkDocument = {
  /** Button label shown in the project detail, e.g. "View Technical Case Study". */
  actionLabel: string;
  /** Title shown in the reader header. */
  title: string;
  /** Optional subtitle shown in the reader header. */
  subtitle?: string;
  /**
   * Logical public directory (root-relative) that contains the page images
   * p-01.jpg, p-02.jpg, ... p-NN.jpg. Wrapped with assetPath() at render
   * time.
   */
  pagesDir: string;
  /** Number of page images in pagesDir. */
  pageCount: number;
};

/** Returns the logical path of page `n` (1-based) for a document. */
export function documentPageSrc(doc: Pick<WorkDocument, "pagesDir">, n: number): string {
  return `${doc.pagesDir}/p-${String(n).padStart(2, "0")}.jpg`;
}

/**
 * Public CV document: the updated professional CV shipped with the
 * portfolio, rendered as read-only page images. Used by the "View My CV"
 * interactions (hero + contact). In full-stack mode an admin-uploaded CV
 * path (profile.cvPath) can override it; in that case the reader falls
 * back to a sandboxed embed of the uploaded file.
 */
export const PUBLIC_CV_DOC: WorkDocument = {
  actionLabel: "View My CV",
  title: "Vincent Chimaobi Obasiochie: Professional CV",
  subtitle: "Read online · Multimodal Prompt Engineer · AI Video Producer · Video Annotation Specialist",
  pagesDir: "/documents/cv/pages",
  pageCount: 4,
};
