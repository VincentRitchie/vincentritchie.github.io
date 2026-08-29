/**
 * Support inquiry email notifications.
 *
 * Same provider strategy as email.ts (Resend REST → SMTP → skip).
 * ALWAYS best-effort — never throws to the caller.
 *
 * Recipients:
 *  - If routed to an assistant with an email: notify the assistant.
 *  - If escalated to the owner, OR if notifyOwnerAlways is on: notify the owner.
 */

export interface SupportNotificationPayload {
  visitorName: string;
  visitorEmail: string | null;
  visitorPhone: string | null;
  visitorMessage: string;
  preferredContact: string | null;
  source: string; // chatbot | contact-form | support-widget | whatsapp-fallback
  assignedToType: "assistant" | "owner";
  assistantName: string | null;
  assistantEmail: string | null;
  ownerName: string;
  ownerEmail: string | null;
  notifyOwnerAlways: boolean;
  escalatedToOwner: boolean;
  submittedAt: string;
  adminInboxUrl: string; // link to /admin/support
}

async function sendViaProvider(to: string, subject: string, text: string, replyTo?: string) {
  try {
    const resendKey = process.env.RESEND_API_KEY;
    const resendFrom = process.env.RESEND_FROM;
    const smtpHost = process.env.SMTP_HOST;

    if (resendKey && resendFrom) {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resendKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: resendFrom,
          to: [to],
          ...(replyTo ? { reply_to: replyTo } : {}),
          subject,
          text,
        }),
      });
      if (!res.ok) {
        const errText = await res.text().catch(() => "");
        console.warn(`[email] Resend API failed (${res.status}): ${errText}`);
        return;
      }
      console.log(`[email] Sent via Resend to ${to}.`);
      return;
    }

    if (smtpHost) {
      const nodemailer = await import("nodemailer");
      const transporter = nodemailer.createTransport({
        host: smtpHost,
        port: Number(process.env.SMTP_PORT ?? 587),
        secure: Number(process.env.SMTP_PORT ?? 587) === 465,
        auth: process.env.SMTP_USER
          ? { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS ?? "" }
          : undefined,
      });
      await transporter.sendMail({
        from: process.env.SMTP_FROM || process.env.SMTP_USER || `Portfolio <noreply@${smtpHost}>`,
        to,
        ...(replyTo ? { replyTo } : {}),
        subject,
        text,
      });
      console.log(`[email] Sent via SMTP to ${to}.`);
      return;
    }

    // No transport — log and skip.
    console.log(`[email] No transport configured. Support notification (to ${to}) skipped. Payload:`);
    console.log(text);
  } catch (err) {
    console.error(`[email] support notification to ${to} failed (suppressed):`, err);
  }
}

export async function sendSupportNotification(p: SupportNotificationPayload): Promise<void> {
  const body = [
    `New support inquiry on your portfolio.`,
    ``,
    `Source: ${p.source}`,
    `Routed to: ${p.assignedToType === "assistant" ? `Assistant (${p.assistantName ?? "unassigned"})` : "Mr. Vincent CEO (owner)"}`,
    p.escalatedToOwner ? `Note: Escalated to the owner (no assistant available or visitor requested owner).` : null,
    `Submitted at: ${p.submittedAt}`,
    ``,
    `Visitor name: ${p.visitorName}`,
    p.visitorEmail ? `Visitor email: ${p.visitorEmail}` : null,
    p.visitorPhone ? `Visitor phone/WhatsApp: ${p.visitorPhone}` : null,
    p.preferredContact ? `Preferred contact method: ${p.preferredContact}` : null,
    ``,
    `Message:`,
    p.visitorMessage,
    ``,
    `View / manage this inquiry in the admin dashboard:`,
    p.adminInboxUrl,
    ``,
    `— Sent from the Obasiochie Vincent Chimaobi portfolio support system.`,
  ]
    .filter(Boolean)
    .join("\n");

  const subject =
    p.assignedToType === "assistant"
      ? `New support inquiry assigned to ${p.assistantName ?? "assistant"}`
      : `New support inquiry escalated to Mr. Vincent CEO`;

  const replyTo = p.visitorEmail ?? undefined;

  // 1. Notify the assigned assistant (if routed to one and they have an email)
  if (p.assignedToType === "assistant" && p.assistantEmail) {
    await sendViaProvider(p.assistantEmail, subject, body, replyTo);
  }

  // 2. Notify the owner if escalated, or if notifyOwnerAlways is on.
  if (p.escalatedToOwner || p.notifyOwnerAlways) {
    if (p.ownerEmail) {
      await sendViaProvider(p.ownerEmail, subject, body, replyTo);
    }
  }
}
