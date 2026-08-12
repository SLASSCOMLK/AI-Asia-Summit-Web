import React from 'react';
import { Layers, MapPin, CheckCircle, Target, Award, Rocket, Globe } from 'lucide-react';

export default function AboutSection() {
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
            <span className="about-title-highlight">AI Transformation</span>
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

        {/* Right Column: Animated Sri Lanka Map Video Showcase */}
        <div className="about-video-container">
          <div className="about-video-wrapper">
            <video 
              autoPlay 
              loop 
              muted 
              playsInline 
              className="about-map-video"
            >
              <source src="/sri-lanka-map.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            
            {/* Overlay Glass Badge (Zero Emojis) */}
            <div className="map-location-badge">
              <MapPin size={14} style={{ color: '#E8B84B' }} />
              <span>COLOMBO, SRI LANKA • SUMMIT HUB</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
