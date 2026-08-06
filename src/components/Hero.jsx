import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import HeroBg from '../assets/Hero_bg.png';

export default function Hero() {
  const [isLoaded, setIsLoaded] = useState(false);
  const canvasRef = useRef(null);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  // Golden Particle Ribbon Animation Effect
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    let animationFrameId;
    let width = canvas.offsetWidth;
    let height = canvas.offsetHeight;
    
    const resize = () => {
      width = canvas.offsetWidth;
      height = canvas.offsetHeight;
      canvas.width = width * window.devicePixelRatio;
      canvas.height = height * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };
    
    resize();
    window.addEventListener('resize', resize);

    // Initialize ambient background starfield particles (60 particles)
    const ambientParticles = [];
    const particleCount = 60;
    for (let k = 0; k < particleCount; k++) {
      ambientParticles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: 0.5 + Math.random() * 1.5, // 0.5 to 2.0px radius
        speedX: (Math.random() * 0.25) - 0.125, // range [-0.125, 0.125]
        speedY: (Math.random() * 0.25) - 0.125, // range [-0.125, 0.125]
        alpha: 0.15 + Math.random() * 0.45 // range [0.15, 0.60]
      });
    }

    const V_steps = 28;
    let t = 0; // Time step incremented by 16ms per frame

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      const U_steps = width > 768 ? 130 : 80;

      // ----------------------------------------------------
      // PASS A: Ambient Radial Glow (Background Layer)
      // ----------------------------------------------------
      const glowX = 0.60 * width;
      const glowY = 0.45 * height;
      const glowR = 0.45 * width;
      const glowGrad = ctx.createRadialGradient(glowX, glowY, 0, glowX, glowY, glowR);
      glowGrad.addColorStop(0, 'rgba(245, 197, 66, 0.18)');
      glowGrad.addColorStop(0.35, 'rgba(212, 175, 55, 0.08)');
      glowGrad.addColorStop(0.7, 'rgba(154, 123, 28, 0.02)');
      glowGrad.addColorStop(1, 'rgba(5, 5, 5, 0)');
      ctx.fillStyle = glowGrad;
      ctx.fillRect(0, 0, width, height);

      // ----------------------------------------------------
      // PASS B: Drifting Ambient Dust
      // ----------------------------------------------------
      ambientParticles.forEach(p => {
        p.x += p.speedX;
        p.y += p.speedY;

        // Wrap around screen borders
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(245, 197, 66, ${p.alpha})`;
        ctx.fill();
      });

      // ----------------------------------------------------
      // Compute Coordinates Grid (U, V mapping)
      // ----------------------------------------------------
      const pointsGrid = [];

      for (let i = 0; i <= U_steps; i++) {
        const u = i / U_steps;
        
        // Ribbon Backbone Curve (Shifted leftwards from 0.95 to 0.83)
        const pathX = width * (0.83 - 0.38 * Math.sin(0.95 * u * Math.PI));
        const pathY = height * (-0.05 + 1.1 * u);

        // Ribbon Envelope
        const widthRibbon = 160 * Math.sin(u * Math.PI) + 50;
        const thetaTwist = 2.2 * u * Math.PI + 0.0004 * t;

        pointsGrid[i] = [];

        for (let j = 0; j <= V_steps; j++) {
          const v = (j / V_steps) - 0.5;

          // Z-depth wave undulation
          const zWave = 22 * Math.sin(6.0 * u + 3.0 * v + 0.0008 * t);

          // Offsets
          const offsetX = (v * widthRibbon) * Math.cos(thetaTwist + 1.2 * v) + zWave;
          const offsetY = (0.45 * v * widthRibbon) * Math.sin(thetaTwist + 1.2 * v) + 18 * Math.cos(5.0 * u + 0.0006 * t);

          // Final coordinate projection
          const px = pathX + offsetX;
          const py = pathY + offsetY;

          // Node alpha
          const alphaNode = Math.sin(u * Math.PI) * (0.65 - 0.5 * Math.abs(v));
          
          // Perspective Node Size
          const sizeNode = Math.max(0.5, 0.7 + (zWave + 25) * 0.035);

          pointsGrid[i][j] = {
            x: px,
            y: py,
            alpha: alphaNode,
            size: sizeNode
          };
        }
      }

      // ----------------------------------------------------
      // PASS C: Transverse Ribbon Strip Lines (across width)
      // ----------------------------------------------------
      for (let i = 0; i <= U_steps; i += 2) {
        for (let j = 0; j < V_steps; j++) {
          const pt1 = pointsGrid[i][j];
          const pt2 = pointsGrid[i][j + 1];
          const avgAlpha = (pt1.alpha + pt2.alpha) / 2;
          if (avgAlpha > 0.02) {
            const lineAlpha = 0.22 * avgAlpha;
            ctx.beginPath();
            ctx.strokeStyle = `rgba(245, 197, 66, ${lineAlpha})`;
            ctx.lineWidth = 0.75;
            ctx.moveTo(pt1.x, pt1.y);
            ctx.lineTo(pt2.x, pt2.y);
            ctx.stroke();
          }
        }
      }

      // ----------------------------------------------------
      // PASS D: Longitudinal Flow Wave Lines (down length)
      // ----------------------------------------------------
      for (let j = 0; j <= V_steps; j += 3) {
        for (let i = 0; i < U_steps; i++) {
          const pt1 = pointsGrid[i][j];
          const pt2 = pointsGrid[i + 1][j];
          const avgAlpha = (pt1.alpha + pt2.alpha) / 2;
          if (avgAlpha > 0.02) {
            const lineAlpha = 0.28 * avgAlpha;
            ctx.beginPath();
            ctx.strokeStyle = `rgba(212, 175, 55, ${lineAlpha})`;
            ctx.lineWidth = 0.85;
            ctx.moveTo(pt1.x, pt1.y);
            ctx.lineTo(pt2.x, pt2.y);
            ctx.stroke();
          }
        }
      }

      // ----------------------------------------------------
      // PASS E: Grid Intersection Dot Matrix Particles
      // ----------------------------------------------------
      for (let i = 0; i <= U_steps; i++) {
        for (let j = 0; j <= V_steps; j++) {
          const pt = pointsGrid[i][j];
          if (pt.alpha > 0.02) {
            ctx.beginPath();
            ctx.arc(pt.x, pt.y, pt.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(245, 197, 66, ${pt.alpha})`;
            ctx.fill();
          }
        }
      }

      // ----------------------------------------------------
      // PASS F: Floating Specular Accent Spheres (Metallic Beads)
      // ----------------------------------------------------
      const uRatios = [0.22, 0.45, 0.65, 0.82, 0.92];
      const vOffsets = [-12, 15, -20, 18, -10];
      const radii = [5, 6, 4, 5, 3];

      uRatios.forEach((uRatio, idx) => {
        const iVal = Math.floor(uRatio * U_steps);
        const pt = pointsGrid[iVal][14]; // Center spine (j = 14)
        if (!pt) return;

        const Bx = pt.x + vOffsets[idx];
        const By = pt.y + 4 * Math.sin(0.001 * t + 10 * uRatio);
        const r = radii[idx];

        // Sphere Outer Glow
        const nodeGlow = ctx.createRadialGradient(Bx, By, 0, Bx, By, 1.6 * r);
        nodeGlow.addColorStop(0, 'rgba(245, 197, 66, 0.2)');
        nodeGlow.addColorStop(1, 'rgba(245, 197, 66, 0)');
        ctx.beginPath();
        ctx.arc(Bx, By, 1.6 * r, 0, Math.PI * 2);
        ctx.fillStyle = nodeGlow;
        ctx.fill();

        // 2D Specular Radial Gradient core
        const specGrad = ctx.createRadialGradient(
          Bx - 0.35 * r, By - 0.35 * r, 0.05 * r,
          Bx, By, r
        );
        specGrad.addColorStop(0, '#FFFFFF');
        specGrad.addColorStop(0.3, '#FFEFA6');
        specGrad.addColorStop(0.7, '#F5C542');
        specGrad.addColorStop(1, '#8C6C0F');

        ctx.beginPath();
        ctx.arc(Bx, By, r, 0, Math.PI * 2);
        ctx.fillStyle = specGrad;
        ctx.fill();
      });

      // ----------------------------------------------------
      // PASS G: Screen Edge Blending Vignette (Left Side Fade)
      // ----------------------------------------------------
      const vignetteGrad = ctx.createLinearGradient(0, 0, 0.28 * width, 0);
      vignetteGrad.addColorStop(0, '#050505');
      vignetteGrad.addColorStop(0.6, 'rgba(5, 5, 5, 0.6)');
      vignetteGrad.addColorStop(1, 'rgba(5, 5, 5, 0)');
      ctx.fillStyle = vignetteGrad;
      ctx.fillRect(0, 0, 0.28 * width, height);

      t += 16; // Increment by 16ms per frame
      animationFrameId = requestAnimationFrame(render);
    };
    
    render();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <section
      id="home"
      data-designer-selector=".hero-section-responsive"
      className="relative min-h-[100svh] lg:min-h-screen flex flex-col justify-start lg:justify-center pt-24 sm:pt-28 lg:pt-24 pb-32 sm:pb-36 lg:pb-16 px-6 md:px-12 lg:px-16 overflow-hidden bg-black hero-section-responsive"
    >
      {/* Background Image Container with reduced opacity */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-no-repeat opacity-20 hero-bg-image"
        style={{
          backgroundImage: `url(${HeroBg})`,
        }}
      ></div>

      {/* Dark gradient overlay to blend image to the left and provide readability */}
      <div
        data-designer-selector=".hero-overlay-responsive"
        className="absolute inset-0 bg-gradient-to-r from-black via-black/75 to-transparent pointer-events-none z-0 hero-overlay-responsive"
      ></div>

      <div className="max-w-[1600px] mx-auto w-full relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center h-full">
        {/* Left Text Column */}
        <div
          className={`lg:col-span-7 flex flex-col justify-center text-left transition-all duration-1000 delay-100 transform ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
        >
          {/* Heading */}
          <h1
            data-designer-selector=".hero-heading-responsive"
            data-designer-file="src/components/Hero.jsx"
            className="text-[40px] sm:text-[56px] md:text-[72px] lg:text-[80px] font-black font-display leading-[0.96] tracking-tight uppercase mb-6 hero-heading-responsive"
          >
            <span className="text-white block">DIGITAL</span>
            <span className="text-gray-300 block text-opacity-90">EXPERIENCES THAT</span>
            <span className="text-[#d4b07c] block">BUILDS BRANDS.</span>
          </h1>

          {/* Description */}
          <p
            data-designer-selector=".hero-description-responsive"
            data-designer-file="src/components/Hero.jsx"
            className="text-sm sm:text-base md:text-[17px] text-[#9a9a9a] font-normal leading-[1.65] mb-8 max-w-xl hero-description-responsive"
          >
            We design premium websites, create powerful brand identities, build AI automations and deliver digital experiences that help ambitious businesses grow.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center gap-4 mb-6 lg:mb-0">
            <Link
              to="/contact"
              className="group inline-flex items-center justify-center bg-[#d4b07c] text-black font-bold text-xs sm:text-sm tracking-wider uppercase px-7 py-3.5 rounded-[8px] hover:bg-[#c39f6b] transition-all duration-300 shadow-[0_0_24px_rgba(212,176,124,0.25)] hero-btn-responsive"
            >
              <span>START YOUR PROJECT &rarr;</span>
            </Link>
            <Link
              to="/work"
              className="group inline-flex items-center justify-center border border-[#2e2e2e] bg-[#0e0e0e] text-white font-bold text-xs sm:text-sm tracking-wider uppercase px-7 py-3.5 rounded-[8px] hover:border-white/40 hover:bg-[#181818] transition-all duration-300 hero-btn-responsive"
            >
              <span>VIEW OUR WORK &#9655;</span>
            </Link>
          </div>
        </div>

        {/* Right Column: Canvas Container */}
        <div className="lg:col-span-5 hidden lg:block relative w-full h-[550px] hero-artwork-container">
          <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />
        </div>
      </div>

      {/* Scroll Down Indicator — bottom center */}
      <div
        className={`absolute bottom-3 sm:bottom-6 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1.5 transition-all duration-1000 delay-500 transform hero-scroll-indicator ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
      >
        <span className="text-[9px] md:text-[10px] font-bold tracking-[0.3em] text-white/50 uppercase">
          Scroll
        </span>
        <div className="w-[1px] h-6 sm:h-8 bg-white/30 relative overflow-hidden">
          <div className="w-full h-2.5 sm:h-3 bg-[#d4b07c] animate-bounce absolute top-0"></div>
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
          className="font-script text-[36px] sm:text-[48px] md:text-[68px] text-[#d4b07c] leading-none mb-0.5 select-none pr-2 sm:pr-8 hero-cursive-title"
        >
          Creativity
        </span>
        <span
          data-designer-selector=".hero-cursive-subtitle"
          data-designer-file="src/components/Hero.jsx"
          className="text-[8px] sm:text-[9px] md:text-[10px] font-bold tracking-[0.25em] sm:tracking-[0.3em] text-white uppercase whitespace-nowrap hero-cursive-subtitle"
        >
          CAN MAKE MAN CREATIVE
        </span>
      </div>
    </section>
  );
}
