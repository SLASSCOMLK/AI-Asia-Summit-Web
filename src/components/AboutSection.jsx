import React from 'react';
import { Sparkles, MapPin } from 'lucide-react';

export default function AboutSection() {
  return (
    <section className="about-section container" id="about">
      <div className="about-grid">
        {/* Left Column: Text & Context */}
        <div className="about-content">
          <div className="about-badge">
            <Sparkles size={14} style={{ color: '#E8B84B' }} />
            <span>ABOUT SLASSCOM AI ASIA SUMMIT</span>
          </div>

          <h2 className="about-title">
            Sri Lanka's Premier Platform for <br />
            <span className="about-title-highlight">AI Ecosystem & Innovation</span>
          </h2>

          <p className="about-description">
            The <strong>SLASSCOM AI Asia Summit</strong> is Sri Lanka's premier platform for advancing the AI ecosystem, bringing together industry leaders, innovators, policymakers, researchers, startups, and technology professionals from across Asia and beyond. Established in 2018, the summit has become the country's flagship AI event, fostering collaboration, knowledge sharing, and innovation that accelerates AI adoption across industries.
          </p>

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
            
            {/* Overlay Glass Badge */}
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
