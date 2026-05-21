'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

interface PaywallProps {
  waveNumber: number;
  waveTitle: string;
  waveColor: string;
  lessonTitle: string;
  lessonDescription: string;
  isLoggedIn: boolean;
}

export default function Paywall({ waveNumber, waveTitle, waveColor, lessonTitle, lessonDescription, isLoggedIn }: PaywallProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-2xl mx-auto px-6 py-16 text-center"
    >
      {/* Lock icon */}
      <div
        className="w-20 h-20 rounded-2xl mx-auto mb-6 flex items-center justify-center"
        style={{ backgroundColor: waveColor + '15', border: `1px solid ${waveColor}30` }}
      >
        <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke={waveColor} strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
        </svg>
      </div>

      <h2 className="text-2xl font-bold text-white mb-2">{lessonTitle}</h2>
      <p className="text-sm text-white/40 mb-2">{lessonDescription}</p>

      <div className="inline-flex items-center gap-2 mb-8">
        <span
          className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full"
          style={{ backgroundColor: waveColor + '20', color: waveColor }}
        >
          Wave {waveNumber}
        </span>
        <span className="text-xs text-white/30">{waveTitle}</span>
      </div>

      {/* Blurred preview */}
      <div className="glass rounded-2xl p-8 mb-8 relative overflow-hidden">
        <div className="absolute inset-0 backdrop-blur-sm bg-deep-900/60 z-10 flex items-center justify-center">
          <div className="text-center">
            <p className="text-white/60 text-sm font-medium mb-1">Premium Content</p>
            <p className="text-white/30 text-xs">Subscribe to unlock full lessons in Waves 2-8</p>
          </div>
        </div>
        <div className="space-y-3 opacity-30">
          <div className="h-4 bg-white/10 rounded w-3/4" />
          <div className="h-4 bg-white/10 rounded w-full" />
          <div className="h-4 bg-white/10 rounded w-5/6" />
          <div className="h-4 bg-white/10 rounded w-2/3" />
          <div className="h-16 bg-white/5 rounded mt-4" />
          <div className="h-4 bg-white/10 rounded w-full" />
          <div className="h-4 bg-white/10 rounded w-4/5" />
        </div>
      </div>

      {/* CTA */}
      <div className="space-y-4">
        {!isLoggedIn ? (
          <>
            <Link
              href="/signup?redirect=/school"
              className="inline-block btn-primary px-8 py-3.5 rounded-full text-sm font-semibold text-white"
            >
              Sign Up Free to Preview
            </Link>
            <p className="text-xs text-white/30">
              Already have an account?{' '}
              <Link href="/login?redirect=/school" className="text-ocean-400 hover:text-ocean-300">Log in</Link>
            </p>
          </>
        ) : (
          <>
            <p className="text-sm text-white/50 mb-4">
              Wave 1 is free. Unlock all 9 waves with a subscription.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={async () => {
                  try {
                    const res = await fetch('https://ai.portofcams.com/api/bluewave/billing/checkout', {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify({ product: 'school' }),
                    });
                    const data = await res.json();
                    if (data.url) window.location.href = data.url;
                  } catch {
                    alert('Something went wrong. Please try again.');
                  }
                }}
                className="btn-primary px-6 py-3 rounded-full text-sm font-semibold text-white cursor-pointer"
              >
                AI School — $39/mo
              </button>
              <button
                onClick={async () => {
                  try {
                    const res = await fetch('https://ai.portofcams.com/api/bluewave/billing/checkout', {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify({ product: 'pro' }),
                    });
                    const data = await res.json();
                    if (data.url) window.location.href = data.url;
                  } catch {
                    alert('Something went wrong. Please try again.');
                  }
                }}
                className="bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 px-6 py-3 rounded-full text-sm font-semibold text-white transition-all cursor-pointer"
              >
                School + Coaching — $249/mo
              </button>
            </div>
          </>
        )}
      </div>
    </motion.div>
  );
}
