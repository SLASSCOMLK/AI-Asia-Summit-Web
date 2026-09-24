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
      {/* Established — counts from 2000 → 2005 */}
      <div className="metric-box">
        <span className="metric-num">
          {metricsVisible
            ? <CountingNumber from={2000} target={2005} transition={T_ESTABLISHED} />
            : '2,005'}
        </span>
        <span className="metric-label">Established</span>
      </div>

      {/* Attendees — counts from 0 → 761 */}
      <div className="metric-box">
        <span className="metric-num">
          {metricsVisible
            ? <><CountingNumber from={0} target={761} transition={T_ATTENDEES} />+</>
            : '761+'}
        </span>
        <span className="metric-label">Attendees</span>
      </div>

      {/* Global Speakers — counts from 0 → 13 */}
      <div className="metric-box">
        <span className="metric-num">
          {metricsVisible
            ? <><CountingNumber from={0} target={13} transition={T_SPEAKERS} />+</>
            : '13+'}
        </span>
        <span className="metric-label">Global Speakers</span>
      </div>

      {/* Asia-Wide Impact — static text */}
      <div className="metric-box">
        <span className="metric-num">Asia-Wide</span>
        <span className="metric-label">Impact</span>
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
            The <strong>SLASSCOM AI Asia Summit</strong> is Sri Lanka's premier platform for advancing the AI ecosystem, bringing together thought leaders, innovators, policymakers, researchers, startups, and technology professionals from across Asia and beyond. Established in 2018, the summit fosters collaboration, knowledge sharing, and enterprise innovation to accelerate AI adoption across key industries.
          </p>

          <div className="about-pillars-list">
            <div className="about-pillar-item">
              <CheckCircle size={18} style={{ color: '#E8B84B', flexShrink: 0 }} />
              <span>Fostering high-value collaboration to solve complex industry challenges</span>
            </div>
            <div className="about-pillar-item">
              <CheckCircle size={18} style={{ color: '#E8B84B', flexShrink: 0 }} />
              <span>Facilitating strategic partnerships that unlock new economic growth</span>
            </div>
            <div className="about-pillar-item">
              <CheckCircle size={18} style={{ color: '#E8B84B', flexShrink: 0 }} />
              <span>Driving AI adoption to enhance national competitiveness and global linkages</span>
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
