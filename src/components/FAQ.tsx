/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ChevronDown, HelpCircle, Sparkles, ChevronRight } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqItems: FAQItem[] = [
    {
      question: "How does the onboarding process work at Venture Atelier?",
      answer: "It all begins with our Intelligent Guidance System. Once you submit your project details, they are immediately reviewed by our associates. This is followed by a 45-minute clinical strategy session to validate your venture's narrative architecture and technical needs.",
    },
    {
      question: "Why is the 'Moonlight' identity central to your studio?",
      answer: "Venture Atelier moves beyond traditional agency models. 'Moonlight' symbolizes the transition from informal chaos (the shadows) to commercial brilliance (gold highlights). It represents the visual clarity and narrative rigor we apply to transform raw concepts into market authorities.",
    },
    {
      question: "How long does it take to design a complete offer?",
      answer: "The timeline depends on the scale of your brand. For a 'Forge' (strategy) or a 'Moon' pack (identity and design system), the average timeframe is 4 to 6 weeks. An 'Light' deployment for authority-driven content operates on regular 12-week high-impact sprints.",
    },
    {
      question: "Is the visual management system accessible at all times?",
      answer: "Absolutely. As a mandated partner, you gain access to a secure, password-protected console. From there, you can manage your brand assets, studio logos, publish new case studies, and track lead data in real-time through our proprietary dashboard.",
    }
  ];

  const handleToggle = (index: number) => {
    setOpenIndex(prev => (prev === index ? null : index));
  };

  return (
    <section id="faq" className="bg-[#050505] py-24 px-6 relative overflow-hidden">
      {/* Background Ambience - Synchronized with Header/Contact */}
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#d4af37]/5 blur-[120px] pointer-events-none" />
      
      <div className="max-w-4xl mx-auto relative z-10">
        
        {/* Header Block */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-md mb-6">
            <Sparkles className="w-3 h-3 text-[#d4af37]" />
            <span className="font-mono text-[9px] text-zinc-400 uppercase tracking-[0.3em]">Knowledge Base</span>
          </div>
          <h2 className="font-display text-4xl md:text-6xl text-white font-bold uppercase tracking-tight leading-tight">
            Common <span className="font-serif italic font-light text-[#d4af37] capitalize">Inquiries.</span>
          </h2>
          <p className="text-zinc-500 text-sm md:text-base max-w-lg mx-auto mt-6 font-light leading-relaxed tracking-wide">
            Detailed insights into our architectural process and clinical studio philosophy.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-3">
          {faqItems.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div 
                key={index} 
                className={`group transition-all duration-500 ease-in-out border rounded-3xl overflow-hidden ${
                  isOpen 
                    ? 'bg-white/[0.03] border-white/20 backdrop-blur-2xl' 
                    : 'bg-transparent border-white/5 hover:border-white/10 hover:bg-white/[0.01]'
                }`}
              >
                <button
                  onClick={() => handleToggle(index)}
                  className="w-full text-left p-6 md:p-8 flex items-center justify-between gap-6"
                >
                  <div className="flex items-center gap-6">
                    <div className="relative">
                        <div className={`w-10 h-10 rounded-full border transition-all duration-500 flex items-center justify-center ${
                        isOpen ? 'border-[#d4af37] bg-[#d4af37]/10 text-[#d4af37]' : 'border-white/10 text-zinc-600'
                        }`}>
                            <span className="font-mono text-[10px]">{index < 9 ? `0${index + 1}` : index + 1}</span>
                        </div>
                        {isOpen && (
                            <div className="absolute -top-1 -right-1 w-2 h-2 bg-[#d4af37] rounded-full blur-[2px]" />
                        )}
                    </div>
                    
                    <span className={`text-sm md:text-base font-medium tracking-tight transition-colors duration-500 ${
                      isOpen ? 'text-white' : 'text-zinc-400 group-hover:text-zinc-200'
                    }`}>
                      {item.question}
                    </span>
                  </div>
                  
                  <div className={`shrink-0 transition-transform duration-700 ${isOpen ? 'rotate-180' : ''}`}>
                    <ChevronDown className={`w-4 h-4 transition-colors ${isOpen ? 'text-[#d4af37]' : 'text-zinc-700'}`} />
                  </div>
                </button>

                {/* Answer content */}
                <div 
                  className={`transition-all duration-700 ease-in-out ${
                    isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="px-6 pb-8 md:px-8 md:pb-10 ml-16">
                    <div className="pt-4 border-t border-white/5">
                        <p className="text-zinc-500 text-sm md:text-base font-light leading-relaxed max-w-2xl">
                          {item.answer}
                        </p>
                        
                        <div className="mt-6 flex items-center gap-2">
                           <div className="w-1 h-1 rounded-full bg-[#d4af37]" />
                           <span className="font-mono text-[8px] text-[#d4af37] uppercase tracking-[0.2em]">Clinical Protocol</span>
                        </div>
                    </div>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

        {/* Bottom CTA - Styled like Header Actions */}
        <div className="mt-20 text-center animate-in fade-in slide-in-from-bottom-4 duration-1000">
          <p className="text-zinc-600 text-[10px] font-mono uppercase tracking-[0.3em] mb-6">Unanswered Question?</p>
          <button 
            className="group inline-flex items-center gap-4 px-8 py-4 rounded-full border border-white/10 bg-white/[0.02] hover:bg-white/[0.05] hover:border-[#d4af37]/50 transition-all duration-500"
          >
            <span className="font-mono text-[10px] text-white uppercase tracking-[0.2em]">Contact Strategy Team</span>
            <div className="w-6 h-6 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-[#d4af37]/20 transition-all">
                <ChevronRight className="w-3 h-3 text-[#d4af37]" />
            </div>
          </button>
        </div>

      </div>
    </section>
  );
}
