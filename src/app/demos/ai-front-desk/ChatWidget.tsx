"use client";

import { useState, useRef, useEffect } from "react";

type Msg = { role: "user" | "assistant"; text: string };

const CHAT_ENDPOINT = "https://ai.portofcams.com/demo/frontdesk/chat";

function sessionId(): string {
  const key = "ikena-frontdesk-session";
  let id = typeof window !== "undefined" ? window.sessionStorage.getItem(key) : null;
  if (!id) {
    id = "web-" + Math.random().toString(36).slice(2) + Date.now().toString(36);
    if (typeof window !== "undefined") window.sessionStorage.setItem(key, id);
  }
  return id;
}

export default function ChatWidget() {
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, sending]);

  async function send(text: string) {
    if (!text.trim() || sending) return;
    setError(null);
    setMessages((m) => [...m, { role: "user", text }]);
    setInput("");
    setSending(true);
    try {
      const res = await fetch(CHAT_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ session_id: sessionId(), message: text }),
      });
      if (!res.ok) throw new Error(`Server returned ${res.status}`);
      const data = await res.json();
      setMessages((m) => [...m, { role: "assistant", text: data.reply as string }]);
    } catch {
      setError(
        "The demo assistant is temporarily unavailable — this happens when the AI backend hits usage limits, not a broken demo. Try again in a bit, or book a call and I'll show it to you live.",
      );
    } finally {
      setSending(false);
    }
  }

  return (
    <div className="frontdesk-widget">
      <div className="frontdesk-window">
        {messages.length === 0 && (
          <div className="frontdesk-empty">
            Say hi, or try: <em>&ldquo;do you have a snorkel trip for 2 this weekend?&rdquo;</em>
          </div>
        )}
        {messages.map((m, i) => (
          <div key={i} className={`frontdesk-bubble frontdesk-${m.role}`}>
            {m.text}
          </div>
        ))}
        {sending && <div className="frontdesk-bubble frontdesk-assistant frontdesk-typing">…</div>}
        {error && <div className="frontdesk-error">{error}</div>}
        <div ref={bottomRef} />
      </div>
      <form
        className="frontdesk-input-row"
        onSubmit={(e) => {
          e.preventDefault();
          send(input);
        }}
      >
        <input
          className="frontdesk-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message…"
          disabled={sending}
        />
        <button className="frontdesk-send" type="submit" disabled={sending || !input.trim()}>
          Send
        </button>
      </form>
    </div>
  );
}
