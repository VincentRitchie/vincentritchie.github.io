import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";

/**
 * /api/support/[id] — admin only.
 *  PATCH: update status / isRead / assignedToType / assistantId / priority / escalatedToOwner
 *  DELETE: delete the inquiry
 */

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
    const allowed = ["status", "isRead", "assignedToType", "assistantId", "priority", "escalatedToOwner"];
    for (const k of allowed) {
      if (k in body) data[k] = body[k];
    }
    if ("assistantId" in data && (data.assistantId === "" || data.assistantId == null)) {
      data.assistantId = null;
    }
    if (data.assignedToType === "owner") {
      data.assistantId = null;
      data.escalatedToOwner = true;
    }

    if (Object.keys(data).length === 0) {
      return NextResponse.json({ error: "No updatable fields provided." }, { status: 400 });
    }

    const updated = await db.supportInquiry.update({ where: { id }, data });
    return NextResponse.json({ success: true, inquiry: updated });
  } catch (err) {
    console.error("[support/[id]] PATCH error:", err);
    return NextResponse.json({ error: "Failed to update inquiry." }, { status: 500 });
  }
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return forbidden();

    const { id } = await params;
    await db.supportInquiry.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[support/[id]] DELETE error:", err);
    return NextResponse.json({ error: "Failed to delete inquiry." }, { status: 500 });
  }
}
