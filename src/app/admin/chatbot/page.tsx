import { db } from "@/lib/db";
import { AdminPageHeader } from "@/components/admin/admin-shell";
import { ChatbotFaqManager } from "@/components/admin/chatbot-faq-manager";
import { StatusBadge } from "@/components/admin/section-card";

export const dynamic = "force-dynamic";

export default async function AdminChatbotPage() {
  let items: Awaited<ReturnType<typeof db.chatbotFAQ.findMany>> = [];
  try {
    items = await db.chatbotFAQ.findMany({ orderBy: [{ order: "asc" }, { createdAt: "asc" }] });
  } catch (err) {
    console.error("[admin/chatbot] load failed:", err);
  }

  return (
    <>
      <AdminPageHeader
        title="Chatbot FAQs"
        description="Manage the pre-written questions and answers the public chatbot uses for instant self-service. The chatbot is FAQ-based only — no external LLM. Unanswered visitor questions are logged for your review so you can add them as new FAQs."
        action={items.length > 0 ? <StatusBadge tone="violet">{items.length} FAQs</StatusBadge> : undefined}
      />
      <ChatbotFaqManager initial={JSON.parse(JSON.stringify(items))} />
    </>
  );
}
