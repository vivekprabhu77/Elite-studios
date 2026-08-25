import React, { useState, useEffect, useRef } from 'react';

const STATS = [
  { value: '600', suffix: '+', label: 'Projects Completed' },
  { value: '400', suffix: '+', label: 'Happy Clients' },
  { value: '10000', suffix: '+', label: 'Creative Hours' },
  { value: '5', suffix: '+', label: 'Years Experience' }
];

function CountUp({ value, suffix, duration = 2000 }) {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true);
        }
      },
      { threshold: 0.2 }
    );
    if (elementRef.current) {
      observer.observe(elementRef.current);
    }
    return () => observer.disconnect();
  }, [hasStarted]);

  useEffect(() => {
    if (!hasStarted) return;
    let startTimestamp = null;
    const endVal = parseInt(value, 10);

    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      setCount(Math.floor(progress * endVal));
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }, [hasStarted, value, duration]);

  return (
    <span ref={elementRef} className="font-creative text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tighter text-[#d4b07c]">
      {count.toLocaleString()}{suffix}
    </span>
  );
}

export default function WhyUs() {
  return (
    <section id="about" className="py-12 md:py-16 px-6 md:px-12 bg-black relative overflow-hidden border-y border-white/[0.04]">
      {/* Background Spotlight */}
      <div className="absolute bottom-[10%] right-[5%] w-[400px] h-[400px] bg-white/[0.015] rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto w-full">
        {/* Editorial Text Block */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start mb-12 md:mb-14 text-left reveal">
          <div className="lg:col-span-4">
            <span className="text-xs uppercase tracking-widest text-[#d4b07c] font-bold block mb-4 font-display">
              Why Elite Studios
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-none font-creative">
              THE ELITE<br />
              <span className="text-[#d4b07c]">STANDARD</span>.
            </h2>
          </div>
          
          <div className="lg:col-span-8">
            <p className="text-xl sm:text-2xl text-gray-300 font-light leading-relaxed tracking-tight mb-8">
              We built Elite Studios around a simple principle: create work that drives real growth. No generic templates, no unnecessary bloat, and no middle managers.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 text-sm text-gray-400 font-light leading-relaxed">
              <p>
                We are a dedicated creative team specializing in Website Design & Development, Graphic Design, Digital Marketing, Live Streaming, Video Editing, and Social Media Handling. Every layout grid, brand asset, and video frame is crafted with intention.
              </p>
              <p>
                Whether launching a brand-new digital web presence, executing high-ROI advertising campaigns, broadcasting live events, or managing your complete social feeds, we work directly with business owners and creative leaders to deliver authentic results.
              </p>
            </div>
          </div>
        </div>

        {/* Counter Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 border-t border-white/[0.06] pt-10 text-left">
          {STATS.map((stat, index) => (
            <div key={stat.label} className="flex flex-col gap-3 reveal" style={{ transitionDelay: `${index * 0.1}s` }}>
              <CountUp value={stat.value} suffix={stat.suffix} />
              <span className="text-xs uppercase tracking-widest text-white/40 font-semibold font-display">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
