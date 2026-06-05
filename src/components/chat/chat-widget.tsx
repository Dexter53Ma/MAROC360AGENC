"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Loader2, MessageCircle, Send, Sparkles, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { getGreeting, getFallbackSuggestions, retrieve } from "@/lib/chat/engine";
import type { ChatMessage, ChatResponse } from "@/lib/chat/types";

const STORAGE_KEY = "maroc360-chat-v1";
const OPEN_KEY = "maroc360-chat-open-v1";
const MAX_HISTORY = 50;

type StoredState = {
  messages: ChatMessage[];
  hasGreeted: boolean;
};

function loadStoredState(): StoredState {
  if (typeof window === "undefined") {
    return { messages: [], hasGreeted: false };
  }
  try {
    const raw = window.sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return { messages: [], hasGreeted: false };
    const parsed = JSON.parse(raw) as Partial<StoredState>;
    return {
      messages: Array.isArray(parsed.messages) ? parsed.messages : [],
      hasGreeted: Boolean(parsed.hasGreeted),
    };
  } catch {
    return { messages: [], hasGreeted: false };
  }
}

function loadOpenState(): boolean {
  if (typeof window === "undefined") return false;
  try {
    return window.sessionStorage.getItem(OPEN_KEY) === "1";
  } catch {
    return false;
  }
}

function makeId() {
  return `m_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;
}

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [hasGreeted, setHasGreeted] = useState(false);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hydrated, setHydrated] = useState(false);

  const scrollRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    const stored = loadStoredState();
    setMessages(stored.messages);
    setHasGreeted(stored.hasGreeted);
    setIsOpen(loadOpenState());
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify({ messages, hasGreeted }));
    } catch {}
  }, [hydrated, messages, hasGreeted]);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.sessionStorage.setItem(OPEN_KEY, isOpen ? "1" : "0");
    } catch {}
  }, [hydrated, isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const node = scrollRef.current;
    if (node) {
      node.scrollTo({ top: node.scrollHeight, behavior: "smooth" });
    }
  }, [isOpen, messages, isLoading]);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen]);

  const sendMessage = useCallback(
    async (text: string) => {
      const trimmed = text.trim();
      if (!trimmed || isLoading) return;

      setError(null);
      const userMessage: ChatMessage = {
        id: makeId(),
        role: "user",
        content: trimmed,
        createdAt: Date.now(),
      };
      setMessages((prev) => [...prev, userMessage].slice(-MAX_HISTORY));
      setInput("");
      setIsLoading(true);

      try {
        const response = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            messages: [{ role: "user", content: trimmed }],
          }),
        });

        if (!response.ok) {
          throw new Error(`Request failed (${response.status})`);
        }

        const data = (await response.json()) as ChatResponse;
        const reply = data?.reply?.trim() || "I could not generate a reply just now. Please try again.";

        const assistantMessage: ChatMessage = {
          id: makeId(),
          role: "assistant",
          content: reply,
          sources: data?.sources,
          createdAt: Date.now(),
        };
        setMessages((prev) => [...prev, assistantMessage].slice(-MAX_HISTORY));
      } catch {
        const local = retrieve(trimmed);
        const fallback: ChatMessage = {
          id: makeId(),
          role: "assistant",
          content:
            local.reply +
            "\n\n_Note: live chat is temporarily unavailable, so this is an offline answer._",
          sources: local.sources,
          createdAt: Date.now(),
        };
        setMessages((prev) => [...prev, fallback].slice(-MAX_HISTORY));
        setError("Showing an offline answer — the chat service is unreachable.");
      } finally {
        setIsLoading(false);
      }
    },
    [isLoading],
  );

  const handleToggle = useCallback(() => {
    setIsOpen((prev) => {
      const next = !prev;
      if (next && !hasGreeted) {
        const greeting: ChatMessage = {
          id: makeId(),
          role: "assistant",
          content: getGreeting(),
          createdAt: Date.now(),
        };
        setMessages((curr) => [...curr, greeting]);
        setHasGreeted(true);
      }
      return next;
    });
  }, [hasGreeted]);

  const handleReset = useCallback(() => {
    setMessages([]);
    setHasGreeted(false);
    setError(null);
    const greeting: ChatMessage = {
      id: makeId(),
      role: "assistant",
      content: getGreeting(),
      createdAt: Date.now(),
    };
    setMessages([greeting]);
    setHasGreeted(true);
  }, []);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        void sendMessage(input);
      }
    },
    [input, sendMessage],
  );

  const suggestions = useMemo(() => {
    const lastAssistant = [...messages].reverse().find((m) => m.role === "assistant");
    if (!lastAssistant) return getFallbackSuggestions();
    const lower = lastAssistant.content.toLowerCase();
    const all = getFallbackSuggestions();
    const scored = all
    .map((s) => {
      const tokens = s.toLowerCase().split(/\s+/).filter((t) => t.length > 4);
      const hits = tokens.filter((t) => lower.includes(t)).length;
      return { s, hits };
    })
    .sort((a, b) => b.hits - a.hits);
    return scored.map((x) => x.s).slice(0, 4);
  }, [messages]);

  const showSuggestions = messages.length <= 1 && !isLoading;

  return (
    <div
      className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-[100] flex flex-col items-end gap-3 font-sans pb-safe pr-safe"
      aria-live="polite"
    >
      {isOpen && (
        <div
          className={cn(
            "w-[min(380px,calc(100vw-2rem))] sm:w-[380px]",
            "h-[min(560px,calc(100vh-7rem))] sm:h-[560px]",
            "flex flex-col overflow-hidden rounded-2xl border border-text-primary/10 bg-surface-tertiary shadow-2xl",
            "origin-bottom-right animate-in fade-in slide-in-from-bottom-2 duration-200",
          )}
          role="dialog"
          aria-label="Maroc 360 chat assistant"
        >
          <div className="flex items-center justify-between gap-3 bg-brand-yellow px-4 py-3">
            <div className="flex items-center gap-3 min-w-0">
              <div className="grid size-9 place-items-center rounded-full bg-text-primary text-brand-yellow shrink-0">
                <Sparkles className="size-4" aria-hidden />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-text-primary leading-tight">
                  Maroc 360 Assistant
                </p>
                <p className="text-xs text-text-primary/70 leading-tight">
                  Ask anything about us
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={handleReset}
                className="rounded-md px-2 py-1 text-xs font-medium text-text-primary/80 hover:bg-text-primary/10 transition-colors"
                aria-label="Restart conversation"
              >
                Reset
              </button>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="grid size-8 place-items-center rounded-md text-text-primary/80 hover:bg-text-primary/10 transition-colors"
                aria-label="Close chat"
              >
                <X className="size-4" aria-hidden />
              </button>
            </div>
          </div>

          <div
            ref={scrollRef}
            className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-3"
          >
            {messages.map((m) => (
              <MessageBubble key={m.id} message={m} />
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="flex items-center gap-2 rounded-2xl rounded-bl-sm bg-surface-secondary px-4 py-2.5 text-sm text-text-primary">
                  <Loader2 className="size-3.5 animate-spin" aria-hidden />
                  <span>Thinking…</span>
                </div>
              </div>
            )}
            {error && (
              <p className="text-xs text-text-primary/60 text-center px-2">{error}</p>
            )}
          </div>

          {showSuggestions && (
            <div className="px-4 pb-2 flex flex-wrap gap-2">
              {suggestions.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => void sendMessage(s)}
                  className="rounded-full border border-text-primary/15 bg-surface-primary px-3 py-1.5 text-xs text-text-primary hover:border-text-primary/30 hover:bg-surface-secondary transition-colors"
                >
                  {s}
                </button>
              ))}
            </div>
          )}

          <form
            className="border-t border-text-primary/10 bg-surface-tertiary p-3"
            onSubmit={(e) => {
              e.preventDefault();
              void sendMessage(input);
            }}
          >
            <div className="flex items-end gap-2 rounded-xl border border-text-primary/15 bg-surface-primary focus-within:border-text-primary/30 transition-colors px-3 py-2">
              <label htmlFor="maroc360-chat-input" className="sr-only">
                Ask the Maroc 360 assistant
              </label>
              <textarea
                id="maroc360-chat-input"
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type your question…"
                rows={1}
                className="flex-1 resize-none bg-transparent text-sm text-text-primary placeholder:text-text-primary/50 outline-none max-h-28"
              />
              <button
                type="submit"
                disabled={isLoading || input.trim().length === 0}
                className="grid size-9 place-items-center rounded-lg bg-text-primary text-brand-yellow disabled:opacity-40 disabled:cursor-not-allowed hover:opacity-90 transition-opacity"
                aria-label="Send message"
              >
                {isLoading ? (
                  <Loader2 className="size-4 animate-spin" aria-hidden />
                ) : (
                  <Send className="size-4" aria-hidden />
                )}
              </button>
            </div>
            <p className="mt-2 text-[10px] text-text-primary/50 text-center">
              Answers are generated from our knowledge base. For sensitive topics, write to{" "}
              <a
                href="mailto:hello@maroc360.agency"
                className="underline hover:text-text-primary"
              >
                hello@maroc360.agency
              </a>
              .
            </p>
          </form>
        </div>
      )}

      <button
        type="button"
        onClick={handleToggle}
        aria-label={isOpen ? "Close chat assistant" : "Open chat assistant"}
        aria-expanded={isOpen}
        className={cn(
          "group grid size-14 place-items-center rounded-full shadow-lg",
          "bg-brand-yellow text-text-primary",
          "hover:scale-[1.04] active:scale-[0.98] transition-transform",
          "ring-1 ring-text-primary/10",
        )}
      >
        <span
          className={cn(
            "absolute -top-1 -right-1 grid size-5 place-items-center rounded-full bg-text-primary text-brand-yellow text-[10px] font-semibold transition-opacity",
            isOpen ? "opacity-0 pointer-events-none" : "opacity-100",
          )}
          aria-hidden
        >
          1
        </span>
        {isOpen ? (
          <X className="size-6" aria-hidden />
        ) : (
          <MessageCircle className="size-6" aria-hidden />
        )}
      </button>
    </div>
  );
}

function MessageBubble({ message }: { message: ChatMessage }) {
  const isUser = message.role === "user";
  return (
    <div className={cn("flex", isUser ? "justify-end" : "justify-start")}>
      <div
        className={cn(
          "max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed whitespace-pre-wrap break-words",
          isUser
            ? "bg-text-primary text-surface-tertiary rounded-br-sm"
            : "bg-surface-secondary text-text-primary rounded-bl-sm",
        )}
      >
        {message.content}
        {message.sources && message.sources.length > 0 && !isUser && (
          <div className="mt-2 pt-2 border-t border-text-primary/10">
            <p className="text-[10px] uppercase tracking-wide text-text-primary/60">
              Related
            </p>
            <ul className="mt-1 flex flex-wrap gap-1.5">
              {message.sources.map((s) => (
                <li
                  key={s}
                  className="rounded-full bg-surface-tertiary px-2 py-0.5 text-[10px] text-text-primary/80"
                >
                  {s}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
