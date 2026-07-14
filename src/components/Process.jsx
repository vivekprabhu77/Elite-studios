import React from 'react';

const PROCESS_STEPS = [
  {
    num: '01',
    phase: 'Discover',
    title: 'Immersion & Research',
    desc: 'We start by diving deep into your brand identity, business model, and competitor landscape to isolate opportunities and define your target audience.'
  },
  {
    num: '02',
    phase: 'Strategy',
    title: 'Architecture & Art Direction',
    desc: 'Establishing the design system foundation, choosing typography palettes, outlining content strategies, and drafting functional wireframes.'
  },
  {
    num: '03',
    phase: 'Design',
    title: 'High-End Visual Craft',
    desc: 'Creating high-fidelity UI layouts, magazine-grade graphics, brand mockups, and interactive designs designed to capture emotion.'
  },
  {
    num: '04',
    phase: 'Develop',
    title: 'Clean Engineering',
    desc: 'Translating designs into fast, clean, React-supported code with micro-interactions, responsive layouts, and top-tier SEO optimizations.'
  },
  {
    num: '05',
    phase: 'Launch',
    title: 'Launch & Expansion',
    desc: 'Conducting thorough audit checks, performance speed-tuning, and hosting setup, followed by a smooth deployment launch.'
  }
];

export default function Process() {
  return (
    <section id="process" className="py-32 px-6 md:px-12 bg-[#050505] relative overflow-hidden border-b border-white/[0.04]">
      {/* Background Spotlight */}
      <div className="absolute top-[10%] left-[-15%] w-[500px] h-[500px] bg-[#d4b07c]/[0.005] rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto w-full">
        {/* Section Header */}
        <div className="mb-24 text-left reveal">
          <span className="text-xs uppercase tracking-widest text-[#d4b07c] font-bold block mb-4 font-display">
            Our Method
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-none font-creative">
            THE CREATIVE <span className="text-[#d4b07c]">PROCESS</span>
          </h2>
        </div>

        {/* Timeline Grid (Desktop Horizontal, Mobile Vertical) */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-8 relative">
          
          {/* Connector Line for Desktop */}
          <div className="absolute top-[35px] left-0 right-0 h-[1px] bg-white/[0.06] hidden lg:block -z-10"></div>

          {PROCESS_STEPS.map((step, idx) => (
            <div
              key={step.num}
              className="flex flex-col text-left group relative reveal"
              style={{ transitionDelay: `${idx * 0.1}s` }}
            >
              {/* Timeline Header (Number & Connector Dot) */}
              <div className="flex lg:flex-col items-center lg:items-start gap-4 lg:gap-0 mb-6 lg:mb-8">
                <div className="w-16 h-16 flex items-center justify-center border border-white/10 bg-[#0b0b0b] group-hover:border-[#d4b07c]/40 text-[#d4b07c] font-mono text-sm font-semibold transition-colors duration-500 rounded-none z-10">
                  {step.num}
                </div>
                
                {/* Connector line for mobile */}
                {idx < PROCESS_STEPS.length - 1 && (
                  <div className="w-[1px] h-12 bg-white/[0.06] absolute left-8 top-16 lg:hidden -z-10"></div>
                )}
                
                <span className="text-xs uppercase tracking-widest font-bold text-white/40 group-hover:text-[#d4b07c] transition-colors duration-500 mt-0 lg:mt-6 font-display">
                  {step.phase}
                </span>
              </div>

              {/* Title & Description */}
              <h3 className="text-lg font-bold text-white group-hover:text-[#d4b07c] tracking-tight mb-3 font-display transition-colors duration-300">
                {step.title}
              </h3>
              <p className="text-xs text-gray-400 font-light leading-relaxed max-w-sm lg:max-w-none group-hover:text-gray-300 transition-colors duration-300">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
