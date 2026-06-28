/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Sparkles, Menu, X, ChevronRight, ShieldCheck } from 'lucide-react';

interface HeaderProps {
  logoUrl: string;
  onAdminToggle: () => void;
  isAdminOpen: boolean;
  navActive: string;
}

export default function Header({ logoUrl, onAdminToggle, isAdminOpen, navActive }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [imgError, setImgError] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    setImgError(false);
  }, [logoUrl]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const sections = [
    { id: 'concept', label: 'Philosophy' },
    { id: 'method', label: 'The Method' },
    { id: 'portfolio', label: 'Works' },
    { id: 'team', label: 'Collective' },
    { id: 'faq', label: 'Inquiries' },
    { id: 'brief', label: 'Booking' },
  ];

  const handleScroll = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const top = element.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <header 
      className={`fixed top-0 inset-x-0 z-[100] transition-all duration-700 px-6 ${
        scrolled 
          ? 'py-3 bg-[#050505]/80 backdrop-blur-2xl border-b border-white/10' 
          : 'py-8 bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* --- LOGO & BRANDING (PLUS VISIBLE) --- */}
        <div 
          className="flex items-center space-x-5 cursor-pointer select-none group/brand relative" 
          onDoubleClick={onAdminToggle}
        >
          {/* Lueur d'arrière-plan du logo */}
          <div className="absolute -inset-2 bg-[#d4af37]/10 blur-xl rounded-full opacity-0 group-hover/brand:opacity-100 transition-opacity duration-700" />
          
          <div className="relative">
            {/* Double cercle premium */}
            <div className={`relative transition-all duration-700 ease-out flex items-center justify-center rounded-full p-1
              ${scrolled ? 'w-12 h-12' : 'w-14 h-14 sm:w-16 sm:h-16'} 
              ${isAdminOpen ? 'bg-[#d4af37]' : 'bg-gradient-to-tr from-white/10 via-[#d4af37]/40 to-white/5'}
            `}>
              <div className="w-full h-full rounded-full overflow-hidden bg-zinc-950 flex items-center justify-center border border-black/50 shadow-2xl">
                {logoUrl && !imgError ? (
                  <img 
                    src={logoUrl} 
                    alt="Logo" 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover/brand:scale-110"
                    onError={() => setImgError(true)}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="font-serif font-light text-2xl text-[#d4af37]">V</span>
                  </div>
                )}
              </div>
              
              {/* Badge de statut plus pro */}
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-black border border-[#d4af37]/50 rounded-full flex items-center justify-center shadow-lg">
                <div className="w-1.5 h-1.5 bg-[#d4af37] rounded-full animate-pulse" />
              </div>
            </div>
          </div>

          <div className="flex flex-col">
            <h1 className={`font-display font-light tracking-[0.3em] text-white uppercase transition-all duration-500 ${
              scrolled ? 'text-xs' : 'text-sm sm:text-base'
            }`}>
              Venture <span className="text-[#d4af37] italic font-serif lowercase tracking-normal">Atelier</span>
            </h1>
            {!scrolled && (
              <span className="text-[8px] font-mono text-zinc-500 uppercase tracking-[0.4em] mt-1 hidden sm:block">
                Strategic Excellence
              </span>
            )}
          </div>
        </div>

        {/* --- DESKTOP NAVIGATION --- */}
        <nav className="hidden lg:flex items-center bg-white/[0.02] border border-white/10 rounded-full px-2 py-1.5 backdrop-blur-xl shadow-2xl">
          {sections.map((sec) => (
            <button
              key={sec.id}
              onClick={() => handleScroll(sec.id)}
              className={`px-5 py-2 rounded-full font-mono text-[10px] uppercase tracking-[0.25em] transition-all duration-500 relative group/nav ${
                navActive === sec.id 
                  ? 'text-white' 
                  : 'text-zinc-500 hover:text-white'
              }`}
            >
              <span className="relative z-10">{sec.label}</span>
              {navActive === sec.id && (
                <div className="absolute inset-0 bg-white/10 rounded-full animate-fade-in" />
              )}
              <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 h-[1px] bg-[#d4af37] transition-all duration-500 group-hover/nav:w-1/2" />
            </button>
          ))}
        </nav>

        {/* --- ACTION BUTTON --- */}
        <div className="flex items-center space-x-8">
          <button 
            onClick={() => handleScroll('brief')}
            className="hidden md:flex items-center gap-4 group cursor-pointer"
          >
            <div className="text-right">
              <span className="block font-mono text-[9px] text-zinc-500 group-hover:text-[#d4af37] uppercase tracking-[0.3em] transition-colors">Start Venture</span>
              <span className="block font-mono text-[7px] text-zinc-700 uppercase tracking-[0.2em]">Priority Line</span>
            </div>
            <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:border-[#d4af37]/50 group-hover:bg-[#d4af37]/5 transition-all duration-500">
              <ChevronRight className="w-4 h-4 text-zinc-500 group-hover:text-[#d4af37] group-hover:translate-x-0.5 transition-all" />
            </div>
          </button>

          {/* Mobile Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-3 rounded-xl bg-white/5 border border-white/10 text-zinc-400 hover:text-white transition-colors"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* --- MOBILE MENU --- */}
      <div className={`fixed inset-x-0 top-0 h-screen transition-all duration-700 lg:hidden z-[-1] ${
        mobileMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full'
      }`}>
        <div className="bg-[#050505] h-full pt-32 p-8 flex flex-col space-y-4">
          <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-8" />
          {sections.map((sec) => (
            <button
              key={sec.id}
              onClick={() => handleScroll(sec.id)}
              className="w-full py-5 text-center font-display text-2xl uppercase tracking-[0.2em] text-zinc-500 hover:text-[#d4af37] transition-all"
            >
              {sec.label}
            </button>
          ))}
          <div className="mt-auto pb-12 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#d4af37]/20 bg-[#d4af37]/5">
              <ShieldCheck className="w-3 h-3 text-[#d4af37]" />
              <span className="text-[10px] font-mono text-[#d4af37] uppercase tracking-widest">Secured Atelier</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
