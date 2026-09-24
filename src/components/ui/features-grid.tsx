import * as React from "react";
import {
  Code,
  LayoutGrid,
  Palette,
  Sparkles,
  Terminal,
  Zap,
  ArrowUpRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

const demoFeatures = [
  {
    icon: Sparkles,
    pillar: "Pillar 01",
    title: "Animations & Effects",
    description:
      "Border Beam, text effects and other animations for modern interfaces.",
    tags: ["UI / UX", "Micro-Interactions", "Motion"],
    track: "Design Track",
  },
  {
    icon: Zap,
    pillar: "Pillar 02",
    title: "Instant Installation",
    description:
      "One CLI command — and the component is in your project. No package dependencies.",
    tags: ["CLI", "Zero Config", "Modular"],
    track: "Architecture Track",
  },
  {
    icon: Code,
    pillar: "Pillar 03",
    title: "Full Control",
    description:
      "Code is copied to your project. Modify anything without restrictions.",
    tags: ["Open Source", "Customizable", "Clean Code"],
    track: "Engineering Track",
  },
  {
    icon: Palette,
    pillar: "Pillar 04",
    title: "Flexible Styling",
    description:
      "Tailwind CSS and CSS variables for easy customization to match your brand.",
    tags: ["Tailwind", "CSS Tokens", "Dark Mode"],
    track: "Design Systems",
  },
  {
    icon: LayoutGrid,
    pillar: "Pillar 05",
    title: "Ready-made Blocks",
    description:
      "Sections for landing pages, forms, cards — assemble pages like building blocks.",
    tags: ["Layouts", "Pre-built", "Responsive"],
    track: "Product Track",
  },
  {
    icon: Terminal,
    pillar: "Pillar 06",
    title: "shadcn CLI",
    description: "Full compatibility with shadcn CLI. Use familiar commands.",
    tags: ["shadcn", "Registry", "Components"],
    track: "Ecosystem Track",
  },
];

interface Feature {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  pillar?: string;
  tags?: string[];
  track?: string;
}

interface FeaturesGridProps {
  title?: string;
  subtitle?: string;
  features?: Feature[];
  className?: string;
}

function FeatureCard({
  icon: Icon,
  title,
  description,
  pillar,
  tags = [],
  track = "Core Thematic Session",
}: Feature) {
  return (
    <div className="group relative rounded-2xl border border-amber-400/25 bg-gradient-to-b from-[#1d1712]/95 via-[#15110d]/95 to-[#0f0c0a]/98 p-8 md:p-10 flex flex-col justify-between min-h-[460px] transition-all duration-300 hover:-translate-y-2 hover:border-amber-400/60 hover:shadow-[0_20px_50px_rgba(232,184,75,0.18)] backdrop-blur-2xl">
      {/* Subtle top corner ambient glow */}
      <div className="pointer-events-none absolute -top-12 -right-12 size-36 rounded-full bg-amber-400/8 blur-3xl transition-opacity duration-300 group-hover:bg-amber-400/20" />

      <div>
        {/* Top Header: Enlarged Icon + Pillar Badge */}
        <div className="mb-7 flex items-center justify-between">
          <div className="flex size-16 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-400/20 to-amber-600/5 border border-amber-400/35 shadow-[0_0_24px_rgba(232,184,75,0.18)] transition-transform duration-300 group-hover:scale-105 group-hover:border-amber-400/70">
            <Icon className="size-8 text-[#E8B84B]" />
          </div>

          {pillar && (
            <span className="inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-400/10 px-3.5 py-1.5 font-mono text-xs font-semibold uppercase tracking-wider text-[#E8B84B] shadow-[0_0_12px_rgba(232,184,75,0.1)]">
              <span className="size-2 rounded-full bg-[#E8B84B] animate-pulse" />
              {pillar}
            </span>
          )}
        </div>

        {/* Title */}
        <h3 className="mb-4 text-2xl font-bold tracking-tight text-white transition-colors duration-200 group-hover:text-[#F5C842]">
          {title}
        </h3>

        {/* Description: spacious, comfortable line-height and typography */}
        <p className="text-[1.02rem] leading-[1.8] text-slate-300/90 font-normal mb-8">
          {description}
        </p>

        {/* Tags / Sub-elements */}
        {tags && tags.length > 0 && (
          <div className="mb-8 flex flex-wrap gap-2.5">
            {tags.map((tag) => (
              <span
                key={tag}
                className="rounded-lg border border-white/12 bg-white/[0.04] px-3.5 py-1.5 text-xs font-medium text-slate-300 transition-colors group-hover:border-amber-400/30 group-hover:text-amber-200 group-hover:bg-amber-400/[0.06]"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Card Footer: Track & Interactive Arrow */}
      <div className="mt-auto pt-5 border-t border-amber-400/15 flex items-center justify-between text-xs text-slate-400 group-hover:text-slate-300">
        <span className="font-medium tracking-wide flex items-center gap-2 text-slate-400 group-hover:text-[#E8B84B] transition-colors">
          <span className="size-2 rounded-full bg-amber-400/70" />
          {track}
        </span>
        <div className="flex size-8 items-center justify-center rounded-full bg-white/5 border border-white/10 text-slate-400 transition-all duration-200 group-hover:border-amber-400/50 group-hover:bg-amber-400/15 group-hover:text-[#F5C842] group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
          <ArrowUpRight size={15} />
        </div>
      </div>
    </div>
  );
}

export function FeaturesGrid({
  title = "Everything for Modern Development",
  subtitle = "Components that save time and help you build quality products",
  features = demoFeatures,
  className,
}: FeaturesGridProps) {
  return (
    <section className={cn("py-8 px-2 md:px-4", className)}>
      <div className="mx-auto max-w-[1400px]">
        {title && (
          <div className="mb-14 text-center">
            <h2 className="text-3xl font-bold tracking-tight md:text-5xl text-foreground">
              {title}
            </h2>
            {subtitle && (
              <p className="mx-auto mt-4 max-w-3xl text-lg text-muted-foreground leading-relaxed">
                {subtitle}
              </p>
            )}
          </div>
        )}

        <div className="grid gap-8 md:gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <FeatureCard key={feature.title} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
}

export type { Feature, FeaturesGridProps };
export default FeaturesGrid;