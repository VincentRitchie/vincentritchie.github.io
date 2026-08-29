import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";

function forbidden() {
  return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
}

/** GET /api/admin/unknown-questions — list unanswered chatbot questions (admin only). */
export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return forbidden();

    const questions = await db.chatbotUnknownQuestion.findMany({
      orderBy: { createdAt: "desc" },
      take: 100,
    });
    return NextResponse.json({ questions });
  } catch (err) {
    console.error("[admin/unknown-questions] GET error:", err);
    return NextResponse.json({ error: "Failed to load questions." }, { status: 500 });
  }
}

/** DELETE /api/admin/unknown-questions?id=... — delete one, or all if no id. */
export async function DELETE(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return forbidden();

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (id) {
      await db.chatbotUnknownQuestion.delete({ where: { id } });
    } else {
      await db.chatbotUnknownQuestion.deleteMany({});
    }
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[admin/unknown-questions] DELETE error:", err);
    return NextResponse.json({ error: "Failed to delete." }, { status: 500 });
  }
}
