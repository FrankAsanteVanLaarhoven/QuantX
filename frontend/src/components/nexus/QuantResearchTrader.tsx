"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    TrendingUp, 
    TrendingDown,
    Activity,  
    Globe,
    Zap,
    ArrowRightLeft
} from 'lucide-react';
import { calculateDailyAlpha, TradeSignal, getInstitutionalFlow, estimateTradeOutcome } from '@/lib/nexus/quant-strategy-engine';
import { fuseMarketSignals, FusionSignal } from '@/lib/nexus/alpha-fusion-engine';
import { GLOBAL_REGISTRY } from '@/lib/nexus/universal-crawler';

export function QuantResearchTrader() {
    const [stake, setStake] = useState(10000);
    const [activeTrades, setActiveTrades] = useState<TradeSignal[]>([]);
    const [fusionSignal, setFusionSignal] = useState<FusionSignal | null>(null);
    const [flowData, setFlowData] = useState(getInstitutionalFlow(142.50));
    const [isSyncing, setIsSyncing] = useState(false);
    
    const [portfolioState, setPortfolioState] = useState<any>(null);
    const [geminiBriefing, setGeminiBriefing] = useState<string>("");

    useEffect(() => {
        setActiveTrades(calculateDailyAlpha(stake));
        
        const fusion = fuseMarketSignals(
            GLOBAL_REGISTRY[0], 
            0.65, 
            0.88, 
            true
        );
        setFusionSignal(fusion);

        const fetchLOB = async () => {
            try {
                const res = await fetch('http://localhost:8000/api/market/lob', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ ticker: 'NVDA' })
                });
                const data = await res.json();
                if (data && data.bids && data.asks) {
                    const signals: any[] = [];
                    data.bids.slice(0, 7).forEach((b: any) => {
                        signals.push({ price: b.price, intensity: Math.min(b.volume / 50000, 1.0), type: b.type === 'spoof' ? 'STOP_HUNT' : 'ORDER_BLOCK' });
                    });
                    data.asks.slice(-8).forEach((a: any) => {
                        signals.push({ price: a.price, intensity: Math.min(a.volume / 48000, 1.0), type: a.type === 'iceberg' ? 'LIQUIDITY_GAP' : 'ORDER_BLOCK' });
                    });
                    setFlowData(signals);
                    setIsSyncing(true);
                    setTimeout(() => setIsSyncing(false), 800);
                }
            } catch (e) {
                setFlowData(getInstitutionalFlow(142.50));
            }
        };
        fetchLOB();
        const interval = setInterval(fetchLOB, 5000);

        const ws = new WebSocket('ws://localhost:8000/ws/telemetry');
        ws.onmessage = (event) => {
            try {
                const data = JSON.parse(event.data);
                if (data.source === "NAVA_CLAW_PYTHON") {
                    const dynamicEntry = data.sl && data.direction === 'LONG' ? data.sl * 1.01 : (data.tp ? data.tp * 0.99 : 150);
                    
                    const newTrade: TradeSignal = {
                        ticker: data.ticker,
                        type: data.direction,
                        entry: dynamicEntry,
                        target: data.tp || (dynamicEntry * 1.05),
                        stopLoss: data.sl || (dynamicEntry * 0.95),
                        conviction: data.ai_confidence ? data.ai_confidence / 100 : 0.999,
                        timeframe: data.event_type.includes('SCALP') ? '1M_SCALP' : 'SESSION_ORB',
                        rationale: data.event_type,
                        swarm_breakdown: data.swarm_breakdown
                    };
                    setActiveTrades(prev => [newTrade, ...prev].slice(0, 5));
                    setTimeout(() => setIsSyncing(false), 900);
                } else if (data.source === "PORTFOLIO_TRACKER") {
                    setPortfolioState(data);
                } else if (data.source === "MORNING_BRIEFING") {
                    setGeminiBriefing(data.briefing);
                }
            } catch(e) {
                console.error("Telemetry Parse Failure", e);
            }
        };

        return () => {
            clearInterval(interval);
            ws.close();
        };
    }, [stake]);

    return (
        <div className="w-full h-full bg-[#000000] border border-zinc-800 rounded flex flex-col font-mono relative overflow-hidden uppercase tracking-widest text-zinc-300 selection:bg-zinc-800">
            {/* Top Minimal Strip */}
            <div className="border-b border-zinc-900 bg-[#050505] p-2 flex justify-between items-center z-20">
                <div className="flex gap-4 px-2">
                   {['Stock Screeners', 'ETF Databases', 'Investment Reports', 'Market News'].map((pipeline, i) => (
                       <div key={i} className="flex items-center gap-2 text-[9px] text-zinc-500 font-bold hover:text-zinc-300 transition-colors cursor-pointer border-r border-zinc-800 pr-4 last:border-r-0">
                           <div className="w-1.5 h-1.5 bg-zinc-600" />
                           {pipeline}
                       </div>
                   ))}
                </div>
                
                {/* Fusion Pulse Replaced by strict tracker */}
                <div className="flex items-center gap-6 px-4">
                    <div className="flex flex-col items-end">
                        <span className="text-[8px] text-zinc-600 font-bold">NEURAL_FUSION_PULSE</span>
                        <div className="h-[2px] w-24 bg-zinc-900 mt-1 overflow-hidden relative">
                            <motion.div 
                                animate={{ width: `${(fusionSignal?.confidence || 0) * 100}%` }}
                                className="absolute top-0 left-0 h-full bg-zinc-300"
                            />
                        </div>
                    </div>
                    <div className="text-[9px] font-bold text-zinc-500 flex items-center gap-2 bg-[#020202] border border-zinc-800 px-2 py-1">
                        <Activity size={10} className="text-zinc-400" />
                        LATENCY: {fusionSignal?.latencyMs}ms
                    </div>
                </div>
            </div>

            {/* Header Data Section */}
            <div className="p-6 flex justify-between items-end border-b border-zinc-900 bg-[#020202] relative z-10">
                <div className="flex flex-col">
                    <h2 className="text-xl font-bold text-zinc-100 uppercase tracking-[0.3em]">Quant Research Trader</h2>
                    <p className="text-[9px] text-zinc-500 font-bold mt-1">SOVEREIGN ALPHA MATRIX // INSTITUTIONAL 2035</p>
                </div>

                <div className="flex gap-8 items-center mr-8">
                    {portfolioState && (
                        <div className="hidden lg:flex flex-col items-end border-r border-zinc-800 pr-8">
                            <span className="text-[9px] text-zinc-600 font-bold tracking-[0.2em]">NET EQUITY // {portfolioState.total_positions} POS</span>
                            <span className="text-2xl font-bold text-zinc-100 tracking-tighter mt-1">
                                ${portfolioState.equity.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}
                            </span>
                            <span className={`text-[9px] font-bold uppercase mt-1 px-1 border ${portfolioState.day_pnl >= 0 ? 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30' : 'text-rose-400 bg-rose-500/10 border-rose-500/30'}`}>
                                {portfolioState.day_pnl >= 0 ? '+' : ''}${portfolioState.day_pnl.toFixed(2)} ({portfolioState.day_pnl_pct.toFixed(2)}%)
                            </span>
                        </div>
                    )}

                    <div className="flex flex-col items-end">
                        <span className="text-[9px] text-zinc-600 font-bold tracking-[0.2em]">ALPHA CONVICTION</span>
                        <div className="flex items-center gap-2 mt-1">
                             <span className="text-xl font-bold text-zinc-300 tracking-tighter">
                                {fusionSignal?.convictionType || 'AGGREGATE'} // {(fusionSignal?.confidence ? fusionSignal.confidence * 100 : 99.9).toFixed(1)}%
                             </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Trading Area */}
            <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 relative z-10 overflow-hidden">
                
                {/* Left Column: Intelligence Matrix */}
                <div className="lg:col-span-8 flex flex-col border-r border-zinc-900 bg-[#050505]">
                    
                    {/* Gemini AI Briefing Panel */}
                    {(geminiBriefing || portfolioState?.positions?.length > 0) && (
                        <div className="p-4 bg-[#0a0a0a] border-b border-zinc-900 relative">
                            <h3 className="text-[9px] text-zinc-400 font-bold tracking-widest mb-3 flex items-center gap-2">
                                <Zap size={10} className="text-zinc-500" /> COGNITIVE OVERLAY // BRIEFING_ACTIVE
                            </h3>
                            {geminiBriefing ? (
                                <p className="text-[10px] text-zinc-500 leading-relaxed font-mono whitespace-pre-wrap">
                                    {geminiBriefing}
                                </p>
                            ) : portfolioState?.positions?.length > 0 ? (
                                <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 mt-2">
                                    {portfolioState.positions.map((p: any, i: number) => (
                                        <div key={i} className="p-2 border border-zinc-800 bg-[#020202] flex flex-col gap-1">
                                            <span className="text-[10px] font-bold text-zinc-100">{p.ticker}</span>
                                            <span className="text-[8px] text-zinc-600">{p.side} {p.qty}x</span>
                                            <span className={`text-[10px] font-bold ${p.unrealized_pnl >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                                                {p.unrealized_pnl >= 0 ? '+' : ''}${p.unrealized_pnl.toFixed(2)}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            ) : null}
                        </div>
                    )}

                    <div className="flex-1 overflow-hidden flex flex-col relative p-4">
                        <div className="flex items-center justify-between mb-6 pb-2 border-b border-zinc-900">
                            <div className="flex flex-col">
                                <span className="text-[9px] text-zinc-400 font-bold tracking-widest">ORDER FLOW DISCOVERY MATRIX</span>
                                <span className="text-[8px] text-zinc-600 mt-1">{fusionSignal?.rationale}</span>
                            </div>
                            <div className={`flex items-center gap-2 text-[8px] font-bold border px-2 py-1 transition-colors ${isSyncing ? 'text-emerald-500 bg-emerald-500/10 border-emerald-500/30' : 'text-zinc-500 border-zinc-800 bg-zinc-950'}`}>
                                {isSyncing ? 'FUSING_SIGNAL_TRUTH' : 'IDLE_MONITORING'}
                            </div>
                        </div>

                        {/* Order Flow Structural Visualization (Replaces Glowing Bars) */}
                        <div className="flex-1 overflow-y-auto custom-scrollbar">
                            <div className="grid grid-cols-12 gap-4 text-[8px] text-zinc-600 font-bold mb-3 px-2">
                                <div className="col-span-2">PRICE LVL</div>
                                <div className="col-span-8">DENSITY SIGNATURE</div>
                                <div className="col-span-2 text-right">EVENT_TYPE</div>
                            </div>
                            <div className="flex flex-col gap-2">
                                {flowData.map((f, i) => (
                                    <motion.div 
                                        key={i}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="grid grid-cols-12 gap-4 items-center group/flow px-2 py-1 border border-transparent hover:border-zinc-800 hover:bg-[#020202] transition-colors"
                                    >
                                        <div className="col-span-2 text-[9px] text-zinc-400 font-mono">${f.price.toFixed(2)}</div>
                                        <div className="col-span-8 relative flex items-center h-full">
                                            <div className="w-full h-[2px] bg-zinc-900 relative">
                                                <motion.div 
                                                    style={{ width: `${f.intensity * 100}%` }}
                                                    className={`absolute top-0 left-0 h-full ${
                                                        f.type === 'ORDER_BLOCK' ? 'bg-emerald-500/80 shadow-[0_0_8px_rgba(16,185,129,0.3)]' :
                                                        f.type === 'STOP_HUNT' ? 'bg-rose-500/80 shadow-[0_0_8px_rgba(244,63,94,0.3)]' : 'bg-zinc-700'
                                                    }`}
                                                />
                                            </div>
                                        </div>
                                        <div className={`col-span-2 text-right text-[8px] font-bold tracking-widest ${
                                            f.type === 'ORDER_BLOCK' ? 'text-zinc-300' : 'text-zinc-500'
                                        }`}>
                                            {f.type}
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column: Fused Targets Array */}
                <div className="lg:col-span-4 flex flex-col bg-[#000000]">
                    <div className="p-4 border-b border-zinc-900 bg-[#050505]">
                        <span className="text-[9px] text-zinc-500 font-bold tracking-widest">FUSED ALPHA TARGETS</span>
                    </div>

                    <div className="flex-1 overflow-y-auto custom-scrollbar p-4 flex flex-col gap-4">
                        {activeTrades.map((trade, i) => (
                            <motion.div 
                                key={trade.ticker}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: i * 0.1 }}
                                className={`p-4 border bg-[#020202] flex flex-col gap-4 transition-colors ${
                                    trade.ticker === fusionSignal?.ticker ? 'border-zinc-500 bg-[#050505]' : 'border-zinc-900'
                                }`}
                            >
                                <div className="flex justify-between items-center">
                                    <div className="flex items-center gap-2">
                                        <div className="text-zinc-400 bg-zinc-900 border border-zinc-800 p-1">
                                            {trade.type === 'LONG' ? <TrendingUp size={10} className='text-emerald-500' /> : <TrendingDown size={10} className='text-rose-500' />}
                                        </div>
                                        <span className="text-[11px] font-bold text-zinc-100">{trade.ticker}</span>
                                    </div>
                                    <div className="text-[8px] font-bold text-zinc-400 bg-zinc-900 border border-zinc-800 px-2 py-1">
                                        {(trade.conviction * 100).toFixed(1)}% C_SCORE
                                    </div>
                                </div>

                                <div className="grid grid-cols-3 gap-2 border-t border-zinc-900 pt-3">
                                    <div className="flex flex-col">
                                        <span className="text-[8px] text-zinc-600 font-bold">ENTRY</span>
                                        <span className="text-[10px] text-zinc-300">${trade.entry.toFixed(2)}</span>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-[8px] text-zinc-600 font-bold">TARGET</span>
                                        <span className="text-[10px] text-zinc-400">${trade.target.toFixed(2)}</span>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-[8px] text-zinc-600 font-bold">COLLAPSE</span>
                                        <span className="text-[10px] text-emerald-400">+${estimateTradeOutcome(stake, trade).toFixed(0)}</span>
                                    </div>
                                </div>
                                
                                {/* BAYESIAN Matrix (Stripped of dots) */}
                                {trade.swarm_breakdown && trade.swarm_breakdown.length > 0 && (
                                    <div className="flex flex-col gap-2 mt-1 border-t border-zinc-900 pt-3">
                                        <div className="flex items-center justify-between">
                                            <span className="text-[8px] text-zinc-600 font-bold">SWARM WEIGHT MATRIX</span>
                                            <span className="text-[8px] text-zinc-500 font-bold">V6.8</span>
                                        </div>
                                        <div className="flex items-center h-1 bg-zinc-900 w-full overflow-hidden">
                                            {trade.swarm_breakdown.map((agent: any, agentIdx: number) => {
                                                const isApproved = agent.weighted_vote > 0;
                                                const rawIntensity = Math.abs(agent.raw_vote);
                                                const scale = Math.max(10, agent.weight * 16);
                                                
                                                return (
                                                    <div 
                                                        key={agentIdx} 
                                                        className={`h-full ${isApproved ? 'bg-zinc-400' : 'bg-rose-900/50'}`}
                                                        style={{ width: `${scale}px`, opacity: rawIntensity }}
                                                    />
                                                );
                                            })}
                                        </div>
                                    </div>
                                )}
                            </motion.div>
                        ))}
                    </div>

                    {fusionSignal?.ticker && (
                        <div className="mt-auto p-4 border-t border-zinc-800 bg-[#050505] flex gap-3 items-center">
                            <ArrowRightLeft size={16} className="text-zinc-500 shrink-0" />
                            <div className="flex flex-col">
                                <span className="text-[8px] text-zinc-500 font-bold">EXECUTION DIRECTIVE</span>
                                <span className="text-[9px] text-zinc-200 font-bold uppercase mt-0.5">
                                    WAIT FOR 4H LIQUIDITY SWEEP @ ${(fusionSignal.entry ? fusionSignal.entry * 0.99 : 142).toFixed(2)}
                                </span>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            
            {/* Extremely muted data-center scanline mesh over entire canvas */}
            <div className="absolute inset-0 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/black-scales.png')] opacity-[0.03] z-0" />
        </div>
    );
}
