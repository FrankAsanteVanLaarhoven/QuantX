'use client';

import React, { useState } from 'react';
import { 
  BarChart2, BookOpen, Database, Target, Users, Globe, Brain, 
  LineChart, PieChart, TrendingUp, Calendar, Zap, Award, UserPlus, FileText, ChevronDown, Menu 
} from 'lucide-react';
import Link from 'next/link';
import { QuantXLogo } from '../ui/QuantXLogo';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const TOP_NAV_LINKS = [
  { name: 'Simulate', icon: <Zap size={16} /> },
  { name: 'Alphas', icon: <Brain size={16} /> },
  { name: 'Learn', icon: <BookOpen size={16} /> },
  { name: 'Data', icon: <Database size={16} /> },
  { name: 'Competitions (2)', icon: <Target size={16} /> },
  { name: 'Team', icon: <Users size={16} /> },
  { name: 'Community', icon: <Globe size={16} /> },
];

const SIDEBAR_LINKS = [
  {
    section: 'Features',
    items: [
      { name: 'Portfolio tracker', icon: <PieChart size={18} /> },
      { name: 'Stock tracker', icon: <LineChart size={18} /> },
      { name: 'Dividends', icon: <TrendingUp size={18} /> },
      { name: 'Tools', icon: <FileText size={18} /> },
    ]
  },
  {
    section: 'Platform',
    items: [
      { name: 'Events', icon: <Calendar size={18} /> },
      { name: 'IQC 2026', icon: <Award size={18} /> },
      { name: 'Consultant program', icon: <Users size={18} /> },
      { name: 'Refer a friend', icon: <UserPlus size={18} /> },
    ]
  }
];

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-[#020204] text-white flex flex-col font-sans selection:bg-red-500/30">
      {/* Top Navbar */}
      <header className="h-16 bg-[#0A0A0E]/80 backdrop-blur-xl border-b border-white/5 flex items-center px-6 justify-between sticky top-0 z-50">
        <div className="flex items-center gap-10">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
              className="text-gray-500 hover:text-white transition-colors"
            >
              <Menu size={20} />
            </button>
            <Link href="/" className="flex items-center gap-3 text-white font-bold text-xl tracking-widest drop-shadow-md hover:scale-[1.02] transition-transform">
              <QuantXLogo size={28} className="text-red-500 drop-shadow-[0_0_15px_rgba(239,68,68,0.5)]" />
              <span className="tracking-tighter">QUANT<span className="font-light text-red-500">X</span></span>
            </Link>
          </div>
          <nav className="hidden md:flex items-center gap-8">
            {TOP_NAV_LINKS.map((link) => (
              <button key={link.name} className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors font-medium tracking-wide">
                <span className="text-gray-500">{link.icon}</span>
                {link.name}
              </button>
            ))}
          </nav>
        </div>
        
        <div className="flex items-center gap-4">
          <button className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white flex items-center justify-center border border-white/5 transition-colors">
            <UserPlus size={16} />
          </button>
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-gray-800 to-black border border-white/10 shadow-[0_0_15px_rgba(0,0,0,0.5)] flex items-center justify-center">
            <span className="text-xs font-bold text-gray-300">FV</span>
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className={`bg-[#0A0A0E] border-white/5 hidden lg:block overflow-y-auto transition-all duration-300 ease-in-out whitespace-nowrap ${isSidebarCollapsed ? 'w-0 border-r-0 opacity-0' : 'w-64 border-r opacity-100'}`}>
          <div className="p-5 min-w-[16rem]">
            {SIDEBAR_LINKS.map((group, idx) => (
              <div key={idx} className="mb-8">
                <div className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mx-3 mb-4">
                  {group.section}
                </div>
                <div className="flex flex-col gap-1">
                  {group.items.map((item) => {
                    const href = item.name === 'IQC 2026' ? '/iqc2026' : '#';
                    return (
                      <Link
                        key={item.name}
                        href={href}
                        className="group flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-gray-400 hover:bg-white/5 hover:text-white transition-all w-full text-left relative overflow-hidden"
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/0 to-white/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                        <span className="text-gray-600 group-hover:text-red-400 transition-colors">{item.icon}</span>
                        <span className="font-medium tracking-wide">{item.name}</span>
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto bg-transparent relative">
          {/* Subtle background glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-red-900/10 blur-[120px] pointer-events-none" />
          <div className="relative z-10 h-full">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
