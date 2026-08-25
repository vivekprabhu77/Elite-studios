import React, { useEffect, useRef, useState } from 'react';
import { 
  Globe, 
  Palette, 
  Megaphone, 
  Radio, 
  Scissors, 
  Share2, 
  ArrowUpRight,
  RotateCcw,
  Layers
} from 'lucide-react';
import logo from '../assets/ELITE STUDIOS.webp';
import { getWhatsAppProjectUrl } from '../utils/whatsapp';

export default function Services3DBox() {
  const canvasRef = useRef(null);
  const activePillRef = useRef(null);

  const [activeService, setActiveService] = useState(0);
  const [phase, setPhase] = useState('orbit'); // 'orbit' | 'imploding' | 'united'
  const [orbitalAngle, setOrbitalAngle] = useState(0);
  const [winWidth, setWinWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);

  // Track window resize
  useEffect(() => {
    const handleResize = () => setWinWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Actual 6 Services of Elite Studios
  const services = [
    {
      id: '01',
      title: 'Website Design & Development',
      mobileLabel: '01 Web',
      desc: 'Designing and engineering editorial-grade, responsive websites combining jaw-dropping layouts with clean frontend execution.',
      icon: Globe
    },
    {
      id: '02',
      title: 'Graphic Design',
      mobileLabel: '02 Graphic',
      desc: 'Sophisticated corporate and artistic design assets crafted with rigorous typography standards and grid systems.',
      icon: Palette
    },
    {
      id: '03',
      title: 'Digital Marketing',
      mobileLabel: '03 Mktg',
      desc: 'Data-backed growth marketing campaigns, SEO optimization, and hyper-targeted advertising strategies that convert.',
      icon: Megaphone
    },
    {
      id: '04',
      title: 'Live Streaming',
      mobileLabel: '04 Live',
      desc: 'Broadcasting virtual events, webcasts, and high-fidelity multi-cam live streams with zero latency and clean audio.',
      icon: Radio
    },
    {
      id: '05',
      title: 'Video Editing',
      mobileLabel: '05 Video',
      desc: 'Post-production mastery featuring detailed color grading, sound design, visual effects, and fluid pacing.',
      icon: Scissors
    },
    {
      id: '06',
      title: 'Entire Social Media Handling',
      mobileLabel: '06 Social',
      desc: 'Complete management of social handles, content calendars, cohesive aesthetic feeds, and organic community building.',
      icon: Share2
    }
  ];

  // Auto-scroll active pill into view on mobile
  useEffect(() => {
    if (activePillRef.current) {
      activePillRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }
  }, [activeService]);

  // 3D Ring Rotation loop
  useEffect(() => {
    let animId;
    const spin = () => {
      if (phase === 'orbit') {
        setOrbitalAngle((prev) => (prev + 0.45) % 360);
      } else if (phase === 'imploding') {
        setOrbitalAngle((prev) => (prev + 3.0) % 360);
      }
      animId = requestAnimationFrame(spin);
    };
    animId = requestAnimationFrame(spin);
    return () => cancelAnimationFrame(animId);
  }, [phase]);

  // Auto-cycle through all 6 services
  useEffect(() => {
    if (phase !== 'orbit') return;

    const timer = setInterval(() => {
      setActiveService((prev) => {
        const next = prev + 1;
        if (next >= services.length) {
          triggerUnification();
          return 0;
        }
        return next;
      });
    }, 3600);

    return () => clearInterval(timer);
  }, [phase, services.length]);

  const triggerUnification = () => {
    if (phase !== 'orbit') return;
    setPhase('imploding');
    
    setTimeout(() => {
      setPhase('united');
    }, 950);
  };

  const selectServiceManually = (idx) => {
    setPhase('orbit');
    setActiveService(idx);
  };

  const resetToOrbit = () => {
    setPhase('orbit');
    setActiveService(0);
  };

  // Dynamic Orbital Radius tailored for exact screen size
  const isCentered = phase === 'imploding' || phase === 'united';

  const getOrbitalRadius = () => {
    if (isCentered) return { rx: 0, ry: 0 };
    if (winWidth < 400) return { rx: 95, ry: 40 };
    if (winWidth < 500) return { rx: 115, ry: 48 };
    if (winWidth < 640) return { rx: 135, ry: 58 };
    if (winWidth < 1024) return { rx: 155, ry: 68 };
    return { rx: 175, ry: 78 };
  };

  const { rx: radiusX, ry: radiusY } = getOrbitalRadius();

  // Canvas Gold Particle, Laser Beams & Smoke Shockwave System
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let animationId;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const handleCanvasResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener('resize', handleCanvasResize);

    // Ambient particles
    const ambientParticles = [];
    const numAmbient = winWidth < 640 ? 40 : 75;
    for (let i = 0; i < numAmbient; i++) {
      ambientParticles.push({
        x: (Math.random() - 0.5) * width * 1.3,
        y: (Math.random() - 0.5) * height * 1.3,
        z: Math.random() * width,
        radius: 1 + Math.random() * 2.2,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        vz: 0.5 + Math.random() * 1.0
      });
    }

    // Dynamic Smoke & Laser Array
    const smokePuffs = [];
    const embers = [];
    const laserRays = [];

    const spawnImpactEffects = () => {
      const cx = width / 2;
      const cy = height / 2;

      const numSmoke = winWidth < 640 ? 50 : 90;
      for (let i = 0; i < numSmoke; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = 1.5 + Math.random() * 6.0;
        smokePuffs.push({
          x: cx,
          y: cy,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          radius: 10 + Math.random() * 20,
          maxRadius: 55 + Math.random() * 70,
          alpha: 0.95,
          decay: 0.008 + Math.random() * 0.012,
          color: Math.random() > 0.3 ? 'rgba(212, 176, 124,' : 'rgba(255, 225, 170,'
        });
      }

      const numEmbers = winWidth < 640 ? 40 : 80;
      for (let i = 0; i < numEmbers; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = 3.0 + Math.random() * 9.0;
        embers.push({
          x: cx,
          y: cy,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          size: 1.2 + Math.random() * 3.0,
          alpha: 1.0,
          decay: 0.015 + Math.random() * 0.02
        });
      }

      for (let i = 0; i < 10; i++) {
        laserRays.push({
          angle: (i * 36 * Math.PI) / 180,
          length: 0,
          maxLength: width * 0.65,
          alpha: 1.0
        });
      }
    };

    if (phase === 'united') {
      spawnImpactEffects();
    }

    let shockwaveRadius = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      const cx = width / 2;
      const cy = height / 2;
      const fov = 360;

      // Central Radial Glow
      const isUnited = phase === 'united';
      const glowRadius = isUnited ? width * 0.65 : width * 0.42;
      const gradient = ctx.createRadialGradient(cx, cy, 5, cx, cy, glowRadius);
      gradient.addColorStop(0, isUnited ? 'rgba(212, 176, 124, 0.26)' : 'rgba(212, 176, 124, 0.07)');
      gradient.addColorStop(0.4, isUnited ? 'rgba(212, 176, 124, 0.08)' : 'rgba(212, 176, 124, 0.02)');
      gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      // Shockwave ring
      if (isUnited) {
        shockwaveRadius += 6;
        if (shockwaveRadius > width * 0.8) shockwaveRadius = 0;

        ctx.beginPath();
        ctx.arc(cx, cy, shockwaveRadius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(212, 176, 124, ${Math.max(0, 0.45 - shockwaveRadius / (width * 0.8))})`;
        ctx.lineWidth = 2.5;
        ctx.stroke();
      }

      // Render Laser Beams
      if (isUnited && laserRays.length > 0) {
        for (let ray of laserRays) {
          if (ray.length < ray.maxLength) ray.length += 22;
          ray.alpha -= 0.014;

          if (ray.alpha > 0) {
            const rx = cx + Math.cos(ray.angle) * ray.length;
            const ry = cy + Math.sin(ray.angle) * ray.length;

            ctx.beginPath();
            ctx.moveTo(cx, cy);
            ctx.lineTo(rx, ry);
            ctx.strokeStyle = `rgba(212, 176, 124, ${ray.alpha * 0.6})`;
            ctx.lineWidth = 2;
            ctx.shadowBlur = 12;
            ctx.shadowColor = '#d4b07c';
            ctx.stroke();
            ctx.shadowBlur = 0;
          }
        }
      }

      // Render Volumetric Smoke Clouds
      for (let i = smokePuffs.length - 1; i >= 0; i--) {
        const s = smokePuffs[i];
        s.x += s.vx;
        s.y += s.vy;
        s.vx *= 0.95;
        s.vy *= 0.95;
        if (s.radius < s.maxRadius) s.radius += 1.0;
        s.alpha -= s.decay;

        if (s.alpha <= 0) {
          smokePuffs.splice(i, 1);
          continue;
        }

        const smokeGrad = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, s.radius);
        smokeGrad.addColorStop(0, `${s.color}${s.alpha * 0.5})`);
        smokeGrad.addColorStop(0.5, `${s.color}${s.alpha * 0.2})`);
        smokeGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');

        ctx.fillStyle = smokeGrad;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
        ctx.fill();
      }

      // Render Embers
      for (let i = embers.length - 1; i >= 0; i--) {
        const e = embers[i];
        e.x += e.vx;
        e.y += e.vy;
        e.vx *= 0.94;
        e.vy *= 0.94;
        e.alpha -= e.decay;

        if (e.alpha <= 0) {
          embers.splice(i, 1);
          continue;
        }

        ctx.beginPath();
        ctx.arc(e.x, e.y, e.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 230, 170, ${e.alpha})`;
        ctx.shadowBlur = 10;
        ctx.shadowColor = '#d4b07c';
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      // Ambient Particles
      for (let p of ambientParticles) {
        const speed = isUnited ? 1.8 : 1.0;
        p.z -= p.vz * speed;
        if (p.z <= 1) p.z = width;

        p.x += p.vx * speed;
        p.y += p.vy * speed;

        const scale = fov / (fov + p.z);
        const px = cx + p.x * scale;
        const py = cy + p.y * scale;
        const r = p.radius * scale;
        const alpha = Math.min(1, Math.max(0.1, (1 - p.z / width)));

        ctx.beginPath();
        ctx.arc(px, py, r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(212, 176, 124, ${alpha * 0.75})`;
        ctx.shadowBlur = 5 * scale;
        ctx.shadowColor = '#d4b07c';
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      if (isIntersecting) {
        animationId = requestAnimationFrame(render);
      }
    };

    let isIntersecting = true;
    const observer = new IntersectionObserver(([entry]) => {
      isIntersecting = entry.isIntersecting;
      if (isIntersecting) {
        cancelAnimationFrame(animationId);
        animationId = requestAnimationFrame(render);
      }
    }, { threshold: 0.05 });

    observer.observe(canvas);

    render();

    return () => {
      observer.disconnect();
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleCanvasResize);
    };
  }, [phase, winWidth]);

  return (
    <div className="w-full mb-16 sm:mb-20">
      
      {/* Clean Section Header */}
      <div className="text-center mb-6 sm:mb-8 px-2">
        <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#d4b07c] block mb-2 font-display">
          OUR CAPABILITIES
        </span>
        <h3 className="text-xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight font-display uppercase leading-tight">
          SIX SERVICES. <span className="text-[#d4b07c]">ONE UNITED STUDIO.</span>
        </h3>
      </div>

      {/* Clean 3D Stage Container */}
      <div 
        className={`services-3d-container relative w-full max-w-5xl mx-auto h-[460px] sm:h-[520px] rounded-2xl sm:rounded-3xl p-3 sm:p-10 transition-all duration-700 shadow-2xl overflow-hidden border ${
          phase === 'united' 
            ? 'bg-gradient-to-b from-[#1e170c] via-[#090805] to-black border-2 border-[#d4b07c] shadow-[0_0_80px_rgba(212,176,124,0.4)]' 
            : 'bg-[#050505] border-white/[0.08] hover:border-[#d4b07c]/40'
        }`}
      >
        
        {/* Canvas Background */}
        <canvas 
          ref={canvasRef} 
          className="absolute inset-0 w-full h-full pointer-events-none z-0"
        />

        <div className="relative w-full h-full z-10 flex flex-col justify-between">
          
          {/* Top Bar: Minimal Service Selector Pills */}
          <div className="flex items-center justify-between gap-2 sm:gap-4 pb-3 sm:pb-4 border-b border-white/[0.08] relative z-30">
            <span className="hidden md:inline-block text-[10px] sm:text-xs font-mono font-bold text-[#d4b07c] tracking-widest uppercase shrink-0">
              {phase === 'united' ? 'UNITED' : 'SERVICES'}
            </span>

            {/* Smooth Scrollable & Compact Mobile Pills Bar */}
            <div className="flex items-center gap-1 sm:gap-1.5 overflow-x-auto py-1 no-scrollbar w-full md:w-auto scroll-smooth">
              {services.map((item, idx) => {
                const isActive = phase === 'orbit' && activeService === idx;
                return (
                  <button
                    key={item.id}
                    ref={isActive ? activePillRef : null}
                    onClick={() => selectServiceManually(idx)}
                    className={`px-2 sm:px-3 py-1 rounded-full text-[9px] sm:text-[10px] font-mono font-bold transition-all duration-300 whitespace-nowrap cursor-pointer shrink-0 ${
                      isActive
                        ? 'bg-[#d4b07c] text-black font-extrabold shadow-[0_0_12px_rgba(212,176,124,0.4)] scale-105'
                        : 'bg-white/[0.04] text-gray-400 hover:text-white hover:bg-white/[0.08]'
                    }`}
                  >
                    <span className="hidden sm:inline">{item.id} {item.title.split(' ')[0]}</span>
                    <span className="inline sm:hidden">{item.mobileLabel}</span>
                  </button>
                );
              })}

              <button
                onClick={triggerUnification}
                className={`px-2.5 sm:px-3 py-1 rounded-full text-[9px] sm:text-[10px] font-mono font-bold transition-all duration-300 whitespace-nowrap cursor-pointer flex items-center gap-1 shrink-0 ${
                  phase === 'united' || phase === 'imploding'
                    ? 'bg-[#d4b07c] text-black font-extrabold shadow-[0_0_15px_#d4b07c]'
                    : 'bg-white/[0.06] text-[#d4b07c] border border-[#d4b07c]/30 hover:bg-[#d4b07c] hover:text-black'
                }`}
              >
                <Layers className="w-3 h-3" />
                <span>UNITE</span>
              </button>
            </div>
          </div>

          {/* MAIN SINGLE UNIFIED STAGE */}
          <div className="services-3d-stage my-auto py-2 sm:py-4 relative z-20 flex flex-col items-center justify-center min-h-[270px] sm:min-h-[360px]">
            
            {/* Center Stage Ring & LUXURY EMBLEM */}
            <div className="relative w-full max-w-3xl h-[250px] sm:h-[300px] flex items-center justify-center">
              
              {/* Orbit Ring Tracks */}
              <div 
                className={`absolute rounded-full border border-[#d4b07c]/20 pointer-events-none transition-all duration-700 ${
                  phase === 'orbit' ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
                }`}
                style={{ 
                  width: winWidth < 480 ? '200px' : '280px', 
                  height: winWidth < 480 ? '200px' : '280px', 
                  transform: 'rotateX(65deg)' 
                }}
              ></div>

              {/* 3D LUXURY HOLOGRAPHIC CENTER EMBLEM */}
              <div 
                className={`absolute z-20 flex flex-col items-center justify-center transition-all duration-700 ease-out ${
                  phase === 'united' 
                    ? 'scale-115 sm:scale-140' 
                    : phase === 'imploding' 
                    ? 'scale-105' 
                    : 'scale-100'
                }`}
              >
                {/* Dual Orbit Energy Rings during United Phase */}
                {phase === 'united' && (
                  <>
                    <div className="absolute w-40 h-40 sm:w-56 sm:h-56 rounded-full border-2 border-[#d4b07c] animate-[spin_8s_linear_infinite] shadow-[0_0_50px_rgba(212,176,124,0.5)] pointer-events-none"></div>
                    <div className="absolute w-50 h-50 sm:w-68 sm:h-68 rounded-full border border-dashed border-white/40 animate-[spin_14s_linear_infinite_reverse] pointer-events-none"></div>
                  </>
                )}

                {/* Main Glass Emblem Container */}
                <div className={`services-3d-center-emblem relative w-24 h-24 sm:w-36 sm:h-36 rounded-full bg-gradient-to-br from-[#d4b07c]/30 via-black/80 to-[#d4b07c]/10 border-2 ${
                  phase === 'united' ? 'border-[#d4b07c] shadow-[0_0_80px_rgba(212,176,124,0.8)] animate-pulse' : 'border-[#d4b07c]/50 shadow-[0_0_35px_rgba(212,176,124,0.3)]'
                } backdrop-blur-2xl flex items-center justify-center p-4 sm:p-5 transition-all duration-500 hover:scale-105 group cursor-pointer`}>
                  
                  {/* Glowing Logo Image */}
                  <img 
                    src={logo} 
                    alt="Elite Studios Logo" 
                    className="w-full h-full object-contain filter drop-shadow-[0_0_16px_rgba(212,176,124,0.9)] transition-transform duration-500 group-hover:scale-110" 
                  />
                  
                  {/* Inner ring highlight */}
                  <div className="absolute inset-1.5 sm:inset-2 rounded-full border border-white/20 pointer-events-none"></div>
                </div>
              </div>

              {/* 6 Service Logos (Dynamic mobile-responsive radius) */}
              {services.map((srv, idx) => {
                const IconComponent = srv.icon;
                const baseAngle = (idx * 60 + orbitalAngle) * (Math.PI / 180);

                const posX = Math.cos(baseAngle) * radiusX;
                const posY = Math.sin(baseAngle) * radiusY;

                const depthScale = isCentered ? 0 : (0.75 + ((Math.sin(baseAngle) + 1) / 2) * 0.45);
                const isActive = phase === 'orbit' && activeService === idx;

                return (
                  <button
                    key={srv.id}
                    onClick={() => selectServiceManually(idx)}
                    className={`absolute z-30 flex flex-col items-center cursor-pointer group select-none ${
                      isActive ? 'scale-115 sm:scale-125 z-40' : 'hover:scale-110'
                    }`}
                    style={{
                      transform: `translate3d(${posX}px, ${posY}px, 0px) scale(${depthScale})`,
                      transition: isCentered 
                        ? 'transform 0.95s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.75s ease' 
                        : 'transform 0.4s ease, opacity 0.4s ease',
                      opacity: isCentered ? 0 : 1.0,
                      pointerEvents: isCentered ? 'none' : 'auto'
                    }}
                    title={srv.title}
                  >
                    <div className={`services-3d-node-icon w-10 h-10 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl flex items-center justify-center transition-all duration-300 ${
                      isActive
                        ? 'bg-[#d4b07c] text-black border-2 border-white shadow-[0_0_25px_rgba(212,176,124,0.8)] scale-110'
                        : 'bg-[#0a0a0a]/90 text-[#d4b07c] border border-[#d4b07c]/40 hover:border-[#d4b07c] hover:bg-[#d4b07c]/20 shadow-[0_0_15px_rgba(212,176,124,0.2)]'
                    }`}>
                      <IconComponent className={`w-5 h-5 sm:w-7 sm:h-7 ${isActive ? 'text-black' : 'text-[#d4b07c]'}`} />
                    </div>

                    {!isCentered && (
                      <span className={`services-3d-node-text mt-1 px-1.5 sm:px-2 py-0.5 rounded text-[8px] sm:text-[9px] font-mono font-bold tracking-wider uppercase whitespace-nowrap shadow-md ${
                        isActive ? 'bg-[#d4b07c] text-black' : 'bg-black/90 text-gray-300 border border-white/10'
                      }`}>
                        {srv.id}. {srv.title.split(' ')[0]}
                      </span>
                    )}
                  </button>
                );
              })}

            </div>

            {/* UNIFIED TEXT & CTA SECTION */}
            <div 
              className={`text-center max-w-lg mx-auto px-2 sm:px-4 z-20 transition-all duration-700 mt-1 sm:mt-2 ${
                phase === 'united'
                  ? 'opacity-100 translate-y-0 pointer-events-auto'
                  : 'opacity-0 translate-y-6 pointer-events-none absolute'
              }`}
            >
              <h4 className="services-3d-headline text-xl sm:text-3xl md:text-4xl font-extrabold text-white font-display uppercase tracking-tight mb-2 leading-tight">
                THE COMPLETE CREATIVE ENGINE.
              </h4>

              <p className="services-3d-subtitle text-[11px] sm:text-xs md:text-sm text-gray-300 font-light leading-relaxed mb-5 sm:mb-6">
                Website Design • Graphic Design • Digital Marketing • Live Streaming • Video Editing • Social Media Management
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full">
                <a
                  href={getWhatsAppProjectUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="services-3d-cta-btn w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3.5 sm:py-4 bg-[#d4b07c] text-black font-extrabold text-xs uppercase tracking-[0.2em] rounded-xl hover:bg-[#c39f6b] transition-all duration-300 shadow-[0_0_35px_rgba(212,176,124,0.5)] hover:scale-105"
                >
                  <span>START YOUR PROJECT</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>

                <button
                  onClick={resetToOrbit}
                  className="services-3d-replay-btn w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-5 py-3.5 bg-white/[0.04] border border-white/[0.1] hover:border-white/30 text-gray-300 hover:text-white font-bold text-xs uppercase tracking-widest rounded-xl transition-all cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5 text-[#d4b07c]" />
                  <span>REPLAY</span>
                </button>
              </div>
            </div>

            {/* NORMAL ORBIT BRIEF SECTION */}
            <div 
              className={`text-center max-w-lg mx-auto px-2 sm:px-4 z-20 transition-all duration-500 ${
                phase === 'orbit'
                  ? 'opacity-100 translate-y-0 pointer-events-auto'
                  : 'opacity-0 translate-y-4 pointer-events-none absolute'
              }`}
            >
              <h4 className="text-base sm:text-xl font-bold text-white font-display tracking-tight mb-1">
                {services[activeService].title}
              </h4>
              <p className="text-[11px] sm:text-xs text-gray-400 font-light leading-relaxed">
                {services[activeService].desc}
              </p>
            </div>

          </div>

          {/* Bottom Bar Footer */}
          <div className="pt-3 sm:pt-4 border-t border-white/[0.08] flex items-center justify-between text-[9px] sm:text-[10px] font-mono tracking-widest text-gray-500 uppercase relative z-30">
            <span>
              {phase === 'united' ? 'ALL SERVICES UNITED' : `SERVICE ${activeService + 1} OF 6`}
            </span>

            <div className="hidden sm:flex items-center gap-1.5">
              {services.map((_, i) => (
                <button
                  key={i}
                  onClick={() => selectServiceManually(i)}
                  className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                    phase === 'orbit' && activeService === i ? 'w-5 sm:w-6 bg-[#d4b07c]' : 'w-1.5 bg-white/20 hover:bg-white/40'
                  }`}
                  aria-label={`Go to service ${i + 1}`}
                />
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
