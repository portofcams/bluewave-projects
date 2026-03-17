"use client";

export function WaveLogo({ size = 36, className = "" }: { size?: number; className?: string }) {
  // Simple bold text logo - no icon
  const fontSize = size * 0.55;
  return (
    <div className={`flex items-center ${className}`} style={{ height: size }}>
      <span
        className="font-bold tracking-tight text-white"
        style={{ fontSize }}
      >
        Blue
      </span>
      <span
        className="font-bold tracking-tight text-gradient"
        style={{ fontSize }}
      >
        Wave
      </span>
    </div>
  );
}

export function WaveLogoMark({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 24"
      fill="none"
      className={className}
    >
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
