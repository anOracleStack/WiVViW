"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ENGINE_REGISTRY, JOURNEY_ORDER } from "@/lib/engines/engine-contract";

type Message = { role: "user" | "assistant"; text: string };

const CHIPS = ["What's next?", "How does this work?", "Where do I start?"] as const;

const STATIC_ANSWERS: Record<string, string> = {
  "what's next?":
    "Start with dRANb if you need a name, or open any engine that fits where you are. We only ask you to sign in when you run or save.",
  "how does this work?":
    "Fill in what you know, explore each step, and run when you're ready. Your work stays in the session until you sign in to save.",
  "where do i start?":
    "Open dRANb from the sidebar or tap a node below. Everything is explorable before you commit.",
};

function routeHint(pathname: string): string | null {
  const match = pathname.match(/\/dashboard\/engines\/([^/]+)/);
  if (!match) return null;
  const id = match[1] as keyof typeof ENGINE_REGISTRY;
  const engine = ENGINE_REGISTRY[id];
  if (!engine?.label) return null;
  return `You're on ${engine.label} — ${engine.outcomeHint}. Draft freely; sign in when you want to run or save.`;
}

function replyFor(input: string, pathname: string): string {
  const key = input.trim().toLowerCase();
  if (STATIC_ANSWERS[key]) return STATIC_ANSWERS[key];
  if (key.includes("name") || key.includes("dranb"))
    return `${ENGINE_REGISTRY.dranb.outcomeHint}. Open dRANb from the sidebar to draft a brief.`;
  if (key.includes("brandle") || key.includes("domain"))
    return `${ENGINE_REGISTRY.brandl.outcomeHint}. Open brandL once you have a shortlist.`;
  if (key.includes("privacy") || key.includes("legal"))
    return "See Privacy and Legal in the footer for how we handle data.";
  const hint = routeHint(pathname);
  if (hint) return hint;
  return "Explore any engine from the sidebar. Sign in only when you run, save, or export.";
}

const HIDDEN_PREFIXES = ["/login", "/signup", "/auth"];

export default function GuideChatbot() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      text: "Ask anything — or pick a chip below.",
    },
  ]);
  const [privacySeen, setPrivacySeen] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);

  const hidden = HIDDEN_PREFIXES.some((p) => pathname.startsWith(p));
  const reducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, open]);

  if (hidden) return null;

  const send = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;
    setMessages((m) => [
      ...m,
      { role: "user", text: trimmed },
      { role: "assistant", text: replyFor(trimmed, pathname) },
    ]);
    setInput("");
  };

  return (
    <>
      {!open && (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className={`guide-fab fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full border border-[hsl(var(--glass-border))] bg-[hsl(var(--shell-surface)/0.92)] shadow-lg backdrop-blur-md transition hover:scale-105 ${reducedMotion ? "" : "guide-fab-pulse"}`}
          aria-label="Open guide"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path
              d="M12 3C7.03 3 3 6.58 3 11c0 2.39 1.19 4.52 3.07 6.01L5 21l4.01-2.35C10.28 18.87 11.12 19 12 19c4.97 0 9-3.58 9-8s-4.03-8-9-8z"
              stroke="hsl(var(--genesis-gold))"
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      )}

      {open && (
        <div
          className="fixed bottom-6 right-6 z-50 flex w-[360px] max-w-[calc(100vw-48px)] flex-col overflow-hidden rounded-2xl border border-[hsl(var(--glass-border))] bg-[hsl(var(--shell-surface)/0.95)] shadow-2xl backdrop-blur-xl"
          role="dialog"
          aria-label="Guide"
        >
          <header className="flex items-center justify-between border-b border-[hsl(var(--glass-border))] px-4 py-3">
            <span className="font-display text-sm font-bold">Guide</span>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="rounded-lg px-2 py-1 text-xs text-[hsl(var(--text-muted))] hover:text-[hsl(var(--text-primary))]"
              aria-label="Close guide"
            >
              Close
            </button>
          </header>

          {!privacySeen && (
            <p className="border-b border-[hsl(var(--glass-border))] px-4 py-2 text-[10px] leading-relaxed text-[hsl(var(--text-muted))]">
              Session-only on this device until you sign in.{" "}
              <Link href="/privacy" className="underline">
                Privacy
              </Link>
              <button
                type="button"
                className="ml-2 underline"
                onClick={() => setPrivacySeen(true)}
              >
                Dismiss
              </button>
            </p>
          )}

          <div ref={listRef} className="flex max-h-[280px] flex-1 flex-col gap-3 overflow-y-auto px-4 py-3">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`rounded-xl px-3 py-2 text-sm leading-relaxed ${
                  m.role === "user"
                    ? "ml-8 bg-[hsl(var(--genesis-gold)/0.15)] text-[hsl(var(--text-primary))]"
                    : "mr-4 bg-[hsl(var(--glass-bg))] text-[hsl(var(--text-muted))]"
                }`}
              >
                {m.text}
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-2 border-t border-[hsl(var(--glass-border))] px-4 py-2">
            {CHIPS.map((chip) => (
              <button
                key={chip}
                type="button"
                onClick={() => send(chip)}
                className="rounded-full border border-[hsl(var(--glass-border))] px-2.5 py-1 text-[10px] text-[hsl(var(--text-muted))] transition hover:border-[hsl(var(--genesis-gold)/0.4)] hover:text-[hsl(var(--text-primary))]"
              >
                {chip}
              </button>
            ))}
          </div>

          <div className="flex gap-2 border-t border-[hsl(var(--glass-border))] p-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && send(input)}
              placeholder="Ask anything…"
              className="input-field flex-1 py-2 text-sm"
            />
            <button type="button" onClick={() => send(input)} className="btn-primary px-4 py-2">
              Send
            </button>
          </div>

          <div className="flex flex-wrap justify-center gap-2 border-t border-[hsl(var(--glass-border))] px-3 py-2">
            {JOURNEY_ORDER.slice(0, 4).map((id) => {
              const e = ENGINE_REGISTRY[id];
              return (
                <Link
                  key={id}
                  href={e.route}
                  className="text-[10px] text-[hsl(var(--text-muted))] hover:text-[hsl(var(--text-primary))]"
                  onClick={() => setOpen(false)}
                >
                  {e.label}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
}
