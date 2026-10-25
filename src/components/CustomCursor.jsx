import React, { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const ringRef = useRef(null);
  const dotRef = useRef(null);
  const isVisible = useRef(false);
  const isHovered = useRef(false);
  const pos = useRef({ x: -100, y: -100 });
  const trailerPos = useRef({ x: -100, y: -100 });
  const rafId = useRef(0);

  useEffect(() => {
    // Only activate custom cursor on non-touch desktop devices
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const ring = ringRef.current;
    const dot = dotRef.current;
    if (!ring || !dot) return;

    const followMouse = () => {
      trailerPos.current.x += (pos.current.x - trailerPos.current.x) * 0.2;
      trailerPos.current.y += (pos.current.y - trailerPos.current.y) * 0.2;

      const hovered = isHovered.current;
      const offset = hovered ? 24 : 16;
      ring.style.transform = `translate3d(${trailerPos.current.x - offset}px, ${trailerPos.current.y - offset}px, 0)`;
      dot.style.transform = `translate3d(${pos.current.x - 4}px, ${pos.current.y - 4}px, 0)`;

      rafId.current = requestAnimationFrame(followMouse);
    };

    const handleMouseMove = (e) => {
      pos.current = { x: e.clientX, y: e.clientY };
      if (!isVisible.current) {
        isVisible.current = true;
        ring.style.opacity = '1';
        dot.style.opacity = '1';
      }
    };

    const handleMouseOver = (e) => {
      const target = e.target;
      const hovered =
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.tagName === 'INPUT' ||
        target.closest('button') ||
        target.closest('a') ||
        target.classList.contains('clickable');

      if (hovered !== isHovered.current) {
        isHovered.current = hovered;
        ring.style.width = ring.style.height = hovered ? '48px' : '32px';
        ring.style.borderColor = hovered ? '#E8B84B' : 'rgba(232, 184, 75, 0.75)';
        ring.style.backgroundColor = hovered ? 'rgba(232, 184, 75, 0.15)' : 'rgba(232, 184, 75, 0.08)';
        ring.style.boxShadow = hovered ? '0 0 16px rgba(232, 184, 75, 0.6)' : '0 0 12px rgba(232, 184, 75, 0.4)';
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);
    rafId.current = requestAnimationFrame(followMouse);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      cancelAnimationFrame(rafId.current);
    };
  }, []);

  // Don't render on touch devices
  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
    return null;
  }

  return (
    <>
      {/* Outer Glowing Tech Ring */}
      <div
        ref={ringRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: 32,
          height: 32,
          borderRadius: '50%',
          border: '2px solid rgba(232, 184, 75, 0.75)',
          backgroundColor: 'rgba(232, 184, 75, 0.08)',
          boxShadow: '0 0 12px rgba(232, 184, 75, 0.4)',
          pointerEvents: 'none',
          zIndex: 9999,
          opacity: 0,
          transition: 'width 0.2s ease, height 0.2s ease, border-color 0.2s ease, background-color 0.2s ease, opacity 0.3s ease',
          willChange: 'transform'
        }}
      />
      {/* Precision Core Dot */}
      <div
        ref={dotRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: 8,
          height: 8,
          borderRadius: '50%',
          backgroundColor: '#E8B84B',
          boxShadow: '0 0 8px #FFFFFF',
          pointerEvents: 'none',
          zIndex: 10000,
          opacity: 0,
          transition: 'opacity 0.3s ease',
          willChange: 'transform'
        }}
      />
    </>
  );
}
