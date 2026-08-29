import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";

function forbidden() {
  return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
}

/** PATCH /api/admin/assistants/[id] — update an assistant. */
export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return forbidden();

    const { id } = await params;
    const body = await req.json().catch(() => null);
    if (!body || typeof body !== "object") {
      return NextResponse.json({ error: "Invalid body." }, { status: 400 });
    }

    // If marking as primary, unmark others first.
    if (body.isPrimary === true) {
      await db.assistant.updateMany({ where: { isPrimary: true }, data: { isPrimary: false } });
    }

    const data: Record<string, unknown> = {};
    const strFields = ["name", "email", "phoneNumber", "whatsappLink", "role", "notes"];
    for (const k of strFields) {
      if (k in body) {
        const v = typeof body[k] === "string" ? body[k].trim() : body[k];
        data[k] = v === "" ? null : v;
      }
    }
    for (const k of ["active", "available", "isPrimary"]) {
      if (k in body) data[k] = !!body[k];
    }
    if ("permissions" in body) data.permissions = body.permissions ? JSON.stringify(body.permissions) : null;
    if ("notifyPref" in body) data.notifyPref = body.notifyPref ? JSON.stringify(body.notifyPref) : null;

    if (Object.keys(data).length === 0) {
      return NextResponse.json({ error: "No updatable fields." }, { status: 400 });
    }

    const updated = await db.assistant.update({ where: { id }, data });
    return NextResponse.json({ success: true, assistant: updated });
  } catch (err) {
    console.error("[admin/assistants/[id]] PATCH error:", err);
    return NextResponse.json({ error: "Failed to update assistant." }, { status: 500 });
  }
}

/** DELETE /api/admin/assistants/[id] — remove an assistant. */
export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return forbidden();

    const { id } = await params;
    await db.assistant.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[admin/assistants/[id]] DELETE error:", err);
    return NextResponse.json({ error: "Failed to delete assistant." }, { status: 500 });
  }
}
