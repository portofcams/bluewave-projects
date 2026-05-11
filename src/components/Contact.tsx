"use client";

import { useReveal } from "@/hooks/useReveal";
import { useState } from "react";

interface FormData {
  name: string;
  email: string;
  interest: string;
  message: string;
}

export default function Contact() {
  const { ref, inView } = useReveal();
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    interest: "",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [toast, setToast] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const saveToLocalStorage = (data: FormData) => {
    try {
      const key = "bluewave_contact_submissions";
      const existing = JSON.parse(localStorage.getItem(key) || "[]");
      existing.push({
        ...data,
        date: new Date().toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        }),
      });
      localStorage.setItem(key, JSON.stringify(existing));
    } catch {
      // localStorage not available, that's fine
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setToast(null);

    try {
      // POST to AlohaCalendar feedback API (shared email endpoint)
      const feedbackMessage = [
        `Name: ${formData.name}`,
        `Email: ${formData.email}`,
        formData.interest ? `Interest: ${formData.interest}` : null,
        `\n${formData.message}`,
      ]
        .filter(Boolean)
        .join("\n");

      const res = await fetch(
        "https://alohacalendar.com/api/feedback",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            message: feedbackMessage,
            page: "BlueWave Contact Form",
          }),
        }
      );

      if (!res.ok) {
        throw new Error("Server responded with an error");
      }

      // Save to localStorage for admin dashboard
      saveToLocalStorage(formData);

      // Reset form
      setFormData({ name: "", email: "", interest: "", message: "" });
      setToast({
        type: "success",
        message: "Message sent! We'll be in touch.",
      });

      // Auto-dismiss toast after 5 seconds
      setTimeout(() => setToast(null), 5000);
    } catch {
      // Still save to localStorage even if API fails
      saveToLocalStorage(formData);

      setToast({
        type: "error",
        message:
          "Something went wrong, but we saved your message. We'll follow up soon.",
      });
      setTimeout(() => setToast(null), 5000);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-32 px-6 relative">
      <div className="absolute inset-0 bg-gradient-to-t from-ocean-950/50 to-transparent" />

      <div className="max-w-4xl mx-auto relative">
        <div
          ref={ref}
          className={`reveal-up ${inView ? "in" : ""} text-center`}
        >
          <span className="text-sm font-medium text-ocean-400 uppercase tracking-widest mb-4 block">
            Let&apos;s Talk
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
            <span className="text-white">Talk to</span>{" "}
            <span className="text-gradient">a working contractor.</span>
          </h2>
          <p className="text-lg text-white/40 max-w-xl mx-auto mb-12">
            Free trial is the fastest path, but if you want to talk it through first — drop a note and we&apos;ll get back same day.
          </p>
        </div>

        <div
          className={`reveal-up reveal-d-2 ${inView ? "in" : ""} glass rounded-2xl p-8 sm:p-12`}
        >
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm text-white/40 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/20 focus:outline-none focus:border-ocean-500/50 focus:ring-1 focus:ring-ocean-500/30 transition-all"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="block text-sm text-white/40 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/20 focus:outline-none focus:border-ocean-500/50 focus:ring-1 focus:ring-ocean-500/30 transition-all"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm text-white/40 mb-2">
                What are you interested in?
              </label>
              <select
                name="interest"
                value={formData.interest}
                onChange={handleChange}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white/60 focus:outline-none focus:border-ocean-500/50 focus:ring-1 focus:ring-ocean-500/30 transition-all appearance-none"
              >
                <option value="">Select one...</option>
                <option value="solo-trial">Try the Solo free trial</option>
                <option value="pro-demo">See a live Pro demo</option>
                <option value="founding-builder">Founding Builder ($499/mo)</option>
                <option value="property-brief">Property Brief ($15/mo)</option>
                <option value="aloha">Aloha Off-Market Network</option>
                <option value="partnership">Partnership / integration</option>
                <option value="other">Something else</option>
              </select>
            </div>

            <div>
              <label className="block text-sm text-white/40 mb-2">
                Tell us more
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={4}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/20 focus:outline-none focus:border-ocean-500/50 focus:ring-1 focus:ring-ocean-500/30 transition-all resize-none"
                placeholder="What's on your mind?"
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full btn-primary py-4 rounded-xl text-white font-medium text-lg disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
            >
              {submitting ? (
                <span className="flex items-center justify-center gap-3">
                  <svg
                    className="animate-spin w-5 h-5"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                    />
                  </svg>
                  Sending...
                </span>
              ) : (
                "Send It"
              )}
            </button>
          </form>
        </div>

        {/* Toast notification */}
        {toast && (
          <div
            className="anim-mount-pop fixed bottom-6 right-6 z-50"
          >
              <div
                className={`flex items-center gap-3 px-5 py-4 rounded-xl shadow-2xl border ${
                  toast.type === "success"
                    ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400"
                    : "bg-rose-500/10 border-rose-500/20 text-rose-400"
                }`}
                style={{ backdropFilter: "blur(20px)" }}
              >
                {toast.type === "success" ? (
                  <svg
                    viewBox="0 0 24 24"
                    className="w-5 h-5 shrink-0"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ) : (
                  <svg
                    viewBox="0 0 24 24"
                    className="w-5 h-5 shrink-0"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                  </svg>
                )}
                <p className="text-sm font-medium">{toast.message}</p>
                <button
                  onClick={() => setToast(null)}
                  className="ml-2 text-current opacity-60 hover:opacity-100 transition-opacity"
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
        )}
      </div>
    </section>
  );
}
