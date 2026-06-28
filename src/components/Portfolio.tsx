/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Project } from '../types';
import { Sparkles, Calendar, ChevronLeft, ChevronRight, Layout, BarChart3, Target, Package, X, Maximize2 } from 'lucide-react';

interface PortfolioProps {
  projects: Project[];
}

export default function Portfolio({ projects }: PortfolioProps) {
  const [selectedProjectId, setSelectedProjectId] = useState<string>('');
  const [galleryIndices, setGalleryIndices] = useState<Record<string, number>>({});
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  useEffect(() => {
    if (projects.length > 0 && !selectedProjectId) {
      setSelectedProjectId(projects[0].id);
    }
  }, [projects, selectedProjectId]);

  const activeProject = projects.find(p => p.id === selectedProjectId) || projects[0];

  const handlePrevImage = (e: React.MouseEvent, projId: string, imageCount: number) => {
    e.stopPropagation(); // Empêche l'ouverture de la lightbox lors du clic sur les flèches
    setGalleryIndices(prev => {
      const current = prev[projId] || 0;
      const nextIndex = current === 0 ? imageCount - 1 : current - 1;
      return { ...prev, [projId]: nextIndex };
    });
  };

  const handleNextImage = (e: React.MouseEvent, projId: string, imageCount: number) => {
    e.stopPropagation(); // Empêche l'ouverture de la lightbox lors du clic sur les flèches
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
             <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 mb-6">
              <Sparkles className="w-3.5 h-3.5 text-zinc-500" />
              <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-[0.25em]">Archive & Works</span>
            </div>
            <h2 className="font-display text-5xl text-white font-extralight">Narrative <span className="font-serif italic text-[#d4af37]">Portfolio.</span></h2>
          </div>
          <div className="max-w-xl mx-auto p-16 rounded-[2rem] bg-white/[0.02] border border-white/10 text-center backdrop-blur-2xl">
            <Layout className="w-12 h-12 text-zinc-800 mx-auto mb-6" />
            <h3 className="text-white text-xl font-medium mb-3">No Case Studies Published</h3>
            <p className="text-zinc-500 text-sm font-light">The archive is currently being updated. Use the administrative console to publish new architectural footprints.</p>
          </div>
        </div>
      </section>
    );
  }

  const currentImageIndex = galleryIndices[activeProject?.id] || 0;
  const projectImages = activeProject?.images || [];

  return (
    <section id="portfolio" className="bg-[#050505] py-24 sm:py-32 px-4 sm:px-6 border-b border-white/5 relative overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-1/4 right-[-5%] w-[45%] h-[45%] rounded-full bg-[#d4af37]/5 blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 left-[-5%] w-[30%] h-[30%] rounded-full bg-white/5 blur-[100px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-10">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#d4af37]/30 bg-[#d4af37]/5 mb-6 animate-fade-in">
              <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
              <span className="font-mono text-[10px] text-[#d4af37] uppercase tracking-[0.25em]">Architectural Footprint</span>
            </div>
            <h2 className="font-display text-5xl sm:text-7xl text-white font-extralight leading-tight">
              Works & <span className="font-serif italic text-[#d4af37]">Studies.</span>
            </h2>
          </div>
          <p className="text-zinc-400 text-base sm:text-lg max-w-sm font-light leading-relaxed">
            Case studies documenting the transformation of promising ventures into market authorities.
          </p>
        </div>

        {/* Navigation Tabs - Premium Style */}
        <div className="flex flex-wrap gap-x-8 gap-y-4 border-b border-white/10 mb-16 px-2 overflow-x-auto scrollbar-hide">
          {projects.map((proj) => (
            <button
              key={proj.id}
              onClick={() => setSelectedProjectId(proj.id)}
              className={`pb-4 text-[11px] font-mono uppercase tracking-[0.3em] transition-all relative whitespace-nowrap ${
                selectedProjectId === proj.id ? 'text-[#d4af37]' : 'text-zinc-600 hover:text-zinc-400'
              }`}
            >
              {proj.title.split(' - ')[0]}
              {selectedProjectId === proj.id && (
                <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#d4af37] shadow-[0_0_15px_#d4af37]" />
              )}
            </button>
          ))}
        </div>

        {/* Active Project Dossier */}
        {activeProject && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">
            
            {/* Left Column: Strategic Narrative */}
            <div className="lg:col-span-5 space-y-12 animate-in fade-in slide-in-from-left-8 duration-700">
              <div>
                <div className="inline-flex items-center gap-2 text-[10px] font-mono text-zinc-500 uppercase tracking-widest mb-6">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Validated Portfolio Piece</span>
                </div>
                <h3 className="font-display text-4xl sm:text-5xl text-white mb-6 leading-tight font-extralight">{activeProject.title}</h3>
                <p className="text-zinc-400 text-lg font-light leading-relaxed italic border-l border-[#d4af37]/30 pl-6">{activeProject.description}</p>
              </div>

              <div className="space-y-10">
                {/* 01. The Challenge */}
                <div className="relative pl-8 group">
                  <div className="absolute left-0 top-1 w-[1px] h-[80%] bg-zinc-800 group-hover:bg-red-900/50 transition-colors" />
                  <h4 className="text-[11px] font-mono text-zinc-500 group-hover:text-red-500/70 uppercase tracking-[0.3em] mb-3 flex items-center gap-3 transition-colors">
                    <Target className="w-3.5 h-3.5" /> 01. The Challenge
                  </h4>
                  <p className="text-zinc-500 text-sm leading-relaxed font-light">{activeProject.problem}</p>
                </div>

                {/* 02. Intervention */}
                <div className="relative pl-8 group">
                  <div className="absolute left-0 top-1 w-[2px] h-[80%] bg-[#d4af37]/20 group-hover:bg-[#d4af37] transition-colors" />
                  <h4 className="text-[11px] font-mono text-[#d4af37] uppercase tracking-[0.3em] mb-3 flex items-center gap-3">
                    <Sparkles className="w-3.5 h-3.5" /> 02. Moonlight Strategy
                  </h4>
                  <p className="text-zinc-300 text-sm leading-relaxed font-light">{activeProject.strategy}</p>
                </div>

                {/* 03. Deliverables */}
                <div className="relative pl-8 group">
                  <div className="absolute left-0 top-1 w-[1px] h-[80%] bg-zinc-800 group-hover:bg-zinc-400 transition-colors" />
                  <h4 className="text-[11px] font-mono text-zinc-500 group-hover:text-zinc-400 uppercase tracking-[0.3em] mb-3 flex items-center gap-3 transition-colors">
                    <Package className="w-3.5 h-3.5" /> 03. Key Deliverables
                  </h4>
                  <p className="text-zinc-500 text-sm leading-relaxed font-light">{activeProject.deliverables}</p>
                </div>

                {/* 04. Outcome */}
                <div className="relative p-6 bg-emerald-500/[0.02] rounded-2xl border border-emerald-500/10">
                  <h4 className="text-[11px] font-mono text-emerald-400 uppercase tracking-[0.3em] mb-3 flex items-center gap-3">
                    <BarChart3 className="w-3.5 h-3.5" /> 04. Commercial Impact
                  </h4>
                  <p className="text-emerald-50/70 text-base font-medium leading-relaxed">{activeProject.results}</p>
                </div>
              </div>
            </div>

            {/* Right Column: Visual Gallery */}
            <div className="lg:col-span-7 flex flex-col gap-8 animate-in fade-in slide-in-from-right-8 duration-700">
              <div 
                onClick={() => setIsLightboxOpen(true)}
                className="relative aspect-[16/10] w-full rounded-[2.5rem] overflow-hidden bg-zinc-900 border border-white/10 shadow-2xl group cursor-zoom-in"
              >
                {projectImages.length > 0 && projectImages[currentImageIndex] ? (
                  <>
                    <img
                      src={projectImages[currentImageIndex]}
                      alt="Project Illustration"
                      className="w-full h-full object-cover transition-all duration-1000 grayscale-[0.3] group-hover:grayscale-0 group-hover:scale-105"
                    />
                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                      <div className="bg-white/10 backdrop-blur-md p-5 rounded-full border border-white/20 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                        <Maximize2 className="w-6 h-6 text-white" />
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center text-zinc-800">
                    <Sparkles className="w-16 h-16 mb-4 animate-pulse" />
                    <span className="font-mono text-[10px] uppercase tracking-[0.4em]">Awaiting Visual Assets</span>
                  </div>
                )}

                {/* Gallery Nav - Floating buttons */}
                {projectImages.length > 1 && (
                  <div className="absolute inset-x-6 top-1/2 -translate-y-1/2 flex justify-between pointer-events-none">
                    <button 
                      onClick={(e) => handlePrevImage(e, activeProject.id, projectImages.length)} 
                      className="p-4 rounded-full bg-black/40 backdrop-blur-xl border border-white/10 text-white hover:bg-[#d4af37] hover:text-black transition-all pointer-events-auto"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button 
                      onClick={(e) => handleNextImage(e, activeProject.id, projectImages.length)} 
                      className="p-4 rounded-full bg-black/40 backdrop-blur-xl border border-white/10 text-white hover:bg-[#d4af37] hover:text-black transition-all pointer-events-auto"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                )}

                <div className="absolute bottom-8 right-8 px-5 py-2 bg-black/60 backdrop-blur-xl border border-white/10 rounded-full text-[10px] font-mono text-white tracking-widest">
                  {currentImageIndex + 1} / {projectImages.length}
                </div>
              </div>

              {/* Thumbnail Strip - Refined Style */}
              {projectImages.length > 1 && (
                <div className="flex gap-5 overflow-x-auto pb-4 scrollbar-hide px-2">
                  {projectImages.map((imgUrl, idx) => (
                    <button
                      key={idx}
                      onClick={() => setGalleryIndices(prev => ({ ...prev, [activeProject.id]: idx }))}
                      className={`relative w-28 h-20 shrink-0 rounded-[1.25rem] overflow-hidden border-2 transition-all duration-500 ${
                        currentImageIndex === idx 
                          ? 'border-[#d4af37] scale-110 shadow-[0_0_20px_rgba(212,175,55,0.2)]' 
                          : 'border-transparent opacity-30 hover:opacity-100'
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

      {/* --- LIGHTBOX (ZOOM) --- */}
      {isLightboxOpen && activeProject && projectImages[currentImageIndex] && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-10 bg-black/98 backdrop-blur-2xl animate-in fade-in duration-300"
          onClick={() => setIsLightboxOpen(false)}
        >
          <button className="absolute top-8 right-8 text-white/50 hover:text-white transition-colors p-2">
            <X className="w-10 h-10" />
          </button>
          
          <div className="relative max-w-6xl w-full h-full flex items-center justify-center" onClick={e => e.stopPropagation()}>
            <img 
              src={projectImages[currentImageIndex]} 
              alt="Full Case Study View"
              className="max-h-[85vh] w-auto object-contain rounded-xl shadow-[0_0_100px_rgba(0,0,0,0.5)] border border-white/5"
            />
            <div className="absolute -bottom-12 left-0 right-0 text-center">
              <p className="text-zinc-500 font-mono text-[10px] uppercase tracking-[0.4em]">
                {activeProject.title} — Figure {currentImageIndex + 1}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
