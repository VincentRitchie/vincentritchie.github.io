import "server-only";
import { db } from "@/lib/db";

/**
 * Support routing + escalation logic.
 *
 * Rules (per spec):
 *  1. When a visitor requests human support, first check whether an active AND
 *     available Assistant exists.
 *  2. If one exists, route the inquiry to the assigned / primary Assistant.
 *  3. If no Assistant exists, none is active, or none is available, escalate
 *     automatically to Mr. Vincent CEO (the owner).
 *  4. The Administrator remains the highest authority and can reassign manually.
 *  5. If "notify owner always" is enabled, the owner is also notified when an
 *     assistant receives an inquiry.
 */

export type RoutingDecision = {
  assignedToType: "assistant" | "owner";
  assistantId: string | null;
  escalatedToOwner: boolean;
  assistantName: string | null;
  assistantEmail: string | null;
  ownerName: string;
  ownerEmail: string | null;
  ownerWhatsapp: string | null;
  notifyOwnerAlways: boolean;
};

/** Resolve the SupportSetting singleton (owner/escalation contact). */
export async function getSupportSetting() {
  let s = await db.supportSetting.findUnique({ where: { id: "1" } });
  if (!s) {
    // Create with safe defaults (owner = Mr. Vincent CEO). Real values come
    // from env at seed time; here we just ensure a row exists.
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
  return s;
}

/** Resolve the best assistant to route a new inquiry to, or null if none available. */
export async function resolveRoutingAssistant(): Promise<{
  assistantId: string | null;
  assistantName: string | null;
  assistantEmail: string | null;
}> {
  try {
    // Prefer the primary active+available assistant, else any active+available.
    const candidates = await db.assistant.findMany({
      where: { active: true, available: true },
      orderBy: [{ isPrimary: "desc" }, { createdAt: "asc" }],
      take: 1,
    });
    if (candidates.length === 0) {
      return { assistantId: null, assistantName: null, assistantEmail: null };
    }
    const a = candidates[0];
    return { assistantId: a.id, assistantName: a.name, assistantEmail: a.email };
  } catch (err) {
    console.error("[support] resolveRoutingAssistant failed:", err);
    return { assistantId: null, assistantName: null, assistantEmail: null };
  }
}

/** Decide routing for a new support inquiry. */
export async function decideRouting(
  requestedRecipient?: string | null
): Promise<RoutingDecision> {
  const s = await getSupportSetting();

  // If the visitor explicitly requested the owner, honor that.
  if (requestedRecipient && requestedRecipient.toLowerCase() === "owner") {
    return {
      assignedToType: "owner",
      assistantId: null,
      escalatedToOwner: true,
      assistantName: null,
      assistantEmail: null,
      ownerName: s.ownerDisplayName ?? "Mr. Vincent CEO",
      ownerEmail: s.ownerEmail,
      ownerWhatsapp: s.ownerWhatsapp,
      notifyOwnerAlways: s.notifyOwnerAlways,
    };
  }

  const { assistantId, assistantName, assistantEmail } = await resolveRoutingAssistant();

  if (assistantId) {
    return {
      assignedToType: "assistant",
      assistantId,
      escalatedToOwner: false,
      assistantName,
      assistantEmail,
      ownerName: s.ownerDisplayName ?? "Mr. Vincent CEO",
      ownerEmail: s.ownerEmail,
      ownerWhatsapp: s.ownerWhatsapp,
      notifyOwnerAlways: s.notifyOwnerAlways,
    };
  }

  // No assistant available → escalate to owner.
  return {
    assignedToType: "owner",
    assistantId: null,
    escalatedToOwner: true,
    assistantName: null,
    assistantEmail: null,
    ownerName: s.ownerDisplayName ?? "Mr. Vincent CEO",
    ownerEmail: s.ownerEmail,
    ownerWhatsapp: s.ownerWhatsapp,
    notifyOwnerAlways: s.notifyOwnerAlways,
  };
}

/** Human-readable visitor-facing message based on routing. */
export function visitorRoutingMessage(d: RoutingDecision): string {
  if (d.assignedToType === "assistant" && d.assistantName) {
    return `An Assistant is available to help. Please leave your name, contact details, and message. Your inquiry will be forwarded to ${d.assistantName}.`;
  }
  return "No Assistant is currently available. You can contact Mr. Vincent directly on WhatsApp or leave a message through the website.";
}
