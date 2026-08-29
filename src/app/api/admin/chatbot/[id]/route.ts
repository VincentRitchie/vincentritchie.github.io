import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";

function forbidden() {
  return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return forbidden();

    const { id } = await params;
    const body = await req.json().catch(() => null);
    if (!body || typeof body !== "object") {
      return NextResponse.json({ error: "Invalid body." }, { status: 400 });
    }

    const data: Record<string, unknown> = {};
    for (const k of ["question", "answer", "keywords", "category"]) {
      if (k in body) data[k] = typeof body[k] === "string" ? body[k] : null;
    }
    if ("order" in body) data.order = typeof body.order === "number" ? body.order : 0;
    if ("visible" in body) data.visible = !!body.visible;

    if (Object.keys(data).length === 0) {
      return NextResponse.json({ error: "No updatable fields." }, { status: 400 });
    }

    const updated = await db.chatbotFAQ.update({ where: { id }, data });
    return NextResponse.json({ success: true, faq: updated });
  } catch (err) {
    console.error("[admin/chatbot/[id]] PATCH error:", err);
    return NextResponse.json({ error: "Failed to update FAQ." }, { status: 500 });
  }
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return forbidden();

    const { id } = await params;
    await db.chatbotFAQ.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[admin/chatbot/[id]] DELETE error:", err);
    return NextResponse.json({ error: "Failed to delete FAQ." }, { status: 500 });
  }
}
