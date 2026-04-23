'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Target, TrendingUp, Activity, BarChart2, Zap } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer } from 'recharts';

const MOCK_EQUITY_DATA = Array.from({length: 100}, (_, i) => ({
    step: i,
    equity: 100000 * Math.exp(i * 0.005) + Math.sin(i * 0.5) * 2000 + Math.random() * 1000
}));

export default function InstitutionalBenchmarkDashboard() {
    const [isGenerating, setIsGenerating] = useState(false);
    const [isComplete, setIsComplete] = useState(false);

    const handleProceed = () => {
        setIsGenerating(true);
        setTimeout(() => {
            setIsGenerating(false);
            setIsComplete(true);
        }, 3000);
    };

    return (
        <div className="bg-[#050505] border border-zinc-800 p-5 mt-8 font-mono uppercase tracking-widest text-zinc-300">
            {!isGenerating && !isComplete && (
                <div className="p-8 text-center flex flex-col items-center justify-center border border-zinc-900 bg-[#020202]">
                    <div className="flex items-center justify-center mb-4">
                        <Target className="w-12 h-12 text-zinc-600" />
                    </div>
                    <h3 className="text-xl font-bold text-zinc-400 tracking-widest uppercase mb-2">[ ALPHA ENGINE OFFLINE ]</h3>
                    <p className="text-zinc-600 text-[10px] max-w-md mx-auto mb-8 leading-relaxed">
                        SYNTHESIZE THE CURRENT ARCHITECTURE MATRIX INTO THE WORLDQUANT BACKEND TO EVALUATE SUB-UNIVERSE SHARPE VIABILITY.
                    </p>
                    <button 
                        onClick={handleProceed}
                        className="px-8 py-3 bg-[#050505] hover:bg-[#0a0a0a] text-cyan-500 font-bold tracking-[0.3em] text-[10px] border border-cyan-900 transition-colors"
                    >
                        PROCEED TO INSTITUTIONAL BENCHMARK
                    </button>
                </div>
            )}

            {isGenerating && (
                <div className="p-12 text-center flex flex-col items-center justify-center space-y-6 border border-zinc-900 bg-[#020202]">
                    <div className="w-12 h-12 rounded-none border border-zinc-800 border-t-cyan-500 animate-spin"></div>
                    <div>
                        <h4 className="text-cyan-500 font-bold tracking-[0.2em] uppercase text-[10px] mb-2">TRANSPILING NODE MATRIX</h4>
                        <p className="text-zinc-500 text-[9px] font-mono">EXECUTING OOS STRESS TEST ENGINE...</p>
                    </div>
                </div>
            )}

            {isComplete && (
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col border border-zinc-900 bg-[#020202]"
                >
                    {/* Live Tracker HUD */}
                    <div className="bg-[#050505] border-b border-zinc-900 p-4 flex justify-between items-center relative overflow-hidden">
                        <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,transparent,transparent_2px,rgba(239,68,68,0.02)_2px,rgba(239,68,68,0.02)_4px)]" />
                        <div className="relative z-10 flex flex-col">
                            <span className="text-[9px] text-rose-500 font-bold tracking-[0.2em] uppercase mb-1 flex items-center gap-2"><Target size={10} /> TARGET ADVERSARY LOCK: CA87835</span>
                            <span className="text-zinc-500 text-[8px] font-mono uppercase">UNIVERSITY OF NAIROBI • RANK: 1 • SCORE TO BEAT: 29,691</span>
                        </div>
                        <div className="relative z-10 text-right">
                           <span className="text-xl text-zinc-300 font-mono font-bold tracking-tighter">DELTA: -<span className="text-rose-500">29,691</span></span>
                           <span className="block text-[8px] text-zinc-600 uppercase tracking-widest mt-1">AWAITING VALIDATED SCORE TRANSFER</span>
                        </div>
                    </div>
                    
                    {/* Metrics Header */}
                    <div className="p-4 border-b border-zinc-900 bg-[#020202] flex items-center justify-between">
                         <div className="flex items-center gap-3">
                             <div className="p-2 border border-zinc-800 text-zinc-500">
                                 <Activity size={14} />
                             </div>
                             <div>
                                 <h3 className="text-xs font-bold text-zinc-300 tracking-[0.2em]">BENCHMARK COMPLETED</h3>
                                 <p className="text-zinc-600 text-[8px] uppercase tracking-widest mt-1">INSTITUTIONAL SHARPE CONSTRAINTS ACHIEVED</p>
                             </div>
                         </div>
                         <div className="flex gap-4">
                            <span className="px-2 py-1 border border-emerald-900/50 text-emerald-500 text-[8px] uppercase tracking-widest font-bold bg-[#050505]">PASS: TOP3000</span>
                            <span className="px-2 py-1 border border-cyan-900/50 text-cyan-500 text-[8px] uppercase tracking-widest font-bold bg-[#050505]">OOS VALIDATED</span>
                         </div>
                    </div>

                    {/* Matrix Parameters Table */}
                    <div className="grid grid-cols-6 divide-x divide-zinc-900 border-b border-zinc-900 bg-[#050505]">
                        {[{ label: 'REGION', val: 'USA' }, { label: 'UNIVERSE', val: 'TOP3000' }, { label: 'NEUTRALIZATION', val: 'INDUSTRY' }, { label: 'DELAY', val: '1' }, { label: 'DECAY', val: '10' }, { label: 'TRUNCATION', val: '0.08' }].map((item, i) => (
                            <div key={i} className="p-3 text-center">
                                <span className="block text-[8px] text-zinc-600 tracking-widest mb-1 font-bold">{item.label}</span>
                                <span className="text-zinc-300 text-[10px] font-mono">{item.val}</span>
                            </div>
                        ))}
                    </div>

                    {/* Chart & KPI Area */}
                    <div className="grid grid-cols-1 md:grid-cols-4 min-h-[300px]">
                        <div className="col-span-3 p-4 border-r border-zinc-900 bg-[#050505] flex flex-col relative h-[300px]">
                            <div className="text-zinc-500 text-[8px] font-mono uppercase tracking-[0.2em] flex items-center gap-2 mb-4 absolute top-4 left-4 z-10 bg-[#050505] px-2 py-1 border border-zinc-800">
                                <BarChart2 size={10} />
                                CUMULATIVE EQUITY CURVE
                            </div>
                            <div className="flex-1 w-full h-full mt-4">
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart data={MOCK_EQUITY_DATA} margin={{ top: 20, right: 0, left: 0, bottom: 0 }}>
                                        <defs>
                                            <linearGradient id="equityGrad" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.8}/>
                                                <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                                            </linearGradient>
                                        </defs>
                                        <XAxis dataKey="step" hide />
                                        <YAxis hide domain={['dataMin - 1000', 'dataMax + 1000']} />
                                        <Area type="monotone" dataKey="equity" stroke="#0ea5e9" strokeWidth={2} fillOpacity={1} fill="url(#equityGrad)" isAnimationActive={false} />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>
                        </div>

                        {/* Benchmark KPIs */}
                        <div className="col-span-1 flex flex-col divide-y divide-zinc-900 bg-[#020202]">
                            {[
                                { label: 'SHARPE', value: '1.48', color: 'text-emerald-500' },
                                { label: 'TURNOVER', value: '25.30%', color: 'text-cyan-500' },
                                { label: 'FITNESS', value: '1.07', color: 'text-zinc-300' },
                                { label: 'RETURNS', value: '13.11%', color: 'text-emerald-500' },
                                { label: 'DRAWDOWN', value: '10.45%', color: 'text-rose-500' },
                                { label: 'MARGIN', value: '10.36‰', color: 'text-zinc-300' }
                            ].map((kpi, idx) => (
                                <div key={idx} className="flex-1 flex flex-col justify-center p-4 hover:bg-[#050505] transition-colors">
                                    <span className="text-[8px] text-zinc-600 tracking-widest font-bold mb-1 flex items-center gap-2">
                                        {kpi.label}
                                        {idx === 0 && <Zap size={8} className="text-emerald-500" />}
                                    </span>
                                    <span className={`text-lg font-bold font-mono ${kpi.color}`}>
                                        {kpi.value}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Consultant Program Tracking */}
                    <div className="flex flex-col m-4 p-4 bg-[#050505] border border-amber-900/30">
                        <div className="flex justify-between items-center mb-3">
                            <div className="flex flex-col gap-1">
                                <span className="text-[9px] font-bold text-amber-500 uppercase tracking-[0.2em] flex items-center gap-2">
                                    <Zap className="text-amber-500" size={10} /> BRAIN RESEARCH CONSULTANT TRACK
                                </span>
                                <span className="text-[8px] text-zinc-500 tracking-widest">
                                    REGISTRATION REQUIRES REACHING THRESHOLD CONSTRAINTS LINEARLY ACROSS 5 DAYS.
                                </span>
                            </div>
                            <span className="text-[8px] text-amber-600 font-mono tracking-widest py-1 px-2 border border-amber-900/50 bg-[#020202]">TARGET: 10,000 PTS</span>
                        </div>
                        
                        <div className="flex flex-col gap-2">
                            <div className="flex justify-between text-[8px] uppercase font-bold text-zinc-500 tracking-widest">
                                <span>MATRIX VALIDATION PROTOCOL</span>
                                <span className="text-zinc-300 text-[9px]">2,000 / 10,000</span>
                            </div>
                            <div className="w-full h-1 bg-[#020202] border border-zinc-900 relative">
                                <div className="h-full bg-amber-500 w-[20%]" />
                            </div>
                            <div className="flex justify-between items-center mt-1">
                                <span className="text-[8px] text-zinc-500 uppercase font-bold tracking-widest flex items-center gap-1">
                                    <div className="w-1 h-1 bg-red-600 animate-pulse" /> 
                                    CONSTRAINT: 2,000 MAX DAILY ACCUMULATION 
                                </span>
                                <span className="text-[8px] text-emerald-500 uppercase tracking-[0.2em] font-mono font-bold bg-[#050505] px-2 border border-emerald-900">DAY 1 / 5 LIMIT REACHED</span>
                            </div>
                        </div>
                    </div>

                    {/* WorldQuant Integration Badges */}
                    <div className="p-4 border-t border-zinc-900 bg-[#050505] flex items-center gap-4 overflow-x-auto">
                        <span className="text-[8px] text-zinc-600 uppercase tracking-[0.2em] font-bold whitespace-nowrap mr-4">
                            ACQUIRED OPERATIONAL BADGES
                        </span>
                        
                        <div className="flex flex-col items-center justify-center p-2 border border-emerald-900/30 bg-[#020202] min-w-[70px]">
                            <div className="w-6 h-6 border border-emerald-500 flex items-center justify-center -rotate-45 mb-2">
                                <span className="text-emerald-500 font-bold text-xs rotate-45 transform">1</span>
                            </div>
                            <span className="text-[8px] text-emerald-600 font-bold tracking-widest uppercase">INITIATED</span>
                        </div>
                        
                        <div className="flex flex-col items-center justify-center p-2 border border-rose-900/30 bg-[#020202] min-w-[80px]">
                            <div className="w-6 h-6 rounded-none bg-[#050505] flex items-center justify-center mb-2 border border-red-600">
                                <TrendingUp className="text-rose-500 w-4 h-4" />
                            </div>
                            <span className="text-[8px] text-rose-600 font-bold tracking-widest uppercase">SPECTACULAR</span>
                        </div>
                        
                        <div className="flex flex-col items-center justify-center p-2 border border-zinc-800 bg-[#050505] min-w-[70px] opacity-40 grayscale">
                            <div className="w-6 h-6 border border-zinc-500 flex items-center justify-center -rotate-45 mb-2">
                                <span className="text-zinc-500 font-bold text-xs rotate-45 transform">10</span>
                            </div>
                            <span className="text-[8px] text-zinc-500 font-bold tracking-widest uppercase">PENDING</span>
                        </div>
                    </div>
                </motion.div>
            )}
        </div>
    );
}
