import React from 'react';
import { motion } from 'framer-motion';
import { Layers, Pin } from 'lucide-react';
import ScrollFloat from './ScrollFloat';

const TIMELINE_HEIGHT = 1700;

const POSITIONS = [
  { top: 0, side: 'left', inset: '12%', rotate: -4 },
  { top: 190, side: 'right', inset: '12%', rotate: 4 },
  { top: 640, side: 'left', inset: '12%', rotate: -4 },
  { top: 830, side: 'right', inset: '8%', rotate: 4 },
  { top: 1280, side: 'left', inset: '12%', rotate: -4 }
];

const PATH_D =
  'M 280 150 C 480 150, 560 340, 720 340' +
  ' C 880 340, 480 500, 280 790' +
  ' C 280 940, 560 980, 760 980' +
  ' C 980 980, 480 1250, 280 1430';

export default function FocusAreasSection() {
  const pillars = [
    {
      id: '01',
      title: 'AI in Engineering',
      desc: 'Deploying advanced machine intelligence across software engineering, automated systems, and enterprise infrastructure.',
      color: '#2E63FF'
    },
    {
      id: '02',
      title: 'Governance & Security of AI',
      desc: 'Establishing ethical AI frameworks, data privacy compliance, risk management, and cybersecurity protocols.',
      color: '#00A3E0'
    },
    {
      id: '03',
      title: 'Emerging AI Technologies',
      desc: 'Exploring breakthrough developments in Generative AI, Large Language Models, agentic automation, and robotics.',
      color: '#E8B84B'
    },
    {
      id: '04',
      title: 'Human-Centric AI',
      desc: 'Designing intuitive, accessible, and transparent artificial intelligence that augments human capability.',
      color: '#10B981'
    },
    {
      id: '05',
      title: 'AI for Economic & Societal Impact',
      desc: 'Accelerating cross-industry digital transformation to enhance regional competitiveness and national prosperity.',
      color: '#EC4899'
    }
  ];

  return (
    <section className="focus-areas-section container" id="focus-areas">
      <div className="focus-header">
        <div className="focus-badge">
          <Layers size={14} style={{ color: '#E8B84B' }} />
          <span>2026 THEMATIC FOCUS AREAS</span>
        </div>
        <ScrollFloat containerClassName="focus-main-title">
          AI as a Multiplier
        </ScrollFloat>
        <p className="focus-subtitle">
          Making AI a standard part of how organizations innovate, operate, and create enterprise value.
        </p>
      </div>

      <div className="focus-timeline" style={{ '--timeline-height': `${TIMELINE_HEIGHT}px` }}>
        <svg
          className="focus-path-svg"
          viewBox={`0 0 1000 ${TIMELINE_HEIGHT}`}
          preserveAspectRatio="none"
        >
          <motion.path
            d={PATH_D}
            stroke="currentColor"
            className="focus-path-line"
            strokeWidth="2"
            strokeDasharray="8 6"
            fill="none"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
            initial={{ strokeDashoffset: 0 }}
            animate={{ strokeDashoffset: -140 }}
            transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
          />
        </svg>

        {pillars.map((item, index) => {
          const position = POSITIONS[index];
          const cardStyle = {
            '--r': `${position.rotate}deg`,
            '--top': `${position.top}px`,
            [position.side === 'left' ? '--left' : '--right']: position.inset
          };

          return (
            <div key={item.id} className="pin-card" style={cardStyle}>
              <div className="pin-card-shell">
                <span
                  className="pin-card-tack"
                  style={{ background: item.color, boxShadow: `0 4px 14px ${item.color}66` }}
                >
                  <Pin size={16} />
                </span>
                <div
                  className="pin-card-inner"
                  style={{ background: `${item.color}14`, borderColor: `${item.color}45` }}
                >
                  <span className="pin-card-num" style={{ color: item.color }}>
                    {item.id}
                  </span>
                  <h3 className="pin-card-title">{item.title}</h3>
                  <p className="pin-card-desc">{item.desc}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
