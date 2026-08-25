import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import logo from '../assets/ELITE STUDIOS.webp';

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center text-center px-6 py-24 bg-black relative overflow-hidden">
      {/* Background Radial Glow */}
      <div className="absolute w-[500px] h-[500px] bg-[#d4b07c]/10 rounded-full blur-[140px] pointer-events-none top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0"></div>

      <div className="relative z-10 max-w-lg mx-auto">
        <div className="w-20 h-20 mx-auto mb-8 rounded-2xl bg-gradient-to-br from-[#d4b07c]/20 via-black to-[#d4b07c]/05 border border-[#d4b07c]/50 p-3 shadow-[0_0_30px_rgba(212,176,124,0.3)]">
          <img src={logo} alt="Elite Studios" className="w-full h-full object-contain" />
        </div>

        <span className="inline-block px-4 py-1 rounded-full bg-[#d4b07c]/10 border border-[#d4b07c]/30 text-[#d4b07c] text-[10px] font-mono font-bold tracking-widest uppercase mb-4 shadow-[0_0_15px_rgba(212,176,124,0.2)]">
          ERROR 404 • PAGE NOT FOUND
        </span>

        <h1 className="text-4xl sm:text-6xl font-extrabold text-white font-display uppercase tracking-tight mb-4">
          PAGE DOES NOT <span className="text-[#d4b07c]">EXIST.</span>
        </h1>

        <p className="text-xs sm:text-sm text-gray-400 font-light leading-relaxed mb-8 max-w-md mx-auto">
          The link you followed may be broken, or the page may have been removed. Let's get you back on track.
        </p>

        <Link
          to="/"
          className="inline-flex items-center gap-2 px-8 py-4 bg-[#d4b07c] text-black font-extrabold text-xs uppercase tracking-[0.2em] rounded-xl hover:bg-[#c39f6b] transition-all duration-300 shadow-[0_0_30px_rgba(212,176,124,0.4)] hover:scale-105"
        >
          <span>RETURN TO HOMEPAGE</span>
          <ArrowUpRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
