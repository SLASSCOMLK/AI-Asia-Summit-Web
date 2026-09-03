import React, { useEffect, useRef, useState } from 'react';
import { Layers, CheckCircle, Target, Award, Rocket, Globe } from 'lucide-react';

const YOUTUBE_VIDEO_ID = '6fsM7-KnKWg';
const YOUTUBE_START_SECONDS = 12;

export default function AboutSection() {
  const videoWrapperRef = useRef(null);
  const [hasStartedPlaying, setHasStartedPlaying] = useState(false);

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
              <CheckCircle size={18} style={{ color: '#00A3E0', flexShrink: 0 }} />
              <span>Fostering high-value collaboration to solve complex industry challenges</span>
            </div>
            <div className="about-pillar-item">
              <CheckCircle size={18} style={{ color: '#00A3E0', flexShrink: 0 }} />
              <span>Facilitating strategic partnerships that unlock new economic growth</span>
            </div>
            <div className="about-pillar-item">
              <CheckCircle size={18} style={{ color: '#00A3E0', flexShrink: 0 }} />
              <span>Driving AI adoption to enhance national competitiveness and global linkages</span>
            </div>
          </div>

          <div className="about-metrics-grid">
            <div className="metric-box">
              <span className="metric-num">2018</span>
              <span className="metric-label">Established</span>
            </div>
            <div className="metric-box">
              <span className="metric-num">3,500+</span>
              <span className="metric-label">Attendees</span>
            </div>
            <div className="metric-box">
              <span className="metric-num">50+</span>
              <span className="metric-label">Global Speakers</span>
            </div>
            <div className="metric-box">
              <span className="metric-num">Asia-Wide</span>
              <span className="metric-label">Impact</span>
            </div>
          </div>
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
