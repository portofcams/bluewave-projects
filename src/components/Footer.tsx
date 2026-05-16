"use client";

import Link from "next/link";
import posthog from "posthog-js";
import { WaveLogo } from "./Logo";

// Event delegation: a single click handler on the footer root captures
// every anchor click and fires a single cta_clicked event with
// cta_location=footer. Saves wrapping 25 individual links.
function handleFooterClick(e: React.MouseEvent<HTMLElement>) {
  if (!process.env.NEXT_PUBLIC_POSTHOG_KEY) return;
  const target = e.target as HTMLElement;
  const anchor = target.closest("a");
  if (!anchor) return;
  const href = anchor.getAttribute("href") || "";
  const text = anchor.textContent?.trim().slice(0, 60) || "";
  posthog.capture("cta_clicked", {
    cta_location: "footer",
    cta_text: text,
    destination_path: href,
    source_page:
      typeof window !== "undefined" ? window.location.pathname : "",
    external: href.startsWith("http"),
  });
}

export default function Footer() {
  return (
    <footer
      className="border-t border-white/5 py-16 px-6"
      onClick={handleFooterClick}
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-12 mb-16">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="mb-4">
              <WaveLogo size={36} />
            </div>
            <p className="text-sm text-white/30 leading-relaxed">
              AI consulting, custom apps, and R&amp;D.
              <br />
              Born in the Pacific.
            </p>
          </div>

          {/* Products */}
          <div>
            <h4 className="text-sm font-medium text-white/60 mb-4 uppercase tracking-wider">
              Products
            </h4>
            <ul className="space-y-2.5">
              <li>
                <a href="https://portofcams.com" target="_blank" rel="noopener noreferrer" className="text-sm text-white/30 hover:text-white/70 transition-colors">
                  Port of Cams
                </a>
              </li>
              <li>
                <a href="https://probuildcalc.com" target="_blank" rel="noopener noreferrer" className="text-sm text-white/30 hover:text-white/70 transition-colors">
                  ProBuildCalc
                </a>
              </li>
              <li>
                <a href="https://alohacalendar.com" target="_blank" rel="noopener noreferrer" className="text-sm text-white/30 hover:text-white/70 transition-colors">
                  AlohaCalendar
                </a>
              </li>
              <li>
                <a href="https://binnacleai.com" target="_blank" rel="noopener noreferrer" className="text-sm text-white/30 hover:text-white/70 transition-colors">
                  Binnacle.ai
                </a>
              </li>
              <li>
                <a href="https://maps.ikenagroup.com" target="_blank" rel="noopener noreferrer" className="text-sm text-white/30 hover:text-white/70 transition-colors">
                  Hawaii 3D Map
                </a>
              </li>
              <li>
                <a href="https://lastfrontierevents.com" target="_blank" rel="noopener noreferrer" className="text-sm text-white/30 hover:text-white/70 transition-colors">
                  Last Frontier Events
                </a>
              </li>
              <li>
                <a href="https://addressapi.portofcams.com" target="_blank" rel="noopener noreferrer" className="text-sm text-white/30 hover:text-white/70 transition-colors">
                  Address API
                </a>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-sm font-medium text-white/60 mb-4 uppercase tracking-wider">
              Services
            </h4>
            <ul className="space-y-2.5">
              <li>
                <a href="/booking" className="text-sm text-white/30 hover:text-white/70 transition-colors">
                  AI Consulting
                </a>
              </li>
              <li>
                <a href="/work" className="text-sm text-white/30 hover:text-white/70 transition-colors">
                  App Development
                </a>
              </li>
              <li>
                <a href="/pricing" className="text-sm text-white/30 hover:text-white/70 transition-colors">
                  Pricing
                </a>
              </li>
              <li>
                <a href="/school" className="text-sm text-white/30 hover:text-white/70 transition-colors">
                  AI School
                </a>
              </li>
              <li>
                <a href="/property-brief-sample.html" target="_blank" rel="noopener" className="text-sm text-white/30 hover:text-white/70 transition-colors">
                  Sample Property Brief
                </a>
              </li>
              <li>
                <a href="/press" className="text-sm text-white/30 hover:text-white/70 transition-colors">
                  Press
                </a>
              </li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="text-sm font-medium text-white/60 mb-4 uppercase tracking-wider">
              Connect
            </h4>
            <ul className="space-y-2.5">
              <li>
                <a href="/booking" className="text-sm text-white/30 hover:text-white/70 transition-colors">
                  Contact Us
                </a>
              </li>
              <li>
                <Link href="/blog" className="text-sm text-white/30 hover:text-white/70 transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/work" className="text-sm text-white/30 hover:text-white/70 transition-colors">
                  Hire John
                </Link>
              </li>
              <li>
                <Link href="/captain" className="text-sm text-white/30 hover:text-white/70 transition-colors">
                  Captain résumé
                </Link>
              </li>
              <li>
                <a href="https://github.com/portofcams" target="_blank" rel="noopener noreferrer" className="text-sm text-white/30 hover:text-white/70 transition-colors inline-flex items-center gap-2">
                  <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                  GitHub
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-sm font-medium text-white/60 mb-4 uppercase tracking-wider">
              Legal
            </h4>
            <ul className="space-y-2.5">
              <li>
                <Link href="/terms" className="text-sm text-white/30 hover:text-white/70 transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-sm text-white/30 hover:text-white/70 transition-colors">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-white/20">
            &copy; {new Date().getFullYear()} BlueWave Projects. All rights reserved.
          </p>
          <p className="text-sm text-white/20">
            Built with caffeine & curiosity from the Pacific.
          </p>
        </div>
      </div>
    </footer>
  );
}
