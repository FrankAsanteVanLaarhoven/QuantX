'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Target, TrendingUp, Activity, BarChart2, Zap } from 'lucide-react';

export default function SotaBenchmarkDashboard() {
    const [isGenerating, setIsGenerating] = useState(false);
    const [isComplete, setIsComplete] = useState(false);

    const handleProceed = () => {
        setIsGenerating(true);
        // Simulate backend WorldQuant alpha processing time
        setTimeout(() => {
            setIsGenerating(false);
            setIsComplete(true);
        }, 3000);
    };

    return (
        <div className="bg-[#0A0A0E] border border-white/5 rounded-xl overflow-hidden mt-8">
            {!isGenerating && !isComplete && (
                <div className="p-8 text-center flex flex-col items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-blue-500/10 flex items-center justify-center mb-4">
                        <Target className="w-8 h-8 text-blue-500" />
                    </div>
                    <h3 className="text-xl font-bold text-white tracking-widest uppercase mb-2">Alpha Engine Offline</h3>
                    <p className="text-white/50 text-sm max-w-md mx-auto mb-8">
                        Synthesize the current architecture matrix into the WorldQuant backend to evaluate Sub-universe Sharpe viability.
                    </p>
                    <button 
                        onClick={handleProceed}
                        className="group relative px-8 py-4 bg-white/5 hover:bg-white/10 text-white font-bold tracking-widest text-sm uppercase rounded-lg border border-white/10 overflow-hidden transition-all duration-300"
                    >
                        <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-500/0 via-blue-500/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                        Proceed to SOTA Benchmark
                    </button>
                </div>
            )}

            {isGenerating && (
                <div className="p-12 text-center flex flex-col items-center justify-center space-y-6">
                    <div className="relative">
                        <div className="w-16 h-16 rounded-full border-2 border-white/10 border-t-blue-500 animate-spin"></div>
                        <div className="absolute inset-0 bg-blue-500/20 rounded-full blur-xl animate-pulse"></div>
                    </div>
                    <div>
                        <h4 className="text-blue-400 font-bold tracking-widest uppercase text-sm mb-1">Transpiling Node Matrix</h4>
                        <p className="text-white/40 text-xs font-mono">Executing OOS Stress Test Engine...</p>
                    </div>
                </div>
            )}

            {isComplete && (
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col"
                >
                    {/* Live Tracker HUD */}
                    <div className="bg-black border-b border-white/5 p-4 flex justify-between items-center relative overflow-hidden">
                        <div className="absolute inset-0 bg-red-900/10" style={{ backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(239, 68, 68, 0.05) 10px, rgba(239, 68, 68, 0.05) 20px)' }} />
                        <div className="relative z-10 flex flex-col">
                            <span className="text-[10px] text-red-500 font-bold tracking-widest uppercase mb-1 flex items-center gap-2"><Target size={12} /> Target Adversary Lock: CA87835</span>
                            <span className="text-white/40 text-xs font-mono uppercase">University of Nairobi • Rank: 1 • Score To Beat: 29,691</span>
                        </div>
                        <div className="relative z-10 text-right">
                           <span className="text-xl text-white font-mono font-bold tracking-tighter">Delta: -<span className="text-red-500">29,691</span></span>
                           <span className="block text-[10px] text-white/30 uppercase tracking-widest">Awaiting Validated Score Transfer</span>
                        </div>
                    </div>
                    {/* Metrics Header */}
                    <div className="p-6 border-b border-white/5 bg-gradient-to-r from-blue-900/10 via-transparent to-transparent flex items-center justify-between">
                         <div className="flex items-center gap-3">
                             <div className="p-2 bg-blue-500/20 rounded border border-blue-500/40 text-blue-400">
                                 <Activity size={18} />
                             </div>
                             <div>
                                 <h3 className="text-lg font-bold text-white tracking-wider">Benchmark Completed</h3>
                                 <p className="text-white/50 text-xs uppercase tracking-widest">SOTA Sharpe Constraints Achieved</p>
                             </div>
                         </div>
                         <div className="flex gap-4">
                            <span className="px-3 py-1 bg-green-500/10 border border-green-500/30 text-green-400 text-[10px] uppercase tracking-widest font-bold rounded">Pass: TOP3000</span>
                            <span className="px-3 py-1 bg-blue-500/10 border border-blue-500/30 text-blue-400 text-[10px] uppercase tracking-widest font-bold rounded">OOS Validated</span>
                         </div>
                    </div>

                    {/* Matrix Parameters Table (WorldQuant style constraints) */}
                    <div className="grid grid-cols-6 divide-x divide-white/5 border-b border-white/5 bg-black/40">
                        {[{ label: 'Region', val: 'USA' }, { label: 'Universe', val: 'TOP3000' }, { label: 'Neutralization', val: 'Industry' }, { label: 'Delay', val: '1' }, { label: 'Decay', val: '10' }, { label: 'Truncation', val: '0.08' }].map((item, i) => (
                            <div key={i} className="p-4 text-center">
                                <span className="block text-[10px] text-white/40 uppercase tracking-widest mb-2 font-bold">{item.label}</span>
                                <span className="text-white text-sm font-mono">{item.val}</span>
                            </div>
                        ))}
                    </div>

                    {/* Chart & KPI Area */}
                    <div className="grid grid-cols-1 md:grid-cols-4 min-h-[300px]">
                        <div className="col-span-3 p-6 border-r border-white/5 relative bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0)_0%,rgba(0,0,0,0.8)_100%)]">
                            {/* SVG Chart Placeholder to look premium */}
                            <svg className="w-full h-full drop-shadow-[0_0_15px_rgba(59,130,246,0.3)]" viewBox="0 0 800 200" preserveAspectRatio="none">
                                {/* Grid lines */}
                                <g stroke="rgba(255,255,255,0.05)" strokeWidth="1">
                                    <line x1="0" y1="50" x2="800" y2="50" />
                                    <line x1="0" y1="100" x2="800" y2="100" />
                                    <line x1="0" y1="150" x2="800" y2="150" />
                                </g>
                                {/* Gradient definition */}
                                <defs>
                                    <linearGradient id="lineColor" x1="0%" y1="0%" x2="100%" y2="0%">
                                        <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.5" />
                                        <stop offset="100%" stopColor="#8b5cf6" stopOpacity="1" />
                                    </linearGradient>
                                    <linearGradient id="fillColor" x1="0%" y1="0%" x2="0%" y2="100%">
                                        <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.2" />
                                        <stop offset="100%" stopColor="transparent" stopOpacity="0" />
                                    </linearGradient>
                                </defs>
                                
                                <path 
                                    d="M0,180 C50,180 80,160 120,165 C160,170 180,120 220,130 C260,140 280,80 320,90 C360,100 380,40 420,50 C460,60 480,80 520,70 C560,60 580,20 620,30 C660,40 680,60 720,50 C760,40 780,20 800,10 L800,200 L0,200 Z" 
                                    fill="url(#fillColor)" 
                                />
                                <path 
                                    d="M0,180 C50,180 80,160 120,165 C160,170 180,120 220,130 C260,140 280,80 320,90 C360,100 380,40 420,50 C460,60 480,80 520,70 C560,60 580,20 620,30 C660,40 680,60 720,50 C760,40 780,20 800,10" 
                                    fill="none" 
                                    stroke="url(#lineColor)" 
                                    strokeWidth="3" 
                                    strokeLinecap="round"
                                />
                            </svg>
                            <div className="absolute top-6 left-6 text-white/30 text-xs font-mono uppercase tracking-widest flex items-center gap-2">
                                <BarChart2 size={12} />
                                Cumulative Equity Curve
                            </div>
                        </div>

                        {/* Benchmark KPIs */}
                        <div className="col-span-1 flex flex-col divide-y divide-white/5 bg-black/50">
                            {[
                                { label: 'Sharpe', value: '1.48', color: 'text-green-400' },
                                { label: 'Turnover', value: '25.30%', color: 'text-blue-400' },
                                { label: 'Fitness', value: '1.07', color: 'text-white' },
                                { label: 'Returns', value: '13.11%', color: 'text-green-400' },
                                { label: 'Drawdown', value: '10.45%', color: 'text-red-400' },
                                { label: 'Margin', value: '10.36‰', color: 'text-white' }
                            ].map((kpi, idx) => (
                                <div key={idx} className="flex-1 flex flex-col justify-center p-6 bg-white/[0.02] hover:bg-white/[0.04] transition-colors">
                                    <span className="text-[10px] text-white/40 uppercase tracking-widest font-bold mb-1 flex items-center gap-2">
                                        {kpi.label}
                                        {idx === 0 && <Zap size={10} className="text-green-500" />}
                                    </span>
                                    <span className={`text-2xl font-bold font-mono ${kpi.color}`}>
                                        {kpi.value}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Consultant Program Tracking */}
                    <div className="flex flex-col mb-4 p-4 mx-6 mt-4 bg-gradient-to-r from-yellow-500/10 to-amber-600/5 border border-yellow-500/20 rounded-lg">
                        <div className="flex justify-between items-center mb-3">
                            <div className="flex flex-col gap-1">
                                <span className="text-xs font-bold text-yellow-400 uppercase tracking-widest flex items-center gap-2">
                                    <Zap className="text-yellow-400" size={14} /> Brain Research Consultant Track
                                </span>
                                <span className="text-[10px] text-white/40 uppercase tracking-widest">
                                    Registration requires reaching threshold constraints linearly across 5 days.
                                </span>
                            </div>
                            <span className="text-[10px] text-yellow-500/60 font-mono tracking-widest py-1 px-3 border border-yellow-500/20 rounded bg-black/40">TARGET: 10,000 PTS</span>
                        </div>
                        
                        <div className="flex flex-col gap-2">
                            <div className="flex justify-between text-[10px] uppercase font-bold text-white/50 tracking-widest">
                                <span>Matrix Validation Protocol</span>
                                <span className="text-white text-xs">2,000 / 10,000</span>
                            </div>
                            <div className="w-full h-1.5 bg-black/40 rounded overflow-hidden relative">
                                <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,rgba(255,255,255,0.05)_10px,rgba(255,255,255,0.05)_20px)]" />
                                <div className="h-full bg-yellow-400 w-[20%] relative shadow-[0_0_15px_rgba(250,204,21,0.6)]">
                                     <div className="absolute top-0 bottom-0 left-0 right-0 bg-gradient-to-r from-transparent to-white/30" />
                                </div>
                            </div>
                            <div className="flex justify-between items-center mt-1">
                                <span className="text-[9px] text-yellow-500/80 uppercase font-bold tracking-widest flex items-center gap-1">
                                    <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" /> 
                                    Constraint: 2,000 Max Daily Accumulation 
                                </span>
                                <span className="text-[9px] text-emerald-400 uppercase tracking-widest font-mono font-bold bg-emerald-500/10 px-2 py-0.5 rounded">Day 1 / 5 Limit Reached</span>
                            </div>
                        </div>
                    </div>

                    {/* Consultant Program Tracking */}
                    <div className="flex flex-col mb-4 p-4 mx-0 mt-4 bg-gradient-to-r from-yellow-500/10 to-amber-600/5 border border-yellow-500/20 rounded-lg">
                        <div className="flex justify-between items-center mb-3">
                            <div className="flex flex-col gap-1">
                                <span className="text-xs font-bold text-yellow-400 uppercase tracking-widest flex items-center gap-2">
                                    <Zap className="text-yellow-400" size={14} /> Brain Research Consultant Track
                                </span>
                                <span className="text-[10px] text-white/40 uppercase tracking-widest">
                                    Registration requires reaching threshold constraints linearly across 5 days.
                                </span>
                            </div>
                            <span className="text-[10px] text-yellow-500/60 font-mono tracking-widest py-1 px-3 border border-yellow-500/20 rounded bg-black/40">TARGET: 10,000 PTS</span>
                        </div>
                        
                        <div className="flex flex-col gap-2">
                            <div className="flex justify-between text-[10px] uppercase font-bold text-white/50 tracking-widest">
                                <span>Matrix Validation Protocol</span>
                                <span className="text-white text-xs">2,000 / 10,000</span>
                            </div>
                            <div className="w-full h-1.5 bg-black/40 rounded overflow-hidden relative">
                                <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,rgba(255,255,255,0.05)_10px,rgba(255,255,255,0.05)_20px)]" />
                                <div className="h-full bg-yellow-400 w-[20%] relative shadow-[0_0_15px_rgba(250,204,21,0.6)]">
                                     <div className="absolute top-0 bottom-0 left-0 right-0 bg-gradient-to-r from-transparent to-white/30" />
                                </div>
                            </div>
                            <div className="flex justify-between items-center mt-1">
                                <span className="text-[9px] text-yellow-500/80 uppercase font-bold tracking-widest flex items-center gap-1">
                                    <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" /> 
                                    Constraint: 2,000 Max Daily Accumulation 
                                </span>
                                <span className="text-[9px] text-emerald-400 uppercase tracking-widest font-mono font-bold bg-emerald-500/10 px-2 py-0.5 rounded">Day 1 / 5 Limit Reached</span>
                            </div>
                        </div>
                    </div>

                    {/* WorldQuant Integration Badges */}
                    <div className="p-6 border-t border-white/5 bg-black/60 flex items-center gap-4 overflow-x-auto">
                        <span className="text-[10px] text-white/50 uppercase tracking-widest font-bold whitespace-nowrap mr-4">
                            Acquired Operational Badges
                        </span>
                        
                        {/* Milestone Badge: 1 */}
                        <div className="flex flex-col items-center justify-center p-3 rounded-lg border border-green-500/20 bg-green-500/5 min-w-[80px]">
                            <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center -rotate-45 mb-2 shadow-[0_0_15px_rgba(34,197,94,0.3)]">
                                <span className="text-white font-black text-xl rotate-45 transform drop-shadow-md">1</span>
                            </div>
                            <span className="text-[8px] text-green-400 font-bold tracking-widest uppercase">Initiated</span>
                        </div>
                        
                        {/* Classification: SPECTACULAR */}
                        <div className="flex flex-col items-center justify-center p-3 rounded-lg border border-red-500/20 bg-red-500/5 min-w-[100px]">
                            <div className="w-10 h-10 rounded-lg bg-black flex items-center justify-center mb-2 shadow-[0_0_15px_rgba(239,68,68,0.3)] border border-red-500/20">
                                <TrendingUp className="text-red-500 w-6 h-6" strokeWidth={3} />
                            </div>
                            <span className="text-[8px] text-red-500 font-bold tracking-widest uppercase">Spectacular</span>
                        </div>
                        
                        {/* Target: 10 */}
                        <div className="flex flex-col items-center justify-center p-3 rounded-lg border border-white/5 bg-white/[0.02] min-w-[80px] opacity-30 grayscale transition-all hover:grayscale-0 hover:opacity-100">
                            <div className="w-10 h-10 rounded-full bg-cyan-500 flex items-center justify-center -rotate-45 mb-2">
                                <span className="text-white font-black text-xl rotate-45 transform">10</span>
                            </div>
                            <span className="text-[8px] text-white/50 font-bold tracking-widest uppercase">Pending Array</span>
                        </div>
                    </div>
                </motion.div>
            )}
        </div>
    );
}
