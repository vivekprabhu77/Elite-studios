import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import logo from '../assets/ELITE STUDIOS.png';

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center text-center px-6 py-24 bg-[#F6F7EB] relative overflow-hidden">
      {/* Background Radial Glow */}
      <div className="absolute w-[500px] h-[500px] bg-[#E94F37]/[0.03] rounded-full blur-[140px] pointer-events-none top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0"></div>

      <div className="relative z-10 max-w-lg mx-auto">
        <div className="w-20 h-20 mx-auto mb-8 rounded-2xl bg-[#393E41] border border-[#E94F37]/50 p-3 shadow-[0_4px_24px_rgba(57,62,65,0.2)]">
          <img src={logo} alt="Elite Studios" className="w-full h-full object-contain" />
        </div>

        <span className="inline-block px-4 py-1 rounded-full bg-[#E94F37]/10 border border-[#E94F37]/30 text-[#E94F37] text-[10px] font-mono font-bold tracking-widest uppercase mb-4 shadow-[0_0_15px_rgba(233,79,55,0.15)]">
          ERROR 404 • PAGE NOT FOUND
        </span>

        <h1 className="text-4xl sm:text-6xl font-extrabold text-[#393E41] font-display uppercase tracking-tight mb-4">
          PAGE DOES NOT <span className="text-[#E94F37]">EXIST.</span>
        </h1>

        <p className="text-xs sm:text-sm text-[#393E41]/75 font-light leading-relaxed mb-8 max-w-md mx-auto">
          The link you followed may be broken, or the page may have been removed. Let's get you back on track.
        </p>

        <Link
          to="/"
          className="inline-flex items-center gap-2 px-8 py-4 bg-[#E94F37] text-[#F6F7EB] font-extrabold text-xs uppercase tracking-[0.2em] rounded-xl hover:bg-[#d03e27] transition-all duration-300 shadow-[0_4px_24px_rgba(233,79,55,0.3)] hover:scale-105"
        >
          <span>RETURN TO HOMEPAGE</span>
          <ArrowUpRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
