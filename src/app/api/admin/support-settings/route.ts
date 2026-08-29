import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";

function forbidden() {
  return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
}

/** GET /api/admin/support-settings — admin only. */
export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return forbidden();

    let s = await db.supportSetting.findUnique({ where: { id: "1" } });
    if (!s) {
      s = await db.supportSetting.create({
        data: {
          id: "1",
          ownerDisplayName: "Mr. Vincent CEO",
          ownerEmail: process.env.CONTACT_NOTIFICATION_EMAIL ?? "vincentchimaobi.ai@gmail.com",
          ownerWhatsapp: "https://wa.me/message/BS2I4XH5NM3CH1",
          notifyOwnerAlways: true,
          welcomeMessage:
            "Hi, welcome. You can choose a quick question below or speak with a human representative.",
        },
      });
    }
    return NextResponse.json({ settings: s });
  } catch (err) {
    console.error("[admin/support-settings] GET error:", err);
    return NextResponse.json({ error: "Failed to load support settings." }, { status: 500 });
  }
}

/** PUT /api/admin/support-settings — admin only. */
export async function PUT(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return forbidden();

    const body = await req.json().catch(() => null);
    if (!body || typeof body !== "object") {
      return NextResponse.json({ error: "Invalid body." }, { status: 400 });
    }

    const data: Record<string, unknown> = {};
    for (const k of ["ownerDisplayName", "ownerEmail", "ownerWhatsapp", "welcomeMessage"]) {
      if (k in body) data[k] = typeof body[k] === "string" ? body[k] : null;
    }
    if ("notifyOwnerAlways" in body) data.notifyOwnerAlways = !!body.notifyOwnerAlways;

    const updated = await db.supportSetting.upsert({
      where: { id: "1" },
      update: data,
      create: {
        id: "1",
        ownerDisplayName: (data.ownerDisplayName as string) ?? "Mr. Vincent CEO",
        ownerEmail: (data.ownerEmail as string) ?? "vincentchimaobi.ai@gmail.com",
        ownerWhatsapp: (data.ownerWhatsapp as string) ?? "https://wa.me/message/BS2I4XH5NM3CH1",
        notifyOwnerAlways: data.notifyOwnerAlways ?? true,
        welcomeMessage: (data.welcomeMessage as string) ?? null,
      },
    });
    return NextResponse.json({ success: true, settings: updated });
  } catch (err) {
    console.error("[admin/support-settings] PUT error:", err);
    return NextResponse.json({ error: "Failed to update support settings." }, { status: 500 });
  }
}
