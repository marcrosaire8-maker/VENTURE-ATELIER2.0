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

  // UPDATED: Added "The Method" to link to the new section
  const sections = [
    { id: 'concept', label: 'Philosophy' },
    { id: 'method', label: 'The Method' }, // Links to the ATELIER Method
    { id: 'portfolio', label: 'Works' },
    { id: 'team', label: 'Collective' },
    { id: 'faq', label: 'Inquiries' },
    { id: 'brief', label: 'Booking' },
  ];

  const handleScroll = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      // Offset for the fixed header height
      const top = element.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <header 
      className={`fixed top-0 inset-x-0 z-[100] transition-all duration-500 px-6 ${
        scrolled 
          ? 'py-3 bg-[#050505]/40 backdrop-blur-2xl border-b border-white/10' 
          : 'py-6 bg-transparent border-b border-transparent'
      }`}
    >
      {/* 
          NOTE: The background image sent by the administrator remains visible 
          because we use 'bg-transparent' and 'backdrop-blur'.
      */}
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Branding / Admin Access */}
        <div 
          className="flex items-center space-x-4 cursor-pointer select-none group/brand" 
          onDoubleClick={onAdminToggle}
        >
          <div className="relative">
            <div className={`relative w-10 h-10 rounded-full overflow-hidden border transition-all duration-500 p-0.5 flex items-center justify-center ${
              isAdminOpen ? 'border-[#d4af37] ring-4 ring-[#d4af37]/10' : 'border-white/20'
            }`}>
              {logoUrl && !imgError ? (
                <img 
                  src={logoUrl} 
                  alt="Logo" 
                  className="w-full h-full object-cover rounded-full"
                  onError={() => setImgError(true)}
                />
              ) : (
                <div className="w-full h-full rounded-full bg-zinc-900 flex items-center justify-center">
                  <span className="font-serif font-bold text-lg text-[#d4af37]">V</span>
                </div>
              )}
            </div>
            <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-[#d4af37] border-2 border-[#050505] rounded-full" />
          </div>

          <div className="hidden sm:block">
            <h1 className="font-display font-bold text-sm tracking-[0.2em] text-white uppercase leading-none">
              Venture <span className="text-[#d4af37]">Atelier</span>
            </h1>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center bg-white/[0.03] border border-white/5 rounded-full px-2 py-1 backdrop-blur-md">
          {sections.map((sec) => (
            <button
              key={sec.id}
              onClick={() => handleScroll(sec.id)}
              className={`px-5 py-2 rounded-full font-mono text-[9px] uppercase tracking-[0.2em] transition-all duration-500 relative cursor-pointer ${
                navActive === sec.id 
                  ? 'text-white bg-white/10' 
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
            <span className="font-mono text-[9px] text-zinc-400 group-hover:text-[#d4af37] uppercase tracking-[0.2em] transition-colors">Start Venture</span>
            <div className="w-7 h-7 rounded-full border border-white/10 flex items-center justify-center group-hover:border-[#d4af37]/50 transition-colors">
              <ChevronRight className="w-3 h-3 text-zinc-500" />
            </div>
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-zinc-400 hover:text-white"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`fixed inset-x-0 top-[70px] transition-all duration-500 lg:hidden overflow-hidden ${
        mobileMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
      }`}>
        <div className="bg-[#050505]/95 backdrop-blur-2xl p-6 space-y-2 border-b border-white/10">
          {sections.map((sec) => (
            <button
              key={sec.id}
              onClick={() => handleScroll(sec.id)}
              className="w-full py-4 text-left font-mono text-[10px] uppercase tracking-widest text-zinc-400 hover:text-[#d4af37]"
            >
              {sec.label}
            </button>
          ))}
        </div>
      </div>
    </header>
  );
}
