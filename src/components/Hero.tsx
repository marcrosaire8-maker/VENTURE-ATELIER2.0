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
      {/* BACKGROUND IMAGE - L'image envoyée par l'administrateur */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center transition-all duration-1000 transform scale-105 opacity-40"
        style={{ backgroundImage: `url(${backgroundUrl})` }}
      />
      
      {/* Overlays & Lights - Pour le style Luxe sans cacher l'image */}
      <div className="absolute top-1/4 left-1/3 w-80 h-80 rounded-full bg-[#d4af37]/10 blur-[120px] pointer-events-none animate-pulse z-1" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/40 via-[#050505]/90 to-[#050505] z-1" />

      {/* Contenu Hero */}
      <div className="relative z-10 max-w-5xl mx-auto flex flex-col items-center">
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

        <div className="flex flex-col sm:flex-row gap-5 justify-center items-center">
          <button onClick={onStartAssistant} className="group relative px-10 py-5 rounded-full bg-white text-black font-bold text-xs tracking-[0.2em] uppercase transition-all duration-500 hover:bg-[#d4af37] flex items-center gap-3">
            Start Your Architecture
            <ArrowRight className="w-4 h-4 transition-transform duration-500 group-hover:translate-x-2" />
          </button>
        </div>
      </div>
    </section>
  );
}
