import React from 'react';
import { motion } from 'framer-motion';
import { Ticket, Sparkles, CheckCircle2, ArrowRight, ExternalLink } from 'lucide-react';

const REGISTRATION_LINK = 'https://slasscom.glueup.com/event/ai-asia-summit-2026-193153/';

export const SquishyPricing = () => {
  return (
    <div className="squishy-pricing-wrapper">
      <div className="squishy-pricing-grid">
        <PricingCard
          label="Early Bird Offer -SLASSCOM Members"
          price="24,933"
          currency="Rs"
          period="Per Ticket"
          description="Exclusive Early Bird rate for verified SLASSCOM Member organizations. Must register with official corporate email."
          validity="Valid till 10th Oct 2026"
          taxNote="*VAT 18% applicable at check-out"
          cta="Register"
          link={REGISTRATION_LINK}
          background="squishy-bg-member"
          accentColor="#2E63FF"
          BGComponent={BGComponent1}
          featured={false}
        />

        <PricingCard
          label="Early Bird Offer SLASSCOM Non-Members"
          price="31,138"
          currency="Rs"
          period="Per Ticket"
          description="Standard Early Bird full-day conference pass for non-members, international attendees, and AI professionals."
          validity="Valid till 10th Oct 2026"
          taxNote="*VAT 18% applicable at check-out"
          cta="Register"
          link={REGISTRATION_LINK}
          background="squishy-bg-nonmember"
          accentColor="#7C3AED"
          BGComponent={BGComponent2}
          featured={true}
        />

        <PricingCard
          label="Bundle Offer 8 seats - SLASSCOM Members "
          price="199,015"
          currency="Rs"
          period="8 Passes"
          description="Exclusive Early Bird rate for verified SLASSCOM Member organizations. Must register with official corporate email."
          taxNote="*VAT 18% applicable at check-out"
          cta="Register"
          link="mailto:corpoffice@slasscom.lk?subject=AI%20Asia%20Summit%202026%20-%20Enterprise%20Delegation%20Inquiry"
          background="squishy-bg-enterprise"
          accentColor="#E8B84B"
          BGComponent={BGComponent3}
          featured={false}
        />
      </div>
    </div>
  );
};

// Export as both Component and SquishyPricing for versatility
export const Component = SquishyPricing;

const PricingCard = ({
  badge,
  label,
  price,
  currency,
  period,
  description,
  availability,
  validity,
  taxNote,
  cta,
  link,
  background,
  accentColor,
  BGComponent,
  featured
}) => {
  return (
    <motion.div
      whileHover="hover"
      initial="initial"
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      variants={{
        initial: { scale: 1, y: 0 },
        hover: { scale: 1.03, y: -6 }
      }}
      className={`squishy-card ${background} ${featured ? 'squishy-card-featured' : ''}`}
    >
      {/* Top Header Information */}
      <div className="squishy-card-content">
        <div className="squishy-badge-row">
          <span className="squishy-badge">
            <Sparkles size={11} className="squishy-sparkle-icon" />
            {badge}
          </span>
          {availability && (
            <span className="squishy-stock-pill">
              {availability}
            </span>
          )}
        </div>

        <h3 className="squishy-card-title">{label}</h3>

        {/* Price Display */}
        <div className="squishy-price-box">
          <motion.div
            variants={{
              initial: { scale: 0.95 },
              hover: { scale: 1.05 }
            }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="squishy-price-digits"
          >
            {currency && <span className="squishy-currency">{currency} </span>}
            <span className="squishy-amount">{price}</span>
          </motion.div>
          {period && <span className="squishy-period">/ {period}</span>}
        </div>

        {/* Validity & Description */}
        <div className="squishy-validity-tag">
          <span>{validity}</span>
        </div>

        <p className="squishy-description">{description}</p>

        {/* Tax and T&C Note */}
        <div className="squishy-meta-row">
          <span className="squishy-tax-note">{taxNote}</span>
        </div>
      </div>

      {/* Action Button */}
      <div className="squishy-btn-container">
        <a
          href={link}
          target={link.startsWith('http') ? '_blank' : '_self'}
          rel="noreferrer"
          className="squishy-cta-btn"
        >
          <span>{cta}</span>
          <ExternalLink size={14} />
        </a>
      </div>

      {/* Squishy Background SVG with Smooth Hover Morphing */}
      <BGComponent />
    </motion.div>
  );
};

const BGComponent1 = () => (
  <motion.svg
    width="340"
    height="460"
    viewBox="0 0 340 460"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    variants={{ hover: { scale: 1.35 } }}
    transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
    className="squishy-svg-bg"
  >
    <motion.circle
      variants={{ hover: { scaleY: 0.6, y: -25 } }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
      cx="170"
      cy="130"
      r="120"
      fill="rgba(255, 255, 255, 0.08)"
    />
    <motion.ellipse
      variants={{ hover: { scaleY: 2, y: -20 } }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
      cx="170"
      cy="320"
      rx="120"
      ry="50"
      fill="rgba(255, 255, 255, 0.08)"
    />
  </motion.svg>
);

const BGComponent2 = () => (
  <motion.svg
    width="340"
    height="460"
    viewBox="0 0 340 460"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    variants={{ hover: { scale: 1.15 } }}
    transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
    className="squishy-svg-bg"
  >
    <motion.rect
      x="20"
      width="145"
      height="145"
      rx="20"
      fill="rgba(255, 255, 255, 0.08)"
      variants={{ hover: { y: 240, rotate: '90deg', scaleX: 1.8 } }}
      style={{ y: 20 }}
      transition={{ delay: 0.1, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
    />
    <motion.rect
      x="175"
      width="145"
      height="145"
      rx="20"
      fill="rgba(255, 255, 255, 0.08)"
      variants={{ hover: { y: 20, rotate: '90deg', scaleX: 1.8 } }}
      style={{ y: 240 }}
      transition={{ delay: 0.1, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
    />
  </motion.svg>
);

const BGComponent3 = () => (
  <motion.svg
    width="340"
    height="460"
    viewBox="0 0 340 460"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    variants={{ hover: { scale: 1.25 } }}
    transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
    className="squishy-svg-bg"
  >
    <motion.path
      variants={{ hover: { y: -40 } }}
      transition={{ delay: 0.2, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      d="M158 160C164 154 176 154 182 160L280 258C286 264 286 274 280 280L230 330C197 363 143 363 110 330L60 280C54 274 54 264 60 258L158 160Z"
      fill="rgba(255, 255, 255, 0.08)"
    />
    <motion.path
      variants={{ hover: { y: -40 } }}
      transition={{ delay: 0.15, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      d="M158 100C164 94 176 94 182 100L280 198C286 204 286 214 280 220L230 270C197 303 143 303 110 270L60 220C54 214 54 204 60 198L158 100Z"
      fill="rgba(255, 255, 255, 0.08)"
    />
    <motion.path
      variants={{ hover: { y: -40 } }}
      transition={{ delay: 0.1, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      d="M158 40C164 34 176 34 182 40L280 138C286 144 286 154 280 160L230 210C197 243 143 243 110 210L60 160C54 154 54 144 60 138L158 40Z"
      fill="rgba(255, 255, 255, 0.08)"
    />
  </motion.svg>
);
