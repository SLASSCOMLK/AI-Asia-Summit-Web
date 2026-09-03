import React, { useEffect, useRef, useState } from 'react';

const UNITS = [
  { key: 'days', label: 'Days' },
  { key: 'hours', label: 'Hours' },
  { key: 'minutes', label: 'Minutes' },
  { key: 'seconds', label: 'Seconds' }
];

export default function EventCountdown({ timeLeft, formatDigit }) {
  const gridRef = useRef(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const [tilts, setTilts] = useState(UNITS.map(() => ({ rx: 0, ry: 0 })));
  const [tracking, setTracking] = useState(UNITS.map(() => false));

  useEffect(() => {
    const node = gridRef.current;
    if (!node) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsRevealed(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const handleMouseMove = (index) => (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    setTracking((prev) => (prev[index] ? prev : prev.map((v, i) => (i === index ? true : v))));
    setTilts((prev) => prev.map((v, i) => (i === index ? { rx: -y / 12, ry: x / 12 } : v)));
  };

  const handleMouseLeave = (index) => () => {
    setTracking((prev) => prev.map((v, i) => (i === index ? false : v)));
    setTilts((prev) => prev.map((v, i) => (i === index ? { rx: 0, ry: 0 } : v)));
  };

  return (
    <div className="glass-countdown-container">
      <div className="glass-countdown-header">
        <span>EVENT COUNTDOWN • UTC+5:30 COLOMBO TIME</span>
      </div>

      <div className="glass-timer-grid" ref={gridRef}>
        {UNITS.map((unit, index) => {
          const { rx, ry } = tilts[index];
          const revealTranslate = isRevealed ? 'translateY(0) scale(1)' : 'translateY(36px) scale(0.9)';
          const revealRotateX = isRevealed ? 0 : -30;
          const revealDelay = isRevealed ? `${index * 0.1}s` : '0s';

          return (
            <div
              key={unit.key}
              className={`glass-timer-card${isRevealed ? ' is-revealed' : ''}`}
              style={{
                '--sheen-delay': `${index * -1.6}s`,
                opacity: isRevealed ? 1 : 0,
                transform: `${revealTranslate} rotateX(${revealRotateX + rx}deg) rotateY(${ry}deg)`,
                transition: tracking[index]
                  ? 'transform 0.2s ease-out'
                  : `transform 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${revealDelay}, opacity 0.7s ease ${revealDelay}`
              }}
              onMouseMove={handleMouseMove(index)}
              onMouseLeave={handleMouseLeave(index)}
            >
              <span className="glass-timer-value">{formatDigit(timeLeft[unit.key])}</span>
              <span className="glass-timer-label">{unit.label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
