"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, ShieldAlert, Activity, RefreshCw } from 'lucide-react';

export function AITailRiskMonitor() {
    const [riskData, setRiskData] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(false);

    const triggerSimulation = async () => {
        setIsLoading(true);
        try {
            const res = await fetch('http://127.0.0.1:8000/api/ai/tail-risk', { method: 'POST' });
            const data = await res.json();
            setRiskData(data);
        } catch (e) {
            console.error("Tail risk simulation failed", e);
        }
        setIsLoading(false);
    };

    useEffect(() => {
        triggerSimulation();
    }, []);

    return (
        <div className="w-full h-full bg-[#0a0000] border border-rose-900/50 rounded-3xl p-6 flex flex-col font-mono relative overflow-hidden group shadow-[0_0_80px_rgba(220,38,38,0.05)]">
            {/* Background Aesthetic */}
            <div className="absolute inset-0 opacity-[0.03] flex items-center justify-center pointer-events-none">
                <div className="text-[12rem] text-rose-500 font-black tracking-widest -rotate-12 translate-y-10 uppercase">TAIL_RISK</div>
            </div>

            <div className="flex items-center justify-between z-10 border-b border-rose-900/30 pb-4 mb-4">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-rose-900/20 border border-rose-500/20 rounded-xl">
                        <AlertTriangle className="w-5 h-5 text-rose-500 animate-pulse" />
                    </div>
                    <div>
                        <h2 className="text-sm font-black text-white uppercase tracking-widest">AI Tail-Risk Simulator</h2>
                        <p className="text-[9px] text-rose-400/60 uppercase tracking-widest mt-1">Black Swan Stress Engine</p>
                    </div>
                </div>
                <button 
                    onClick={triggerSimulation} 
                    disabled={isLoading}
                    className="p-2 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-colors disabled:opacity-50"
                >
                    <RefreshCw className={`w-4 h-4 text-gray-400 ${isLoading ? 'animate-spin' : ''}`} />
                </button>
            </div>

            <div className="flex-1 flex flex-col z-10 overflow-y-auto custom-scrollbar pr-2">
                {isLoading ? (
                    <div className="flex-1 flex flex-col items-center justify-center opacity-60">
                        <ShieldAlert className="w-8 h-8 text-rose-500 animate-pulse mb-4" />
                        <span className="text-[10px] text-rose-400 uppercase tracking-widest animate-pulse text-center">
                            Synthesizing Catastrophic Geopolitical Vectors...
                        </span>
                    </div>
                ) : riskData ? (
                    <div className="flex flex-col gap-6 animation-fade-in">
                        {/* Event Overview */}
                        <div className="bg-red-950/20 border border-rose-900/30 p-4 rounded-2xl">
                            <h3 className="text-[10px] text-rose-500 font-bold uppercase tracking-widest mb-1 flex items-center gap-2">
                                <span className="w-1.5 h-1.5 bg-rose-500 rounded-full animate-ping" />
                                Simulated Fracture Event
                            </h3>
                            <p className="text-sm text-gray-200 mt-2 font-black tracking-wide leading-relaxed">
                                {riskData.hypothetical_event || "Unprecedented Global Liquidity Shock"}
                            </p>
                        </div>

                        {/* Impact Metrics */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="p-4 bg-black/40 border border-white/5 rounded-2xl flex flex-col items-center text-center">
                                <span className="text-[9px] text-gray-500 uppercase tracking-widest mb-2">Instantaneous Drawdown</span>
                                <span className="text-3xl text-rose-500 font-bold tracking-tighter">
                                    {(riskData.instantaneous_drawdown_pct || -12.4)}%
                                </span>
                            </div>
                            <div className="p-4 bg-black/40 border border-white/5 rounded-2xl flex flex-col items-center text-center">
                                <span className="text-[9px] text-gray-500 uppercase tracking-widest mb-2">Portfolio Value at Risk</span>
                                <span className="text-3xl text-rose-500 font-bold tracking-tighter">
                                    -${(riskData.value_at_risk_usd || 14250).toLocaleString()}
                                </span>
                            </div>
                        </div>

                        {/* Defensive AI Recommendations */}
                        <div className="bg-black/40 border border-emerald-900/30 p-4 rounded-2xl">
                            <h3 className="text-[10px] text-emerald-500 font-bold uppercase tracking-widest mb-3 flex items-center gap-2">
                                <ShieldAlert className="w-3 h-3" /> Defensive Overrides Recommended
                            </h3>
                            <div className="space-y-3">
                                {(riskData.defensive_hedges || [
                                    "Long VIX OTM Call Options (+30 days)", 
                                    "Flatten High-Beta tech exposure by 40%", 
                                    "Allocate 15% to Sovereign Short-Duration Bonds"
                                ]).map((hedge: string, i: number) => (
                                    <div key={i} className="flex gap-3 items-start">
                                        <div className="w-4 h-4 rounded bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center shrink-0 mt-0.5">
                                            <span className="text-[8px] text-emerald-400 font-black">{i + 1}</span>
                                        </div>
                                        <p className="text-xs text-emerald-200/80 leading-relaxed uppercase font-black">{hedge}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="flex-1 flex flex-col items-center justify-center opacity-40">
                        <Activity className="w-8 h-8 text-gray-500 mb-4" />
                        <span className="text-[10px] text-gray-500 uppercase tracking-widest">System Ready</span>
                    </div>
                )}
            </div>
        </div>
    );
}
