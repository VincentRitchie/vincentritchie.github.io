import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import {
  rateLimitCheck,
  honeypotFailed,
  sanitizeText,
  getClientIP,
} from "@/lib/spam";
import { decideRouting, visitorRoutingMessage } from "@/lib/support";
import { sendSupportNotification } from "@/lib/support-email";

/**
 * POST /api/support — public.
 * Chatbot escalation / support widget submission.
 * Validates + sanitizes, routes to assistant-or-owner, saves SupportInquiry,
 * sends best-effort email notifications.
 */
export async function POST(req: NextRequest) {
  try {
    const ip = getClientIP(req);
    const rl = rateLimitCheck(`support:${ip}`);
    if (!rl.ok) {
      return NextResponse.json(
        { error: "Too many submissions. Please try again later." },
        { status: 429 }
      );
    }

    const body = await req.json().catch(() => null);
    if (!body || typeof body !== "object") {
      return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
    }

    // Honeypot (hidden field named "website" must be empty)
    if (honeypotFailed(body.website)) {
      // Fake success to bots — do NOT save.
      return NextResponse.json(
        { success: true, message: "Your message has been received. The support team will review it and respond as soon as possible." },
        { status: 201 }
      );
    }

    const visitorName = sanitizeText(body.visitorName);
    const visitorEmail = typeof body.visitorEmail === "string" ? body.visitorEmail.trim().slice(0, 200) : null;
    const visitorPhone = typeof body.visitorPhone === "string" ? body.visitorPhone.trim().slice(0, 60) : null;
    const visitorMessage = sanitizeText(body.visitorMessage).slice(0, 2000);
    const preferredContact = typeof body.preferredContact === "string" ? body.preferredContact.trim() : null;
    const source = typeof body.source === "string" && body.source ? body.source : "chatbot";
    const requestedRecipient = typeof body.requestedRecipient === "string" ? body.requestedRecipient : null;
    const faqContext = typeof body.faqContext === "string" ? body.faqContext.slice(0, 200) : null;

    if (!visitorName || visitorName.length < 2) {
      return NextResponse.json({ error: "Please provide your name." }, { status: 400 });
    }
    if (!visitorMessage || visitorMessage.length < 5) {
      return NextResponse.json({ error: "Please provide a message." }, { status: 400 });
    }
    if (!visitorEmail && !visitorPhone) {
      return NextResponse.json(
        { error: "Please provide an email or phone/WhatsApp so we can respond." },
        { status: 400 }
      );
    }
    const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (visitorEmail && !EMAIL_RE.test(visitorEmail)) {
      return NextResponse.json({ error: "Please provide a valid email address." }, { status: 400 });
    }

    // Decide routing: assistant (if active+available) or owner (escalation).
    const routing = await decideRouting(requestedRecipient);

    const inquiry = await db.supportInquiry.create({
      data: {
        visitorName,
        visitorEmail,
        visitorPhone,
        visitorMessage,
        preferredContact,
        source,
        requestedRecipient,
        assignedToType: routing.assignedToType,
        assistantId: routing.assistantId,
        escalatedToOwner: routing.escalatedToOwner,
        status: "new",
        priority: "normal",
        isRead: false,
        faqContext,
      },
    });

    // Best-effort email notification (never throws).
    const adminBase = process.env.NEXTAUTH_URL ?? "http://localhost:3000";
    // Fire-and-forget — do NOT await; email must never block the response (504 fix).
    void sendSupportNotification({
      visitorName,
      visitorEmail,
      visitorPhone,
      visitorMessage,
      preferredContact,
      source,
      assignedToType: routing.assignedToType,
      assistantName: routing.assistantName,
      assistantEmail: routing.assistantEmail,
      ownerName: routing.ownerName,
      ownerEmail: routing.ownerEmail,
      notifyOwnerAlways: routing.notifyOwnerAlways,
      escalatedToOwner: routing.escalatedToOwner,
      submittedAt: inquiry.createdAt.toISOString(),
      adminInboxUrl: `${adminBase}/admin/support`,
    }).catch((err) => console.error("[support] notification swallowed:", err));
    // NOTE: email is fire-and-forget (not awaited) so it never blocks the
    // response or causes a 504 if the SMTP/Resend provider is slow.

    const visitorMsg = visitorRoutingMessage(routing);
    return NextResponse.json(
      {
        success: true,
        id: inquiry.id,
        routedTo: routing.assignedToType,
        assistantName: routing.assistantName,
        escalatedToOwner: routing.escalatedToOwner,
        visitorMessage: visitorMsg,
        closingMessage:
          "Your message has been received. The support team will review it and respond as soon as possible.",
      },
      { status: 201 }
    );
  } catch (err) {
    console.error("[support] POST error:", err);
    return NextResponse.json(
      { error: "Failed to submit your message. Please try again later." },
      { status: 500 }
    );
  }
}

/**
 * GET /api/support — admin only.
 * Returns all support inquiries with filters.
 */
export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status");
    const source = searchParams.get("source");
    const assistantId = searchParams.get("assistantId");

    const where: Record<string, unknown> = {};
    if (status) where.status = status;
    if (source) where.source = source;
    if (assistantId) where.assistantId = assistantId;

    const inquiries = await db.supportInquiry.findMany({
      where,
      orderBy: { createdAt: "desc" },
      take: 200,
    });

    return NextResponse.json({ inquiries });
  } catch (err) {
    console.error("[support] GET error:", err);
    return NextResponse.json({ error: "Failed to load support inquiries." }, { status: 500 });
  }
}
