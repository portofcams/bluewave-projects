"use client";

import { useState, useEffect } from "react";
import { WaveLogo } from "./Logo";

const navLinks = [
  { label: "Scope", href: "/scope" },
  { label: "Property Brief", href: "/property-brief" },
  { label: "Aloha Network", href: "/aloha" },
  { label: "Pricing", href: "#pricing" },
  { label: "Case Studies", href: "/case-studies" },
  { label: "Blog", href: "/blog" },
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
      className={`anim-slide-down fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "glass border-b border-white/5 shadow-lg shadow-black/20"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <a href="#" className="flex items-center group">
          <WaveLogo size={40} className="group-hover:opacity-90 transition-opacity" />
        </a>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
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
            href="/signup"
            className="btn-primary text-sm font-medium px-5 py-2.5 rounded-full text-white"
          >
            Start free trial
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden text-white/70 hover:text-white"
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
      <div className={`expand ${mobileOpen ? "open" : ""} md:hidden`}>
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
            <a
              href="/signup"
              onClick={() => setMobileOpen(false)}
              className="btn-primary text-center font-medium px-5 py-3 rounded-full text-white mt-2"
            >
              Start free trial
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
