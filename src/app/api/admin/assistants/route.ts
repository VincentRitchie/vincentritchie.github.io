import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";

function forbidden() {
  return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
}

/** GET /api/admin/assistants — list all assistants (admin only). */
export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return forbidden();

    const assistants = await db.assistant.findMany({
      orderBy: [{ isPrimary: "desc" }, { createdAt: "asc" }],
    });
    return NextResponse.json({ assistants });
  } catch (err) {
    console.error("[admin/assistants] GET error:", err);
    return NextResponse.json({ error: "Failed to load assistants." }, { status: 500 });
  }
}

/** POST /api/admin/assistants — create a new assistant (admin only). */
export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return forbidden();

    const body = await req.json().catch(() => null);
    if (!body || typeof body !== "object") {
      return NextResponse.json({ error: "Invalid body." }, { status: 400 });
    }

    const name = typeof body.name === "string" ? body.name.trim() : "";
    if (!name || name.length < 2) {
      return NextResponse.json({ error: "Please provide an assistant name." }, { status: 400 });
    }

    // If this assistant is being marked primary, unmark others first.
    if (body.isPrimary === true) {
      await db.assistant.updateMany({ where: { isPrimary: true }, data: { isPrimary: false } });
    }

    const created = await db.assistant.create({
      data: {
        name,
        email: typeof body.email === "string" && body.email.trim() ? body.email.trim() : null,
        phoneNumber: typeof body.phoneNumber === "string" && body.phoneNumber.trim() ? body.phoneNumber.trim() : null,
        whatsappLink: typeof body.whatsappLink === "string" && body.whatsappLink.trim() ? body.whatsappLink.trim() : null,
        role: typeof body.role === "string" && body.role.trim() ? body.role.trim() : null,
        active: body.active !== false,
        available: body.available !== false,
        isPrimary: body.isPrimary === true,
        permissions: body.permissions ? JSON.stringify(body.permissions) : JSON.stringify({ canReceiveInquiries: true, canManageInquiries: false }),
        notifyPref: body.notifyPref ? JSON.stringify(body.notifyPref) : JSON.stringify({ email: true }),
        notes: typeof body.notes === "string" ? body.notes.trim() : null,
      },
    });

    return NextResponse.json({ success: true, assistant: created }, { status: 201 });
  } catch (err) {
    console.error("[admin/assistants] POST error:", err);
    return NextResponse.json({ error: "Failed to create assistant." }, { status: 500 });
  }
}
