import React from 'react';
import { ArrowUpRight } from 'lucide-react';

export default function FinalCTA() {
  return (
    <section id="contact" className="py-40 px-6 md:px-12 bg-[#050505] relative overflow-hidden text-center border-b border-white/[0.04]">
      {/* Background spotlights */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-white/[0.01] rounded-full blur-[140px] pointer-events-none"></div>

      <div className="max-w-5xl mx-auto w-full relative z-10">
        <span className="text-xs uppercase tracking-widest text-[#d4b07c] font-bold block mb-6 font-display reveal">
          Next Steps
        </span>
        
        {/* Massive Editorial Heading */}
        <h2 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white leading-[1.05] tracking-tighter uppercase font-creative mb-12 reveal">
          LET'S BUILD<br />
          <span className="text-[#d4b07c]">SOMETHING</span><br />
          <span className="text-white/60">EXCEPTIONAL</span>.
        </h2>

        {/* Supporting copy */}
        <p className="text-sm md:text-base text-gray-400 font-light max-w-lg mx-auto mb-12 leading-relaxed reveal">
          Have an ambitious project in mind? We partner with founders, innovators, and established brands to build world-class digital realities.
        </p>

        {/* CTA Button */}
        <div className="reveal">
          <a
            href="mailto:hello@elitestudios.com"
            className="inline-flex items-center gap-4 px-10 py-5 bg-[#d4b07c] text-black hover:bg-transparent border border-[#d4b07c] hover:text-[#d4b07c] transition-all duration-500 text-xs font-bold uppercase tracking-widest group shadow-[0_0_40px_rgba(212,176,124,0.1)] hover:shadow-none"
          >
            <span>Start Your Project</span>
            <ArrowUpRight className="w-4 h-4 text-black group-hover:text-[#d4b07c] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-500" />
          </a>
        </div>

        {/* Contact Links */}
        <div className="mt-20 flex flex-wrap justify-center items-center gap-x-12 gap-y-4 text-xs font-mono tracking-widest uppercase text-white/40 reveal">
          <a href="mailto:hello@elitestudios.com" className="hover:text-[#d4b07c] transition-colors duration-300">
            hello@elitestudios.com
          </a>
          <span className="h-1 w-1 bg-[#d4b07c]/30 rounded-full hidden sm:inline"></span>
          <a href="tel:+18005550199" className="hover:text-[#d4b07c] transition-colors duration-300">
            +1 (800) 555-0199
          </a>
        </div>
      </div>
    </section>
  );
}
