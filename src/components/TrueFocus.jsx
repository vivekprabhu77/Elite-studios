'use client';

import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import './TrueFocus.css';

const CORNERS = ['top-left', 'top-right', 'bottom-left', 'bottom-right'];
const FRAME_GAP = 10;
const SMOOTH_CSS = 'cubic-bezier(0.65, 0, 0.35, 1)';
const SPRING_CSS = 'cubic-bezier(0.34, 1.56, 0.64, 1)';

const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

const useReducedMotion = () => {
  const [reduce, setReduce] = useState(false);
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduce(mq.matches);
    const handler = (e) => setReduce(e.matches);
    mq.addEventListener?.('change', handler);
    return () => mq.removeEventListener?.('change', handler);
  }, []);
  return reduce;
};

const TrueFocus = ({
  sentence = 'True Focus',
  separator = ' ',
  manualMode = false,
  focusStyle = 'brackets',
  order = 'sequential',
  easing = 'smooth',
  blurAmount = 5,
  focusScale = 1,
  borderColor = '#B68631',
  highlightColor,
  glowColor = 'rgba(182, 134, 49, 0.4)',
  animationDuration = 0.8,
  pauseBetweenAnimations = 0.9,
  cornerSize = 16,
  borderWidth = 3,
  unfocusedOpacity = 0.35,
  className = '',
  style = {}
}) => {
  const words = sentence.split(separator).filter(word => word.trim() !== '');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [focusRect, setFocusRect] = useState(null);
  const containerRef = useRef(null);
  const wordRefs = useRef([]);
  const isHoveredRef = useRef(false);

  const reduceMotion = useReducedMotion();
  const duration = reduceMotion ? 0 : animationDuration;
  const activeIndex = words.length ? currentIndex % words.length : -1;
  const spring = easing === 'spring' && !reduceMotion;
  const easeTransition = spring ? SPRING_CSS : SMOOTH_CSS;

  // Auto-cycle through words when not manually locked or while unhovered
  useEffect(() => {
    if (words.length < 2) return;
    if (manualMode) return;

    const interval = setInterval(
      () => {
        if (isHoveredRef.current) return;
        const roll = Math.random();
        setCurrentIndex(prev => {
          const current = prev % words.length;
          if (order !== 'random') return (current + 1) % words.length;
          const next = Math.floor(roll * (words.length - 1));
          return next >= current ? next + 1 : next;
        });
      },
      (animationDuration + pauseBetweenAnimations) * 1000
    );
    return () => clearInterval(interval);
  }, [manualMode, animationDuration, pauseBetweenAnimations, words.length, order]);

  // Robust pixel measurement relative to container
  useIsomorphicLayoutEffect(() => {
    const container = containerRef.current;
    const word = wordRefs.current[activeIndex];
    if (!container || !word) return;

    const measure = () => {
      const containerRect = container.getBoundingClientRect();
      const wordRect = word.getBoundingClientRect();

      const next = {
        x: wordRect.left - containerRect.left,
        y: wordRect.top - containerRect.top,
        width: wordRect.width,
        height: wordRect.height
      };

      setFocusRect(prev =>
        prev &&
        Math.abs(prev.x - next.x) < 0.5 &&
        Math.abs(prev.y - next.y) < 0.5 &&
        Math.abs(prev.width - next.width) < 0.5 &&
        Math.abs(prev.height - next.height) < 0.5
          ? prev
          : next
      );
    };

    measure();
    if (typeof ResizeObserver === 'undefined') return;
    const observer = new ResizeObserver(measure);
    observer.observe(container);
    wordRefs.current.forEach(node => node && observer.observe(node));
    return () => observer.disconnect();
  }, [activeIndex, sentence, separator]);

  const frame = focusRect && {
    x: focusRect.x - (focusRect.width * (focusScale - 1)) / 2,
    y: focusRect.y - (focusRect.height * (focusScale - 1)) / 2,
    width: focusRect.width * focusScale,
    height: focusRect.height * focusScale
  };

  const corners = frame && {
    'top-left': { x: frame.x - FRAME_GAP, y: frame.y - FRAME_GAP },
    'top-right': { x: frame.x + frame.width + FRAME_GAP - cornerSize, y: frame.y - FRAME_GAP },
    'bottom-left': { x: frame.x - FRAME_GAP, y: frame.y + frame.height + FRAME_GAP - cornerSize },
    'bottom-right': {
      x: frame.x + frame.width + FRAME_GAP - cornerSize,
      y: frame.y + frame.height + FRAME_GAP - cornerSize
    }
  };

  const shapes = frame && {
    box: {
      x: frame.x - FRAME_GAP,
      y: frame.y - FRAME_GAP,
      width: frame.width + FRAME_GAP * 2,
      height: frame.height + FRAME_GAP * 2
    },
    underline: {
      x: frame.x,
      y: frame.y + frame.height + FRAME_GAP * 0.4,
      width: frame.width,
      height: borderWidth
    },
    highlight: {
      x: frame.x - frame.height * 0.14,
      y: frame.y + frame.height * 0.04,
      width: frame.width + frame.height * 0.28,
      height: frame.height * 0.92
    }
  };

  const frameStyle = {
    '--border-color': borderColor,
    '--highlight-color': highlightColor ?? 'rgba(182, 134, 49, 0.15)',
    '--glow-color': glowColor,
    '--corner-size': `${cornerSize}px`,
    '--border-width': `${borderWidth}px`,
    ...style
  };

  return (
    <div
      className={`focus-container ${className}`}
      ref={containerRef}
      style={frameStyle}
      onMouseEnter={() => {
        isHoveredRef.current = true;
      }}
      onMouseLeave={() => {
        isHoveredRef.current = false;
      }}
    >
      {focusStyle === 'highlight' && shapes && (
        <span
          className="focus-highlight"
          aria-hidden="true"
          style={{
            transform: `translate3d(${shapes.highlight.x}px, ${shapes.highlight.y}px, 0)`,
            width: `${shapes.highlight.width}px`,
            height: `${shapes.highlight.height}px`,
            opacity: focusRect ? 1 : 0,
            transition: `transform ${duration}s ${easeTransition}, width ${duration}s ${easeTransition}, height ${duration}s ${easeTransition}, opacity 0.3s ease`
          }}
        />
      )}

      {words.map((word, index) => {
        const isActive = index === activeIndex;
        return (
          <span
            key={index}
            ref={el => {
              wordRefs.current[index] = el;
            }}
            className={`focus-word ${isActive ? 'active' : ''}`}
            style={{
              filter: `blur(${isActive ? 0 : blurAmount}px)`,
              opacity: isActive ? 1 : unfocusedOpacity,
              transform: focusScale !== 1 ? `scale(${isActive ? focusScale : 1})` : undefined,
              transition: `filter ${duration}s ease, opacity ${duration}s ease, transform ${duration}s ${easeTransition}`
            }}
            onMouseEnter={() => {
              setCurrentIndex(index);
            }}
          >
            {word}
          </span>
        );
      })}

      {shapes && corners && focusStyle !== 'highlight' && (
        <div className="focus-frame" aria-hidden="true">
          {focusStyle === 'box' && (
            <span
              className="focus-box"
              style={{
                transform: `translate3d(${shapes.box.x}px, ${shapes.box.y}px, 0)`,
                width: `${shapes.box.width}px`,
                height: `${shapes.box.height}px`,
                opacity: focusRect ? 1 : 0,
                transition: `transform ${duration}s ${easeTransition}, width ${duration}s ${easeTransition}, height ${duration}s ${easeTransition}, opacity 0.3s ease`
              }}
            />
          )}

          {focusStyle === 'underline' && (
            <span
              className="focus-underline"
              style={{
                transform: `translate3d(${shapes.underline.x}px, ${shapes.underline.y}px, 0)`,
                width: `${shapes.underline.width}px`,
                height: `${shapes.underline.height}px`,
                opacity: focusRect ? 1 : 0,
                transition: `transform ${duration}s ${easeTransition}, width ${duration}s ${easeTransition}, opacity 0.3s ease`
              }}
            />
          )}

          {focusStyle !== 'box' &&
            focusStyle !== 'underline' &&
            CORNERS.map(corner => (
              <span
                key={corner}
                className={`corner ${corner}`}
                style={{
                  transform: `translate3d(${corners[corner].x}px, ${corners[corner].y}px, 0)`,
                  opacity: focusRect ? 1 : 0,
                  transition: `transform ${duration}s ${easeTransition}, opacity 0.3s ease`
                }}
              />
            ))}
        </div>
      )}
    </div>
  );
};

export default TrueFocus;
