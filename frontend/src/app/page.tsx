"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GlassSidebar } from '@/components/layout/GlassSidebar';
import { DraggablePanel } from '@/components/ui/DraggablePanel';
import { Search, Loader2 } from 'lucide-react';
import {
  SimulatePanel, DataPanel, AlphaTableFull, PortfolioPanel, StockTrackerPanel,
  DividendsPanel, ToolsPanel, LearnPanel, TeamPanel, CommunityPanel, EventsPanel,
  CompetitionsPanel, ChallengePanel, ConsultantPanel, ReferralPanel, AnnouncementsPanel, NotificationsPanel,
  AutonomousSentinelPanel, RLHyperAllocatorPanel,
  LOBImbalancePanel, BacktestSandboxPanel, MacroGlobePanel,
  AlgorithmicNexusPanel, WebRTCHootPanel
} from '@/components/dashboard/Widgets';

type ActivePanel = {
  id: string;
  type: string;
  title: string;
  x: number;
  y: number;
  width: number;
  height: number | string;
};

export default function Home() {
  const [panels, setPanels] = useState<ActivePanel[]>([]);
  const [intentInput, setIntentInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [authForm, setAuthForm] = useState({ username: '', pin: '' });

  const spawnPanel = React.useCallback((type: string, title: string) => {
    // Determine default size/pos based on type
    let width = 450;
    let height: number | string = 300;
    
    if (type === 'alphas' || type === 'data') {
      width = 800;
      height = 500;
    }

    const newPanel = {
      id: `${type}-${Date.now()}`,
      type,
      title,
      x: window.innerWidth / 2 - width / 2 + (Math.random() * 40 - 20),
      y: window.innerHeight / 2 - (typeof height === 'number' ? height : 400) / 2 + (Math.random() * 40 - 20),
      width,
      height
    };

    setPanels(prev => [...prev, newPanel]);
  }, []);

  const [isListening, setIsListening] = useState(false);

  const speakBack = (text: string) => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      const msg = new SpeechSynthesisUtterance(text);
      msg.rate = 1.1;
      msg.pitch = 0.9;
      window.speechSynthesis.speak(msg);
    }
  };

  const processIntent = (input: string) => {
    const q = input.toLowerCase();
    if (q.includes('event')) spawnPanel('events', 'Upcoming Events');
    else if (q.includes('alpha')) spawnPanel('alphas', 'Alpha Signatures');
    else if (q.includes('allocate') || q.includes('portfolio') || q.includes('hyper allocator')) spawnPanel('allocator', 'RL Portfolio Engine');
    else if (q.includes('order') || q.includes('lob') || q.includes('imbalance')) spawnPanel('lob', 'Limit Order Matrix');
    else if (q.includes('backtest') || q.includes('sandbox')) spawnPanel('backtest', 'Deep-RL Evaluator');
    else if (q.includes('macro') || q.includes('globe') || q.includes('news')) spawnPanel('macro', 'Omniscient NLP Globe');
    else if (q.includes('nexus') || q.includes('visualize') || q.includes('blueprint')) spawnPanel('nexus', 'Algorithmic Nexus');
    else if (q.includes('hoot') || q.includes('comms') || q.includes('mesh')) spawnPanel('hoot', 'WebRTC Comm Network');
    else if (q.includes('challenge')) spawnPanel('challenge', 'Challenge Stats');
    else if (q.includes('simulate')) spawnPanel('simulate', 'Simulation Engine');
    else if (q.includes('data')) spawnPanel('data', 'Data Feeds');
    else spawnPanel('notifications', 'System Notifications');
  };

  React.useEffect(() => {
    // Zero-learning curve: Open Sentinel immediately upon auth
    if (isAuthenticated && panels.length === 0) {
      spawnPanel('sentinel', 'Autonomous Sentinel');
    }
    
    // Voice OS Initialization
    if (typeof window !== 'undefined' && ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window)) {
       const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
       const recognition = new SpeechRecognition();
       recognition.continuous = false;
       recognition.interimResults = false;
       
       recognition.onstart = () => setIsListening(true);
       recognition.onend = () => setIsListening(false);
       
       recognition.onresult = (event: any) => {
         const transcript = event.results[0][0].transcript;
         setIntentInput(transcript);
         processIntent(transcript);
         speakBack("Acknowledged. " + transcript);
       };

       (window as any).startListening = () => recognition.start();
    }
  }, [spawnPanel]);

  const closePanel = (id: string) => {
    setPanels(prev => prev.filter(p => p.id !== id));
  };

  const handleAuthSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const endpoint = authMode === 'login' ? '/api/auth/login' : '/api/auth/register';
    
    try {
      const res = await fetch(`http://127.0.0.1:8000${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(authForm)
      });
      const data = await res.json();
      
      if (res.ok) {
        if (authMode === 'register') {
           setAuthMode('login');
        } else {
           // Success! Enter Dashboard
           setIsAuthenticated(true);
        }
      } else {
        alert(data.detail || data.error || "Authentication failed");
      }
    } catch (err) {
      alert("Network Error: Could not connect to QuantX Sentinel DB.");
    }
    setLoading(false);
  };

  const handleIntent = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!intentInput.trim()) return;

    setLoading(true);
    processIntent(intentInput);
    
    setIntentInput("");
    setLoading(false);
  };

  const renderPanelContent = (type: string) => {
    switch (type) {
      case 'simulate': return <SimulatePanel />;
      case 'alphas': return <AlphaTableFull />;
      case 'learn': return <LearnPanel />;
      case 'data': return <DataPanel />;
      case 'competitions': return <CompetitionsPanel />;
      case 'team': return <TeamPanel />;
      case 'community': return <CommunityPanel />;
      case 'portfolio': return <PortfolioPanel />;
      case 'allocator': return <RLHyperAllocatorPanel />;
      case 'lob': return <LOBImbalancePanel />;
      case 'backtest': return <BacktestSandboxPanel />;
      case 'macro': return <MacroGlobePanel />;
      case 'nexus': return <AlgorithmicNexusPanel />;
      case 'hoot': return <WebRTCHootPanel />;
      case 'stock': return <StockTrackerPanel />;
      case 'dividends': return <DividendsPanel />;
      case 'tools': return <ToolsPanel />;
      case 'events': return <EventsPanel />;
      case 'iqc2026': return <ChallengePanel />;
      case 'consultant': return <ConsultantPanel />;
      case 'refer': return <ReferralPanel />;
      
      case 'challenge': return <ChallengePanel />;
      case 'announcements': return <AnnouncementsPanel />;
      case 'notifications': return <NotificationsPanel />;
      case 'sentinel': return <AutonomousSentinelPanel />;
      default: return <AutonomousSentinelPanel />;
    }
  };

  return (
    <main className="relative w-screen h-screen overflow-hidden bg-[#0a0a0a] font-sans selection:bg-sky-500/30">
      {/* Immersive Deep Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/10 via-[#0a0a0a] to-[#0a0a0a]" />
        {/* Subtle noise to simulate depth/glass */}
        <div className="absolute inset-0 opacity-[0.015] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      </div>

      {!isAuthenticated ? (
        <div className="absolute inset-0 z-50 flex items-center justify-center backdrop-blur-md bg-black/40">
          <div className="w-[450px] bg-black/60 border border-white/10 rounded-2xl p-8 shadow-[0_0_80px_rgba(14,165,233,0.1)] relative overflow-hidden">
             
             {/* SOTA Download Badge */}
             <div className="absolute top-4 right-4 group cursor-pointer" title="Download Desktop SDK (.exe / .dmg)">
                <div className="flex flex-col items-center justify-center p-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition">
                   <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-400 mb-1"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                   <span className="text-[8px] font-bold tracking-widest text-emerald-400">SDK</span>
                </div>
             </div>

             <h1 className="text-3xl font-bold bg-gradient-to-r from-sky-400 to-indigo-400 bg-clip-text text-transparent mb-2">QuantX Sentinel</h1>
             <p className="text-white/40 text-sm mb-8 tracking-wide">Enterprise Omniscient Architecture</p>

             <form onSubmit={handleAuthSubmit} className="flex flex-col gap-4">
                <div>
                   <label className="text-[10px] uppercase tracking-widest text-white/50 mb-1 block">Institutional ID</label>
                   <input 
                     type="text" 
                     className="w-full bg-white/5 border border-white/10 rounded px-4 py-2.5 text-white text-sm outline-none focus:border-sky-500/50 focus:bg-white/10 transition"
                     value={authForm.username}
                     onChange={(e) => setAuthForm({...authForm, username: e.target.value})}
                     required
                   />
                </div>
                <div>
                   <label className="text-[10px] uppercase tracking-widest text-white/50 mb-1 block">Root Pin</label>
                   <input 
                     type="password" 
                     className="w-full bg-white/5 border border-white/10 rounded px-4 py-2.5 text-white text-sm outline-none focus:border-sky-500/50 focus:bg-white/10 transition tracking-widest font-mono font-bold"
                     value={authForm.pin}
                     onChange={(e) => setAuthForm({...authForm, pin: e.target.value})}
                     required
                   />
                </div>

                <div className="flex justify-between items-center mt-4">
                   <button type="button" onClick={() => setAuthMode(authMode === 'login' ? 'register' : 'login')} className="text-xs text-sky-400 hover:text-sky-300 transition underline underline-offset-4">
                     {authMode === 'login' ? 'Request Allocation (Register)' : 'Execute Bypass (Login)'}
                   </button>

                   <button type="submit" disabled={loading} className="bg-sky-500/20 text-sky-400 border border-sky-500/30 px-6 py-2.5 rounded text-sm font-bold tracking-widest uppercase hover:bg-sky-500/30 transition disabled:opacity-50">
                     {loading ? 'Validating...' : (authMode === 'login' ? 'Enter' : 'Create')}
                   </button>
                </div>
             </form>
          </div>
        </div>
      ) : (
        <>
          {/* Ephemeral UI Layer (Z=10) */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        <div className="w-full h-full relative pointer-events-auto">
          {panels.map((p) => (
            <DraggablePanel 
              key={p.id} 
              id={p.id} 
              title={p.title} 
              onClose={closePanel}
              defaultPosition={{ x: p.x, y: p.y }}
              defaultSize={{ width: p.width, height: p.height }}
            >
              {renderPanelContent(p.type)}
            </DraggablePanel>
          ))}
        </div>
      </div>

      {/* Omni-Intent Bar Layer (Z=20) */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 w-full max-w-2xl px-4 flex justify-center pointer-events-none">
        <motion.div 
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: 'spring', damping: 20 }}
          className="w-full pointer-events-auto group"
        >
          <form onSubmit={handleIntent} className="relative w-full">
            <div className={`absolute inset-y-0 left-5 flex items-center pointer-events-none transition-colors ${isListening ? 'text-red-500 animate-pulse' : 'text-white/20 group-focus-within:text-sky-400'}`}>
              {loading ? <Loader2 className="animate-spin text-sky-400" size={18} /> : (isListening ? <div className="w-4 h-4 rounded-full bg-red-500 shadow-[0_0_10px_#ef4444]" /> : <Search size={18} />)}
            </div>
            <input
              type="text"
              className={`
                w-full bg-white/[0.01] border ${isListening ? 'border-red-500/50 bg-red-500/5' : 'border-white/5'} rounded-2xl py-4 pl-14 pr-16 
                text-sm text-white outline-none focus:bg-white/[0.03] focus:border-sky-500/30
                backdrop-blur-2xl transition-all shadow-[0_0_40px_rgba(0,0,0,0.5)] 
                placeholder:text-white/20 font-mono tracking-wide
              `}
              placeholder="System engaged. Voice intent or type..."
              value={intentInput}
              onChange={(e) => setIntentInput(e.target.value)}
            />
            <button type="button" onClick={() => (window as any).startListening?.()} className="absolute inset-y-0 right-4 flex items-center text-xs font-bold text-white/50 hover:text-white transition-colors" title="Voice OS">
              VOICE OS
            </button>
          </form>
        </motion.div>
      </div>

      {/* Left Glass Sidebar (Z=30) */}
      <GlassSidebar onSpawnPanel={spawnPanel} />
      </>
      )}
    </main>
  );
}
