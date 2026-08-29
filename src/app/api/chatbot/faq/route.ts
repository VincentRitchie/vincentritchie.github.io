import { NextResponse } from "next/server";
import { getPublicFaqs } from "@/lib/faq";
import { getSupportSetting } from "@/lib/support";

/**
 * GET /api/chatbot/faq — public.
 * Returns the FAQ suggestion chips + the chatbot welcome message + the owner
 * WhatsApp link (for the WhatsApp fallback button). No admin-only data.
 */
export async function GET() {
  try {
    const [faqs, settings] = await Promise.all([getPublicFaqs(8), getSupportSetting()]);
    return NextResponse.json({
      welcome:
        settings.welcomeMessage ??
        "Hi, welcome. You can choose a quick question below or speak with a human representative.",
      faqs: faqs.map((f) => ({ id: f.id, question: f.question, category: f.category })),
      // Public-safe: only the owner WhatsApp link (already public on the site).
      ownerWhatsapp: settings.ownerWhatsapp ?? "https://wa.me/message/BS2I4XH5NM3CH1",
    });
  } catch (err) {
    console.error("[chatbot/faq] GET error:", err);
    return NextResponse.json(
      {
        welcome:
          "Hi, welcome. You can choose a quick question below or speak with a human representative.",
        faqs: [],
        ownerWhatsapp: "https://wa.me/message/BS2I4XH5NM3CH1",
      },
      { status: 200 }
    );
  }
}
