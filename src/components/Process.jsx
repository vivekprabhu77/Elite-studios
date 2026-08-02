import React, { useState, useEffect, useRef, useCallback } from 'react';

const STEPS = [
  {
    num: '01', phase: 'Discover', title: 'Immersion & Research',
    desc: 'We start by diving deep into your brand identity, business model, and competitor landscape to isolate opportunities and define your target audience.',
    icon: (<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>)
  },
  {
    num: '02', phase: 'Strategy', title: 'Architecture & Art Direction',
    desc: 'Establishing the design system foundation, choosing typography palettes, outlining content strategies, and drafting functional wireframes.',
    icon: (<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>)
  },
  {
    num: '03', phase: 'Design', title: 'High-End Visual Craft',
    desc: 'Creating high-fidelity UI layouts, magazine-grade graphics, brand mockups, and interactive designs designed to capture emotion.',
    icon: (<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 19l7-7 3 3-7 7-3-3z"/><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"/><path d="M2 2l7.586 7.586"/><circle cx="11" cy="11" r="2"/></svg>)
  },
  {
    num: '04', phase: 'Develop', title: 'Clean Engineering',
    desc: 'Translating designs into fast, clean, React-supported code with micro-interactions, responsive layouts, and top-tier SEO optimizations.',
    icon: (<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>)
  },
  {
    num: '05', phase: 'Launch', title: 'Launch & Expansion',
    desc: 'Conducting thorough audit checks, performance speed-tuning, and hosting setup, followed by a smooth deployment launch.',
    icon: (<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 2L11 13"/><path d="M22 2l-7 20-4-9-9-4 20-7z"/></svg>)
  }
];

// Node angles placed in TRAVERSAL ORDER along the lemniscate (t increasing)
// Path traces: right → upper-right → center → upper-left → left → lower-left → center → lower-right → right
// So sequential encounter order is: π/6, 5π/6, π, 7π/6, 11π/6
const NODE_ANGLES = [
  Math.PI / 6,         // 01 Discover → lower-right of right lobe
  (5 * Math.PI) / 6,   // 02 Strategy → upper-left of left lobe
  Math.PI,              // 03 Design → leftmost point
  (7 * Math.PI) / 6,   // 04 Develop → lower-left of left lobe
  (11 * Math.PI) / 6,  // 05 Launch → upper-right of right lobe
];

// Lemniscate of Bernoulli
function lem(t, cx, cy, sx, sy) {
  const s = Math.sin(t), c = Math.cos(t), d = 1 + s * s;
  return { x: cx + (sx * c) / d, y: cy + (sy * s * c) / d, depth: c };
}

export default function Process() {
  const canvasRef = useRef(null);
  const wrapRef = useRef(null);
  const [active, setActive] = useState(0);
  const [visible, setVisible] = useState(false);
  const [nodePos, setNodePos] = useState([]);
  const activeRef = useRef(0);
  const progressRef = useRef(0); // continuous angle along the curve
  const setActiveRef = useRef(setActive);
  setActiveRef.current = setActive;

  // Intersection Observer
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.1 });
    if (wrapRef.current) obs.observe(wrapRef.current);
    return () => obs.disconnect();
  }, []);

  // Compute HTML node positions on resize
  const calcPositions = useCallback(() => {
    const el = wrapRef.current;
    if (!el) return;
    const w = el.clientWidth, h = el.clientHeight;
    const cx = w / 2, cy = h / 2;
    const sx = Math.min(w * 0.37, 340), sy = Math.min(h * 0.3, 140);
    setNodePos(NODE_ANGLES.map(a => lem(a, cx, cy, sx, sy)));
  }, []);

  useEffect(() => {
    calcPositions();
    window.addEventListener('resize', calcPositions);
    return () => window.removeEventListener('resize', calcPositions);
  }, [calcPositions]);

  // Jump progress to a specific step when clicked
  const jumpToStep = useCallback((idx) => {
    progressRef.current = NODE_ANGLES[idx] - 0.08;
    setActive(idx);
    activeRef.current = idx;
  }, []);

  // ═══════════════════════════════════════════════════
  // Canvas animation
  // ═══════════════════════════════════════════════════
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId, t = 0;

    // Particle stream
    const particles = Array.from({ length: 120 }, () => ({
      angle: Math.random() * Math.PI * 2,
      speed: 0.00015 + Math.random() * 0.0004,
      size: 0.4 + Math.random() * 1.5,
      bright: 0.12 + Math.random() * 0.7,
      perp: (Math.random() - 0.5) * 16,
      perpFreq: 0.5 + Math.random() * 2,
      trail: []
    }));

    // Ambient dust
    const dust = Array.from({ length: 50 }, () => ({
      x: Math.random(), y: Math.random(),
      s: 0.3 + Math.random() * 0.6,
      a: 0.012 + Math.random() * 0.035,
      vx: (Math.random() - 0.5) * 0.05,
      vy: (Math.random() - 0.5) * 0.05
    }));

    // Energy wisps (sparks from the comet head)
    const wisps = [];

    const resize = () => {
      const r = canvas.parentElement.getBoundingClientRect();
      canvas.width = r.width * devicePixelRatio;
      canvas.height = r.height * devicePixelRatio;
      canvas.style.width = r.width + 'px';
      canvas.style.height = r.height + 'px';
      ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
    };
    resize();
    window.addEventListener('resize', resize);

    let lastActive = 0;

    function draw() {
      const w = canvas.width / devicePixelRatio;
      const h = canvas.height / devicePixelRatio;
      ctx.clearRect(0, 0, w, h);

      const cx = w / 2, cy = h / 2;
      const sx = Math.min(w * 0.37, 340);
      const sy = Math.min(h * 0.3, 140);
      const T = t;

      // Advance progress continuously
      progressRef.current += 0.0055;
      const progress = progressRef.current;
      const normP = ((progress % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2);

      // ── Determine active step by closest node ──
      let minDist = Infinity, newActive = 0;
      NODE_ANGLES.forEach((a, i) => {
        let d = Math.abs(normP - a);
        d = Math.min(d, Math.PI * 2 - d);
        if (d < minDist) { minDist = d; newActive = i; }
      });
      if (newActive !== lastActive) {
        lastActive = newActive;
        activeRef.current = newActive;
        setActiveRef.current(newActive);
      }

      // ════════════════════════════════════════════
      // LAYER 1 — Background atmosphere
      // ════════════════════════════════════════════
      const bg = ctx.createRadialGradient(cx, cy, 0, cx, cy, sx * 1.6);
      bg.addColorStop(0, 'rgba(212,176,124,0.04)');
      bg.addColorStop(0.4, 'rgba(212,176,124,0.012)');
      bg.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, w, h);

      // Dot grid
      ctx.fillStyle = 'rgba(255,255,255,0.01)';
      const gs = 30;
      for (let gx = gs; gx < w; gx += gs)
        for (let gy = gs; gy < h; gy += gs) {
          ctx.beginPath(); ctx.arc(gx, gy, 0.5, 0, Math.PI * 2); ctx.fill();
        }

      // ════════════════════════════════════════════
      // LAYER 2 — Wide ambient glow around path
      // ════════════════════════════════════════════
      ctx.beginPath();
      for (let i = 0; i <= 400; i++) {
        const a = (i / 400) * Math.PI * 2;
        const p = lem(a, cx, cy, sx, sy);
        i === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y);
      }
      ctx.closePath();
      ctx.strokeStyle = 'rgba(212,176,124,0.02)';
      ctx.lineWidth = 42;
      ctx.lineCap = 'round'; ctx.lineJoin = 'round';
      ctx.stroke();

      // Medium glow band
      ctx.beginPath();
      for (let i = 0; i <= 400; i++) {
        const a = (i / 400) * Math.PI * 2;
        const p = lem(a, cx, cy, sx, sy);
        i === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y);
      }
      ctx.closePath();
      ctx.strokeStyle = 'rgba(212,176,124,0.035)';
      ctx.lineWidth = 14;
      ctx.stroke();

      // ════════════════════════════════════════════
      // LAYER 3 — 3D depth-modulated infinity path
      // ════════════════════════════════════════════
      const segs = 500;
      // Back pass (depth ≤ 0.05)
      for (let i = 0; i < segs; i++) {
        const a1 = (i / segs) * Math.PI * 2, a2 = ((i + 1) / segs) * Math.PI * 2;
        const p1 = lem(a1, cx, cy, sx, sy), p2 = lem(a2, cx, cy, sx, sy);
        if (p1.depth > 0.05) continue;
        const df = Math.max(0, 0.5 + 0.5 * p1.depth);
        ctx.beginPath(); ctx.moveTo(p1.x, p1.y); ctx.lineTo(p2.x, p2.y);
        ctx.strokeStyle = `rgba(212,176,124,${0.03 + 0.08 * df})`;
        ctx.lineWidth = 1.2 + df * 0.7; ctx.lineCap = 'round'; ctx.stroke();
      }
      // Front pass (depth > 0.05)
      for (let i = 0; i < segs; i++) {
        const a1 = (i / segs) * Math.PI * 2, a2 = ((i + 1) / segs) * Math.PI * 2;
        const p1 = lem(a1, cx, cy, sx, sy), p2 = lem(a2, cx, cy, sx, sy);
        if (p1.depth <= 0.05) continue;
        const df = 0.5 + 0.5 * p1.depth;
        ctx.beginPath(); ctx.moveTo(p1.x, p1.y); ctx.lineTo(p2.x, p2.y);
        ctx.strokeStyle = `rgba(212,176,124,${0.05 + 0.14 * df})`;
        ctx.lineWidth = 1.5 + df * 1; ctx.lineCap = 'round'; ctx.stroke();
      }

      // Inner dashed guide
      ctx.beginPath(); ctx.setLineDash([3, 10]);
      for (let i = 0; i <= 400; i++) {
        const a = (i / 400) * Math.PI * 2;
        const p = lem(a, cx, cy, sx * 0.82, sy * 0.82);
        i === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y);
      }
      ctx.closePath();
      ctx.strokeStyle = 'rgba(212,176,124,0.025)';
      ctx.lineWidth = 0.7; ctx.stroke(); ctx.setLineDash([]);

      // ════════════════════════════════════════════
      // LAYER 4 — PRIMARY FLOWING COMET (the heart)
      // ════════════════════════════════════════════
      const TRAIL_LEN = Math.PI * 0.85;
      const TRAIL_SEGS = 90;

      for (let i = 0; i < TRAIL_SEGS; i++) {
        const frac = i / TRAIL_SEGS; // 0=tail, 1=head
        const a1 = progress - TRAIL_LEN * (1 - frac);
        const a2 = progress - TRAIL_LEN * (1 - (frac + 1 / TRAIL_SEGS));
        const p1 = lem(a1, cx, cy, sx, sy), p2 = lem(a2, cx, cy, sx, sy);
        const intensity = Math.pow(frac, 2.5);
        const alpha = intensity * 0.42;
        const lw = 1.2 + intensity * 8;
        ctx.beginPath(); ctx.moveTo(p1.x, p1.y); ctx.lineTo(p2.x, p2.y);
        ctx.strokeStyle = `rgba(245,197,66,${alpha})`;
        ctx.lineWidth = lw; ctx.lineCap = 'round'; ctx.stroke();
      }

      // Head glow
      const headPt = lem(progress, cx, cy, sx, sy);
      const hg = ctx.createRadialGradient(headPt.x, headPt.y, 0, headPt.x, headPt.y, 36);
      hg.addColorStop(0, 'rgba(255,250,220,0.5)');
      hg.addColorStop(0.2, 'rgba(245,197,66,0.22)');
      hg.addColorStop(0.5, 'rgba(245,197,66,0.06)');
      hg.addColorStop(1, 'rgba(245,197,66,0)');
      ctx.beginPath(); ctx.arc(headPt.x, headPt.y, 36, 0, Math.PI * 2);
      ctx.fillStyle = hg; ctx.fill();

      // Core bead
      const cg = ctx.createRadialGradient(headPt.x - 1, headPt.y - 1, 0, headPt.x, headPt.y, 5.5);
      cg.addColorStop(0, '#FFFFFF');
      cg.addColorStop(0.45, '#FFE8A0');
      cg.addColorStop(1, '#d4b07c');
      ctx.beginPath(); ctx.arc(headPt.x, headPt.y, 5.5, 0, Math.PI * 2);
      ctx.fillStyle = cg; ctx.fill();

      // ════════════════════════════════════════════
      // LAYER 5 — Secondary trailing comet
      // ════════════════════════════════════════════
      const secP = progress - Math.PI * 0.75;
      const SEC_LEN = Math.PI * 0.35, SEC_SEGS = 45;
      for (let i = 0; i < SEC_SEGS; i++) {
        const frac = i / SEC_SEGS;
        const a1 = secP - SEC_LEN * (1 - frac), a2 = secP - SEC_LEN * (1 - (frac + 1 / SEC_SEGS));
        const p1 = lem(a1, cx, cy, sx, sy), p2 = lem(a2, cx, cy, sx, sy);
        const intensity = Math.pow(frac, 2);
        ctx.beginPath(); ctx.moveTo(p1.x, p1.y); ctx.lineTo(p2.x, p2.y);
        ctx.strokeStyle = `rgba(212,176,124,${intensity * 0.14})`;
        ctx.lineWidth = 1 + intensity * 3; ctx.lineCap = 'round'; ctx.stroke();
      }
      const secPt = lem(secP, cx, cy, sx, sy);
      const sg = ctx.createRadialGradient(secPt.x, secPt.y, 0, secPt.x, secPt.y, 16);
      sg.addColorStop(0, 'rgba(245,197,66,0.18)');
      sg.addColorStop(1, 'rgba(245,197,66,0)');
      ctx.beginPath(); ctx.arc(secPt.x, secPt.y, 16, 0, Math.PI * 2);
      ctx.fillStyle = sg; ctx.fill();

      // ════════════════════════════════════════════
      // LAYER 6 — Energy wisps (sparks from comet)
      // ════════════════════════════════════════════
      if (Math.random() < 0.18) {
        wisps.push({
          x: headPt.x, y: headPt.y,
          vx: (Math.random() - 0.5) * 2.5,
          vy: (Math.random() - 0.5) * 2.5,
          life: 1, decay: 0.014 + Math.random() * 0.012,
          size: 0.8 + Math.random() * 2
        });
      }
      for (let i = wisps.length - 1; i >= 0; i--) {
        const wp = wisps[i];
        wp.x += wp.vx; wp.y += wp.vy; wp.life -= wp.decay;
        if (wp.life <= 0) { wisps.splice(i, 1); continue; }
        ctx.beginPath();
        ctx.arc(wp.x, wp.y, wp.size * wp.life, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(245,197,66,${wp.life * 0.28})`;
        ctx.fill();
      }
      if (wisps.length > 50) wisps.splice(0, wisps.length - 50);

      // ════════════════════════════════════════════
      // LAYER 7 — Particle stream with comet trails
      // ════════════════════════════════════════════
      particles.forEach(p => {
        p.angle = (p.angle + p.speed * 16) % (Math.PI * 2);
        const base = lem(p.angle, cx, cy, sx, sy);
        const tang = lem(p.angle + 0.01, cx, cy, sx, sy);
        const dx = tang.x - base.x, dy = tang.y - base.y;
        const len = Math.sqrt(dx * dx + dy * dy) || 1;
        const nx = -dy / len, ny = dx / len;
        const perpAmt = p.perp * Math.sin(T * 0.0005 * p.perpFreq + p.angle * 3);
        const px = base.x + nx * perpAmt, py = base.y + ny * perpAmt;

        p.trail.push({ x: px, y: py });
        if (p.trail.length > 8) p.trail.shift();

        for (let ti = 0; ti < p.trail.length - 1; ti++) {
          const tf = ti / p.trail.length;
          ctx.beginPath();
          ctx.arc(p.trail[ti].x, p.trail[ti].y, p.size * tf * 0.5, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(245,197,66,${tf * p.bright * 0.14})`;
          ctx.fill();
        }
        const dm = 0.35 + 0.65 * (0.5 + 0.5 * base.depth);
        ctx.beginPath();
        ctx.arc(px, py, p.size * dm, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(245,197,66,${p.bright * 0.28 * dm})`;
        ctx.fill();
      });

      // ════════════════════════════════════════════
      // LAYER 8 — Center nexus
      // ════════════════════════════════════════════
      const ng = ctx.createRadialGradient(cx, cy, 0, cx, cy, 50);
      ng.addColorStop(0, `rgba(212,176,124,${0.06 + 0.025 * Math.sin(T * 0.0015)})`);
      ng.addColorStop(0.4, 'rgba(212,176,124,0.015)');
      ng.addColorStop(1, 'rgba(212,176,124,0)');
      ctx.beginPath(); ctx.arc(cx, cy, 50, 0, Math.PI * 2);
      ctx.fillStyle = ng; ctx.fill();

      for (let r = 0; r < 6; r++) {
        const ra = T * 0.0004 + (r * Math.PI * 2) / 6;
        const rl = 25 + 7 * Math.sin(T * 0.001 + r * 2);
        ctx.beginPath(); ctx.moveTo(cx, cy);
        ctx.lineTo(cx + Math.cos(ra) * rl, cy + Math.sin(ra) * rl);
        ctx.strokeStyle = `rgba(245,197,66,${0.03 + 0.02 * Math.sin(T * 0.0012 + r)})`;
        ctx.lineWidth = 0.8; ctx.stroke();
      }

      const cn = ctx.createRadialGradient(cx, cy, 0, cx, cy, 4);
      cn.addColorStop(0, 'rgba(255,255,255,0.5)');
      cn.addColorStop(0.5, 'rgba(245,197,66,0.15)');
      cn.addColorStop(1, 'rgba(212,176,124,0)');
      ctx.beginPath(); ctx.arc(cx, cy, 4, 0, Math.PI * 2);
      ctx.fillStyle = cn; ctx.fill();

      // ════════════════════════════════════════════
      // LAYER 9 — Node proximity glow (flash as comet passes)
      // ════════════════════════════════════════════
      NODE_ANGLES.forEach((angle, idx) => {
        const pt = lem(angle, cx, cy, sx, sy);
        let angDist = Math.abs(normP - angle);
        angDist = Math.min(angDist, Math.PI * 2 - angDist);
        const proximity = Math.max(0, 1 - angDist / 0.55);

        if (proximity > 0.01) {
          const gr = 30 + 20 * proximity;
          const ga = 0.22 * Math.pow(proximity, 1.3);
          const pg = ctx.createRadialGradient(pt.x, pt.y, 8, pt.x, pt.y, gr);
          pg.addColorStop(0, `rgba(212,176,124,${ga})`);
          pg.addColorStop(1, 'rgba(212,176,124,0)');
          ctx.beginPath(); ctx.arc(pt.x, pt.y, gr, 0, Math.PI * 2);
          ctx.fillStyle = pg; ctx.fill();
        }

        // Spinning arcs on active node
        if (idx === activeRef.current) {
          const pr = 30 + 4 * Math.sin(T * 0.002);
          ctx.beginPath();
          ctx.arc(pt.x, pt.y, pr, T * 0.0015, T * 0.0015 + Math.PI * 0.5);
          ctx.strokeStyle = 'rgba(212,176,124,0.22)';
          ctx.lineWidth = 1.3; ctx.stroke();
          ctx.beginPath();
          ctx.arc(pt.x, pt.y, pr, T * 0.0015 + Math.PI, T * 0.0015 + Math.PI * 1.3);
          ctx.strokeStyle = 'rgba(212,176,124,0.1)';
          ctx.lineWidth = 0.8; ctx.stroke();
        }
      });

      // ════════════════════════════════════════════
      // LAYER 10 — Ambient dust
      // ════════════════════════════════════════════
      dust.forEach(d => {
        d.x = (d.x + d.vx / w) % 1; d.y = (d.y + d.vy / h) % 1;
        if (d.x < 0) d.x = 1; if (d.y < 0) d.y = 1;
        ctx.beginPath(); ctx.arc(d.x * w, d.y * h, d.s, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(212,176,124,${d.a})`; ctx.fill();
      });

      t += 16;
      animId = requestAnimationFrame(draw);
    }

    draw();
    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', resize); };
  }, []);

  const step = STEPS[active];

  return (
    <section id="process" className="py-12 md:py-16 px-6 md:px-12 bg-black relative overflow-hidden border-b border-white/[0.04]">
      <div className="absolute top-[10%] left-[-15%] w-[500px] h-[500px] bg-[#d4b07c]/[0.005] rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full">
        {/* Header */}
        <div className={`mb-4 md:mb-6 text-left transition-all duration-1000 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <span className="text-xs uppercase tracking-widest text-[#d4b07c] font-bold block mb-2 font-display">Our Method</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-none font-creative">
            THE CREATIVE <span className="text-[#d4b07c]">PROCESS</span>
          </h2>
        </div>

        {/* ═══ Infinity Visualization ═══ */}
        <div
          ref={wrapRef}
          className={`relative w-full h-[260px] sm:h-[300px] md:h-[340px] lg:h-[360px] transition-all duration-1000 delay-200 ${visible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
        >
          <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

          {/* HTML Node Overlays */}
          {nodePos.map((pos, idx) => {
            const isActive = idx === active;
            const s = STEPS[idx];
            return (
              <button
                key={idx}
                onClick={() => jumpToStep(idx)}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 z-10 group cursor-pointer outline-none"
                style={{ left: pos.x, top: pos.y, transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)' }}
              >
                <div
                  className={`relative flex items-center justify-center rounded-full transition-all duration-700 ease-out
                    ${isActive
                      ? 'w-12 h-12 sm:w-14 sm:h-14 border-[1.5px] border-[#d4b07c]/50 bg-[#0e0b06]/90 shadow-[0_0_40px_rgba(212,176,124,0.2),0_0_80px_rgba(212,176,124,0.06)]'
                      : 'w-9 h-9 sm:w-11 sm:h-11 border border-white/[0.08] bg-[#0a0a0a]/80 group-hover:border-white/[0.18] group-hover:bg-[#0f0d08]/80'
                    }`}
                  style={{ backdropFilter: 'blur(12px)' }}
                >
                  <span className={`transition-all duration-500 font-display font-bold ${isActive ? 'text-[#d4b07c] text-xs sm:text-sm' : 'text-white/30 text-[11px] sm:text-xs group-hover:text-white/50'}`}>
                    {s.num}
                  </span>
                  {isActive && <span className="absolute inset-0 rounded-full border border-[#d4b07c]/20 animate-[ping_2.5s_cubic-bezier(0,0,0.2,1)_infinite]" />}
                </div>
                <span className={`absolute left-1/2 -translate-x-1/2 whitespace-nowrap font-display uppercase tracking-[0.15em] transition-all duration-500
                  ${isActive
                    ? 'text-[10px] sm:text-[11px] font-bold text-[#d4b07c] top-full mt-1.5'
                    : 'text-[8px] sm:text-[9px] font-medium text-white/20 top-full mt-1 group-hover:text-white/35'
                  }`}>
                  {s.phase}
                </span>
              </button>
            );
          })}
        </div>

        {/* ═══ Active Step Detail ═══ */}
        <div className={`mt-4 md:mt-6 text-center max-w-2xl mx-auto transition-all duration-700 delay-300 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          <div key={active} className="process-fade-in">
            <div className="flex items-center justify-center gap-3 mb-2">
              <span className="w-8 h-8 flex items-center justify-center rounded-full border border-[#d4b07c]/20 text-[#d4b07c] bg-[#d4b07c]/5">{step.icon}</span>
              <span className="text-[10px] sm:text-xs uppercase tracking-[0.2em] text-[#d4b07c] font-bold font-display">{step.phase}</span>
            </div>
            <h3 className="text-lg md:text-xl font-bold text-white tracking-tight mb-2 font-display">{step.title}</h3>
            <p className="text-xs sm:text-sm text-gray-400 font-light leading-relaxed max-w-lg mx-auto">{step.desc}</p>
          </div>
        </div>

        {/* ═══ Bottom Timeline ═══ */}
        <div className={`mt-5 md:mt-6 flex items-center justify-center gap-1.5 sm:gap-2.5 flex-wrap transition-all duration-1000 delay-500 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          {STEPS.map((s, idx) => (
            <React.Fragment key={idx}>
              <button
                onClick={() => jumpToStep(idx)}
                className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border text-[10px] sm:text-xs font-bold tracking-wider uppercase cursor-pointer font-display transition-all duration-400
                  ${idx === active
                    ? 'border-[#d4b07c]/40 bg-[#d4b07c]/8 text-[#d4b07c] shadow-[0_0_24px_rgba(212,176,124,0.1)]'
                    : 'border-white/[0.05] bg-transparent text-white/25 hover:text-white/45 hover:border-white/[0.12]'
                  }`}
              >
                <span className={`w-4 h-4 sm:w-5 sm:h-5 rounded-full flex items-center justify-center text-[9px] sm:text-[10px] font-bold
                  ${idx === active ? 'bg-[#d4b07c] text-black' : 'bg-white/[0.05] text-white/35'}`}>
                  {idx + 1}
                </span>
                <span className="hidden sm:inline">{s.phase}</span>
              </button>
              {idx < STEPS.length - 1 && (
                <div className={`w-4 sm:w-8 h-[1px] transition-all duration-500 ${idx < active ? 'bg-[#d4b07c]/25' : 'bg-white/[0.03]'}`} />
              )}
            </React.Fragment>
          ))}
        </div>

        <div className="flex items-center justify-center mt-3 gap-0">
          {STEPS.map((_, idx) => (
            <React.Fragment key={idx}>
              <div className={`w-1.5 h-1.5 rounded-full transition-all duration-500 ${idx === active ? 'bg-[#d4b07c] scale-125' : idx < active ? 'bg-[#d4b07c]/30' : 'bg-white/[0.05]'}`} />
              {idx < STEPS.length - 1 && (
                <div className={`w-6 sm:w-10 h-[1px] transition-all duration-500 ${idx < active ? 'bg-gradient-to-r from-[#d4b07c]/25 to-[#d4b07c]/10' : 'bg-white/[0.03]'}`} />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes processFadeIn {
          0% { opacity: 0; transform: translateY(14px) scale(0.97); filter: blur(4px); }
          100% { opacity: 1; transform: translateY(0) scale(1); filter: blur(0px); }
        }
        .process-fade-in { animation: processFadeIn 0.6s cubic-bezier(0.16, 1, 0.3, 1); }
      `}</style>
    </section>
  );
}
