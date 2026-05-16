'use client';

import { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import posthog from 'posthog-js';
import { register, isLoggedIn, getToken } from '@/lib/auth';
import { triggerWelcomeSequence } from '@/lib/welcome-emails';
import { WaveLogo } from '@/components/Logo';

// PostHog capture helper — silent if no key set
function capture(event: string, props: Record<string, unknown> = {}) {
  if (typeof window !== 'undefined' && process.env.NEXT_PUBLIC_POSTHOG_KEY) {
    posthog.capture(event, props);
  }
}

export default function SignupClient() {
  return (
    <Suspense fallback={<div className="min-h-screen ocean-gradient flex items-center justify-center"><div className="w-6 h-6 border-2 border-ocean-500 border-t-transparent rounded-full animate-spin" /></div>}>
      <SignupClientInner />
    </Suspense>
  );
}

function SignupClientInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const redirect = searchParams.get('redirect') || '/school';
  const plan = searchParams.get('plan') || 'unknown';

  useEffect(() => {
    if (isLoggedIn()) {
      router.replace(redirect);
      return;
    }
    capture('signup_started', {
      plan,
      redirect_target: redirect,
      referrer: document.referrer || 'direct',
    });
  }, [router, redirect, plan]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    capture('signup_form_submitted', { plan, has_name: !!name.trim() });

    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      capture('signup_validation_failed', { reason: 'password_too_short', plan });
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      capture('signup_validation_failed', { reason: 'password_mismatch', plan });
      return;
    }

    setLoading(true);

    const result = await register(email.trim().toLowerCase(), password, name.trim());

    if (result.success) {
      capture('signup_completed', {
        plan,
        email_domain: email.split('@')[1] || 'unknown',
      });

      if (process.env.NEXT_PUBLIC_POSTHOG_KEY && result.user) {
        const u = result.user as { id?: string | number; email?: string };
        if (u.id) {
          posthog.identify(String(u.id), {
            email_domain: u.email?.split('@')[1] || 'unknown',
            plan,
            signup_date: new Date().toISOString(),
          });
        }
      }

      // Trigger welcome email drip sequence (fire-and-forget, don't block navigation)
      triggerWelcomeSequence(
        email.trim().toLowerCase(),
        name.trim(),
        getToken() || undefined
      );

      // If the register endpoint returns a token, user is auto-logged in
      if (result.user) {
        router.push(redirect);
      } else {
        router.push(`/login?registered=true&redirect=${encodeURIComponent(redirect)}`);
      }
    } else {
      setError(result.error || 'Registration failed. Please try again.');
      capture('signup_failed', { plan, error_message: result.error || 'unknown' });
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen ocean-gradient flex items-center justify-center px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-block">
            <WaveLogo size={48} />
          </Link>
          <h1 className="text-2xl font-bold text-white mt-4">Create your account</h1>
          <p className="text-sm text-white/40 mt-1">Start your AI learning journey today</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="glass rounded-2xl p-8 space-y-5">
          {error && (
            <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-sm text-red-400">
              {error}
            </div>
          )}

          <div>
            <label htmlFor="name" className="block text-xs font-medium text-white/50 uppercase tracking-wider mb-2">
              Name
            </label>
            <input
              id="name"
              type="text"
              required
              autoComplete="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white text-sm placeholder-white/20 focus:outline-none focus:border-ocean-500/50 focus:ring-1 focus:ring-ocean-500/30 transition-all"
              placeholder="Your name"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-xs font-medium text-white/50 uppercase tracking-wider mb-2">
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white text-sm placeholder-white/20 focus:outline-none focus:border-ocean-500/50 focus:ring-1 focus:ring-ocean-500/30 transition-all"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-xs font-medium text-white/50 uppercase tracking-wider mb-2">
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                required
                autoComplete="new-password"
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white text-sm placeholder-white/20 focus:outline-none focus:border-ocean-500/50 focus:ring-1 focus:ring-ocean-500/30 transition-all pr-12"
                placeholder="At least 6 characters"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors"
                tabIndex={-1}
              >
                {showPassword ? (
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178zM15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          <div>
            <label htmlFor="confirm-password" className="block text-xs font-medium text-white/50 uppercase tracking-wider mb-2">
              Confirm Password
            </label>
            <input
              id="confirm-password"
              type={showPassword ? 'text' : 'password'}
              required
              autoComplete="new-password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white text-sm placeholder-white/20 focus:outline-none focus:border-ocean-500/50 focus:ring-1 focus:ring-ocean-500/30 transition-all"
              placeholder="Confirm your password"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full btn-primary py-3.5 rounded-xl text-sm font-semibold text-white disabled:opacity-50 disabled:cursor-wait cursor-pointer"
          >
            {loading ? 'Creating account...' : 'Create Account'}
          </button>

          <p className="text-[10px] text-white/30 text-center">
            By signing up, you agree to our{' '}
            <Link href="/terms" className="text-white/40 hover:text-white/60 underline">Terms of Service</Link>{' '}
            and{' '}
            <Link href="/privacy" className="text-white/40 hover:text-white/60 underline">Privacy Policy</Link>.
          </p>
        </form>

        {/* Footer links */}
        <div className="text-center mt-6 space-y-3">
          <p className="text-sm text-white/40">
            Already have an account?{' '}
            <Link href={`/login${redirect !== '/school' ? `?redirect=${encodeURIComponent(redirect)}` : ''}`} className="text-ocean-400 hover:text-ocean-300 transition-colors">
              Log in
            </Link>
          </p>
          <Link href="/" className="text-xs text-white/30 hover:text-white/50 transition-colors inline-flex items-center gap-1">
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to BlueWave
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
