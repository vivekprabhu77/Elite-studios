import React from 'react';
import footerLogo from '../assets/ELITE STUDIOS.png';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#050505] text-gray-400 py-20 px-6 md:px-12 border-t border-white/[0.04] relative z-10 overflow-hidden">
      {/* Background radial highlight */}
      <div className="absolute bottom-[-100px] left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#d4b07c]/[0.005] rounded-full blur-[80px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto w-full">
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 pb-16 border-b border-white/[0.04]">

          {/* Logo & Pitch */}
          <div className="lg:col-span-5 flex flex-col items-start text-left">
            <img
              src={footerLogo}
              alt="Elite Studios Logo"
              className="h-35 w-auto object-contain mb-6 select-none pointer-events-none"
            />
            <p className="text-xs text-gray-400 font-light leading-relaxed max-w-sm">
              We design and engineer digital interfaces that demand attention. Crafting luxury minimalism, bespoke branding, and high-performance React frontends.
            </p>
          </div>

          {/* Quick Links Column */}
          <div className="lg:col-span-2 flex flex-col items-start text-left">
            <h4 className="text-xs uppercase font-bold tracking-widest text-[#d4b07c] font-display mb-6">
              Navigation
            </h4>
            <div className="flex flex-col gap-3 text-xs">
              {['Home', 'Services', 'Work', 'About', 'Contact'].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="hover:text-[#d4b07c] transition-colors duration-300 tracking-wider uppercase text-[10px] font-bold"
                >
                  {item}
                </a>
              ))}
            </div>
          </div>

          {/* Socials Column */}
          <div className="lg:col-span-2 flex flex-col items-start text-left">
            <h4 className="text-xs uppercase font-bold tracking-widest text-[#d4b07c] font-display mb-6">
              Socials
            </h4>
            <div className="flex flex-col gap-3 text-xs">
              {['Instagram', 'Behance', 'Dribbble', 'LinkedIn', 'Twitter'].map((item) => (
                <a
                  key={item}
                  href={`#social-${item.toLowerCase()}`}
                  className="hover:text-[#d4b07c] transition-colors duration-300 tracking-wider uppercase text-[10px] font-bold"
                >
                  {item}
                </a>
              ))}
            </div>
          </div>

          {/* Contact / Office Column */}
          <div className="lg:col-span-3 flex flex-col items-start text-left">
            <h4 className="text-xs uppercase font-bold tracking-widest text-[#d4b07c] font-display mb-6">
              Elite Office
            </h4>
            <div className="flex flex-col gap-3 text-xs font-light">
              <span className="text-white/80">Siddapura, Karnataka, India</span>
              <a href="mailto:hello@elitestudios.com" className="hover:text-[#d4b07c] transition-colors duration-300 font-semibold">
                hello@elitestudios.com
              </a>
              <a href="tel:+18005550199" className="hover:text-[#d4b07c] transition-colors duration-300 font-semibold">
                +1 (800) 555-0199
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] font-mono tracking-widest uppercase text-white/30">
          <span>&copy; {currentYear} Elite Studios. All rights reserved.</span>
          <div className="flex gap-6">
            <a href="#privacy" className="hover:text-white transition-colors duration-300">Privacy Policy</a>
            <a href="#terms" className="hover:text-white transition-colors duration-300">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
