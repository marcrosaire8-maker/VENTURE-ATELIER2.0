/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef } from 'react';
import { ArrowRight, Sparkles, CheckCircle2, ChevronRight } from 'lucide-react';

interface AtelierProps {
  backgroundUrl: string; // The administrator's image
  onStartAssistant?: () => void;
}

const ATELIER_DATA = [
  {
    letter: 'A',
    title: 'Analyze',
    subtitle: 'Understanding Your Brand Before Building It',
    description: 'Every strong brand starts with clarity. We begin by studying your business, audience, industry, and current digital presence to identify opportunities and create a strong foundation.',
    analysis: ['Brand identity', 'Audience behaviour', 'Market position', 'Competitors', 'Current digital presence'],
    outcome: 'Brand Analysis Report'
  },
  {
    letter: 'T',
    title: 'Transform',
    subtitle: 'Turning Insights Into Strategy',
    description: 'We transform research into a clear direction for your brand. We define how your brand communicates, who it serves, and what makes it different.',
    analysis: ['Brand positioning', 'Brand voice', 'Messaging strategy', 'Content direction', 'Audience strategy'],
    outcome: 'Brand Strategy Blueprint'
  },
  {
    letter: 'E',
    title: 'Execute',
    subtitle: 'Bringing Your Vision To Life',
    description: 'Strategy becomes action. We create intentional content and creative assets designed to educate, attract, and convert your audience.',
    analysis: ['Content pillars', 'Monthly content calendars', 'Social media campaigns', 'Creative concepts', 'Captions and copy', 'Visual direction'],
    outcome: 'Content Growth System'
  },
  {
    letter: 'L',
    title: 'Leverage',
    subtitle: 'Expanding Your Brand Presence',
    description: 'A great brand needs visibility. We help your brand reach the right audience through consistent publishing, engagement, and community building.',
    analysis: ['Content distribution', 'Audience engagement', 'Community growth', 'Brand awareness'],
    outcome: 'Audience Growth Strategy'
  },
  {
    letter: 'I',
    title: 'Improve',
    subtitle: 'Using Data To Grow Smarter',
    description: 'Growth requires constant refinement. We measure performance and use insights to improve your strategy.',
    analysis: ['Reach', 'Engagement', 'Audience growth', 'Content performance', 'Leads'],
    outcome: 'Monthly Growth Report'
  },
  {
    letter: 'E',
    title: 'Expand',
    subtitle: 'Scaling Your Digital Presence',
    description: 'As your brand develops, your strategy evolves. We identify new opportunities to increase your impact and strengthen your market presence.',
    analysis: ['Growth opportunities', 'Campaign strategies', 'Stronger brand systems', 'Long-term plans'],
    outcome: 'Expansion Roadmap'
  },
  {
    letter: 'R',
    title: 'Refine',
    subtitle: 'Creating Brands That Stay Relevant',
    description: 'The strongest brands continuously improve. We refine your strategy, communication, and creative direction to keep your brand consistent and competitive.',
    analysis: ['Visual identity', 'Brand messaging', 'Content approach', 'Customer connection'],
    outcome: 'Evolving Brand System'
  }
];

export default function VentureAtelierMethod({ backgroundUrl, onStartAssistant }: AtelierProps) {
  return (
    <div className="relative min-h-screen bg-[#050505] text-white overflow-x-hidden font-sans selection:bg-[#d4af37]/30">
      
      {/* 
          STRICT BACKGROUND INSTRUCTION: 
          The administrator's image remains fixed and always in the background.
      */}
      <div 
        className="fixed inset-0 z-0 bg-cover bg-center pointer-events-none opacity-60 transition-opacity duration-1000"
        style={{ backgroundImage: `url(${backgroundUrl})` }}
      />
      <div className="fixed inset-0 z-0 bg-gradient-to-b from-[#050505]/40 via-[#050505]/80 to-[#050505] pointer-events-none" />

      {/* CONTENT LAYER */}
      <div className="relative z-10">
        
        {/* HERO SECTION */}
        <section className="min-h-screen flex flex-col items-center justify-center px-6 text-center pt-20">
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 text-[10px] font-mono text-[#d4af37] tracking-[0.4em] uppercase mb-12 animate-fade-in">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Venture Atelier &bull; Premium Brand Studio</span>
          </div>

          <h1 className="font-display font-light text-5xl sm:text-7xl md:text-8xl tracking-tight text-white mb-8 leading-[1.1]">
            Scaling dreams <br />
            <span className="font-serif italic font-normal text-[#d4af37]">into dollars.</span>
          </h1>

          <p className="font-sans font-light text-base sm:text-xl text-zinc-400 max-w-3xl leading-relaxed mb-12 opacity-80">
            We empower entrepreneurs, creators, and authority leaders to transform high-level concepts into sovereign commercial success.
          </p>

          <button 
            onClick={onStartAssistant}
            className="group relative px-12 py-5 rounded-full bg-white text-black font-bold text-[11px] tracking-[0.25em] uppercase transition-all duration-500 hover:bg-[#d4af37] hover:scale-105 flex items-center gap-4"
          >
            Start Your Architecture
            <ArrowRight className="w-4 h-4 transition-transform duration-500 group-hover:translate-x-2" />
          </button>
        </section>

        {/* THE ATELIER METHOD SECTION */}
        <section className="py-32 px-6 max-w-7xl mx-auto">
          <div className="text-center mb-32">
            <h2 className="text-[#d4af37] font-mono text-[11px] tracking-[0.5em] uppercase mb-6">The ATELIER Method™</h2>
            <h3 className="text-4xl md:text-6xl font-display font-light mb-8 tracking-tight">Our Signature Brand Growth System</h3>
            <p className="max-w-3xl mx-auto text-zinc-400 text-lg font-light leading-relaxed">
              At Venture Atelier, we believe successful brands are not built through random content or trends. 
              They are built through strategy, creativity, and consistent execution.
            </p>
          </div>

          {/* TIMELINE / CARDS */}
          <div className="space-y-24 relative">
            {/* Vertical connector line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-[#d4af37]/0 via-[#d4af37]/20 to-[#d4af37]/0 hidden md:block" />

            {ATELIER_DATA.map((step, index) => (
              <div 
                key={index} 
                className={`flex flex-col md:flex-row items-center gap-12 group ${index % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}
              >
                {/* Letter Highlight */}
                <div className="md:w-1/2 flex justify-center">
                  <div className="relative">
                    <span className="text-[12rem] md:text-[16rem] font-serif italic text-white/5 group-hover:text-[#d4af37]/10 transition-colors duration-1000 select-none">
                      {step.letter}
                    </span>
                    <div className="absolute inset-0 flex items-center justify-center">
                       <h4 className="text-2xl md:text-4xl font-display tracking-widest uppercase text-white mt-12">{step.title}</h4>
                    </div>
                  </div>
                </div>

                {/* Content Card */}
                <div className="md:w-1/2">
                  <div className="p-8 md:p-12 rounded-3xl bg-white/[0.03] backdrop-blur-2xl border border-white/10 hover:border-[#d4af37]/40 transition-all duration-700">
                    <p className="text-[#d4af37] font-mono text-[10px] tracking-[0.3em] uppercase mb-4">{step.subtitle}</p>
                    <p className="text-zinc-300 font-light text-lg mb-8 leading-relaxed">
                      {step.description}
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
                      {step.analysis.map((item, i) => (
                        <div key={i} className="flex items-center gap-3 text-[10px] text-zinc-500 uppercase tracking-widest group-hover:text-zinc-200 transition-colors">
                          <div className="w-1 h-1 rounded-full bg-[#d4af37]/60" />
                          {item}
                        </div>
                      ))}
                    </div>

                    <div className="flex flex-col gap-1 border-t border-white/5 pt-6">
                      <span className="text-[9px] text-[#d4af37] font-mono uppercase tracking-[0.4em]">Outcome</span>
                      <span className="text-white font-serif italic text-xl">{step.outcome}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* FINAL CTA */}
          <div className="mt-48 text-center bg-white/[0.02] border border-white/5 backdrop-blur-3xl p-16 md:p-24 rounded-[3rem]">
            <h3 className="text-4xl md:text-6xl font-display font-light mb-8">Ready to Build Your Brand?</h3>
            <p className="text-zinc-400 mb-12 max-w-xl mx-auto text-lg">
              Transform your vision into a brand designed for growth. Let's build your legacy.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button className="px-10 py-5 rounded-full bg-white text-black font-bold text-[11px] tracking-widest uppercase hover:bg-[#d4af37] transition-all">
                Start Your Journey
              </button>
              <button className="px-10 py-5 rounded-full bg-transparent border border-white/20 text-white font-bold text-[11px] tracking-widest uppercase hover:bg-white/10 transition-all">
                Book a Discovery Call
              </button>
            </div>
          </div>
        </section>

        <footer className="py-12 border-t border-white/5 text-center">
           <p className="text-zinc-600 text-[9px] tracking-[0.6em] uppercase">Venture Atelier &copy; 2024 &bull; Signature Framework</p>
        </footer>

      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500&family=Inter:wght@200;300;400;600&family=Playfair+Display:ital,wght@0,400;1,400&display=swap');
        
        .font-display { font-family: 'Cinzel', serif; }
        .font-serif { font-family: 'Playfair Display', serif; }
        .font-sans { font-family: 'Inter', sans-serif; }

        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in { animation: fade-in 1.2s ease-out forwards; }
      `}</style>
    </div>
  );
}
