"use client";
import React from "react";
import { motion } from "framer-motion";
import { LampContainer } from "@/components/ui/lamp";
import { ArrowRight, Calendar } from "lucide-react";

// Standard Aceternity Lamp Demo
export function LampDemo() {
  return (
    <LampContainer>
      <motion.h1
        initial={{ opacity: 0.5, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className="mt-8 bg-gradient-to-br from-slate-300 to-slate-500 py-4 bg-clip-text text-center text-4xl font-medium tracking-tight text-transparent md:text-7xl"
      >
        Build lamps <br /> the right way
      </motion.h1>
    </LampContainer>
  );
}

// Tailored Hero Demo integrated with your Summit Pills & CTA buttons
export function SummitHeroLamp({
  onViewAgenda,
  onExplorePasses,
}: {
  onViewAgenda?: () => void;
  onExplorePasses?: () => void;
}) {
  return (
    <LampContainer className="min-h-[85vh]">
      {/* Title */}
      <motion.h1
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.2,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className="mt-8 bg-gradient-to-b from-white via-slate-200 to-slate-400 py-2 bg-clip-text text-center text-4xl font-extrabold tracking-tight text-transparent md:text-7xl"
      >
        AI: THE <span className="text-[#E8B84B] bg-gradient-to-r from-[#F5C842] to-[#E8B84B] bg-clip-text text-transparent">MULTIPLIER</span>
      </motion.h1>

      {/* Row 1: Event Date & Location Pills */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.4,
          duration: 0.7,
          ease: "easeInOut",
        }}
        className="mt-8 flex flex-wrap items-center justify-center gap-4"
      >
        <div className="inline-flex items-center rounded-full border border-white/15 bg-[#0B1530]/60 px-6 py-2.5 text-sm md:text-base font-semibold text-white shadow-xl backdrop-blur-md">
          <span>12th November 2026</span>
        </div>
        <div className="inline-flex items-center rounded-full border border-white/15 bg-[#0B1530]/60 px-6 py-2.5 text-sm md:text-base font-semibold text-white shadow-xl backdrop-blur-md">
          <span>Cinnamon Grand, Colombo</span>
        </div>
      </motion.div>

      {/* Row 2: Hero Action CTAs */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.55,
          duration: 0.7,
          ease: "easeInOut",
        }}
        className="mt-6 flex flex-wrap items-center justify-center gap-4"
      >
        <a
          href="#tickets"
          onClick={onExplorePasses}
          className="inline-flex items-center gap-2 rounded-lg border border-white/20 bg-white/5 px-6 py-3 text-sm font-bold uppercase tracking-wider text-white backdrop-blur-md transition-all hover:bg-white/15 hover:border-white hover:-translate-y-0.5 cursor-pointer"
        >
          <ArrowRight className="h-4 w-4" />
          <span>EXPLORE PASSES</span>
        </a>

        <button
          onClick={onViewAgenda}
          className="inline-flex items-center gap-2 rounded-lg border border-[#E8B84B]/40 bg-white/5 px-6 py-3 text-sm font-bold uppercase tracking-wider text-[#E8B84B] backdrop-blur-md transition-all hover:bg-[#E8B84B]/10 hover:border-[#E8B84B] hover:-translate-y-0.5 cursor-pointer"
        >
          <Calendar className="h-4 w-4 text-[#E8B84B]" />
          <span>VIEW AGENDA</span>
        </button>
      </motion.div>
    </LampContainer>
  );
}
