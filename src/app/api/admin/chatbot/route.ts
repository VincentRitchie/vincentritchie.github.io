import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";

function forbidden() {
  return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
}

/** GET /api/admin/chatbot — list all FAQs (admin only). */
export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return forbidden();
    const faqs = await db.chatbotFAQ.findMany({
      orderBy: [{ order: "asc" }, { createdAt: "asc" }],
    });
    return NextResponse.json({ faqs });
  } catch (err) {
    console.error("[admin/chatbot] GET error:", err);
    return NextResponse.json({ error: "Failed to load FAQs." }, { status: 500 });
  }
}

/** POST /api/admin/chatbot — create an FAQ (admin only). */
export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return forbidden();

    const body = await req.json().catch(() => null);
    if (!body || typeof body !== "object") {
      return NextResponse.json({ error: "Invalid body." }, { status: 400 });
    }
    const question = typeof body.question === "string" ? body.question.trim() : "";
    const answer = typeof body.answer === "string" ? body.answer.trim() : "";
    if (!question || !answer) {
      return NextResponse.json({ error: "Question and answer are required." }, { status: 400 });
    }

    const created = await db.chatbotFAQ.create({
      data: {
        question,
        answer,
        keywords: typeof body.keywords === "string" ? body.keywords : null,
        category: typeof body.category === "string" ? body.category : null,
        order: typeof body.order === "number" ? body.order : 0,
        visible: body.visible !== false,
      },
    });
    return NextResponse.json({ success: true, faq: created }, { status: 201 });
  } catch (err) {
    console.error("[admin/chatbot] POST error:", err);
    return NextResponse.json({ error: "Failed to create FAQ." }, { status: 500 });
  }
}
