import React from 'react';
import WhyUs from '../components/WhyUs';
import Process from '../components/Process';
import Testimonials from '../components/Testimonials';
import FinalCTA from '../components/FinalCTA';

export default function About() {
  return (
    <div className="pt-24 md:pt-32 pb-8 bg-black text-white">
      {/* About Page Hero */}
      <section className="px-6 md:px-12 max-w-7xl mx-auto mb-20 md:mb-28 text-left">
        <span className="text-xs uppercase tracking-[0.25em] text-[#d4b07c] font-bold block mb-4 font-display">
          ABOUT ELITE STUDIOS
        </span>
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight uppercase leading-[1.05] font-creative mb-8 max-w-5xl">
          CRAFT, DISCIPLINE, AND <span className="text-[#d4b07c]">UNCOMPROMISING</span> DETAIL.
        </h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pt-8 border-t border-white/10 items-start">
          <div className="lg:col-span-7">
            <p className="text-lg sm:text-xl text-gray-300 font-light leading-relaxed mb-6">
              Elite Studios is an independent digital creative studio. We combine editorial design, brand strategy, film production, and frontend engineering into singular brand experiences.
            </p>
            <p className="text-sm text-gray-400 font-light leading-relaxed">
              We started with a straightforward conviction: most websites and digital brand assets are over-engineered yet under-designed. We strip away generic patterns and replace them with sharp visual systems, tactile animations, and performance-focused code.
            </p>
          </div>
          
          <div className="lg:col-span-5 grid grid-cols-2 gap-6 bg-[#0b0b0b] p-6 border border-white/5">
            <div>
              <span className="block text-3xl font-extrabold text-[#d4b07c] font-display">2018</span>
              <span className="text-[10px] uppercase tracking-widest text-white/40 font-mono">Founded</span>
            </div>
            <div>
              <span className="block text-3xl font-extrabold text-white font-display">120+</span>
              <span className="text-[10px] uppercase tracking-widest text-white/40 font-mono">Projects Delivered</span>
            </div>
            <div>
              <span className="block text-3xl font-extrabold text-white font-display">100%</span>
              <span className="text-[10px] uppercase tracking-widest text-white/40 font-mono">Custom Built</span>
            </div>
            <div>
              <span className="block text-3xl font-extrabold text-[#d4b07c] font-display">GLOBAL</span>
              <span className="text-[10px] uppercase tracking-widest text-white/40 font-mono">Client Base</span>
            </div>
          </div>
        </div>
      </section>

      {/* Why Us Section */}
      <WhyUs />

      {/* Process Section */}
      <Process />

      {/* Testimonials Section */}
      <Testimonials />

      {/* Final Call To Action */}
      <FinalCTA />
    </div>
  );
}
