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
}
