import React, { useState } from 'react';

export default function AiRobotVisual() {
  const [transform, setTransform] = useState({ rotateX: 0, rotateY: 0, scale: 1 });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    
    setTransform({
      rotateX: -y / 15,
      rotateY: x / 15,
      scale: 1.05
    });
  };

  const handleMouseLeave = () => {
    setTransform({ rotateX: 0, rotateY: 0, scale: 1 });
  };

  return (
    <div 
      className="ai-robot-card-wrapper"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        perspective: 1000,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        margin: '1rem 0 2.5rem'
      }}
    >
      <div 
        className="ai-robot-glass-card"
        style={{
          transform: `rotateX(${transform.rotateX}deg) rotateY(${transform.rotateY}deg) scale(${transform.scale})`,
          transition: 'transform 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
          position: 'relative',
          width: '100%',
          maxWidth: '420px',
          aspectRatio: '1 / 1',
          borderRadius: '24px',
          overflow: 'hidden',
          border: '1px solid rgba(0, 163, 224, 0.4)',
          boxShadow: '0 25px 60px rgba(0, 0, 0, 0.7), 0 0 30px rgba(0, 163, 224, 0.3)',
          background: 'rgba(11, 21, 48, 0.6)',
          backdropFilter: 'blur(20px)',
          cursor: 'pointer'
        }}
      >
        {/* Robot Image */}
        <img 
          src="/ai-robot.jpg" 
          alt="AI Asia Summit Thinking Humanoid AI" 
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            filter: 'brightness(0.95) contrast(1.1)'
          }}
        />

        {/* Ambient Glowing Circuit Overlay */}
        <div 
          style={{
            position: 'absolute',
            inset: 0,
            background: 'radial-gradient(circle at 50% 50%, rgba(0, 163, 224, 0.15) 0%, rgba(6, 9, 21, 0.75) 100%)',
            pointerEvents: 'none'
          }}
        />

        {/* Interactive Badge */}
        <div 
          style={{
            position: 'absolute',
            bottom: '1.25rem',
            left: '50%',
            transform: 'translateX(-50%)',
            background: 'rgba(6, 9, 21, 0.85)',
            backdropFilter: 'blur(16px)',
            border: '1px solid rgba(232, 184, 75, 0.4)',
            padding: '0.5rem 1.2rem',
            borderRadius: '9999px',
            fontFamily: 'Space Grotesk, sans-serif',
            fontSize: '0.78rem',
            fontWeight: 700,
            color: '#FFFFFF',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            whiteSpace: 'nowrap',
            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.5)'
          }}
        >
          AI THE MULTIPLIER EFFECT
        </div>
      </div>
    </div>
  );
}
