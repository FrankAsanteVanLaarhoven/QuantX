"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  BarChart2, BookOpen, Database, Target, Users, Globe, Brain, 
  LineChart, PieChart, TrendingUp, Calendar, Zap, Award, UserPlus, FileText
} from 'lucide-react';
import { QuantXLogo } from '../ui/QuantXLogo';

interface GlassSidebarProps {
  onSpawnPanel: (id: string, title: string) => void;
}

const MENU_ITEMS = [
  { id: 'simulate', name: 'Simulate', icon: <Zap size={18} /> },
  { id: 'alphas', name: 'Alphas', icon: <Brain size={18} /> },
  { id: 'learn', name: 'Learn', icon: <BookOpen size={18} /> },
  { id: 'data', name: 'Data', icon: <Database size={18} /> },
  { id: 'competitions', name: 'Competitions (2)', icon: <Target size={18} /> },
  { id: 'team', name: 'Team', icon: <Users size={18} /> },
  { id: 'community', name: 'Community', icon: <Globe size={18} /> },
  { id: 'portfolio', name: 'Portfolio tracker', icon: <PieChart size={18} /> },
  { id: 'stock', name: 'Stock tracker', icon: <LineChart size={18} /> },
  { id: 'dividends', name: 'Dividends', icon: <TrendingUp size={18} /> },
  { id: 'tools', name: 'Tools', icon: <FileText size={18} /> },
  { id: 'events', name: 'Events', icon: <Calendar size={18} /> },
  { id: 'iqc2026', name: 'IQC 2026', icon: <Award size={18} /> },
  { id: 'iqc', name: 'IQC Domination Matrix', icon: <Zap size={18} /> },
  { id: 'consultant', name: 'Consultant program', icon: <Users size={18} /> },
  { id: 'refer', name: 'Refer a friend', icon: <UserPlus size={18} /> },
];

export function GlassSidebar({ onSpawnPanel }: GlassSidebarProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ x: -280 }}
      animate={{ x: isHovered ? 0 : -220 }}
      transition={{ type: "spring", stiffness: 400, damping: 40 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="fixed left-0 top-0 h-full w-[280px] z-50 flex items-center p-2"
    >
      <div className={`
        w-full h-[96vh] rounded-3xl border border-white/[0.05] 
        bg-black/40 backdrop-blur-3xl shadow-[0_0_40px_rgba(0,0,0,0.8)]
        overflow-hidden flex flex-col transition-opacity duration-500
        ${isHovered ? 'opacity-100' : 'opacity-30'}
      `}>
        {/* Glow effect */}
        <div className="absolute top-0 left-0 w-full h-32 bg-sky-500/10 blur-[50px] pointer-events-none" />
        
        <div className="p-6 pb-2 border-b border-white/[0.05] flex items-center justify-between">
            <div className="flex items-center gap-3 text-white font-bold text-xl tracking-widest">
              <QuantXLogo size={32} className="text-red-600 drop-shadow-[0_0_15px_rgba(220,38,38,0.5)]" />
              <span className={`transition-opacity duration-300 tracking-tighter ${isHovered ? 'opacity-100' : 'opacity-0'}`}>QUANT<span className="font-light text-red-600">X</span></span>
            </div>
        </div>

        <div className="flex-1 overflow-y-auto w-full p-3 custom-scrollbar">
          <div className="flex items-center justify-between mb-4 px-3">
             <span className={`text-[10px] font-bold text-gray-500 uppercase tracking-widest transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
               Platform Toolkit
             </span>
          </div>
          
          <div className="flex flex-col gap-1 w-full">
            {MENU_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => onSpawnPanel(item.id, item.name)}
                className="group flex items-center gap-4 px-3 py-3 rounded-xl text-sm text-gray-400 hover:bg-white/[0.05] hover:text-sky-300 transition-all w-full text-left relative overflow-hidden"
              >
                {/* Drag hint glow */}
                <div className="absolute inset-0 bg-gradient-to-r from-sky-500/0 via-sky-500/0 to-sky-500/10 opacity-0 group-active:opacity-100 transition-opacity" />
                
                <span className="text-gray-500 group-hover:text-sky-400 transition-colors shrink-0">
                  {item.icon}
                </span>
                <span className={`font-medium tracking-wide transition-opacity duration-300 whitespace-nowrap ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
                  {item.name}
                </span>
              </button>
            ))}
          </div>
        </div>
        
        <div className="p-4 border-t border-white/[0.05] mt-auto">
          <div className="flex items-center gap-3">
             <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-700 to-gray-900 border border-white/10 flex items-center justify-center shrink-0 shadow-lg">
               <span className="text-xs font-bold text-white">FV</span>
             </div>
             <div className={`flex flex-col transition-opacity duration-300 overflow-hidden ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
               <span className="text-sm font-semibold text-gray-200 whitespace-nowrap">Frank V.</span>
               <span className="text-xs text-gray-500 whitespace-nowrap">Hedge Fund Access</span>
             </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
