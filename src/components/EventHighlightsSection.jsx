import React from 'react';
import { Camera } from 'lucide-react';
import ScrollFloat from './ScrollFloat';
import InteractiveImageBentoGallery from './ui/bento-gallery';

import archiveImg1 from '../assets/images/Copy of EAF01214 (2).jpg';
import archiveImg2 from '../assets/images/Copy of NVD_254892.jpg';
import archiveImg3 from '../assets/images/Copy of EAF00943 (1).jpg';
import archiveImg4 from '../assets/images/Copy of EAF01379.jpg';
import archiveImg5 from '../assets/images/Copy of EAF01671.jpg';
import archiveImg6 from '../assets/images/Copy of NVD_254839.jpg';

const imageItems = [
  {
    id: 1,
    title: "Opening Keynote",
    desc: "AI Asia Summit 2025 Takes the Stage — Setting the tone for Asia's premier AI gathering.",
    url: archiveImg1,
    span: "md:col-span-2 md:row-span-2",
  },
  {
    id: 2,
    title: "Responsible AI Panel",
    desc: "Ethical AI, governance & human-centric frameworks discussed by industry leaders.",
    url: archiveImg2,
    span: "md:row-span-1",
  },
  {
    id: 3,
    title: "Ecosystem Showcase",
    desc: "Summit partners demonstrating breakthrough enterprise AI tools & tech solutions.",
    url: archiveImg3,
    span: "md:row-span-1",
  },
  {
    id: 4,
    title: "Packed Delegate House",
    desc: "Over 3,500+ attendees connecting across technology, health, and policy sectors.",
    url: archiveImg4,
    span: "md:row-span-2",
  },
  {
    id: 5,
    title: "Google for Health Spotlight",
    desc: "Keynote presentation on AI-driven diagnostics & healthcare transformation.",
    url: archiveImg5,
    span: "md:row-span-1",
  },
  {
    id: 6,
    title: "Robotics & Live AI Action",
    desc: "Interactive live robotics showcase and generative AI demonstrations.",
    url: archiveImg6,
    span: "md:col-span-2 md:row-span-1",
  },
];

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
          A look back at the keynotes, panels, showcases, and conversations that shaped last year's summit —
          drag to explore, click any photo to expand.
        </p>
      </div>

      <InteractiveImageBentoGallery imageItems={imageItems} />
    </section>
  );
}
