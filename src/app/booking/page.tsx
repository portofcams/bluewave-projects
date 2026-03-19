"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

const API_BASE = "https://ai.portofcams.com/api/bluewave/booking";

const TOPICS = [
  "AI Strategy",
  "Automation",
  "Custom App",
  "Other",
];

interface Slot {
  time: string;
  available: boolean;
}

interface Confirmation {
  booking_id: number;
  date: string;
  time: string;
  topic: string;
}

function getDaysArray(): Date[] {
  const days: Date[] = [];
  const today = new Date();
  for (let i = 0; i < 14; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    days.push(d);
  }
  return days;
}

function formatDateISO(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function formatDisplayDate(d: Date): string {
  return d.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

function formatTime(time: string): string {
  const [h, m] = time.split(":").map(Number);
  const hour = h % 12 || 12;
  const ampm = h < 12 ? "AM" : "PM";
  return `${hour}:${m.toString().padStart(2, "0")} ${ampm}`;
}

function isWeekend(d: Date): boolean {
  return d.getDay() === 0 || d.getDay() === 6;
}

export default function BookingPage() {
  const [days] = useState(getDaysArray);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [slots, setSlots] = useState<Slot[]>([]);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  // Form state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [topic, setTopic] = useState(TOPICS[0]);
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [confirmation, setConfirmation] = useState<Confirmation | null>(null);

  // Fetch slots when date changes
  useEffect(() => {
    if (!selectedDate) return;
    setSelectedTime(null);
    setLoadingSlots(true);
    setError("");

    fetch(`${API_BASE}/slots?date=${formatDateISO(selectedDate)}`)
      .then((r) => r.json())
      .then((data) => setSlots(data.slots || []))
      .catch(() => setError("Failed to load available times."))
      .finally(() => setLoadingSlots(false));
  }, [selectedDate]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!selectedDate || !selectedTime) return;

    setSubmitting(true);
    setError("");

    try {
      const resp = await fetch(`${API_BASE}/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          date: formatDateISO(selectedDate),
          time: selectedTime,
          topic,
          message: message || undefined,
        }),
      });

      if (!resp.ok) {
        const data = await resp.json().catch(() => ({}));
        throw new Error(data.detail || "Booking failed. Please try again.");
      }

      const data = await resp.json();
      setConfirmation(data);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setSubmitting(false);
    }
  }

  // Group days by week for the calendar grid
  const weekdays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  return (
    <main className="ocean-gradient min-h-screen">
      <Nav />
      <div className="pt-28 pb-20 px-6">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <span className="text-sm font-medium text-ocean-400 uppercase tracking-widest mb-4 block">
              Book a Session
            </span>
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">
              <span className="text-white">1-on-1 </span>
              <span className="text-gradient">Consulting</span>
            </h1>
            <p className="text-lg text-white/40 max-w-xl mx-auto">
              30-minute sessions to discuss your AI strategy, automation needs,
              or custom app project. Pick a time that works for you.
            </p>
          </motion.div>

          <AnimatePresence mode="wait">
            {confirmation ? (
              /* Confirmation screen */
              <motion.div
                key="confirmation"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                className="glass rounded-2xl p-10 text-center"
              >
                <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-green-500/10 flex items-center justify-center">
                  <svg
                    viewBox="0 0 24 24"
                    className="w-8 h-8 text-green-400"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-white mb-2">
                  Booking Confirmed
                </h2>
                <p className="text-white/50 mb-8">
                  A confirmation email has been sent to your inbox.
                </p>
                <div className="glass rounded-xl p-6 mb-8 max-w-sm mx-auto text-left">
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-white/40 text-sm">Date</span>
                      <span className="text-white text-sm font-medium">
                        {confirmation.date}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/40 text-sm">Time</span>
                      <span className="text-white text-sm font-medium">
                        {confirmation.time}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/40 text-sm">Topic</span>
                      <span className="text-white text-sm font-medium">
                        {confirmation.topic}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/40 text-sm">Duration</span>
                      <span className="text-white text-sm font-medium">
                        30 min
                      </span>
                    </div>
                  </div>
                </div>
                <a
                  href="/"
                  className="btn-primary inline-block text-sm font-medium px-8 py-3 rounded-full text-white"
                >
                  Back to Home
                </a>
              </motion.div>
            ) : (
              /* Booking form */
              <motion.div
                key="booking-form"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                {/* Step 1: Date picker */}
                <div className="glass rounded-2xl p-8 mb-6">
                  <h2 className="text-lg font-semibold text-white mb-1">
                    <span className="text-ocean-400 mr-2">1.</span>
                    Pick a Date
                  </h2>
                  <p className="text-sm text-white/30 mb-6">
                    Monday through Friday, next 2 weeks
                  </p>

                  {/* Weekday headers */}
                  <div className="grid grid-cols-7 gap-2 mb-2">
                    {weekdays.map((d) => (
                      <div
                        key={d}
                        className="text-center text-xs text-white/30 font-medium py-1"
                      >
                        {d}
                      </div>
                    ))}
                  </div>

                  {/* Date grid — fill based on day of week */}
                  <div className="grid grid-cols-7 gap-2">
                    {/* Leading empty cells for the first day */}
                    {Array.from({
                      length: ((days[0].getDay() + 6) % 7),
                    }).map((_, i) => (
                      <div key={`empty-${i}`} />
                    ))}

                    {days.map((d) => {
                      const weekend = isWeekend(d);
                      const selected =
                        selectedDate &&
                        formatDateISO(d) === formatDateISO(selectedDate);
                      return (
                        <button
                          key={formatDateISO(d)}
                          disabled={weekend}
                          onClick={() => setSelectedDate(d)}
                          className={`
                            relative py-3 rounded-xl text-sm font-medium transition-all duration-200
                            ${
                              weekend
                                ? "text-white/10 cursor-not-allowed"
                                : selected
                                ? "bg-ocean-500 text-white shadow-lg shadow-ocean-500/30"
                                : "text-white/60 hover:bg-white/5 hover:text-white"
                            }
                          `}
                        >
                          <div className="text-lg">{d.getDate()}</div>
                          <div className="text-[10px] text-white/30 mt-0.5">
                            {d.toLocaleDateString("en-US", { month: "short" })}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Step 2: Time slots */}
                <AnimatePresence>
                  {selectedDate && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="glass rounded-2xl p-8 mb-6"
                    >
                      <h2 className="text-lg font-semibold text-white mb-1">
                        <span className="text-ocean-400 mr-2">2.</span>
                        Pick a Time
                      </h2>
                      <p className="text-sm text-white/30 mb-6">
                        {formatDisplayDate(selectedDate)} (Hawaii Time)
                      </p>

                      {loadingSlots ? (
                        <div className="flex items-center justify-center py-8">
                          <div className="w-6 h-6 border-2 border-ocean-500/30 border-t-ocean-500 rounded-full animate-spin" />
                        </div>
                      ) : slots.length === 0 ? (
                        <p className="text-white/30 text-center py-8">
                          No available slots for this date.
                        </p>
                      ) : (
                        <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                          {slots.map((slot) => (
                            <button
                              key={slot.time}
                              disabled={!slot.available}
                              onClick={() => setSelectedTime(slot.time)}
                              className={`
                                py-3 px-2 rounded-xl text-sm font-medium transition-all duration-200
                                ${
                                  !slot.available
                                    ? "text-white/10 line-through cursor-not-allowed"
                                    : selectedTime === slot.time
                                    ? "bg-ocean-500 text-white shadow-lg shadow-ocean-500/30"
                                    : "text-white/60 bg-white/[0.03] border border-white/[0.06] hover:bg-white/[0.06] hover:text-white"
                                }
                              `}
                            >
                              {formatTime(slot.time)}
                            </button>
                          ))}
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Step 3: Details form */}
                <AnimatePresence>
                  {selectedTime && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <form
                        onSubmit={handleSubmit}
                        className="glass rounded-2xl p-8"
                      >
                        <h2 className="text-lg font-semibold text-white mb-1">
                          <span className="text-ocean-400 mr-2">3.</span>
                          Your Details
                        </h2>
                        <p className="text-sm text-white/30 mb-6">
                          Tell us about yourself and what you want to discuss.
                        </p>

                        <div className="space-y-5">
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                            <div>
                              <label className="block text-sm text-white/50 mb-2">
                                Name
                              </label>
                              <input
                                type="text"
                                required
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Your name"
                                className="w-full bg-white/[0.03] border border-white/[0.06] rounded-xl px-4 py-3 text-white placeholder-white/20 focus:outline-none focus:border-ocean-500/50 focus:ring-1 focus:ring-ocean-500/30 transition-all"
                              />
                            </div>
                            <div>
                              <label className="block text-sm text-white/50 mb-2">
                                Email
                              </label>
                              <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="you@company.com"
                                className="w-full bg-white/[0.03] border border-white/[0.06] rounded-xl px-4 py-3 text-white placeholder-white/20 focus:outline-none focus:border-ocean-500/50 focus:ring-1 focus:ring-ocean-500/30 transition-all"
                              />
                            </div>
                          </div>

                          <div>
                            <label className="block text-sm text-white/50 mb-2">
                              Topic
                            </label>
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                              {TOPICS.map((t) => (
                                <button
                                  key={t}
                                  type="button"
                                  onClick={() => setTopic(t)}
                                  className={`
                                    py-3 px-4 rounded-xl text-sm font-medium transition-all duration-200
                                    ${
                                      topic === t
                                        ? "bg-ocean-500 text-white shadow-lg shadow-ocean-500/30"
                                        : "text-white/50 bg-white/[0.03] border border-white/[0.06] hover:bg-white/[0.06] hover:text-white"
                                    }
                                  `}
                                >
                                  {t}
                                </button>
                              ))}
                            </div>
                          </div>

                          <div>
                            <label className="block text-sm text-white/50 mb-2">
                              Message{" "}
                              <span className="text-white/20">(optional)</span>
                            </label>
                            <textarea
                              rows={3}
                              value={message}
                              onChange={(e) => setMessage(e.target.value)}
                              placeholder="Briefly describe what you'd like to discuss..."
                              className="w-full bg-white/[0.03] border border-white/[0.06] rounded-xl px-4 py-3 text-white placeholder-white/20 focus:outline-none focus:border-ocean-500/50 focus:ring-1 focus:ring-ocean-500/30 transition-all resize-none"
                            />
                          </div>

                          {error && (
                            <motion.div
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm rounded-xl px-4 py-3"
                            >
                              {error}
                            </motion.div>
                          )}

                          <button
                            type="submit"
                            disabled={submitting || !name || !email}
                            className="w-full btn-primary text-white font-medium py-4 rounded-full text-lg transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none"
                          >
                            {submitting ? (
                              <span className="flex items-center justify-center gap-3">
                                <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                Booking...
                              </span>
                            ) : (
                              "Confirm Booking"
                            )}
                          </button>
                        </div>
                      </form>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
      <Footer />
    </main>
  );
}
