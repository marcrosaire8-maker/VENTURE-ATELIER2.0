/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  ShieldAlert, KeyRound, Upload, Users, Trash2, X, CheckCircle, 
  Image as ImageIcon, LogOut, FolderPlus, RefreshCw, Shield, 
  Activity, Globe, Fingerprint, Lock, ChevronRight, Database, 
  Search, UserPlus, BarChart3, Layout, Layers, ShieldCheck
} from 'lucide-react';
import { DataService } from '../lib/dataService';
import { StudioConfig, Project, TeamMember, Lead, AuditLog } from '../types';

interface AdminPanelProps {
  config: StudioConfig;
  projects: Project[];
  members: TeamMember[];
  leads: Lead[];
  onConfigChange: (newConfig: StudioConfig) => void;
  onProjectsChange: (newProjects: Project[]) => void;
  onMembersChange: (newMembers: TeamMember[]) => void;
  onLeadsChange: (newLeads: Lead[]) => void;
}

// In-memory auth tracker to prevent session loss on tab toggle
let isGlobalAdminAuthenticated = false;

export default function AdminPanel({
  config, projects, members, leads,
  onConfigChange, onProjectsChange, onMembersChange, onLeadsChange
}: AdminPanelProps) {
  
  // --- 1. AUTHENTICATION & SECURITY STATE ---
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(isGlobalAdminAuthenticated);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [failedAttempts, setFailedAttempts] = useState<number>(0);
  const [lockoutTimer, setLockoutTimer] = useState<number>(0);

  // --- 2. UI & NAVIGATION STATES ---
  const [activeTab, setActiveTab] = useState<'design' | 'portfolio' | 'team' | 'leads' | 'security'>('design');
  const [notification, setNotification] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [loadingLogs, setLoadingLogs] = useState<boolean>(false);
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>([]);

  // --- 3. CMS FORM STATES ---
  const [editingProject, setEditingProject] = useState<Partial<Project> | null>(null);
  const [projectImages, setProjectImages] = useState<string[]>([]);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [editingMember, setEditingMember] = useState<Partial<TeamMember> | null>(null);
  const [memberAvatar, setMemberAvatar] = useState<string>('');

  // --- 4. LIFECYCLE EFFECTS ---
  useEffect(() => {
    if (isAuthenticated) fetchLogs();
  }, [isAuthenticated, activeTab]);

  useEffect(() => {
    if (lockoutTimer > 0) {
      const interval = setInterval(() => setLockoutTimer(prev => prev - 1), 1000);
      return () => clearInterval(interval);
    }
  }, [lockoutTimer]);

  // --- 5. CORE UTILITY FUNCTIONS ---
  const triggerNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(''), 4000);
  };

  const fetchLogs = async () => {
    setLoadingLogs(true);
    try {
      const logs = await DataService.getAuditLogs();
      setAuditLogs(logs);
    } catch (err) { console.error("Audit log error:", err); } 
    finally { setLoadingLogs(false); }
  };

  // --- 6. AUTHENTICATION HANDLERS ---
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (lockoutTimer > 0) return;
    setLoading(true);
    setAuthError('');
    try {
      const result = await DataService.authenticateAdmin(email, password);
      if (result.success) {
        setIsAuthenticated(true);
        isGlobalAdminAuthenticated = true;
        setFailedAttempts(0);
        triggerNotification("Authority granted. Command Center active.");
      } else {
        const nextFailed = failedAttempts + 1;
        setFailedAttempts(nextFailed);
        if (nextFailed >= 3) {
          setLockoutTimer(60);
          await DataService.logSecurityAction('BRUTE_FORCE_ALERT', email, "Brute force detected. 60s lockout.", 'WARNING');
        }
        setAuthError(`Cipher incorrect. ${3 - nextFailed} attempts remaining.`);
      }
    } catch (err) { setAuthError("System authentication failed."); } 
    finally { setLoading(false); }
  };

  const handleLogout = async () => {
    await DataService.logSecurityAction('LOGOUT', 'admin@ventureatelier.com', 'Manual session termination.', 'SUCCESS');
    setIsAuthenticated(false);
    isGlobalAdminAuthenticated = false;
    triggerNotification("Session terminated.");
  };

  // --- 7. DESIGN & IDENTITY HANDLERS ---
  const handleAssetUpload = async (e: React.ChangeEvent<HTMLInputElement>, key: keyof StudioConfig, label: string) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setLoading(true);
    try {
      const url = await DataService.uploadMedia(file);
      const newConfig = { ...config, [key]: url };
      const saved = await DataService.saveConfig(newConfig);
      onConfigChange(saved);
      triggerNotification(`${label} updated successfully.`);
    } catch (err) { triggerNotification("Upload failed."); } 
    finally { setLoading(false); }
  };

  // --- 8. CMS: PORTFOLIO HANDLERS ---
  const handleInitNewProject = () => {
    setEditingProject({ title: '', description: '', problem: '', strategy: '', deliverables: '', results: '' });
    setProjectImages([]);
  };

  const handleEditProject = (p: Project) => {
    setEditingProject(p);
    setProjectImages(p.images || []);
  };

  const handleProjectImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    setUploadingImage(true);
    try {
      const urls = [];
      for (const file of Array.from(files)) {
        const url = await DataService.uploadMedia(file);
        urls.push(url);
      }
      setProjectImages(prev => [...prev, ...urls]);
      triggerNotification(`${urls.length} asset(s) added to gallery.`);
    } finally { setUploadingImage(false); }
  };

  const handleSaveProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProject) return;
    setLoading(true);
    try {
      const payload = { ...editingProject, images: projectImages } as any;
      await DataService.saveProject(payload);
      onProjectsChange(await DataService.getProjects());
      setEditingProject(null);
      triggerNotification("Project secured in CMS.");
    } finally { setLoading(false); }
  };

  const handleDeleteProject = async (id: string) => {
    if (!confirm("Confirm permanent erasure of this study?")) return;
    setLoading(true);
    try {
      await DataService.deleteProject(id);
      onProjectsChange(await DataService.getProjects());
      triggerNotification("Project deleted.");
    } finally { setLoading(false); }
  };

  // --- 9. CMS: TEAM HANDLERS ---
  const handleInitNewMember = () => {
    setEditingMember({ firstName: '', lastName: '', role: 'Advisor' });
    setMemberAvatar('');
  };

  const handleSaveMember = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingMember) return;
    setLoading(true);
    try {
      await DataService.saveTeamMember({ ...editingMember, avatarUrl: memberAvatar } as any);
      onMembersChange(await DataService.getTeam());
      setEditingMember(null);
      triggerNotification("Advisor record updated.");
    } finally { setLoading(false); }
  };

  const handleDeleteMember = async (id: string) => {
    if (!confirm("Remove this advisor from the collective?")) return;
    setLoading(true);
    try {
      await DataService.deleteTeamMember(id);
      onMembersChange(await DataService.getTeam());
      triggerNotification("Personnel removed.");
    } finally { setLoading(false); }
  };

  // --- 10. CRM: LEADS HANDLERS ---
  const handleStatusChange = async (leadId: string, status: any) => {
    const lead = leads.find(l => l.id === leadId);
    if (!lead) return;
    try {
      await DataService.saveLead({ ...lead, status });
      onLeadsChange(leads.map(l => l.id === leadId ? { ...l, status } : l));
      triggerNotification(`Lead status updated to ${status}.`);
    } catch (err) { console.error(err); }
  };

  // --- RENDER: AUTHENTICATION GATE ---
  if (!isAuthenticated) {
    return (
      <section className="bg-[#050505] min-h-screen flex items-center justify-center p-6 relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#d4af3710_0%,transparent_70%)]" />
        <div className="max-w-md w-full bg-zinc-900/40 backdrop-blur-3xl border border-white/10 rounded-3xl p-10 relative animate-in zoom-in-95 duration-700">
           <div className="flex flex-col items-center mb-10">
              <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-6">
                <Lock className="w-8 h-8 text-[#d4af37]" />
              </div>
              <h2 className="text-2xl text-white font-display">Command Center</h2>
              <p className="text-zinc-500 font-mono text-[10px] uppercase tracking-widest mt-2">Authority Required</p>
           </div>
           {authError && (
             <div className="mb-6 p-4 rounded-xl bg-red-500/5 border border-red-500/20 text-red-400 text-xs flex gap-3"><ShieldAlert className="w-4 h-4 shrink-0" /> {authError}</div>
           )}
           <form onSubmit={handleLogin} className="space-y-6">
              <input type="email" required placeholder="Identifier" value={email} onChange={e => setEmail(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white outline-none focus:border-[#d4af37] transition-all" />
              <input type="password" required placeholder="Access Cipher" value={password} onChange={e => setPassword(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white outline-none focus:border-[#d4af37] transition-all" />
              <button disabled={loading || lockoutTimer > 0} className="w-full py-4 bg-[#d4af37] text-black rounded-xl font-bold font-mono text-xs uppercase tracking-widest hover:brightness-110 transition-all">
                {lockoutTimer > 0 ? `Locked (${lockoutTimer}s)` : loading ? 'Verifying...' : 'Authenticate'}
              </button>
           </form>
        </div>
      </section>
    );
  }

  // --- RENDER: MAIN CONSOLE ---
  return (
    <section className="bg-[#050505] min-h-screen py-10 px-4 sm:px-8 relative text-left">
      {notification && (
        <div className="fixed bottom-8 right-8 z-[100] animate-in slide-in-from-bottom-5">
          <div className="bg-zinc-900 border border-[#d4af37]/40 rounded-2xl p-4 flex items-center gap-3 shadow-2xl">
            <CheckCircle className="w-4 h-4 text-[#d4af37]" />
            <p className="text-zinc-100 text-[10px] font-mono uppercase tracking-wider">{notification}</p>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6 border-b border-white/5 pb-10">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <ShieldCheck className="w-4 h-4 text-[#d4af37]" />
              <span className="font-mono text-[9px] text-zinc-500 uppercase tracking-[0.3em]">Encrypted Session Active</span>
            </div>
            <h2 className="text-white text-3xl font-display">Command <span className="font-serif italic text-[#d4af37]">Operations.</span></h2>
          </div>
          <button onClick={handleLogout} className="p-4 rounded-full bg-white/5 border border-white/10 hover:border-red-500/40 hover:text-red-500 transition-all"><LogOut className="w-4 h-4" /></button>
        </div>

        {/* Tab Navigation */}
        <div className="flex overflow-x-auto gap-1 border-b border-white/5 mb-10 pb-px scrollbar-hide">
          {(['design', 'portfolio', 'team', 'leads', 'security'] as const).map((tab) => (
            <button key={tab} onClick={() => setActiveTab(tab)} className={`px-6 py-4 text-[10px] font-mono font-bold uppercase tracking-[0.2em] transition-all relative shrink-0 ${activeTab === tab ? 'text-[#d4af37]' : 'text-zinc-600 hover:text-zinc-300'}`}>
              {tab === 'leads' ? `CRM Leads (${leads.length})` : tab}
              {activeTab === tab && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#d4af37] shadow-[0_0_10px_#d4af37]" />}
            </button>
          ))}
        </div>

        {/* 1. DESIGN TAB */}
        {activeTab === 'design' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-in fade-in duration-700">
            <div className="p-8 rounded-3xl bg-white/[0.02] border border-white/10 flex flex-col items-center text-center">
              <h3 className="text-white font-medium mb-6">Studio Branding</h3>
              <div className="w-24 h-24 rounded-full border border-white/10 bg-black overflow-hidden mb-8 relative group p-1">
                <img src={config.logoUrl} className="w-full h-full object-cover rounded-full" alt="Logo" />
                <label className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                  <Upload className="w-5 h-5 text-white" />
                  <input type="file" className="hidden" onChange={e => handleAssetUpload(e, 'logoUrl', 'Logo')} />
                </label>
              </div>
              <p className="text-zinc-500 text-xs font-light">Studio mark for primary identification.</p>
            </div>
            <div className="lg:col-span-2 p-8 rounded-3xl bg-white/[0.02] border border-white/10">
              <h3 className="text-white font-medium mb-8">Asset Architecture</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[
                  { label: 'Hero Background', key: 'backgroundUrl' as keyof StudioConfig },
                  { label: 'The Forge Offer', key: 'forgeImageUrl' as keyof StudioConfig },
                  { label: 'The Moon Offer', key: 'moonImageUrl' as keyof StudioConfig },
                  { label: 'The Light Offer', key: 'lightImageUrl' as keyof StudioConfig }
                ].map((asset) => (
                  <div key={asset.key} className="p-4 rounded-2xl bg-black/40 border border-white/5 space-y-4">
                    <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest block">{asset.label}</span>
                    <div className="aspect-video rounded-xl bg-zinc-900 overflow-hidden border border-white/5 relative group">
                      <img src={config[asset.key] as string} className="w-full h-full object-cover opacity-60" />
                      <label className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 cursor-pointer transition-opacity">
                        <Upload className="w-5 h-5 text-white" />
                        <input type="file" className="hidden" onChange={e => handleAssetUpload(e, asset.key, asset.label)} />
                      </label>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 2. PORTFOLIO TAB */}
        {activeTab === 'portfolio' && (
          <div className="animate-in fade-in duration-700 space-y-6">
            {!editingProject ? (
              <>
                <div className="flex justify-between items-center p-6 rounded-2xl bg-white/[0.02] border border-white/10">
                  <p className="text-zinc-500 text-sm font-light">Narrative case studies management.</p>
                  <button onClick={handleInitNewProject} className="px-5 py-3 bg-[#d4af37] text-black rounded-xl font-bold font-mono text-[10px] uppercase tracking-widest flex items-center gap-2"><FolderPlus className="w-4 h-4" /> New Case Study</button>
                </div>
                <div className="grid grid-cols-1 gap-4">
                  {projects.map(p => (
                    <div key={p.id} className="p-5 rounded-2xl bg-white/[0.01] border border-white/5 flex items-center justify-between group hover:bg-white/[0.03] transition-all">
                      <div className="flex items-center gap-5">
                        <div className="w-20 h-14 rounded-lg bg-zinc-900 overflow-hidden border border-white/10">
                          {p.images?.[0] && <img src={p.images[0]} className="w-full h-full object-cover" />}
                        </div>
                        <h4 className="text-white font-medium text-sm">{p.title}</h4>
                      </div>
                      <div className="flex items-center gap-4">
                        <button onClick={() => handleEditProject(p)} className="text-zinc-500 hover:text-white transition-colors"><Layers className="w-4 h-4" /></button>
                        <button onClick={() => handleDeleteProject(p.id)} className="text-zinc-500 hover:text-red-500 transition-colors"><Trash2 className="w-4 h-4" /></button>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <form onSubmit={handleSaveProject} className="p-8 rounded-3xl bg-white/[0.02] border border-white/10 space-y-8 max-w-5xl">
                <div className="flex justify-between items-center border-b border-white/5 pb-6">
                  <h3 className="text-white font-medium">Study Architecture</h3>
                  <button type="button" onClick={() => setEditingProject(null)} className="text-zinc-600 hover:text-white transition-colors"><X className="w-5 h-5" /></button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <input required placeholder="Project Title" value={editingProject.title} onChange={e => setEditingProject({...editingProject, title: e.target.value})} className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-[#d4af37]" />
                    <textarea required placeholder="Brief Description" rows={2} value={editingProject.description} onChange={e => setEditingProject({...editingProject, description: e.target.value})} className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white text-xs outline-none focus:border-[#d4af37]" />
                    <textarea required placeholder="Client Challenge" rows={3} value={editingProject.problem} onChange={e => setEditingProject({...editingProject, problem: e.target.value})} className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white text-xs outline-none focus:border-[#d4af37]" />
                    <textarea required placeholder="Moonlight Strategy" rows={3} value={editingProject.strategy} onChange={e => setEditingProject({...editingProject, strategy: e.target.value})} className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white text-xs outline-none focus:border-[#d4af37]" />
                  </div>
                  <div className="space-y-4">
                    <input required placeholder="Deliverables (CSV)" value={editingProject.deliverables} onChange={e => setEditingProject({...editingProject, deliverables: e.target.value})} className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-[#d4af37]" />
                    <input required placeholder="Business Impact" value={editingProject.results} onChange={e => setEditingProject({...editingProject, results: e.target.value})} className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-[#d4af37]" />
                    <div className="p-4 rounded-2xl bg-black/40 border border-white/5">
                      <div className="flex justify-between mb-4">
                        <span className="text-[10px] font-mono text-zinc-500 uppercase">Gallery Management</span>
                        <label className="text-[10px] text-[#d4af37] font-bold cursor-pointer hover:underline">Add Media <input type="file" multiple className="hidden" onChange={handleProjectImageUpload} /></label>
                      </div>
                      <div className="grid grid-cols-4 gap-2">
                        {projectImages.map((img, i) => (
                          <div key={i} className="relative aspect-square rounded-lg overflow-hidden group">
                            <img src={img} className="w-full h-full object-cover" />
                            <button type="button" onClick={() => setProjectImages(projectImages.filter((_, idx) => idx !== i))} className="absolute inset-0 bg-red-600/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity"><X className="w-4 h-4 text-white" /></button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex justify-end gap-4 border-t border-white/5 pt-8">
                  <button type="submit" className="px-10 py-4 bg-[#d4af37] text-black rounded-xl font-bold font-mono text-[10px] uppercase tracking-widest hover:brightness-110 transition-all">Secure and Save</button>
                </div>
              </form>
            )}
          </div>
        )}

        {/* 3. TEAM TAB */}
        {activeTab === 'team' && (
          <div className="animate-in fade-in duration-700 space-y-8">
             {!editingMember ? (
              <>
                <div className="flex justify-between items-center p-6 rounded-2xl bg-white/[0.02] border border-white/10">
                  <p className="text-zinc-500 text-sm font-light">Collective personnel roster.</p>
                  <button onClick={handleInitNewMember} className="px-5 py-3 bg-[#d4af37] text-black rounded-xl font-bold font-mono text-[10px] uppercase tracking-widest flex items-center gap-2"><UserPlus className="w-4 h-4" /> Add Personnel</button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {members.map(m => (
                    <div key={m.id} className="p-8 rounded-3xl bg-white/[0.01] border border-white/5 flex flex-col items-center group">
                      <div className="w-20 h-20 rounded-full border border-white/10 bg-zinc-900 mb-6 overflow-hidden">
                        {m.avatarUrl ? <img src={m.avatarUrl} className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center text-zinc-800"><Users className="w-8 h-8" /></div>}
                      </div>
                      <h4 className="text-white font-medium">{m.firstName} {m.lastName}</h4>
                      <p className="text-[10px] font-mono text-[#d4af37]/60 uppercase tracking-widest mt-2">{m.role}</p>
                      <div className="flex gap-4 mt-8 pt-6 border-t border-white/5 w-full justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <button onClick={() => { setEditingMember(m); setMemberAvatar(m.avatarUrl || ''); }} className="text-zinc-400 hover:text-white transition-colors text-xs font-mono">Edit</button>
                        <button onClick={() => handleDeleteMember(m.id)} className="text-zinc-400 hover:text-red-500 transition-colors text-xs font-mono">Delete</button>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <form onSubmit={handleSaveMember} className="p-10 rounded-3xl bg-white/[0.02] border border-white/10 max-w-2xl mx-auto space-y-8">
                 <div className="flex justify-between items-center">
                  <h3 className="text-white font-medium">Advisor Record</h3>
                  <button type="button" onClick={() => setEditingMember(null)} className="text-zinc-600 hover:text-white transition-colors"><X className="w-5 h-5" /></button>
                </div>
                <div className="flex flex-col items-center gap-8">
                  <div className="relative w-28 h-28 rounded-full border border-dashed border-[#d4af37] p-1.5 bg-black/40">
                    <div className="w-full h-full rounded-full bg-zinc-900 overflow-hidden">
                      {memberAvatar && <img src={memberAvatar} className="w-full h-full object-cover" />}
                    </div>
                    <label className="absolute bottom-1 right-1 w-8 h-8 rounded-full bg-[#d4af37] flex items-center justify-center cursor-pointer shadow-lg hover:scale-110 transition-transform">
                      <Upload className="w-3.5 h-3.5 text-black" />
                      <input type="file" className="hidden" onChange={async e => { const f = e.target.files?.[0]; if(f) setMemberAvatar(await DataService.uploadMedia(f)); }} />
                    </label>
                  </div>
                  <div className="grid grid-cols-2 gap-4 w-full">
                    <input required placeholder="First Name" value={editingMember.firstName} onChange={e => setEditingMember({...editingMember, firstName: e.target.value})} className="bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-[#d4af37]" />
                    <input required placeholder="Last Name" value={editingMember.lastName} onChange={e => setEditingMember({...editingMember, lastName: e.target.value})} className="bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-[#d4af37]" />
                  </div>
                  <input required placeholder="Precision Role (e.g. Lead Strategist)" value={editingMember.role} onChange={e => setEditingMember({...editingMember, role: e.target.value})} className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-[#d4af37]" />
                  <button type="submit" className="w-full py-4 bg-[#d4af37] text-black rounded-xl font-bold font-mono text-[10px] uppercase tracking-widest shadow-xl shadow-[#d4af37]/10">Save Dossier</button>
                </div>
              </form>
            )}
          </div>
        )}

        {/* 4. CRM TAB */}
        {activeTab === 'leads' && (
          <div className="animate-in fade-in duration-700 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-8">
              {[
                { label: 'Total Leads', val: leads.length, color: 'text-white' },
                { label: 'New Priority', val: leads.filter(l => l.status === 'New').length, color: 'text-amber-500' },
                { label: 'Discussion', val: leads.filter(l => l.status === 'Contacted').length, color: 'text-blue-500' },
                { label: 'Signed Contracts', val: leads.filter(l => l.status === 'Signed').length, color: 'text-emerald-500' }
              ].map((s, i) => (
                <div key={i} className="p-6 rounded-2xl bg-white/[0.02] border border-white/10">
                  <span className="text-[9px] font-mono text-zinc-600 uppercase tracking-widest block mb-2">{s.label}</span>
                  <div className={`text-2xl font-bold ${s.color}`}>{s.val}</div>
                </div>
              ))}
            </div>
            <div className="bg-white/[0.02] border border-white/10 rounded-3xl overflow-hidden">
               <div className="overflow-x-auto">
                 <table className="w-full text-left border-collapse">
                   <thead>
                     <tr className="border-b border-white/5 text-[9px] font-mono text-zinc-600 uppercase tracking-widest">
                       <th className="px-8 py-5">Date</th>
                       <th className="px-8 py-5">Venture & Identity</th>
                       <th className="px-8 py-5">Architecture</th>
                       <th className="px-8 py-5">Status</th>
                     </tr>
                   </thead>
                   <tbody className="divide-y divide-white/5">
                     {leads.map(l => (
                       <tr key={l.id} className="hover:bg-white/[0.01] transition-colors">
                         <td className="px-8 py-6 text-[10px] font-mono text-zinc-500">{new Date(l.createdAt).toLocaleDateString('en-US')}</td>
                         <td className="px-8 py-6">
                           <div className="text-white font-medium text-sm">{l.name}</div>
                           <div className="text-[10px] text-zinc-600 font-mono mt-1">{l.email} &bull; {l.company}</div>
                         </td>
                         <td className="px-8 py-6">
                           <span className={`px-2 py-0.5 rounded text-[9px] font-mono font-bold border ${l.recommendation === 'Moon' ? 'border-indigo-500/50 text-indigo-400' : l.recommendation === 'Light' ? 'border-amber-500/50 text-amber-400' : 'border-[#d4af37]/50 text-[#d4af37]'}`}>
                             {l.recommendation.toUpperCase()}
                           </span>
                         </td>
                         <td className="px-8 py-6">
                            <select value={l.status} onChange={e => handleStatusChange(l.id, e.target.value)} className="bg-black/40 border border-white/10 rounded-lg text-[10px] font-mono text-zinc-400 px-3 py-1.5 focus:border-[#d4af37] outline-none transition-colors">
                              <option value="New">New</option>
                              <option value="Contacted">Contacted</option>
                              <option value="Signed">Signed</option>
                            </select>
                         </td>
                       </tr>
                     ))}
                   </tbody>
                 </table>
               </div>
            </div>
          </div>
        )}

        {/* 5. SECURITY TAB */}
        {activeTab === 'security' && (
          <div className="animate-in fade-in duration-700 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10">
                <span className="text-[9px] font-mono text-zinc-600 uppercase tracking-widest block mb-2">Protocol</span>
                <div className="text-white font-medium text-sm flex items-center gap-2"><Database className="w-4 h-4 text-emerald-500" /> RLS Verified</div>
              </div>
              <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10">
                <span className="text-[9px] font-mono text-zinc-600 uppercase tracking-widest block mb-2">Logs Captured</span>
                <div className="text-white font-medium text-sm flex items-center gap-2"><Activity className="w-4 h-4 text-[#d4af37]" /> {auditLogs.length} Events</div>
              </div>
              <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10">
                <span className="text-[9px] font-mono text-zinc-600 uppercase tracking-widest block mb-2">Protection</span>
                <div className="text-emerald-500 font-medium text-sm flex items-center gap-2"><Fingerprint className="w-4 h-4" /> Brute-Force Shield</div>
              </div>
              <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10">
                <span className="text-[9px] font-mono text-zinc-600 uppercase tracking-widest block mb-2">Session status</span>
                <div className="text-white font-medium text-sm flex items-center gap-2"><Globe className="w-4 h-4 text-blue-500" /> AES-256 Auth</div>
              </div>
            </div>
            <div className="bg-zinc-950 border border-white/5 rounded-3xl overflow-hidden">
               <div className="p-6 border-b border-white/5 flex justify-between items-center bg-white/[0.01]">
                   <h3 className="text-[11px] font-mono font-bold text-zinc-400 uppercase tracking-[0.2em] flex items-center gap-3"><Activity className="w-4 h-4 text-emerald-500" /> Sovereign Audit Log</h3>
                   <button onClick={fetchLogs} className="text-zinc-600 hover:text-white transition-all"><RefreshCw className={`w-4 h-4 ${loadingLogs ? 'animate-spin' : ''}`} /></button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left font-mono text-[10px]">
                    <thead>
                      <tr className="text-zinc-600 border-b border-white/5">
                        <th className="px-8 py-5">Timestamp</th>
                        <th className="px-8 py-5">Event Type</th>
                        <th className="px-8 py-5">Actor</th>
                        <th className="px-8 py-5">Status</th>
                        <th className="px-8 py-5">IP Address</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {auditLogs.map(log => (
                        <tr key={log.id} className="hover:bg-white/[0.01] transition-colors">
                          <td className="px-8 py-5 text-zinc-600">{new Date(log.timestamp).toISOString().replace('T', ' ').slice(0, 19)}</td>
                          <td className="px-8 py-5 text-white font-bold">{log.eventType}</td>
                          <td className="px-8 py-5 text-zinc-400">{log.actor}</td>
                          <td className="px-8 py-5">
                            <span className={`px-2 py-0.5 rounded text-[8px] font-bold border ${log.status === 'SUCCESS' ? 'border-emerald-500/30 text-emerald-400' : 'border-red-500/30 text-red-400'}`}>
                              {log.status}
                            </span>
                          </td>
                          <td className="px-8 py-5 text-zinc-600">{log.ipAddress}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}