import React from 'react';
import WhyUs from '../components/WhyUs';
import Process from '../components/Process';
import Testimonials from '../components/Testimonials';
import FinalCTA from '../components/FinalCTA';

export default function About() {
  return (
    <div className="pt-24 md:pt-32 pb-8 bg-[#F6F7EB] text-[#393E41]">
      {/* About Page Hero */}
      <section className="px-6 md:px-12 max-w-7xl mx-auto mb-20 md:mb-28 text-left">
        <span className="text-xs uppercase tracking-[0.25em] text-[#E94F37] font-bold block mb-4 font-display">
          ABOUT ELITE STUDIOS
        </span>
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight uppercase leading-[1.05] font-creative mb-8 max-w-5xl text-[#393E41]">
          CRAFT, DISCIPLINE, AND <span className="text-[#E94F37]">UNCOMPROMISING</span> DETAIL.
        </h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pt-8 border-t border-[#393E41]/10 items-start">
          <div className="lg:col-span-7">
            <p className="text-lg sm:text-xl text-[#393E41] font-light leading-relaxed mb-6">
              Elite Studios is a full-service digital creative studio based in Siddapura. We specialize in Website Design & Development, Graphic Design, Digital Marketing, Live Streaming, Video Editing, and complete Social Media Handling.
            </p>
            <p className="text-sm text-[#393E41]/75 font-light leading-relaxed">
              We started with a straightforward conviction: businesses deserve end-to-end creative and digital solutions executed with uncompromised quality. We strip away generic templates and replace them with sharp visual systems, bespoke designs, targeted marketing strategies, and high-performance media production.
            </p>
          </div>
          
          <div className="lg:col-span-5 grid grid-cols-2 gap-6 bg-[#393E41] p-6 border border-[#393E41] rounded-2xl shadow-lg">
            <div>
              <span className="block text-3xl font-extrabold text-[#E94F37] font-display">2021</span>
              <span className="text-[10px] uppercase tracking-widest text-[#F6F7EB]/60 font-mono">Founded</span>
            </div>
            <div>
              <span className="block text-3xl font-extrabold text-[#F6F7EB] font-display">600+</span>
              <span className="text-[10px] uppercase tracking-widest text-[#F6F7EB]/60 font-mono">Projects Delivered</span>
            </div>
            <div>
              <span className="block text-3xl font-extrabold text-[#F6F7EB] font-display">100%</span>
              <span className="text-[10px] uppercase tracking-widest text-[#F6F7EB]/60 font-mono">Custom Built</span>
            </div>
            <div>
              <span className="block text-3xl font-extrabold text-[#E94F37] font-display">INDIAN</span>
              <span className="text-[10px] uppercase tracking-widest text-[#F6F7EB]/60 font-mono">Client Base</span>
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
