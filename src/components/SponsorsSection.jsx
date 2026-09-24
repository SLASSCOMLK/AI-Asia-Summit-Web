import React from 'react';
import { motion } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }
  })
};

export default function SponsorsSection() {
  return (
    <section
      id="sponsors"
      style={{
        padding: '5rem 0 4rem',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Subtle background glow */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '700px',
        height: '300px',
        background: 'radial-gradient(ellipse, rgba(46,99,255,0.07) 0%, transparent 70%)',
        pointerEvents: 'none',
        zIndex: 0
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>

        {/* Section header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={fadeUp}
          custom={0}
          style={{ textAlign: 'center', marginBottom: '3.5rem' }}
        >
          <div className="focus-badge" style={{ justifyContent: 'center', marginBottom: '1rem' }}>
            <span>PARTNERS &amp; SPONSORS</span>
          </div>
          <h2 style={{
            fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)',
            fontWeight: 800,
            color: '#FFFFFF',
            letterSpacing: '-0.02em',
            margin: 0
          }}>
            Proud to be Supported By
          </h2>
          <div style={{
            width: '48px',
            height: '3px',
            background: 'linear-gradient(90deg, #E8B84B, #D4B05A)',
            borderRadius: '2px',
            margin: '1rem auto 0'
          }} />
        </motion.div>

        <div style={{
          display: 'flex',
          justifyContent: 'center',
          maxWidth: '860px',
          margin: '0 auto'
        }}>

          {/* ── Organised By ── */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-40px' }}
            variants={fadeUp}
            custom={1}
            style={{
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '20px',
              padding: '2.25rem 2.5rem',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '1.5rem',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              boxShadow: '0 8px 32px rgba(0,0,0,0.35)',
              textAlign: 'center',
              maxWidth: '380px',
              width: '100%',
              margin: '0 auto'
            }}
          >
            <p style={{
              fontSize: '0.7rem',
              fontWeight: 700,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: '#E8B84B',
              margin: 0
            }}>
              Organised By
            </p>
            <div style={{
              width: '100%',
              height: '1px',
              background: 'rgba(232,184,75,0.25)'
            }} />
            <a
              href="https://slasscom.lk"
              target="_blank"
              rel="noreferrer"
              title="SLASSCOM"
              style={{ display: 'inline-block', lineHeight: 0 }}
            >
              <img
                src="/slasscom-logo.png"
                alt="SLASSCOM — The Knowledge and Innovation Chamber"
                style={{
                  height: '72px',
                  width: 'auto',
                  opacity: 0.93,
                  filter: 'brightness(1.05)',
                  transition: 'opacity 0.2s ease',
                  objectFit: 'contain'
                }}
              />
            </a>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
