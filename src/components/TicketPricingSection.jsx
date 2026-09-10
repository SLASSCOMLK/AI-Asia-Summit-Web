import React from 'react';
import { Ticket, ShieldCheck, Sparkles, Clock, ExternalLink, Users } from 'lucide-react';
import { SquishyPricing } from './ui/squishy-pricing';
import ScrollFloat from './ScrollFloat';

export default function TicketPricingSection() {
  return (
    <section className="pricing-section container" id="tickets">
      <div className="focus-header">
        <div className="focus-badge">
          <Ticket size={14} style={{ color: '#E8B84B' }} />
          <span>EVENT PASSES & REGISTRATION</span>
        </div>
        
        <ScrollFloat containerClassName="focus-main-title">
          Secure Your Delegate Pass
        </ScrollFloat>
        
        <p className="focus-subtitle">
          Join Asia's premier AI gathering on 12th November 2026 at Cinnamon Grand, Colombo.
          Early Bird rates are live for a limited time.
        </p>
      </div>

      {/* Squishy Pricing Cards Grid */}
      <SquishyPricing />

      {/* Trust & Policy Assurance Bar */}
      <div className="pricing-trust-strip">
        <div className="trust-item">
          <ShieldCheck size={18} style={{ color: '#00A3E0' }} />
          <span>Official SLASSCOM Event Registration via Glue Up</span>
        </div>
        <div className="trust-item">
          <Clock size={18} style={{ color: '#E8B84B' }} />
          <span>Early Bird Pricing valid till specified offer deadline</span>
        </div>
        <div className="trust-item">
          <Users size={18} style={{ color: '#2E63FF' }} />
          <span>Full Access to Keynotes, Panels & Networking Lunch</span>
        </div>
      </div>
    </section>
  );
}
