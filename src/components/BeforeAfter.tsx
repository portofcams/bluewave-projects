"use client";

import { useReveal } from "@/hooks/useReveal";

const comparisons = [
  {
    task: "Customer Questions",
    before: "3 hrs/day",
    after: "30 min",
    percent: 83,
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />
      </svg>
    ),
    beforeLabel: "Answering the same questions manually",
    afterLabel: "AI chatbot handles 80% automatically",
  },
  {
    task: "Invoicing",
    before: "Every Friday",
    after: "Automatic",
    percent: 95,
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
      </svg>
    ),
    beforeLabel: "Manual invoicing every Friday afternoon",
    afterLabel: "Invoices generate and send themselves",
  },
  {
    task: "Scheduling",
    before: "45 min/day",
    after: "0 min",
    percent: 100,
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
      </svg>
    ),
    beforeLabel: "Back-and-forth scheduling over email",
    afterLabel: "Clients book directly, calendar syncs automatically",
  },
  {
    task: "Follow-Ups",
    before: "2 hrs/day",
    after: "15 min",
    percent: 88,
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
      </svg>
    ),
    beforeLabel: "Manually chasing leads and clients",
    afterLabel: "Automated sequences handle follow-ups",
  },
  {
    task: "Social Media",
    before: "1 hr/day",
    after: "10 min",
    percent: 83,
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
      </svg>
    ),
    beforeLabel: "Writing and scheduling posts manually",
    afterLabel: "AI drafts, schedules, and posts for you",
  },
  {
    task: "Reporting",
    before: "Full day",
    after: "1 click",
    percent: 92,
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
      </svg>
    ),
    beforeLabel: "Spending a full day compiling weekly reports",
    afterLabel: "Dashboards update in real time, reports auto-generate",
  },
];

function ComparisonCard({
  item,
  index,
}: {
  item: (typeof comparisons)[number];
  index: number;
}) {
  const { ref, inView } = useReveal();
  const delayClass = index >= 1 && index <= 8 ? `reveal-d-${index}` : "";

  return (
    <div
      ref={ref}
      className={`reveal-up-sm ${delayClass} ${inView ? "in" : ""} glass glass-hover rounded-2xl p-6 sm:p-8 transition-all duration-500`}
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-ocean-500 to-wave-500 flex items-center justify-center text-white">
          {item.icon}
        </div>
        <h3 className="text-lg font-bold text-white">{item.task}</h3>
      </div>

      <div className="flex items-center justify-between mb-4">
        <div>
          <div className="text-xs text-white/30 uppercase tracking-wider mb-1">Before</div>
          <div className="text-lg text-white/50 line-through decoration-red-400/50">{item.before}</div>
        </div>
        <svg viewBox="0 0 24 24" className="w-6 h-6 text-ocean-400" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
        </svg>
        <div className="text-right">
          <div className="text-xs text-white/30 uppercase tracking-wider mb-1">After</div>
          <div className="text-lg font-bold text-gradient">{item.after}</div>
        </div>
      </div>

      {/* Progress bar */}
      <div className="h-2 rounded-full bg-white/5 overflow-hidden">
        <div
          style={{ width: inView ? `${item.percent}%` : 0, transition: "width 1.2s ease-out", transitionDelay: `${0.3 + index * 0.08}s` }}
          className="h-full rounded-full bg-gradient-to-r from-ocean-500 to-wave-400"
        />
      </div>
      <div className="text-right mt-2">
        <span className="text-xs text-wave-400 font-medium">{item.percent}% time saved</span>
      </div>
    </div>
  );
}

export default function BeforeAfter() {
  const { ref, inView } = useReveal();

  return (
    <section id="before-after" className="py-32 px-6 relative">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-ocean-500/5 rounded-full blur-[128px]" />
      </div>

      <div className="max-w-7xl mx-auto relative">
        <div
          ref={ref}
          className={`reveal-up ${inView ? "in" : ""} text-center mb-20`}
        >
          <span className="text-sm font-medium text-lava-500 uppercase tracking-widest mb-4 block">
            Before &amp; After
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
            <span className="text-white">Where your</span>{" "}
            <span className="text-gradient-warm">time actually goes.</span>
          </h2>
          <p className="text-lg text-white/40 max-w-2xl mx-auto">
            Real scenarios from real business owners. This is what changes when you stop doing everything manually.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {comparisons.map((item, i) => (
            <ComparisonCard key={item.task} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
