import React from 'react';
import { 
  BarChart2, BookOpen, Database, Target, Users, Globe, Brain, 
  LineChart, PieChart, TrendingUp, Calendar, Zap, Award, UserPlus, FileText, ChevronDown 
} from 'lucide-react';
import Link from 'next/link';

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
  return (
    <div className="min-h-screen bg-[#111827] text-white flex flex-col font-sans">
      {/* Top Navbar */}
      <header className="h-14 bg-[#1f2937] border-b border-gray-700 flex items-center px-4 justify-between sticky top-0 z-50">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2 text-sky-400 font-bold text-xl tracking-wider">
            <Brain className="text-sky-400" />
            <span>QUANT<span className="text-white">X</span></span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            {TOP_NAV_LINKS.map((link) => (
              <button key={link.name} className="flex items-center gap-2 text-sm text-gray-300 hover:text-sky-400 transition-colors font-medium">
                <span className="text-gray-400">{link.icon}</span>
                {link.name}
              </button>
            ))}
          </nav>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="w-8 h-8 rounded-full bg-sky-500/20 text-sky-400 flex items-center justify-center border border-sky-500/30">
            <UserPlus size={16} />
          </div>
          <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center">
            <span className="text-xs font-bold">FV</span>
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className="w-64 bg-[#1f2937] border-r border-gray-700 hidden lg:block overflow-y-auto">
          <div className="p-4">
            {SIDEBAR_LINKS.map((group, idx) => (
              <div key={idx} className="mb-8">
                <div className="text-xs font-bold text-gray-500 uppercase tracking-widest mx-2 mb-3">
                  {group.section}
                </div>
                <div className="flex flex-col gap-1">
                  {group.items.map((item) => {
                    const href = item.name === 'IQC 2026' ? '/iqc2026' : '#';
                    return (
                      <Link
                        key={item.name}
                        href={href}
                        className="flex items-center gap-3 px-2 py-2.5 rounded-lg text-sm text-gray-300 hover:bg-gray-800 hover:text-sky-400 transition-all w-full text-left"
                      >
                        <span className="text-gray-400">{item.icon}</span>
                        {item.name}
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto bg-[#111827] p-6 lg:p-8">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
