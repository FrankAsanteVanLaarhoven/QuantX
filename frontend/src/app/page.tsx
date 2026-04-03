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
import { QuantXLogo } from '@/components/ui/QuantXLogo';

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

      <AnimatePresence>
        {!isAuthenticated && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, filter: "blur(20px)", scale: 1.1 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="absolute inset-0 z-50 flex items-center justify-center bg-black overflow-hidden"
          >
            {/* Monumental architectural grid overlay background */}
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] z-0 mix-blend-overlay pointer-events-none" />
            <motion.div 
               initial={{ backgroundPosition: "0px 0px" }}
               animate={{ backgroundPosition: "40px 40px" }}
               transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
               className="absolute inset-0 opacity-10 pointer-events-none" 
               style={{ backgroundImage: "linear-gradient(to right, #333 1px, transparent 1px), linear-gradient(to bottom, #333 1px, transparent 1px)", backgroundSize: "40px 40px" }}
            />
            
            {/* Horizontal striking architectural laser line */}
            <motion.div 
               initial={{ scaleX: 0, opacity: 0 }}
               animate={{ scaleX: 1, opacity: 0.2 }}
               transition={{ duration: 1.5, delay: 0.5, ease: "circOut" }}
               className="absolute top-[35%] w-full h-[1px] bg-gradient-to-r from-transparent via-red-500 to-transparent z-0 origin-left"
            />

            <motion.div 
              initial={{ y: 40, opacity: 0, filter: "blur(10px)" }}
              animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
              transition={{ delay: 0.2, duration: 0.6, ease: "easeOut" }}
              className="w-[480px] bg-black/80 backdrop-blur-2xl border border-white/5 p-10 z-10 relative"
            >
               {/* SOTA Download Badge */}
               <div className="absolute top-6 right-6 group cursor-pointer" title="Download Desktop SDK (.exe / .dmg)">
                  <div className="flex flex-col items-center justify-center p-2 rounded bg-white/[0.02] border border-white/10 hover:border-red-500/50 hover:bg-red-500/5 transition-all duration-300">
                     <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-white/50 group-hover:text-red-400 mb-1 transition-colors"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                     <span className="text-[7px] font-bold tracking-[0.3em] text-white/40 group-hover:text-red-400 transition-colors uppercase">SDK</span>
                  </div>
               </div>

               <div className="flex flex-col items-start gap-0 relative -left-2 mb-10">
                   <QuantXLogo size={80} className="text-red-600 drop-shadow-[0_0_30px_rgba(220,38,38,0.5)] mb-2" />
                   <h1 className="text-4xl font-medium tracking-tighter text-white ml-2 flex items-baseline gap-1">
                     QUANT<span className="font-light text-red-600">X</span>
                   </h1>
                   <div className="flex items-center gap-2 mt-1 ml-2">
                     <div className="w-1 h-1 bg-red-600 rounded-full animate-pulse" />
                     <p className="text-white/40 text-[9px] uppercase font-mono tracking-[0.3em]">Sentinel Autonomous Engine</p>
                   </div>
               </div>

               <form onSubmit={handleAuthSubmit} className="flex flex-col gap-6">
                  <div className="relative group">
                     <label className="text-[9px] uppercase tracking-[0.2em] text-white/30 mb-2 block font-mono bg-black inline-block pr-2 relative z-10 transition-colors group-focus-within:text-red-400">Identification Code</label>
                     <input 
                       type="text" 
                       className="w-full bg-transparent border-b border-white/10 px-0 py-2 text-white text-lg font-light tracking-wide outline-none focus:border-red-500 transition-colors placeholder:text-white/10 [&:-webkit-autofill]:bg-transparent [&:-webkit-autofill]:text-white [&:-webkit-autofill]:shadow-[0_0_0_1000px_black_inset] [&:-webkit-autofill]:-webkit-text-fill-color-white"
                       placeholder="Enter assigned ID..."
                       value={authForm.username}
                       onChange={(e) => setAuthForm({...authForm, username: e.target.value})}
                       required
                     />
                  </div>
                  <div className="relative group mt-2">
                     <label className="text-[9px] uppercase tracking-[0.2em] text-white/30 mb-2 block font-mono bg-black inline-block pr-2 relative z-10 transition-colors group-focus-within:text-red-400">Root Cryptography Key</label>
                     <input 
                       type="password" 
                       className="w-full bg-transparent border-b border-white/10 px-0 py-2 text-white text-lg outline-none focus:border-red-500 transition-colors tracking-[0.5em] font-mono placeholder:text-white/10 placeholder:tracking-normal [&:-webkit-autofill]:bg-transparent [&:-webkit-autofill]:text-white [&:-webkit-autofill]:shadow-[0_0_0_1000px_black_inset] [&:-webkit-autofill]:-webkit-text-fill-color-white"
                       placeholder="••••••••••••"
                       value={authForm.pin}
                       onChange={(e) => setAuthForm({...authForm, pin: e.target.value})}
                       required
                     />
                  </div>

                  <div className="flex justify-between items-center mt-8">
                     <button type="button" onClick={() => setAuthMode(authMode === 'login' ? 'register' : 'login')} className="text-[10px] uppercase font-mono tracking-widest text-white/40 hover:text-white transition">
                       {authMode === 'login' ? 'Request Genesis Access' : 'Authenticate Override'}
                     </button>

                     <button type="submit" disabled={loading} className="relative overflow-hidden group bg-white text-black px-8 py-3 rounded-none text-xs font-bold tracking-[0.2em] uppercase transition hover:bg-gray-200 disabled:opacity-50">
                       <span className="relative z-10 transition-colors duration-300 group-hover:text-white">{loading ? 'Verifying...' : (authMode === 'login' ? 'Initialize' : 'Provision')}</span>
                       <div className="absolute inset-0 bg-red-600 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300 ease-in-out z-0" />
                     </button>
                  </div>
               </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {isAuthenticated && (
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
