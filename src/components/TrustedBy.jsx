import React from 'react';

const SERVICES = [
  { name: 'WEBSITE DESIGN & DEVELOPMENT', style: 'font-display tracking-[0.15em] font-bold' },
  { name: 'PHOTOGRAPHY', style: 'font-sans tracking-[0.3em] font-extrabold text-[13px]' },
  { name: 'VIDEOGRAPHY', style: 'font-creative tracking-[0.15em] font-bold' },
  { name: 'GRAPHIC DESIGN', style: 'font-mono tracking-[0.2em] font-semibold text-[12px]' },
  { name: 'DIGITAL MARKETING', style: 'font-display tracking-[0.2em] font-medium' },
  { name: 'LIVE STREAMING', style: 'font-sans tracking-[0.3em] font-light text-[12px]' },
  { name: 'POSTER MAKING', style: 'font-creative tracking-[0.15em] font-bold' },
  { name: 'VIDEO EDITING', style: 'font-display tracking-[0.25em] font-extrabold' },
  { name: 'SOCIAL MEDIA HANDLING', style: 'font-sans tracking-[0.2em] font-semibold text-[12px]' }
];

export default function TrustedBy() {
  // Double the array to make the marquee loop seamless
  const marqueeItems = [...SERVICES, ...SERVICES];

  return (
    <section className="py-16 border-y border-white/[0.06] bg-[#050505] overflow-hidden relative w-full">
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-16 mb-6 flex justify-between items-center">
        <span className="text-[10px] uppercase font-bold tracking-widest text-white/40">
          Our Services
        </span>
        <span className="text-[10px] uppercase font-bold tracking-widest text-white/40 hidden sm:block">
          What We Do
        </span>
      </div>

      {/* Marquee Wrapper */}
      <div className="relative w-full flex items-center overflow-hidden">
        {/* Left Gradient Fade */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#050505] to-transparent z-10 pointer-events-none"></div>
        {/* Right Gradient Fade */}
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#050505] to-transparent z-10 pointer-events-none"></div>

        {/* Scrolling Inner Container */}
        <div className="flex w-max animate-marquee-left">
          {marqueeItems.map((service, index) => (
            <div
              key={index}
              className="flex items-center justify-center px-8 md:px-16 text-white/30 hover:text-[#d4b07c] transition-colors duration-500 cursor-default"
            >
              <span className={`text-sm md:text-base whitespace-nowrap ${service.style}`}>
                {service.name}
              </span>
              {/* Gold dot separator */}
              <span className="ml-8 md:ml-16 w-1 h-1 rounded-full bg-[#d4b07c]/40"></span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

