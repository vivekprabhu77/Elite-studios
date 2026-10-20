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

const InstagramLogo = () => (
  <svg className="w-5 h-5 text-pink-500 transition-transform duration-300 group-hover:scale-110" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const YoutubeLogo = () => (
  <svg className="w-5 h-5 text-red-500 transition-transform duration-300 group-hover:scale-110" viewBox="0 0 24 24" fill="currentColor">
    <path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.11C19.517 3.545 12 3.545 12 3.545s-7.517 0-9.388.508a3.003 3.003 0 0 0-2.11 2.11C0 8.033 0 12 0 12s0 3.967.502 5.837a3.003 3.003 0 0 0 2.11 2.11c1.871.508 9.388.508 9.388.508s7.517 0 9.388-.508a3.003 3.003 0 0 0 2.11-2.11C24 15.967 24 12 24 12s0-3.967-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
  </svg>
);

const LinkedinLogo = () => (
  <svg className="w-5 h-5 text-blue-400 transition-transform duration-300 group-hover:scale-110" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
  </svg>
);

const FacebookLogo = () => (
  <svg className="w-5 h-5 text-blue-600 transition-transform duration-300 group-hover:scale-110" viewBox="0 0 24 24" fill="currentColor">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);

export const SERVICES = [
  {
    num: '01',
    title: 'Website Design & Development',
    categoryTab: 'Website Design',
    desc: 'Designing and engineering editorial-grade, responsive websites that combine jaw-dropping layouts with clean frontend execution.',
    items: ['UI/UX Design', 'React / Vite', 'Animations'],
    icon: Globe
  },
  {
    num: '02',
    title: 'Graphic Design',
    categoryTab: 'Graphic Design',
    desc: 'Sophisticated corporate and artistic design assets crafted with rigorous typography standards and grid systems.',
    items: ['Typography', 'Key Visuals', 'Vector Art'],
    icon: Palette
  },
  {
    num: '03',
    title: 'Digital Marketing',
    categoryTab: 'Digital Marketing',
    desc: 'Data-backed growth marketing campaigns, SEO optimization, and hyper-targeted advertising strategies that convert.',
    items: ['Campaigns', 'SEO Execution', 'ROI Tracking'],
    icon: Megaphone
  },
  {
    num: '04',
    title: 'Live Streaming',
    categoryTab: 'Live Streaming',
    desc: 'Broadcasting virtual events, webcasts, and high-fidelity multi-cam live streams with zero latency and clean audio.',
    items: ['Multi-Cam Setup', 'Live Audio Mix', 'Broadcast'],
    icon: Radio
  },
  {
    num: '05',
    title: 'Video Editing',
    categoryTab: 'Video Editing',
    desc: 'Post-production mastery featuring detailed color grading, sound design, visual effects, and fluid pacing.',
    items: ['Color Grading', 'Sound Design', 'VFX / Motion'],
    icon: Scissors
  },
  {
    num: '06',
    title: 'Entire Social Media Handling',
    categoryTab: 'Social Media',
    desc: 'Complete management of social handles, content calendars, cohesive aesthetic feeds, and organic community building.',
    items: ['Feed Aesthetics', 'Scheduling', 'Analytics'],
    icon: Share2
  }
];

export function renderWidget(num) {
  switch (num) {
    case '01': // Website Design & Dev
      return (
        <div className="relative w-full h-full flex flex-col justify-start bg-[#2b2f32] border border-white/[0.06] rounded-xl overflow-hidden p-2.5 group-hover:bg-[#2b2f32]/90 transition-colors duration-500">
          <div className="flex items-center gap-1.5 mb-1.5 pb-1 border-b border-white/[0.04]">
            <div className="w-1.5 h-1.5 rounded-full bg-red-500/70"></div>
            <div className="w-1.5 h-1.5 rounded-full bg-yellow-500/70"></div>
            <div className="w-1.5 h-1.5 rounded-full bg-green-500/70"></div>
            <div className="h-1.5 w-20 bg-white/[0.06] rounded-full mx-auto"></div>
          </div>
          <div className="flex-1 flex gap-2">
            <div className="flex-1 flex flex-col gap-1 text-left justify-center">
              <div className="h-1.5 w-12 bg-white/20 rounded-full"></div>
              <div className="h-4 w-full bg-white/[0.03] border border-white/[0.06] rounded-md flex items-center justify-between px-1.5 transition-all duration-500 group-hover:bg-[#B68631]/15">
                <div className="h-1 w-10 bg-white/20 rounded-full"></div>
                <div className="h-1 w-1 bg-[#B68631] rounded-full"></div>
              </div>
              <div className="h-5 w-full bg-gradient-to-tr from-[#B68631]/20 to-transparent border border-white/5 rounded-md flex items-center justify-center">
                <span className="text-[6px] font-bold tracking-widest text-[#F9F6F0]/60">PREVIEW</span>
              </div>
            </div>
            <div className="w-24 bg-[#232729] border border-white/5 rounded-lg p-1.5 font-mono text-[7px] text-left text-[#F9F6F0]/60 flex flex-col justify-between">
              <div>
                <div>$ npm run build</div>
                <div className="text-emerald-400">✔ success in 1.1s</div>
              </div>
              <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                <div className="h-full bg-[#B68631] w-0 progress-fill-anim"></div>
              </div>
            </div>
          </div>
        </div>
      );
    case '02': // Graphic Design
      return (
        <div className="relative w-full h-full flex items-center justify-center bg-[#2b2f32] border border-white/[0.06] rounded-xl overflow-hidden p-3 group-hover:bg-[#2b2f32]/90 transition-colors duration-500">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:12px_12px] pointer-events-none"></div>
          <svg className="w-28 h-18" viewBox="0 0 100 60" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10,30 C30,10 70,50 90,30" stroke="rgba(255,255,255,0.18)" strokeWidth="1.2" />
            <circle cx="10" cy="30" r="3" fill="#B68631" stroke="white" strokeWidth="0.8" className="node-dot" />
            <circle cx="50" cy="30" r="3" fill="#B68631" stroke="white" strokeWidth="0.8" className="node-dot" />
            <circle cx="90" cy="30" r="3" fill="#B68631" stroke="white" strokeWidth="0.8" className="node-dot" />
            <path d="M50,30 L50,15" stroke="#B68631" strokeWidth="0.8" strokeDasharray="2 2" />
            <circle cx="50" cy="15" r="2" fill="white" />
          </svg>
          <div className="absolute bottom-2 right-3 font-mono text-[7px] text-[#F9F6F0]/40 uppercase tracking-widest">
            Vector anchor tool
          </div>
        </div>
      );
    case '03': // Digital Marketing
      return (
        <div className="relative w-full h-full flex items-center justify-center bg-[#2b2f32] border border-white/[0.06] rounded-xl overflow-hidden p-3 group-hover:bg-[#2b2f32]/90 transition-colors duration-500">
          <svg className="w-full h-18" viewBox="0 0 100 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0,35 Q15,35 30,25 T60,20 T90,5" stroke="rgba(255,255,255,0.12)" strokeWidth="1.5" />
            <path d="M0,35 Q15,35 30,25 T60,20 T90,5" stroke="#B68631" strokeWidth="2.2" strokeLinecap="round" className="chart-path" />
            <path d="M0,35 Q15,35 30,25 T60,20 T90,5 L90,40 L0,40 Z" fill="url(#chart-grad-pro)" opacity="0.15" />
            <defs>
              <linearGradient id="chart-grad-pro" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#B68631" />
                <stop offset="100%" stopColor="transparent" />
              </linearGradient>
            </defs>
          </svg>
          <div className="absolute top-2.5 right-3 bg-[#B68631]/20 border border-[#B68631]/40 text-[#B68631] text-[8px] font-bold px-2.5 py-0.5 rounded-full tracking-wider group-hover:scale-105 transition-transform duration-300">
            +324.8% CTR
          </div>
          <div className="absolute bottom-2 left-3 font-mono text-[7px] text-[#F9F6F0]/30 uppercase tracking-widest">
            Campaign analytics
          </div>
        </div>
      );
    case '04': // Live Streaming
      return (
        <div className="relative w-full h-full flex flex-col justify-between bg-[#2b2f32] border border-white/[0.06] rounded-xl overflow-hidden p-3 group-hover:bg-[#2b2f32]/90 transition-colors duration-500">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-pulse"></span>
              <span className="text-[#B68631] font-bold font-mono text-[8px] tracking-widest">LIVE</span>
            </div>
            <span className="font-mono text-[7px] text-[#F9F6F0]/40">12,408 viewers</span>
          </div>
          <div className="flex-1 flex items-center justify-center my-1 bg-[#232729] border border-white/[0.06] rounded-lg relative">
            <svg className="w-6 h-6 text-[#B68631]/80 group-hover:scale-110 group-hover:text-[#B68631] transition-all duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <polygon points="23 7 16 12 23 17 23 7" />
              <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
            </svg>
          </div>
          <div className="flex items-center justify-between text-[6px] font-mono text-[#F9F6F0]/35">
            <span>BITRATE: 6800 kb/s</span>
            <span>AUDIO: 320 kb/s</span>
          </div>
        </div>
      );
    case '05': // Video Editing
      return (
        <div className="relative w-full h-full flex flex-col justify-between bg-[#2b2f32] border border-white/[0.06] rounded-xl overflow-hidden p-3 group-hover:bg-[#2b2f32]/90 transition-colors duration-500">
          <div className="w-full flex justify-between border-b border-white/5 pb-1 font-mono text-[6px] text-[#F9F6F0]/30 select-none">
            <span>0:00</span>
            <span>0:01</span>
            <span>0:02</span>
            <span>0:03</span>
            <span>0:04</span>
          </div>
          <div className="flex items-end justify-center gap-1.5 h-11 my-1">
            <div className="w-1.5 h-3 bg-white/15 rounded-full audio-bar audio-bar-1"></div>
            <div className="w-1.5 h-6 bg-white/25 rounded-full audio-bar audio-bar-2"></div>
            <div className="w-1.5 h-9 bg-[#B68631] rounded-full audio-bar audio-bar-3"></div>
            <div className="w-1.5 h-5 bg-white/20 rounded-full audio-bar audio-bar-4"></div>
            <div className="w-1.5 h-7 bg-white/25 rounded-full audio-bar audio-bar-5"></div>
            <div className="w-1.5 h-10 bg-[#B68631] rounded-full audio-bar audio-bar-6"></div>
            <div className="w-1.5 h-4 bg-white/15 rounded-full audio-bar audio-bar-7"></div>
          </div>
          <div className="w-full h-1 bg-white/10 rounded-full relative flex items-center">
            <div className="absolute left-1/2 -translate-x-1/2 w-2 h-2 rotate-45 bg-[#B68631] border border-[#393E41] shadow-[0_0_8px_#B68631] transition-all duration-700 group-hover:left-[70%]"></div>
          </div>
        </div>
      );
    case '06': // Entire Social Media Handling
      return (
        <div className="relative w-full h-full flex flex-col justify-between bg-[#2b2f32] border border-white/[0.06] rounded-xl overflow-hidden p-3 group-hover:bg-[#2b2f32]/90 transition-colors duration-500">
          <div className="flex items-center justify-between border-b border-white/[0.03] pb-1 text-[8px] text-[#F9F6F0]/40 font-mono">
            <span>Social Dashboard</span>
            <span className="text-emerald-400 font-bold">Live Synced</span>
          </div>
          <div className="grid grid-cols-4 gap-1.5 my-1">
            <div className="flex flex-col items-center gap-0.5 p-1 bg-white/[0.02] border border-white/5 rounded-md hover:border-pink-500/30 transition-colors duration-300">
              <InstagramLogo />
              <span className="text-[5px] text-white/50">Instagram</span>
            </div>
            <div className="flex flex-col items-center gap-0.5 p-1 bg-white/[0.02] border border-white/5 rounded-md hover:border-red-500/30 transition-colors duration-300">
              <YoutubeLogo />
              <span className="text-[5px] text-white/50">YouTube</span>
            </div>
            <div className="flex flex-col items-center gap-0.5 p-1 bg-white/[0.02] border border-white/5 rounded-md hover:border-blue-500/30 transition-colors duration-300">
              <LinkedinLogo />
              <span className="text-[5px] text-white/50">LinkedIn</span>
            </div>
            <div className="flex flex-col items-center gap-0.5 p-1 bg-white/[0.02] border border-white/5 rounded-md hover:border-blue-600/30 transition-colors duration-300">
              <FacebookLogo />
              <span className="text-[5px] text-white/50">Facebook</span>
            </div>
          </div>
          <div className="flex items-center justify-between text-[7px] text-[#F9F6F0]/40 pt-1 border-t border-white/[0.03] font-mono">
            <span>Engagement: +18.4%</span>
            <span className="text-[#B68631]">@elitestudios</span>
          </div>
        </div>
      );
    default:
      return null;
  }
}

function ServiceCard({ service, index, isScrollMode, cardRef, handleMouseMove }) {
  const IconComponent = service.icon;

  if (isScrollMode) {
    return (
      <div
        key={service.num}
        ref={cardRef}
        onMouseMove={handleMouseMove}
        className="services-scroll-card card-glow bg-[#393E41] text-left rounded-2xl border border-white/10 group flex flex-col justify-between shadow-2xl select-auto p-4 sm:p-5"
        style={{
          width: 'min(86vw, 340px)',
          height: 'min(86vw, 340px)',
          aspectRatio: '1 / 1',
          transform: 'translate3d(-50%, -50%, 0)',
          opacity: index === 0 ? 1 : 0
        }}
      >
        {/* Top Header of Card — Clean, Premium, NO numbers */}
        <div className="flex items-center justify-between shrink-0 mb-1">
          <span className="text-[9px] sm:text-[10px] uppercase font-mono tracking-wider px-2.5 py-0.5 rounded-full bg-[#B68631]/10 border border-[#B68631]/25 text-[#B68631] font-semibold">
            {service.categoryTab}
          </span>
          <div className="w-8 h-8 flex items-center justify-center border border-white/10 bg-[#2b2f32] group-hover:border-[#B68631]/40 transition-colors duration-500 rounded-xl shrink-0">
            <IconComponent className="w-3.5 h-3.5 text-[#B68631] group-hover:scale-110 transition-transform duration-300" />
          </div>
        </div>

        {/* Title & Description */}
        <div className="shrink-0 mb-1">
          <Link
            to={`/work?category=${encodeURIComponent(service.categoryTab)}`}
            className="block text-sm sm:text-base font-bold text-[#F9F6F0] group-hover:text-[#B68631] tracking-tight mb-0.5 font-display transition-colors duration-300 cursor-pointer line-clamp-1"
            title={`View ${service.title} Portfolio`}
          >
            {service.title}
          </Link>
          <p className="text-[11px] sm:text-xs text-[#F9F6F0]/70 font-light leading-snug group-hover:text-[#F9F6F0]/90 transition-colors duration-300 line-clamp-2">
            {service.desc}
          </p>
        </div>

        {/* Visual Widget */}
        <div className="w-full flex-1 min-h-[70px] max-h-[105px] bg-[#2b2f32]/80 border border-white/[0.04] rounded-xl overflow-hidden my-0.5">
          {renderWidget(service.num)}
        </div>

        {/* Footer of Card */}
        <div className="border-t border-[#F9F6F0]/10 pt-2 flex justify-between items-center shrink-0">
          <div className="flex flex-wrap gap-x-1.5 gap-y-0.5">
            {service.items.slice(0, 3).map((item) => (
              <span key={item} className="text-[7.5px] sm:text-[8px] uppercase tracking-wider text-[#F9F6F0]/50 font-mono">
                {item}
              </span>
            ))}
          </div>
          <Link
            to={`/work?category=${encodeURIComponent(service.categoryTab)}`}
            className="w-7 h-7 flex items-center justify-center rounded-lg border border-white/10 hover:border-[#B68631]/40 hover:bg-[#B68631]/15 text-[#F9F6F0]/40 hover:text-[#B68631] group-hover:text-[#B68631] transition-all duration-300 cursor-pointer group/btn shrink-0"
            title={`View ${service.title} Portfolio`}
            aria-label={`View ${service.title} Portfolio`}
          >
            <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>
      </div>
    );
  }

  // Standard Grid Card Layout (for ServicesPage and prefers-reduced-motion fallback)
  return (
    <div
      key={service.num}
      onMouseMove={handleMouseMove}
      data-designer-selector=".services-card-responsive"
      className="card-glow flex flex-col justify-between p-5 sm:p-6 md:p-10 border border-transparent bg-[#393E41] hover:bg-[#393E41] hover:border-[#B68631]/30 transition-all duration-500 rounded-none h-auto md:h-[500px] group text-left reveal services-card-responsive shadow-lg"
      style={{ transitionDelay: `${index * 0.05}s` }}
    >
      <div>
        {/* Top Bar inside Card */}
        <div className="flex items-center justify-between mb-4 md:mb-6">
          <span className="font-mono text-xs text-[#F9F6F0]/40 group-hover:text-[#B68631] transition-colors duration-300">
            {service.num}
          </span>
          <div className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center border border-white/10 bg-[#2f3336] group-hover:border-[#B68631]/30 transition-colors duration-500 rounded-none">
            <IconComponent className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-[#B68631] group-hover:scale-110 transition-transform duration-300" />
          </div>
        </div>

        {/* Title & Description */}
        <Link
          to={`/work?category=${encodeURIComponent(service.categoryTab)}`}
          className="block text-lg sm:text-xl font-bold text-[#F9F6F0] group-hover:text-[#B68631] tracking-tight mb-2 md:mb-3 font-display transition-colors duration-300 hover:text-[#B68631] cursor-pointer"
          title={`View ${service.title} Portfolio`}
        >
          {service.title}
        </Link>
        <p className="text-xs text-[#F9F6F0]/70 font-light leading-relaxed group-hover:text-[#F9F6F0]/90 transition-colors duration-300 mb-4 md:mb-6">
          {service.desc}
        </p>

        {/* Visual Widget */}
        <div className="w-full h-28 sm:h-32 md:h-36 bg-[#2f3336]/70 border border-white/[0.04] rounded-sm overflow-hidden mb-2">
          {renderWidget(service.num)}
        </div>
      </div>

      {/* Footer of Card */}
      <div className="mt-4 md:mt-6 border-t border-[#F9F6F0]/10 pt-3 md:pt-4 flex justify-between items-end">
        <div className="flex flex-wrap gap-x-3 gap-y-1">
          {service.items.slice(0, 3).map((item) => (
            <span key={item} className="text-[9px] uppercase tracking-wider text-[#F9F6F0]/50">
              {item}
            </span>
          ))}
        </div>
        <Link
          to={`/work?category=${encodeURIComponent(service.categoryTab)}`}
          className="w-8 h-8 flex items-center justify-center rounded-none border border-transparent hover:border-[#B68631]/40 hover:bg-[#B68631]/15 text-[#F9F6F0]/40 hover:text-[#B68631] group-hover:text-[#B68631] transition-all duration-300 cursor-pointer group/btn shrink-0"
          title={`View ${service.title} Portfolio`}
          aria-label={`View ${service.title} Portfolio`}
        >
          <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover/btn:scale-110" />
        </Link>
      </div>
    </div>
  );
}

export default function Services({ isHomepage = false }) {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== 'undefined' ? window.innerWidth < 768 : false
  );

  const containerRef = useRef(null);
  const cardRefs = useRef([]);
  const targetProgressRef = useRef(0);
  const currentProgressRef = useRef(0);
  const rafIdRef = useRef(null);

  // Motion preference and responsive detection
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mediaMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaMotion.matches);
    const handleMotionChange = (e) => setPrefersReducedMotion(e.matches);
    mediaMotion.addEventListener('change', handleMotionChange);

    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => {
      mediaMotion.removeEventListener('change', handleMotionChange);
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  // Scroll animation sequence for homepage (both desktop and mobile)
  useEffect(() => {
    if (!isHomepage || prefersReducedMotion) return;

    // 6 evenly distributed focal centers for the 6 cards
    const FOCAL_POINTS = [0.06, 0.24, 0.42, 0.60, 0.78, 0.94];
    const STEP = 0.18;

    const updateScrollProgress = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const windowH = window.innerHeight;
      const totalScrollable = rect.height - windowH;
      if (totalScrollable <= 0) return;

      const currentScroll = -rect.top;
      const p = Math.max(0, Math.min(1, currentScroll / totalScrollable));
      targetProgressRef.current = p;
    };

    const applyTransforms = () => {
      // Smooth luxury dampening towards target progress (slow & majestic)
      const diff = targetProgressRef.current - currentProgressRef.current;
      currentProgressRef.current += diff * 0.085;
      const p = currentProgressRef.current;

      const mobile = window.innerWidth < 768;
      const w = window.innerWidth;

      // Multi-stage scale & cascade matching newest user reference diagram:
      // - Center Card: BIGGER (peakScale = 1.10)
      // - Step 1 away (Top-Left 1, Bottom-Right 1): small (smallScale = 0.62)
      // - Step 2 away (Top-Left 2, Bottom-Right 2): small and small (tinyScale = 0.40)
      // - 4 cards visible simultaneously along the staircase
      // - Cards arrive smoothly and slowly

      let peakScale = 1.10;
      let smallScale = 0.62;
      let tinyScale = 0.40;
      let xStep = 370;
      let yStep = 180;
      let xStep2 = 580;
      let yStep2 = 290;

      if (w >= 1440) {
        peakScale = 1.12;
        smallScale = 0.62;
        tinyScale = 0.40;
        xStep = 385;
        yStep = 185;
        xStep2 = 610;
        yStep2 = 300;
      } else if (w >= 1200) {
        peakScale = 1.10;
        smallScale = 0.62;
        tinyScale = 0.40;
        xStep = 370;
        yStep = 180;
        xStep2 = 580;
        yStep2 = 290;
      } else if (w >= 1024) {
        peakScale = 1.06;
        smallScale = 0.60;
        tinyScale = 0.38;
        xStep = 320;
        yStep = 160;
        xStep2 = 500;
        yStep2 = 255;
      } else if (w >= 768) {
        peakScale = 1.03;
        smallScale = 0.58;
        tinyScale = 0.38;
        xStep = 260;
        yStep = 145;
        xStep2 = 400;
        yStep2 = 230;
      } else {
        // Mobile screen: comfortable compact diagonal with generous spacing
        peakScale = 1.02;
        smallScale = 0.66;
        tinyScale = 0.42;
        xStep = 32;
        yStep = 98;
        xStep2 = 54;
        yStep2 = 170;
      }

      const smoothStep = (t) => {
        const c = Math.max(0, Math.min(1, t));
        return c * c * (3 - 2 * c);
      };

      let closestCard = 0;
      let minDistance = 999;

      cardRefs.current.forEach((cardEl, i) => {
        if (!cardEl) return;
        const focal = FOCAL_POINTS[i];
        let u = (p - focal) / STEP;

        // Boundary locks:
        // 1. First card (Website Design & Dev) stays hero centered at the start
        if (i === 0 && u < 0) {
          u = 0;
        }
        // 2. Final card (Entire Social Media Handling) stays hero centered at the ending!
        // It never drifts to top-left into the header or leaves the center empty!
        if (i === SERVICES.length - 1 && u > 0) {
          u = 0;
        }

        const absU = Math.abs(u);

        if (absU < minDistance) {
          minDistance = absU;
          closestCard = i;
        }

        let x = 0;
        let y = 0;
        let scale = peakScale;
        let opacity = 1.0;
        let rotZ = 0;
        let rotY = 0;
        let rotX = 0;
        let zIndex = 10;
        let pointerEvents = 'none';

        if (mobile) {
          // ==========================================
          // MOBILE: ULTRA-PREMIUM HORIZONTAL GLIDE
          // Card enters smoothly from RIGHT screen edge
          // Locks front & center (100% visible, unobstructed)
          // Exits smoothly off LEFT screen edge
          // Zero vertical stacking, clean & clear UI/UX
          // ==========================================
          const mobileTravel = Math.max(w * 0.95, 340);

          if (u < 0) {
            // Card entering from RIGHT side
            if (u < -1.5) {
              opacity = 0;
              x = mobileTravel * 1.4;
              scale = 0.85;
            } else if (u < -1.0) {
              // Sliding into peek view on right screen edge
              const progress = (u + 1.5) / 0.5;
              const t = smoothStep(progress);
              x = mobileTravel * 1.4 - t * (mobileTravel * 0.4);
              scale = 0.85 + t * 0.05;
              opacity = t * 0.70;
              rotY = -9.0 + t * 2.0;
              rotZ = 1.2;
              zIndex = 10;
            } else {
              // Gliding from right edge (u = -1) into Center (u = 0)
              const progress = 1 + u; // 0 to 1
              const t = smoothStep(progress);
              x = (1 - t) * mobileTravel;
              scale = 0.90 + t * 0.12; // 0.90 -> 1.02
              opacity = 0.70 + t * 0.30; // 0.70 -> 1.0
              rotY = (1 - t) * (-7.0); // subtle 3D tilt facing center
              rotZ = (1 - t) * 1.2;
              zIndex = Math.round(15 + t * 20);
            }
          } else {
            // Card exiting to LEFT side
            if (u <= 1.0) {
              // Gliding from Center (u = 0) off to the left (u = 1)
              const progress = u; // 0 to 1
              const t = smoothStep(progress);
              x = -t * mobileTravel;
              scale = 1.02 - t * 0.12; // 1.02 -> 0.90
              opacity = 1.0 - t * 0.30;
              rotY = t * 7.0; // subtle 3D tilt gliding left
              rotZ = -t * 1.2;
              zIndex = Math.round(35 - t * 15);
            } else if (u <= 1.5) {
              // Gliding fully off the left screen edge
              const progress = (u - 1.0) / 0.5;
              const t = smoothStep(progress);
              x = -mobileTravel - t * (mobileTravel * 0.4);
              scale = 0.90 - t * 0.05;
              opacity = Math.max(0, 0.70 * (1 - t));
              rotY = 7.0 + t * 2.0;
              rotZ = -1.2;
              zIndex = 5;
            } else {
              opacity = 0;
              x = -mobileTravel * 1.4;
            }
          }
        } else {
          // ==========================================
          // DESKTOP: 3-STEP DIAGONAL CASCADE STAIRCASS
          // Top-Left (small) -> Center (BIGGER) -> Bottom-Right (small & tiny)
          // ==========================================
          if (u < 0) {
            // Upcoming cards: stepping from Corner (tiny) -> Bottom-Right (small) -> Center (BIGGER)
            if (u < -2.4) {
              opacity = 0;
            } else if (u < -2.0) {
              // Emerging into Step 2 (Bottom-Right 2: small and small)
              const progress = (u + 2.4) / 0.4;
              const t = smoothStep(progress);
              x = xStep2 + (1 - t) * (xStep * 0.35);
              y = yStep2 + (1 - t) * (yStep * 0.35);
              scale = 0.28 + t * (tinyScale - 0.28);
              opacity = t * 0.40;
              rotZ = (1 - t) * 3.0 + t * 2.0;
              rotY = -4.0 * t;
              rotX = 2.5 * t;
              zIndex = 5;
            } else if (u < -1.0) {
              // Moving from Step 2 (small and small) to Step 1 (small)
              const progress = 2 + u; // 0 to 1
              const t = smoothStep(progress);
              x = xStep2 - t * (xStep2 - xStep);
              y = yStep2 - t * (yStep2 - yStep);
              scale = tinyScale + t * (smallScale - tinyScale);
              opacity = 0.40 + t * (0.65 - 0.40);
              rotZ = 2.0 - t * 0.8;
              rotY = -4.0 + t * 1.0;
              rotX = 2.5 - t * 0.8;
              zIndex = Math.round(10 + t * 10);
            } else {
              // Moving from Step 1 (small) into Center (BIGGER!)
              const progress = 1 + u; // 0 to 1
              const t = smoothStep(progress);
              x = (1 - t) * xStep;
              y = (1 - t) * yStep;
              scale = smallScale + t * (peakScale - smallScale);
              opacity = 0.65 + t * 0.35;
              rotZ = (1 - t) * 1.2;
              rotY = (1 - t) * (-3.0);
              rotX = (1 - t) * 1.7;
              zIndex = Math.round(20 + t * 20);
            }
          } else {
            // Active or exiting card: moving from Center (BIGGER) -> Top-Left (small) -> Far Top-Left (small and small)
            if (u <= 1.0) {
              // Moving from Center (BIGGER) into Step 1 (Top-Left: small)
              const progress = u; // 0 to 1
              const t = smoothStep(progress);
              x = -t * xStep;
              // Arc exit: moves left promptly so it clears the center header before rising
              y = -Math.pow(t, 1.3) * yStep;
              scale = peakScale - t * (peakScale - smallScale);
              opacity = 1.0 - t * 0.40; // stays 0.60 at top-left
              rotZ = -t * 1.2;
              rotY = t * 3.0;
              rotX = -t * 1.5;
              zIndex = Math.round(40 - t * 15);
            } else if (u <= 2.0) {
              // Moving from Step 1 (small) into Step 2 (small and small)
              const progress = u - 1.0; // 0 to 1
              const t = smoothStep(progress);
              x = -xStep - t * (xStep2 - xStep);
              y = -yStep - t * (yStep2 - yStep);
              scale = smallScale - t * (smallScale - tinyScale);
              opacity = Math.max(0, 0.60 * (1 - t));
              rotZ = -1.2 - t * 1.5;
              rotY = 3.0 + t * 1.0;
              rotX = -1.5;
              zIndex = Math.max(5, Math.round(25 - t * 15));
            } else {
              opacity = 0;
            }
          }
        }

        // Active focal state
        if (absU < 0.35) {
          pointerEvents = 'auto';
          cardEl.classList.add('services-card-active');
        } else {
          cardEl.classList.remove('services-card-active');
        }

        cardEl.style.transform = `translate3d(calc(-50% + ${x.toFixed(1)}px), calc(-50% + ${y.toFixed(1)}px), 0) scale(${scale.toFixed(3)}) rotateZ(${rotZ.toFixed(2)}deg) rotateY(${rotY.toFixed(2)}deg) rotateX(${rotX.toFixed(2)}deg)`;
        cardEl.style.opacity = opacity.toFixed(3);
        cardEl.style.zIndex = zIndex;
        cardEl.style.pointerEvents = pointerEvents;
        cardEl.style.visibility = opacity <= 0.005 ? 'hidden' : 'visible';
      });

      setActiveCardIndex((prev) => (prev !== closestCard ? closestCard : prev));

      rafIdRef.current = requestAnimationFrame(applyTransforms);
    };

    updateScrollProgress();
    window.addEventListener('scroll', updateScrollProgress, { passive: true });
    window.addEventListener('resize', updateScrollProgress);
    rafIdRef.current = requestAnimationFrame(applyTransforms);

    return () => {
      window.removeEventListener('scroll', updateScrollProgress);
      window.removeEventListener('resize', updateScrollProgress);
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
    };
  }, [isHomepage, prefersReducedMotion]);

  const scrollToCard = (index) => {
    if (!containerRef.current) return;
    const FOCAL_POINTS = [0.06, 0.24, 0.42, 0.60, 0.78, 0.94];
    const rect = containerRef.current.getBoundingClientRect();
    const totalScrollable = rect.height - window.innerHeight;
    if (totalScrollable <= 0) return;
    const targetY = window.scrollY + rect.top + FOCAL_POINTS[index] * totalScrollable;
    window.scrollTo({
      top: targetY,
      behavior: 'smooth'
    });
  };

  const touchStartXRef = useRef(null);
  const touchStartYRef = useRef(null);

  const handleTouchStart = (e) => {
    touchStartXRef.current = e.touches[0].clientX;
    touchStartYRef.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e) => {
    if (touchStartXRef.current === null || touchStartYRef.current === null) return;
    const deltaX = e.changedTouches[0].clientX - touchStartXRef.current;
    const deltaY = e.changedTouches[0].clientY - touchStartYRef.current;
    if (Math.abs(deltaX) > 40 && Math.abs(deltaX) > Math.abs(deltaY) * 1.1) {
      if (deltaX < 0 && activeCardIndex < SERVICES.length - 1) {
        scrollToCard(activeCardIndex + 1);
      } else if (deltaX > 0 && activeCardIndex > 0) {
        scrollToCard(activeCardIndex - 1);
      }
    }
    touchStartXRef.current = null;
    touchStartYRef.current = null;
  };

  const handleMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);
  };

  // Homepage Scroll-driven Experience (for both Desktop & Mobile, zero slider, zero category pills above cards)
  if (isHomepage && !prefersReducedMotion) {
    return (
      <section
        id="services"
        ref={containerRef}
        data-designer-selector=".services-section-responsive"
        className="scroll-mt-28 md:scroll-mt-36 relative bg-[#F9F6F0] services-section-responsive"
        style={{ height: isMobile ? '520vh' : '680vh' }}
      >
        {/* Ambient Subtle Background Spotlights */}
        <div className="absolute top-[10%] left-[-10%] w-[500px] h-[500px] bg-[#B68631]/[0.025] rounded-full blur-[140px] pointer-events-none"></div>
        <div className="absolute bottom-[20%] right-[-10%] w-[600px] h-[600px] bg-[#B68631]/[0.025] rounded-full blur-[160px] pointer-events-none"></div>

        {/* Sticky Stage Viewport */}
        <div className="sticky top-0 h-screen h-[100dvh] w-full overflow-hidden flex flex-col justify-between pt-16 sm:pt-20 md:pt-20 pb-4 sm:pb-6 px-4 sm:px-6 md:px-12 max-w-[1600px] mx-auto select-none pointer-events-auto">
          {/* Top Section Header — Clean without numbers or name pills */}
          <div className="text-center pt-1 z-30 shrink-0">
            <span className="text-[10px] sm:text-xs uppercase tracking-[0.25em] text-[#B68631] font-bold block mb-1 font-display">
              WHAT WE DO
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#393E41] uppercase mb-1 font-display">
              OUR CORE SERVICES
            </h2>
            <p className="text-xs sm:text-sm text-[#393E41]/75 font-light leading-relaxed max-w-xl mx-auto hidden sm:block">
              We craft premium digital experiences that transform ambitious brands into industry leaders.
            </p>
          </div>

          {/* Center 3D Perspective Stage — Mobile horizontal glide / Desktop 3-step diagonal stair */}
          <div
            className="relative w-full flex-1 flex items-center justify-center min-h-0 mt-2 sm:mt-5 mb-2 touch-pan-y"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            <div
              className="relative w-full max-w-[1400px] h-full mx-auto flex items-center justify-center"
              style={{ perspective: '1400px', transform: isMobile ? 'translateY(6px)' : 'translateY(28px)' }}
            >
              {SERVICES.map((service, index) => (
                <ServiceCard
                  key={service.num}
                  service={service}
                  index={index}
                  isScrollMode={true}
                  cardRef={(el) => (cardRefs.current[index] = el)}
                  handleMouseMove={handleMouseMove}
                />
              ))}
            </div>
          </div>

          {/* Bottom Bar: Clean Action Controls (NO slider, NO overlap) */}
          <div className="z-20 shrink-0 pb-3 sm:pb-4 flex items-center justify-between gap-3 max-w-4xl mx-auto w-full px-4 sm:px-6">
            {/* Current Active Service Label */}
            <div className="flex items-center gap-2 text-xs font-medium text-[#393E41]/80">
              <span className="w-1.5 h-1.5 rounded-full bg-[#B68631]"></span>
              <span className="font-semibold text-[#393E41]">{SERVICES[activeCardIndex].title}</span>
            </div>

            {/* View All Capabilities Button */}
            <Link
              to="/work"
              className="inline-flex items-center gap-2 text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#393E41] hover:text-[#B68631] transition-colors duration-300 group cursor-pointer"
            >
              <span>Explore All Capabilities</span>
              <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>
        </div>
      </section>
    );
  }

  // 2. Standard Grid Layout (ServicesPage and prefers-reduced-motion fallback)
  return (
    <section
      id="services"
      data-designer-selector=".services-section-responsive"
      className="scroll-mt-28 md:scroll-mt-36 pt-20 md:pt-28 pb-12 md:pb-16 px-6 md:px-12 lg:px-16 bg-[#F9F6F0] relative overflow-hidden services-section-responsive"
    >
      {/* Background Spotlight */}
      <div className="absolute top-[20%] right-[-10%] w-[500px] h-[500px] bg-[#B68631]/[0.02] rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-[1600px] mx-auto w-full">
        {/* Section Header */}
        <div className="mb-8 lg:mb-10 text-center reveal">
          <span className="text-xs uppercase tracking-[0.25em] text-[#B68631] font-bold block mb-1.5 font-display">
            WHAT WE DO
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#393E41] uppercase mb-2 font-display">
            OUR CORE SERVICES
          </h2>
          <p className="text-sm sm:text-base text-[#393E41]/75 font-light leading-relaxed max-w-xl mx-auto">
            We craft premium digital experiences that transform ambitious brands into industry leaders.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((service, index) => (
            <ServiceCard
              key={service.num}
              service={service}
              index={index}
              isScrollMode={false}
              handleMouseMove={handleMouseMove}
            />
          ))}
        </div>

        {/* View All Button */}
        <div className="mt-16 text-center reveal">
          <Link
            to="/work"
            className="inline-flex items-center gap-3 px-8 py-4 text-xs font-bold uppercase tracking-widest border border-[#393E41]/20 hover:border-[#B68631] text-[#393E41] hover:text-[#B68631] transition-all duration-500 group"
          >
            <span>Explore All Capabilities</span>
            <ArrowUpRight className="w-4 h-4 text-[#393E41]/50 group-hover:text-[#B68631] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300" />
          </Link>
        </div>
      </div>
    </section>
  );
}
