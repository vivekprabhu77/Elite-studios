import React from 'react';
import {
  Globe,
  Camera,
  Video,
  Palette,
  Megaphone,
  Radio,
  Layers,
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

const SERVICES = [
  {
    num: '01',
    title: 'Website Design & Development',
    desc: 'Designing and engineering editorial-grade, responsive websites that combine jaw-dropping layouts with clean frontend execution.',
    items: ['UI/UX Design', 'React / Vite', 'Animations'],
    icon: Globe
  },
  {
    num: '02',
    title: 'Photography',
    desc: 'Elite commercial, product, and brand photography captured with premium optics and styled to reflect pure luxury.',
    items: ['Studio Shoots', 'Art Direction', 'Editorial'],
    icon: Camera
  },
  {
    num: '03',
    title: 'Videography',
    desc: 'High-end cinematic video production, corporate storytelling, and dynamic commercial shoots from concept to execution.',
    items: ['Brand Reels', 'Cinematography', 'Direction'],
    icon: Video
  },
  {
    num: '04',
    title: 'Graphic Design',
    desc: 'Sophisticated corporate and artistic design assets crafted with rigorous typography standards and grid systems.',
    items: ['Typography', 'Key Visuals', 'Vector Art'],
    icon: Palette
  },
  {
    num: '05',
    title: 'Digital Marketing',
    desc: 'Data-backed growth marketing campaigns, SEO optimization, and hyper-targeted advertising strategies that convert.',
    items: ['Campaigns', 'SEO Execution', 'ROI Tracking'],
    icon: Megaphone
  },
  {
    num: '06',
    title: 'Live Streaming',
    desc: 'Broadcasting virtual events, webcasts, and high-fidelity multi-cam live streams with zero latency and clean audio.',
    items: ['Multi-Cam Setup', 'Live Audio Mix', 'Broadcast'],
    icon: Radio
  },
  {
    num: '07',
    title: 'Poster Making',
    desc: 'High-impact promotional posters, digital event key visuals, and marketing flyers that command visual attention.',
    items: ['Flyer Layouts', 'Key Visuals', 'Print Media'],
    icon: Layers
  },
  {
    num: '08',
    title: 'Video Editing',
    desc: 'Post-production mastery featuring detailed color grading, sound design, visual effects, and fluid pacing.',
    items: ['Color Grading', 'Sound Design', 'VFX / Motion'],
    icon: Scissors
  },
  {
    num: '09',
    title: 'Entire Social Media Handling',
    desc: 'Complete management of social handles, content calendars, cohesive aesthetic feeds, and organic community building.',
    items: ['Feed Aesthetics', 'Scheduling', 'Analytics'],
    icon: Share2
  }
];

function renderWidget(num) {
  switch (num) {
    case '01': // Website Design & Dev
      return (
        <div className="relative w-full h-full flex flex-col justify-start bg-black/40 border border-white/[0.02] rounded-sm overflow-hidden p-2 group-hover:bg-black/60 transition-colors duration-500">
          <div className="flex items-center gap-1.5 mb-1.5 pb-1 border-b border-white/[0.03]">
            <div className="w-1.5 h-1.5 rounded-full bg-red-500/60"></div>
            <div className="w-1.5 h-1.5 rounded-full bg-yellow-500/60"></div>
            <div className="w-1.5 h-1.5 rounded-full bg-green-500/60"></div>
            <div className="h-2 w-28 bg-white/[0.03] rounded-full mx-auto"></div>
          </div>
          <div className="flex-1 flex gap-2">
            {/* Left: layout skeleton */}
            <div className="flex-1 flex flex-col gap-1 text-left">
              <div className="h-1.5 w-10 bg-white/20 rounded-full"></div>
              <div className="h-4 w-full bg-white/[0.02] border border-white/[0.05] rounded-sm flex items-center justify-between px-1.5 transition-all duration-500 group-hover:translate-y-[-1px] group-hover:bg-[#d4b07c]/5">
                <div className="h-1 w-12 bg-white/15 rounded-full"></div>
                <div className="h-1 w-1 bg-[#d4b07c] rounded-full"></div>
              </div>
              <div className="h-6 w-full bg-gradient-to-tr from-[#d4b07c]/10 to-transparent border border-white/5 rounded-sm flex items-center justify-center">
                <span className="text-[5px] font-bold text-white/30">PREVIEW</span>
              </div>
            </div>
            {/* Right: mini terminal */}
            <div className="w-24 bg-black/40 border border-white/5 rounded-sm p-1.5 font-mono text-[7px] text-left text-white/40 flex flex-col justify-between">
              <div>
                <div>$ npm run build</div>
                <div className="text-emerald-400">✔ success in 1.2s</div>
              </div>
              <div className="w-full h-0.5 bg-white/5 rounded-full overflow-hidden">
                <div className="h-full bg-[#d4b07c] w-0 progress-fill-anim"></div>
              </div>
            </div>
          </div>
        </div>
      );
    case '02': // Photography
      return (
        <div className="relative w-full h-full flex items-center justify-center bg-black/40 border border-white/[0.02] rounded-sm overflow-hidden p-4 group-hover:bg-black/60 transition-colors duration-500">
          {/* Viewfinder frame */}
          <div className="absolute inset-2 border border-white/10 pointer-events-none rounded-sm"></div>
          {/* Focus markers */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 border border-[#d4b07c]/50 rounded-full flex items-center justify-center group-hover:scale-95 transition-transform duration-300">
            <div className="w-1 h-1 bg-[#d4b07c] rounded-full"></div>
          </div>
          <div className="absolute top-4 left-4 font-mono text-[7px] text-white/30 tracking-wider">[ o ]</div>
          <div className="absolute bottom-4 right-4 font-mono text-[7px] text-white/30">ISO 200</div>
          <div className="absolute bottom-4 left-4 font-mono text-[7px] text-[#d4b07c]">F/2.8 1/250s</div>
          <div className="absolute top-4 right-4 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
            <span className="font-mono text-[7px] text-white/40">AF-S</span>
          </div>
        </div>
      );
    case '03': // Videography
      return (
        <div className="relative w-full h-full flex items-center justify-center bg-black/40 border border-white/[0.02] rounded-sm overflow-hidden p-4 group-hover:bg-black/60 transition-colors duration-500">
          <div className="absolute inset-2 border border-white/10 pointer-events-none rounded-sm"></div>
          {/* Recording indicator */}
          <div className="absolute top-4 left-4 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse"></span>
            <span className="font-mono text-[7px] text-white/80 tracking-widest font-bold">REC</span>
          </div>
          <div className="absolute top-4 right-4 font-mono text-[7px] text-white/30">1080P 60FPS</div>
          <div className="absolute bottom-4 left-4 font-mono text-[7px] text-white/30">00:02:14:08</div>
          {/* Grid visual overlay */}
          <div className="w-full h-[1px] bg-white/5 absolute top-1/3"></div>
          <div className="w-full h-[1px] bg-white/5 absolute top-2/3"></div>
          <div className="h-full w-[1px] bg-white/5 absolute left-1/3"></div>
          <div className="h-full w-[1px] bg-white/5 absolute left-2/3"></div>
          {/* Audio monitor */}
          <div className="absolute bottom-4 right-4 flex gap-0.5 items-end h-3">
            <div className="w-0.5 h-1 bg-emerald-500"></div>
            <div className="w-0.5 h-2 bg-emerald-500"></div>
            <div className="w-0.5 h-3 bg-[#d4b07c]"></div>
            <div className="w-0.5 h-1.5 bg-emerald-500"></div>
          </div>
        </div>
      );
    case '04': // Graphic Design
      return (
        <div className="relative w-full h-full flex items-center justify-center bg-black/40 border border-white/[0.02] rounded-sm overflow-hidden p-4 group-hover:bg-black/60 transition-colors duration-500">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:10px_10px] pointer-events-none"></div>
          <svg className="w-28 h-20" viewBox="0 0 100 60" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10,30 C30,10 70,50 90,30" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
            <circle cx="10" cy="30" r="2.5" fill="#d4b07c" stroke="white" strokeWidth="0.5" className="node-dot" />
            <circle cx="50" cy="30" r="2.5" fill="#d4b07c" stroke="white" strokeWidth="0.5" className="node-dot" />
            <circle cx="90" cy="30" r="2.5" fill="#d4b07c" stroke="white" strokeWidth="0.5" className="node-dot" />
            <path d="M50,30 L50,15" stroke="#d4b07c" strokeWidth="0.5" />
            <circle cx="50" cy="15" r="1.5" fill="white" />
          </svg>
          <div className="absolute bottom-2 right-3 font-mono text-[7px] text-white/30 uppercase tracking-widest">
            Vector anchor tool
          </div>
        </div>
      );
    case '05': // Digital Marketing
      return (
        <div className="relative w-full h-full flex items-center justify-center bg-black/40 border border-white/[0.02] rounded-sm overflow-hidden p-4 group-hover:bg-black/60 transition-colors duration-500">
          <svg className="w-full h-20" viewBox="0 0 100 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0,35 Q15,35 30,25 T60,20 T90,5" stroke="rgba(255,255,255,0.1)" strokeWidth="1.5" />
            <path d="M0,35 Q15,35 30,25 T60,20 T90,5" stroke="#d4b07c" strokeWidth="2" strokeLinecap="round" className="chart-path" />
            <path d="M0,35 Q15,35 30,25 T60,20 T90,5 L90,40 L0,40 Z" fill="url(#chart-grad)" opacity="0.05" />
            <defs>
              <linearGradient id="chart-grad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#d4b07c" />
                <stop offset="100%" stopColor="transparent" />
              </linearGradient>
            </defs>
          </svg>
          <div className="absolute top-2 right-3 bg-[#d4b07c]/10 border border-[#d4b07c]/20 text-[#d4b07c] text-[8px] font-bold px-2 py-0.5 rounded-full tracking-wider group-hover:scale-105 transition-transform duration-300">
            +324.8% CTR
          </div>
          <div className="absolute bottom-2 left-3 font-mono text-[7px] text-white/20 uppercase tracking-widest">
            Campaign analytics
          </div>
        </div>
      );
    case '06': // Live Streaming
      return (
        <div className="relative w-full h-full flex flex-col justify-between bg-black/40 border border-white/[0.02] rounded-sm overflow-hidden p-2.5 group-hover:bg-black/60 transition-colors duration-500">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-pulse"></span>
              <span className="text-[#d4b07c] font-bold font-mono text-[8px] tracking-widest">LIVE</span>
            </div>
            <span className="font-mono text-[7px] text-white/30">12,408 viewers</span>
          </div>
          <div className="flex-1 flex items-center justify-center my-1.5 bg-[#050505]/40 border border-white/[0.03] rounded-sm relative">
            <svg className="w-6 h-6 text-[#d4b07c]/40 group-hover:scale-110 group-hover:text-[#d4b07c]/80 transition-all duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <polygon points="23 7 16 12 23 17 23 7" />
              <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
            </svg>
          </div>
          <div className="flex items-center justify-between text-[6px] font-mono text-white/20">
            <span>BITRATE: 6800 kb/s</span>
            <span>AUDIO: 320 kb/s</span>
          </div>
        </div>
      );
    case '07': // Poster Making
      return (
        <div className="relative w-full h-full flex items-center justify-center bg-black/40 border border-white/[0.02] rounded-sm overflow-hidden p-4 group-hover:bg-black/60 transition-colors duration-500">
          <div className="relative w-28 h-22 border border-white/10 bg-black/60 overflow-hidden flex flex-col p-2 transition-transform duration-500 group-hover:scale-[1.03] group-hover:rotate-1">
            <div className="border-b border-white/5 pb-1 flex justify-between items-center">
              <span className="font-bebas text-[11px] tracking-widest text-white">EVENT</span>
              <span className="font-mono text-[5px] text-[#d4b07c]">2026 EDITION</span>
            </div>
            <div className="flex-1 flex gap-2 mt-1.5 items-center justify-between">
              <div className="w-12 h-12 bg-gradient-to-tr from-[#d4b07c]/20 to-transparent border border-[#d4b07c]/10 rounded-sm flex items-center justify-center">
                <span className="text-[8px] font-script text-[#d4b07c]">Art</span>
              </div>
              <div className="flex-1 flex flex-col gap-1 text-left">
                <div className="h-1 w-full bg-white/20 rounded-full"></div>
                <div className="h-1 w-full bg-white/15 rounded-full"></div>
                <div className="h-1 w-1/2 bg-[#d4b07c] rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      );
    case '08': // Video Editing
      return (
        <div className="relative w-full h-full flex flex-col justify-between bg-black/40 border border-white/[0.02] rounded-sm overflow-hidden p-2.5 group-hover:bg-black/60 transition-colors duration-500">
          <div className="w-full flex justify-between border-b border-white/5 pb-1 font-mono text-[6px] text-white/20 select-none">
            <span>0:00</span>
            <span>0:01</span>
            <span>0:02</span>
            <span>0:03</span>
            <span>0:04</span>
          </div>
          <div className="flex items-end justify-center gap-1.5 h-12 my-1">
            <div className="w-1 h-3 bg-white/15 rounded-full audio-bar audio-bar-1"></div>
            <div className="w-1 h-6 bg-white/25 rounded-full audio-bar audio-bar-2"></div>
            <div className="w-1 h-9 bg-[#d4b07c] rounded-full audio-bar audio-bar-3"></div>
            <div className="w-1 h-5 bg-white/20 rounded-full audio-bar audio-bar-4"></div>
            <div className="w-1 h-7 bg-white/25 rounded-full audio-bar audio-bar-5"></div>
            <div className="w-1 h-10 bg-[#d4b07c] rounded-full audio-bar audio-bar-6"></div>
            <div className="w-1 h-4 bg-white/15 rounded-full audio-bar audio-bar-7"></div>
          </div>
          <div className="w-full h-1.5 bg-white/5 border border-white/10 rounded-sm relative flex items-center">
            <div className="absolute left-1/2 -translate-x-1/2 w-1.5 h-1.5 rotate-45 bg-[#d4b07c] border border-black shadow-[0_0_8px_#d4b07c] transition-all duration-700 group-hover:left-[70%]"></div>
          </div>
        </div>
      );
    case '09': // Entire Social Media Handling
      return (
        <div className="relative w-full h-full flex flex-col justify-between bg-black/40 border border-white/[0.02] rounded-sm overflow-hidden p-3 group-hover:bg-black/60 transition-colors duration-500">
          <div className="flex items-center justify-between border-b border-white/[0.03] pb-1.5 text-[8px] text-white/30 font-mono">
            <span>Social Dashboard</span>
            <span className="text-emerald-400 font-bold">Live Synced</span>
          </div>
          <div className="grid grid-cols-4 gap-2 my-1">
            <div className="flex flex-col items-center gap-1 p-1.5 bg-white/[0.02] border border-white/5 rounded-sm hover:border-pink-500/30 transition-colors duration-300">
              <InstagramLogo />
              <span className="text-[5px] text-white/50">Instagram</span>
            </div>
            <div className="flex flex-col items-center gap-1 p-1.5 bg-white/[0.02] border border-white/5 rounded-sm hover:border-red-500/30 transition-colors duration-300">
              <YoutubeLogo />
              <span className="text-[5px] text-white/50">YouTube</span>
            </div>
            <div className="flex flex-col items-center gap-1 p-1.5 bg-white/[0.02] border border-white/5 rounded-sm hover:border-blue-500/30 transition-colors duration-300">
              <LinkedinLogo />
              <span className="text-[5px] text-white/50">LinkedIn</span>
            </div>
            <div className="flex flex-col items-center gap-1 p-1.5 bg-white/[0.02] border border-white/5 rounded-sm hover:border-blue-600/30 transition-colors duration-300">
              <FacebookLogo />
              <span className="text-[5px] text-white/50">Facebook</span>
            </div>
          </div>
          <div className="flex items-center justify-between text-[7px] text-white/30 pt-1.5 border-t border-white/[0.03] font-mono">
            <span>Engagement: +18.4%</span>
            <span className="text-[#d4b07c]">@elitestudios</span>
          </div>
        </div>
      );
    default:
      return null;
  }
}

export default function Services() {
  const handleMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);
  };

  return (
    <section id="services" data-designer-selector=".services-section-responsive" className="py-32 px-6 md:px-12 lg:px-16 bg-[#050505] relative overflow-hidden services-section-responsive">
      {/* Background Spotlight */}
      <div className="absolute top-[20%] right-[-10%] w-[500px] h-[500px] bg-white/[0.01] rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-[1600px] mx-auto w-full">
        {/* Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-24 reveal">
          <div className="lg:col-span-8 text-left">
            <span className="text-xs uppercase tracking-widest text-[#d4b07c] font-bold block mb-4 font-display">
              Capabilities
            </span>
            <h2 className="text-white tracking-tight leading-[1.2] font-creative">
              <span
                data-designer-selector=".services-title-responsive"
                data-designer-file="src/components/Services.jsx"
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold block services-title-responsive"
              >
                WE DEFINE
              </span>
              <span
                data-designer-selector=".services-title-responsive"
                data-designer-file="src/components/Services.jsx"
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold block services-title-responsive"
              >
                THE FUTURE OF
              </span>
              <span
                data-designer-selector=".services-banner-responsive"
                data-designer-file="src/components/Services.jsx"
                className="inline-block bg-[#E4B028] text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold px-3 py-1.5 md:px-5 md:py-2.5 mt-4 select-none services-banner-responsive"
              >
                CREATIVE DIGITAL EXPERIENCES
              </span>
            </h2>
          </div>
          <div className="lg:col-span-4 text-left lg:text-right">
            <p className="text-sm text-gray-400 font-light max-w-sm ml-auto leading-relaxed">
              We merge art direction and design engineering to deliver elite digital products that command respect.
            </p>
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <div
                key={service.num}
                onMouseMove={handleMouseMove}
                data-designer-selector=".services-card-responsive"
                className="card-glow flex flex-col justify-between p-8 md:p-10 border border-white/5 bg-[#0b0b0b] hover:bg-[#0f0f0f] hover:border-[#d4b07c]/20 transition-all duration-500 rounded-none h-[500px] group text-left reveal services-card-responsive"
                style={{ transitionDelay: `${index * 0.05}s` }}
              >
                <div>
                  {/* Top Bar inside Card */}
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-mono text-xs text-white/30 group-hover:text-[#d4b07c]/80 transition-colors duration-300">
                      {service.num}
                    </span>
                    <div className="w-10 h-10 flex items-center justify-center border border-white/5 bg-[#0d0d0d] group-hover:border-[#d4b07c]/30 transition-colors duration-500 rounded-none">
                      <IconComponent className="w-4.5 h-4.5 text-[#d4b07c] group-hover:scale-110 transition-transform duration-300" />
                    </div>
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-xl font-bold text-white group-hover:text-[#d4b07c] tracking-tight mb-3 font-display transition-colors duration-300">
                    {service.title}
                  </h3>
                  <p className="text-xs text-gray-400 font-light leading-relaxed group-hover:text-gray-300 transition-colors duration-300 mb-6">
                    {service.desc}
                  </p>

                  {/* Visual Widget */}
                  <div className="w-full h-36 bg-[#050505]/40 border border-white/[0.02] rounded-sm overflow-hidden mb-2">
                    {renderWidget(service.num)}
                  </div>
                </div>

                {/* Footer of Card */}
                <div className="mt-6 border-t border-white/[0.04] pt-4 flex justify-between items-end">
                  <div className="flex flex-wrap gap-x-3 gap-y-1">
                    {service.items.slice(0, 3).map((item) => (
                      <span key={item} className="text-[9px] uppercase tracking-wider text-white/40">
                        {item}
                      </span>
                    ))}
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-white/20 group-hover:text-[#d4b07c] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300" />
                </div>
              </div>
            );
          })}
        </div>

        {/* View All Button */}
        <div className="mt-16 text-center reveal">
          <a
            href="#contact"
            className="inline-flex items-center gap-3 px-8 py-4 text-xs font-bold uppercase tracking-widest border border-white/10 hover:border-[#d4b07c] text-white hover:text-[#d4b07c] transition-all duration-500 group"
          >
            <span>Explore All Capabilities</span>
            <ArrowUpRight className="w-4 h-4 text-white/50 group-hover:text-[#d4b07c] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300" />
          </a>
        </div>
      </div>
    </section>
  );
}
