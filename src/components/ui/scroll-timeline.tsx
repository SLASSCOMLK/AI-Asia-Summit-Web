"use client";

import React, { useEffect, useRef, useState } from "react";

export interface Milestone {
  id: string;
  title: string;
  description: string;
  date: string;
  track?: string;
  category?: 'keynote' | 'break' | 'track' | 'panel' | 'masterclass' | 'general';
}

export interface TimelineProps {
  milestones: Milestone[];
}

export default function Component({ milestones }: TimelineProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Calculate progress based on the middle of the screen
      const triggerPoint = windowHeight / 2;
      const totalHeight = rect.height;
      const scrolledPast = triggerPoint - rect.top;
      
      let progress = scrolledPast / totalHeight;
      progress = Math.max(0, Math.min(1, progress));
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial calculation

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div 
      ref={containerRef}
      style={{
        width: '100%',
        maxWidth: '960px',
        margin: '0 auto',
        padding: '2rem 1.5rem',
        boxSizing: 'border-box',
        position: 'relative'
      }}
    >
      <div style={{ position: 'relative' }}>
        {/* Background line (faded) */}
        <div 
          className="timeline-bg-line"
          style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            width: '2px',
            background: 'rgba(255, 255, 255, 0.1)',
            transform: 'translateX(-50%)',
            zIndex: 0
          }} 
        />
        
        {/* Animated foreground line (draws on scroll with gold glow) */}
        <div 
          className="timeline-progress-line"
          style={{
            position: 'absolute',
            top: 0,
            width: '2px',
            background: 'linear-gradient(180deg, #E8B84B 0%, #F5C842 100%)',
            transform: 'translateX(-50%)',
            height: `${Math.max(scrollProgress * 100, 2)}%`,
            boxShadow: '0 0 14px rgba(232, 184, 75, 0.8)',
            transition: 'height 120ms ease-out',
            zIndex: 1
          }}
        />

        <div style={{ display: 'flex', flexDirection: 'column', gap: '3.5rem', position: 'relative', zIndex: 10 }}>
          {milestones.map((milestone, index) => {
            const itemThreshold = index / (milestones.length - 1 || 1);
            const isActive = scrollProgress >= itemThreshold - 0.05; 
            const isEven = index % 2 === 0;

            const isBreak = milestone.category === 'break';
            const isKeynote = milestone.category === 'keynote';

            return (
              <div 
                key={milestone.id} 
                className={`timeline-item ${isEven ? 'is-even' : 'is-odd'}`}
                style={{
                  position: 'relative',
                  display: 'flex',
                  alignItems: 'flex-start',
                  width: '100%',
                }}
              >
                {/* The Animated Indicator Dot */}
                <div 
                  className="timeline-dot"
                  style={{
                    position: 'absolute',
                    top: '8px',
                    width: '18px',
                    height: '18px',
                    borderRadius: '50%',
                    transform: 'translateX(-50%)',
                    zIndex: 20,
                    transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                    background: isActive ? '#E8B84B' : '#1E1B16',
                    border: isActive ? '3px solid #0C0A08' : '2px solid rgba(232, 184, 75, 0.3)',
                    boxShadow: isActive ? '0 0 18px rgba(232, 184, 75, 0.9), inset 0 0 6px #FFFFFF' : 'none',
                    scale: isActive ? '1.2' : '1'
                  }} 
                />

                {/* Empty Half on Desktop to balance alternating cards */}
                <div className="timeline-empty-half" style={{ width: '50%' }} />

                {/* Content Card Container */}
                <div 
                  className="timeline-card-col"
                  style={{
                    width: '50%',
                    boxSizing: 'border-box',
                    transition: 'opacity 0.6s ease, transform 0.6s ease',
                    opacity: isActive ? 1 : 0.45,
                    transform: isActive ? 'translateY(0)' : 'translateY(16px)'
                  }}
                >
                  <div
                    style={{
                      background: isBreak 
                        ? 'linear-gradient(135deg, rgba(245, 197, 24, 0.08) 0%, rgba(20, 18, 14, 0.85) 100%)' 
                        : isKeynote 
                          ? 'linear-gradient(135deg, rgba(232, 184, 75, 0.12) 0%, rgba(22, 18, 14, 0.9) 100%)'
                          : 'rgba(20, 18, 14, 0.8)',
                      backdropFilter: 'blur(16px)',
                      WebkitBackdropFilter: 'blur(16px)',
                      border: isActive 
                        ? (isBreak ? '1px solid rgba(245, 197, 24, 0.5)' : '1px solid rgba(232, 184, 75, 0.5)')
                        : '1px solid rgba(255, 255, 255, 0.08)',
                      borderRadius: '18px',
                      padding: '1.35rem 1.6rem',
                      boxShadow: isActive 
                        ? '0 12px 32px rgba(0,0,0,0.55), 0 0 20px rgba(232, 184, 75, 0.15)' 
                        : '0 4px 20px rgba(0,0,0,0.3)',
                      transition: 'border-color 0.3s ease, box-shadow 0.3s ease'
                    }}
                  >
                    {/* Time & Track Badge */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', marginBottom: '0.85rem' }}>
                      <span
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          padding: '3px 10px',
                          borderRadius: '9999px',
                          fontSize: '0.72rem',
                          fontFamily: 'monospace',
                          fontWeight: 700,
                          letterSpacing: '0.08em',
                          background: isBreak ? 'rgba(245, 197, 24, 0.15)' : 'rgba(232, 184, 75, 0.12)',
                          color: isBreak ? '#F5C518' : '#E8B84B',
                          border: isBreak ? '1px solid rgba(245, 197, 24, 0.35)' : '1px solid rgba(232, 184, 75, 0.3)'
                        }}
                      >
                        {milestone.date}
                      </span>

                      {milestone.track && (
                        <span
                          style={{
                            fontSize: '0.68rem',
                            fontWeight: 600,
                            letterSpacing: '0.12em',
                            textTransform: 'uppercase',
                            color: '#94A3B8',
                            background: 'rgba(255, 255, 255, 0.05)',
                            padding: '3px 8px',
                            borderRadius: '6px',
                            border: '1px solid rgba(255, 255, 255, 0.08)'
                          }}
                        >
                          {milestone.track}
                        </span>
                      )}
                    </div>

                    {/* Title */}
                    <h3
                      style={{
                        fontSize: 'clamp(1.1rem, 2vw, 1.35rem)',
                        fontWeight: 800,
                        color: isBreak ? '#FDE68A' : '#FFFFFF',
                        letterSpacing: '-0.01em',
                        lineHeight: 1.35,
                        margin: '0 0 0.65rem 0'
                      }}
                    >
                      {milestone.title}
                    </h3>

                    {/* Description */}
                    <p
                      style={{
                        fontSize: '0.88rem',
                        lineHeight: 1.6,
                        color: '#CBD5E1',
                        margin: 0
                      }}
                    >
                      {milestone.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Embedded CSS for flawless responsive positioning */}
      <style>{`
        /* Desktop styles (>= 768px): center line, alternating cards */
        @media (min-width: 768px) {
          .timeline-bg-line,
          .timeline-progress-line,
          .timeline-dot {
            left: 50% !important;
          }
          .timeline-item.is-even {
            flex-direction: row-reverse !important;
          }
          .timeline-item.is-odd {
            flex-direction: row !important;
          }
          .timeline-item.is-even .timeline-card-col {
            padding-right: 2.25rem !important;
            padding-left: 0 !important;
          }
          .timeline-item.is-odd .timeline-card-col {
            padding-left: 2.25rem !important;
            padding-right: 0 !important;
          }
          .timeline-empty-half {
            display: block !important;
          }
        }

        /* Mobile styles (< 768px): left line, all cards on right */
        @media (max-width: 767px) {
          .timeline-bg-line,
          .timeline-progress-line,
          .timeline-dot {
            left: 18px !important;
          }
          .timeline-empty-half {
            display: none !important;
          }
          .timeline-card-col {
            width: 100% !important;
            padding-left: 2.5rem !important;
            padding-right: 0 !important;
          }
        }
      `}</style>
    </div>
  );
}
