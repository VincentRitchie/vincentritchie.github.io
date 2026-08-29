import "server-only";
import { db } from "@/lib/db";

/**
 * Chatbot FAQ matching — server-side, no external LLM.
 *
 * Strategy:
 *  1. Normalize the visitor question (lowercase, strip punctuation, collapse spaces).
 *  2. Score every visible FAQ by keyword overlap + substring match.
 *  3. Return the best match if its score clears the threshold, else null
 *     (and log the unknown question for admin review).
 */

function normalize(s: string): string {
  return s
    .toLowerCase()
    .replace(/[^\w\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function tokenize(s: string): string[] {
  return normalize(s)
    .split(" ")
    .filter((t) => t.length > 2);
}

export interface FaqMatch {
  id: string;
  question: string;
  answer: string;
  category: string | null;
  score: number;
}

/**
 * Find the best FAQ match for a visitor question.
 * If `logUnknown` is true and no match is found, persist the question for admin review.
 */
export async function matchFaq(
  visitorQuestion: string,
  logUnknown = true,
  visitorIp?: string
): Promise<FaqMatch | null> {
  let faqs: Awaited<ReturnType<typeof db.chatbotFAQ.findMany>> = [];
  try {
    faqs = await db.chatbotFAQ.findMany({ where: { visible: true } });
  } catch (err) {
    console.error("[faq] load failed:", err);
    return null;
  }

  if (faqs.length === 0) return null;

  const q = normalize(visitorQuestion);
  const qTokens = new Set(tokenize(visitorQuestion));

  let best: FaqMatch | null = null;
  let bestScore = 0;

  for (const f of faqs) {
    const fQ = normalize(f.question);
    const keywords = (f.keywords ?? "")
      .split(",")
      .map((k) => k.trim())
      .filter(Boolean)
      .map(normalize);

    let score = 0;

    // Direct substring of the FAQ question
    if (q.includes(fQ) || fQ.includes(q)) score += 6;

    // Keyword hits
    for (const k of keywords) {
      if (!k) continue;
      if (q.includes(k)) score += 2;
      if (qTokens.has(k)) score += 1;
    }

    // Question-word overlap
    const fTokens = new Set(tokenize(f.question));
    let overlap = 0;
    for (const t of qTokens) {
      if (fTokens.has(t)) overlap += 1;
    }
    score += overlap * 0.5;

    if (score > bestScore) {
      bestScore = score;
      best = {
        id: f.id,
        question: f.question,
        answer: f.answer,
        category: f.category,
        score,
      };
    }
  }

  // Threshold: needs at least some signal to count as a match.
  if (best && bestScore >= 2) {
    return best;
  }

  // Log the unknown question for admin review (best-effort, never throws).
  if (logUnknown && visitorQuestion.trim().length >= 3) {
    try {
      await db.chatbotUnknownQuestion.create({
        data: { question: visitorQuestion.trim().slice(0, 500), visitorIp: visitorIp ?? null },
      });
    } catch (err) {
      console.error("[faq] log unknown failed:", err);
    }
  }

  return null;
}

/** Public-safe FAQ list for the chatbot suggestion chips (no admin-only data). */
export async function getPublicFaqs(limit = 8) {
  try {
    const faqs = await db.chatbotFAQ.findMany({
      where: { visible: true },
      orderBy: [{ order: "asc" }, { createdAt: "asc" }],
      take: limit,
      select: { id: true, question: true, category: true },
    });
    return faqs;
  } catch (err) {
    console.error("[faq] getPublicFaqs failed:", err);
    return [];
  }
}
