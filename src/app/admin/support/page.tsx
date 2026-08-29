import { db } from "@/lib/db";
import { AdminPageHeader } from "@/components/admin/admin-shell";
import { SupportInbox } from "@/components/admin/support-inbox";
import { StatusBadge } from "@/components/admin/section-card";

export const dynamic = "force-dynamic";

export default async function AdminSupportPage() {
  let items: Awaited<ReturnType<typeof db.supportInquiry.findMany>> = [];
  let assistants: { id: string; name: string }[] = [];
  try {
    [items, assistants] = await Promise.all([
      db.supportInquiry.findMany({ orderBy: { createdAt: "desc" }, take: 200 }),
      db.assistant.findMany({ where: { active: true }, select: { id: true, name: true } }),
    ]);
  } catch (err) {
    console.error("[admin/support] load failed:", err);
  }

  const newCount = items.filter((i) => i.status === "new").length;

  return (
    <>
      <AdminPageHeader
        title="Support Inbox"
        description="Support inquiries from the chatbot escalation flow and the support widget. Route, reassign, escalate to Mr. Vincent CEO, or reply by email/WhatsApp."
        action={items.length > 0 ? (
          <div className="flex gap-2">
            {newCount > 0 && <StatusBadge tone="violet">{newCount} new</StatusBadge>}
            <StatusBadge tone="neutral">{items.length} total</StatusBadge>
          </div>
        ) : undefined}
      />
      <SupportInbox initial={JSON.parse(JSON.stringify(items))} assistants={assistants} />
    </>
  );
}
