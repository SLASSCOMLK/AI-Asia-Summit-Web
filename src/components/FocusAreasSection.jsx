import React from 'react';
import { Cpu, ShieldCheck, Zap, UserCheck, TrendingUp, Layers } from 'lucide-react';

export default function FocusAreasSection() {
  const pillars = [
    {
      id: '01',
      title: 'AI in Engineering',
      desc: 'Deploying advanced machine intelligence across software engineering, automated systems, and enterprise infrastructure.',
      icon: Cpu,
      color: '#2E63FF'
    },
    {
      id: '02',
      title: 'Governance & Security of AI',
      desc: 'Establishing ethical AI frameworks, data privacy compliance, risk management, and cybersecurity protocols.',
      icon: ShieldCheck,
      color: '#00A3E0'
    },
    {
      id: '03',
      title: 'Emerging AI Technologies',
      desc: 'Exploring breakthrough developments in Generative AI, Large Language Models, agentic automation, and robotics.',
      icon: Zap,
      color: '#E8B84B'
    },
    {
      id: '04',
      title: 'Human-Centric AI',
      desc: 'Designing intuitive, accessible, and transparent artificial intelligence that augments human capability.',
      icon: UserCheck,
      color: '#10B981'
    },
    {
      id: '05',
      title: 'AI for Economic & Societal Impact',
      desc: 'Accelerating cross-industry digital transformation to enhance regional competitiveness and national prosperity.',
      icon: TrendingUp,
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
        <h2 className="focus-main-title">
          AI as a Multiplier
        </h2>
        <p className="focus-subtitle">
          Making AI a standard part of how organizations innovate, operate, and create enterprise value.
        </p>
      </div>

      <div className="focus-grid">
        {pillars.map((item) => {
          const IconComp = item.icon;
          return (
            <div key={item.id} className="focus-card">
              <div className="focus-card-header">
                <span className="focus-num" style={{ color: item.color }}>{item.id}</span>
                <div className="focus-icon-box" style={{ background: `${item.color}15`, border: `1px solid ${item.color}40`, color: item.color }}>
                  <IconComp size={22} />
                </div>
              </div>
              <h3 className="focus-card-title">{item.title}</h3>
              <p className="focus-card-desc">{item.desc}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
