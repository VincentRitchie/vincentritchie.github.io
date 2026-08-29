"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageCircle,
  X,
  Send,
  Bot,
  User,
  ThumbsUp,
  ThumbsDown,
  Headphones,
  Mail,
  Phone,
  ArrowRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

type Msg = {
  id: string;
  from: "bot" | "user";
  text: string;
  // optional FAQ context id
  faqId?: string;
  // optional action buttons
  actions?: ActionButton[];
};

type ActionButton =
  | { kind: "faq"; label: string; faqId: string }
  | { kind: "ask_human"; label: string }
  | { kind: "whatsapp"; label: string; href: string }
  | { kind: "helpful_yes"; label: string; faqId: string }
  | { kind: "helpful_no"; label: string; faqId: string };

type Stage = "faq" | "human_form" | "done";

const OWNER_WHATSAPP = "https://wa.me/message/BS2I4XH5NM3CH1";
const IS_STATIC = process.env.NEXT_PUBLIC_STATIC_EXPORT === "true";
const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || "";

// Static FAQ data — used in static export mode (GitHub Pages) where API routes
// don't exist. In full-stack mode, the API is used instead.
type StaticFaq = { id: string; question: string; answer: string; keywords?: string; category?: string };
let staticFaqs: StaticFaq[] = [];

/** Client-side FAQ matching for static export mode (no API). */
function matchStaticFaq(visitorQuestion: string): StaticFaq | null {
  if (staticFaqs.length === 0) return null;
  const q = visitorQuestion.toLowerCase().replace(/[^\w\s]/g, " ").replace(/\s+/g, " ").trim();
  const qTokens = new Set(q.split(" ").filter((t) => t.length > 2));
  let best: StaticFaq | null = null;
  let bestScore = 0;
  for (const f of staticFaqs) {
    const fQ = f.question.toLowerCase();
    const keywords = (f.keywords ?? "").split(",").map((k) => k.trim().toLowerCase()).filter(Boolean);
    let score = 0;
    if (q.includes(fQ) || fQ.includes(q)) score += 6;
    for (const k of keywords) { if (q.includes(k)) score += 2; if (qTokens.has(k)) score += 1; }
    const fTokens = new Set(fQ.split(" ").filter((t) => t.length > 2));
    for (const t of qTokens) { if (fTokens.has(t)) score += 0.5; }
    if (score > bestScore) { bestScore = score; best = f; }
  }
  return bestScore >= 2 ? best : null;
}

export function ChatbotWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [stage, setStage] = useState<Stage>("faq");
  const [thinking, setThinking] = useState(false);
  const [suggestions, setSuggestions] = useState<{ id: string; question: string }[]>([]);
  const [welcome, setWelcome] = useState(
    "Hi, welcome. You can choose a quick question below or speak with a human representative."
  );
  const [unreadPulse, setUnreadPulse] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);

  // human form state
  const [form, setForm] = useState({
    visitorName: "",
    visitorEmail: "",
    visitorPhone: "",
    visitorMessage: "",
    preferredContact: "Email",
    requestedRecipient: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState<null | { ok: boolean; text: string }>(null);

  const pushBot = useCallback((text: string, actions?: ActionButton[]) => {
    setMessages((m) => [
      ...m,
      { id: Math.random().toString(36).slice(2), from: "bot", text, actions },
    ]);
  }, []);

  const pushUser = useCallback((text: string) => {
    setMessages((m) => [
      ...m,
      { id: Math.random().toString(36).slice(2), from: "user", text },
    ]);
  }, []);

  // Load FAQ suggestions + push the welcome message when first opened.
  const initChat = useCallback(async () => {
    let w = welcome;
    if (IS_STATIC) {
      // Static mode: load FAQs from /faqs.json (no API route available).
      try {
        const res = await fetch(`${BASE_PATH}/faqs.json`);
        const data = await res.json();
        if (data.welcome) { w = data.welcome; setWelcome(data.welcome); }
        if (Array.isArray(data.faqs)) {
          staticFaqs = data.faqs;
          setSuggestions(data.faqs.slice(0, 8).map((f: StaticFaq) => ({ id: f.id, question: f.question, category: f.category })));
        }
      } catch { /* ignore */ }
    } else {
      // Full-stack mode: load from API.
      try {
        const res = await fetch("/api/chatbot/faq");
        const data = await res.json();
        if (data.welcome) { w = data.welcome; setWelcome(data.welcome); }
        if (Array.isArray(data.faqs)) { setSuggestions(data.faqs); }
      } catch { /* ignore */ }
    }
    pushBot(w);
  }, [welcome, pushBot]);

  const toggleOpen = useCallback(() => {
    setOpen((o) => {
      const next = !o;
      // When opening for the first time (no messages yet), seed the welcome.
      if (next && messages.length === 0) {
        void initChat();
      }
      return next;
    });
    setUnreadPulse(false);
  }, [messages.length, initChat]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, thinking]);

  // Ask the chatbot API a question (typed or clicked).
  const askQuestion = useCallback(
    async (question: string) => {
      pushUser(question);
      setThinking(true);

      if (IS_STATIC) {
        // Static mode: client-side FAQ matching (no API route).
        const match = matchStaticFaq(question);
        setThinking(false);
        if (match) {
          pushBot(match.answer, [
            { kind: "helpful_yes", label: "Yes, helpful", faqId: match.id },
            { kind: "helpful_no", label: "No, not helpful", faqId: match.id },
            { kind: "ask_human", label: "Talk to a human" },
          ]);
        } else {
          pushBot("I couldn't find a quick answer for that. Would you like to continue with an Assistant or contact Mr. Vincent directly?", [
            { kind: "ask_human", label: "Talk to a human" },
            { kind: "whatsapp", label: "WhatsApp Mr. Vincent", href: OWNER_WHATSAPP },
          ]);
        }
        return;
      }

      try {
        const res = await fetch("/api/chatbot/ask", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ question }),
        });
        const data = await res.json();
        setThinking(false);
        if (data.matched) {
          pushBot(data.answer, [
            { kind: "helpful_yes", label: "Yes, helpful", faqId: data.faqId },
            { kind: "helpful_no", label: "No, not helpful", faqId: data.faqId },
            { kind: "ask_human", label: "Talk to a human" },
          ]);
        } else {
          pushBot(data.message ?? "I couldn't find a quick answer for that.", [
            { kind: "ask_human", label: "Talk to a human" },
            { kind: "whatsapp", label: "WhatsApp Mr. Vincent", href: OWNER_WHATSAPP },
          ]);
        }
      } catch {
        setThinking(false);
        pushBot("Something went wrong. Please try again or reach out via WhatsApp.", [
          { kind: "whatsapp", label: "WhatsApp Mr. Vincent", href: OWNER_WHATSAPP },
        ]);
      }
    },
    [pushBot, pushUser]
  );

  const handleHelpful = useCallback(
    (yes: boolean, faqId: string) => {
      if (yes) {
        pushBot("Glad that helped! You can pick another question below, or talk to a human if you need more.", [
          { kind: "ask_human", label: "Talk to a human" },
        ]);
      } else {
        pushBot(
          "Sorry it wasn't quite right. Would you like to continue with an Assistant or contact Mr. Vincent directly?",
          [
            { kind: "ask_human", label: "Continue with human support" },
            { kind: "whatsapp", label: "WhatsApp Mr. Vincent", href: OWNER_WHATSAPP },
          ]
        );
      }
    },
    [pushBot]
  );

  const startHumanFlow = useCallback(() => {
    setStage("human_form");
    pushBot(
      "I can connect you with a human. FAQs are instant; human replies may take some time. WhatsApp is best for direct urgent contact. Please leave your name, contact details, and message. Would you like to continue with an Assistant or contact Mr. Vincent directly?"
    );
  }, [pushBot]);

  const handleAction = useCallback(
    (action: ActionButton) => {
      if (action.kind === "faq") {
        askQuestion(action.label);
      } else if (action.kind === "ask_human") {
        startHumanFlow();
      } else if (action.kind === "whatsapp") {
        window.open(action.href, "_blank", "noopener,noreferrer");
      } else if (action.kind === "helpful_yes") {
        handleHelpful(true, action.faqId);
      } else if (action.kind === "helpful_no") {
        handleHelpful(false, action.faqId);
      }
    },
    [askQuestion, startHumanFlow, handleHelpful]
  );

  const submitHuman = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (!form.visitorName.trim() || !form.visitorMessage.trim()) {
        setSubmitResult({ ok: false, text: "Please provide your name and a message." });
        return;
      }
      if (!form.visitorEmail.trim() && !form.visitorPhone.trim()) {
        setSubmitResult({ ok: false, text: "Please provide an email or phone/WhatsApp so we can respond." });
        return;
      }
      setSubmitting(true);
      setSubmitResult(null);

      // Static mode: no API — open a prefilled mailto as fallback.
      if (IS_STATIC) {
        const subject = encodeURIComponent(`Website inquiry from ${form.visitorName}`);
        const body = encodeURIComponent(
          `Name: ${form.visitorName}\nEmail: ${form.visitorEmail || "—"}\nPhone/WhatsApp: ${form.visitorPhone || "—"}\nPreferred contact: ${form.preferredContact}\n\nMessage:\n${form.visitorMessage}`
        );
        window.location.href = `mailto:cyberghoxt.whitehat@gmail.com?subject=${subject}&body=${body}`;
        setSubmitting(false);
        setStage("done");
        pushBot("No Assistant is currently available. Your email client should have opened with your message pre-filled. You can also reach Mr. Vincent directly on WhatsApp.");
        pushBot("Your message has been prepared. The support team will review it and respond as soon as possible.", [
          { kind: "whatsapp", label: "Open WhatsApp", href: OWNER_WHATSAPP },
        ]);
        setForm({ visitorName: "", visitorEmail: "", visitorPhone: "", visitorMessage: "", preferredContact: "Email", requestedRecipient: "" });
        return;
      }

      try {
        const res = await fetch("/api/support", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            visitorName: form.visitorName,
            visitorEmail: form.visitorEmail || null,
            visitorPhone: form.visitorPhone || null,
            visitorMessage: form.visitorMessage,
            preferredContact: form.preferredContact,
            requestedRecipient: form.requestedRecipient || null,
            source: "chatbot",
            website: "", // honeypot
          }),
        });
        const data = await res.json();
        setSubmitting(false);
        if (res.ok && data.success) {
          setStage("done");
          pushBot(data.visitorMessage ?? "Your inquiry has been forwarded.");
          pushBot(
            data.closingMessage ??
              "Your message has been received. The support team will review it and respond as soon as possible.",
            [{ kind: "whatsapp", label: "Open WhatsApp", href: OWNER_WHATSAPP }]
          );
          setForm({ visitorName: "", visitorEmail: "", visitorPhone: "", visitorMessage: "", preferredContact: "Email", requestedRecipient: "" });
        } else {
          setSubmitResult({ ok: false, text: data.error ?? "Submission failed. Please try again." });
        }
      } catch {
        setSubmitting(false);
        setSubmitResult({ ok: false, text: "Network error. Please try again or use WhatsApp." });
      }
    },
    [form, pushBot]
  );

  const handleSend = useCallback(() => {
    const q = input.trim();
    if (!q) return;
    setInput("");
    if (stage === "done") {
      // restart FAQ flow
      setStage("faq");
      setMessages([]);
      setTimeout(() => askQuestion(q), 50);
      return;
    }
    askQuestion(q);
  }, [input, stage, askQuestion]);

  return (
    <>
      {/* Floating launcher */}
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.2, type: "spring", stiffness: 260, damping: 20 }}
        onClick={toggleOpen}
        aria-label={open ? "Close support chat" : "Open support chat"}
        className="fixed bottom-5 right-5 z-[70] grid h-14 w-14 place-items-center rounded-full border border-violet-400/40 bg-gradient-to-br from-violet-600 to-fuchsia-600 text-white shadow-[0_0_36px_-6px_rgba(217,70,239,0.7)] transition-transform hover:scale-105"
      >
        <AnimatePresence mode="wait">
          {open ? (
            <motion.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
              <X className="h-6 w-6" />
            </motion.span>
          ) : (
            <motion.span key="c" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
              <MessageCircle className="h-6 w-6" />
            </motion.span>
          )}
        </AnimatePresence>
        {unreadPulse && !open && (
          <span className="absolute -right-0.5 -top-0.5 flex h-3.5 w-3.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-fuchsia-300 opacity-75" />
            <span className="relative inline-flex h-3.5 w-3.5 rounded-full bg-fuchsia-400" />
          </span>
        )}
      </motion.button>

      {/* Chat panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.96 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="fixed bottom-24 right-4 z-[70] flex h-[min(560px,75vh)] w-[min(380px,calc(100vw-2rem))] flex-col overflow-hidden rounded-2xl border border-border bg-card/95 backdrop-blur-xl shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-border bg-gradient-to-r from-violet-950/50 to-fuchsia-950/40 px-4 py-3">
              <div className="flex items-center gap-2.5">
                <span className="grid h-9 w-9 place-items-center rounded-full border border-violet-400/40 bg-violet-500/20 text-violet-200">
                  <Bot className="h-4.5 w-4.5" />
                </span>
                <div>
                  <p className="font-display text-sm font-semibold text-foreground">Chat with an Agent</p>
                  <p className="text-[10px] text-muted-foreground">FAQ self-service · human support</p>
                </div>
              </div>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close"
                className="grid h-8 w-8 place-items-center rounded-lg text-muted-foreground hover:bg-secondary/60 hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
              {messages.map((m) => (
                <div key={m.id}>
                  <div
                    className={cn(
                      "flex items-start gap-2",
                      m.from === "user" ? "flex-row-reverse" : ""
                    )}
                  >
                    <span
                      className={cn(
                        "grid h-7 w-7 shrink-0 place-items-center rounded-full border",
                        m.from === "bot"
                          ? "border-violet-400/40 bg-violet-500/15 text-violet-200"
                          : "border-sky-400/40 bg-sky-500/15 text-sky-200"
                      )}
                    >
                      {m.from === "bot" ? <Bot className="h-3.5 w-3.5" /> : <User className="h-3.5 w-3.5" />}
                    </span>
                    <div
                      className={cn(
                        "max-w-[78%] rounded-2xl px-3 py-2 text-sm leading-relaxed",
                        m.from === "bot"
                          ? "rounded-tl-sm bg-secondary/60 text-foreground"
                          : "rounded-tr-sm bg-gradient-to-br from-violet-600/30 to-fuchsia-600/25 text-foreground"
                      )}
                    >
                      {m.text}
                    </div>
                  </div>
                  {m.actions && m.actions.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-2 pl-9">
                      {m.actions.map((a, i) => {
                        if (a.kind === "whatsapp") {
                          return (
                            <a
                              key={i}
                              href={a.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/40 bg-emerald-500/15 px-3 py-1.5 text-xs font-medium text-emerald-200 transition-colors hover:bg-emerald-500/25"
                            >
                              <WhatsAppGlyph className="h-3 w-3" />
                              {a.label}
                            </a>
                          );
                        }
                        const isPrimary =
                          a.kind === "ask_human" ||
                          a.kind === "helpful_no" ||
                          a.kind === "helpful_yes";
                        return (
                          <button
                            key={i}
                            onClick={() => handleAction(a)}
                            className={cn(
                              "inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors",
                              isPrimary
                                ? "border-violet-400/40 bg-violet-500/15 text-violet-100 hover:bg-violet-500/25"
                                : "border-border bg-card/60 text-muted-foreground hover:text-foreground"
                            )}
                          >
                            {a.kind === "helpful_yes" && <ThumbsUp className="h-3 w-3" />}
                            {a.kind === "helpful_no" && <ThumbsDown className="h-3 w-3" />}
                            {a.kind === "ask_human" && <Headphones className="h-3 w-3" />}
                            {a.label}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              ))}

              {thinking && (
                <div className="flex items-center gap-2 pl-1">
                  <span className="grid h-7 w-7 place-items-center rounded-full border border-violet-400/40 bg-violet-500/15 text-violet-200">
                    <Bot className="h-3.5 w-3.5" />
                  </span>
                  <div className="flex gap-1 rounded-2xl bg-secondary/60 px-3 py-3">
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-violet-300 [animation-delay:-0.3s]" />
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-violet-300 [animation-delay:-0.15s]" />
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-violet-300" />
                  </div>
                </div>
              )}

              {/* FAQ suggestion chips (shown initially) */}
              {stage === "faq" && suggestions.length > 0 && messages.length <= 1 && !thinking && (
                <div className="space-y-1.5 pl-1">
                  <p className="px-1 text-[10px] uppercase tracking-wider text-muted-foreground">Quick questions</p>
                  <div className="flex flex-wrap gap-1.5">
                    {suggestions.slice(0, 6).map((s) => (
                      <button
                        key={s.id}
                        onClick={() => askQuestion(s.question)}
                        className="rounded-full border border-border bg-card/60 px-2.5 py-1 text-[11px] text-muted-foreground transition-colors hover:border-violet-400/40 hover:text-violet-200"
                      >
                        {s.question}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Human support form */}
              {stage === "human_form" && (
                <form onSubmit={submitHuman} className="mt-2 space-y-2.5 rounded-xl border border-border bg-background/50 p-3">
                  <p className="flex items-center gap-1.5 text-xs font-semibold text-violet-200">
                    <Headphones className="h-3.5 w-3.5" /> Human support request
                  </p>
                  <input
                    value={form.visitorName}
                    onChange={(e) => setForm({ ...form, visitorName: e.target.value })}
                    placeholder="Your name *"
                    className="w-full rounded-lg border border-border bg-background/70 px-3 py-2 text-xs text-foreground outline-none focus:border-violet-400/60"
                  />
                  <input
                    value={form.visitorEmail}
                    onChange={(e) => setForm({ ...form, visitorEmail: e.target.value })}
                    placeholder="Email"
                    type="email"
                    className="w-full rounded-lg border border-border bg-background/70 px-3 py-2 text-xs text-foreground outline-none focus:border-violet-400/60"
                  />
                  <input
                    value={form.visitorPhone}
                    onChange={(e) => setForm({ ...form, visitorPhone: e.target.value })}
                    placeholder="Phone / WhatsApp"
                    className="w-full rounded-lg border border-border bg-background/70 px-3 py-2 text-xs text-foreground outline-none focus:border-violet-400/60"
                  />
                  <textarea
                    value={form.visitorMessage}
                    onChange={(e) => setForm({ ...form, visitorMessage: e.target.value })}
                    placeholder="Your question / message *"
                    rows={3}
                    className="w-full resize-y rounded-lg border border-border bg-background/70 px-3 py-2 text-xs text-foreground outline-none focus:border-violet-400/60"
                  />
                  <div className="grid grid-cols-2 gap-2">
                    <select
                      value={form.preferredContact}
                      onChange={(e) => setForm({ ...form, preferredContact: e.target.value })}
                      className="rounded-lg border border-border bg-background/70 px-2 py-2 text-xs text-foreground outline-none focus:border-violet-400/60"
                    >
                      <option>Email</option>
                      <option>Phone</option>
                      <option>WhatsApp</option>
                    </select>
                    <select
                      value={form.requestedRecipient}
                      onChange={(e) => setForm({ ...form, requestedRecipient: e.target.value })}
                      className="rounded-lg border border-border bg-background/70 px-2 py-2 text-xs text-foreground outline-none focus:border-violet-400/60"
                    >
                      <option value="">Auto-assign</option>
                      <option value="assistant">Assistant</option>
                      <option value="owner">Mr. Vincent CEO</option>
                    </select>
                  </div>
                  {submitResult && (
                    <p className={cn("text-[11px]", submitResult.ok ? "text-emerald-300" : "text-rose-300")}>
                      {submitResult.text}
                    </p>
                  )}
                  <button
                    type="submit"
                    disabled={submitting}
                    className="flex w-full items-center justify-center gap-1.5 rounded-lg bg-gradient-to-r from-violet-600 to-fuchsia-600 px-3 py-2 text-xs font-semibold text-white disabled:opacity-60"
                  >
                    {submitting ? "Sending…" : "Submit"}
                    <Send className="h-3 w-3" />
                  </button>
                  <a
                    href={OWNER_WHATSAPP}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-1.5 rounded-lg border border-emerald-400/40 bg-emerald-500/10 px-3 py-2 text-xs font-semibold text-emerald-200"
                  >
                    <WhatsAppGlyph className="h-3 w-3" />
                    Or chat on WhatsApp now
                  </a>
                </form>
              )}

              {stage === "done" && (
                <div className="flex flex-wrap gap-2 pl-1">
                  <button
                    onClick={() => {
                      setStage("faq");
                      setMessages([]);
                      pushBot(welcome);
                    }}
                    className="inline-flex items-center gap-1.5 rounded-full border border-violet-400/40 bg-violet-500/15 px-3 py-1.5 text-xs font-medium text-violet-100 hover:bg-violet-500/25"
                  >
                    <ArrowRight className="h-3 w-3" /> Ask another question
                  </button>
                </div>
              )}
            </div>

            {/* Input */}
            <div className="border-t border-border p-3">
              <div className="flex items-center gap-2">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleSend();
                    }
                  }}
                  placeholder={stage === "human_form" ? "Use the form above" : "Type a question…"}
                  disabled={stage === "human_form"}
                  className="flex-1 rounded-full border border-border bg-background/70 px-3.5 py-2 text-sm text-foreground outline-none focus:border-violet-400/60 disabled:opacity-50"
                />
                <button
                  onClick={handleSend}
                  disabled={stage === "human_form" || !input.trim()}
                  aria-label="Send"
                  className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-gradient-to-br from-violet-600 to-fuchsia-600 text-white disabled:opacity-40"
                >
                  <Send className="h-4 w-4" />
                </button>
              </div>
              <p className="mt-1.5 text-center text-[10px] text-muted-foreground">
                FAQs are instant · human replies may take time ·{" "}
                <a href={OWNER_WHATSAPP} target="_blank" rel="noopener noreferrer" className="text-emerald-300 hover:underline">
                  WhatsApp for urgent
                </a>
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function WhatsAppGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M19.05 4.91A9.82 9.82 0 0 0 12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.86 9.86 0 0 0 4.74 1.21h.004c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01zM12.04 20.15h-.003a8.2 8.2 0 0 1-4.18-1.14l-.3-.18-3.11.82.83-3.03-.2-.31a8.18 8.18 0 0 1-1.26-4.39c0-4.54 3.7-8.23 8.24-8.23 2.2 0 4.27.86 5.82 2.42a8.18 8.18 0 0 1 2.41 5.82c0 4.54-3.7 8.23-8.24 8.23zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.12-.16.25-.64.81-.78.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.02-.38.11-.5.11-.11.25-.29.37-.43.12-.14.16-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.4-.42-.56-.43-.14 0-.31-.01-.47-.01-.17 0-.43.06-.66.31-.23.25-.86.85-.86 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.14-1.18-.06-.11-.22-.17-.47-.29z" />
    </svg>
  );
}

void Mail;
void Phone;
