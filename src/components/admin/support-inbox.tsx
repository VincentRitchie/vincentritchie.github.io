"use client";

import { useState, useMemo } from "react";
import { toast } from "sonner";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription,
} from "@/components/ui/dialog";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Mail, Trash2, RefreshCw, ExternalLink, Headphones, Inbox as InboxIcon } from "lucide-react";
import { StatusBadge, EmptyState } from "@/components/admin/section-card";

type Inquiry = {
  id: string;
  visitorName: string;
  visitorEmail: string | null;
  visitorPhone: string | null;
  visitorMessage: string;
  preferredContact: string | null;
  source: string;
  requestedRecipient: string | null;
  assignedToType: string | null;
  assistantId: string | null;
  escalatedToOwner: boolean;
  status: string;
  priority: string;
  isRead: boolean;
  faqContext: string | null;
  createdAt: string;
};

type Assistant = { id: string; name: string; };

const STATUS_OPTIONS = ["new", "open", "pending", "replied", "closed"];
const SOURCE_OPTIONS = ["chatbot", "contact-form", "support-widget", "whatsapp-fallback"];

const tone = (s: string): "violet" | "blue" | "magenta" | "neutral" | "amber" => {
  if (s === "new") return "violet";
  if (s === "open") return "blue";
  if (s === "pending") return "amber";
  if (s === "replied") return "neutral";
  return "neutral";
};

export function SupportInbox({ initial, assistants }: { initial: Inquiry[]; assistants: Assistant[] }) {
  const [items, setItems] = useState<Inquiry[]>(initial);
  const [filterStatus, setFilterStatus] = useState("");
  const [filterSource, setFilterSource] = useState("");
  const [filterAssigned, setFilterAssigned] = useState("");
  const [viewing, setViewing] = useState<Inquiry | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const filtered = useMemo(() => {
    return items.filter((i) => {
      if (filterStatus && i.status !== filterStatus) return false;
      if (filterSource && i.source !== filterSource) return false;
      if (filterAssigned === "owner" && i.assignedToType !== "owner") return false;
      if (filterAssigned === "assistant" && i.assignedToType !== "assistant") return false;
      if (filterAssigned === "unassigned" && i.assignedToType) return false;
      return true;
    });
  }, [items, filterStatus, filterSource, filterAssigned]);

  const patch = async (id: string, data: Record<string, unknown>, msg = "Updated") => {
    setBusy(true);
    try {
      const res = await fetch(`/api/support/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const d = await res.json();
      if (!res.ok) throw new Error(d?.error || "Failed");
      setItems((prev) => prev.map((x) => x.id === id ? { ...x, ...data } as Inquiry : x));
      setViewing((v) => v && v.id === id ? { ...v, ...data } as Inquiry : v);
      toast.success(msg);
    } catch {
      toast.error("Update failed");
    } finally {
      setBusy(false);
    }
  };

  const confirmDelete = async () => {
    if (!deleteId) return;
    try {
      const res = await fetch(`/api/support/${deleteId}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed");
      setItems((prev) => prev.filter((x) => x.id !== deleteId));
      if (viewing?.id === deleteId) setViewing(null);
      toast.success("Inquiry deleted");
    } catch {
      toast.error("Delete failed");
    } finally {
      setDeleteId(null);
    }
  };

  const assistantName = (id: string | null) => assistants.find((a) => a.id === id)?.name ?? null;

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="flex flex-wrap items-center gap-2">
        <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className="rounded-lg border border-border bg-card/60 px-3 py-2 text-xs">
          <option value="">All statuses</option>
          {STATUS_OPTIONS.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
        <select value={filterSource} onChange={(e) => setFilterSource(e.target.value)} className="rounded-lg border border-border bg-card/60 px-3 py-2 text-xs">
          <option value="">All sources</option>
          {SOURCE_OPTIONS.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
        <select value={filterAssigned} onChange={(e) => setFilterAssigned(e.target.value)} className="rounded-lg border border-border bg-card/60 px-3 py-2 text-xs">
          <option value="">All assignments</option>
          <option value="assistant">Assistant</option>
          <option value="owner">Mr. Vincent CEO</option>
          <option value="unassigned">Unassigned</option>
        </select>
        <span className="ml-auto text-xs text-muted-foreground">{filtered.length} of {items.length}</span>
      </div>

      {filtered.length === 0 ? (
        <EmptyState title="No support inquiries" description="Support inquiries from the chatbot escalation and support widget will appear here." />
      ) : (
        <div className="overflow-hidden rounded-2xl border border-border bg-card/40">
          <div className="max-h-[70vh] overflow-y-auto">
            <table className="w-full text-sm">
              <thead className="sticky top-0 z-10 border-b border-border bg-background/95 backdrop-blur">
                <tr className="text-left text-[11px] uppercase tracking-wider text-muted-foreground">
                  <th className="px-4 py-3 font-medium">Visitor</th>
                  <th className="hidden px-4 py-3 font-medium md:table-cell">Source</th>
                  <th className="hidden px-4 py-3 font-medium md:table-cell">Routed to</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                  <th className="px-4 py-3 text-right font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((i) => (
                  <tr key={i.id} className={`border-b border-border/60 hover:bg-secondary/30 ${!i.isRead ? "bg-violet-500/[0.04]" : ""}`}>
                    <td className="px-4 py-3">
                      <button onClick={() => { setViewing(i); if (!i.isRead) patch(i.id, { isRead: true }, "Marked read"); }} className="text-left">
                        <p className="font-medium text-foreground flex items-center gap-1.5">
                          {!i.isRead && <span className="h-1.5 w-1.5 rounded-full bg-violet-400" />}
                          {i.visitorName}
                        </p>
                        <p className="text-xs text-muted-foreground truncate max-w-[200px]">{i.visitorEmail || i.visitorPhone || "—"}</p>
                      </button>
                    </td>
                    <td className="hidden px-4 py-3 text-xs text-muted-foreground md:table-cell">{i.source}</td>
                    <td className="hidden px-4 py-3 text-xs md:table-cell">
                      {i.assignedToType === "assistant" ? (
                        <span className="text-violet-200">{assistantName(i.assistantId) ?? "Assistant"}</span>
                      ) : i.assignedToType === "owner" ? (
                        <span className="text-amber-200">Mr. Vincent CEO</span>
                      ) : "—"}
                      {i.escalatedToOwner && <span className="ml-1 text-[10px] text-amber-300">(escalated)</span>}
                    </td>
                    <td className="px-4 py-3">
                      <select
                        value={i.status}
                        onChange={(e) => patch(i.id, { status: e.target.value }, "Status updated")}
                        className="rounded-md border border-border bg-background/60 px-2 py-1 text-xs"
                      >
                        {STATUS_OPTIONS.map((s) => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-1">
                        <Button size="sm" variant="ghost" onClick={() => setViewing(i)} className="h-8 w-8 p-0"><ExternalLink className="h-3.5 w-3.5" /></Button>
                        <Button size="sm" variant="ghost" onClick={() => setDeleteId(i.id)} className="h-8 w-8 p-0 text-rose-300 hover:text-rose-200"><Trash2 className="h-3.5 w-3.5" /></Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Detail dialog */}
      <Dialog open={!!viewing} onOpenChange={(o) => !o && setViewing(null)}>
        <DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto border-border bg-card/95 backdrop-blur-xl">
          <DialogHeader>
            <DialogTitle>Support inquiry — {viewing?.visitorName}</DialogTitle>
            <DialogDescription>
              {viewing && new Date(viewing.createdAt).toLocaleString()} · Source: {viewing?.source}
            </DialogDescription>
          </DialogHeader>
          {viewing && (
            <div className="space-y-4 text-sm">
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div><p className="text-[10px] uppercase tracking-wider text-muted-foreground">Email</p><p className="text-foreground">{viewing.visitorEmail || "—"}</p></div>
                <div><p className="text-[10px] uppercase tracking-wider text-muted-foreground">Phone / WhatsApp</p><p className="text-foreground">{viewing.visitorPhone || "—"}</p></div>
                <div><p className="text-[10px] uppercase tracking-wider text-muted-foreground">Preferred contact</p><p className="text-foreground">{viewing.preferredContact || "—"}</p></div>
                <div><p className="text-[10px] uppercase tracking-wider text-muted-foreground">Requested recipient</p><p className="text-foreground">{viewing.requestedRecipient || "Auto"}</p></div>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Message</p>
                <p className="mt-1 rounded-lg border border-border/60 bg-background/40 p-3 text-foreground whitespace-pre-wrap">{viewing.visitorMessage}</p>
              </div>
              {viewing.faqContext && (
                <div><p className="text-[10px] uppercase tracking-wider text-muted-foreground">FAQ context</p><p className="text-xs text-muted-foreground">{viewing.faqContext}</p></div>
              )}

              {/* Assignment controls */}
              <div className="rounded-lg border border-border/60 bg-background/40 p-3">
                <p className="mb-2 text-[10px] uppercase tracking-wider text-muted-foreground">Assignment / escalation</p>
                <div className="flex flex-wrap items-center gap-2">
                  <select
                    value={viewing.assignedToType ?? ""}
                    onChange={(e) => patch(viewing.id, { assignedToType: e.target.value || null }, "Reassigned")}
                    className="rounded-md border border-border bg-background/60 px-2 py-1 text-xs"
                  >
                    <option value="">Unassigned</option>
                    <option value="assistant">Assistant</option>
                    <option value="owner">Mr. Vincent CEO</option>
                  </select>
                  {viewing.assignedToType === "assistant" && (
                    <select
                      value={viewing.assistantId ?? ""}
                      onChange={(e) => patch(viewing.id, { assistantId: e.target.value || null }, "Assistant reassigned")}
                      className="rounded-md border border-border bg-background/60 px-2 py-1 text-xs"
                    >
                      <option value="">— pick assistant —</option>
                      {assistants.map((a) => <option key={a.id} value={a.id}>{a.name}</option>)}
                    </select>
                  )}
                  <Button size="sm" variant="ghost" onClick={() => patch(viewing.id, { escalatedToOwner: !viewing.escalatedToOwner }, "Escalation toggled")} className="text-xs">
                    {viewing.escalatedToOwner ? "Remove owner escalation" : "Escalate to owner"}
                  </Button>
                </div>
              </div>

              {/* Quick actions */}
              <div className="flex flex-wrap gap-2">
                {viewing.visitorEmail && (
                  <a href={`mailto:${viewing.visitorEmail}?subject=Re: Your support inquiry`} className="inline-flex items-center gap-1.5 rounded-full border border-violet-400/40 bg-violet-500/10 px-3 py-1.5 text-xs font-medium text-violet-100">
                    <Mail className="h-3 w-3" /> Reply by email
                  </a>
                )}
                {viewing.visitorPhone && (
                  <a href={`https://wa.me/${viewing.visitorPhone.replace(/[^\d]/g, "")}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/40 bg-emerald-500/10 px-3 py-1.5 text-xs font-medium text-emerald-200">
                    <Headphones className="h-3 w-3" /> WhatsApp visitor
                  </a>
                )}
                <Button size="sm" variant="ghost" onClick={() => patch(viewing.id, { isRead: !viewing.isRead }, "Read state toggled")} className="text-xs">
                  <RefreshCw className="h-3 w-3" /> {viewing.isRead ? "Mark unread" : "Mark read"}
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <AlertDialog open={!!deleteId} onOpenChange={(o) => !o && setDeleteId(null)}>
        <AlertDialogContent className="border-border bg-card/95 backdrop-blur-xl">
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this inquiry?</AlertDialogTitle>
            <AlertDialogDescription>This permanently removes the support inquiry. This cannot be undone.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-rose-600 text-white hover:bg-rose-500">Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <span className="hidden">{busy ? <InboxIcon className="h-3 w-3" /> : null}</span>
    </div>
  );
}
