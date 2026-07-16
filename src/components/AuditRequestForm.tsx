"use client";

import { useState } from "react";
import posthog from "posthog-js";

const API_URL = "https://ai.portofcams.com/api/bluewave/audit-request";

const OPERATOR_TYPES = [
  "Fishing charter",
  "Snorkel / reef tour",
  "Scuba diving",
  "Sailing / catamaran cruise",
  "Surf school",
  "Whale watch / eco-tour",
  "Other ocean operator",
];

function capture(event: string, props: Record<string, unknown> = {}) {
  if (typeof window !== "undefined" && process.env.NEXT_PUBLIC_POSTHOG_KEY) {
    posthog.capture(event, props);
  }
}

const inputClass =
  "w-full bg-white/[0.03] border border-white/[0.08] rounded-xl px-4 py-3 text-white placeholder-white/25 focus:outline-none focus:border-wave-500/50 focus:ring-1 focus:ring-wave-500/30 transition-all";

export default function AuditRequestForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    website: "",
    operator_type: "",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const update = (field: keyof typeof form, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const canSubmit = form.name.trim() && /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email.trim());

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit || submitting) return;
    setSubmitting(true);
    setError("");
    // Tie the lead back to the specific prospect we emailed (?ref=slug), if present.
    const ref =
      typeof window !== "undefined"
        ? new URLSearchParams(window.location.search).get("ref") || ""
        : "";
    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          ref,
          source: ref ? `booked-direct:${ref}` : "booked-direct",
        }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.detail || "Something went wrong. Please email portofcams@gmail.com.");
      }
      capture("audit_request_submitted", { operator_type: form.operator_type, has_website: !!form.website, ref });
      setSubmitted(true);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="rounded-2xl border border-wave-500/30 bg-wave-500/5 p-8 text-center">
        <div className="text-2xl font-bold text-white mb-2">Got it — your audit is on the way.</div>
        <p className="text-white/60 max-w-md mx-auto">
          We&apos;ll send your recorded visibility audit to <span className="text-wave-300">{form.email}</span> within
          48 hours. Nothing else will hit your inbox in the meantime — no list, no drip, just the audit.
        </p>
        <p className="text-white/35 text-sm mt-4">
          Prefer to talk it through?{" "}
          <a href="/booking" className="text-wave-400 hover:text-wave-300 transition-colors">Book a 15-minute call →</a>
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 sm:p-8">
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs uppercase tracking-wider text-white/45 mb-2">Your name *</label>
          <input
            type="text" required value={form.name}
            onChange={(e) => update("name", e.target.value)}
            className={inputClass} placeholder="Kai Nāmaka"
          />
        </div>
        <div>
          <label className="block text-xs uppercase tracking-wider text-white/45 mb-2">Email *</label>
          <input
            type="email" required value={form.email}
            onChange={(e) => update("email", e.target.value)}
            className={inputClass} placeholder="you@youroperation.com"
          />
        </div>
        <div>
          <label className="block text-xs uppercase tracking-wider text-white/45 mb-2">Your website</label>
          <input
            type="text" value={form.website}
            onChange={(e) => update("website", e.target.value)}
            className={inputClass} placeholder="youroperation.com"
          />
        </div>
        <div>
          <label className="block text-xs uppercase tracking-wider text-white/45 mb-2">Operator type</label>
          <select
            value={form.operator_type}
            onChange={(e) => update("operator_type", e.target.value)}
            className={`${inputClass} appearance-none ${form.operator_type ? "text-white" : "text-white/40"}`}
          >
            <option value="" className="bg-deep-800">Select one…</option>
            {OPERATOR_TYPES.map((t) => (
              <option key={t} value={t} className="bg-deep-800 text-white">{t}</option>
            ))}
          </select>
        </div>
      </div>
      <div className="mt-4">
        <label className="block text-xs uppercase tracking-wider text-white/45 mb-2">Anything specific? (optional)</label>
        <textarea
          rows={3} value={form.message}
          onChange={(e) => update("message", e.target.value)}
          className={`${inputClass} resize-none`}
          placeholder="e.g. 'We lose a lot of bookings to Viator and want to fix it.'"
        />
      </div>

      {error && <p className="text-lava-500 text-sm mt-4">{error}</p>}

      <div className="mt-6 flex flex-col sm:flex-row sm:items-center gap-4">
        <button
          type="submit" disabled={!canSubmit || submitting}
          className="btn-primary px-8 py-3.5 rounded-full text-sm font-semibold text-white disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {submitting ? "Sending…" : "Send my audit request →"}
        </button>
        <span className="text-xs text-white/35">
          Free. No obligation. We never add you to a list — you get the audit, nothing else.
        </span>
      </div>
    </form>
  );
}
