"use client";

import { useState } from "react";
import { toast } from "sonner";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter,
} from "@/components/ui/dialog";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Pencil, Trash2, Loader2, Star, Check, X } from "lucide-react";
import { StatusBadge, EmptyState } from "@/components/admin/section-card";

type Assistant = {
  id: string;
  name: string;
  email: string | null;
  phoneNumber: string | null;
  whatsappLink: string | null;
  role: string | null;
  active: boolean;
  available: boolean;
  isPrimary: boolean;
  permissions: string | null;
  notifyPref: string | null;
  notes: string | null;
  createdAt: string;
};

export function AssistantsManager({ initial }: { initial: Assistant[] }) {
  const [items, setItems] = useState<Assistant[]>(initial);
  const [editing, setEditing] = useState<Partial<Assistant> | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [saving, setSaving] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const empty = (): Partial<Assistant> => ({
    name: "", email: "", phoneNumber: "", whatsappLink: "", role: "Support Assistant",
    active: true, available: true, isPrimary: false, notes: "",
  });

  const save = async () => {
    if (!editing) return;
    if (!String(editing.name ?? "").trim()) {
      toast.error("Name is required");
      return;
    }
    setSaving(true);
    try {
      const payload: Record<string, unknown> = {
        name: editing.name,
        email: editing.email || null,
        phoneNumber: editing.phoneNumber || null,
        whatsappLink: editing.whatsappLink || null,
        role: editing.role || null,
        active: editing.active !== false,
        available: editing.available !== false,
        isPrimary: editing.isPrimary === true,
        notes: editing.notes || null,
      };
      const res = await fetch(
        isNew ? "/api/admin/assistants" : `/api/admin/assistants/${editing.id}`,
        { method: isNew ? "POST" : "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) }
      );
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Save failed");
      const saved = data.assistant as Assistant;
      // If primary was set, clear primary on others locally
      let next = items;
      if (saved.isPrimary) next = next.map((x) => x.id === saved.id ? saved : { ...x, isPrimary: false });
      else next = isNew ? [saved, ...next] : next.map((x) => x.id === saved.id ? saved : x);
      setItems(next);
      setEditing(null);
      toast.success(isNew ? "Assistant added" : "Assistant updated");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Save failed");
    } finally {
      setSaving(false);
    }
  };

  const quickToggle = async (a: Assistant, field: "active" | "available" | "isPrimary") => {
    try {
      const res = await fetch(`/api/admin/assistants/${a.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ [field]: !a[field] }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Failed");
      const updated = data.assistant as Assistant;
      let next = items.map((x) => x.id === updated.id ? updated : x);
      if (field === "isPrimary" && updated.isPrimary) {
        next = next.map((x) => x.id === updated.id ? x : { ...x, isPrimary: false });
      }
      setItems(next);
      toast.success("Updated");
    } catch {
      toast.error("Update failed");
    }
  };

  const confirmDelete = async () => {
    if (!deleteId) return;
    try {
      const res = await fetch(`/api/admin/assistants/${deleteId}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed");
      setItems((prev) => prev.filter((x) => x.id !== deleteId));
      toast.success("Assistant removed");
    } catch {
      toast.error("Delete failed");
    } finally {
      setDeleteId(null);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Button
          type="button"
          onClick={() => { setEditing(empty()); setIsNew(true); }}
          className="gap-2 rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-600 px-4 py-2 text-xs font-semibold text-white"
        >
          <Plus className="h-3.5 w-3.5" /> Add Assistant
        </Button>
      </div>

      {items.length === 0 ? (
        <EmptyState
          title="No assistants yet"
          description="The system launches with no assistants by default. When no assistant is available, all support inquiries escalate automatically to Mr. Vincent CEO. Add an assistant here to enable assistant routing."
        />
      ) : (
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          {items.map((a) => (
            <div key={a.id} className="rounded-2xl border border-border bg-card/40 p-4">
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="font-display text-sm font-semibold text-foreground truncate">{a.name}</p>
                    {a.isPrimary && <Star className="h-3.5 w-3.5 text-amber-300 fill-amber-300" />}
                  </div>
                  {a.role && <p className="text-xs text-muted-foreground">{a.role}</p>}
                </div>
                <div className="flex gap-1">
                  <Button size="sm" variant="ghost" onClick={() => { setEditing({ ...a }); setIsNew(false); }} className="h-8 w-8 p-0">
                    <Pencil className="h-3.5 w-3.5" />
                  </Button>
                  <Button size="sm" variant="ghost" onClick={() => setDeleteId(a.id)} className="h-8 w-8 p-0 text-rose-300 hover:text-rose-200">
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </div>
              <div className="mt-2 space-y-0.5 text-xs text-muted-foreground">
                {a.email && <p className="truncate">✉ {a.email}</p>}
                {a.phoneNumber && <p>☎ {a.phoneNumber}</p>}
                {a.whatsappLink && <p className="truncate">💬 {a.whatsappLink}</p>}
              </div>
              <div className="mt-3 flex flex-wrap items-center gap-1.5">
                <button
                  onClick={() => quickToggle(a, "active")}
                  className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] font-medium ${a.active ? "border-emerald-400/40 bg-emerald-500/15 text-emerald-200" : "border-border bg-card/60 text-muted-foreground"}`}
                >
                  {a.active ? <Check className="h-2.5 w-2.5" /> : <X className="h-2.5 w-2.5" />} {a.active ? "Active" : "Inactive"}
                </button>
                <button
                  onClick={() => quickToggle(a, "available")}
                  className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] font-medium ${a.available ? "border-violet-400/40 bg-violet-500/15 text-violet-200" : "border-border bg-card/60 text-muted-foreground"}`}
                >
                  {a.available ? <Check className="h-2.5 w-2.5" /> : <X className="h-2.5 w-2.5" />} {a.available ? "Available" : "Unavailable"}
                </button>
                <button
                  onClick={() => quickToggle(a, "isPrimary")}
                  className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] font-medium ${a.isPrimary ? "border-amber-400/40 bg-amber-500/15 text-amber-200" : "border-border bg-card/60 text-muted-foreground"}`}
                >
                  <Star className="h-2.5 w-2.5" /> {a.isPrimary ? "Primary" : "Set primary"}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <Dialog open={!!editing} onOpenChange={(o) => !o && setEditing(null)}>
        <DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto border-border bg-card/95 backdrop-blur-xl">
          <DialogHeader>
            <DialogTitle>{isNew ? "Add Assistant" : "Edit Assistant"}</DialogTitle>
            <DialogDescription>
              Assistants receive routed support inquiries when active and available. If none is available, inquiries escalate to Mr. Vincent CEO.
            </DialogDescription>
          </DialogHeader>
          {editing && (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <Label className="text-xs">Name <span className="text-fuchsia-400">*</span></Label>
                <Input value={String(editing.name ?? "")} onChange={(e) => setEditing({ ...editing, name: e.target.value })} className="border-border bg-background/60" />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs">Role / Title</Label>
                <Input value={String(editing.role ?? "")} onChange={(e) => setEditing({ ...editing, role: e.target.value })} className="border-border bg-background/60" />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs">Email</Label>
                <Input type="email" value={String(editing.email ?? "")} onChange={(e) => setEditing({ ...editing, email: e.target.value })} className="border-border bg-background/60" />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs">Phone number</Label>
                <Input value={String(editing.phoneNumber ?? "")} onChange={(e) => setEditing({ ...editing, phoneNumber: e.target.value })} className="border-border bg-background/60" />
              </div>
              <div className="space-y-1.5 sm:col-span-2">
                <Label className="text-xs">WhatsApp link / number</Label>
                <Input value={String(editing.whatsappLink ?? "")} onChange={(e) => setEditing({ ...editing, whatsappLink: e.target.value })} placeholder="https://wa.me/234..." className="border-border bg-background/60" />
              </div>
              <div className="space-y-1.5 sm:col-span-2">
                <Label className="text-xs">Notes (admin only)</Label>
                <Textarea value={String(editing.notes ?? "")} onChange={(e) => setEditing({ ...editing, notes: e.target.value })} className="min-h-[60px] border-border bg-background/60" />
              </div>
              <label className="flex items-center gap-2 text-xs">
                <input type="checkbox" checked={!!editing.active} onChange={(e) => setEditing({ ...editing, active: e.target.checked })} className="h-4 w-4 rounded border-border" />
                Active (can be assigned inquiries)
              </label>
              <label className="flex items-center gap-2 text-xs">
                <input type="checkbox" checked={!!editing.available} onChange={(e) => setEditing({ ...editing, available: e.target.checked })} className="h-4 w-4 rounded border-border" />
                Available now (currently accepting new inquiries)
              </label>
              <label className="flex items-center gap-2 text-xs sm:col-span-2">
                <input type="checkbox" checked={!!editing.isPrimary} onChange={(e) => setEditing({ ...editing, isPrimary: e.target.checked })} className="h-4 w-4 rounded border-border" />
                Primary assistant (preferred for routing)
              </label>
            </div>
          )}
          <DialogFooter>
            <Button variant="ghost" onClick={() => setEditing(null)}>Cancel</Button>
            <Button type="button" onClick={save} disabled={saving} className="gap-2 rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-600 px-4 py-2 text-xs font-semibold text-white">
              {saving && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
              {saving ? "Saving…" : "Save"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog open={!!deleteId} onOpenChange={(o) => !o && setDeleteId(null)}>
        <AlertDialogContent className="border-border bg-card/95 backdrop-blur-xl">
          <AlertDialogHeader>
            <AlertDialogTitle>Remove this assistant?</AlertDialogTitle>
            <AlertDialogDescription>This cannot be undone. Existing inquiries assigned to them remain in the inbox and can be reassigned.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-rose-600 text-white hover:bg-rose-500">Remove</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
