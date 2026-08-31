import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Camera } from 'lucide-react';

const highlights = [
  {
    title: 'Fireside Panel: Industry Leaders on Stage',
    src: '/about-1.jpg'
  },
  {
    title: 'Expert Roundtable Discussion',
    src: '/about-2.jpg'
  },
  {
    title: 'AI & Robotics Showcase Floor',
    src: '/about-3.jpg'
  },
  {
    title: 'Panel: The Future of Enterprise AI',
    src: '/about-4.jpg'
  }
];

function StickyHighlightCard({ i, title, src, progress, range, targetScale }) {
  const scale = useTransform(progress, range, [1, targetScale]);

  return (
    <div className="highlight-sticky-wrap">
      <motion.div
        style={{
          scale,
          top: `calc(-5vh + ${i * 14}px)`
        }}
        className="highlight-card"
      >
        <img src={src} alt={title} className="highlight-card-img" />
        <div className="highlight-card-caption">
          <span>{title}</span>
        </div>
      </motion.div>
    </div>
  );
}

export default function EventHighlightsSection() {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start start', 'end end']
  });

  return (
    <section className="highlights-section container" id="highlights">
      <div className="focus-header">
        <div className="focus-badge">
          <Camera size={14} style={{ color: '#E8B84B' }} />
          <span>EVENT ARCHIVE</span>
        </div>
        <h2 className="focus-main-title">
          Relive AI Asia Summit 2025
        </h2>
        <p className="focus-subtitle">
          A look back at the panels, showcases, and conversations that shaped last year's summit —
          setting the stage for an even bigger 2026.
        </p>
      </div>

      <div ref={container} className="highlights-scroll-container">
        {highlights.map((item, i) => {
          const targetScale = Math.max(0.72, 1 - (highlights.length - i - 1) * 0.08);
          return (
            <StickyHighlightCard
              key={item.title}
              i={i}
              title={item.title}
              src={item.src}
              progress={scrollYProgress}
              range={[i * 0.25, 1]}
              targetScale={targetScale}
            />
          );
        })}
      </div>
    </section>
  );
}
