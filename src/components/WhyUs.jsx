import React, { useState, useEffect, useRef } from 'react';

const STATS = [
  { value: '120', suffix: '+', label: 'Projects Completed' },
  { value: '45', suffix: '+', label: 'Happy Clients' },
  { value: '18000', suffix: '+', label: 'Creative Hours' },
  { value: '8', suffix: '+', label: 'Years Experience' }
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
    <section id="about" className="py-32 px-6 md:px-12 bg-[#050505] relative overflow-hidden border-y border-white/[0.04]">
      {/* Background Spotlight */}
      <div className="absolute bottom-[10%] right-[5%] w-[400px] h-[400px] bg-white/[0.015] rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto w-full">
        {/* Editorial Text Block */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start mb-28 text-left reveal">
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
              We do not build generic pages. We craft digital monuments that establish brand authority and command premium valuations.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 text-sm text-gray-400 font-light leading-relaxed">
              <p>
                Ambitious companies don't need templates; they need handcrafted digital design. At Elite Studios, every layout, font pairing, and micro-interaction is custom-engineered. We focus on structural alignment, magazine-grade layout composition, and rapid load times.
              </p>
              <p>
                Our philosophy centers on luxury minimalism—cutting clutter to allow bold ideas and beautiful typography to communicate instantly. The result is a digital presence that builds immediate trust, feels highly premium, and looks worthy of an Awwwards nomination.
              </p>
            </div>
          </div>
        </div>

        {/* Counter Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 border-t border-white/[0.06] pt-16 text-left">
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
