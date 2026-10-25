"use client";

import React, { useEffect, useRef, useState } from "react";
import { Mic, Zap, Scale, BookOpen, Users, Sparkles } from "lucide-react";

export interface BreakoutSubSession {
  track: string;
  title: string;
  color: string;
}

export interface Milestone {
  id: string;
  number?: string;
  title: string;
  track?: string;
  category?: 'keynote' | 'break' | 'track' | 'panel' | 'masterclass' | 'breakout' | 'general';
  isBreakout?: boolean;
  sessions?: BreakoutSubSession[];
}

export interface TimelineProps {
  milestones: Milestone[];
}

const CATEGORY_META = {
  keynote: {
    label: "Keynote",
    icon: Mic,
    color: "#E8B84B",
    bg: "rgba(232, 184, 75, 0.12)",
    border: "rgba(232, 184, 75, 0.35)",
  },
  track: {
    label: "Session",
    icon: Zap,
    color: "#60A5FA",
    bg: "rgba(59, 130, 246, 0.12)",
    border: "rgba(59, 130, 246, 0.35)",
  },
  panel: {
    label: "Panel Discussion",
    icon: Scale,
    color: "#C084FC",
    bg: "rgba(168, 85, 247, 0.12)",
    border: "rgba(168, 85, 247, 0.35)",
  },
  masterclass: {
    label: "Executive Masterclass",
    icon: BookOpen,
    color: "#34D399",
    bg: "rgba(16, 185, 129, 0.12)",
    border: "rgba(16, 185, 129, 0.35)",
  },
  breakout: {
    label: "Breakout Sessions",
    icon: Users,
    color: "#E8B84B",
    bg: "rgba(232, 184, 75, 0.15)",
    border: "rgba(232, 184, 75, 0.4)",
  },
  general: {
    label: "Summit Session",
    icon: Sparkles,
    color: "#E8B84B",
    bg: "rgba(232, 184, 75, 0.1)",
    border: "rgba(232, 184, 75, 0.3)",
  },
  break: {
    label: "Break",
    icon: Sparkles,
    color: "#94A3B8",
    bg: "rgba(255, 255, 255, 0.05)",
    border: "rgba(255, 255, 255, 0.1)",
  },
};

export default function ScrollTimeline({ milestones }: TimelineProps) {
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
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div 
      ref={containerRef}
      style={{
        width: '100%',
        maxWidth: '1080px',
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
            boxShadow: '0 0 16px rgba(232, 184, 75, 0.85)',
            transition: 'height 120ms ease-out',
            zIndex: 1
          }}
        />

        <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem', position: 'relative', zIndex: 10 }}>
          {milestones.map((milestone, index) => {
            const itemThreshold = index / (milestones.length - 1 || 1);
            const isActive = scrollProgress >= itemThreshold - 0.05; 
            const isEven = index % 2 === 0;

            const meta = CATEGORY_META[milestone.category || 'general'] || CATEGORY_META.general;
            const CategoryIcon = meta.icon;

            // Render Breakout Session spanning across the timeline
            if (milestone.isBreakout && milestone.sessions) {
              return (
                <div
                  key={milestone.id}
                  className="timeline-breakout-wrapper"
                  style={{
                    position: 'relative',
                    width: '100%',
                    paddingTop: '0.5rem',
                    paddingBottom: '0.5rem',
                  }}
                >
                  {/* Central Indicator Dot */}
                  <div 
                    className="timeline-dot"
                    style={{
                      position: 'absolute',
                      top: '16px',
                      width: '20px',
                      height: '20px',
                      borderRadius: '50%',
                      transform: 'translateX(-50%)',
                      zIndex: 20,
                      transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                      background: isActive ? '#E8B84B' : '#1E1B16',
                      border: isActive ? '3px solid #0C0A08' : '2px solid rgba(232, 184, 75, 0.3)',
                      boxShadow: isActive ? '0 0 20px rgba(232, 184, 75, 0.95), inset 0 0 6px #FFFFFF' : 'none',
                      scale: isActive ? '1.25' : '1'
                    }} 
                  />

                  {/* Full-width container */}
                  <div
                    style={{
                      width: '100%',
                      boxSizing: 'border-box',
                      transition: 'opacity 0.6s ease, transform 0.6s ease',
                      opacity: isActive ? 1 : 0.5,
                      transform: isActive ? 'translateY(0)' : 'translateY(16px)',
                      padding: '0 0.5rem',
                    }}
                  >
                    <div
                      style={{
                        background: 'linear-gradient(135deg, rgba(232, 184, 75, 0.08) 0%, rgba(20, 18, 14, 0.92) 100%)',
                        backdropFilter: 'blur(20px)',
                        WebkitBackdropFilter: 'blur(20px)',
                        border: isActive
                          ? '1px solid rgba(232, 184, 75, 0.5)'
                          : '1px solid rgba(255, 255, 255, 0.1)',
                        borderRadius: '20px',
                        padding: '1.5rem',
                        boxShadow: isActive
                          ? '0 16px 40px rgba(0,0,0,0.6), 0 0 25px rgba(232, 184, 75, 0.15)'
                          : '0 4px 20px rgba(0,0,0,0.3)',
                      }}
                    >
                      {/* Breakout Header */}
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        flexWrap: 'wrap',
                        gap: '0.75rem',
                        marginBottom: '1.25rem',
                        paddingBottom: '0.85rem',
                        borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                      }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <span
                            style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              padding: '3px 10px',
                              borderRadius: '9999px',
                              fontSize: '0.72rem',
                              fontFamily: 'monospace',
                              fontWeight: 700,
                              background: 'rgba(232, 184, 75, 0.15)',
                              color: '#E8B84B',
                              border: '1px solid rgba(232, 184, 75, 0.35)',
                            }}
                          >
                            SESSION {milestone.number || '06'}
                          </span>
                          <h3
                            style={{
                              fontSize: '1.15rem',
                              fontWeight: 800,
                              color: '#FFFFFF',
                              margin: 0,
                              fontFamily: "var(--font-heading, 'Outfit', sans-serif)",
                            }}
                          >
                            Breakout Sessions
                          </h3>
                        </div>

                        <span
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '6px',
                            fontSize: '0.68rem',
                            fontWeight: 700,
                            letterSpacing: '0.08em',
                            textTransform: 'uppercase',
                            color: '#E8B84B',
                            background: 'rgba(232, 184, 75, 0.12)',
                            padding: '4px 12px',
                            borderRadius: '9999px',
                            border: '1px solid rgba(232, 184, 75, 0.3)',
                          }}
                        >
                          <Users size={12} />
                          Happening Simultaneously
                        </span>
                      </div>

                      {/* 3 Concurrent Tracks Grid */}
                      <div
                        style={{
                          display: 'grid',
                          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                          gap: '1rem',
                        }}
                      >
                        {milestone.sessions.map((sess, sIdx) => (
                          <div
                            key={sIdx}
                            style={{
                              background: `linear-gradient(135deg, ${sess.color}15 0%, rgba(12, 10, 8, 0.8) 100%)`,
                              border: `1px solid ${sess.color}40`,
                              borderRadius: '14px',
                              padding: '1.15rem',
                              position: 'relative',
                              overflow: 'hidden',
                              display: 'flex',
                              flexDirection: 'column',
                              justifyContent: 'center',
                            }}
                          >
                            <div
                              style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                width: '4px',
                                bottom: 0,
                                background: sess.color,
                              }}
                            />
                            <div style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '6px',
                              marginBottom: '0.5rem',
                            }}>
                              <span
                                style={{
                                  width: '8px',
                                  height: '8px',
                                  borderRadius: '50%',
                                  background: sess.color,
                                  boxShadow: `0 0 8px ${sess.color}`,
                                }}
                              />
                              <span
                                style={{
                                  fontSize: '0.72rem',
                                  fontWeight: 700,
                                  letterSpacing: '0.08em',
                                  textTransform: 'uppercase',
                                  color: sess.color,
                                  fontFamily: "var(--font-nav, 'Space Grotesk', sans-serif)",
                                }}
                              >
                                {sess.track}
                              </span>
                            </div>
                            <h4
                              style={{
                                fontSize: '0.98rem',
                                fontWeight: 700,
                                color: '#FFFFFF',
                                margin: 0,
                                lineHeight: 1.4,
                                fontFamily: "var(--font-heading, 'Outfit', sans-serif)",
                              }}
                            >
                              {sess.title}
                            </h4>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            }

            // Standard alternating milestone card
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
                      background: 'linear-gradient(135deg, rgba(232, 184, 75, 0.08) 0%, rgba(20, 18, 14, 0.88) 100%)',
                      backdropFilter: 'blur(16px)',
                      WebkitBackdropFilter: 'blur(16px)',
                      border: isActive 
                        ? '1px solid rgba(232, 184, 75, 0.5)'
                        : '1px solid rgba(255, 255, 255, 0.08)',
                      borderRadius: '18px',
                      padding: '1.25rem 1.5rem',
                      boxShadow: isActive 
                        ? '0 12px 32px rgba(0,0,0,0.55), 0 0 20px rgba(232, 184, 75, 0.15)' 
                        : '0 4px 20px rgba(0,0,0,0.3)',
                      transition: 'border-color 0.3s ease, box-shadow 0.3s ease'
                    }}
                  >
                    {/* Badge row: Number + Category */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', marginBottom: '0.75rem' }}>
                      {milestone.number && (
                        <span
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            padding: '3px 9px',
                            borderRadius: '9999px',
                            fontSize: '0.7rem',
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '0.08em',
                            background: meta.bg,
                            color: meta.color,
                            border: `1px solid ${meta.border}`
                          }}
                        >
                          SESSION {milestone.number}
                        </span>
                      )}

                      <span
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '5px',
                          fontSize: '0.68rem',
                          fontWeight: 700,
                          letterSpacing: '0.1em',
                          textTransform: 'uppercase',
                          color: meta.color,
                          background: meta.bg,
                          padding: '3px 9px',
                          borderRadius: '9999px',
                          border: `1px solid ${meta.border}`
                        }}
                      >
                        <CategoryIcon size={11} />
                        {meta.label}
                      </span>

                      {milestone.track && (
                        <span
                          style={{
                            fontSize: '0.65rem',
                            fontWeight: 600,
                            letterSpacing: '0.08em',
                            textTransform: 'uppercase',
                            color: '#94A3B8',
                            background: 'rgba(255, 255, 255, 0.04)',
                            padding: '3px 8px',
                            borderRadius: '6px',
                            border: '1px solid rgba(255, 255, 255, 0.08)',
                            marginLeft: 'auto'
                          }}
                        >
                          {milestone.track}
                        </span>
                      )}
                    </div>

                    {/* Topic Title (No description, no timing) */}
                    <h3
                      style={{
                        fontSize: 'clamp(1.05rem, 1.8vw, 1.25rem)',
                        fontWeight: 700,
                        color: '#FFFFFF',
                        letterSpacing: '-0.01em',
                        lineHeight: 1.35,
                        margin: 0,
                        fontFamily: "var(--font-heading, 'Outfit', sans-serif)",
                      }}
                    >
                      {milestone.title}
                    </h3>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Embedded CSS for responsive positioning */}
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
            padding-right: 2.5rem !important;
            padding-left: 0 !important;
          }
          .timeline-item.is-odd .timeline-card-col {
            padding-left: 2.5rem !important;
            padding-right: 0 !important;
          }
          .timeline-empty-half {
            display: block !important;
          }
          .timeline-breakout-wrapper {
            padding-left: 1rem;
            padding-right: 1rem;
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
          .timeline-breakout-wrapper {
            padding-left: 2.5rem !important;
          }
        }
      `}</style>
    </div>
  );
}
