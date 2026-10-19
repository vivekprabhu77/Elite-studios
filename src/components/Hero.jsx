import React, { useState, useEffect } from 'react';
import ParticleText from './ParticleText';
import TrueFocus from './TrueFocus';

export default function Hero() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <section
      id="home"
      data-designer-selector=".hero-section-responsive"
      className="relative min-h-[100svh] lg:min-h-screen flex flex-col justify-center items-center pt-20 pb-20 px-4 sm:px-8 md:px-12 overflow-hidden bg-[#F6F7EB] hero-section-responsive"
    >
      <div className="max-w-[1600px] w-full mx-auto relative z-10 flex flex-col justify-center items-center h-full my-auto -translate-y-6 sm:-translate-y-8 md:-translate-y-12">
        <ParticleText
          text="ELITE STUDIOS"
          colors={['#393E41']}
          fontSize={175}
          autoFit={true}
          particleSize={12}
          particleCount={50}
          mouseEnabled={true}
          mouseRadius={75}
          mouseForce={35}
          replay={true}
          style={{ width: '100%', height: '420px', minHeight: '280px' }}
        />

        <div className="w-full flex justify-center -mt-6 sm:-mt-10 md:-mt-14 z-20 px-4">
          <TrueFocus
            sentence="WEBSITE GRAPHICS VIDEO DIGITAL STREAM"
            focusStyle="box"
            easing="spring"
            order="sequential"
            blurAmount={3.5}
            focusScale={1.03}
            unfocusedOpacity={0.35}
            borderColor="#E94F37"
            cornerSize={16}
            borderWidth={3}
            animationDuration={0.8}
            pauseBetweenAnimations={0.9}
          />
        </div>
      </div>

      {/* Scroll Down Indicator — bottom center */}
      <div
        className={`absolute bottom-3 sm:bottom-6 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1.5 transition-all duration-1000 delay-500 transform hero-scroll-indicator ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
      >
        <span className="text-[9px] md:text-[10px] font-bold tracking-[0.3em] text-[#393E41]/50 uppercase">
          Scroll
        </span>
        <div className="w-[1px] h-6 sm:h-8 bg-[#393E41]/30 relative overflow-hidden">
          <div className="w-full h-2.5 sm:h-3 bg-[#E94F37] animate-bounce absolute top-0"></div>
        </div>
      </div>

      {/* Signature and Cursive Text at the bottom right */}
      <div
        className={`absolute bottom-3 right-4 sm:bottom-8 sm:right-6 md:bottom-12 md:right-12 z-20 flex flex-col items-end transition-all duration-1000 delay-300 transform hero-signature-box ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
      >
        <span
          data-designer-selector=".hero-cursive-title"
          data-designer-file="src/components/Hero.jsx"
          className="font-script text-[36px] sm:text-[48px] md:text-[68px] text-[#E94F37] leading-none mb-0.5 select-none pr-2 sm:pr-8 hero-cursive-title"
        >
          Creativity
        </span>
        <span
          data-designer-selector=".hero-cursive-subtitle"
          data-designer-file="src/components/Hero.jsx"
          className="text-[8px] sm:text-[9px] md:text-[10px] font-bold tracking-[0.25em] sm:tracking-[0.3em] text-[#393E41] uppercase whitespace-nowrap hero-cursive-subtitle"
        >
          CAN MAKE MAN CREATIVE
        </span>
      </div>
    </section>
  );
}
