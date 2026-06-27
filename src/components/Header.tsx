/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Sparkles, Menu, X, ChevronRight } from 'lucide-react';

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
      const top = element.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <header 
      className={`fixed top-0 inset-x-0 z-[100] transition-all duration-500 px-6 ${
        scrolled 
          ? 'py-3 bg-[#050505]/60 backdrop-blur-2xl border-b border-white/10 shadow-2xl' 
          : 'py-8 bg-transparent border-b border-transparent'
      }`}
    >
      {/* 
          MAINTAINING THE BACKGROUND: 
          The administrator's image remains visible through this transparent/blurred header.
      */}
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* IMPROVED LOGO SECTION */}
        <div 
          className="flex items-center space-x-5 cursor-pointer select-none group/brand" 
          onDoubleClick={onAdminToggle}
        >
          <div className="relative">
            {/* Logo Glow/Backlight - Ensures visibility against the admin's background image */}
            <div className="absolute -inset-3 bg-[#d4af37]/15 blur-2xl rounded-full opacity-0 group-hover/brand:opacity-100 transition-opacity duration-700" />
            
            <div className={`relative w-12 h-12 sm:w-14 sm:h-14 transition-all duration-500 flex items-center justify-center ${
              isAdminOpen ? 'scale-110' : 'scale-100'
            }`}>
              {logoUrl && !imgError ? (
                <div className="w-full h-full p-1 bg-white/5 rounded-xl border border-white/10 backdrop-blur-md flex items-center justify-center overflow-hidden">
                  <img 
                    src={logoUrl} 
                    alt="Venture Atelier Logo" 
                    className="w-full h-full object-contain transition-transform duration-700 group-hover/brand:scale-110"
                    onError={() => setImgError(true)}
                  />
                </div>
              ) : (
                <div className="w-full h-full rounded-xl bg-gradient-to-br from-zinc-800 to-black border border-white/20 flex items-center justify-center">
                  <span className="font-serif font-bold text-2xl text-[#d4af37]">V</span>
                </div>
              )}
              
              {/* Status Indicator */}
              <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-[#d4af37] border-2 border-[#050505] rounded-full shadow-[0_0_10px_#d4af37]" />
            </div>
          </div>

          <div className="hidden sm:block">
            <h1 className="font-display font-bold text-base tracking-[0.25em] text-white uppercase leading-none group-hover/brand:text-[#d4af37] transition-colors duration-500">
              Venture <span className="text-[#d4af37] group-hover/brand:text-white">Atelier</span>
            </h1>
            <div className="flex items-center gap-2 mt-2">
              <div className="h-[1px] w-4 bg-[#d4af37]/40" />
              <span className="font-mono text-[8px] text-zinc-500 tracking-[0.4em] uppercase">Premium Studio</span>
            </div>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center bg-white/[0.03] border border-white/5 rounded-full px-2 py-1 backdrop-blur-xl">
          {sections.map((sec) => (
            <button
              key={sec.id}
              onClick={() => handleScroll(sec.id)}
              className={`px-5 py-2.5 rounded-full font-mono text-[9px] uppercase tracking-[0.25em] transition-all duration-500 relative cursor-pointer ${
                navActive === sec.id 
                  ? 'text-white bg-white/10' 
                  : 'text-zinc-500 hover:text-zinc-100 hover:bg-white/5'
              }`}
            >
              {sec.label}
              {navActive === sec.id && (
                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-[#d4af37] rounded-full shadow-[0_0_5px_#d4af37]" />
              )}
            </button>
          ))}
        </nav>

        {/* Action Button */}
        <div className="flex items-center space-x-6">
          <button 
            onClick={() => handleScroll('brief')}
            className="hidden md:flex items-center gap-3 group cursor-pointer"
          >
            <span className="font-mono text-[9px] text-zinc-400 group-hover:text-white uppercase tracking-[0.3em] transition-colors">Start Venture</span>
            <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center group-hover:border-[#d4af37] group-hover:bg-[#d4af37] transition-all duration-500">
              <ChevronRight className="w-3.5 h-3.5 text-zinc-500 group-hover:text-black" />
            </div>
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-zinc-400 hover:text-[#d4af37] transition-colors"
          >
            {mobileMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <div className={`fixed inset-x-0 top-[88px] transition-all duration-700 lg:hidden overflow-hidden ${
        mobileMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
      }`}>
        <div className="bg-[#050505]/95 backdrop-blur-3xl p-8 space-y-4 border-b border-white/10">
          {sections.map((sec) => (
            <button
              key={sec.id}
              onClick={() => handleScroll(sec.id)}
              className="w-full py-4 text-left font-mono text-[11px] uppercase tracking-[0.3em] text-zinc-500 hover:text-[#d4af37] border-b border-white/5"
            >
              {sec.label}
            </button>
          ))}
        </div>
      </div>
    </header>
  );
}
