"use client";

export function WaveLogo({ size = 36, className = "" }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      className={className}
    >
      <defs>
        <linearGradient id="wave-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#0077b6" />
          <stop offset="40%" stopColor="#0091cc" />
          <stop offset="100%" stopColor="#38bdf8" />
        </linearGradient>
        <filter id="wave-glow">
          <feGaussianBlur stdDeviation="1" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      {/* Rounded square background */}
      <rect width="40" height="40" rx="10" fill="url(#wave-grad)" />
      {/* Mountain/wave hybrid - Pacific peaks rising from ocean */}
      <path
        d="M6 28 L13 16 L17 22 L22 12 L27 20 L34 14 L34 28 Z"
        fill="white"
        opacity="0.15"
      />
      {/* Primary wave - bold */}
      <path
        d="M5 24c4-5 7-5 10 0s7 5 10 0 7-5 10 0"
        stroke="white"
        strokeWidth="2.8"
        strokeLinecap="round"
        fill="none"
        filter="url(#wave-glow)"
      />
      {/* Top ripple */}
      <path
        d="M8 18c3-3 5-3 8 0s5 3 8 0 5-3 8 0"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
        opacity="0.35"
      />
      {/* Dot accent - north star */}
      <circle cx="20" cy="11" r="1.5" fill="white" opacity="0.8" />
    </svg>
  );
}

export function WaveLogoMark({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 24"
      fill="none"
      className={className}
    >
      {/* Subtle wave underline */}
      <path
        d="M0 18c8-6 16-6 24 0s16 6 24 0 16-6 24 0 16 6 24 0 16-6 24 0"
        stroke="url(#mark-grad)"
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
        opacity="0.3"
      />
      <defs>
        <linearGradient id="mark-grad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#0091cc" stopOpacity="0" />
          <stop offset="30%" stopColor="#0ea5e9" />
          <stop offset="70%" stopColor="#38bdf8" />
          <stop offset="100%" stopColor="#7dd3fc" stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
  );
}
