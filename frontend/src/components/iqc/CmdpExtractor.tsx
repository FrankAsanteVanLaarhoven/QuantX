'use client';

import React, { useState } from 'react';
import { Radar, Target, Settings2, Box } from 'lucide-react';

export default function CmdpExtractor() {
    const [isPinging, setIsPinging] = useState(false);
    const [cmdpData, setCmdpData] = useState<any>(null);
    const [ticker, setTicker] = useState('NVDA');

    const handleExtract = async () => {
        setIsPinging(true);
        try {
            const res = await fetch(`http://localhost:8000/api/cognitive/analyze/${ticker}?smoothing_factor=0.0001`);
            const data = await res.json();
            setCmdpData(data);
        } catch (e) {
            console.error("CMDP Core failed", e);
        }
        setIsPinging(false);
    };

    return (
        <div className="bg-[#0A0A0E] border border-white/5 rounded-xl overflow-hidden relative">
            <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                        <Radar className="text-cyan-500" size={24} />
                        <h3 className="text-xl font-bold text-white tracking-wide" style={{ fontFamily: 'Outfit, sans-serif' }}>
                            CMDP Optimization
                        </h3>
                    </div>
                    <div className="px-3 py-1 bg-cyan-500/10 text-cyan-400 text-[10px] font-bold tracking-widest uppercase rounded border border-cyan-500/20 flex items-center gap-2">
                        <Box size={14} /> Stage III
                    </div>
                </div>

                <p className="text-white/50 text-sm mb-6 leading-relaxed">
                    Overlay a Stochastic Density matrix across your Alpha's trajectory. Actively mathematically constrain turnover friction by feeding signals through a Constrained Markov Decision Process.
                </p>

                <div className="flex gap-4 mb-6">
                    <div className="flex-1">
                        <label className="text-[10px] text-white/40 uppercase tracking-widest font-bold mb-2 block">Target Vector</label>
                        <input 
                            type="text" 
                            value={ticker}
                            onChange={(e) => setTicker(e.target.value.toUpperCase())}
                            className="w-full bg-black border border-white/10 rounded px-4 py-2 text-white font-mono text-sm focus:outline-none focus:border-cyan-500/50 uppercase"
                        />
                    </div>
                    <div className="flex items-end">
                        <button 
                            onClick={handleExtract}
                            disabled={isPinging}
                            className="bg-cyan-900/40 border border-cyan-500/30 hover:bg-cyan-900/60 transition-colors text-cyan-400 px-6 py-2 rounded text-xs font-bold uppercase tracking-widest flex items-center gap-2 disabled:opacity-50"
                        >
                            {isPinging ? <Settings2 className="animate-spin" size={16} /> : <Target size={16} />}
                            {isPinging ? 'Estimating...' : 'Extract CMDP Bounds'}
                        </button>
                    </div>
                </div>

                {cmdpData && (
                    <div className="animate-in fade-in slide-in-from-bottom-2">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                            <div className="p-3 bg-black/40 border border-white/5 rounded">
                                <span className="block text-[10px] text-cyan-500 font-bold uppercase tracking-widest mb-1">Raw Spot</span>
                                <span className="text-white font-mono">${cmdpData.current_price?.toFixed(2)}</span>
                            </div>
                            <div className="p-3 bg-black/40 border border-white/5 rounded">
                                <span className="block text-[10px] text-cyan-500 font-bold uppercase tracking-widest mb-1">Recommendation</span>
                                <span className={`text-sm font-black tracking-widest ${cmdpData.recommendation === 'BUY' ? 'text-green-500' : cmdpData.recommendation === 'SELL' ? 'text-red-500' : 'text-gray-400'}`}>
                                    {cmdpData.recommendation}
                                </span>
                            </div>
                            <div className="p-3 bg-black/40 border border-white/5 rounded">
                                <span className="block text-[10px] text-cyan-500 font-bold uppercase tracking-widest mb-1">Smoothing Factor</span>
                                <span className="text-blue-400 font-mono">1e-4</span>
                            </div>
                            <div className="p-3 bg-cyan-900/10 border border-cyan-500/20 rounded">
                                <span className="block text-[10px] text-cyan-400 font-bold uppercase tracking-widest mb-1">Convergence</span>
                                <span className="text-cyan-300 font-mono">{cmdpData.confidence}%</span>
                            </div>
                        </div>

                        <div className="bg-black/60 border border-white/5 p-4 rounded text-sm text-white/70 leading-relaxed mb-4">
                            <div className="text-[10px] text-white/30 uppercase tracking-widest mb-2 font-bold">1-to-3 Day Cognitive Outlook</div>
                            {cmdpData.short_term_outlook}
                        </div>

                        <div className="bg-red-950/20 border border-red-500/20 p-4 rounded text-sm">
                            <div className="text-[10px] text-red-500 uppercase tracking-widest mb-2 font-bold flex gap-2 items-center">
                                <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                                7-Day Cognitive Risk Approach
                            </div>
                            <ul className="space-y-2">
                                {cmdpData.cognitive_risk_7d?.map((risk: string, i: number) => (
                                    <li key={i} className="text-red-200/60 text-xs">
                                        <span className="text-red-500 mr-2 text-[10px]">[{i+1}]</span>{risk}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
