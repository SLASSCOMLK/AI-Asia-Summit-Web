import React, { useState } from 'react';
import { ArrowLeft, Sparkles, ExternalLink } from 'lucide-react';
import ScrollTimeline from './ui/scroll-timeline';
import { agendaSchedule } from '../data/agendaData';

const REGISTRATION_URL = 'https://slasscom.glueup.com/event/ai-asia-summit-2026-193153/';

export default function AgendaPage({ onBackToHome }) {
  const [filter, setFilter] = useState('all');

  const filteredMilestones = agendaSchedule.filter((item) => {
    if (filter === 'all') return true;
    if (filter === 'keynotes') return item.category === 'keynote';
    if (filter === 'tracks') return item.category === 'track';
    if (filter === 'masterclass') return item.category === 'masterclass' || item.category === 'panel';
    if (filter === 'networking') return item.category === 'break';
    return true;
  });

  return (
    <div className="min-h-screen bg-[#0C0A08] text-white selection:bg-[#E8B84B] selection:text-black">
      {/* Top Navbar */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-[#0C0A08]/80 border-b border-[rgba(232,184,75,0.15)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={onBackToHome}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider text-neutral-300 hover:text-[#E8B84B] bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#E8B84B]/40 transition-all duration-200 cursor-pointer"
            >
              <ArrowLeft size={14} />
              <span>Back to Home</span>
            </button>
            <a href="#" onClick={(e) => { e.preventDefault(); onBackToHome(); }} className="flex items-center">
              <img src="/logo-white.png" alt="AI Asia Summit 2026" className="h-8 md:h-10 w-auto opacity-90 hover:opacity-100 transition-opacity" />
            </a>
          </div>
          <div className="flex items-center gap-3">
            <a
              href={REGISTRATION_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider text-[#0C0A08] bg-gradient-to-r from-[#E8B84B] to-[#D4B05A] hover:brightness-110 shadow-[0_0_20px_rgba(232,184,75,0.3)] transition-all duration-200"
            >
              <span>Register Now</span>
            </a>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section 
        style={{
          position: 'relative',
          paddingTop: '4rem',
          paddingBottom: '3rem',
          paddingLeft: '1.5rem',
          paddingRight: '1.5rem',
          overflow: 'hidden',
          textAlign: 'center'
        }}
      >
        {/* Glow behind header */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[radial-gradient(ellipse,rgba(232,184,75,0.08)_0%,transparent_70%)] pointer-events-none -z-10" />

        <div style={{ maxWidth: '860px', margin: '0 auto', textAlign: 'center' }}>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#E8B84B]/30 bg-[#E8B84B]/10 text-xs font-semibold tracking-widest text-[#E8B84B] uppercase mb-6">
            <Sparkles size={13} />
            <span>Summit Programme • 2026</span>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white mb-6">
            Conference Agenda
          </h1>

          <p className="max-w-2xl mx-auto text-sm sm:text-base text-neutral-300 leading-relaxed mb-6">
            A comprehensive, single-day immersive summit exploring real-world AI economics, frontier agentic systems, enterprise scale, biomedical AI, and governance across Asia.
          </p>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-10">
            {[
              { id: 'all', label: 'All Sessions (17)' },
              { id: 'keynotes', label: 'Keynotes' },
              { id: 'tracks', label: 'Parallel Tracks' },
              { id: 'masterclass', label: 'Masterclasses & Panels' },
              { id: 'networking', label: 'Breaks & Networking' }
            ].map((btn) => (
              <button
                key={btn.id}
                onClick={() => setFilter(btn.id)}
                className={`px-4 py-1.5 rounded-full text-xs font-medium tracking-wide transition-all duration-200 cursor-pointer ${
                  filter === btn.id
                    ? 'bg-[#E8B84B] text-[#0C0A08] font-bold shadow-[0_0_14px_rgba(232,184,75,0.4)]'
                    : 'bg-white/5 text-neutral-300 hover:text-white hover:bg-white/10 border border-white/10'
                }`}
              >
                {btn.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Scroll Timeline Section */}
      <section className="relative pb-24">
        <ScrollTimeline milestones={filteredMilestones} />
      </section>

      {/* CTA Bottom Banner */}
      <section className="max-w-4xl mx-auto px-4 pb-20">
        <div className="relative rounded-3xl p-8 sm:p-12 text-center bg-gradient-to-b from-white/[0.06] to-transparent border border-white/10 overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-1/4 w-72 h-72 bg-[#E8B84B]/10 rounded-full blur-3xl pointer-events-none" />
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
            Be Part of Asia's Premier AI Gathering
          </h2>
          <p className="text-neutral-400 text-sm sm:text-base max-w-xl mx-auto mb-8">
            Network with over 500+ global technologists, enterprise decision-makers, and innovators at the flagship summit.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href={REGISTRATION_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold uppercase tracking-wider text-[#0C0A08] bg-gradient-to-r from-[#E8B84B] to-[#D4B05A] hover:brightness-110 shadow-[0_0_25px_rgba(232,184,75,0.4)] transition-all duration-200"
            >
              <span>Register Now</span>
              <ExternalLink size={15} />
            </a>
            <button
              onClick={onBackToHome}
              className="px-6 py-3 rounded-full text-sm font-semibold tracking-wider text-neutral-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-all duration-200 cursor-pointer"
            >
              Back to Home
            </button>
          </div>
        </div>
      </section>


    </div>
  );
}
