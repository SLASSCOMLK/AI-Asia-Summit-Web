import React, { useEffect, useRef, useState } from 'react';

export default function CircularGallery({ items, radius = 320, autoRotateSpeed = 0.05 }) {
  const [rotation, setRotation] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const containerRef = useRef(null);
  const scrollTimeoutRef = useRef(null);
  const rafRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const el = containerRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const total = rect.height + vh;
      const passed = vh - rect.top;
      const progress = Math.min(1, Math.max(0, passed / total));

      setRotation(progress * 360);
      setIsScrolling(true);

      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
      scrollTimeoutRef.current = setTimeout(() => setIsScrolling(false), 150);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    };
  }, []);

  useEffect(() => {
    const tick = () => {
      if (!isScrolling) {
        setRotation((prev) => prev + autoRotateSpeed);
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [isScrolling, autoRotateSpeed]);

  const anglePerItem = 360 / items.length;

  return (
    <div
      ref={containerRef}
      className="circular-gallery"
      role="region"
      aria-label="Event archive gallery"
    >
      <div
        className="circular-gallery-stage"
        style={{ transform: `rotateY(${rotation}deg)` }}
      >
        {items.map((item, i) => {
          const itemAngle = i * anglePerItem;
          const relativeAngle = (((itemAngle + rotation) % 360) + 360) % 360;
          const normalizedAngle = relativeAngle > 180 ? 360 - relativeAngle : relativeAngle;
          const opacity = Math.max(0.35, 1 - normalizedAngle / 180);

          return (
            <div
              key={item.src}
              className="circular-gallery-item"
              style={{
                transform: `rotateY(${itemAngle}deg) translateZ(${radius}px)`,
                opacity
              }}
            >
              <div className="circular-gallery-card">
                <img src={item.src} alt={item.alt || ''} className="circular-gallery-img" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
