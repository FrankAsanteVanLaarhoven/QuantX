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
  AlgorithmicNexusPanel
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
    else if (q.includes('challenge')) spawnPanel('challenge', 'Challenge Stats');
    else if (q.includes('simulate')) spawnPanel('simulate', 'Simulation Engine');
    else if (q.includes('data')) spawnPanel('data', 'Data Feeds');
    else spawnPanel('notifications', 'System Notifications');
  };

  React.useEffect(() => {
    // Zero-learning curve: Open Sentinel immediately on mount
    spawnPanel('sentinel', 'Autonomous Sentinel');
    
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
    </main>
  );
}
