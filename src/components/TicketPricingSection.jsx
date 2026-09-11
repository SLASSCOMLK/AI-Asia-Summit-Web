import React from 'react';
import { Ticket } from 'lucide-react';
import { SquishyPricing } from './ui/squishy-pricing';
import ScrollFloat from './ScrollFloat';

export default function TicketPricingSection() {
  return (
    <section className="pricing-section container" id="tickets">
      <div className="focus-header">
        <div className="focus-badge">
          <Ticket size={14} style={{ color: '#E8B84B' }} />
          <span>EVENT PASSES &amp; REGISTRATION</span>
        </div>

        <ScrollFloat containerClassName="focus-main-title">
          Secure Your Passes
        </ScrollFloat>

        <p className="focus-subtitle">
          Join Asia's premier AI gathering on 12th November 2026 at Cinnamon Grand, Colombo.
          Early Bird rates are live for a limited time.
        </p>
      </div>

      <SquishyPricing />
    </section>
  );
}
