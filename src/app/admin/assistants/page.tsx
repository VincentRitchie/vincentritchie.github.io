import { db } from "@/lib/db";
import { AdminPageHeader } from "@/components/admin/admin-shell";
import { AssistantsManager } from "@/components/admin/assistants-manager";
import { StatusBadge } from "@/components/admin/section-card";

export const dynamic = "force-dynamic";

export default async function AdminAssistantsPage() {
  let items: Awaited<ReturnType<typeof db.assistant.findMany>> = [];
  try {
    items = await db.assistant.findMany({
      orderBy: [{ isPrimary: "desc" }, { createdAt: "asc" }],
    });
  } catch (err) {
    console.error("[admin/assistants] load failed:", err);
  }

  const activeCount = items.filter((a) => a.active && a.available).length;

  return (
    <>
      <AdminPageHeader
        title="Assistants"
        description="Manage support assistants. When an active and available assistant exists, new inquiries route to them. When none is available, inquiries escalate automatically to Mr. Vincent CEO. No fake assistants are seeded — add real ones here."
        action={items.length > 0 ? (
          <div className="flex gap-2">
            <StatusBadge tone="violet">{activeCount} available</StatusBadge>
            <StatusBadge tone="neutral">{items.length} total</StatusBadge>
          </div>
        ) : undefined}
      />
      <AssistantsManager initial={JSON.parse(JSON.stringify(items))} />
    </>
  );
}
