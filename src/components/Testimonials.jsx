import React from 'react';

const TESTIMONIALS = [
  {
    quote: "“Elite Studios completely redefined our digital footprint. Their attention to grid layout and typography scale is unmatched. Our customer trust and direct bookings increased by 62% in the first month of launching.”",
    author: "Marcus Sterling",
    role: "CEO of Aurelia Luxury Group"
  },
  {
    quote: "“Working with them felt like commissioning a custom art piece. The meticulous use of white space, micro-animations, and visual hierarchy is exactly what a high-end brand needs to stand out.”",
    author: "Elena Rostova",
    role: "Creative Director of SOMA Magazine"
  },
  {
    quote: "“The codebase is just as polished as the visual design. They delivered a modular, fast-loading React 19 app that loads instantly and performs flawlessly on mobile devices.”",
    author: "David Vance",
    role: "CTO of Elevate Partners"
  }
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-32 px-6 md:px-12 bg-[#050505] relative overflow-hidden border-b border-white/[0.04]">
      {/* Background Spotlight */}
      <div className="absolute top-[30%] right-[-10%] w-[500px] h-[500px] bg-[#d4b07c]/[0.005] rounded-full blur-[110px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto w-full">
        {/* Section Header */}
        <div className="mb-24 text-center reveal">
          <span className="text-xs uppercase tracking-widest text-[#d4b07c] font-bold block mb-4 font-display">
            Endorsements
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-none font-creative">
            CLIENT <span className="text-[#d4b07c]">TESTIMONIALS</span>
          </h2>
        </div>

        {/* Testimonial Cards Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {TESTIMONIALS.map((t, idx) => (
            <div
              key={t.author}
              className="p-8 md:p-10 border border-white/5 bg-[#0b0b0b] flex flex-col justify-between h-full min-h-[320px] text-left relative group hover:border-[#d4b07c]/20 transition-all duration-500 rounded-none reveal"
              style={{ transitionDelay: `${idx * 0.1}s` }}
            >
              {/* Luxury Quote Indicator */}
              <div className="text-4xl font-serif text-white/10 group-hover:text-[#d4b07c]/30 transition-colors duration-500 mb-6 select-none leading-none">
                “
              </div>

              {/* Quote Text */}
              <p className="text-sm text-gray-300 font-light leading-relaxed mb-8 flex-grow">
                {t.quote}
              </p>

              {/* Author Info */}
              <div className="border-t border-white/[0.04] pt-6 mt-auto">
                <h4 className="text-xs uppercase font-bold tracking-widest text-[#d4b07c] font-display">
                  {t.author}
                </h4>
                <p className="text-[10px] tracking-wider text-white/40 mt-1 uppercase">
                  {t.role}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
