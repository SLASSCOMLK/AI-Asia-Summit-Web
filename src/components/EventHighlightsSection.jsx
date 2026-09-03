import React from 'react';
import { Camera } from 'lucide-react';
import ScrollFloat from './ScrollFloat';
import CircularGallery from './CircularGallery';
import archiveImg1 from '../assets/images/Copy of EAF01214 (2).jpg';
import archiveImg2 from '../assets/images/Copy of NVD_254892.jpg';
import archiveImg3 from '../assets/images/Copy of EAF00943 (1).jpg';
import archiveImg4 from '../assets/images/Copy of EAF01379.jpg';
import archiveImg5 from '../assets/images/Copy of EAF01671.jpg';
import archiveImg6 from '../assets/images/Copy of NVD_254839.jpg';

const highlights = [
  {
    title: 'Opening Keynote: AI Asia Summit 2025 Takes the Stage',
    src: archiveImg1
  },
  {
    title: 'Panel: Responsible AI & Ethical AI',
    src: archiveImg2
  },
  {
    title: 'Summit Partners & Ecosystem Showcase',
    src: archiveImg3
  },
  {
    title: 'A Packed House: Delegates from Across Asia',
    src: archiveImg4
  },
  {
    title: 'Spotlight Session: Google for Health',
    src: archiveImg5
  },
  {
    title: 'Robotics in Action: Live AI Showcase',
    src: archiveImg6
  }
];

const galleryItems = highlights.map((item) => ({ src: item.src, alt: item.title }));

export default function EventHighlightsSection() {
  return (
    <section className="highlights-section container" id="highlights">
      <div className="focus-header">
        <div className="focus-badge">
          <Camera size={14} style={{ color: '#E8B84B' }} />
          <span>EVENT ARCHIVE</span>
        </div>
        <ScrollFloat containerClassName="focus-main-title">
          Relive AI Asia Summit 2025
        </ScrollFloat>
        <p className="focus-subtitle">
          A look back at the panels, showcases, and conversations that shaped last year's summit —
          setting the stage for an even bigger 2026.
        </p>
      </div>

      <CircularGallery items={galleryItems} />
    </section>
  );
}
