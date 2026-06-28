/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { TeamMember } from '../types';
import { Sparkles, Linkedin, Award, Compass, ShieldCheck, X, Maximize2 } from 'lucide-react';

interface TeamProps {
  members: TeamMember[];
}

export default function Team({ members }: TeamProps) {
  // État pour gérer l'affichage de l'image en plein écran
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);

  return (
    <section id="team" className="bg-[#050505] py-20 sm:py-32 px-4 sm:px-6 border-b border-white/5 relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-1/4 left-[-10%] w-[50%] h-[50%] rounded-full bg-[#d4af37]/5 blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-[-10%] w-[40%] h-[40%] rounded-full bg-white/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Module Header */}
        <div className="text-center max-w-3xl mx-auto mb-20 sm:mb-28">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#d4af37]/30 bg-[#d4af37]/5 mb-6 animate-fade-in">
            <ShieldCheck className="w-3.5 h-3.5 text-[#d4af37]" />
            <span className="font-mono text-[10px] text-[#d4af37] uppercase tracking-[0.25em]">Strategic Minds & Visionaries</span>
          </div>
          <h2 className="font-display text-5xl sm:text-7xl text-white font-extralight leading-tight">
            The <span className="font-serif italic text-[#d4af37]">Collective.</span>
          </h2>
          <p className="text-zinc-400 text-base sm:text-lg mt-6 leading-relaxed font-light max-w-2xl mx-auto">
            A specialized alliance of creative strategists and growth engineers dedicated to shaping the future of your enterprise.
          </p>
        </div>

        {/* Members Grid */}
        {members.length === 0 ? (
          <div className="max-w-xl mx-auto p-16 rounded-[2rem] bg-white/[0.02] border border-white/10 text-center backdrop-blur-2xl">
            <Sparkles className="w-12 h-12 text-zinc-700 mx-auto mb-6 animate-pulse" />
            <h3 className="text-white text-xl font-medium mb-3">No Advisors Registered</h3>
            <p className="text-zinc-500 text-sm font-light">The studio collective is managed via the secure admin console.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-14 max-w-6xl mx-auto">
            {members.map((member) => (
              <div 
                key={member.id} 
                className="group relative flex flex-col items-center p-1 rounded-[2.5rem] transition-all duration-500"
              >
                {/* Image Card Container */}
                <div className="relative w-full aspect-[4/5] mb-8 overflow-hidden rounded-[2rem] bg-zinc-900 border border-white/10 transition-all duration-700 group-hover:border-[#d4af37]/50 group-hover:shadow-[0_0_40px_rgba(212,175,55,0.1)]">
                  
                  {member.avatarUrl ? (
                    <>
                      <img 
                        src={member.avatarUrl} 
                        alt={`${member.firstName} ${member.lastName}`}
                        className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-110 grayscale-[0.5] group-hover:grayscale-0"
                      />
                      {/* Overlay au survol pour inciter au clic */}
                      <div 
                        onClick={() => setSelectedMember(member)}
                        className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center cursor-zoom-in"
                      >
                        <div className="bg-white/10 backdrop-blur-md p-4 rounded-full border border-white/20 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                          <Maximize2 className="w-6 h-6 text-white" />
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Sparkles className="w-12 h-12 text-zinc-800" />
                    </div>
                  )}

                  {/* Status Badge */}
                  <div className="absolute top-6 right-6 bg-black/60 backdrop-blur-md border border-white/10 text-white px-3 py-1 rounded-full text-[9px] font-mono tracking-widest uppercase">
                    Core
                  </div>
                </div>

                {/* Identity info */}
                <div className="text-center px-4">
                  <h3 className="font-display text-2xl text-white group-hover:text-[#d4af37] transition-colors duration-300">
                    {member.firstName} <span className="font-light opacity-80">{member.lastName}</span>
                  </h3>
                  <p className="text-[10px] font-mono text-[#d4af37] uppercase tracking-[0.4em] mt-3 mb-4">
                    {member.role}
                  </p>
                  <p className="text-zinc-500 text-sm leading-relaxed font-light line-clamp-2 group-hover:line-clamp-none transition-all duration-500">
                    Committed to dissolving strategic ambiguity and maximizing creative leverage.
                  </p>
                </div>

                {/* Social Links */}
                <div className="flex items-center gap-6 mt-8 opacity-40 group-hover:opacity-100 transition-opacity duration-500">
                  <button className="text-white hover:text-[#d4af37] transition-colors"><Linkedin className="w-4 h-4" /></button>
                  <button className="text-white hover:text-[#d4af37] transition-colors"><Award className="w-4 h-4" /></button>
                  <button className="text-white hover:text-[#d4af37] transition-colors"><Compass className="w-4 h-4" /></button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Global Performance Benchmarks */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 max-w-6xl mx-auto mt-32 pt-20 border-t border-white/5">
          {[
            { val: "100%", label: "Bespoke Solutions" },
            { val: "€20M+", label: "Capital Facilitated" },
            { val: "90 Days", label: "Avg. Authority Speed" },
            { val: "14+", label: "Ventures Propelled" }
          ].map((stat, i) => (
            <div key={i} className="text-center lg:text-left group">
              <span className="block font-serif text-4xl sm:text-6xl text-zinc-300 group-hover:text-[#d4af37] transition-colors duration-500 font-light">
                {stat.val}
              </span>
              <span className="block font-mono text-[9px] tracking-[0.3em] text-zinc-600 uppercase mt-4">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* --- MODAL / LIGHTBOX POUR L'IMAGE --- */}
      {selectedMember && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-10 bg-black/95 backdrop-blur-xl animate-in fade-in duration-300"
          onClick={() => setSelectedMember(null)}
        >
          <button 
            className="absolute top-8 right-8 text-white/50 hover:text-white transition-colors p-2"
            onClick={() => setSelectedMember(null)}
          >
            <X className="w-8 h-8" />
          </button>
          
          <div className="relative max-w-4xl w-full h-full flex flex-col items-center justify-center" onClick={e => e.stopPropagation()}>
            <img 
              src={selectedMember.avatarUrl} 
              alt="Full view"
              className="max-h-[80vh] w-auto object-contain rounded-lg shadow-2xl border border-white/10"
            />
            <div className="mt-8 text-center">
              <h3 className="text-2xl text-white font-display">
                {selectedMember.firstName} {selectedMember.lastName}
              </h3>
              <p className="text-[#d4af37] font-mono text-xs tracking-widest uppercase mt-2">
                {selectedMember.role}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
