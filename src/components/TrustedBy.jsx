import React from 'react';

const BRANDS = [
  { name: 'AURELIA', style: 'font-display tracking-[0.25em] font-light' },
  { name: 'KRONOS', style: 'font-sans tracking-[0.3em] font-extrabold text-[13px]' },
  { name: 'VALO STUDIO', style: 'font-creative tracking-[0.1em] font-bold' },
  { name: 'NEON INC.', style: 'font-mono tracking-[0.15em] font-semibold text-[12px]' },
  { name: 'SOMA CREATIVE', style: 'font-display tracking-[0.2em] font-medium' },
  { name: 'VIRTUE CO.', style: 'font-sans tracking-[0.4em] font-light text-[11px]' },
  { name: 'OMNI GROUP', style: 'font-creative tracking-[0.15em] font-bold' },
  { name: 'VERVE', style: 'font-display tracking-[0.3em] font-extrabold' }
];

export default function TrustedBy() {
  // Double the array to make the marquee loop seamless
  const marqueeItems = [...BRANDS, ...BRANDS];

  return (
    <section className="py-16 border-y border-white/[0.06] bg-[#050505] overflow-hidden relative w-full">
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-16 mb-6 flex justify-between items-center">
        <span className="text-[10px] uppercase font-bold tracking-widest text-white/40">
          Selected Clients & Partners
        </span>
        <span className="text-[10px] uppercase font-bold tracking-widest text-white/40 hidden sm:block">
          Trusted Globally
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
          {marqueeItems.map((brand, index) => (
            <div
              key={index}
              className="flex items-center justify-center px-12 md:px-20 text-white/30 hover:text-white/80 transition-colors duration-500 cursor-default"
            >
              <span className={`text-base md:text-lg ${brand.style}`}>
                {brand.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
