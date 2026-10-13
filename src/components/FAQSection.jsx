import React from "react";
import { motion } from "framer-motion";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { MessageCircleQuestion } from "lucide-react";

const faqItems = [
  {
    id: "item-1",
    question: "What is the SLASSCOM AI Asia Summit 2026?",
    answer:
      "The SLASSCOM AI Asia Summit 2026 is the seventh edition of the summit, bringing together industry leaders, AI experts, technology innovators, policymakers, academics, and professionals to explore how artificial intelligence can multiply business value, drive innovation, strengthen competitiveness, and create meaningful impact.",
  },
  {
    id: "item-2",
    question: "What is the theme of the summit?",
    answer:
      'The theme for 2026 is "AI: The Multiplier." The summit explores how organizations can move beyond AI experimentation to unlock greater value, accelerate innovation, and achieve meaningful results at scale.',
  },
  {
    id: "item-3",
    question: "When and where will the summit take place?",
    answer:
      "The summit will take place on 12 November 2026 at the Cinnamon Grand Colombo, Sri Lanka.",
  },
  {
    id: "item-4",
    question: "Who should attend the AI Asia Summit?",
    answer:
      "The summit is ideal for business leaders, C-suite executives, technology professionals, AI and data practitioners, entrepreneurs, policymakers, academics, researchers, and anyone interested in the business and practical applications of AI.",
  },
  {
    id: "item-5",
    question: "What topics will be covered at the summit?",
    answer:
      "Key topics include AI economics and ROI, AI FinOps and cost governance, autonomous AI agents and multi-agent systems, AI-ready organizational cultures, responsible AI, and emerging AI trends. The programme will also feature industry-focused discussions across finance and insurance, healthcare and life sciences, and manufacturing and supply chain.",
  },
  {
    id: "item-6",
    question: "How can I register for the summit?",
    answer:
      "You can register online through the official event registration page at slasscom.glueup.com/event/ai-asia-summit-2026-193153/",
  },
  {
    id: "item-7",
    question: "What ticket categories are available?",
    answer:
      "Different ticket categories and registration options are available for attendees. Please visit the official registration page to view the applicable ticket types, prices, and available offers.",
  },
  {
    id: "item-8",
    question: "Are group or bundle registration offers available?",
    answer:
      "Yes, bundle registration offers are available. Please refer to the official registration page or contact the organizing team for details on the applicable packages and rates.",
  },
  {
    id: "item-9",
    question: "Can startups or SLASSCOM member companies access special rates?",
    answer:
      "Special rates may be available for eligible SLASSCOM startup category members. Please contact the organizing team to confirm eligibility and obtain the relevant registration details.",
  },
  {
    id: "item-10",
    question: "Will there be opportunities to network with industry professionals?",
    answer:
      "Yes. The summit brings together professionals, business leaders, technology experts, and innovators, providing opportunities to exchange ideas, build connections, and explore potential collaborations across the AI ecosystem.",
  },
  {
    id: "item-11",
    question: "Who is organizing the AI Asia Summit 2026?",
    answer:
      "The summit is organized by the Sri Lanka Association for Software and Services Companies (SLASSCOM), the national chamber representing Sri Lanka's IT and BPM industry.",
  },
  {
    id: "item-12",
    question: "Who can I contact for more information?",
    answer:
      "For registration inquiries, ticketing assistance, sponsorship opportunities, or general event information, please contact the SLASSCOM organizing team at corpoffice@slasscom.lk or through the official event website.",
  },
];

export const BlurredStagger = ({ text = "" }) => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.012 },
    },
  };

  const letterAnimation = {
    hidden: { opacity: 0, filter: "blur(8px)" },
    show: { opacity: 1, filter: "blur(0px)" },
  };

  return (
    <div className="w-full">
      <motion.p
        variants={container}
        initial="hidden"
        animate="show"
        className="text-sm leading-relaxed break-words whitespace-normal"
      >
        {text.split("").map((char, index) => (
          <motion.span
            key={index}
            variants={letterAnimation}
            transition={{ duration: 0.25 }}
            className="inline-block"
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
        ))}
      </motion.p>
    </div>
  );
};

export default function FAQSection() {
  return (
    <section className="faq-section container" id="faq">
      {/* Section Header */}
      <div className="faq-header">
        <div className="section-eyebrow-tag">
          <span className="eyebrow-dot" />
          <span>FAQ</span>
        </div>
        <h2 className="faq-title">Frequently Asked Questions</h2>
        <p className="faq-subtitle">
          Everything you need to know about the SLASSCOM AI Asia Summit 2026.
        </p>
      </div>

      {/* Two-column layout */}
      <div className="faq-grid">
        {/* Left: sticky context panel */}
        <div className="faq-context-panel">
          <div className="faq-context-icon-wrap">
            <MessageCircleQuestion size={28} style={{ color: "#E8B84B" }} />
          </div>
          <h3 className="faq-context-heading">Have more questions?</h3>
          <p className="faq-context-body">
            Can&apos;t find what you&apos;re looking for? Reach out to our
            organizing team directly.
          </p>
          <a
            href="mailto:corpoffice@slasscom.lk"
            className="faq-contact-link"
          >
            corpoffice@slasscom.lk
          </a>
          <a
            href="https://slasscom.glueup.com/event/ai-asia-summit-2026-193153/"
            target="_blank"
            rel="noreferrer"
            className="faq-register-btn"
          >
            Register Now →
          </a>
        </div>

        {/* Right: accordion */}
        <div className="faq-accordion-wrap">
          <Accordion type="single" collapsible>
            {faqItems.map((item) => (
              <AccordionItem
                key={item.id}
                value={item.id}
                className="faq-item"
              >
                <AccordionTrigger className="faq-trigger">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="faq-content">
                  <BlurredStagger text={item.answer} />
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
