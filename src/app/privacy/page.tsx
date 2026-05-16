"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { PrivacyOptOut } from "@/components/PrivacyOptOut";

const sections = [
  {
    title: "1. Information We Collect",
    content: `We collect the following types of information when you use our services:`,
    list: [
      "Name and email address — when you sign up, subscribe, or contact us",
      "Usage data — pages visited, features used, lesson progress in AI School",
      "Payment information — processed securely through Stripe; we do not store full card numbers",
      "Device and browser information — for analytics and improving user experience",
      "Communications — emails and messages you send to us",
    ],
  },
  {
    title: "2. How We Use Your Information",
    content: `We use the information we collect to:`,
    list: [
      "Provide and maintain our services, including AI School progress tracking",
      "Process payments and send transaction confirmations",
      "Communicate with you about services, updates, and promotions",
      "Improve our website, products, and user experience",
      "Respond to your requests and provide customer support",
      "Comply with legal obligations",
    ],
  },
  {
    title: "3. Third-Party Services",
    content: `We work with trusted third-party providers to deliver our services. These providers have access to your information only as needed to perform their functions:`,
    list: [
      "Stripe — payment processing (stripe.com/privacy)",
      "Resend — transactional email delivery (resend.com/privacy)",
      "Cloudflare — website hosting, CDN, and security (cloudflare.com/privacypolicy)",
      "Vercel — application hosting during development",
    ],
  },
  {
    title: "4. Cookies & Local Storage",
    content: `We use localStorage (browser-based storage) to track your AI School lesson progress and preferences. This data stays on your device and is not sent to our servers unless you explicitly sync your progress. We do not use third-party tracking cookies. We may use essential cookies for session management and security purposes.`,
  },
  {
    title: "5. Data Retention",
    content: `We retain your personal information for as long as your account is active or as needed to provide services. If you request account deletion, we will remove your data within 30 days, except where retention is required by law. Usage analytics are anonymized and may be retained indefinitely.`,
  },
  {
    title: "6. Your Rights",
    content: `You have the right to:`,
    list: [
      "Access the personal data we hold about you",
      "Request correction of inaccurate data",
      "Request deletion of your data",
      "Opt out of marketing communications at any time",
      "Export your AI School progress data",
    ],
  },
  {
    title: "7. Data Security",
    content: `We implement appropriate technical and organizational measures to protect your personal information. All data in transit is encrypted via TLS/SSL. Payment processing is handled entirely by Stripe's PCI-compliant infrastructure. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.`,
  },
  {
    title: "8. Children's Privacy",
    content: `Our services are not directed to children under 13. We do not knowingly collect personal information from children under 13. If you believe we have collected such information, please contact us and we will promptly delete it.`,
  },
  {
    title: "9. Changes to This Policy",
    content: `We may update this privacy policy from time to time. We will notify you of significant changes via email or a prominent notice on our website. The "effective date" at the top of this page indicates when the policy was last revised.`,
  },
  {
    title: "10. Contact Us",
    content: `If you have questions about this privacy policy or how we handle your data, please contact us at portofcams@gmail.com.`,
  },
];

export default function PrivacyPage() {
  return (
    <div className="min-h-screen relative">
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-ocean-500/5 rounded-full blur-[128px]" />
      </div>

      <div className="max-w-4xl mx-auto px-6 py-24 relative">
        {/* Header */}
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
            <span className="text-gradient">Privacy Policy</span>
          </h1>
          <p className="text-white/40 text-lg">
            Effective date: March 16, 2026
          </p>
        </motion.div>

        {/* Intro */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="glass rounded-2xl p-8 mb-8"
        >
          <p className="text-white/60 leading-relaxed">
            At BlueWave Projects, we take your privacy seriously. This policy
            explains what information we collect, how we use it, and what rights
            you have. We aim to be transparent and straightforward — no legalese
            traps.
          </p>
        </motion.div>

        {/* Sections */}
        <div className="space-y-6">
          {sections.map((section, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.15 + i * 0.04 }}
              className="glass rounded-2xl p-8"
            >
              <h2 className="text-xl font-semibold text-white mb-4">
                {section.title}
              </h2>
              <p className="text-white/50 leading-relaxed">
                {section.content}
              </p>
              {section.list && (
                <ul className="mt-4 space-y-2">
                  {section.list.map((item, j) => (
                    <li key={j} className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-ocean-500/60 mt-2 shrink-0" />
                      <span className="text-white/40 text-sm leading-relaxed">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.6 }}
          className="glass rounded-2xl p-8 mt-6"
        >
          <h2 className="text-xl font-semibold text-white mb-4">
            Analytics opt-out
          </h2>
          <p className="text-white/50 leading-relaxed mb-4">
            We use first-party product analytics (PostHog) to understand
            which pages get the most use and which CTAs work — no third-party
            ad networks, no cross-site tracking. If you'd rather not be
            counted, opt out below. Your choice persists across visits on
            this device.
          </p>
          <PrivacyOptOut />
        </motion.div>
      </div>
    </div>
  );
}
