"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const SwarmOrchestrationPanel = () => {
    const [telemetry, setTelemetry] = useState<any[]>([]);
    const [connected, setConnected] = useState(false);

    useEffect(() => {
        const ws = new WebSocket('ws://127.0.0.1:8000/ws/telemetry');
        
        ws.onopen = () => setConnected(true);
        ws.onclose = () => setConnected(false);
        ws.onerror = (e) => console.log("Swarm Telemetry WS Error:", e);
        
        ws.onmessage = (event) => {
            const data = JSON.parse(event.data);
            if (data.node === "Genesis Swarm - Alpha Forged") {
                setTelemetry(prev => [data, ...prev].slice(0, 10)); // Keep last 10 execution chunks
            }
        };

        return () => ws.close();
    }, []);

    return (
        <div className="w-full h-full bg-[#0a0a0a] border border-white/10 rounded-2xl p-6 flex flex-col font-sans relative overflow-hidden">
            {/* Background Map Graphic */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: "linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)", backgroundSize: "30px 30px" }} />

            <div className="flex justify-between items-start mb-6 z-10 border-b border-white/10 pb-4">
                <div>
                   <h2 className="text-2xl font-black text-white tracking-widest uppercase mb-1 flex items-center gap-2">
                      <div className={`w-3 h-3 rounded-full ${connected ? 'bg-emerald-500 animate-pulse shadow-[0_0_10px_#22c55e]' : 'bg-rose-500'}`} />
                      Swarm Orchestrator
                   </h2>
                   <p className="text-xs text-slate-500 uppercase tracking-widest">Multi-Agent Debate \u0026 Transpilation Log</p>
                </div>
                <div className="flex items-center gap-4 bg-black/50 p-2 rounded-lg border border-white/5">
                   <div className="flex flex-col items-end">
                      <span className="text-[9px] text-slate-500 uppercase font-black">WS Connection</span>
                      <span className="text-xs text-sky-400 font-mono">{connected ? 'STABLE - 127.0.0.1:8000' : 'OFFLINE'}</span>
                   </div>
                   <div className="flex flex-col items-end border-l border-white/10 pl-4">
                      <span className="text-[9px] text-slate-500 uppercase font-black">Active Swarm Protocol</span>
                      <span className="text-xs text-white font-mono">Genesis / Gemma-9B</span>
                   </div>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto w-full custom-scrollbar z-10 pr-4">
                <AnimatePresence>
                    {telemetry.map((t, idx) => (
                        <motion.div 
                            key={t.timestamp + idx}
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            layout
                            className="bg-black/40 border border-white/5 rounded-xl p-4 mb-4 flex flex-col gap-3 shadow-lg"
                        >
                            {/* Header Meta */}
                            <div className="flex justify-between items-center pb-2 border-b border-white/5">
                               <span className="text-[10px] text-slate-400 font-mono bg-white/5 px-2 py-1 rounded">{t.timestamp}</span>
                               <span className="text-xs text-emerald-400 font-bold tracking-widest uppercase flex items-center gap-1">
                                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                                  {t.node}
                               </span>
                            </div>

                            {/* Main Grid: Code + Agent Logic */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                                {/* Code / Payload Section */}
                                <div className="bg-[#050505] p-3 rounded border border-white/10 relative group">
                                    <span className="absolute -top-2 left-2 bg-black px-1 text-[8px] text-sky-400 font-mono font-bold uppercase tracking-widest">Raw LLM Output Payload</span>
                                    <pre className="text-xs text-slate-300 font-mono whitespace-pre-wrap overflow-x-hidden line-clamp-6 group-hover:line-clamp-none transition-all">
                                        {t.autonomous_payload}
                                    </pre>
                                </div>
                                
                                {/* Telemetry Metrics Section */}
                                <div className="flex flex-col gap-2">
                                    {t.agent_telemetry ? (
                                        <>
                                           <div className="bg-blue-900/10 border border-blue-500/20 p-2 rounded flex justify-between items-center">
                                               <span className="text-[10px] text-blue-400 font-black uppercase">Active Agent</span>
                                               <span className="text-xs text-white font-mono">{t.agent_telemetry.active_agent}</span>
                                           </div>
                                           <div className="bg-white/5 border border-white/10 p-2 rounded flex justify-between items-center">
                                               <span className="text-[10px] text-slate-400 font-black uppercase">Context Utilization</span>
                                               <div className="flex items-center gap-2">
                                                  <div className="w-16 h-1 bg-white/10 rounded overflow-hidden"><div className="h-full bg-orange-400" style={{ width: t.agent_telemetry.context_window_used }}/></div>
                                                  <span className="text-xs text-orange-400 font-mono">{t.agent_telemetry.context_window_used}</span>
                                               </div>
                                           </div>
                                           <div className="bg-white/5 border border-white/10 p-2 rounded flex justify-between items-center">
                                               <span className="text-[10px] text-slate-400 font-black uppercase">Model Speed</span>
                                               <span className="text-xs text-emerald-400 font-mono">{t.agent_telemetry.tokens_per_second} TPS</span>
                                           </div>
                                           <div className="bg-white/5 border border-white/10 p-2 rounded flex flex-col gap-1">
                                               <span className="text-[8px] text-slate-500 font-black uppercase">Debate Logic Path</span>
                                               <span className="text-[10px] text-slate-300 font-mono font-bold leading-tight">{t.agent_telemetry.logic_path}</span>
                                           </div>
                                        </>
                                    ) : (
                                        <div className="flex h-full items-center justify-center text-xs text-slate-600 font-mono border border-dashed border-white/10 rounded">
                                            Telemetry Data Unavailable
                                        </div>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                    
                    {telemetry.length === 0 && connected && (
                        <div className="w-full py-12 flex flex-col items-center justify-center gap-4 border border-dashed border-white/10 rounded-2xl">
                           <div className="w-8 h-8 rounded-full border-2 border-t-sky-500 animate-spin" />
                           <span className="text-xs text-slate-500 font-mono uppercase tracking-widest">Awaiting Swarm Executions...</span>
                        </div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
