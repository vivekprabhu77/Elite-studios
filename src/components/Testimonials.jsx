import React from 'react';

const TESTIMONIALS = [
  {
    quote: "“Working with Elite Studios changed how people perceive our brand. Their editorial direction and fast technical delivery helped us launch our rebrand three weeks ahead of schedule.”",
    author: "Marcus Sterling",
    role: "Managing Director, Aurelia Group"
  },
  {
    quote: "“They brought absolute clarity to a complex project. The photography, video cuts, and frontend architecture all fit together like a single cohesive system.”",
    author: "Elena Rostova",
    role: "Creative Lead, SOMA Studio"
  },
  {
    quote: "“Incredibly sharp team with a focus on real performance. The site speed and visual polish exceeded our expectations, and our clients noticed the difference immediately.”",
    author: "David Vance",
    role: "Co-Founder, Elevate Partners"
  }
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-12 md:py-16 px-6 md:px-12 bg-black relative overflow-hidden border-b border-white/[0.04]">
      {/* Background Spotlight */}
      <div className="absolute top-[30%] right-[-10%] w-[500px] h-[500px] bg-[#d4b07c]/[0.005] rounded-full blur-[110px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto w-full">
        {/* Section Header */}
        <div className="mb-10 md:mb-12 text-center reveal">
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
