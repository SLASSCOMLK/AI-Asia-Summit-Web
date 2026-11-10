"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mic, Zap, Scale, BookOpen, Users, Sparkles, Award, Clock, Coffee, X, ExternalLink, ArrowRight } from "lucide-react";
import { speakers as globalSpeakers } from "../SpeakersSection";

export interface Speaker {
  name: string;
  designation?: string;
  company?: string;
  image?: string | null;
  isModerator?: boolean;
}

export interface BreakoutSubSession {
  track: string;
  title: string;
  color: string;
  speakers?: Speaker[];
}

export interface Milestone {
  id: string;
  number?: string;
  time?: string;
  title: string;
  track?: string;
  category?: 'keynote' | 'break' | 'track' | 'panel' | 'masterclass' | 'breakout' | 'general';
  isBreakout?: boolean;
  sessions?: BreakoutSubSession[];
  speakers?: Speaker[];
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
    label: "Networking & Break",
    icon: Coffee,
    color: "#F59E0B",
    bg: "rgba(245, 158, 11, 0.14)",
    border: "rgba(245, 158, 11, 0.4)",
  },
};

/**
 * Match a timeline speaker to the global rich speakers array
 */
function getFullSpeakerData(speaker: Speaker) {
  const norm = (s: string) => (s || '').toLowerCase().replace(/[^a-z0-9]/g, '');
  const target = norm(speaker.name);
  
  const found = (globalSpeakers || []).find((s: any) => {
    const sNorm = norm(s.name);
    return sNorm === target || sNorm.includes(target) || target.includes(sNorm);
  });

  if (found) {
    return {
      ...found,
      isModerator: speaker.isModerator,
      image: speaker.image || found.image,
      designation: speaker.designation || found.designation,
      company: speaker.company || found.company,
    };
  }

  return {
    id: target,
    name: speaker.name,
    designation: speaker.designation || '',
    company: speaker.company || '',
    image: speaker.image || null,
    isModerator: speaker.isModerator,
    linkedin: null,
    bio: [
      `${speaker.name} is ${speaker.isModerator ? 'the session moderator' : 'a featured speaker'} at AI Asia Summit 2026, leading initiatives as ${speaker.designation || 'Specialist'}${speaker.company ? ' at ' + speaker.company : ''}.`
    ]
  };
}

/**
 * SpeakerBioModal
 * High-end pop-up modal when a speaker card is clicked anywhere in the timeline
 */
function SpeakerBioModal({ speaker, onClose }: { speaker: any; onClose: () => void }) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  const initials = (speaker.name || '')
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((n: string) => n[0])
    .join('');

  return (
    <>
      <motion.div
        className="speaker-modal-backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        style={{ zIndex: 9999 }}
      />
      <motion.div
        className="speaker-modal-panel"
        initial={{ opacity: 0, y: 35, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 30, scale: 0.97 }}
        transition={{ duration: 0.35, ease: [0.21, 0.47, 0.32, 0.98] }}
        role="dialog"
        aria-modal="true"
        aria-label={speaker.name + " biography"}
        style={{ zIndex: 10000 }}
      >
        <button className="speaker-modal-close" onClick={onClose} aria-label="Close">
          <X size={18} />
        </button>
        <div className="speaker-modal-inner">
          <div className="speaker-modal-left">
            <div className="speaker-modal-img-wrap">
              {speaker.image ? (
                <img src={speaker.image} alt={speaker.name} className="speaker-modal-img" />
              ) : (
                <div
                  style={{
                    width: '100%',
                    height: '100%',
                    minHeight: '260px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '3rem',
                    fontWeight: 800,
                    color: speaker.isModerator ? '#0C0A08' : '#E8B84B',
                    background: speaker.isModerator
                      ? 'linear-gradient(135deg, #E8B84B 0%, #B8860B 100%)'
                      : 'linear-gradient(135deg, rgba(232, 184, 75, 0.35) 0%, rgba(20, 18, 14, 0.9) 100%)',
                  }}
                >
                  {initials}
                </div>
              )}
              <div className="speaker-modal-img-glow" />
            </div>
            {speaker.linkedin && (
              <a
                href={speaker.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="speaker-modal-linkedin-btn"
              >
                <span>View LinkedIn Profile</span>
                <ExternalLink size={13} />
              </a>
            )}
          </div>
          <div className="speaker-modal-right">
            <div className="speaker-modal-tag">
              {speaker.isModerator ? 'Session Moderator · AI Asia Summit 2026' : 'Speaker · AI Asia Summit 2026'}
            </div>
            <h2 className="speaker-modal-name">{speaker.name}</h2>
            <div className="speaker-modal-meta">
              <span className="speaker-modal-designation">{speaker.designation}</span>
              {speaker.company && (
                <span className="speaker-modal-company-badge">{speaker.company}</span>
              )}
            </div>
            <div className="speaker-modal-divider" />
            <div className="speaker-modal-bio">
              {Array.isArray(speaker.bio) ? (
                speaker.bio.map((para: string, i: number) => (
                  <p key={i}>{para}</p>
                ))
              ) : (
                <p>{speaker.bio}</p>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
}

/**
 * SpeakerProfileCard
 * Clickable speaker showcase card with photo, role, company, moderator pill, and bio trigger.
 */
function SpeakerProfileCard({
  speaker,
  isLead = false,
  compact = false,
  onSelect
}: {
  speaker: Speaker;
  isLead?: boolean;
  compact?: boolean;
  onSelect?: (speaker: Speaker) => void;
}) {
  const initials = speaker.name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((n) => n[0])
    .join('');

  const photoSize = compact ? 44 : isLead ? 64 : 52;

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => onSelect && onSelect(speaker)}
      onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && onSelect && onSelect(speaker)}
      title="Click to view speaker biography"
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: compact ? '10px' : '14px',
        padding: compact ? '8px 12px' : isLead ? '12px 16px' : '10px 14px',
        borderRadius: '14px',
        background: speaker.isModerator
          ? 'linear-gradient(135deg, rgba(232, 184, 75, 0.16) 0%, rgba(20, 18, 14, 0.85) 100%)'
          : 'linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(18, 16, 13, 0.75) 100%)',
        border: speaker.isModerator
          ? '1.5px solid rgba(232, 184, 75, 0.55)'
          : '1px solid rgba(255, 255, 255, 0.14)',
        boxShadow: '0 4px 16px rgba(0, 0, 0, 0.35)',
        backdropFilter: 'blur(12px)',
        transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
        width: '100%',
        boxSizing: 'border-box',
        cursor: 'pointer',
      }}
      onMouseOver={(e) => {
        e.currentTarget.style.transform = 'translateY(-3px)';
        e.currentTarget.style.borderColor = speaker.isModerator
          ? 'rgba(232, 184, 75, 0.9)'
          : 'rgba(232, 184, 75, 0.7)';
        e.currentTarget.style.boxShadow = '0 10px 28px rgba(232, 184, 75, 0.22)';
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.borderColor = speaker.isModerator
          ? 'rgba(232, 184, 75, 0.55)'
          : 'rgba(255, 255, 255, 0.14)';
        e.currentTarget.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.35)';
      }}
    >
      {/* Profile Photo or High-End Gradient Initials Box */}
      <div style={{ position: 'relative', flexShrink: 0 }}>
        {speaker.image ? (
          <img
            src={speaker.image}
            alt={speaker.name}
            style={{
              width: `${photoSize}px`,
              height: `${photoSize}px`,
              borderRadius: isLead ? '14px' : '12px',
              objectFit: 'cover',
              objectPosition: 'top center',
              display: 'block',
              border: speaker.isModerator
                ? '2px solid #E8B84B'
                : '1.5px solid rgba(232, 184, 75, 0.5)',
              boxShadow: '0 4px 12px rgba(0,0,0,0.5)',
            }}
            loading="lazy"
          />
        ) : (
          <div
            style={{
              width: `${photoSize}px`,
              height: `${photoSize}px`,
              borderRadius: isLead ? '14px' : '12px',
              background: speaker.isModerator
                ? 'linear-gradient(135deg, #E8B84B 0%, #B8860B 100%)'
                : 'linear-gradient(135deg, rgba(232, 184, 75, 0.3) 0%, rgba(255, 255, 255, 0.08) 100%)',
              color: speaker.isModerator ? '#0C0A08' : '#E8B84B',
              fontSize: compact ? '0.82rem' : isLead ? '1.1rem' : '0.92rem',
              fontWeight: 800,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              letterSpacing: '0.04em',
              border: speaker.isModerator
                ? '2px solid #E8B84B'
                : '1.5px solid rgba(232, 184, 75, 0.35)',
              boxShadow: '0 4px 12px rgba(0,0,0,0.4)',
            }}
          >
            {initials}
          </div>
        )}
      </div>

      {/* Profile Details */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', minWidth: 0, flex: 1 }}>
        {/* Name + Moderator Badge */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
          <h4
            style={{
              fontSize: compact ? '0.88rem' : isLead ? '1.05rem' : '0.94rem',
              fontWeight: 700,
              color: '#FFFFFF',
              margin: 0,
              fontFamily: "var(--font-heading, 'Outfit', sans-serif)",
              letterSpacing: '-0.01em',
              lineHeight: 1.25,
            }}
          >
            {speaker.name}
          </h4>
          {speaker.isModerator && (
            <span
              style={{
                fontSize: '0.6rem',
                fontWeight: 800,
                color: '#0C0A08',
                background: 'linear-gradient(90deg, #E8B84B, #F5C842)',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                padding: '2px 7px',
                borderRadius: '6px',
                boxShadow: '0 0 10px rgba(232, 184, 75, 0.4)',
              }}
            >
              Moderator
            </span>
          )}
        </div>

        {/* Designation / Role */}
        {speaker.designation && (
          <p
            style={{
              fontSize: compact ? '0.72rem' : '0.78rem',
              color: 'rgba(255, 255, 255, 0.72)',
              margin: 0,
              lineHeight: 1.35,
              fontWeight: 400,
            }}
          >
            {speaker.designation}
          </p>
        )}

        {/* Company Badge with Dot + Click to view bio prompt */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '6px', marginTop: '3px' }}>
          {speaker.company && (
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', minWidth: 0 }}>
              <span
                style={{
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                  background: '#E8B84B',
                  boxShadow: '0 0 6px #E8B84B',
                  flexShrink: 0,
                }}
              />
              <span
                style={{
                  fontSize: compact ? '0.7rem' : '0.75rem',
                  fontWeight: 600,
                  color: '#E8B84B',
                  letterSpacing: '0.02em',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                {speaker.company}
              </span>
            </div>
          )}
          <span
            style={{
              fontSize: '0.62rem',
              fontWeight: 700,
              color: '#FCD34D',
              opacity: 0.8,
              display: 'inline-flex',
              alignItems: 'center',
              gap: '2px',
              marginLeft: 'auto',
              flexShrink: 0,
              letterSpacing: '0.02em',
            }}
          >
            View Bio <ArrowRight size={9} />
          </span>
        </div>
      </div>
    </div>
  );
}

export default function ScrollTimeline({ milestones }: TimelineProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSpeaker, setActiveSpeaker] = useState<any>(null);

  const handleSpeakerSelect = (speaker: Speaker) => {
    const fullData = getFullSpeakerData(speaker);
    setActiveSpeaker(fullData);
  };

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
        maxWidth: '1200px',
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

        <div style={{ display: 'flex', flexDirection: 'column', gap: '3.5rem', position: 'relative', zIndex: 10 }}>
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
                      width: '22px',
                      height: '22px',
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
                      opacity: isActive ? 1 : 0.55,
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
                        borderRadius: '22px',
                        padding: '1.75rem 2rem',
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
                        marginBottom: '1.5rem',
                        paddingBottom: '1rem',
                        borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                      }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                          {/* Prominently Highlighted Timing Pill */}
                          {milestone.time && (
                            <span
                              style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '6px',
                                fontSize: '0.82rem',
                                fontFamily: "var(--font-mono, 'Space Mono', monospace)",
                                fontWeight: 800,
                                letterSpacing: '0.04em',
                                background: 'linear-gradient(135deg, rgba(232, 184, 75, 0.28) 0%, rgba(200, 145, 30, 0.16) 100%)',
                                color: '#FCD34D',
                                padding: '4px 12px',
                                borderRadius: '8px',
                                border: '1.5px solid rgba(232, 184, 75, 0.65)',
                                boxShadow: '0 0 14px rgba(232, 184, 75, 0.28), inset 0 0 8px rgba(232, 184, 75, 0.12)',
                              }}
                            >
                              <Clock size={13} style={{ color: '#FCD34D' }} />
                              {milestone.time}
                            </span>
                          )}
                          <span
                            style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              padding: '4px 12px',
                              borderRadius: '9999px',
                              fontSize: '0.75rem',
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
                              fontSize: '1.3rem',
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
                            fontSize: '0.72rem',
                            fontWeight: 700,
                            letterSpacing: '0.08em',
                            textTransform: 'uppercase',
                            color: '#E8B84B',
                            background: 'rgba(232, 184, 75, 0.12)',
                            padding: '5px 14px',
                            borderRadius: '9999px',
                            border: '1px solid rgba(232, 184, 75, 0.3)',
                          }}
                        >
                          <Users size={13} />
                          Happening Simultaneously
                        </span>
                      </div>

                      {/* 3 Concurrent Tracks Grid */}
                      <div
                        style={{
                          display: 'grid',
                          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                          gap: '1.25rem',
                        }}
                      >
                        {milestone.sessions.map((sess, sIdx) => (
                          <div
                            key={sIdx}
                            style={{
                              background: `linear-gradient(135deg, ${sess.color}15 0%, rgba(14, 12, 10, 0.85) 100%)`,
                              border: `1px solid ${sess.color}45`,
                              borderRadius: '16px',
                              padding: '1.35rem',
                              position: 'relative',
                              overflow: 'hidden',
                              display: 'flex',
                              flexDirection: 'column',
                              justifyContent: 'space-between',
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
                            <div>
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
                                    fontSize: '0.75rem',
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
                                  fontSize: '1.05rem',
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

                            {/* Breakout Session Speakers (Clickable with Profile Modal) */}
                            {sess.speakers && sess.speakers.length > 0 && (
                              <div
                                style={{
                                  display: 'flex',
                                  flexDirection: 'column',
                                  gap: '8px',
                                  marginTop: '1.25rem',
                                  paddingTop: '1rem',
                                  borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                                }}
                              >
                                <span
                                  style={{
                                    fontSize: '0.65rem',
                                    fontWeight: 700,
                                    letterSpacing: '0.1em',
                                    textTransform: 'uppercase',
                                    color: 'rgba(255, 255, 255, 0.5)',
                                    marginBottom: '2px',
                                  }}
                                >
                                  Track Speakers &amp; Panel · Click to view bio
                                </span>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                  {sess.speakers.map((spk, spkIdx) => (
                                    <SpeakerProfileCard 
                                      key={spkIdx} 
                                      speaker={spk} 
                                      compact={true} 
                                      onSelect={handleSpeakerSelect}
                                    />
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            }

            // Standard alternating milestone card (Keynotes, Panels, Masterclasses, Breaks)
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
                    top: '12px',
                    width: '20px',
                    height: '20px',
                    borderRadius: '50%',
                    transform: 'translateX(-50%)',
                    zIndex: 20,
                    transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                    background: isActive ? '#E8B84B' : '#1E1B16',
                    border: isActive ? '3px solid #0C0A08' : '2px solid rgba(232, 184, 75, 0.3)',
                    boxShadow: isActive ? '0 0 20px rgba(232, 184, 75, 0.95), inset 0 0 6px #FFFFFF' : 'none',
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
                    opacity: isActive ? 1 : 0.5,
                    transform: isActive ? 'translateY(0)' : 'translateY(16px)'
                  }}
                >
                  <div
                    style={{
                      background: 'linear-gradient(135deg, rgba(232, 184, 75, 0.08) 0%, rgba(20, 18, 14, 0.9) 100%)',
                      backdropFilter: 'blur(16px)',
                      WebkitBackdropFilter: 'blur(16px)',
                      border: isActive 
                        ? '1px solid rgba(232, 184, 75, 0.5)'
                        : '1px solid rgba(255, 255, 255, 0.1)',
                      borderRadius: '20px',
                      padding: '1.5rem 1.75rem',
                      boxShadow: isActive 
                        ? '0 14px 36px rgba(0,0,0,0.55), 0 0 22px rgba(232, 184, 75, 0.15)' 
                        : '0 4px 20px rgba(0,0,0,0.3)',
                      transition: 'border-color 0.3s ease, box-shadow 0.3s ease'
                    }}
                  >
                    {/* Badge row: Highlighted Time + Number + Category + Track */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', marginBottom: '0.85rem' }}>
                      {milestone.time && (
                        <span
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '6px',
                            fontSize: '0.8rem',
                            fontFamily: "var(--font-mono, 'Space Mono', monospace)",
                            fontWeight: 800,
                            letterSpacing: '0.04em',
                            background: 'linear-gradient(135deg, rgba(232, 184, 75, 0.28) 0%, rgba(200, 145, 30, 0.16) 100%)',
                            color: '#FCD34D',
                            padding: '4px 12px',
                            borderRadius: '8px',
                            border: '1.5px solid rgba(232, 184, 75, 0.65)',
                            boxShadow: '0 0 14px rgba(232, 184, 75, 0.28), inset 0 0 8px rgba(232, 184, 75, 0.12)',
                          }}
                        >
                          <Clock size={13} style={{ color: '#FCD34D' }} />
                          {milestone.time}
                        </span>
                      )}

                      {milestone.number && (
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
                          fontSize: '0.7rem',
                          fontWeight: 700,
                          letterSpacing: '0.08em',
                          textTransform: 'uppercase',
                          color: meta.color,
                          background: meta.bg,
                          padding: '3px 10px',
                          borderRadius: '9999px',
                          border: `1px solid ${meta.border}`
                        }}
                      >
                        <CategoryIcon size={12} />
                        {meta.label}
                      </span>

                      {milestone.track && (
                        <span
                          style={{
                            fontSize: '0.68rem',
                            fontWeight: 600,
                            letterSpacing: '0.08em',
                            textTransform: 'uppercase',
                            color: '#94A3B8',
                            background: 'rgba(255, 255, 255, 0.04)',
                            padding: '3px 10px',
                            borderRadius: '6px',
                            border: '1px solid rgba(255, 255, 255, 0.08)',
                            marginLeft: 'auto'
                          }}
                        >
                          {milestone.track}
                        </span>
                      )}
                    </div>

                    {/* Topic Title */}
                    <h3
                      style={{
                        fontSize: 'clamp(1.15rem, 1.8vw, 1.35rem)',
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

                    {/* Highly Visible Speaker Profile Section (Clickable) */}
                    {milestone.speakers && milestone.speakers.length > 0 && (
                      <div
                        style={{
                          marginTop: '1.35rem',
                          paddingTop: '1.1rem',
                          borderTop: '1px solid rgba(232, 184, 75, 0.2)',
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '0.75rem',
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                          <span
                            style={{
                              fontSize: '0.68rem',
                              fontWeight: 700,
                              letterSpacing: '0.12em',
                              textTransform: 'uppercase',
                              color: '#E8B84B',
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '6px',
                            }}
                          >
                            <Users size={12} />
                            {milestone.category === 'keynote'
                              ? 'Keynote Speaker'
                              : milestone.category === 'panel'
                              ? 'Panel Speakers & Moderator'
                              : milestone.category === 'masterclass'
                              ? 'Masterclass Instructor'
                              : 'Featured Speaker'}
                          </span>
                          <span
                            style={{
                              fontSize: '0.65rem',
                              color: 'rgba(255, 255, 255, 0.5)',
                            }}
                          >
                            Click speaker for bio
                          </span>
                        </div>

                        {/* Speaker Cards Grid */}
                        <div
                          style={{
                            display: 'grid',
                            gridTemplateColumns: milestone.speakers.length > 1 ? 'repeat(auto-fit, minmax(240px, 1fr))' : '1fr',
                            gap: '0.75rem',
                          }}
                        >
                          {milestone.speakers.map((spk, spkIdx) => (
                            <SpeakerProfileCard
                              key={spkIdx}
                              speaker={spk}
                              isLead={milestone.speakers?.length === 1}
                              compact={milestone.speakers && milestone.speakers.length > 2}
                              onSelect={handleSpeakerSelect}
                            />
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Interactive Speaker Pop-up Modal */}
      <AnimatePresence>
        {activeSpeaker && (
          <SpeakerBioModal 
            speaker={activeSpeaker} 
            onClose={() => setActiveSpeaker(null)} 
          />
        )}
      </AnimatePresence>

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
            padding-right: 2.75rem !important;
            padding-left: 0 !important;
          }
          .timeline-item.is-odd .timeline-card-col {
            padding-left: 2.75rem !important;
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
