import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  Globe,
  Palette,
  Megaphone,
  Radio,
  Scissors,
  Share2,
  ArrowUpRight
} from 'lucide-react';
import heroImg from '../assets/hero.png';
import { getWhatsAppProjectUrl } from '../utils/whatsapp';
import ParticleText from './ParticleText';
import TrueFocus from './TrueFocus';

const HERO_SERVICES = [
  {
    id: 'web',
    name: 'Website Design & Development',
    line1: 'Website Design',
    line2: '& Development',
    icon: Globe,
    url: '/work?category=Website%20Design',
    angleDeg: -75 // Top / Top-Right
  },
  {
    id: 'graphic',
    name: 'Graphic Design',
    line1: 'Graphic Design',
    line2: '',
    icon: Palette,
    url: '/work?category=Graphic%20Design',
    angleDeg: -30 // Upper-Right (contained inside screen)
  },
  {
    id: 'marketing',
    name: 'Digital Marketing',
    line1: 'Digital Marketing',
    line2: '',
    icon: Megaphone,
    url: '/work?category=Digital%20Marketing',
    angleDeg: 35 // Lower-Right (contained inside screen)
  },
  {
    id: 'video',
    name: 'Video Editing',
    line1: 'Video Editing',
    line2: '',
    icon: Scissors,
    url: '/work?category=Video%20Editing',
    angleDeg: 85 // Bottom / Bottom-Right
  },
  {
    id: 'streaming',
    name: 'Live Streaming',
    line1: 'Live Streaming',
    line2: '',
    icon: Radio,
    url: '/work?category=Live%20Streaming',
    angleDeg: 145 // Lower-Left
  },
  {
    id: 'social',
    name: 'Entire Social Media Handling',
    line1: 'Entire Social',
    line2: 'Media Handling',
    icon: Share2,
    url: '/work?category=Social%20Media',
    angleDeg: 215 // Upper-Left (clears headline text)
  }
];

export default function Hero() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 1200
  );
  const leaveTimerRef = useRef(null);

  useEffect(() => {
    setIsLoaded(true);

    if (typeof window === 'undefined') return;

    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);

    const mediaMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaMotion.matches);
    const handleMotionChange = (e) => setPrefersReducedMotion(e.matches);
    mediaMotion.addEventListener('change', handleMotionChange);

    return () => {
      window.removeEventListener('resize', handleResize);
      mediaMotion.removeEventListener('change', handleMotionChange);
      if (leaveTimerRef.current) clearTimeout(leaveTimerRef.current);
    };
  }, []);

  // Compute responsive radial ellipse radius for circular formation (contained within viewport, ample gap)
  let rx = 240;
  let ry = 215;
  if (windowWidth >= 1440) {
    rx = 255;
    ry = 225;
  } else if (windowWidth >= 1200) {
    rx = 240;
    ry = 210;
  } else if (windowWidth >= 1024) {
    rx = 215;
    ry = 190;
  } else if (windowWidth >= 768) {
    rx = 190;
    ry = 170;
  } else if (windowWidth >= 480) {
    rx = 155;
    ry = 140;
  } else {
    rx = 125;
    ry = 115;
  }

  // Smooth hover handlers with debounce to prevent any micro-flickering across gaps
  const handleMouseEnter = () => {
    if (leaveTimerRef.current) {
      clearTimeout(leaveTimerRef.current);
      leaveTimerRef.current = null;
    }
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    leaveTimerRef.current = setTimeout(() => {
      setIsHovered(false);
    }, 150);
  };

  const handleTouchToggle = (e) => {
    if (e.target.closest('a')) return;
    setIsHovered((prev) => !prev);
  };

  const isRevealed = isHovered || prefersReducedMotion;

  return (
    <section
      id="home"
      data-designer-selector=".hero-section-responsive"
      className="relative min-h-[100svh] lg:min-h-screen flex flex-col justify-center items-center pt-24 sm:pt-28 lg:pt-24 pb-28 sm:pb-32 lg:pb-20 px-4 sm:px-8 md:px-12 lg:px-16 overflow-hidden bg-[#F9F6F0] hero-section-responsive select-none"
    >
      {/* Ambient Warm Golden Background Glows */}
      <div className="absolute top-[12%] right-[10%] w-[550px] h-[550px] bg-[#B68631]/[0.035] rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-[15%] left-[5%] w-[450px] h-[450px] bg-[#B68631]/[0.025] rounded-full blur-[120px] pointer-events-none" />

      {/* Main 2-Column Hero Grid */}
      <div className="max-w-[1600px] w-full mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 xl:gap-12 items-center my-auto">
        
        {/* ======================================================== */}
        {/* LEFT COLUMN: Typography & Branding                       */}
        {/* ======================================================== */}
        <div
          className={`lg:col-span-6 xl:col-span-6 flex flex-col justify-center text-left transition-all duration-1000 delay-100 transform ${
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {/* Interactive Particle Text: 2-line ELITE STUDIOS */}
          <div className="w-full max-w-[480px] sm:max-w-[520px] relative z-10 -ml-1 sm:-ml-2 mb-2 sm:mb-3">
            <ParticleText
              lines={['ELITE', 'STUDIOS']}
              text="ELITE\nSTUDIOS"
              colors={['#393E41']}
              fontSize={windowWidth < 480 ? 78 : windowWidth < 768 ? 98 : windowWidth < 1280 ? 118 : 138}
              autoFit={true}
              align="left"
              lineHeight={0.84}
              particleSize={windowWidth < 640 ? 8 : 10}
              particleCount={50}
              mouseEnabled={true}
              mouseRadius={75}
              mouseForce={35}
              replay={true}
              style={{
                width: '100%',
                height: windowWidth < 480 ? '150px' : windowWidth < 768 ? '185px' : windowWidth < 1280 ? '220px' : '250px',
                minHeight: windowWidth < 480 ? '130px' : windowWidth < 768 ? '165px' : '200px'
              }}
            />
          </div>

          {/* SIDDAPURA subline */}
          <div className="text-[11px] sm:text-xs md:text-sm font-bold tracking-[0.55em] text-[#393E41]/60 uppercase mb-3 sm:mb-4 pl-1 font-mono">
            S I D D A P U R A
          </div>

          {/* Interactive TrueFocus Keywords */}
          <div className="w-full flex justify-start mb-4 sm:mb-6 z-20">
            <TrueFocus
              sentence="WEBSITE GRAPHICS VIDEO DIGITAL STREAM"
              focusStyle="box"
              easing="spring"
              order="sequential"
              blurAmount={3.5}
              focusScale={1.03}
              unfocusedOpacity={0.35}
              borderColor="#B68631"
              cornerSize={12}
              borderWidth={2.5}
              animationDuration={0.8}
              pauseBetweenAnimations={0.9}
              className="hero-true-focus"
            />
          </div>

          {/* Description */}
          <p className="text-xs sm:text-sm md:text-base text-[#393E41]/80 font-normal leading-relaxed max-w-md sm:max-w-lg mb-6 sm:mb-8">
            One studio for all your creative needs. We design, develop and create experiences that make your brand stand out.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center gap-3 sm:gap-4">
            <Link
              to="/work"
              className="inline-flex items-center gap-2.5 bg-[#393E41] hover:bg-[#25282A] text-[#F9F6F0] px-6 sm:px-7 py-3 sm:py-3.5 rounded-full font-bold text-xs sm:text-sm tracking-wider uppercase transition-all duration-300 shadow-[0_4px_18px_rgba(57,62,65,0.25)] hover:shadow-xl group cursor-pointer"
            >
              <span>OUR WORK</span>
              <ArrowUpRight className="w-4 h-4 text-[#B68631] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
            <a
              href={getWhatsAppProjectUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 bg-transparent border-2 border-[#B68631]/40 hover:border-[#B68631] text-[#393E41] hover:text-[#B68631] px-6 sm:px-7 py-3 sm:py-3.5 rounded-full font-bold text-xs sm:text-sm tracking-wider uppercase transition-all duration-300 group cursor-pointer"
            >
              <span>LET'S TALK</span>
              <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>
        </div>

        {/* ======================================================== */}
        {/* RIGHT COLUMN: Interactive Circular Hero Artwork          */}
        {/* ======================================================== */}
        <div
          className={`lg:col-span-6 xl:col-span-6 flex items-center justify-center relative w-full transition-all duration-1000 delay-200 transform ${
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {/* Unified Hover/Touch Interactive Stage */}
          <div
            className="relative w-full max-w-[460px] sm:max-w-[500px] lg:max-w-[530px] xl:max-w-[570px] aspect-square flex items-center justify-center cursor-pointer touch-manipulation group/stage"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={handleTouchToggle}
          >
            {/* Ambient Golden Radial Glow behind central artwork */}
            <div
              className={`absolute inset-0 bg-[#B68631]/20 rounded-full blur-[100px] pointer-events-none transition-all duration-700 ${
                isRevealed ? 'scale-125 opacity-70' : 'scale-95 opacity-30'
              }`}
            />

            {/* Glowing Golden Orbit Rings matching reference illustration */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none transition-opacity duration-700"
              style={{ opacity: isRevealed ? 0.95 : 0.35 }}
              viewBox="-320 -280 640 560"
            >
              <defs>
                <linearGradient id="goldOrbitGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#B68631" stopOpacity="0.8" />
                  <stop offset="50%" stopColor="#FFEFA6" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#B68631" stopOpacity="0.8" />
                </linearGradient>
                <filter id="goldGlow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>

              {/* Outer Golden Orbit Ring */}
              <ellipse
                cx="0"
                cy="0"
                rx={rx}
                ry={ry}
                fill="none"
                stroke="url(#goldOrbitGrad)"
                strokeWidth="1.5"
                strokeDasharray="4 6"
                filter="url(#goldGlow)"
              />

              {/* Inner subtle orbit ring */}
              <ellipse
                cx="0"
                cy="0"
                rx={rx * 0.82}
                ry={ry * 0.82}
                fill="none"
                stroke="#B68631"
                strokeOpacity="0.18"
                strokeWidth="1"
              />
            </svg>

            {/* Central Hero Artwork Image (User-supplied transparent hero.png) */}
            <div className="relative z-10 w-[60%] max-w-[270px] sm:max-w-[310px] lg:max-w-[340px] flex items-center justify-center">
              <img
                src={heroImg}
                alt="Elite Studios Creative Hub"
                className={`w-full h-auto object-contain select-none pointer-events-none transition-all duration-700 ${
                  isRevealed
                    ? 'scale-[1.03] drop-shadow-[0_25px_50px_rgba(182,134,49,0.35)]'
                    : 'scale-100 drop-shadow-[0_15px_35px_rgba(0,0,0,0.18)]'
                }`}
                style={{
                  animation: prefersReducedMotion ? 'none' : 'float 6s ease-in-out infinite'
                }}
              />
            </div>

            {/* Exactly 6 Service Elements Arranged in Circular Formation */}
            {HERO_SERVICES.map((service, index) => {
              const IconComp = service.icon;
              const rad = (service.angleDeg * Math.PI) / 180;
              const x = Math.round(rx * Math.cos(rad));
              const y = Math.round(ry * Math.sin(rad));

              // Compute transform based on hover state (smooth radial explosion outward)
              const transformStyle = isRevealed
                ? `translate3d(calc(-50% + ${x}px), calc(-50% + ${y}px), 0) scale(1)`
                : `translate3d(calc(-50% + ${Math.round(x * 0.35)}px), calc(-50% + ${Math.round(y * 0.35)}px), 0) scale(0.55)`;

              return (
                <Link
                  key={service.id}
                  to={service.url}
                  title={`View ${service.name} Portfolio`}
                  aria-label={`View ${service.name} Portfolio`}
                  className={`group/pill absolute left-1/2 top-1/2 flex items-center gap-2.5 sm:gap-3 px-3 sm:px-4 py-2 sm:py-2.5 rounded-2xl bg-[#1E2022]/95 border border-[#B68631]/60 shadow-[0_6px_25px_rgba(0,0,0,0.45),0_0_18px_rgba(182,134,49,0.3)] backdrop-blur-md cursor-pointer transition-all duration-500 ease-out hover:scale-110 hover:border-[#B68631] hover:shadow-[0_0_28px_rgba(182,134,49,0.65),0_10px_30px_rgba(0,0,0,0.6)] whitespace-nowrap z-20 ${
                    isRevealed
                      ? 'opacity-100 pointer-events-auto'
                      : 'opacity-0 pointer-events-none'
                  }`}
                  style={{
                    transform: transformStyle,
                    transitionDelay: isRevealed ? `${index * 55}ms` : '0ms'
                  }}
                >
                  {/* Service Icon Badge */}
                  <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-xl bg-[#B68631]/15 border border-[#B68631]/30 flex items-center justify-center text-[#B68631] shrink-0 group-hover/pill:bg-[#B68631] group-hover/pill:text-[#1E2022] transition-colors duration-300">
                    <IconComp className="w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform duration-300 group-hover/pill:scale-110" />
                  </div>

                  {/* Service Name (2 lines for multi-word services, matching reference) */}
                  <span className="text-[11px] sm:text-xs md:text-[13px] font-bold text-[#F9F6F0] tracking-tight leading-tight block text-left font-display">
                    {service.line1}
                    {service.line2 && <span className="block">{service.line2}</span>}
                  </span>

                  {/* Diagonal Arrow Indicator */}
                  <div className="w-4 h-4 sm:w-4.5 sm:h-4.5 rounded-full flex items-center justify-center text-[#B68631]/80 group-hover/pill:text-[#B68631] transition-transform duration-300 group-hover/pill:translate-x-0.5 group-hover/pill:-translate-y-0.5 shrink-0">
                    <ArrowUpRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </div>
                </Link>
              );
            })}

            {/* Clean Studio Interactive Hover Prompt */}
            <div
              className={`absolute bottom-2 sm:bottom-4 left-1/2 -translate-x-1/2 z-20 px-4 py-1.5 rounded-full bg-[#1E2022]/85 border border-[#B68631]/40 backdrop-blur-md shadow-md pointer-events-none transition-all duration-300 ${
                isRevealed ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
              }`}
            >
              <span className="text-[10px] sm:text-[11px] font-bold tracking-[0.25em] text-[#F9F6F0] uppercase font-mono">
                HOVER
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Down Indicator — bottom center */}
      <div
        className={`absolute bottom-3 sm:bottom-6 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1.5 transition-all duration-1000 delay-500 pointer-events-none ${
          isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}
      >
        <span className="text-[9px] md:text-[10px] font-bold tracking-[0.3em] text-[#393E41]/50 uppercase font-mono">
          Scroll
        </span>
        <div className="w-[18px] h-7 rounded-full border border-[#393E41]/30 flex items-start justify-center p-1">
          <div className="w-1 h-2 rounded-full bg-[#B68631] animate-bounce" />
        </div>
      </div>

      {/* Signature and Cursive Text at the bottom right */}
      <div
        className={`absolute bottom-3 right-4 sm:bottom-6 sm:right-6 md:bottom-8 md:right-12 z-20 flex flex-col items-end transition-all duration-1000 delay-300 transform ${
          isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        <span
          data-designer-selector=".hero-cursive-title"
          data-designer-file="src/components/Hero.jsx"
          className="font-script text-[36px] sm:text-[46px] md:text-[56px] text-[#B68631] leading-none mb-0.5 select-none pr-1 sm:pr-4 hero-cursive-title"
        >
          Creativity
        </span>
        <span
          data-designer-selector=".hero-cursive-subtitle"
          data-designer-file="src/components/Hero.jsx"
          className="text-[8px] sm:text-[9px] md:text-[10px] font-bold tracking-[0.25em] sm:tracking-[0.3em] text-[#393E41] uppercase whitespace-nowrap font-mono hero-cursive-subtitle"
        >
          CAN MAKE MAN CREATIVE
        </span>
      </div>
    </section>
  );
}
