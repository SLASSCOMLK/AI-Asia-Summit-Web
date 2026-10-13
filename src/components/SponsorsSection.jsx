import React from 'react';
import { motion } from 'framer-motion';
import { InfiniteSlider } from './ui/infinite-slider';

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
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '1.25rem',
              textAlign: 'center',
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
                  height: '58px',
                  width: 'auto',
                  opacity: 0.95,
                  filter: 'brightness(1.05)',
                  transition: 'opacity 0.2s ease',
                  objectFit: 'contain'
                }}
              />
            </a>
          </motion.div>
        </div>

        {/* ── Partners: Echelon & Zone 24x7 Side by Side ── */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          variants={fadeUp}
          custom={2}
          style={{
            marginTop: '3.5rem',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'flex-start',
            gap: '4.5rem',
            flexWrap: 'wrap',
            textAlign: 'center'
          }}
        >
          {/* Print and Digital Media Partner - Echelon & EconomyNext */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <p style={{
              fontSize: '0.7rem',
              fontWeight: 700,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: '#E8B84B',
              margin: '0 0 1.5rem 0'
            }}>
              Print and Digital Media Partner
            </p>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '1.25rem',
              flexWrap: 'wrap'
            }}>
              <a
                href="https://echelon.lk"
                target="_blank"
                rel="noreferrer"
                title="Echelon"
                style={{ display: 'inline-block', lineHeight: 0 }}
              >
                <img
                  src="/ECHELON LOGO.jpg"
                  alt="Echelon — Official Print and Digital Media Partner"
                  style={{
                    height: '50px',
                    width: 'auto',
                    maxWidth: '220px',
                    borderRadius: '8px',
                    objectFit: 'contain',
                    opacity: 0.95,
                    filter: 'brightness(1.05)',
                    transition: 'opacity 0.2s ease, transform 0.2s ease',
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.opacity = '1';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.opacity = '0.95';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                />
              </a>
              <a
                href="https://economynext.com"
                target="_blank"
                rel="noreferrer"
                title="EconomyNext"
                style={{ display: 'inline-block', lineHeight: 0 }}
              >
                <img
                  src="/EconomyNext.jpg"
                  alt="EconomyNext — Official Digital Media Partner"
                  style={{
                    height: '50px',
                    width: 'auto',
                    maxWidth: '220px',
                    borderRadius: '8px',
                    objectFit: 'contain',
                    opacity: 0.95,
                    filter: 'brightness(1.05)',
                    transition: 'opacity 0.2s ease, transform 0.2s ease',
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.opacity = '1';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.opacity = '0.95';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                />
              </a>
            </div>
          </div>

          {/* Gifting Partner - Zone 24x7 */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: '220px' }}>
            <p style={{
              fontSize: '0.7rem',
              fontWeight: 700,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: '#E8B84B',
              margin: '0 0 1.5rem 0'
            }}>
              Gifting Partner
            </p>
            <a
              href="https://zone24x7.com"
              target="_blank"
              rel="noreferrer"
              title="Zone 24x7"
              style={{ display: 'inline-block', lineHeight: 0 }}
            >
              <img
                src="/zone24x7 logo.jpg"
                alt="Zone 24x7 — Gifting Partner"
                style={{
                  height: '50px',
                  width: 'auto',
                  maxWidth: '240px',
                  borderRadius: '8px',
                  objectFit: 'contain',
                  opacity: 0.95,
                  filter: 'brightness(1.05)',
                  transition: 'opacity 0.2s ease, transform 0.2s ease',
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.opacity = '1';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.opacity = '0.95';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              />
            </a>
          </div>
        </motion.div>

        {/* ── Eco System Partners ── */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          variants={fadeUp}
          custom={3}
          style={{
            marginTop: '4.5rem',
            textAlign: 'center'
          }}
        >
          <p style={{
            fontSize: '0.85rem',
            fontWeight: 700,
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            color: '#E8B84B',
            marginBottom: '2rem'
          }}>
            Eco System Partners
          </p>
          
          <div style={{
            background: 'rgba(255,255,255,0.02)',
            borderTop: '1px solid rgba(255,255,255,0.05)',
            borderBottom: '1px solid rgba(255,255,255,0.05)',
            padding: '3rem 0',
            width: '100vw',
            marginLeft: '50%',
            transform: 'translateX(-50%)'
          }} className="w-full">
            <InfiniteSlider duration={40} gap={40}>
              {[
                { src: '/CA.jpeg', alt: 'CA Sri Lanka — The Institute of Chartered Accountants of Sri Lanka' },
                { src: '/ECCSL.png', alt: 'ECCSL — The European Chamber of Commerce of Sri Lanka' },
                { src: '/BCS.png', alt: 'BCS Sri Lanka Section — The Chartered Institute for IT' },
                { src: '/AICPA_CIMA.png', alt: 'AICPA & CIMA' },
                { src: '/ACCA.jpg', alt: 'ACCA' },
                { src: '/National Chamber logo_page-0001.jpg', alt: 'National Chamber of Commerce Sri Lanka' },
                { src: '/fitis-logo.png', alt: 'FITIS — Federation of Information Technology Industry Sri Lanka' },
              ].map((partner, idx) => (
                <div
                  key={idx}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '180px',
                    height: '88px',
                    flexShrink: 0,
                    background: '#ffffff',
                    borderRadius: '14px',
                    padding: '1rem 1.5rem',
                    border: '2px solid rgba(232,184,75,0)',
                    boxShadow: '0 2px 12px rgba(0,0,0,0.25)',
                    transition: 'all 0.3s ease',
                    cursor: 'default',
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.transform = 'translateY(-4px)';
                    e.currentTarget.style.border = '2px solid rgba(232,184,75,0.7)';
                    e.currentTarget.style.boxShadow = '0 8px 28px rgba(232,184,75,0.2)';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.border = '2px solid rgba(232,184,75,0)';
                    e.currentTarget.style.boxShadow = '0 2px 12px rgba(0,0,0,0.25)';
                  }}
                >
                  <img
                    src={partner.src}
                    alt={partner.alt}
                    style={{
                      width: '140px',
                      height: '52px',
                      objectFit: 'contain',
                      objectPosition: 'center',
                      display: 'block',
                      opacity: 0.85,
                      filter: 'brightness(1.1) contrast(1.05)',
                      transition: 'all 0.3s ease',
                    }}
                  />
                </div>
              ))}
            </InfiniteSlider>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
