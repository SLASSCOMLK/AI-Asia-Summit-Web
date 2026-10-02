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
      title: "The Economics of AI in 2026",
      description:
        "Achieving ROI through efficient AI infrastructure and Small Language Models (SLMs).",
      tags: ["AI Infrastructure", "SLMs", "ROI"],
      track: "Economic Strategy Track",
    },
    {
      icon: ShieldCheck,
      pillar: "Pillar 02",
      title: "Beyond the Hype: Real ROI and Cost Governance",
      description:
        "AI FinOps, implementation costs, governance, and sustainable AI adoption.",
      tags: ["AI FinOps", "Governance", "Cost Management"],
      track: "Governance Track",
    },
    {
      icon: Sparkles,
      pillar: "Pillar 03",
      title: "The Agentic Age",
      description:
        "The evolution from prompt-based interactions to autonomous AI agents and multi-agent systems.",
      tags: ["Autonomous Agents", "Multi-Agent Systems", "Evolution"],
      track: "Frontier Tech Track",
    },
    {
      icon: Users,
      pillar: "Pillar 04",
      title: "Building an AI-Ready Culture",
      description:
        "Workforce transformation, responsible AI, and human-AI collaboration.",
      tags: ["Workforce Transformation", "Responsible AI", "Human-AI Collaboration"],
      track: "Human Systems Track",
    },
    {
      icon: Globe,
      pillar: "Pillar 05",
      title: "The Next Frontier",
      description:
        "Emerging AI trends, digital sovereignty, and what organizations can expect in 2027 and beyond.",
      tags: ["Emerging Trends", "Digital Sovereignty", "Future of AI"],
      track: "Future Outlook Track",
    },
    {
      icon: Zap,
      pillar: "Pillar 06",
      title: "Industry-Focused Breakout Sessions",
      description:
        "Covering Finance & Insurance, Healthcare & Life Sciences, and Manufacturing & Supply Chain.",
      tags: ["Finance & Insurance", "Healthcare", "Manufacturing"],
      track: "Industry Breakouts Track",
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