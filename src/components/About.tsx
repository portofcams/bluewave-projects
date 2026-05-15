"use client";

import { useReveal } from "@/hooks/useReveal";

const consultants = [
  {
    name: "John Thomas",
    title: "Founder \u00b7 Ikena Design & Build \u00b7 Honolulu",
    photo: "/captain.webp",
    color: "ocean",
    skills: [
      { name: "Anthropic Claude API", icon: "" },
      { name: "Multi-tenant SaaS", icon: "" },
      { name: "RoomPlan / LiDAR", icon: "" },
      { name: "Hawaii property data", icon: "" },
      { name: "Production AI patterns", icon: "" },
      { name: "Full-stack TypeScript", icon: "" },
    ],
    bio: [
      "I run a one-person AI software studio in Honolulu (Ikena Design & Build) shipping production AI products on Anthropic Claude \u2014 six surfaces live or in private beta.",
      "Before software I spent a decade in the trades and at sea: 100-ton USCG Master Captain with 1,000+ sea days, Alaskan timber-frame builder, Honolulu finish carpenter. That decade taught me what it costs to ship work right \u2014 the same standard now lands in TypeScript and Python instead of mortise-and-tenon.",
      "BlueWave Projects, Binnacle AI, Property Brief, Aloha Network, ProBuildCalc, hawaii-as-code \u2014 all built by an operator who's been the customer. Not a SaaS founder chasing a vertical.",
    ],
    stats: [
      { value: "Honolulu", label: "Based in" },
      { value: "6 live", label: "AI products" },
      { value: "8K / mo", label: "Claude calls" },
    ],
    link: { url: "https://ikenagroup.com", label: "Visit Ikena Design & Build \u2192" } as { url: string; label: string } | null,
  },
];

function ConsultantCard({
  consultant,
  index,
  inView,
}: {
  consultant: (typeof consultants)[0];
  index: number;
  inView: boolean;
}) {
  const isOcean = consultant.color === "ocean";
  const ringClass = isOcean ? "ring-ocean-500/30 shadow-ocean-500/20" : "ring-lava-500/30 shadow-lava-500/20";
  const titleClass = isOcean ? "text-wave-400" : "text-lava-500";
  const pulseClass = isOcean ? "border-emerald-400" : "border-lava-500";
  const dotClass = isOcean ? "bg-emerald-400" : "bg-lava-500";

  const delayClass = index >= 1 && index <= 8 ? `reveal-d-${Math.min(index * 2, 8)}` : "reveal-d-2";
  return (
    <div
      className={`reveal-up ${delayClass} ${inView ? "in" : ""} flex flex-col`}
    >
      <div className="glass rounded-2xl p-8 sm:p-10 h-full flex flex-col">
        {/* Photo + Name + Title */}
        <div className="flex flex-col items-center mb-8">
          <div className="relative mb-6">
            <div className={`w-44 h-44 rounded-full overflow-hidden shadow-2xl ${ringClass} ring-2`}>
              <img
                src={consultant.photo}
                alt={consultant.name}
                width={176}
                height={176}
                loading="eager"
                decoding="async"
                className="w-full h-full object-cover"
              />
            </div>
            <div className={`absolute -bottom-2 -right-2 w-10 h-10 rounded-full bg-deep-800 border-2 ${pulseClass} flex items-center justify-center`}>
              <div className={`w-3 h-3 rounded-full ${dotClass} animate-pulse`} />
            </div>
          </div>

          <h3 className="text-2xl font-bold text-white mb-1">{consultant.name}</h3>
          <p className={`${titleClass} font-medium text-sm mb-6`}>{consultant.title}</p>

          {/* Skills grid */}
          <div className="grid grid-cols-2 gap-2.5 w-full max-w-sm">
            {consultant.skills.map((skill, i) => (
              <div
                key={skill.name}
                className={`reveal-up-sm ${i >= 1 && i <= 8 ? `reveal-d-${i}` : ""} ${inView ? "in" : ""} flex items-center gap-2 px-3 py-2 rounded-xl bg-white/5 border border-white/5`}
              >
                <span className="text-base">{skill.icon}</span>
                <span className="text-xs text-white/60">{skill.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bio */}
        <div className="space-y-4 flex-1">
          <p className="text-lg text-white/70 leading-relaxed">{consultant.bio[0]}</p>
          {consultant.bio.slice(1).map((para, i) => (
            <p key={i} className="text-sm text-white/40 leading-relaxed">
              {para}
            </p>
          ))}
          {consultant.link && (
            <a
              href={consultant.link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-sm text-wave-400 hover:bg-white/10 hover:border-white/20 transition-all"
            >
              {consultant.link.label}
            </a>
          )}
        </div>

        {/* Stats */}
        <div className="flex gap-3 mt-8">
          {consultant.stats.map((stat) => (
            <div
              key={stat.label}
              className="glass rounded-xl px-4 py-3 text-center flex-1"
            >
              <div className="text-xl font-bold text-gradient">{stat.value}</div>
              <div className="text-[10px] text-white/40 mt-0.5 uppercase tracking-wide">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function About() {
  const { ref, inView } = useReveal();

  return (
    <section id="about" className="py-32 px-6 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-ocean-950/20 to-transparent" />

      <div className="max-w-7xl mx-auto relative">
        <div
          ref={ref}
          className={`reveal-up ${inView ? "in" : ""} text-center mb-20`}
        >
          <span className="text-sm font-medium text-ocean-400 uppercase tracking-widest mb-4 block">
            Who We Are
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
            <span className="text-white">Built on real jobsites by</span>{" "}
            <span className="text-gradient">an operator.</span>
          </h2>
          <p className="text-white/40 max-w-2xl mx-auto text-lg">
            Not a SaaS startup chasing a vertical. A Honolulu design-build practice
            that needed all of this on real job sites — and shipped it.
          </p>
        </div>

        <div className="max-w-xl mx-auto">
          {consultants.map((consultant, i) => (
            <ConsultantCard
              key={consultant.name}
              consultant={consultant}
              index={i}
              inView={inView}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
