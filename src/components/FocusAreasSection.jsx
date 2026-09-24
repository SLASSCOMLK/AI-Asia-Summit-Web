import React from 'react';
import {
  Layers,
  Cpu,
  ShieldCheck,
  Sparkles,
  Users,
  Globe,
  Zap,
} from 'lucide-react';
import ScrollFloat from './ScrollFloat';
import { FeaturesGrid } from './ui/features-grid';

export default function FocusAreasSection() {
  const thematicPillars = [
    {
      icon: Cpu,
      pillar: "Pillar 01",
      title: "AI in Engineering",
      description:
        "Deploying advanced machine intelligence across software engineering, automated testing pipelines, algorithmic architecture, and next-gen enterprise infrastructure.",
      tags: ["MLOps & Pipelines", "Automated Infra", "Algorithmic Systems"],
      track: "Technical & Systems Track",
    },
    {
      icon: ShieldCheck,
      pillar: "Pillar 02",
      title: "Governance & Security of AI",
      description:
        "Establishing trustworthy ethical AI frameworks, sovereign data privacy compliance, autonomous risk management, and mission-critical cybersecurity defense.",
      tags: ["Ethical AI", "Privacy & Risk", "Cyber Defense"],
      track: "Policy & Governance Track",
    },
    {
      icon: Sparkles,
      pillar: "Pillar 03",
      title: "Emerging AI Technologies",
      description:
        "Exploring breakthrough developments in frontier multimodal Generative AI, Large Language Models, self-directed agentic swarms, and cognitive robotics.",
      tags: ["Multimodal GenAI", "Agentic Systems", "Cognitive Robotics"],
      track: "Frontier Research Track",
    },
    {
      icon: Users,
      pillar: "Pillar 04",
      title: "Human-Centric AI",
      description:
        "Designing intuitive, accessible, and transparent artificial intelligence systems that augment human ingenuity, workforce potential, and strategic decision-making.",
      tags: ["Human Augmentation", "Explainable AI", "Cognitive UX"],
      track: "Human Systems Track",
    },
    {
      icon: Globe,
      pillar: "Pillar 05",
      title: "AI for Economic & Societal Impact",
      description:
        "Accelerating cross-industry digital transformation to elevate national economic resilience, regional competitiveness, and sustainable societal prosperity.",
      tags: ["Macro-Economics", "Regional Strategy", "Societal Tech"],
      track: "Socio-Economic Track",
    },
    {
      icon: Zap,
      pillar: "Pillar 06",
      title: "Enterprise AI Transformation",
      description:
        "Scaling operational AI capabilities across enterprise business units, unlocking tangible ROI, automated workflows, and agile organizational readiness.",
      tags: ["Enterprise ROI", "Workflow Automation", "Adoption Strategy"],
      track: "Executive Leadership Track",
    },
  ];

  return (
    <section className="focus-areas-section container" id="focus-areas">
      <div className="focus-header">
        <div className="focus-badge">
          <Layers size={14} style={{ color: '#E8B84B' }} />
          <span>AI THE MULTIPLIER • 2026 SUMMIT AGENDA</span>
        </div>
        <ScrollFloat containerClassName="focus-main-title">
          Thematic Focus Areas
        </ScrollFloat>
        <p className="focus-subtitle">
          Six strategic pillars exploring artificial intelligence as the catalyst for transformative economic, technological, and enterprise innovation across Asia.
        </p>
      </div>

      <div className="thematic-features-wrapper">
        <FeaturesGrid
          title=""
          subtitle=""
          features={thematicPillars}
          className="py-2 px-0"
        />
      </div>
    </section>
  );
}