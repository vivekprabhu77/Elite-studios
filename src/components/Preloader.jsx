import React, { useState, useEffect, useRef } from 'react';
import preloaderBg from '../assets/preloader.png';

export default function Preloader({ onComplete }) {
  const [percentage, setPercentage] = useState(0);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const animationRef = useRef(null);
  const startTimeRef = useRef(null);

  const DURATION = 4500; // 4.5 seconds total load time

  useEffect(() => {
    startTimeRef.current = performance.now();

    const animate = (currentTime) => {
      const elapsed = currentTime - startTimeRef.current;
      const progress = Math.min(elapsed / DURATION, 1);

      // Easing: slow start, fast middle, slow end
      const eased = progress < 0.5
        ? 2 * progress * progress
        : 1 - Math.pow(-2 * progress + 2, 2) / 2;

      setPercentage(Math.round(eased * 100));

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate);
      } else {
        // Percentage reached 100 — start fade-out
        setIsFadingOut(true);
        setTimeout(() => {
          if (onComplete) onComplete();
        }, 600); // match CSS transition duration
      }
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center transition-all duration-600 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        isFadingOut ? 'opacity-0 scale-105 pointer-events-none' : 'opacity-100 scale-100'
      }`}
      style={{
        backgroundImage: `url(${preloaderBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
        backgroundRepeat: 'no-repeat',
        backgroundColor: '#050505',
      }}
    >
      {/* Progress Bar + Percentage below center */}
      <div className="absolute bottom-[28%] sm:bottom-[30%] left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 w-[280px] sm:w-[340px]">
        {/* Progress bar track */}
        <div className="w-full flex items-center gap-3">
          <div className="flex-1 h-[3px] bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-[#d4b07c] rounded-full transition-[width] duration-100 ease-linear"
              style={{ width: `${percentage}%` }}
            />
          </div>
          {/* Percentage number */}
          <span className="text-sm font-bold tracking-wider text-[#d4b07c] font-display tabular-nums min-w-[40px] text-right">
            {percentage}%
          </span>
        </div>

        {/* Loading text */}
        <span className="text-[9px] sm:text-[10px] font-bold tracking-[0.35em] text-white/50 uppercase whitespace-nowrap">
          Loading Amazing Experiences...
        </span>
      </div>
    </div>
  );
}
