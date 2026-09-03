import React, { useEffect, useRef, useCallback } from 'react';

// ─── Constants ────────────────────────────────────────────────────────────────

const CELL_SIZE = 55;
const INFLUENCE_RADIUS = 260;
const MAX_WARP = 24;
const DOT_SPACING = 28;
const LERP_SPEED = 0.08;

const LINE_BASE = { r: 255, g: 255, b: 255, a: 0.13 };
const NODE_BASE_RADIUS = 1.8;
const NODE_ACTIVE_RADIUS = 3.2;

const THEME = {
  bg: '#060814',
  lineActive: { r: 0, g: 163, b: 224, a: 0.9 },
  nodeActive: { r: 0, g: 163, b: 224, a: 1.0 },
  glow: '0,163,224',
  ripple: '100,180,255'
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

function lerpN(a, b, t) {
  return a + (b - a) * t;
}

function lerpColor(base, active, t) {
  const r = Math.round(lerpN(base.r, active.r, t));
  const g = Math.round(lerpN(base.g, active.g, t));
  const b = Math.round(lerpN(base.b, active.b, t));
  const a = lerpN(base.a, active.a, t);
  return `rgba(${r},${g},${b},${a.toFixed(3)})`;
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function KineticGridBackground() {
  const canvasRef = useRef(null);

  const mouseRef = useRef({ x: -9999, y: -9999 });
  const targetMouseRef = useRef({ x: -9999, y: -9999 });
  const ripplesRef = useRef([]);
  const rafRef = useRef(0);
  const sizeRef = useRef({ w: 0, h: 0 });

  const getWarpedPoint = useCallback((gx, gy, col, row, mouse, ripples, cols, rows) => {
    const edgeMargin = 1.5;
    const colPin = Math.min(col / edgeMargin, (cols - 1 - col) / edgeMargin, 1);
    const rowPin = Math.min(row / edgeMargin, (rows - 1 - row) / edgeMargin, 1);
    const pinFactor = colPin * colPin * rowPin * rowPin;

    const dx = gx - mouse.x;
    const dy = gy - mouse.y;
    const dist = Math.sqrt(dx * dx + dy * dy);

    const proximity = Math.max(0, 1 - dist / INFLUENCE_RADIUS) * pinFactor;

    let rx = 0, ry = 0;
    for (const r of ripples) {
      const rdx = gx - r.x;
      const rdy = gy - r.y;
      const rdist = Math.sqrt(rdx * rdx + rdy * rdy);
      const waveWidth = 55;
      const diff = rdist - r.radius;
      if (Math.abs(diff) < waveWidth) {
        const strength = (1 - Math.abs(diff) / waveWidth) * r.opacity * 18 * pinFactor;
        const angle = Math.atan2(rdy, rdx);
        const sign = diff < 0 ? -1 : 1;
        rx += Math.cos(angle) * strength * sign * -1;
        ry += Math.sin(angle) * strength * sign * -1;
      }
    }

    if (dist < INFLUENCE_RADIUS && dist > 0 && pinFactor > 0) {
      const t = dist / INFLUENCE_RADIUS;
      const eased = t < 0.01 ? 0 : (1 - t) * (1 - t) * Math.min(1, dist / 60);
      const warpAmt = eased * MAX_WARP * pinFactor;
      const angle = Math.atan2(dy, dx);
      return {
        pt: {
          x: gx - Math.cos(angle) * warpAmt + rx,
          y: gy - Math.sin(angle) * warpAmt + ry
        },
        proximity
      };
    }

    return { pt: { x: gx + rx, y: gy + ry }, proximity };
  }, []);

  const draw = useCallback((now) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { w: W, h: H } = sizeRef.current;
    const mouse = mouseRef.current;
    const ripples = ripplesRef.current;

    ctx.clearRect(0, 0, W, H);

    ctx.fillStyle = THEME.bg;
    ctx.fillRect(0, 0, W, H);

    ctx.fillStyle = 'rgba(255,255,255,0.05)';
    for (let x = DOT_SPACING / 2; x < W; x += DOT_SPACING) {
      for (let y = DOT_SPACING / 2; y < H; y += DOT_SPACING) {
        ctx.beginPath();
        ctx.arc(x, y, 0.7, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    for (let i = ripples.length - 1; i >= 0; i--) {
      const r = ripples[i];
      const age = (now - r.born) / 1000;
      r.radius = Math.max(0, age * 400);
      r.opacity = Math.max(0, 1 - age * 1.2);
      if (r.opacity <= 0) ripples.splice(i, 1);
    }

    const cols = Math.max(2, Math.ceil(W / CELL_SIZE)) + 1;
    const rows = Math.max(2, Math.ceil(H / CELL_SIZE)) + 1;
    const cellW = W / (cols - 1);
    const cellH = H / (rows - 1);

    const pts = [];
    const prox = [];

    for (let row = 0; row < rows; row++) {
      pts[row] = [];
      prox[row] = [];
      for (let col = 0; col < cols; col++) {
        const { pt, proximity } = getWarpedPoint(col * cellW, row * cellH, col, row, mouse, ripples, cols, rows);
        pts[row][col] = pt;
        prox[row][col] = proximity;
      }
    }

    const drawSeg = (p1, p2, pr1, pr2) => {
      const avg = (pr1 + pr2) / 2;
      const t = avg * avg * (3 - 2 * avg);
      ctx.beginPath();
      ctx.moveTo(p1.x, p1.y);
      ctx.lineTo(p2.x, p2.y);
      ctx.strokeStyle = lerpColor(LINE_BASE, THEME.lineActive, t);
      ctx.lineWidth = lerpN(0.8, 1.5, t);
      ctx.stroke();
    };

    ctx.lineCap = 'butt';

    for (let row = 0; row < rows; row++)
      for (let col = 0; col < cols - 1; col++)
        drawSeg(pts[row][col], pts[row][col + 1], prox[row][col], prox[row][col + 1]);

    for (let col = 0; col < cols; col++)
      for (let row = 0; row < rows - 1; row++)
        drawSeg(pts[row][col], pts[row + 1][col], prox[row][col], prox[row + 1][col]);

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const p = pts[row][col];
        const pr = prox[row][col];
        const t = pr * pr * (3 - 2 * pr);
        const r = lerpN(NODE_BASE_RADIUS, NODE_ACTIVE_RADIUS, t);

        if (t > 0.3) {
          const glowR = r + lerpN(0, 6, (t - 0.3) / 0.7);
          const grd = ctx.createRadialGradient(p.x, p.y, r * 0.5, p.x, p.y, glowR);
          grd.addColorStop(0, `rgba(${THEME.glow},${(t * 0.3).toFixed(3)})`);
          grd.addColorStop(1, `rgba(${THEME.glow},0)`);
          ctx.beginPath();
          ctx.arc(p.x, p.y, glowR, 0, Math.PI * 2);
          ctx.fillStyle = grd;
          ctx.fill();
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
        ctx.fillStyle = lerpColor({ r: 255, g: 255, b: 255, a: 0.2 }, THEME.nodeActive, t);
        ctx.fill();
      }
    }

    for (const r of ripples) {
      const safeRadius = Math.max(0, r.radius);
      ctx.beginPath();
      ctx.arc(r.x, r.y, safeRadius, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(${THEME.ripple},${(r.opacity * 0.28).toFixed(3)})`;
      ctx.lineWidth = 1.5;
      ctx.stroke();
    }
  }, [getWarpedPoint]);

  const animate = useCallback((now) => {
    const m = mouseRef.current;
    const t = targetMouseRef.current;

    m.x = lerpN(m.x, t.x, LERP_SPEED);
    m.y = lerpN(m.y, t.y, LERP_SPEED);

    draw(now);
    rafRef.current = requestAnimationFrame(animate);
  }, [draw]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const setSize = () => {
      const rect = canvas.getBoundingClientRect();
      const w = rect.width;
      const h = rect.height;
      canvas.width = w;
      canvas.height = h;
      sizeRef.current = { w, h };
    };

    setSize();
    window.addEventListener('resize', setSize);

    const toLocal = (clientX, clientY) => {
      const rect = canvas.getBoundingClientRect();
      return { x: clientX - rect.left, y: clientY - rect.top };
    };

    const onMouseMove = (e) => {
      targetMouseRef.current = toLocal(e.clientX, e.clientY);
    };

    const onClick = (e) => {
      const { x, y } = toLocal(e.clientX, e.clientY);
      ripplesRef.current.push({ x, y, radius: 0, opacity: 1, born: performance.now() });
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('click', onClick);
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', setSize);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('click', onClick);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [animate]);

  return (
    <div className="hero-video-bg">
      <canvas ref={canvasRef} className="hero-kinetic-canvas" />

      {/* Gradient Vignette Overlay — keeps hero content readable */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse at center, rgba(6, 9, 21, 0.35) 0%, rgba(6, 9, 21, 0.65) 70%, rgba(6, 9, 21, 0.92) 100%)'
        }}
      />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to bottom, rgba(6, 9, 21, 0.15) 0%, rgba(6, 9, 21, 0.15) 45%, rgba(6, 9, 21, 0.88) 85%, #060815 100%)'
        }}
      />
    </div>
  );
}
