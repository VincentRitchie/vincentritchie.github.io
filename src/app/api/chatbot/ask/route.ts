import { NextRequest, NextResponse } from "next/server";
import { matchFaq } from "@/lib/faq";
import { getClientIP, rateLimitCheck } from "@/lib/spam";

/**
 * POST /api/chatbot/ask — public.
 * Body: { question: string }
 * Returns the best FAQ match or a "no match" signal so the chatbot can offer
 * human support. Unknown questions are logged for admin review (rate-limited).
 */
export async function POST(req: NextRequest) {
  try {
    const ip = getClientIP(req);
    const rl = rateLimitCheck(`chatbot:${ip}`);
    if (!rl.ok) {
      return NextResponse.json(
        { matched: false, message: "Too many requests. Please slow down." },
        { status: 429 }
      );
    }

    const body = await req.json().catch(() => null);
    const question = typeof body?.question === "string" ? body.question.trim() : "";
    if (question.length < 3 || question.length > 500) {
      return NextResponse.json(
        { matched: false, message: "Please enter a question between 3 and 500 characters." },
        { status: 400 }
      );
    }

    const match = await matchFaq(question, true, ip);
    if (!match) {
      return NextResponse.json({
        matched: false,
        message:
          "I couldn't find a quick answer for that. Would you like to continue with an Assistant or contact Mr. Vincent directly?",
        offerHuman: true,
      });
    }

    return NextResponse.json({
      matched: true,
      faqId: match.id,
      question: match.question,
      answer: match.answer,
      category: match.category,
      askHelpful: true,
    });
  } catch (err) {
    console.error("[chatbot/ask] POST error:", err);
    return NextResponse.json(
      { matched: false, message: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
