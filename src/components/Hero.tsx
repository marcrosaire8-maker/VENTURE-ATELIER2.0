/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';

interface WebsiteProps {
  backgroundUrl: string;
  onStartAssistant: () => void;
}

const ATELIER_STEPS = [
  {
    letter: 'A',
    title: 'Analyze',
    subtitle: 'Understanding Your Brand Before Building It',
    description: 'Every strong brand starts with clarity. We begin by studying your business, audience, industry, and current digital presence.',
    items: ['Brand identity', 'Audience behaviour', 'Market position', 'Competitors', 'Current digital presence'],
    outcome: 'Brand Analysis Report'
  },
  {
    letter: 'T',
    title: 'Transform',
    subtitle: 'Turning Insights Into Strategy',
    description: 'We transform research into a clear direction for your brand. We define how your brand communicates and what makes it different.',
    items: ['Brand positioning', 'Brand voice', 'Messaging strategy', 'Content direction', 'Audience strategy'],
    outcome: 'Brand Strategy Blueprint'
  },
  {
    letter: 'E',
    title: 'Execute',
    subtitle: 'Bringing Your Vision To Life',
    description: 'Strategy becomes action. We create intentional content and creative assets designed to educate, attract, and convert your audience.',
    items: ['Content pillars', 'Monthly content calendars', 'Social media campaigns', 'Creative concepts', 'Captions and copy'],
    outcome: 'Content Growth System'
  },
  {
    letter: 'L',
    title: 'Leverage',
    subtitle: 'Expanding Your Brand Presence',
    description: 'A great brand needs visibility. We help your brand reach the right audience through consistent publishing and engagement.',
    items: ['Content distribution', 'Audience engagement', 'Community growth', 'Brand awareness'],
    outcome: 'Audience Growth Strategy'
  },
  {
    letter: 'I',
    title: 'Improve',
    subtitle: 'Using Data To Grow Smarter',
    description: 'Growth requires constant refinement. We measure performance and use insights to improve your strategy.',
    items: ['Reach', 'Engagement', 'Audience growth', 'Content performance', 'Leads'],
    outcome: 'Monthly Growth Report'
  },
  {
    letter: 'E',
    title: 'Expand',
    subtitle: 'Scaling Your Digital Presence',
    description: 'As your brand develops, your strategy evolves. We identify new opportunities to increase your impact.',
    items: ['Growth opportunities', 'Campaign strategies', 'Stronger brand systems', 'Long-term plans'],
    outcome: 'Expansion Roadmap'
  },
  {
    letter: 'R',
    title: 'Refine',
    subtitle: 'Creating Brands That Stay Relevant',
    description: 'The strongest brands continuously improve. We refine your strategy and creative direction to keep your brand competitive.',
    items: ['Visual identity', 'Brand messaging', 'Content approach', 'Customer connection'],
    outcome: 'Evolving Brand System'
  }
];

export default function VentureAtelierSite({ backgroundUrl, onStartAssistant }: WebsiteProps) {
  return (
    <div className="bg-[#050505] text-white selection:bg-[#d4af37]/30">
      
      {/* PERSISTENT BACKGROUND IMAGE - This stays behind everything */}
      <div className="fixed inset-0 z-0">
        <div 
          className="absolute inset-0 bg-cover bg-center transition-all duration-1000 scale-105 opacity-30"
          style={{ backgroundImage: `url(${backgroundUrl})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/60 via-[#050505]/90 to-[#050505]" />
      </div>

      {/* HERO SECTION */}
      <section className="relative z-10 min-h-screen flex flex-col items-center justify-center text-center px-6 pt-20">
        <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/5 backdrop-blur-md border border-white/10 text-[10px] font-mono text-[#d4af37] tracking-[0.3em] uppercase mb-10">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Venture Atelier &bull; Premium Brand Studio</span>
        </div>

        <h1 className="font-display font-light text-5xl sm:text-7xl md:text-8xl tracking-tight text-white mb-8 leading-[1.1]">
          Scaling dreams <br />
          <span className="font-serif italic font-normal text-[#d4af37]">into dollars.</span>
        </h1>

        <p className="font-sans font-light text-base sm:text-xl text-zinc-400 max-w-3xl leading-relaxed mb-12">
          We empower <strong className="text-white font-medium">entrepreneurs</strong>, creators, and authority leaders to transform high-level concepts into sovereign commercial success.
        </p>

        <button onClick={onStartAssistant} className="group relative px-10 py-5 rounded-full bg-white text-black font-bold text-xs tracking-[0.2em] uppercase transition-all duration-500 hover:bg-[#d4af37] flex items-center gap-3">
          Start Your Architecture
          <ArrowRight className="w-4 h-4 transition-transform duration-500 group-hover:translate-x-2" />
        </button>
      </section>

      {/* THE ATELIER METHOD™ SECTION */}
      <section className="relative z-10 py-24 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-24">
          <h2 className="text-[#d4af37] font-mono text-xs tracking-[0.4em] uppercase mb-4">The ATELIER Method™</h2>
          <h3 className="text-4xl md:text-6xl font-display font-light mb-8">Our Signature Brand Growth System</h3>
          <p className="max-w-2xl mx-auto text-zinc-400 text-lg font-light leading-relaxed">
            At Venture Atelier, we believe successful brands are not built through random content or trends. 
            They are built through strategy, creativity, and consistent execution.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-1 gap-12">
          {ATELIER_STEPS.map((step, index) => (
            <div 
              key={index} 
              className="group relative flex flex-col md:flex-row gap-8 p-8 rounded-2xl bg-white/[0.02] border border-white/5 backdrop-blur-sm transition-all duration-500 hover:bg-white/[0.04] hover:border-[#d4af37]/30"
            >
              {/* Visual Letter Highlight */}
              <div className="flex-shrink-0 flex items-center justify-center">
                <span className="text-7xl md:text-9xl font-serif italic text-[#d4af37] opacity-20 group-hover:opacity-100 transition-opacity duration-700">
                  {step.letter}
                </span>
              </div>

              <div className="flex-grow">
                <div className="flex flex-col mb-4">
                  <h4 className="text-2xl font-display text-white mb-1 uppercase tracking-widest">{step.title}</h4>
                  <p className="text-[#d4af37] font-sans text-sm font-medium tracking-wide">{step.subtitle}</p>
                </div>
                
                <p className="text-zinc-400 font-light mb-6 leading-relaxed max-w-2xl">
                  {step.description}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                  {step.items.map((item, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-zinc-300 uppercase tracking-tighter">
                      <div className="w-1 h-1 rounded-full bg-[#d4af37]" />
                      {item}
                    </div>
                  ))}
                </div>

                <div className="inline-block px-4 py-2 rounded-lg bg-[#d4af37]/10 border border-[#d4af37]/20">
                  <span className="text-[10px] text-[#d4af37] font-mono uppercase tracking-widest block mb-1">Outcome</span>
                  <span className="text-white font-serif italic">{step.outcome}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CLOSING CTA */}
        <div className="mt-32 text-center p-12 rounded-3xl bg-gradient-to-b from-white/[0.05] to-transparent border border-white/10 backdrop-blur-md">
          <h3 className="text-3xl md:text-5xl font-display font-light mb-6">Ready to Build Your Brand?</h3>
          <p className="text-zinc-400 mb-10 max-w-xl mx-auto">Transform your vision into a brand designed for growth.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-4 rounded-full bg-[#d4af37] text-black font-bold text-[10px] tracking-widest uppercase transition-transform hover:scale-105">
              Start Your Journey
            </button>
            <button className="px-8 py-4 rounded-full bg-transparent border border-white/20 text-white font-bold text-[10px] tracking-widest uppercase hover:bg-white hover:text-black transition-all">
              Book a Discovery Call
            </button>
          </div>
        </div>
      </section>

      <footer className="relative z-10 py-10 text-center text-zinc-600 text-[10px] tracking-widest uppercase">
        &copy; {new Date().getFullYear()} Venture Atelier &bull; All Rights Reserved
      </footer>
    </div>
  );
}
