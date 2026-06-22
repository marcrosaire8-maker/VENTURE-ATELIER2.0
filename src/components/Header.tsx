/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Shield, Sparkles, Menu, X, ChevronRight } from 'lucide-react';

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
    { id: 'assistant', label: 'Architect' },
    { id: 'portfolio', label: 'Works' },
    { id: 'team', label: 'Collective' },
    { id: 'faq', label: 'Inquiries' },
    { id: 'brief', label: 'Booking' },
  ];

  const handleScroll = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const top = element.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <header 
      className={`sticky top-0 z-[100] transition-all duration-500 px-6 ${
        scrolled 
          ? 'py-3 bg-[#050505]/80 backdrop-blur-xl border-b border-white/10 shadow-2xl shadow-black/50' 
          : 'py-6 bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Elite Branding - Hidden Admin Access (Double Click) */}
        <div 
          className="flex items-center space-x-4 cursor-pointer select-none group/brand" 
          onClick={() => {
            const now = Date.now();
            const lastClick = (window as any)._lastBrandClick || 0;
            if (now - lastClick < 650) {
              onAdminToggle();
              (window as any)._lastBrandClick = 0;
            } else {
              window.scrollTo({ top: 0, behavior: 'smooth' });
              (window as any)._lastBrandClick = now;
            }
          }}
        >
          <div className="relative">
            {/* Ambient gold glow halo */}
            <div className="absolute -inset-2 rounded-full bg-[#d4af37]/20 blur-xl opacity-0 group-hover/brand:opacity-100 transition-opacity duration-700" />
            
            <div className={`relative w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden border transition-all duration-500 p-0.5 flex items-center justify-center ${
              isAdminOpen ? 'border-[#d4af37] ring-4 ring-[#d4af37]/10' : 'border-white/20 group-hover/brand:border-[#d4af37]/50'
            }`}>
              {logoUrl && !imgError ? (
                <img 
                  src={logoUrl} 
                  alt="Venture Atelier Logo" 
                  className="w-full h-full object-cover rounded-full filter grayscale group-hover/brand:grayscale-0 transition-all duration-700"
                  onError={() => setImgError(true)}
                />
              ) : (
                <div className="w-full h-full rounded-full bg-zinc-900 flex items-center justify-center">
                  <span className="font-serif font-bold text-lg text-[#d4af37]">V</span>
                </div>
              )}
            </div>
            
            {/* Active Status Pulse */}
            <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-[#d4af37] border-2 border-[#050505] rounded-full shadow-lg shadow-[#d4af37]/50" />
          </div>

          <div className="hidden sm:block">
            <h1 className="font-display font-bold text-base tracking-[0.15em] text-white uppercase leading-none">
              Venture <span className="text-[#d4af37]">Atelier</span>
            </h1>
            <div className="flex items-center gap-1.5 mt-1.5">
              <span className="font-mono text-[8px] text-zinc-500 tracking-[0.3em] uppercase">Moonlight</span>
              <Sparkles className="w-2 h-2 text-[#d4af37]/40" />
            </div>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center bg-white/[0.03] border border-white/5 rounded-full px-2 py-1 backdrop-blur-md">
          {sections.map((sec) => (
            <button
              key={sec.id}
              onClick={() => handleScroll(sec.id)}
              className={`px-5 py-2 rounded-full font-mono text-[10px] uppercase tracking-[0.2em] transition-all duration-500 relative cursor-pointer ${
                navActive === sec.id 
                  ? 'text-white bg-white/10 shadow-inner' 
                  : 'text-zinc-500 hover:text-zinc-200'
              }`}
            >
              {sec.label}
              {navActive === sec.id && (
                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-[#d4af37] rounded-full blur-[1px]" />
              )}
            </button>
          ))}
        </nav>

        {/* Action Button */}
        <div className="flex items-center space-x-6">
          <button 
            onClick={() => handleScroll('brief')}
            className="hidden md:flex items-center gap-2 group cursor-pointer"
          >
            <span className="font-mono text-[10px] text-zinc-400 group-hover:text-[#d4af37] uppercase tracking-[0.2em] transition-colors">Start Venture</span>
            <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center group-hover:border-[#d4af37]/50 transition-colors">
              <ChevronRight className="w-3 h-3 text-zinc-500 group-hover:text-[#d4af37]" />
            </div>
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-zinc-400 hover:text-white transition-colors"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <div className={`fixed inset-x-0 top-[73px] transition-all duration-500 ease-in-out lg:hidden overflow-hidden ${
        mobileMenuOpen ? 'max-h-[100vh] opacity-100 border-b border-white/10' : 'max-h-0 opacity-0'
      }`}>
        <div className="bg-[#050505]/95 backdrop-blur-2xl p-6 space-y-2">
          {sections.map((sec) => (
            <button
              key={sec.id}
              onClick={() => handleScroll(sec.id)}
              className={`w-full py-4 px-6 text-left font-mono text-xs uppercase tracking-[0.2em] rounded-xl transition-all ${
                navActive === sec.id 
                  ? 'text-[#d4af37] bg-[#d4af37]/5 border border-[#d4af37]/20' 
                  : 'text-zinc-500 border border-transparent'
              }`}
            >
              {sec.label}
            </button>
          ))}
          <div className="pt-6 border-t border-white/5 mt-4">
            <button 
              onClick={() => handleScroll('brief')}
              className="w-full py-4 bg-[#d4af37] text-black font-bold font-mono text-[10px] uppercase tracking-widest rounded-xl"
            >
              Schedule Session
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}