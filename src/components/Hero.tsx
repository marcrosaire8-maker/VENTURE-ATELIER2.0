/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ArrowRight, Sparkles, Orbit, Landmark, Compass } from 'lucide-react';

interface HeroProps {
  backgroundUrl: string;
  forgeImageUrl?: string;
  moonImageUrl?: string;
  lightImageUrl?: string;
  onStartAssistant: () => void;
}

export default function Hero({ 
  backgroundUrl, 
  forgeImageUrl, 
  moonImageUrl, 
  lightImageUrl, 
  onStartAssistant 
}: HeroProps) {
  return (
    <section 
      id="concept"
      className="relative min-h-[95vh] flex flex-col items-center justify-center text-center px-6 py-20 overflow-hidden bg-[#050505]"
    >
      {/* BACKGROUND IMAGE - L'image de l'admin est ici */}
      {backgroundUrl && (
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center transition-all duration-1000 transform scale-105 opacity-50"
          style={{ backgroundImage: `url('${backgroundUrl}')` }}
        />
      )}
      
      {/* Ambient Lighting Accents */}
      <div className="absolute top-1/4 left-1/3 w-80 h-80 rounded-full bg-[#d4af37]/10 blur-[120px] pointer-events-none animate-pulse z-[1]" />
      <div className="absolute bottom-1/3 right-1/4 w-96 h-96 rounded-full bg-blue-600/5 blur-[150px] pointer-events-none z-[1]" />

      {/* Dark Luxury Gradient Overlays - Assure la lisibilité au-dessus de l'image */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/20 via-[#050505]/80 to-[#050505] z-[2]" />

      {/* Core Hero Content Container */}
      <div className="relative z-10 max-w-5xl mx-auto flex flex-col items-center">
        
        {/* Studio Indicator Badge */}
        <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/5 backdrop-blur-md border border-white/10 text-[10px] font-mono text-[#d4af37] tracking-[0.3em] uppercase mb-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Venture Atelier &bull; Premium Brand Studio</span>
        </div>

        {/* Studio Large Title */}
        <h1 className="font-display font-light text-5xl sm:text-7xl md:text-8xl tracking-tight text-white mb-8 leading-[1.1] animate-in fade-in slide-in-from-bottom-8 duration-1000">
          Scaling dreams <br />
          <span className="font-serif italic font-normal text-[#d4af37]">into dollars.</span>
        </h1>

        {/* 5-Second Rule Sub-headline */}
        <p className="font-sans font-light text-base sm:text-xl text-zinc-400 max-w-3xl leading-relaxed mb-12 animate-in fade-in slide-in-from-bottom-10 duration-1000">
          We empower <strong className="text-white font-medium">entrepreneurs</strong>, creators, and authority leaders to transform high-level concepts into sovereign commercial success through Moonlight Architecture.
        </p>

        {/* Luxury CTA Group */}
        <div className="flex flex-col sm:flex-row gap-5 justify-center items-center animate-in fade-in zoom-in-95 duration-1000">
          <button
            onClick={onStartAssistant}
            className="group relative px-10 py-5 rounded-full bg-white text-black font-bold text-xs tracking-[0.2em] uppercase transition-all duration-500 hover:bg-[#d4af37] hover:scale-105 flex items-center gap-3 shadow-2xl shadow-white/5"
          >
            Start Your Architecture
            <ArrowRight className="w-4 h-4 transition-transform duration-500 group-hover:translate-x-2" />
          </button>
          
          <button
            onClick={() => {
              const el = document.getElementById('portfolio');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="px-10 py-5 rounded-full bg-white/5 backdrop-blur-md border border-white/10 text-white font-bold text-xs tracking-[0.2em] uppercase transition-all duration-500 hover:bg-white/10 hover:border-white/30"
          >
            Explore Case Studies
          </button>
        </div>

        {/* Quick Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full mt-24 text-left border-t border-white/5 pt-16">
          
          {/* Pillar 1: The Forge */}
          <div className="group relative flex flex-col bg-white/[0.02] backdrop-blur-xl rounded-2xl border border-white/5 hover:border-[#d4af37]/30 transition-all duration-500 p-5">
            {forgeImageUrl && (
              <div className="relative w-full aspect-[16/10] overflow-hidden rounded-xl mb-6 border border-white/5">
                <img 
                  src={forgeImageUrl} 
                  alt="The Forge" 
                  className="w-full h-full object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000 group-hover:scale-110"
                />
                <div className="absolute top-3 left-3 w-8 h-8 rounded-lg bg-black/60 backdrop-blur-md border border-white/10 flex items-center justify-center">
                  <Landmark className="w-4 h-4 text-[#d4af37]" />
                </div>
              </div>
            )}
            <h3 className="font-display font-semibold text-white text-xs uppercase tracking-[0.2em]">The Forge</h3>
            <p className="text-zinc-500 text-[11px] mt-2 leading-relaxed font-light">
              Brand strategy, authority positioning, and narrative engineering for elite offers.
            </p>
          </div>

          {/* Pillar 2: The Moon */}
          <div className="group relative flex flex-col bg-white/[0.02] backdrop-blur-xl rounded-2xl border border-white/5 hover:border-[#d4af37]/30 transition-all duration-500 p-5">
            {moonImageUrl && (
              <div className="relative w-full aspect-[16/10] overflow-hidden rounded-xl mb-6 border border-white/5">
                <img 
                  src={moonImageUrl} 
                  alt="The Moon" 
                  className="w-full h-full object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000 group-hover:scale-110"
                />
                <div className="absolute top-3 left-3 w-8 h-8 rounded-lg bg-black/60 backdrop-blur-md border border-white/10 flex items-center justify-center">
                  <Orbit className="w-4 h-4 text-[#d4af37]" />
                </div>
              </div>
            )}
            <h3 className="font-display font-semibold text-white text-xs uppercase tracking-[0.2em]">The Moon</h3>
            <p className="text-zinc-500 text-[11px] mt-2 leading-relaxed font-light">
              Celestial visual identities, luxury brand guidelines, and high-end interfaces.
            </p>
          </div>

          {/* Pillar 3: The Light */}
          <div className="group relative flex flex-col bg-white/[0.02] backdrop-blur-xl rounded-2xl border border-white/5 hover:border-[#d4af37]/30 transition-all duration-500 p-5">
            {lightImageUrl && (
              <div className="relative w-full aspect-[16/10] overflow-hidden rounded-xl mb-6 border border-white/5">
                <img 
                  src={lightImageUrl} 
                  alt="The Light" 
                  className="w-full h-full object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000 group-hover:scale-110"
                />
                <div className="absolute top-3 left-3 w-8 h-8 rounded-lg bg-black/60 backdrop-blur-md border border-white/10 flex items-center justify-center">
                  <Compass className="w-4 h-4 text-[#d4af37]" />
                </div>
              </div>
            )}
            <h3 className="font-display font-semibold text-white text-xs uppercase tracking-[0.2em]">The Light</h3>
            <p className="text-zinc-500 text-[11px] mt-2 leading-relaxed font-light">
              High-intellect content production and organic distribution for social authority.
            </p>
          </div>
        </div>
      </div>

      {/* Luxury Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-3 opacity-30 hover:opacity-100 transition-opacity duration-500 cursor-pointer">
        <span className="font-mono text-[8px] uppercase tracking-[0.4em] text-zinc-500">Discover</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-[#d4af37] to-transparent" />
      </div>
    </section>
  );
}
