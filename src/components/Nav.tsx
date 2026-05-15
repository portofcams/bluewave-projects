"use client";

import { useState, useEffect } from "react";
import { WaveLogo } from "./Logo";

// Primary nav — desktop top bar. Keep this list tight so it fits on
// tablet widths without wrapping. Apps + Contractors are the two top
// surfaces; sub-products and personal pages live in the mobile drawer +
// footer.
const navLinks = [
  { label: "Ikena", href: "/ikena" },
  { label: "ProBuildCalc", href: "https://probuildcalc.com" },
  { label: "Pricing", href: "/pricing" },
  { label: "Blog", href: "/blog" },
];

// Secondary links — only surface in the mobile drawer (and footer).
const secondaryLinks = [
  { label: "Case Studies", href: "/case-studies" },
  { label: "AI Scope Tool", href: "/scope" },
  { label: "Property Brief", href: "/property-brief" },
  { label: "Aloha Network", href: "/aloha" },
  { label: "Hire me", href: "/work" },
  { label: "Captain résumé", href: "/captain" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`anim-slide-down fixed top-0 left-0 right-0 z-50 transition-all duration-500 glass border-b border-white/5 ${
        scrolled ? "shadow-lg shadow-black/20" : ""
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <a href="#" className="flex items-center group">
          <WaveLogo size={40} className="group-hover:opacity-90 transition-opacity" />
        </a>

        {/* Desktop nav — appears at lg (1024px+) to avoid mid-width overlap */}
        <div className="hidden lg:flex items-center gap-6">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-white/50 hover:text-white transition-colors duration-300"
            >
              {link.label}
            </a>
          ))}
          <a
            href="/booking"
            className="btn-primary text-sm font-medium px-5 py-2.5 rounded-full text-white whitespace-nowrap"
          >
            Book a demo
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="lg:hidden text-white/70 hover:text-white"
          aria-label="Toggle menu"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {mobileOpen ? (
              <path d="M18 6L6 18M6 6l12 12" />
            ) : (
              <path d="M4 8h16M4 16h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu — CSS grid trick for height auto animation */}
      <div className={`expand ${mobileOpen ? "open" : ""} lg:hidden`}>
        <div className="glass border-t border-white/5">
          <div className="px-6 py-6 flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="text-lg text-white/60 hover:text-white transition-colors"
              >
                {link.label}
              </a>
            ))}
            <div className="border-t border-white/5 pt-4 mt-2 flex flex-col gap-3">
              {secondaryLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-base text-white/40 hover:text-white/80 transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>
            <a
              href="/booking"
              onClick={() => setMobileOpen(false)}
              className="btn-primary text-center font-medium px-5 py-3 rounded-full text-white mt-2"
            >
              Book a demo
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
