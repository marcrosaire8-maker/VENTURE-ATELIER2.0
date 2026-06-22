/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { TeamMember } from '../types';
import { Sparkles, Linkedin, Award, Compass, ShieldCheck } from 'lucide-react';

interface TeamProps {
  members: TeamMember[];
}

export default function Team({ members }: TeamProps) {
  return (
    <section id="team" className="bg-[#050505] py-16 sm:py-24 px-4 sm:px-6 border-b border-white/5 relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-1/3 left-[-10%] w-[40%] h-[40%] rounded-full bg-[#d4af37]/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Module Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 sm:mb-24">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#d4af37]/30 bg-[#d4af37]/5 mb-4">
            <ShieldCheck className="w-3 h-3 text-[#d4af37]" />
            <span className="font-mono text-[10px] text-[#d4af37] uppercase tracking-[0.2em]">Strategic Minds & Visionaries</span>
          </div>
          <h2 className="font-display text-4xl sm:text-6xl text-white font-light leading-tight">
            The <span className="font-serif italic text-[#d4af37]">Collective.</span>
          </h2>
          <p className="text-zinc-500 text-sm sm:text-base mt-4 leading-relaxed font-light">
            A specialized alliance of creative strategists, celestial designers, and growth engineers dedicated to shaping the future of your enterprise.
          </p>
        </div>

        {/* Members Grid */}
        {members.length === 0 ? (
          <div className="max-w-xl mx-auto p-12 rounded-3xl bg-white/[0.02] border border-white/5 text-center backdrop-blur-xl">
            <Sparkles className="w-10 h-10 text-zinc-800 mx-auto mb-6 animate-pulse" />
            <h3 className="text-white font-medium mb-2">No Advisors Registered</h3>
            <p className="text-zinc-500 text-sm font-light">The studio collective is managed via the secure admin console. Double-click the brand logo to configure your elite personnel.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12 max-w-6xl mx-auto">
            {members.map((member) => (
              <div 
                key={member.id} 
                className="group flex flex-col items-center p-8 rounded-3xl bg-white/[0.01] border border-white/5 hover:border-[#d4af37]/30 transition-all duration-700 hover:bg-white/[0.03] backdrop-blur-sm"
              >
                {/* Advanced Orbital Avatar */}
                <div className="relative w-44 h-44 mb-8">
                  {/* Decorative orbital ring */}
                  <div className="absolute inset-[-10px] rounded-full border border-dashed border-[#d4af37]/20 group-hover:rotate-90 transition-transform duration-[2000ms]" />
                  
                  {/* Glowing halo */}
                  <div className="absolute inset-0 rounded-full bg-[#d4af37]/10 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                  
                  {/* Image Frame */}
                  <div className="absolute inset-0 rounded-full p-1 bg-gradient-to-tr from-white/5 to-[#d4af37]/40 shadow-2xl">
                    <div className="w-full h-full rounded-full overflow-hidden bg-zinc-900">
                      {member.avatarUrl ? (
                        <img 
                          src={member.avatarUrl} 
                          alt={`${member.firstName} ${member.lastName}`}
                          className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <Sparkles className="w-8 h-8 text-zinc-800" />
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {/* Status Badge */}
                  <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-black border border-[#d4af37]/40 text-[#d4af37] px-3 py-1 rounded-full text-[8px] font-mono tracking-[0.2em] font-bold uppercase whitespace-nowrap shadow-xl">
                    Certified Advisor
                  </div>
                </div>

                {/* Identity */}
                <div className="text-center">
                  <h3 className="font-display text-xl text-white group-hover:text-[#d4af37] transition-colors duration-300">
                    {member.firstName} {member.lastName}
                  </h3>
                  <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-[0.3em] mt-2">
                    {member.role}
                  </p>
                  <p className="text-zinc-500 text-xs mt-5 leading-relaxed font-light max-w-[240px]">
                    Committed to dissolving strategic ambiguity and maximizing the creative leverage of your digital assets.
                  </p>
                </div>

                {/* Social/Expertise Links */}
                <div className="flex items-center gap-5 mt-8 pt-6 border-t border-white/5 w-full justify-center">
                  <button className="text-zinc-600 hover:text-[#d4af37] transition-colors"><Linkedin className="w-4 h-4" /></button>
                  <button className="text-zinc-600 hover:text-[#d4af37] transition-colors"><Award className="w-4 h-4" /></button>
                  <button className="text-zinc-600 hover:text-[#d4af37] transition-colors"><Compass className="w-4 h-4" /></button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Global Performance Benchmarks */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 max-w-6xl mx-auto mt-24 sm:mt-32 pt-16 border-t border-white/5">
          <div className="text-center lg:text-left">
            <span className="block font-serif text-4xl sm:text-6xl text-[#d4af37] font-light">100%</span>
            <span className="block font-mono text-[9px] tracking-[0.3em] text-zinc-600 uppercase mt-3">Bespoke Solutions</span>
          </div>
          <div className="text-center lg:text-left">
            <span className="block font-serif text-4xl sm:text-6xl text-[#d4af37] font-light">€20M+</span>
            <span className="block font-mono text-[9px] tracking-[0.3em] text-zinc-600 uppercase mt-3">Capital Facilitated</span>
          </div>
          <div className="text-center lg:text-left">
            <span className="block font-serif text-4xl sm:text-6xl text-[#d4af37] font-light">90 Days</span>
            <span className="block font-mono text-[9px] tracking-[0.3em] text-zinc-600 uppercase mt-3">Avg. Authority Speed</span>
          </div>
          <div className="text-center lg:text-left">
            <span className="block font-serif text-4xl sm:text-6xl text-[#d4af37] font-light">14+</span>
            <span className="block font-mono text-[9px] tracking-[0.3em] text-zinc-600 uppercase mt-3">Ventures Propelled</span>
          </div>
        </div>

      </div>
    </section>
  );
}