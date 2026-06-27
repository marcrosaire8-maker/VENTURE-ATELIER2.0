import React from 'react';
import { 
  Search, 
  Settings2, 
  Layers, 
  TrendingUp, 
  Activity, 
  Globe, 
  RefreshCw,
  ArrowRight,
  Calendar
} from 'lucide-react';

const steps = [
  {
    letter: 'A',
    title: 'Analyze',
    subtitle: 'Understanding Your Brand Before Building It',
    description: 'Every strong brand starts with clarity. We begin by studying your business, audience, and industry to identify opportunities.',
    items: ['Brand identity', 'Audience behaviour', 'Market position', 'Competitors'],
    outcome: 'Brand Analysis Report',
    icon: Search
  },
  {
    letter: 'T',
    title: 'Transform',
    subtitle: 'Turning Insights Into Strategy',
    description: 'We transform research into a clear direction. We define how your brand communicates, who it serves, and what makes it different.',
    items: ['Brand positioning', 'Brand voice', 'Messaging strategy', 'Content direction'],
    outcome: 'Brand Strategy Blueprint',
    icon: Settings2
  },
  {
    letter: 'E',
    title: 'Execute',
    subtitle: 'Bringing Your Vision To Life',
    description: 'Strategy becomes action. We create intentional content and creative assets designed to educate, attract, and convert.',
    items: ['Content pillars', 'Monthly calendars', 'Social campaigns', 'Visual direction'],
    outcome: 'Content Growth System',
    icon: Layers
  },
  {
    letter: 'L',
    title: 'Leverage',
    subtitle: 'Expanding Your Brand Presence',
    description: 'A great brand needs visibility. We help your brand reach the right audience through consistent publishing and engagement.',
    items: ['Content distribution', 'Audience engagement', 'Community growth', 'Brand awareness'],
    outcome: 'Audience Growth Strategy',
    icon: TrendingUp
  },
  {
    letter: 'I',
    title: 'Improve',
    subtitle: 'Using Data To Grow Smarter',
    description: 'Growth requires constant refinement. We measure performance and use insights to improve your strategy.',
    items: ['Reach & Engagement', 'Audience growth', 'Content performance', 'Leads'],
    outcome: 'Monthly Growth Report',
    icon: Activity
  },
  {
    letter: 'E',
    title: 'Expand',
    subtitle: 'Scaling Your Digital Presence',
    description: 'As your brand develops, your strategy evolves. We identify new opportunities to increase your impact and market presence.',
    items: ['Growth opportunities', 'Campaign strategies', 'Stronger brand systems', 'Long-term plans'],
    outcome: 'Expansion Roadmap',
    icon: Globe
  },
  {
    letter: 'R',
    title: 'Refine',
    subtitle: 'Creating Brands That Stay Relevant',
    description: 'The strongest brands continuously improve. We refine your strategy to keep your brand consistent and competitive.',
    items: ['Visual identity', 'Brand messaging', 'Content approach', 'Customer connection'],
    outcome: 'Evolving Brand System',
    icon: RefreshCw
  }
];

export default function AtelierMethod() {
  return (
    <section className="bg-[#050505] py-24 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="mb-32 text-center">
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-[10px] font-mono text-[#d4af37] tracking-[0.3em] uppercase mb-8">
            The Process
          </div>
          <h2 className="font-display text-5xl md:text-7xl text-white mb-6 tracking-tight">
            The <span className="font-serif italic text-[#d4af37]">ATELIER</span> Method™
          </h2>
          <p className="font-sans font-light text-zinc-400 max-w-2xl mx-auto text-lg leading-relaxed">
            Successful brands are not built through random content or trends. 
            They are built through strategy, creativity, and consistent execution.
          </p>
        </div>

        {/* Method Steps */}
        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-gradient-to-b from-[#d4af37]/50 via-white/10 to-transparent hidden md:block" />

          <div className="space-y-32">
            {steps.map((step, index) => (
              <div key={index} className="relative group">
                <div className={`flex flex-col md:flex-row items-center gap-12 md:gap-24 ${index % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}>
                  
                  {/* Visual Letter Side */}
                  <div className="flex-1 flex justify-center items-center relative">
                    <span className="text-[12rem] md:text-[18rem] font-serif italic leading-none text-white/[0.03] select-none group-hover:text-[#d4af37]/5 transition-colors duration-700">
                      {step.letter}
                    </span>
                    <div className="absolute inset-0 flex items-center justify-center">
                       <div className="w-20 h-20 rounded-full bg-black border border-[#d4af37]/30 flex items-center justify-center backdrop-blur-xl group-hover:scale-110 transition-transform duration-500 shadow-2xl shadow-[#d4af37]/10">
                          <step.icon className="w-8 h-8 text-[#d4af37]" />
                       </div>
                    </div>
                  </div>

                  {/* Content Side */}
                  <div className="flex-1 text-center md:text-left">
                    <div className="inline-block px-3 py-1 rounded bg-[#d4af37]/10 text-[#d4af37] font-mono text-[10px] uppercase tracking-widest mb-4">
                      Stage 0{index + 1}
                    </div>
                    <h3 className="text-3xl md:text-4xl font-display text-white mb-4 tracking-tight">
                      {step.letter} <span className="text-zinc-600">—</span> {step.title}
                    </h3>
                    <h4 className="text-[#d4af37] font-sans font-medium text-sm uppercase tracking-widest mb-6">
                      {step.subtitle}
                    </h4>
                    <p className="text-zinc-400 font-light leading-relaxed mb-8 max-w-md mx-auto md:mx-0">
                      {step.description}
                    </p>
                    
                    <div className="grid grid-cols-2 gap-4 mb-8">
                      {step.items.map((item, i) => (
                        <div key={i} className="flex items-center gap-2 text-[11px] font-mono text-zinc-500 uppercase tracking-tighter">
                          <div className="w-1 h-1 rounded-full bg-[#d4af37]" />
                          {item}
                        </div>
                      ))}
                    </div>

                    <div className="inline-flex items-center gap-4 p-4 rounded-xl bg-white/[0.02] border border-white/5">
                      <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">Outcome:</div>
                      <div className="text-xs font-semibold text-white uppercase tracking-widest">{step.outcome}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Closing CTA */}
        <div className="mt-48 relative p-12 md:p-24 rounded-[3rem] bg-gradient-to-b from-white/[0.03] to-transparent border border-white/5 overflow-hidden text-center">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-[1px] bg-gradient-to-r from-transparent via-[#d4af37] to-transparent" />
          
          <h2 className="font-display text-4xl md:text-6xl text-white mb-8">
            Ready to Build <br />
            <span className="font-serif italic text-[#d4af37]">Your Brand?</span>
          </h2>
          <p className="text-zinc-400 max-w-xl mx-auto mb-12 font-light">
            Transform your vision into a brand designed for growth. Let's engineer your digital sovereignty.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <button className="group relative px-10 py-5 rounded-full bg-white text-black font-bold text-xs tracking-[0.2em] uppercase transition-all duration-500 hover:bg-[#d4af37] flex items-center gap-3">
              Start Your Journey
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="px-10 py-5 rounded-full bg-transparent border border-white/10 text-white font-bold text-xs tracking-[0.2em] uppercase hover:bg-white/5 transition-all flex items-center gap-3">
              <Calendar className="w-4 h-4" />
              Book Discovery Call
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
