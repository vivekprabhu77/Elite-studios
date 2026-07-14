import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import HeroBg from '../assets/Hero_bg.png';

export default function Hero() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col justify-center pt-20 pb-16 px-6 md:px-12 lg:px-16 overflow-hidden bg-[#050505]"
      style={{
        backgroundImage: `url(${HeroBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* Dark gradient overlay to blend image to the left and provide readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-[#050505]/75 to-transparent pointer-events-none z-0"></div>

      <div className="max-w-[1600px] mx-auto w-full relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center h-full">
        {/* Left Text Column */}
        <div
          className={`lg:col-span-7 flex flex-col justify-center text-left transition-all duration-1000 delay-100 transform ${
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {/* WE CREATE — padded left to align with text after the gold bar */}
          <span className="text-sm md:text-base font-semibold tracking-[0.35em] text-white/95 uppercase mb-4 pl-[22px] sm:pl-[30px]">
            WE CREATE
          </span>

          {/* Heading with vertical bar */}
          <h1 className="text-[48px] sm:text-[68px] md:text-[84px] lg:text-[90px] xl:text-[96px] font-extrabold font-display leading-[0.95] tracking-tight text-white uppercase mb-6 flex items-stretch gap-4 sm:gap-6">
            <span className="inline-block w-[6px] sm:w-[8px] bg-[#d4b07c] self-stretch"></span>
            <span className="flex flex-col justify-center">
              <span>DIGITAL</span>
              <span>EXPERIENCES</span>
            </span>
          </h1>

          {/* DESIGN. DEVELOP. DELIVER. — padded to align with E in EXPERIENCES */}
          <div className="text-xs md:text-sm font-bold tracking-[0.4em] text-white uppercase mb-8 pl-[22px] sm:pl-[30px]">
            DESIGN. DEVELOP. DELIVER.
          </div>

          {/* Description */}
          <p className="text-sm md:text-base text-gray-400 font-light leading-relaxed mb-16 max-w-lg pl-[22px] sm:pl-[30px]">
            Elite Studios is your digital partner for powerful designs, stunning videos, smart websites, live streaming & complete digital solutions.
          </p>

          {/* Explore Our Services Button */}
          <div className="flex pl-[22px] sm:pl-[30px]">
            <Link
              to="/work"
              className="group inline-flex items-center border border-[#d4b07c] text-[#d4b07c] hover:bg-[#d4b07c] hover:text-black transition-all duration-300 rounded-sm"
            >
              <span className="text-[10px] md:text-[11px] font-bold tracking-[0.25em] uppercase px-7 md:px-9 py-3.5 md:py-4">
                EXPLORE OUR SERVICES &gt;
              </span>
            </Link>
          </div>
        </div>

        {/* Right Empty Column to display mockup */}
        <div className="lg:col-span-5 hidden lg:block"></div>
      </div>

      {/* Scroll Down Indicator — bottom center */}
      <div
        className={`absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 transition-all duration-1000 delay-500 transform ${
          isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}
      >
        <span className="text-[9px] md:text-[10px] font-bold tracking-[0.3em] text-white/50 uppercase">
          Scroll
        </span>
        <div className="w-[1px] h-8 bg-white/30 relative overflow-hidden">
          <div className="w-full h-3 bg-[#d4b07c] animate-bounce absolute top-0"></div>
        </div>
      </div>

      {/* Signature and Cursive Text at the bottom right */}
      <div
        className={`absolute bottom-8 right-6 md:bottom-12 md:right-12 z-20 flex flex-col items-end transition-all duration-1000 delay-300 transform ${
          isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        <span className="font-script text-[48px] md:text-[68px] text-[#d4b07c] leading-none mb-1 select-none pr-8">
          Creativity
        </span>
        <span className="text-[9px] md:text-[10px] font-bold tracking-[0.3em] text-white uppercase whitespace-nowrap">
          CAN MAKE MAN CREATIVE
        </span>
      </div>
    </section>
  );
}
