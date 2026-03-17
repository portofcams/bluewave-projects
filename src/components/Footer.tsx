"use client";

export default function Footer() {
  return (
    <footer className="border-t border-white/5 py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-ocean-500 to-wave-400 flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-ocean-500/20">
                BW
              </div>
              <span className="text-lg font-semibold tracking-tight text-white/90">
                BlueWave
              </span>
            </div>
            <p className="text-sm text-white/30 leading-relaxed">
              AI consulting, custom apps, and R&amp;D.
              <br />
              Born in the Pacific.
            </p>
          </div>

          {/* Links */}
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
                <a href="https://contract.portofcams.com" target="_blank" rel="noopener noreferrer" className="text-sm text-white/30 hover:text-white/70 transition-colors">
                  ContractorCalc
                </a>
              </li>
              <li>
                <a href="https://perdiemify.com" target="_blank" rel="noopener noreferrer" className="text-sm text-white/30 hover:text-white/70 transition-colors">
                  Perdiemify
                </a>
              </li>
              <li>
                <a href="https://addressapi.portofcams.com" target="_blank" rel="noopener noreferrer" className="text-sm text-white/30 hover:text-white/70 transition-colors">
                  Address API
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-medium text-white/60 mb-4 uppercase tracking-wider">
              Services
            </h4>
            <ul className="space-y-2.5">
              <li>
                <a href="#services" className="text-sm text-white/30 hover:text-white/70 transition-colors">
                  AI Consulting
                </a>
              </li>
              <li>
                <a href="#services" className="text-sm text-white/30 hover:text-white/70 transition-colors">
                  App Development
                </a>
              </li>
              <li>
                <a href="#services" className="text-sm text-white/30 hover:text-white/70 transition-colors">
                  APIs & Infra
                </a>
              </li>
              <li>
                <a href="#school" className="text-sm text-white/30 hover:text-white/70 transition-colors">
                  AI School
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-medium text-white/60 mb-4 uppercase tracking-wider">
              Connect
            </h4>
            <ul className="space-y-2.5">
              <li>
                <a href="#contact" className="text-sm text-white/30 hover:text-white/70 transition-colors">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-sm text-white/30 hover:text-white/70 transition-colors">
                  GitHub
                </a>
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
