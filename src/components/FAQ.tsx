/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle, Sparkles } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqItems: FAQItem[] = [
    {
      question: "How does the onboarding process work at Venture Atelier?",
      answer: "It all begins with our Intelligent Guidance System (above). Once you submit your project details, they are immediately reviewed by our associates. This is followed by a 45-minute clinical strategy session to validate your venture's narrative architecture and technical needs.",
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
    <section id="faq" className="bg-[#050505] py-16 sm:py-24 px-4 sm:px-6 relative overflow-hidden border-t border-white/5">
      {/* Background Ambience */}
      <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-[#d4af37]/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-600/5 blur-[120px] pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        
        {/* Header Block */}
        <div className="text-center mb-12 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#d4af37]/30 bg-[#d4af37]/5 mb-4">
            <Sparkles className="w-3 h-3 text-[#d4af37]" />
            <span className="font-mono text-[10px] text-[#d4af37] uppercase tracking-[0.2em]">Reassurance & Process</span>
          </div>
          <h2 className="font-display text-3xl sm:text-6xl text-white font-light leading-tight">
            Common <span className="font-serif italic text-[#d4af37]">Inquiries.</span>
          </h2>
          <p className="text-zinc-500 text-sm sm:text-base max-w-xl mx-auto mt-4 font-light leading-relaxed">
            Everything you need to know about our architectural process and studio philosophy.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {faqItems.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div 
                key={index} 
                className={`group rounded-2xl border transition-all duration-500 overflow-hidden backdrop-blur-xl ${
                  isOpen 
                    ? 'bg-white/[0.04] border-[#d4af37]/40 shadow-2xl shadow-[#d4af37]/5' 
                    : 'bg-white/[0.01] border-white/5 hover:border-white/10'
                }`}
              >
                <button
                  onClick={() => handleToggle(index)}
                  className="w-full text-left p-5 sm:p-7 flex items-center justify-between gap-4 transition-colors"
                >
                  <div className="flex items-center gap-5">
                    <div className={`shrink-0 w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-500 ${
                      isOpen ? 'bg-[#d4af37] text-black scale-110' : 'bg-white/5 text-zinc-500 group-hover:text-zinc-300'
                    }`}>
                      <HelpCircle className="w-5 h-5" />
                    </div>
                    <span className={`text-sm sm:text-base font-medium transition-colors duration-300 ${
                      isOpen ? 'text-white' : 'text-zinc-400 group-hover:text-zinc-200'
                    }`}>
                      {item.question}
                    </span>
                  </div>
                  
                  <div className={`transition-transform duration-500 ${isOpen ? 'rotate-180' : ''}`}>
                    <ChevronDown className={`w-5 h-5 ${isOpen ? 'text-[#d4af37]' : 'text-zinc-600'}`} />
                  </div>
                </button>

                {/* Answer content collapse */}
                <div 
                  className={`transition-all duration-500 ease-in-out ${
                    isOpen ? 'max-h-[300px] opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="px-5 pb-7 sm:px-7 sm:pb-8 ml-15 border-l-2 border-[#d4af37]/20">
                    <div className="text-zinc-400 text-xs sm:text-sm font-light leading-relaxed max-w-2xl">
                      {item.answer}
                    </div>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center animate-in fade-in slide-in-from-bottom-4 duration-1000">
          <p className="text-zinc-500 text-xs font-mono uppercase tracking-widest mb-4">Still have questions?</p>
          <a 
            href="mailto:hello@ventureatelier.com" 
            className="inline-flex items-center gap-2 text-white hover:text-[#d4af37] transition-colors text-sm font-medium"
          >
            Contact our Strategy Team <ChevronRight className="w-4 h-4" />
          </a>
        </div>

      </div>
    </section>
  );
}

// Helper icon if not already imported
function ChevronRight(props: any) {
  return (
    <svg 
      {...props} 
      xmlns="http://www.w3.org/2000/svg" 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <path d="m9 18 6-6-6-6"/>
    </svg>
  );
}