import React, { useEffect, useState } from 'react';

export default function CustomCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [trailerPos, setTrailerPos] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only activate custom cursor on non-touch desktop devices
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const handleMouseMove = (e) => {
      setPos({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseOver = (e) => {
      const target = e.target;
      if (
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.tagName === 'INPUT' ||
        target.closest('button') ||
        target.closest('a') ||
        target.classList.contains('clickable')
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [isVisible]);

  // Smooth trailing dot animation
  useEffect(() => {
    let animationFrame;
    const followMouse = () => {
      setTrailerPos((prev) => ({
        x: prev.x + (pos.x - prev.x) * 0.2,
        y: prev.y + (pos.y - prev.y) * 0.2
      }));
      animationFrame = requestAnimationFrame(followMouse);
    };
    animationFrame = requestAnimationFrame(followMouse);
    return () => cancelAnimationFrame(animationFrame);
  }, [pos]);

  if (!isVisible) return null;

  return (
    <>
      {/* Outer Glowing Tech Ring */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: isHovered ? 48 : 32,
          height: isHovered ? 48 : 32,
          borderRadius: '50%',
          border: isHovered ? '2px solid #E8B84B' : '2px solid rgba(0, 163, 224, 0.75)',
          backgroundColor: isHovered ? 'rgba(232, 184, 75, 0.15)' : 'rgba(0, 163, 224, 0.08)',
          boxShadow: isHovered ? '0 0 16px rgba(232, 184, 75, 0.6)' : '0 0 12px rgba(0, 163, 224, 0.4)',
          transform: `translate3d(${trailerPos.x - (isHovered ? 24 : 16)}px, ${trailerPos.y - (isHovered ? 24 : 16)}px, 0)`,
          pointerEvents: 'none',
          zIndex: 9999,
          transition: 'width 0.2s ease, height 0.2s ease, border-color 0.2s ease, background-color 0.2s ease',
          willChange: 'transform'
        }}
      />
      {/* Precision Core Dot */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: 8,
          height: 8,
          borderRadius: '50%',
          backgroundColor: isHovered ? '#E8B84B' : '#00A3E0',
          boxShadow: '0 0 8px #FFFFFF',
          transform: `translate3d(${pos.x - 4}px, ${pos.y - 4}px, 0)`,
          pointerEvents: 'none',
          zIndex: 10000,
          willChange: 'transform'
        }}
      />
    </>
  );
}
