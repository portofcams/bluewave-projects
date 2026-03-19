"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const consultants = [
  {
    name: "Captain J",
    title: "Founder & Lead Developer",
    photo: "/captain.jpg",
    color: "ocean",
    skills: [
      { name: "React / Next.js", icon: "⚛️" },
      { name: "Swift / iOS", icon: "📱" },
      { name: "Python / FastAPI", icon: "🐍" },
      { name: "Claude / ChatGPT", icon: "🤖" },
      { name: "Docker / DevOps", icon: "🐳" },
      { name: "n8n / Automation", icon: "⚡" },
    ],
    bio: [
      "I build things that work and teach people to do the same.",
      "100-ton USCG Captain with 1,000+ sea days. Solo developer and AI consultant based in the Pacific. I\u2019ve built 6+ live products \u2014 from webcam streaming platforms to iOS apps to AI-powered automation tools. Every one of them is in production, serving real users.",
      "Beyond software, I assist friends in project management of high-net-worth homes and commercial businesses. I started BlueWave because I saw too many people overwhelmed by AI and too many consultants overcomplicating it. My approach is simple: show you what works, help you build it, and get out of the way.",
    ],
    stats: [
      { value: "6+", label: "Live Products" },
      { value: "1,000+", label: "Sea Days" },
      { value: "24/7", label: "Systems Running" },
    ],
  },
  {
    name: "Forbes",
    title: "Consultant & Automation Strategist",
    photo: "/forbes.jpg",
    color: "lava",
    skills: [
      { name: "Operations / Strategy", icon: "🎯" },
      { name: "Real Estate / Property", icon: "🏠" },
      { name: "Process Automation", icon: "⚙️" },
      { name: "AI Integration", icon: "🤖" },
      { name: "Team Leadership", icon: "🦅" },
      { name: "Business Systems", icon: "📊" },
    ],
    bio: [
      "Navy SEAL officer turned efficiency machine.",
      "Forbes brings a rare combination of elite military discipline and hands-on business acumen. As a Navy SEAL officer, he led high-stakes operations where precision and execution aren\u2019t optional \u2014 they\u2019re survival. He carries that same intensity into every project.",
      "A rental property owner and self-taught coder, Forbes lives at the intersection of business operations and technology. His obsession: helping businesses get more done with less human time. Whether it\u2019s automating a workflow, streamlining property management, or building systems that run themselves \u2014 Forbes finds the leverage point and pulls.",
    ],
    stats: [
      { value: "SEAL", label: "Navy Officer" },
      { value: "10+", label: "Properties" },
      { value: "0", label: "Wasted Hours" },
    ],
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

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.2 + index * 0.2 }}
      className="flex flex-col"
    >
      <div className="glass rounded-2xl p-8 sm:p-10 h-full flex flex-col">
        {/* Photo + Name + Title */}
        <div className="flex flex-col items-center mb-8">
          <div className="relative mb-6">
            <div className={`w-44 h-44 rounded-full overflow-hidden shadow-2xl ${ringClass} ring-2`}>
              <img
                src={consultant.photo}
                alt={consultant.name}
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
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.4, delay: 0.5 + index * 0.2 + i * 0.06 }}
                className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/5 border border-white/5"
              >
                <span className="text-base">{skill.icon}</span>
                <span className="text-xs text-white/60">{skill.name}</span>
              </motion.div>
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
    </motion.div>
  );
}

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <section id="about" className="py-32 px-6 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-ocean-950/20 to-transparent" />

      <div className="max-w-7xl mx-auto relative">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <span className="text-sm font-medium text-ocean-400 uppercase tracking-widest mb-4 block">
            Who We Are
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
            <span className="text-white">Meet the</span>{" "}
            <span className="text-gradient">consultants.</span>
          </h2>
          <p className="text-white/40 max-w-2xl mx-auto text-lg">
            A captain and a SEAL. We build systems, automate operations, and help businesses run faster with less overhead.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
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
