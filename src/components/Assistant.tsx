/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Compass, 
  Sparkles, 
  ChevronRight, 
  ChevronLeft, 
  CheckCircle, 
  Check, 
  Send,
  Milestone,
  Gem,
  Megaphone,
  Briefcase,
  Layers,
  Rocket,
  Zap
} from 'lucide-react';
import { DataService } from '../lib/dataService';

interface AssistantProps {
  onLeadSubmitted?: () => void;
}

export default function Assistant({ onLeadSubmitted }: AssistantProps) {
  // Navigation & Step Trackers
  const [step, setStep] = useState<1 | 2 | 3 | 4 | 5>(1);
  
  // Selection States
  const [projectNature, setProjectNature] = useState<string>('');
  const [stage, setStage] = useState<string>('');
  const [need, setNeed] = useState<string>('');

  // Contact States
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [company, setCompany] = useState('');

  // Result & Pending State
  const [computedOffer, setComputedOffer] = useState<'Forge' | 'Moon' | 'Light'>('Forge');
  const [submitting, setSubmitting] = useState(false);

  // Core Options Definitions
  const projectNatures = [
    { id: 'saas', label: 'SaaS / Tech Solution', icon: '💻' },
    { id: 'ecommerce', label: 'E-commerce & Online Store', icon: '🛍️' },
    { id: 'luxury', label: 'Premium or Luxury Brand', icon: '💎' },
    { id: 'personal', label: 'Personal Brand / Creator', icon: '🎙️' },
    { id: 'agency', label: 'Consultancy / Service Agency', icon: '📈' },
    { id: 'other', label: 'Other Unique Project', icon: '✨' },
  ];

  const developmentStages = [
    { id: 'idea', label: 'Idea & Exploration', desc: 'Concept is maturing, you need strong foundations.', icon: <Compass className="w-5 h-5"/> },
    { id: 'mvp', label: 'Building MVP / Prototype', desc: 'The offer or product needs to materialize quickly.', icon: <Layers className="w-5 h-5"/> },
    { id: 'growth', label: 'Active Growth / Traction', desc: 'You have initial clients, now you must solidify your image.', icon: <Rocket className="w-5 h-5"/> },
    { id: 'scale', label: 'Scale-Up & Mass Expansion', desc: 'Moving to the big leagues, industrializing the message.', icon: <Zap className="w-5 h-5"/> },
  ];

  const clientNeeds = [
    { id: 'direction', label: 'Strategy & Authority', icon: <Milestone className="w-5 h-5 text-[#d4af37]" /> },
    { id: 'identity', label: 'Prestigious Visual Identity', icon: <Gem className="w-5 h-5 text-[#d4af37]" /> },
    { id: 'awareness', label: 'Visibility & Content Growth', icon: <Megaphone className="w-5 h-5 text-[#d4af37]" /> },
    { id: 'sales', label: 'Leads & Higher Conversion', icon: <Briefcase className="w-5 h-5 text-[#d4af37]" /> },
  ];

  // Algorithmic Recommendation Logic
  const handleCalculateRecommendation = () => {
    if (need === 'Prestigious Visual Identity') {
      setComputedOffer('Moon');
    } else if (need === 'Visibility & Content Growth' || stage === 'Scale-Up & Mass Expansion') {
      setComputedOffer('Light');
    } else {
      setComputedOffer('Forge');
    }
    setStep(4);
  };

  const handleSubmitLead = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;

    setSubmitting(true);
    try {
      await DataService.saveLead({
        name,
        email,
        phone,
        company,
        projectNature,
        stage,
        need,
        recommendation: computedOffer,
      });

      setStep(5);
      if (onLeadSubmitted) onLeadSubmitted();
    } catch (e) {
      console.error(e);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="assistant" className="bg-[#050505] py-16 sm:py-24 px-4 sm:px-6 relative overflow-hidden">
      {/* Dynamic Background Accents */}
      <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-[#d4af37]/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-600/5 blur-[120px] pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">
        
        {/* Title Block */}
        <div className="text-center mb-10 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#d4af37]/30 bg-[#d4af37]/5 mb-4">
            <Sparkles className="w-3 h-3 text-[#d4af37]" />
            <span className="font-mono text-[10px] text-[#d4af37] uppercase tracking-[0.2em]">Intelligent Configurator</span>
          </div>
          <h2 className="font-display text-3xl sm:text-6xl text-white font-light leading-tight">
            Architecting your <span className="font-serif italic text-[#d4af37]">vision.</span>
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base max-w-2xl mx-auto mt-4 font-light leading-relaxed">
            Answer 3 key questions. Our algorithm will instantly determine the ideal Moonlight architecture to propel your venture.
          </p>
        </div>

        {/* Dynamic Multi-Step Assistant Box */}
        <div className="bg-zinc-900/40 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden shadow-2xl">
          
          {/* Progress Indicator */}
          {step <= 4 && (
            <div className="grid grid-cols-4 border-b border-white/5">
              {[1, 2, 3, 4].map((s) => (
                <div 
                  key={s} 
                  className={`py-4 text-center transition-all duration-500 border-b-2 ${
                    step >= s ? 'border-[#d4af37] bg-[#d4af37]/5' : 'border-transparent opacity-30'
                  }`}
                >
                  <span className={`font-mono text-[10px] font-bold ${step >= s ? 'text-[#d4af37]' : 'text-zinc-500'}`}>
                    0{s}
                  </span>
                </div>
              ))}
            </div>
          )}

          <div className="p-6 sm:p-12">
            {/* STEP 1: NATURE OF THE PROJECT */}
            {step === 1 && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
                <div className="mb-8 text-left">
                  <h3 className="text-xl sm:text-2xl text-white font-medium mb-2">What is the nature of your project?</h3>
                  <p className="text-zinc-500 text-sm">Select the category that best defines your current venture.</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {projectNatures.map((nature) => (
                    <button
                      key={nature.id}
                      onClick={() => { setProjectNature(nature.label); setStep(2); }}
                      className="group relative p-6 rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-[#d4af37]/5 hover:border-[#d4af37]/50 transition-all duration-300 text-left overflow-hidden"
                    >
                      <span className="text-3xl mb-4 block group-hover:scale-110 transition-transform duration-300">{nature.icon}</span>
                      <span className="text-white font-medium text-sm sm:text-base">{nature.label}</span>
                      <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                        <ChevronRight className="w-4 h-4 text-[#d4af37]" />
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* STEP 2: DEVELOPMENT STAGE */}
            {step === 2 && (
              <div className="animate-in fade-in slide-in-from-right-4 duration-700">
                <div className="mb-8 text-left">
                  <button onClick={() => setStep(1)} className="text-zinc-500 hover:text-white flex items-center gap-2 text-xs mb-4 transition-colors">
                    <ChevronLeft className="w-4 h-4" /> Back
                  </button>
                  <h3 className="text-xl sm:text-2xl text-white font-medium mb-2">What stage are you at?</h3>
                  <p className="text-zinc-500 text-sm">Your development stage directly influences our technical approach.</p>
                </div>
                <div className="space-y-4">
                  {developmentStages.map((st) => (
                    <button
                      key={st.id}
                      onClick={() => { setStage(st.label); setStep(3); }}
                      className={`w-full p-5 rounded-2xl border transition-all duration-300 flex items-center gap-5 ${
                        stage === st.label 
                        ? 'bg-[#d4af37]/10 border-[#d4af37] shadow-lg shadow-[#d4af37]/5' 
                        : 'bg-white/[0.02] border-white/5 hover:border-white/20'
                      }`}
                    >
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
                        stage === st.label ? 'bg-[#d4af37] text-black' : 'bg-zinc-800 text-zinc-400'
                      }`}>
                        {st.icon}
                      </div>
                      <div className="text-left flex-1">
                        <div className="text-white font-medium text-sm sm:text-base">{st.label}</div>
                        <div className="text-zinc-500 text-xs mt-1 font-light">{st.desc}</div>
                      </div>
                      <div className={`w-6 h-6 rounded-full border flex items-center justify-center ${
                        stage === st.label ? 'border-[#d4af37] bg-[#d4af37]/20 text-[#d4af37]' : 'border-zinc-700'
                      }`}>
                        {stage === st.label && <Check className="w-3.5" />}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* STEP 3: CORE NEED */}
            {step === 3 && (
              <div className="animate-in fade-in slide-in-from-right-4 duration-700">
                <div className="mb-8 text-left">
                  <button onClick={() => setStep(2)} className="text-zinc-500 hover:text-white flex items-center gap-2 text-xs mb-4 transition-colors">
                    <ChevronLeft className="w-4 h-4" /> Back
                  </button>
                  <h3 className="text-xl sm:text-2xl text-white font-medium mb-2">What is your primary need?</h3>
                  <p className="text-zinc-500 text-sm">Identify the main lever to unlock your growth immediately.</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {clientNeeds.map((nd) => (
                    <button
                      key={nd.id}
                      onClick={() => setNeed(nd.label)}
                      className={`p-6 rounded-2xl border transition-all duration-300 text-left ${
                        need === nd.label 
                        ? 'bg-[#d4af37]/10 border-[#d4af37]' 
                        : 'bg-white/[0.02] border-white/5 hover:border-white/20'
                      }`}
                    >
                      <div className="mb-4">{nd.icon}</div>
                      <div className="text-white font-medium text-sm mb-4 leading-tight">{nd.label}</div>
                      <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                        need === nd.label ? 'border-[#d4af37] bg-[#d4af37] text-black' : 'border-zinc-700'
                      }`}>
                        {need === nd.label && <Check className="w-3" />}
                      </div>
                    </button>
                  ))}
                </div>
                <button
                  disabled={!need}
                  onClick={handleCalculateRecommendation}
                  className="w-full mt-10 py-4 bg-white text-black rounded-xl font-bold text-sm tracking-widest uppercase hover:bg-[#d4af37] transition-colors disabled:opacity-20 flex items-center justify-center gap-2"
                >
                  Calculate Recommendation <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* STEP 4: RECOMMENDATION & LEAD FORM */}
            {step === 4 && (
              <div className="animate-in fade-in zoom-in-95 duration-700">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 text-left">
                  {/* Result Summary */}
                  <div>
                    <span className="font-mono text-[10px] text-[#d4af37] tracking-[0.3em] uppercase block mb-4">Recommended Architecture</span>
                    <h3 className="text-4xl sm:text-5xl text-white font-display mb-6">
                      The <span className="text-[#d4af37] italic">{computedOffer}</span> Offer
                    </h3>
                    <p className="text-zinc-400 text-sm leading-relaxed mb-8">
                      Based on your <span className="text-white">{projectNature}</span> project at the <span className="text-white">{stage}</span> stage, 
                      our system recommends implementing the <span className="text-white">{computedOffer}</span> structure.
                    </p>
                    
                    <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6">
                      <h4 className="text-[#d4af37] font-mono text-[10px] uppercase tracking-widest mb-3">Strategic Focus</h4>
                      <p className="text-zinc-300 text-sm font-light leading-relaxed italic">
                        {computedOffer === 'Forge' && "Sculpting a radical positioning, clarifying your offer, and building indestructible business foundations."}
                        {computedOffer === 'Moon' && "Creating an exceptional visual universe, prestige design, and an interface that commands immediate respect."}
                        {computedOffer === 'Light' && "Amplifying your voice, dominating social networks through intellectual content, and scaling your influence."}
                      </p>
                    </div>
                  </div>

                  {/* Form */}
                  <form onSubmit={handleSubmitLead} className="space-y-4">
                    <h4 className="text-[10px] font-mono text-[#f3e5ab] uppercase tracking-[0.2em] mb-4">Receive your detailed diagnostic</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest ml-1">Full Name</label>
                        <input required type="text" value={name} onChange={e => setName(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[#d4af37] outline-none transition-all placeholder:text-zinc-700" placeholder="John Doe" />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest ml-1">Work Email</label>
                        <input required type="email" value={email} onChange={e => setEmail(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[#d4af37] outline-none transition-all placeholder:text-zinc-700" placeholder="john@company.com" />
                      </div>
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest ml-1">Company / Project</label>
                      <input type="text" value={company} onChange={e => setCompany(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[#d4af37] outline-none transition-all placeholder:text-zinc-700" placeholder="Venture Name" />
                    </div>
                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full py-4 bg-[#d4af37] text-black rounded-xl font-bold text-sm tracking-widest uppercase hover:brightness-110 transition-all shadow-lg shadow-[#d4af37]/20 flex items-center justify-center gap-3"
                    >
                      {submitting ? 'Transmitting...' : 'Submit Diagnostic'}
                      <Send className="w-4 h-4" />
                    </button>
                    <p className="text-[10px] text-zinc-600 text-center mt-4">
                      By submitting, you agree to be contacted regarding your strategic diagnostic.
                    </p>
                  </form>
                </div>
              </div>
            )}

            {/* STEP 5: SUCCESS & CERTIFICATE */}
            {step === 5 && (
              <div className="animate-in fade-in zoom-in-95 duration-1000 text-center py-10">
                <div className="w-20 h-20 bg-[#d4af37]/20 rounded-full flex items-center justify-center mx-auto mb-8 border border-[#d4af37]/30 shadow-2xl shadow-[#d4af37]/20">
                  <CheckCircle className="w-10 h-10 text-[#d4af37]" />
                </div>
                <h3 className="text-3xl sm:text-4xl text-white font-display mb-4">Diagnostic Validated.</h3>
                <p className="text-zinc-400 max-w-md mx-auto mb-12 text-sm sm:text-base">
                  Thank you <span className="text-white">{name}</span>. Your profile has been integrated into our system. A Moonlight expert will reach out within 24 hours.
                </p>

                {/* Virtual Certificate Card */}
                <div className="max-w-md mx-auto relative group">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-[#d4af37] to-amber-600 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
                  <div className="relative bg-[#0a0a0a] border border-white/10 rounded-2xl p-8 text-left font-mono overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-10">
                      <Sparkles className="w-12 h-12 text-[#d4af37]" />
                    </div>
                    <div className="flex justify-between items-start mb-8 border-b border-white/5 pb-4">
                      <div>
                        <div className="text-[9px] text-[#d4af37] tracking-[0.2em] mb-1">PARTNERSHIP PROFILE</div>
                        <div className="text-white text-lg font-sans font-bold tracking-tight uppercase">{computedOffer} Architecture</div>
                      </div>
                      <div className="text-right">
                        <div className="text-[8px] text-zinc-600 mb-1">REF-ID</div>
                        <div className="text-[10px] text-zinc-400">ML-{Math.floor(Math.random()*10000)}</div>
                      </div>
                    </div>
                    <div className="space-y-3 mb-8 text-[11px]">
                      <div className="flex justify-between"><span className="text-zinc-600 uppercase">Partner</span> <span className="text-zinc-200">{name}</span></div>
                      <div className="flex justify-between"><span className="text-zinc-600 uppercase">Sector</span> <span className="text-zinc-200">{projectNature}</span></div>
                      <div className="flex justify-between"><span className="text-zinc-600 uppercase">Status</span> <span className="text-[#d4af37] animate-pulse">Priority Onboarding</span></div>
                    </div>
                    <div className="bg-white/5 rounded-lg p-3 flex items-center justify-between">
                      <span className="text-[9px] text-zinc-400 uppercase">Studio Access</span>
                      <span className="text-[10px] text-white">Reserved (2026)</span>
                    </div>
                  </div>
                </div>

                <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
                  <button className="px-8 py-4 bg-[#d4af37] text-black rounded-full font-bold text-xs uppercase tracking-widest hover:scale-105 transition-transform">
                    Schedule Onboarding Call
                  </button>
                  <button onClick={() => setStep(1)} className="px-8 py-4 border border-white/10 text-white rounded-full font-bold text-xs uppercase tracking-widest hover:bg-white/5 transition-colors">
                    Restart Diagnostic
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}