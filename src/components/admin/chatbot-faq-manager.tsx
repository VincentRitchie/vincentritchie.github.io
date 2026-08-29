"use client";

import { useState, useEffect } from "react";
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
import { Plus, Pencil, Trash2, Loader2, Bot } from "lucide-react";
import { StatusBadge, EmptyState } from "@/components/admin/section-card";

type Faq = {
  id: string;
  question: string;
  answer: string;
  keywords: string | null;
  category: string | null;
  order: number;
  visible: boolean;
};

export function ChatbotFaqManager({ initial }: { initial: Faq[] }) {
  const [items, setItems] = useState<Faq[]>(initial);
  const [editing, setEditing] = useState<Partial<Faq> | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [saving, setSaving] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  // Also load unknown questions count
  const [unknownCount, setUnknownCount] = useState(0);
  useEffect(() => {
    fetch("/api/admin/unknown-questions").then((r) => r.json()).then((d) => {
      if (Array.isArray(d.questions)) setUnknownCount(d.questions.length);
    }).catch(() => {});
  }, [items]);

  const empty = (): Partial<Faq> => ({ question: "", answer: "", keywords: "", category: "", order: 0, visible: true });

  const save = async () => {
    if (!editing) return;
    if (!String(editing.question ?? "").trim() || !String(editing.answer ?? "").trim()) {
      toast.error("Question and answer are required");
      return;
    }
    setSaving(true);
    try {
      const payload: Record<string, unknown> = {
        question: editing.question,
        answer: editing.answer,
        keywords: editing.keywords || null,
        category: editing.category || null,
        order: Number(editing.order) || 0,
        visible: editing.visible !== false,
      };
      const res = await fetch(
        isNew ? "/api/admin/chatbot" : `/api/admin/chatbot/${editing.id}`,
        { method: isNew ? "POST" : "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) }
      );
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Save failed");
      const saved = data.faq as Faq;
      setItems((prev) => isNew ? [saved, ...prev] : prev.map((x) => x.id === saved.id ? saved : x));
      setEditing(null);
      toast.success(isNew ? "FAQ created" : "FAQ updated");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Save failed");
    } finally {
      setSaving(false);
    }
  };

  const confirmDelete = async () => {
    if (!deleteId) return;
    try {
      const res = await fetch(`/api/admin/chatbot/${deleteId}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed");
      setItems((prev) => prev.filter((x) => x.id !== deleteId));
      toast.success("FAQ deleted");
    } catch {
      toast.error("Delete failed");
    } finally {
      setDeleteId(null);
    }
  };

  const toggleVisible = async (f: Faq) => {
    try {
      const res = await fetch(`/api/admin/chatbot/${f.id}`, {
        method: "PATCH", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ visible: !f.visible }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Failed");
      setItems((prev) => prev.map((x) => x.id === f.id ? { ...x, visible: !f.visible } : x));
    } catch {
      toast.error("Update failed");
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Bot className="h-4 w-4 text-violet-300" />
          {unknownCount > 0 ? (
            <span>{unknownCount} unanswered visitor questions logged — review and add as FAQs.</span>
          ) : (
            <span>No unanswered visitor questions logged.</span>
          )}
        </div>
        <Button type="button" onClick={() => { setEditing(empty()); setIsNew(true); }} className="gap-2 rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-600 px-4 py-2 text-xs font-semibold text-white">
          <Plus className="h-3.5 w-3.5" /> Add FAQ
        </Button>
      </div>

      {items.length === 0 ? (
        <EmptyState title="No FAQs" description="Add FAQ entries so the chatbot can answer common visitor questions instantly." />
      ) : (
        <div className="space-y-2">
          {items.map((f) => (
            <div key={f.id} className="rounded-xl border border-border bg-card/40 p-4">
              <div className="flex items-start justify-between gap-2">
                <button onClick={() => { setEditing({ ...f }); setIsNew(false); }} className="min-w-0 flex-1 text-left">
                  <p className="font-medium text-foreground">{f.question}</p>
                  <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">{f.answer}</p>
                  {f.keywords && <p className="mt-1 text-[10px] text-muted-foreground/70">Keywords: {f.keywords}</p>}
                </button>
                <div className="flex shrink-0 items-center gap-1">
                  <button onClick={() => toggleVisible(f)} className={`rounded-full border px-2 py-0.5 text-[10px] font-medium ${f.visible ? "border-emerald-400/40 bg-emerald-500/15 text-emerald-200" : "border-border bg-card/60 text-muted-foreground"}`}>
                    {f.visible ? "Visible" : "Hidden"}
                  </button>
                  <Button size="sm" variant="ghost" onClick={() => { setEditing({ ...f }); setIsNew(false); }} className="h-8 w-8 p-0"><Pencil className="h-3.5 w-3.5" /></Button>
                  <Button size="sm" variant="ghost" onClick={() => setDeleteId(f.id)} className="h-8 w-8 p-0 text-rose-300 hover:text-rose-200"><Trash2 className="h-3.5 w-3.5" /></Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <Dialog open={!!editing} onOpenChange={(o) => !o && setEditing(null)}>
        <DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto border-border bg-card/95 backdrop-blur-xl">
          <DialogHeader>
            <DialogTitle>{isNew ? "Add FAQ" : "Edit FAQ"}</DialogTitle>
            <DialogDescription>Pre-written questions + answers the chatbot uses for instant self-service.</DialogDescription>
          </DialogHeader>
          {editing && (
            <div className="grid grid-cols-1 gap-4">
              <div className="space-y-1.5">
                <Label className="text-xs">Question <span className="text-fuchsia-400">*</span></Label>
                <Input value={String(editing.question ?? "")} onChange={(e) => setEditing({ ...editing, question: e.target.value })} className="border-border bg-background/60" />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs">Answer <span className="text-fuchsia-400">*</span></Label>
                <Textarea value={String(editing.answer ?? "")} onChange={(e) => setEditing({ ...editing, answer: e.target.value })} className="min-h-[120px] border-border bg-background/60" />
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <Label className="text-xs">Keywords (comma-separated)</Label>
                  <Input value={String(editing.keywords ?? "")} onChange={(e) => setEditing({ ...editing, keywords: e.target.value })} placeholder="who, about, contact" className="border-border bg-background/60" />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs">Category</Label>
                  <Input value={String(editing.category ?? "")} onChange={(e) => setEditing({ ...editing, category: e.target.value })} placeholder="about, services, contact" className="border-border bg-background/60" />
                </div>
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs">Order</Label>
                <Input type="number" value={Number(editing.order ?? 0)} onChange={(e) => setEditing({ ...editing, order: Number(e.target.value) || 0 })} className="border-border bg-background/60" />
              </div>
              <label className="flex items-center gap-2 text-xs">
                <input type="checkbox" checked={!!editing.visible} onChange={(e) => setEditing({ ...editing, visible: e.target.checked })} className="h-4 w-4 rounded border-border" />
                Visible to the public chatbot
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
            <AlertDialogTitle>Delete this FAQ?</AlertDialogTitle>
            <AlertDialogDescription>The chatbot will no longer answer this question. This cannot be undone.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-rose-600 text-white hover:bg-rose-500">Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
