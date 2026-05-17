"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const faqs = [
  {
    q: "I bought a track but didn't get the email.",
    a: "Check your spam folder for a message from noreply@bluewaveprojects.com. Still nothing after 10 minutes? Email us with the address you used at Stripe checkout and we'll look up your license key directly and resend it.",
  },
  {
    q: "I lost my license key.",
    a: "Email support with the email you used at checkout. We can look it up and re-send. Stripe receipts also contain your purchase email — that's the one we have on file.",
  },
  {
    q: "The iOS app won't let me sign in with my key.",
    a: "Confirm the key starts with bws-. If it does and still fails, the most likely cause is a refund on file. Email us with the key and the purchase email — we'll sort it.",
  },
  {
    q: "Can I get a refund?",
    a: "Yes — within 30 days of purchase, no questions asked. Email support with the address you used at checkout and we'll process it through Stripe.",
  },
  {
    q: "Do I have to use the iOS app?",
    a: "No. Everything works on the web at school.bluewaveprojects.com. The iOS app is a companion for reading modules and tracking progress on the go.",
  },
  {
    q: "Can I use my license on more than one device?",
    a: "Yes. The same key works on web (paste it into /login) and in the iOS app (License key field). No device limit — it's tied to your purchase, not a specific device.",
  },
  {
    q: "What's the difference between the consulting plan and a school track?",
    a: "Consulting plans are recurring subscriptions for ongoing work with us. School tracks are one-time purchases for self-paced courseware. Different products, different billing.",
  },
];

export default function SupportPage() {
  return (
    <div className="min-h-screen relative">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-ocean-500/5 rounded-full blur-[128px]" />
      </div>

      <div className="max-w-4xl mx-auto px-6 py-24 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <Link
            href="/"
            className="text-sm text-white/30 hover:text-white/60 transition-colors mb-8 inline-block"
          >
            &larr; Back to Home
          </Link>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">
            <span className="text-gradient">Support</span>
          </h1>
          <p className="text-white/40 text-lg">
            For BlueWave School, the iOS app, and everything else.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="glass rounded-2xl p-8 mb-8"
        >
          <h2 className="text-xl font-semibold text-white mb-3">Contact</h2>
          <p className="text-white/60 leading-relaxed mb-3">
            Fastest path: email{" "}
            <a
              href="mailto:support@bluewaveprojects.com"
              className="text-ocean-400 hover:text-ocean-300 underline"
            >
              support@bluewaveprojects.com
            </a>
            .
          </p>
          <p className="text-white/50 text-sm leading-relaxed">
            Replies usually within 24 hours during weekdays (Hawaii time,
            UTC&minus;10). For billing-specific issues, include your Stripe
            receipt email so we can find your record quickly.
          </p>
        </motion.div>

        <h2 className="text-2xl font-bold text-white mb-6">
          Common questions
        </h2>

        <div className="space-y-6">
          {faqs.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.15 + i * 0.04 }}
              className="glass rounded-2xl p-8"
            >
              <h3 className="text-lg font-semibold text-white mb-3">
                {item.q}
              </h3>
              <p className="text-white/50 leading-relaxed">{item.a}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.55 }}
          className="glass rounded-2xl p-8 mt-8"
        >
          <h2 className="text-xl font-semibold text-white mb-4">
            Where things live
          </h2>
          <ul className="space-y-2 text-sm">
            <li className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-ocean-500/60 mt-2 shrink-0" />
              <span className="text-white/50">
                School (web):{" "}
                <a
                  href="https://school.bluewaveprojects.com"
                  className="text-ocean-400 hover:text-ocean-300 underline"
                >
                  school.bluewaveprojects.com
                </a>
              </span>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-ocean-500/60 mt-2 shrink-0" />
              <span className="text-white/50">
                iOS app: BlueWave School on the App Store
              </span>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-ocean-500/60 mt-2 shrink-0" />
              <span className="text-white/50">
                Privacy:{" "}
                <Link
                  href="/privacy"
                  className="text-ocean-400 hover:text-ocean-300 underline"
                >
                  /privacy
                </Link>
              </span>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-ocean-500/60 mt-2 shrink-0" />
              <span className="text-white/50">
                Terms:{" "}
                <Link
                  href="/terms"
                  className="text-ocean-400 hover:text-ocean-300 underline"
                >
                  /terms
                </Link>
              </span>
            </li>
          </ul>
        </motion.div>
      </div>
    </div>
  );
}
