"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

const API_URL = "https://ai.portofcams.com/api/bluewave/intake";

const INDUSTRIES = [
  "Restaurant / Hospitality",
  "Real Estate",
  "Construction",
  "Retail",
  "Professional Services",
  "Healthcare",
  "Marketing / Agency",
  "Tech / SaaS",
  "Other",
];

const EMPLOYEE_OPTIONS = ["Just me", "2-5", "6-20", "21-50", "50+"];

const TOOLS = [
  "Email / Gmail",
  "Google Workspace",
  "QuickBooks",
  "Excel / Sheets",
  "Slack",
  "CRM software",
  "Social media tools",
  "Scheduling tools",
  "None / minimal",
  "Other",
];

const HOURS_OPTIONS = ["Less than 5", "5-10", "10-20", "20+"];

const AI_EXP_OPTIONS = [
  { value: "no", label: "No" },
  { value: "a_little", label: "A little" },
  { value: "yes_regularly", label: "Yes, regularly" },
];

const INTERESTS = [
  "Save time on admin",
  "Automate customer communication",
  "Streamline operations",
  "Learn AI myself",
  "Build a custom tool",
  "Not sure yet",
];

const MEETING_OPTIONS = ["Weekly", "Biweekly", "Monthly"];

const TOTAL_STEPS = 4;

interface FormState {
  name: string;
  email: string;
  business_name: string;
  role: string;
  industry: string;
  employee_count: string;
  current_tools: string[];
  hours_on_repetitive: string;
  time_wasters: string;
  extra_time_wish: string;
  ai_experience: string;
  interests: string[];
  meeting_frequency: string;
  notes: string;
}

const initialForm: FormState = {
  name: "",
  email: "",
  business_name: "",
  role: "",
  industry: "",
  employee_count: "",
  current_tools: [],
  hours_on_repetitive: "",
  time_wasters: "",
  extra_time_wish: "",
  ai_experience: "",
  interests: [],
  meeting_frequency: "",
  notes: "",
};

function ProgressBar({ step }: { step: number }) {
  return (
    <div className="flex items-center gap-2 mb-10">
      {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
        <div key={i} className="flex-1 flex items-center gap-2">
          <div
            className={`h-1.5 rounded-full flex-1 transition-all duration-500 ${
              i < step
                ? "bg-ocean-500"
                : i === step
                ? "bg-ocean-500/50"
                : "bg-white/[0.06]"
            }`}
          />
        </div>
      ))}
      <span className="text-xs text-white/30 ml-2 tabular-nums">
        {step + 1}/{TOTAL_STEPS}
      </span>
    </div>
  );
}

function StepHeader({
  number,
  title,
  subtitle,
}: {
  number: number;
  title: string;
  subtitle: string;
}) {
  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold text-white mb-1">
        <span className="text-ocean-400 mr-2">{number}.</span>
        {title}
      </h2>
      <p className="text-sm text-white/30">{subtitle}</p>
    </div>
  );
}

const inputClass =
  "w-full bg-white/[0.03] border border-white/[0.06] rounded-xl px-4 py-3 text-white placeholder-white/20 focus:outline-none focus:border-ocean-500/50 focus:ring-1 focus:ring-ocean-500/30 transition-all";

const selectClass =
  "w-full bg-white/[0.03] border border-white/[0.06] rounded-xl px-4 py-3 text-white/60 focus:outline-none focus:border-ocean-500/50 focus:ring-1 focus:ring-ocean-500/30 transition-all appearance-none";

export default function IntakePage() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<FormState>(initialForm);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const update = (field: keyof FormState, value: string | string[]) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const toggleArrayItem = (field: "current_tools" | "interests", item: string) => {
    setForm((prev) => {
      const arr = prev[field];
      return {
        ...prev,
        [field]: arr.includes(item)
          ? arr.filter((x) => x !== item)
          : [...arr, item],
      };
    });
  };

  const canAdvance = (): boolean => {
    switch (step) {
      case 0:
        return !!(form.name && form.email);
      case 1:
        return !!(form.employee_count && form.hours_on_repetitive);
      case 2:
        return !!(form.time_wasters && form.ai_experience);
      case 3:
        return form.interests.length > 0;
      default:
        return false;
    }
  };

  const next = () => {
    if (step < TOTAL_STEPS - 1) setStep(step + 1);
  };
  const prev = () => {
    if (step > 0) setStep(step - 1);
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    setError("");

    try {
      const payload = {
        ...form,
        current_tools: form.current_tools.join(", "),
        interests: form.interests.join(", "),
      };

      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.detail || "Submission failed. Please try again.");
      }

      setSubmitted(true);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="ocean-gradient min-h-screen">
      <Nav />
      <div className="pt-28 pb-20 px-6">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <span className="text-sm font-medium text-ocean-400 uppercase tracking-widest mb-4 block">
              Get Started
            </span>
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">
              <span className="text-white">Client </span>
              <span className="text-gradient">Intake</span>
            </h1>
            <p className="text-lg text-white/40 max-w-xl mx-auto">
              Tell us about your business and where you spend your time. We will
              use this to build your custom AI roadmap.
            </p>
          </motion.div>

          <AnimatePresence mode="wait">
            {submitted ? (
              /* Success screen */
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                className="glass rounded-2xl p-10 text-center"
              >
                {/* Animated checkmark */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{
                    type: "spring",
                    stiffness: 200,
                    damping: 12,
                    delay: 0.2,
                  }}
                  className="w-20 h-20 mx-auto mb-8 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center"
                >
                  <motion.svg
                    viewBox="0 0 24 24"
                    className="w-10 h-10 text-green-400"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                  >
                    <motion.path
                      d="M4.5 12.75l6 6 9-13.5"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.6, delay: 0.5 }}
                    />
                  </motion.svg>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <h2 className="text-2xl font-bold text-white mb-3">
                    You&apos;re in.
                  </h2>
                  <p className="text-white/50 mb-2 text-lg">
                    We&apos;ll review your answers and send you a calendar link
                    within 24 hours.
                  </p>
                  <p className="text-white/30 text-sm mb-10">
                    Check your inbox at{" "}
                    <span className="text-ocean-400">{form.email}</span> for a
                    confirmation email.
                  </p>
                  <a
                    href="/"
                    className="btn-primary inline-block text-sm font-medium px-8 py-3 rounded-full text-white"
                  >
                    Back to Home
                  </a>
                </motion.div>
              </motion.div>
            ) : (
              /* Multi-step form */
              <motion.div
                key="form"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <ProgressBar step={step} />

                <div className="glass rounded-2xl p-8 sm:p-10">
                  <AnimatePresence mode="wait">
                    {/* Step 1: About You */}
                    {step === 0 && (
                      <motion.div
                        key="step-0"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                      >
                        <StepHeader
                          number={1}
                          title="About You"
                          subtitle="Let's start with the basics."
                        />

                        <div className="space-y-5">
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                            <div>
                              <label className="block text-sm text-white/50 mb-2">
                                Full Name <span className="text-ocean-400">*</span>
                              </label>
                              <input
                                type="text"
                                required
                                value={form.name}
                                onChange={(e) => update("name", e.target.value)}
                                placeholder="Your name"
                                className={inputClass}
                              />
                            </div>
                            <div>
                              <label className="block text-sm text-white/50 mb-2">
                                Email <span className="text-ocean-400">*</span>
                              </label>
                              <input
                                type="email"
                                required
                                value={form.email}
                                onChange={(e) => update("email", e.target.value)}
                                placeholder="you@company.com"
                                className={inputClass}
                              />
                            </div>
                          </div>

                          <div>
                            <label className="block text-sm text-white/50 mb-2">
                              Business Name
                            </label>
                            <input
                              type="text"
                              value={form.business_name}
                              onChange={(e) =>
                                update("business_name", e.target.value)
                              }
                              placeholder="Your company or brand"
                              className={inputClass}
                            />
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                            <div>
                              <label className="block text-sm text-white/50 mb-2">
                                Your Role / Title
                              </label>
                              <input
                                type="text"
                                value={form.role}
                                onChange={(e) => update("role", e.target.value)}
                                placeholder="e.g., Owner, Manager"
                                className={inputClass}
                              />
                            </div>
                            <div>
                              <label className="block text-sm text-white/50 mb-2">
                                Industry
                              </label>
                              <select
                                value={form.industry}
                                onChange={(e) =>
                                  update("industry", e.target.value)
                                }
                                className={selectClass}
                              >
                                <option value="">Select one...</option>
                                {INDUSTRIES.map((ind) => (
                                  <option key={ind} value={ind}>
                                    {ind}
                                  </option>
                                ))}
                              </select>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {/* Step 2: Your Business */}
                    {step === 1 && (
                      <motion.div
                        key="step-1"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                      >
                        <StepHeader
                          number={2}
                          title="Your Business"
                          subtitle="Help us understand how you work today."
                        />

                        <div className="space-y-7">
                          {/* Employee count */}
                          <div>
                            <label className="block text-sm text-white/50 mb-3">
                              How many employees?{" "}
                              <span className="text-ocean-400">*</span>
                            </label>
                            <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
                              {EMPLOYEE_OPTIONS.map((opt) => (
                                <button
                                  key={opt}
                                  type="button"
                                  onClick={() =>
                                    update("employee_count", opt)
                                  }
                                  className={`py-3 px-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                                    form.employee_count === opt
                                      ? "bg-ocean-500 text-white shadow-lg shadow-ocean-500/30"
                                      : "text-white/50 bg-white/[0.03] border border-white/[0.06] hover:bg-white/[0.06] hover:text-white"
                                  }`}
                                >
                                  {opt}
                                </button>
                              ))}
                            </div>
                          </div>

                          {/* Current tools */}
                          <div>
                            <label className="block text-sm text-white/50 mb-3">
                              What tools do you currently use?
                            </label>
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                              {TOOLS.map((tool) => {
                                const selected = form.current_tools.includes(tool);
                                return (
                                  <button
                                    key={tool}
                                    type="button"
                                    onClick={() =>
                                      toggleArrayItem("current_tools", tool)
                                    }
                                    className={`py-3 px-3 rounded-xl text-sm font-medium transition-all duration-200 text-left ${
                                      selected
                                        ? "bg-ocean-500/20 text-ocean-300 border border-ocean-500/40"
                                        : "text-white/50 bg-white/[0.03] border border-white/[0.06] hover:bg-white/[0.06] hover:text-white"
                                    }`}
                                  >
                                    <span className="flex items-center gap-2">
                                      <span
                                        className={`w-4 h-4 rounded border flex-shrink-0 flex items-center justify-center transition-all ${
                                          selected
                                            ? "bg-ocean-500 border-ocean-500"
                                            : "border-white/20"
                                        }`}
                                      >
                                        {selected && (
                                          <svg
                                            viewBox="0 0 12 12"
                                            className="w-3 h-3 text-white"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                          >
                                            <path d="M2 6l3 3 5-5" />
                                          </svg>
                                        )}
                                      </span>
                                      {tool}
                                    </span>
                                  </button>
                                );
                              })}
                            </div>
                          </div>

                          {/* Hours on repetitive tasks */}
                          <div>
                            <label className="block text-sm text-white/50 mb-3">
                              Hours/week on repetitive tasks?{" "}
                              <span className="text-ocean-400">*</span>
                            </label>
                            <div className="grid grid-cols-4 gap-3">
                              {HOURS_OPTIONS.map((opt) => (
                                <button
                                  key={opt}
                                  type="button"
                                  onClick={() =>
                                    update("hours_on_repetitive", opt)
                                  }
                                  className={`py-3 px-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                                    form.hours_on_repetitive === opt
                                      ? "bg-ocean-500 text-white shadow-lg shadow-ocean-500/30"
                                      : "text-white/50 bg-white/[0.03] border border-white/[0.06] hover:bg-white/[0.06] hover:text-white"
                                  }`}
                                >
                                  {opt}
                                </button>
                              ))}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {/* Step 3: Time Sinks */}
                    {step === 2 && (
                      <motion.div
                        key="step-2"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                      >
                        <StepHeader
                          number={3}
                          title="Time Sinks"
                          subtitle="Where does your time disappear?"
                        />

                        <div className="space-y-6">
                          <div>
                            <label className="block text-sm text-white/50 mb-2">
                              What are your 3 biggest time wasters?{" "}
                              <span className="text-ocean-400">*</span>
                            </label>
                            <textarea
                              rows={4}
                              value={form.time_wasters}
                              onChange={(e) =>
                                update("time_wasters", e.target.value)
                              }
                              placeholder="e.g., Responding to the same customer questions, manually creating invoices, scheduling appointments..."
                              className={`${inputClass} resize-none`}
                            />
                          </div>

                          <div>
                            <label className="block text-sm text-white/50 mb-2">
                              What would you do with 10 extra hours per week?
                            </label>
                            <textarea
                              rows={3}
                              value={form.extra_time_wish}
                              onChange={(e) =>
                                update("extra_time_wish", e.target.value)
                              }
                              placeholder="More sales calls? Family time? Finally launch that project?"
                              className={`${inputClass} resize-none`}
                            />
                          </div>

                          <div>
                            <label className="block text-sm text-white/50 mb-3">
                              Have you tried any AI tools before?{" "}
                              <span className="text-ocean-400">*</span>
                            </label>
                            <div className="grid grid-cols-3 gap-3">
                              {AI_EXP_OPTIONS.map((opt) => (
                                <button
                                  key={opt.value}
                                  type="button"
                                  onClick={() =>
                                    update("ai_experience", opt.value)
                                  }
                                  className={`py-3 px-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                                    form.ai_experience === opt.value
                                      ? "bg-ocean-500 text-white shadow-lg shadow-ocean-500/30"
                                      : "text-white/50 bg-white/[0.03] border border-white/[0.06] hover:bg-white/[0.06] hover:text-white"
                                  }`}
                                >
                                  {opt.label}
                                </button>
                              ))}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {/* Step 4: Goals */}
                    {step === 3 && (
                      <motion.div
                        key="step-3"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                      >
                        <StepHeader
                          number={4}
                          title="Goals"
                          subtitle="What does success look like for you?"
                        />

                        <div className="space-y-7">
                          {/* Interests checkboxes */}
                          <div>
                            <label className="block text-sm text-white/50 mb-3">
                              What interests you most?{" "}
                              <span className="text-ocean-400">*</span>
                            </label>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                              {INTERESTS.map((item) => {
                                const selected = form.interests.includes(item);
                                return (
                                  <button
                                    key={item}
                                    type="button"
                                    onClick={() =>
                                      toggleArrayItem("interests", item)
                                    }
                                    className={`py-3 px-4 rounded-xl text-sm font-medium transition-all duration-200 text-left ${
                                      selected
                                        ? "bg-ocean-500/20 text-ocean-300 border border-ocean-500/40"
                                        : "text-white/50 bg-white/[0.03] border border-white/[0.06] hover:bg-white/[0.06] hover:text-white"
                                    }`}
                                  >
                                    <span className="flex items-center gap-2">
                                      <span
                                        className={`w-4 h-4 rounded border flex-shrink-0 flex items-center justify-center transition-all ${
                                          selected
                                            ? "bg-ocean-500 border-ocean-500"
                                            : "border-white/20"
                                        }`}
                                      >
                                        {selected && (
                                          <svg
                                            viewBox="0 0 12 12"
                                            className="w-3 h-3 text-white"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                          >
                                            <path d="M2 6l3 3 5-5" />
                                          </svg>
                                        )}
                                      </span>
                                      {item}
                                    </span>
                                  </button>
                                );
                              })}
                            </div>
                          </div>

                          {/* Meeting frequency */}
                          <div>
                            <label className="block text-sm text-white/50 mb-3">
                              Preferred meeting frequency
                            </label>
                            <div className="grid grid-cols-3 gap-3">
                              {MEETING_OPTIONS.map((opt) => (
                                <button
                                  key={opt}
                                  type="button"
                                  onClick={() =>
                                    update("meeting_frequency", opt)
                                  }
                                  className={`py-3 px-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                                    form.meeting_frequency === opt
                                      ? "bg-ocean-500 text-white shadow-lg shadow-ocean-500/30"
                                      : "text-white/50 bg-white/[0.03] border border-white/[0.06] hover:bg-white/[0.06] hover:text-white"
                                  }`}
                                >
                                  {opt}
                                </button>
                              ))}
                            </div>
                          </div>

                          {/* Notes */}
                          <div>
                            <label className="block text-sm text-white/50 mb-2">
                              Anything else we should know?{" "}
                              <span className="text-white/20">(optional)</span>
                            </label>
                            <textarea
                              rows={3}
                              value={form.notes}
                              onChange={(e) => update("notes", e.target.value)}
                              placeholder="Budget, timeline, specific pain points..."
                              className={`${inputClass} resize-none`}
                            />
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Error */}
                  {error && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="mt-6 bg-red-500/10 border border-red-500/20 text-red-400 text-sm rounded-xl px-4 py-3"
                    >
                      {error}
                    </motion.div>
                  )}

                  {/* Navigation buttons */}
                  <div className="flex items-center justify-between mt-8 pt-6 border-t border-white/[0.06]">
                    {step > 0 ? (
                      <button
                        type="button"
                        onClick={prev}
                        className="flex items-center gap-2 text-white/40 hover:text-white text-sm font-medium transition-colors"
                      >
                        <svg
                          viewBox="0 0 24 24"
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path d="M19 12H5M12 19l-7-7 7-7" />
                        </svg>
                        Back
                      </button>
                    ) : (
                      <div />
                    )}

                    {step < TOTAL_STEPS - 1 ? (
                      <button
                        type="button"
                        onClick={next}
                        disabled={!canAdvance()}
                        className="btn-primary text-white font-medium py-3 px-8 rounded-full text-sm transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none flex items-center gap-2"
                      >
                        Continue
                        <svg
                          viewBox="0 0 24 24"
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={handleSubmit}
                        disabled={submitting || !canAdvance()}
                        className="btn-primary text-white font-medium py-3 px-8 rounded-full text-sm transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none"
                      >
                        {submitting ? (
                          <span className="flex items-center gap-3">
                            <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            Submitting...
                          </span>
                        ) : (
                          "Submit Questionnaire"
                        )}
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
      <Footer />
    </main>
  );
}
