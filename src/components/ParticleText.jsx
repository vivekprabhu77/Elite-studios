'use client';

import React, { useEffect, useRef } from 'react';

const RenderTarget = {
  current: () => 'preview',
  canvas: 'canvas',
  export: 'export',
  thumbnail: 'thumbnail',
  preview: 'preview',
};

function cubicBezier(x1, y1, x2, y2) {
  const cx = 3 * x1;
  const bx = 3 * (x2 - x1) - cx;
  const ax = 1 - cx - bx;
  const cy = 3 * y1;
  const by = 3 * (y2 - y1) - cy;
  const ay = 1 - cy - by;
  const sampleX = (t) => ((ax * t + bx) * t + cx) * t;
  const sampleY = (t) => ((ay * t + by) * t + cy) * t;
  return (x) => {
    if (x <= 0) return 0;
    if (x >= 1) return 1;
    let lo = 0;
    let hi = 1;
    let t = x;
    for (let i = 0; i < 12; i++) {
      const mid = (lo + hi) / 2;
      const sx = sampleX(mid);
      if (Math.abs(sx - x) < 1e-6) {
        t = mid;
        break;
      }
      if (sx < x) lo = mid;
      else hi = mid;
      t = mid;
    }
    return sampleY(t);
  };
}

function resolveEasingFn(trans) {
  const linear = (t) => t;
  if (!trans || trans.type === 'spring') return linear;
  const ease = trans.ease;
  if (
    Array.isArray(ease) &&
    ease.length === 4 &&
    ease.every((v) => typeof v === 'number')
  ) {
    const [x1, y1, x2, y2] = ease;
    return cubicBezier(x1, y1, x2, y2);
  }
  if (typeof ease === 'string') {
    switch (ease) {
      case 'easeIn':
      case 'circIn':
        return (t) => t * t;
      case 'easeOut':
      case 'circOut':
        return (t) => 1 - (1 - t) * (1 - t);
      case 'easeInOut':
      case 'circInOut':
        return (t) =>
          t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
      case 'linear':
      default:
        return linear;
    }
  }
  return linear;
}

function resolveDuration(trans) {
  if (!trans || trans.type === 'spring') return 1;
  const d = trans.duration;
  return typeof d === 'number' && d > 0 ? d : 1;
}

function extractLines(text, linesProp) {
  if (Array.isArray(linesProp) && linesProp.length > 0) {
    return linesProp.map((s) => String(s).trim()).filter(Boolean);
  }
  if (Array.isArray(text) && text.length > 0) {
    return text.map((s) => String(s).trim()).filter(Boolean);
  }
  if (!text) return ['ELITE', 'STUDIOS'];
  const parts = String(text).split(/\r?\n|\\n/);
  const clean = parts.map((s) => s.trim()).filter(Boolean);
  return clean.length > 0 ? clean : ['ELITE', 'STUDIOS'];
}

const COMPONENT_DEFAULTS = {
  text: 'ELITE\nSTUDIOS',
  lines: ['ELITE', 'STUDIOS'],
  colors: ['#393E41'],
  mode: 'onEnter',
  replay: true,
  position: 'above',
  particleSize: 8,
  particleCount: 50,
  mouseEnabled: true,
  mouseRadius: 70,
  mouseForce: 30,
  fontSize: 100,
  autoFit: true,
  align: 'left',
  lineHeight: 0.84,
  transition: { type: 'tween', duration: 1.2, ease: 'easeOut' },
};

export default function ParticleText(props) {
  props = { ...COMPONENT_DEFAULTS, ...props };
  const {
    text,
    lines: linesProp,
    colors,
    mode,
    replay,
    position,
    particleSize,
    particleCount,
    mouseEnabled,
    mouseRadius,
    mouseForce,
    fontSize,
    autoFit,
    align,
    lineHeight,
    transition,
    style,
  } = props;

  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const rafRef = useRef(null);
  const pointerRef = useRef({ x: -99999, y: -99999, active: false });

  const formValRef = useRef(0);
  const lastFrameRef = useRef(null);

  const hiddenRef = useRef(false);
  const reverseRef = useRef(false);

  const renderTarget = RenderTarget.current();
  const isStatic =
    renderTarget === RenderTarget.export ||
    renderTarget === RenderTarget.thumbnail;

  const linesKey = JSON.stringify(extractLines(text, linesProp));
  const colorsKey = Array.isArray(colors) ? colors.join('|') : '';
  const transitionKey = JSON.stringify(transition ?? {});

  const mcEnabled = !!mouseEnabled;
  const mcRadius = typeof mouseRadius === 'number' ? mouseRadius : 150;
  const mcForce = typeof mouseForce === 'number' ? mouseForce : 6;

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    const palette =
      Array.isArray(colors) && colors.length > 0
        ? colors
        : ['#393E41'];

    let entered = false;
    let count = 0;
    let ox = new Float32Array(0);
    let oy = new Float32Array(0);

    let sx = new Float32Array(0);
    let sy = new Float32Array(0);
    let px = new Float32Array(0);
    let py = new Float32Array(0);

    let repX = new Float32Array(0);
    let repY = new Float32Array(0);
    let cIdx = new Uint8Array(0);

    let prevMx = -99999;
    let prevMy = -99999;
    let mouseSpeed = 0;
    let smoothX = -99999;
    let smoothY = -99999;

    let cssW = 0;
    let cssH = 0;
    let dpr = 1;

    const fitFontSize = (
      measureCtx,
      lines,
      family,
      maxW,
      maxH,
      cap
    ) => {
      if (!lines || lines.length === 0) return cap;
      let lo = 12;
      let hi = cap;
      let best = lo;
      const lh = typeof lineHeight === 'number' ? lineHeight : 0.84;
      for (let iter = 0; iter < 16; iter++) {
        const mid = (lo + hi) / 2;
        measureCtx.font = `900 ${mid}px ${family}`;
        let widest = 0;
        for (const line of lines) {
          const w = measureCtx.measureText(line).width;
          if (w > widest) widest = w;
        }
        const lineH = mid * lh;
        const totalH = mid * 0.85 + (lines.length - 1) * lineH;
        if (widest <= maxW && totalH <= maxH) {
          best = mid;
          lo = mid;
        } else {
          hi = mid;
        }
      }
      return Math.max(12, Math.floor(best));
    };

    const sampleText = () => {
      const W = cssW;
      const H = cssH;
      if (W <= 0 || H <= 0) return;

      const off = document.createElement('canvas');
      off.width = Math.max(1, Math.floor(W * dpr));
      off.height = Math.max(1, Math.floor(H * dpr));
      const offCtx = off.getContext('2d', { willReadFrequently: true });
      if (!offCtx) return;
      offCtx.scale(dpr, dpr);

      const fontFamily =
        '"Outfit", "Plus Jakarta Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif';

      const lines = extractLines(text, linesProp);

      const maxW = W * 0.99;
      const maxH = H * 0.96;
      let effectiveSize = Math.max(12, fontSize);
      if (autoFit) {
        effectiveSize = fitFontSize(
          offCtx,
          lines,
          fontFamily,
          maxW,
          maxH,
          Math.max(12, fontSize)
        );
      }

      offCtx.font = `900 ${effectiveSize}px ${fontFamily}`;
      let widest = 0;
      for (const line of lines) {
        const w = offCtx.measureText(line).width;
        if (w > widest) widest = w;
      }
      const lh = typeof lineHeight === 'number' ? lineHeight : 0.84;
      const lineStep = effectiveSize * lh;
      const totalH = effectiveSize * 0.85 + (lines.length - 1) * lineStep;
      const fitScale = Math.min(1, maxW / (widest || 1), maxH / (totalH || 1));
      if (fitScale < 1) effectiveSize = Math.max(12, effectiveSize * fitScale);

      const isAlignLeft = align === 'left';
      offCtx.clearRect(0, 0, W, H);
      offCtx.fillStyle = '#fff';
      offCtx.font = `900 ${effectiveSize}px ${fontFamily}`;
      offCtx.textAlign = isAlignLeft ? 'left' : 'center';
      offCtx.textBaseline = 'top';

      const totalBlockH = (lines.length - 1) * lineStep + effectiveSize * 0.85;
      const startY = Math.max(0, (H - totalBlockH) / 2);
      const startX = isAlignLeft ? 2 : W / 2;
      lines.forEach((line, idx) => {
        offCtx.fillText(line, startX, startY + idx * lineStep);
      });

      const img = offCtx.getImageData(
        0,
        0,
        Math.floor(W * dpr),
        Math.floor(H * dpr)
      );
      const data = img.data;

      const pCount = Math.max(1, Math.min(50, particleCount));
      const stride = Math.max(2, Math.round(150 / pCount));

      let candidates = 0;
      for (let y = 0; y < H; y += stride) {
        for (let x = 0; x < W; x += stride) {
          const ix = Math.floor(x * dpr);
          const iy = Math.floor(y * dpr);
          const idx = (iy * img.width + ix) * 4 + 3;
          if (data[idx] > 128) candidates++;
        }
      }

      const downsample =
        candidates > 30000 ? Math.ceil(candidates / 30000) : 1;
      const allocCount = Math.min(candidates, 30000);

      const newOx = new Float32Array(allocCount);
      const newOy = new Float32Array(allocCount);
      const newSx = new Float32Array(allocCount);
      const newSy = new Float32Array(allocCount);
      const newPx = new Float32Array(allocCount);
      const newPy = new Float32Array(allocCount);
      const newC = new Uint8Array(allocCount);

      let i = 0;
      let seen = 0;
      for (let y = 0; y < H && i < allocCount; y += stride) {
        for (let x = 0; x < W && i < allocCount; x += stride) {
          const ix = Math.floor(x * dpr);
          const iy = Math.floor(y * dpr);
          const idx = (iy * img.width + ix) * 4 + 3;
          if (data[idx] > 128) {
            if (seen % downsample === 0) {
              newOx[i] = x;
              newOy[i] = y;

              const ang = Math.random() * Math.PI * 2;
              const rad =
                Math.max(W, H) * (0.6 + Math.random() * 0.5);
              const rx = W / 2 + Math.cos(ang) * rad;
              const ry = H / 2 + Math.sin(ang) * rad;
              newSx[i] = rx;
              newSy[i] = ry;
              newPx[i] = entered ? x : rx;
              newPy[i] = entered ? y : ry;
              newC[i] = Math.floor(Math.random() * palette.length);
              i++;
            }
            seen++;
          }
        }
      }

      count = i;
      ox = newOx;
      oy = newOy;
      sx = newSx;
      sy = newSy;
      px = newPx;
      py = newPy;
      repX = new Float32Array(allocCount);
      repY = new Float32Array(allocCount);
      cIdx = newC;

      if (!entered) {
        formValRef.current = 0;
      }
      lastFrameRef.current = null;
    };

    const resize = () => {
      const rect = container.getBoundingClientRect();
      const w = Math.floor(rect.width);
      const h = Math.floor(rect.height);
      if (w <= 0 || h <= 0) return;
      dpr = Math.max(
        1,
        Math.min(
          2,
          typeof window !== 'undefined'
            ? window.devicePixelRatio || 1
            : 1
        )
      );
      cssW = w;
      cssH = h;
      canvas.width = Math.floor(cssW * dpr);
      canvas.height = Math.floor(cssH * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      sampleText();
    };

    resize();

    reverseRef.current = false;
    hiddenRef.current = true;
    formValRef.current = 0;

    const formIn = () => {
      reverseRef.current = false;
      hiddenRef.current = false;
    };
    const formOut = () => {
      reverseRef.current = true;
    };

    let tryEnter = null;
    const enterTimers = [];

    const ro = new ResizeObserver(() => {
      resize();
      if (isStatic) staticDraw();
      tryEnter?.();
    });
    ro.observe(container);

    const getCoords = (clientX, clientY) => {
      const rect = canvas.getBoundingClientRect();
      const scaleX = rect.width > 0 ? cssW / rect.width : 1;
      const scaleY = rect.height > 0 ? cssH / rect.height : 1;
      return {
        x: (clientX - rect.left) * scaleX,
        y: (clientY - rect.top) * scaleY,
      };
    };

    const triggerDisperse = (cx, cy, intensity = 1.0) => {
      if (count <= 0) return;
      const radius = Math.max(90, mcRadius * 1.5);
      const radiusSq = radius * radius;
      for (let i = 0; i < count; i++) {
        const dx = ox[i] - cx;
        const dy = oy[i] - cy;
        const distSq = dx * dx + dy * dy;
        if (distSq < radiusSq) {
          const dist = Math.max(1, Math.sqrt(distSq));
          const nx = dx / dist;
          const ny = dy / dist;
          const falloff = 1 - dist / radius;
          const force = falloff * falloff * (mcForce * 2.2 + 38) * intensity;
          repX[i] += nx * force + (Math.random() - 0.5) * 8;
          repY[i] += ny * force + (Math.random() - 0.5) * 8;
        }
      }
    };

    const onMove = (e) => {
      if (!mcEnabled) return;
      const clientX = e.touches && e.touches.length > 0 ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches && e.touches.length > 0 ? e.touches[0].clientY : e.clientY;
      const { x, y } = getCoords(clientX, clientY);

      if (prevMx > -9000) {
        const ddx = x - prevMx;
        const ddy = y - prevMy;
        mouseSpeed = Math.max(12, Math.sqrt(ddx * ddx + ddy * ddy));
      } else {
        mouseSpeed = 22;
      }
      prevMx = x;
      prevMy = y;
      pointerRef.current.x = x;
      pointerRef.current.y = y;
      pointerRef.current.active = true;

      // On active drag / touch rub: immediate tactile separation force
      const rubRadius = Math.max(75, mcRadius * 1.15);
      const rubRadiusSq = rubRadius * rubRadius;
      for (let i = 0; i < count; i++) {
        const dx = ox[i] - x;
        const dy = oy[i] - y;
        const distSq = dx * dx + dy * dy;
        if (distSq < rubRadiusSq) {
          const dist = Math.max(1, Math.sqrt(distSq));
          const nx = dx / dist;
          const ny = dy / dist;
          const falloff = 1 - dist / rubRadius;
          const rubPush = falloff * 8;
          repX[i] += nx * rubPush;
          repY[i] += ny * rubPush;
        }
      }
    };

    const onDown = (e) => {
      if (!mcEnabled) return;
      const clientX = e.touches && e.touches.length > 0 ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches && e.touches.length > 0 ? e.touches[0].clientY : e.clientY;
      const { x, y } = getCoords(clientX, clientY);

      prevMx = x;
      prevMy = y;
      mouseSpeed = 25;
      pointerRef.current.x = x;
      pointerRef.current.y = y;
      pointerRef.current.active = true;

      // Tap / Click separation shockwave:
      triggerDisperse(x, y, 1.25);
    };

    const onLeave = () => {
      pointerRef.current.x = -99999;
      pointerRef.current.y = -99999;
      pointerRef.current.active = false;
      prevMx = -99999;
      prevMy = -99999;
    };

    const onClick = (e) => {
      if (!mcEnabled) return;
      const { x, y } = getCoords(e.clientX, e.clientY);
      triggerDisperse(x, y, 1.5);
    };

    canvas.addEventListener('pointermove', onMove);
    canvas.addEventListener('pointerdown', onDown);
    canvas.addEventListener('pointerup', onLeave);
    canvas.addEventListener('pointerleave', onLeave);
    canvas.addEventListener('pointercancel', onLeave);

    // Dedicated touch listeners for mobile rub and tap
    canvas.addEventListener('touchstart', onDown, { passive: true });
    canvas.addEventListener('touchmove', onMove, { passive: true });
    canvas.addEventListener('touchend', onLeave, { passive: true });
    canvas.addEventListener('touchcancel', onLeave, { passive: true });

    canvas.addEventListener('click', onClick);

    let containerIo = null;
    let heroIo = null;

    if (mode === 'onHover') {
      container.addEventListener('pointerenter', formIn);
      container.addEventListener('pointerleave', formOut);
    } else {
      const enter = () => {
        if (entered) return;
        entered = true;
        formValRef.current = 0;
        lastFrameRef.current = null;
        formIn();
        if (!replay) {
          containerIo?.disconnect();
          heroIo?.disconnect();
        }
      };

      tryEnter = () => {
        if (entered || typeof window === 'undefined') return;
        const r = container.getBoundingClientRect();
        if (r.width === 0 && r.height === 0) return;
        const vh = window.innerHeight || 0;
        const vw = window.innerWidth || 0;
        const onScreen =
          r.bottom > 0 && r.top < vh && r.right > 0 && r.left < vw;
        if (onScreen) enter();
      };

      const heroSection = container.closest('section');

      const resetBehindTheScenes = () => {
        if (!replay) return;
        entered = false;
        hiddenRef.current = true;
        reverseRef.current = false;
        formValRef.current = 0;
        lastFrameRef.current = null;
        for (let k = 0; k < count; k++) {
          px[k] = sx[k];
          py[k] = sy[k];
          repX[k] = 0;
          repY[k] = 0;
        }
      };

      if (heroSection) {
        // Trigger formation when container enters the viewport
        containerIo = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting) {
              enter();
            }
          },
          { threshold: 0.15 }
        );
        containerIo.observe(container);

        // When user completely scrolls past the hero section into the next marquee/section,
        // it disappears and resets behind the scenes so coming back re-animates cleanly.
        heroIo = new IntersectionObserver(
          ([entry]) => {
            if (!entry.isIntersecting) {
              resetBehindTheScenes();
            }
          },
          { threshold: 0 }
        );
        heroIo.observe(heroSection);
      } else {
        containerIo = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting) {
              enter();
            } else if (replay) {
              resetBehindTheScenes();
            }
          },
          { threshold: 0.1 }
        );
        containerIo.observe(container);
      }

      tryEnter();
      enterTimers.push(
        setTimeout(() => tryEnter?.(), 60),
        setTimeout(() => tryEnter?.(), 250),
        setTimeout(() => tryEnter?.(), 600)
      );
    }

    const buckets = palette.map(() => []);

    const easeFn = resolveEasingFn(transition);
    const formMs = Math.max(0, resolveDuration(transition) * 1000);

    const drawFrame = () => {
      ctx.clearRect(0, 0, cssW, cssH);

      const pr = pointerRef.current;

      const drawSize = Math.max(1, particleSize / 4);
      const half = drawSize / 2;

      const now =
        typeof performance !== 'undefined' ? performance.now() : 0;
      const last = lastFrameRef.current ?? now;

      const dt = Math.min(64, Math.max(0, now - last));
      lastFrameRef.current = now;
      const reverse = reverseRef.current;
      const target = reverse ? 0 : 1;
      let v = formValRef.current;
      if (isStatic || formMs <= 0) {
        v = target;
      } else {
        const stepv = dt / formMs;
        if (v < target) v = Math.min(target, v + stepv);
        else if (v > target) v = Math.max(target, v - stepv);
      }
      formValRef.current = v;

      if (reverse && v <= 0) hiddenRef.current = true;

      if (hiddenRef.current) return;
      const forming = v < 1;

      const factor = easeFn(v);

      const hitSpeed = mouseSpeed;
      mouseSpeed *= 0.88;
      const active = !forming && mcEnabled && pr.active;
      if (active) {
        const lerpFactor = Math.max(0.08, 0.3 - hitSpeed * 0.006);
        if (smoothX < -9000) {
          smoothX = pr.x;
          smoothY = pr.y;
        } else {
          smoothX += (pr.x - smoothX) * lerpFactor;
          smoothY += (pr.y - smoothY) * lerpFactor;
        }
      } else {
        smoothX = -99999;
        smoothY = -99999;
      }
      const mx = smoothX;
      const my = smoothY;
      const repCutoff = Math.max(1, mcRadius);
      const repCutoffSq = repCutoff * repCutoff;
      const rF = mcForce;

      for (let b = 0; b < buckets.length; b++) buckets[b].length = 0;

      for (let i = 0; i < count; i++) {
        const oxi = ox[i];
        const oyi = oy[i];

        if (forming) {
          px[i] = sx[i] + (oxi - sx[i]) * factor;
          py[i] = sy[i] + (oyi - sy[i]) * factor;
          buckets[cIdx[i]].push(i);
          continue;
        }

        let inZone = false;
        if (active) {
          const dx = oxi - mx;
          const dy = oyi - my;
          const distSq = dx * dx + dy * dy;
          if (distSq > 0 && distSq < repCutoffSq) {
            const dist = Math.sqrt(distSq);
            const nx = dx / dist;
            const ny = dy / dist;
            const falloff = 1 - dist / repCutoff;
            const push = falloff * hitSpeed * rF * 0.05;
            repX[i] += nx * push;
            repY[i] += ny * push;
            const targetRepX = nx * (repCutoff - dist);
            const targetRepY = ny * (repCutoff - dist);
            repX[i] += (targetRepX - repX[i]) * 0.06;
            repY[i] += (targetRepY - repY[i]) * 0.06;
            inZone = true;
          }
        }
        if (!inZone) {
          repX[i] *= 0.97;
          repY[i] *= 0.97;
        }

        px[i] = oxi + repX[i];
        py[i] = oyi + repY[i];

        buckets[cIdx[i]].push(i);
      }

      ctx.globalAlpha = forming ? Math.min(1, Math.max(0, factor)) : 1;
      for (let b = 0; b < buckets.length; b++) {
        const bucket = buckets[b];
        if (bucket.length === 0) continue;
        ctx.fillStyle = palette[b];
        for (let k = 0; k < bucket.length; k++) {
          const i = bucket[k];
          ctx.fillRect(px[i] - half, py[i] - half, drawSize, drawSize);
        }
      }
      ctx.globalAlpha = 1;
    };

    const staticDraw = () => {
      hiddenRef.current = false;
      reverseRef.current = false;
      for (let i = 0; i < count; i++) {
        px[i] = ox[i];
        py[i] = oy[i];
      }
      drawFrame();
    };

    const removeTriggers = () => {
      container.removeEventListener('pointerenter', formIn);
      container.removeEventListener('pointerleave', formOut);
      containerIo?.disconnect();
      heroIo?.disconnect();
      enterTimers.forEach(clearTimeout);
    };

    if (isStatic) {
      staticDraw();
      return () => {
        canvas.removeEventListener('pointermove', onMove);
        canvas.removeEventListener('pointerdown', onDown);
        canvas.removeEventListener('pointerup', onLeave);
        canvas.removeEventListener('pointerleave', onLeave);
        canvas.removeEventListener('pointercancel', onLeave);
        canvas.removeEventListener('touchstart', onDown);
        canvas.removeEventListener('touchmove', onMove);
        canvas.removeEventListener('touchend', onLeave);
        canvas.removeEventListener('touchcancel', onLeave);
        canvas.removeEventListener('click', onClick);
        removeTriggers();
        ro.disconnect();
      };
    }

    const loop = () => {
      drawFrame();
      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);

    return () => {
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
      canvas.removeEventListener('pointermove', onMove);
      canvas.removeEventListener('pointerdown', onDown);
      canvas.removeEventListener('pointerup', onLeave);
      canvas.removeEventListener('pointerleave', onLeave);
      canvas.removeEventListener('pointercancel', onLeave);
      canvas.removeEventListener('touchstart', onDown);
      canvas.removeEventListener('touchmove', onMove);
      canvas.removeEventListener('touchend', onLeave);
      canvas.removeEventListener('touchcancel', onLeave);
      canvas.removeEventListener('click', onClick);
      removeTriggers();
      ro.disconnect();
    };
  }, [
    linesKey,
    colorsKey,
    align,
    lineHeight,
    mode,
    replay,
    position,
    particleSize,
    particleCount,
    mcEnabled,
    mcRadius,
    mcForce,
    fontSize,
    autoFit,
    transitionKey,
    isStatic,
  ]);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        minWidth: 0,
        minHeight: 250,
        overflow: 'hidden',
        ...style,
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          display: 'block',
          touchAction: 'none',
          cursor: 'pointer',
          userSelect: 'none',
          WebkitUserSelect: 'none',
        }}
      />
    </div>
  );
}
