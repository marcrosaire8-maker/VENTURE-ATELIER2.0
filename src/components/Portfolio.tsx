/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Project } from '../types';
import { Sparkles, Calendar, ChevronLeft, ChevronRight, Layout, BarChart3, Target, Package } from 'lucide-react';

interface PortfolioProps {
  projects: Project[];
}

export default function Portfolio({ projects }: PortfolioProps) {
  const [selectedProjectId, setSelectedProjectId] = useState<string>('');
  const [galleryIndices, setGalleryIndices] = useState<Record<string, number>>({});

  useEffect(() => {
    if (projects.length > 0 && !selectedProjectId) {
      setSelectedProjectId(projects[0].id);
    }
  }, [projects, selectedProjectId]);

  const activeProject = projects.find(p => p.id === selectedProjectId) || projects[0];

  const handlePrevImage = (projId: string, imageCount: number) => {
    setGalleryIndices(prev => {
      const current = prev[projId] || 0;
      const nextIndex = current === 0 ? imageCount - 1 : current - 1;
      return { ...prev, [projId]: nextIndex };
    });
  };

  const handleNextImage = (projId: string, imageCount: number) => {
    setGalleryIndices(prev => {
      const current = prev[projId] || 0;
      const nextIndex = current === imageCount - 1 ? 0 : current + 1;
      return { ...prev, [projId]: nextIndex };
    });
  };

  if (projects.length === 0) {
    return (
      <section id="portfolio" className="bg-[#050505] py-24 px-6 border-b border-white/5 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
             <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 mb-4">
              <Sparkles className="w-3 h-3 text-zinc-500" />
              <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-[0.2em]">Archive & Works</span>
            </div>
            <h2 className="font-display text-4xl text-white font-light">Narrative <span className="font-serif italic text-[#d4af37]">Portfolio.</span></h2>
          </div>
          <div className="max-w-xl mx-auto p-12 rounded-3xl bg-white/[0.02] border border-white/5 text-center backdrop-blur-xl">
            <Layout className="w-10 h-10 text-zinc-800 mx-auto mb-6" />
            <h3 className="text-white font-medium mb-2">No Case Studies Published</h3>
            <p className="text-zinc-500 text-sm font-light">The archive is currently being updated. Use the administrative console to publish new architectural footprints.</p>
          </div>
        </div>
      </section>
    );
  }

  const currentImageIndex = galleryIndices[activeProject?.id] || 0;
  const projectImages = activeProject?.images || [];

  return (
    <section id="portfolio" className="bg-[#050505] py-24 px-6 border-b border-white/5 relative overflow-hidden">
      {/* Ambient blurs */}
      <div className="absolute top-1/2 left-[-10%] w-[40%] h-[40%] rounded-full bg-[#d4af37]/5 blur-[120px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div className="text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#d4af37]/30 bg-[#d4af37]/5 mb-4">
              <Sparkles className="w-3 h-3 text-[#d4af37]" />
              <span className="font-mono text-[10px] text-[#d4af37] uppercase tracking-[0.2em]">Architectural Footprint</span>
            </div>
            <h2 className="font-display text-4xl sm:text-6xl text-white font-light">
              Works & <span className="font-serif italic text-[#d4af37]">Studies.</span>
            </h2>
          </div>
          <p className="text-zinc-500 text-sm sm:text-base max-w-md font-light leading-relaxed text-left md:text-right">
            Discover how we apply Moonlight Architecture to dissipate the shadow of promising ventures and elevate them to market authority.
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-4 border-b border-white/5 mb-16">
          {projects.map((proj) => (
            <button
              key={proj.id}
              onClick={() => setSelectedProjectId(proj.id)}
              className={`pb-4 text-xs sm:text-sm font-mono uppercase tracking-[0.2em] transition-all relative ${
                selectedProjectId === proj.id ? 'text-[#d4af37]' : 'text-zinc-600 hover:text-zinc-400'
              }`}
            >
              {proj.title.split(' - ')[0]}
              {selectedProjectId === proj.id && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#d4af37] shadow-[0_0_10px_#d4af37]" />
              )}
            </button>
          ))}
        </div>

        {/* Active Project Dossier */}
        {activeProject && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start animate-in fade-in slide-in-from-bottom-8 duration-1000">
            
            {/* Left Column: Strategic Narrative */}
            <div className="lg:col-span-5 space-y-10 text-left">
              <div>
                <div className="inline-flex items-center gap-2 text-[9px] font-mono text-zinc-500 uppercase tracking-widest mb-4">
                  <Calendar className="w-3 h-3" />
                  <span>Validated Case Study</span>
                </div>
                <h3 className="font-display text-3xl sm:text-4xl text-white mb-4 leading-tight">{activeProject.title}</h3>
                <p className="text-zinc-400 text-sm font-light leading-relaxed italic">{activeProject.description}</p>
              </div>

              <div className="space-y-8">
                {/* 01. The Challenge */}
                <div className="relative pl-6 group">
                  <div className="absolute left-0 top-0 bottom-0 w-[1px] bg-red-900/30 group-hover:bg-red-500/50 transition-colors" />
                  <h4 className="text-[10px] font-mono text-red-500/70 uppercase tracking-[0.3em] mb-2 flex items-center gap-2">
                    <Target className="w-3 h-3" /> 01. The Challenge
                  </h4>
                  <p className="text-zinc-500 text-xs sm:text-sm font-light leading-relaxed">{activeProject.problem}</p>
                </div>

                {/* 02. Intervention */}
                <div className="relative pl-6 group">
                  <div className="absolute left-0 top-0 bottom-0 w-[1px] bg-[#d4af37]/30 group-hover:bg-[#d4af37] transition-colors" />
                  <h4 className="text-[10px] font-mono text-[#d4af37] uppercase tracking-[0.3em] mb-2 flex items-center gap-2">
                    <Sparkles className="w-3 h-3" /> 02. Moonlight Strategy
                  </h4>
                  <p className="text-zinc-300 text-xs sm:text-sm font-light leading-relaxed">{activeProject.strategy}</p>
                </div>

                {/* 03. Deliverables */}
                <div className="relative pl-6 group">
                  <div className="absolute left-0 top-0 bottom-0 w-[1px] bg-white/10 group-hover:bg-white/30 transition-colors" />
                  <h4 className="text-[10px] font-mono text-zinc-400 uppercase tracking-[0.3em] mb-2 flex items-center gap-2">
                    <Package className="w-3 h-3" /> 03. Key Deliverables
                  </h4>
                  <p className="text-zinc-500 text-xs sm:text-sm font-light leading-relaxed">{activeProject.deliverables}</p>
                </div>

                {/* 04. Outcome */}
                <div className="relative pl-6 py-4 bg-emerald-500/[0.03] rounded-r-2xl border-l-2 border-emerald-500/50">
                  <h4 className="text-[10px] font-mono text-emerald-400 uppercase tracking-[0.3em] mb-2 flex items-center gap-2">
                    <BarChart3 className="w-3 h-3" /> 04. Commercial Impact
                  </h4>
                  <p className="text-emerald-50/80 text-sm font-medium leading-relaxed">{activeProject.results}</p>
                </div>
              </div>
            </div>

            {/* Right Column: Visual Gallery */}
            <div className="lg:col-span-7 flex flex-col gap-6">
              <div className="relative aspect-[16/10] w-full rounded-3xl overflow-hidden bg-white/[0.02] border border-white/10 shadow-2xl group">
                {projectImages.length > 0 && projectImages[currentImageIndex] ? (
                  <img
                    src={projectImages[currentImageIndex]}
                    alt="Project Illustration"
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center text-zinc-700">
                    <Sparkles className="w-12 h-12 mb-4 animate-pulse" />
                    <span className="font-mono text-[10px] uppercase tracking-widest">Awaiting Visual Assets</span>
                  </div>
                )}

                {/* Gallery Nav */}
                {projectImages.length > 1 && (
                  <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between px-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={() => handlePrevImage(activeProject.id, projectImages.length)} className="p-3 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-white hover:bg-[#d4af37] hover:text-black transition-all">
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button onClick={() => handleNextImage(activeProject.id, projectImages.length)} className="p-3 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-white hover:bg-[#d4af37] hover:text-black transition-all">
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                )}

                <div className="absolute bottom-6 left-6 px-4 py-2 bg-black/60 backdrop-blur-md border border-white/10 rounded-full text-[10px] font-mono text-zinc-400">
                  {currentImageIndex + 1} / {projectImages.length}
                </div>
              </div>

              {/* Thumbnail Strip */}
              {projectImages.length > 1 && (
                <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
                  {projectImages.map((imgUrl, idx) => (
                    <button
                      key={idx}
                      onClick={() => setGalleryIndices(prev => ({ ...prev, [activeProject.id]: idx }))}
                      className={`relative w-24 h-16 shrink-0 rounded-xl overflow-hidden border-2 transition-all ${
                        currentImageIndex === idx ? 'border-[#d4af37] scale-105' : 'border-transparent opacity-40 hover:opacity-100'
                      }`}
                    >
                      <img src={imgUrl} alt="Thumbnail" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

          </div>
        )}

      </div>
    </section>
  );
}