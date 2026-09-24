import React, { useEffect, useRef, useState } from 'react';
import { Layers, CheckCircle } from 'lucide-react';
import CountingNumber from './ui/counting-number';

const YOUTUBE_VIDEO_ID = '6fsM7-KnKWg';
const YOUTUBE_START_SECONDS = 12;

// ─── Stable transition objects (module-level) ─────────────────────────────────
// IMPORTANT: These MUST live outside any component. If defined inline as JSX
// props (e.g. transition={{ duration: 2 }}), React creates a new object reference
// every render, which causes CountingNumber's useCallback to treat transition as
// a changed dependency and restart the animation in an infinite loop.
const T_ESTABLISHED = { duration: 2, ease: 'easeOut' };
const T_ATTENDEES   = { duration: 2.5, ease: 'easeOut' };
const T_SPEAKERS    = { duration: 2, ease: 'easeOut' };

/**
 * MetricsGrid — memoized so its props only change when metricsVisible flips.
 * This prevents unnecessary re-renders that could restart the count animations.
 */
const MetricsGrid = React.memo(function MetricsGrid({ metricsVisible, metricsRef }) {
  return (
    <div className="about-metrics-grid" ref={metricsRef}>
      {/* Established — counts from 2010 → 2018 */}
      <div className="metric-box">
        <span className="metric-num">
          {metricsVisible
            ? <CountingNumber from={2010} target={2018} transition={T_ESTABLISHED} />
            : '2018'}
        </span>
        <span className="metric-label">Established</span>
      </div>

      {/* Participants — counts from 0 → 1000 */}
      <div className="metric-box">
        <span className="metric-num">
          {metricsVisible
            ? <><CountingNumber from={0} target={1000} transition={T_ATTENDEES} />+</>
            : '1000+'}
        </span>
        <span className="metric-label">Participants</span>
      </div>

      {/* Global Speakers — counts from 0 → 30 */}
      <div className="metric-box">
        <span className="metric-num">
          {metricsVisible
            ? <><CountingNumber from={0} target={30} transition={T_SPEAKERS} />+</>
            : '30+'}
        </span>
        <span className="metric-label">Global Speakers</span>
      </div>

      {/* National Reach — static text */}
      <div className="metric-box">
        <span className="metric-num">#1</span>
        <span className="metric-label">AI Summit in Sri Lanka</span>
      </div>
    </div>
  );
});

export default function AboutSection() {
  const videoWrapperRef = useRef(null);
  const [hasStartedPlaying, setHasStartedPlaying] = useState(false);

  const metricsRef = useRef(null);
  const [metricsVisible, setMetricsVisible] = useState(false);

  useEffect(() => {
    const node = videoWrapperRef.current;
    if (!node) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasStartedPlaying(true);
          observer.disconnect();
        }
      },
      { threshold: 0.4 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const node = metricsRef.current;
    if (!node) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setMetricsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="about-section container" id="about">
      <div className="about-grid">
        {/* Left Column: Text & Context */}
        <div className="about-content">
          <div className="about-badge">
            <Layers size={14} style={{ color: '#E8B84B' }} />
            <span>BEYOND A CONFERENCE • A MOVEMENT</span>
          </div>

          <h2 className="about-title">
            Sri Lanka's Premier Engine for <br />
            <span className="about-title-highlight">AI </span>
            <span className="hero-gradient-text">Transformation</span>
          </h2>

          <p className="about-description">
            The <strong>SLASSCOM AI Asia Summit</strong> is more than an event; it's the engine driving Sri Lanka's AI transformation. We bring together a diverse ecosystem of thought leaders, innovators, and policy makers to not just talk about the future, but to actively build it. Our focus is on tangible outcomes:
          </p>

          <div className="about-pillars-list">
            <div className="about-pillar-item">
              <CheckCircle size={18} style={{ color: '#E8B84B', flexShrink: 0 }} />
              <span>Fostering collaboration to solve complex challenges</span>
            </div>
            <div className="about-pillar-item">
              <CheckCircle size={18} style={{ color: '#E8B84B', flexShrink: 0 }} />
              <span>Facilitating partnerships that unlock new growth</span>
            </div>
            <div className="about-pillar-item">
              <CheckCircle size={18} style={{ color: '#E8B84B', flexShrink: 0 }} />
              <span>Driving AI adoption across key industries to enhance competitiveness and create new economic opportunities</span>
            </div>
          </div>

          <MetricsGrid metricsVisible={metricsVisible} metricsRef={metricsRef} />
        </div>

        {/* Right Column: Summit Highlight Video */}
        <div className="about-video-container">
          <div className="about-video-wrapper" ref={videoWrapperRef}>
            {hasStartedPlaying && (
              <iframe
                className="about-map-video"
                src={`https://www.youtube.com/embed/${YOUTUBE_VIDEO_ID}?start=${YOUTUBE_START_SECONDS}&autoplay=1&mute=1`}
                title="AI Asia Summit 2026 Highlight Video"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
