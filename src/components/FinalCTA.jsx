import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { getWhatsAppProjectUrl } from '../utils/whatsapp';

export default function FinalCTA() {
  return (
    <section id="contact" className="py-40 px-6 md:px-12 bg-[#F6F7EB] relative overflow-hidden text-center">
      {/* Background spotlights */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#E94F37]/[0.02] rounded-full blur-[140px] pointer-events-none"></div>

      <div className="max-w-5xl mx-auto w-full relative z-10">
        <span className="text-xs uppercase tracking-widest text-[#E94F37] font-bold block mb-6 font-display reveal">
          Next Steps
        </span>
        
        {/* Massive Editorial Heading */}
        <h2 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-[#393E41] leading-[1.05] tracking-tighter uppercase font-creative mb-12 reveal">
          LET'S BUILD<br />
          <span className="text-[#E94F37]">SOMETHING</span><br />
          <span className="text-[#393E41]/50">EXCEPTIONAL</span>.
        </h2>

        {/* Supporting copy */}
        <p className="text-sm md:text-base text-[#393E41]/75 font-light max-w-lg mx-auto mb-12 leading-relaxed reveal">
          Have an ambitious project in mind? We partner with founders, innovators, and established brands to build world-class digital realities.
        </p>

        {/* CTA Button */}
        <div className="reveal">
          <a
            href={getWhatsAppProjectUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-4 px-10 py-5 bg-[#E94F37] text-[#F6F7EB] hover:bg-transparent border border-[#E94F37] hover:text-[#E94F37] transition-all duration-500 text-xs font-bold uppercase tracking-widest group shadow-[0_4px_24px_rgba(233,79,55,0.25)] hover:shadow-none"
          >
            <span>Start Your Project</span>
            <ArrowUpRight className="w-4 h-4 text-[#F6F7EB] group-hover:text-[#E94F37] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-500" />
          </a>
        </div>

        {/* Contact Links */}
        <div className="mt-20 flex flex-wrap justify-center items-center gap-x-12 gap-y-4 text-xs font-mono tracking-widest uppercase text-[#393E41]/60 reveal">
          <a
            href="https://mail.google.com/mail/?view=cm&fs=1&to=elitestudiossiddapura@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#E94F37] transition-colors duration-300"
          >
            elitestudiossiddapura@gmail.com
          </a>
          <span className="h-1 w-1 bg-[#E94F37] rounded-full hidden sm:inline"></span>
          <a href="tel:+917259174667" className="hover:text-[#E94F37] transition-colors duration-300">
            +91 7259174667
          </a>
        </div>
      </div>
    </section>
  );
}
