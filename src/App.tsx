/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { DataService } from './lib/dataService';
import { supabase, isSupabaseConfigured } from './lib/supabase';
import { StudioConfig, Project, TeamMember, Lead } from './types';
import Header from './components/Header';
import Hero from './components/Hero';
import Assistant from './components/Assistant';
import Portfolio from './components/Portfolio';
import Team from './components/Team';
import FAQ from './components/FAQ';
import Contact from './components/Contact';
import AdminPanel from './components/AdminPanel';
import { Sparkles, Calendar, Heart, Shield, Lock } from 'lucide-react';

export default function App() {
  // Page core states
  const [config, setConfig] = useState<StudioConfig>({ logoUrl: '', backgroundUrl: '' });
  const [projects, setProjects] = useState<Project[]>([]);
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [leads, setLeads] = useState<Lead[]>([]);

  // UI trackers
  const [loading, setLoading] = useState<boolean>(true);
  const [isAdminOpen, setIsAdminOpen] = useState<boolean>(false);
  const [activeSection, setActiveSection] = useState<string>('concept');

  // Load all initial data from our DataService (Supabase & in-memory unified)
  useEffect(() => {
    async function loadResources() {
      try {
        const [loadedConfig, loadedProjects, loadedTeam, loadedLeads] = await Promise.all([
          DataService.getConfig(),
          DataService.getProjects(),
          DataService.getTeam(),
          DataService.getLeads(),
        ]);

        setConfig(loadedConfig);
        setProjects(loadedProjects);
        setMembers(loadedTeam);
        setLeads(loadedLeads);
      } catch (e) {
        console.error("Erreur durant la pré-initialisation de l'atelier :", e);
      } finally {
        setTimeout(() => setLoading(false), 800); // Smooth premium fade-out for loading state
      }
    }
    loadResources();
  }, []);

  // Real-time synchronization for absolute central controls & multi-person reactivity
  useEffect(() => {
    if (isSupabaseConfigured && supabase) {
      const channel = supabase
        .channel('va_database_changes')
        .on(
          'postgres_changes',
          { event: '*', schema: 'public', table: 'va_config' },
          async () => {
            const updatedConfig = await DataService.getConfig();
            setConfig(updatedConfig);
          }
        )
        .on(
          'postgres_changes',
          { event: '*', schema: 'public', table: 'va_projects' },
          async () => {
            const updatedProj = await DataService.getProjects();
            setProjects(updatedProj);
          }
        )
        .on(
          'postgres_changes',
          { event: '*', schema: 'public', table: 'va_team' },
          async () => {
            const updatedTeam = await DataService.getTeam();
            setMembers(updatedTeam);
          }
        )
        .on(
          'postgres_changes',
          { event: '*', schema: 'public', table: 'va_leads' },
          async () => {
            const updatedLeads = await DataService.getLeads();
            setLeads(updatedLeads);
          }
        )
        .subscribe();

      return () => {
        supabase.removeChannel(channel);
      };
    }
  }, []);

  // Set up intersection observer or scroll list to align nav header active state
  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 200;
      const ids = ['concept', 'assistant', 'portfolio', 'team', 'faq', 'brief'];
      
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el) {
          const offsetTop = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= offsetTop && scrollPos < offsetTop + height) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleStartAssistant = () => {
    setIsAdminOpen(false); // Close admin panel if they start diagnostic
    const element = document.getElementById('assistant');
    if (element) {
      const top = element.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  const handleLeadUpdate = async () => {
    // Refresh leads in parent state on completion of guidance assistant
    try {
      const refreshedLeads = await DataService.getLeads();
      setLeads(refreshedLeads);
    } catch (e) {
      console.error(e);
    }
  };

  if (loading) {
    return (
      <div className="fixed inset-0 z-50 bg-[#050506] flex flex-col items-center justify-center text-center">
        <div className="relative flex flex-col items-center">
          {/* Animated luxury starlight loader */}
          <div className="w-16 h-16 rounded-full border border-dashed border-[#d4af37] animate-spin mb-6" />
          
          <h2 className="font-display font-light text-xl tracking-wider text-white uppercase">
            Venture <span className="text-[#d4af37]">Atelier</span>
          </h2>
          <span className="font-mono text-[9px] text-[#d4af37]/60 tracking-widest uppercase mt-1">
            CHARGEMENT SUR-MESURE...
          </span>
        </div>
      </div>
    );
  }

  // --- COMPREHENSIVE SEPARATION: standalone admin/login area ---
  if (isAdminOpen) {
    return (
      <div className="bg-[#050506] text-zinc-100 min-h-screen relative flex flex-col selection:bg-[#d4af37]/20 selection:text-[#f3e5ab] animate-fadeIn">
        {/* Isolated elegant Admin Space Header */}
        <header className="sticky top-0 z-50 bg-[#060608]/95 backdrop-blur-md border-b border-zinc-900 px-6 py-4">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="relative w-9 h-9 rounded-full overflow-hidden border border-[#d4af37]/40 p-0.5 bg-black flex items-center justify-center">
                {config.logoUrl ? (
                  <img src={config.logoUrl} alt="Venture Atelier Logo" className="w-full h-full object-cover rounded-full" />
                ) : (
                  <span className="text-[#d4af37] font-serif font-bold text-base">V</span>
                )}
              </div>
              <div>
                <h1 className="font-display font-medium text-white text-xs sm:text-sm tracking-widest uppercase">VENTURE ATELIER</h1>
                <span className="font-mono text-[9px] text-[#d4af37]/80 tracking-widest uppercase block">Espace Administration Privé</span>
              </div>
            </div>

            <button
              onClick={() => setIsAdminOpen(false)}
              className="cursor-pointer px-4 py-2 rounded-full border border-zinc-800 bg-zinc-950 text-zinc-300 hover:text-white hover:border-[#d4af37]/70 transition-all font-mono text-[10px] uppercase tracking-widest"
            >
              ← Retour au site client
            </button>
          </div>
        </header>

        {/* Dedicated Admin/Login main workspace */}
        <main className="flex-grow bg-[#050506]">
          <AdminPanel 
            config={config}
            projects={projects}
            members={members}
            leads={leads}
            onConfigChange={setConfig}
            onProjectsChange={setProjects}
            onMembersChange={setMembers}
            onLeadsChange={setLeads}
          />
        </main>

        <footer className="bg-black py-12 px-6 border-t border-zinc-900 text-center text-zinc-500 text-xs font-mono">
          <div className="max-w-7xl mx-auto space-y-4">
            <p className="text-[10px] tracking-widest uppercase text-zinc-650">
              © 2026 VENTURE ATELIER — CONSOLE DE CONTRÔLE SÉCURISÉE COMPLÈTEMENT DÉTACHÉE
            </p>
          </div>
        </footer>
      </div>
    );
  }

  // --- CLIENT AREA LAYOUT ---
  return (
    <div className="bg-[#050506] text-zinc-100 min-h-screen relative overflow-x-hidden selection:bg-[#d4af37]/20 selection:text-[#f3e5ab]">
      
      {/* Top sticky elite Header */}
      <Header 
        logoUrl={config.logoUrl} 
        isAdminOpen={isAdminOpen}
        onAdminToggle={() => setIsAdminOpen(!isAdminOpen)}
        navActive={activeSection}
      />

      {/* Main client-only flow */}
      <div className="transition-all duration-500">
        
        {/* Immersive cinematic background and Hero banner */}
        <Hero 
          backgroundUrl={config.backgroundUrl} 
          forgeImageUrl={config.forgeImageUrl}
          moonImageUrl={config.moonImageUrl}
          lightImageUrl={config.lightImageUrl}
          onStartAssistant={handleStartAssistant} 
        />

        {/* Interactive Guidage System */}
        <Assistant onLeadSubmitted={handleLeadUpdate} />

        {/* Narrative Portfolio case studies display */}
        <Portfolio projects={projects} />

        {/* Circle roster of specialists and figures */}
        <Team members={members} />

        {/* Interactive FAQs Accordion */}
        <FAQ />

        {/* Schedulers Booking Clinique and address */}
        <Contact />

      </div>

      {/* Luxury Footer */}
      <footer className="bg-black py-16 px-6 border-t border-zinc-900 text-center text-zinc-500 text-xs font-mono relative">
        <div className="max-w-7xl mx-auto space-y-6">
          
          <div className="flex items-center justify-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[10px] tracking-wider uppercase text-zinc-400">
              Espace Client Sécurisé — +1000 Entreprises Propulsées
            </span>
          </div>

          <div className="h-px bg-zinc-900 w-24 mx-auto" />

          <p className="text-[10px] tracking-widest uppercase text-zinc-650 leading-relaxed">
            © 2026 VENTURE ATELIER. TOUS DROITS RÉSERVÉS. <br />
            MOONLIGHT DESIGN PHILOSOPHY.
          </p>

          <p className="text-[9.5px] text-[#d4af37]/50 mt-1 uppercase tracking-widest flex items-center justify-center gap-1">
            Fait avec amour pour Marc Rosand <Heart className="w-3 h-3 text-red-700 fill-current" />
          </p>

        </div>
      </footer>
    </div>
  );
}
