import React from 'react';
import { Sparkles } from 'lucide-react';

export default function AboutSection() {
  const images = [
    { src: '/about-1.jpg', alt: 'Summit Speakers Stage', tag: 'Expert Keynotes' },
    { src: '/about-2.jpg', alt: 'Global AI Leaders Panel', tag: 'Global Visionaries' },
    { src: '/about-3.jpg', alt: 'AI Robotics Tank Showcase', tag: 'Robotics & Hardware' },
    { src: '/about-4.jpg', alt: 'SLASSCOM Panel Discussion', tag: 'Industry Collaboration' }
  ];

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

        {/* Right Column: Solar System Elliptical Orbit */}
        <div className="solar-scene">
          {/* Orbit ring ellipses (decorative) */}
          <div className="orbit-ring orbit-ring-1" />
          <div className="orbit-ring orbit-ring-2" />

          {/* The 4 photos orbit as planets — each on its own delayed animation */}
          {images.map((img, idx) => (
            <div key={idx} className={`orbit-planet orbit-planet-${idx + 1}`}>
              <div className="planet-img-wrap">
                <img src={img.src} alt={img.alt} />
                <div className="planet-label">{img.tag}</div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
