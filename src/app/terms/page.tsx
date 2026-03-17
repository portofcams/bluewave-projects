"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const sections = [
  {
    title: "1. Services",
    content: `BlueWave Projects provides AI consulting, custom application development, API services, and AI training ("AI School"). Our services are designed to help businesses and individuals leverage artificial intelligence effectively. Specific deliverables, timelines, and scope are agreed upon before engagement begins.`,
  },
  {
    title: "2. Accounts & Access",
    content: `Some of our services, including AI School, require you to create an account or provide an email address. You are responsible for maintaining the security of your account credentials. You agree to provide accurate information and to update it as needed. We reserve the right to suspend or terminate accounts that violate these terms.`,
  },
  {
    title: "3. Payment Terms",
    content: `Consulting and development services are billed as agreed upon in individual project proposals. AI School subscriptions and one-time purchases are processed through Stripe. All payments are in USD unless otherwise specified. Invoices are due upon receipt unless alternate terms are arranged in writing.`,
  },
  {
    title: "4. Cancellation & Refunds",
    content: `You may cancel any subscription at any time. Cancellation takes effect at the end of the current billing period. For consulting engagements, either party may terminate with 14 days written notice. Refunds for prepaid services will be prorated based on work completed. We believe in fair dealings — if you are unsatisfied, reach out and we will work to make it right.`,
  },
  {
    title: "5. Intellectual Property",
    content: `For consulting and development projects: upon full payment, you own the custom code and deliverables we create specifically for you. BlueWave Projects retains ownership of any pre-existing tools, frameworks, libraries, or general-purpose components used in your project. AI School content, including lessons, prompts, and course materials, remains the intellectual property of BlueWave Projects and may not be redistributed without permission.`,
  },
  {
    title: "6. Acceptable Use",
    content: `You agree not to use our services to: violate any laws or regulations; infringe on others' intellectual property; distribute malware or harmful code; attempt to gain unauthorized access to our systems; resell or redistribute AI School content without permission; or use our APIs in a manner that degrades service for other users.`,
  },
  {
    title: "7. Limitation of Liability",
    content: `BlueWave Projects provides services "as is" without warranties of any kind, either express or implied. We are not liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of our services. Our total liability for any claim shall not exceed the amount you paid us in the 12 months preceding the claim. This limitation applies to the fullest extent permitted by law.`,
  },
  {
    title: "8. Indemnification",
    content: `You agree to indemnify and hold harmless BlueWave Projects, its operators, and affiliates from any claims, damages, losses, or expenses arising from your use of our services or violation of these terms.`,
  },
  {
    title: "9. Changes to Terms",
    content: `We may update these terms from time to time. Significant changes will be communicated via email or a notice on our website. Continued use of our services after changes take effect constitutes acceptance of the updated terms.`,
  },
  {
    title: "10. Governing Law",
    content: `These terms are governed by the laws of the United States. Any disputes arising from these terms or our services shall be resolved through good-faith negotiation first, and if necessary, through binding arbitration.`,
  },
  {
    title: "11. Contact",
    content: `If you have questions about these terms, contact us at portofcams@gmail.com.`,
  },
];

export default function TermsPage() {
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
            <span className="text-gradient">Terms of Service</span>
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
            Welcome to BlueWave Projects. By using our website, services, or
            products, you agree to the following terms. Please read them
            carefully. If you do not agree with these terms, please do not use
            our services.
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
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
