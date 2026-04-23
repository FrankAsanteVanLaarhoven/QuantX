"use client";

import React, { useState, useEffect } from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import { 
    TrendingUp, 
    Calendar, 
    Activity, 
    FileText,
    History,
    Zap,
    Settings,
    ArrowUpRight,
    ArrowDownRight
} from 'lucide-react';
import { runSovereignBacktest, SimulationResult } from '@/lib/nexus/sovereign-rehearsal-engine';

export function VisualBacktestHub() {
    const [backtest, setBacktest] = useState<SimulationResult | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [activeTab, setActiveTab] = useState<'EQUITY' | 'CALENDAR' | 'TRADES'>('EQUITY');

    useEffect(() => {
        const runSimulation = async () => {
            setIsLoading(true);
            const result = await runSovereignBacktest({
                startingBalance: 10000,
                pair: 'GBP/USD',
                mode: 'TYPE_1',
                slippageModel: 'CITADEL_CONSERVATIVE',
                includeTruthFusion: true
            });
            setTimeout(() => {
                setBacktest(result);
                setIsLoading(false);
            }, 1000);
        };
        runSimulation();
    }, []);

    if (isLoading || !backtest) {
        return (
            <div className="w-full h-full bg-[#000000] flex items-center justify-center font-mono border border-zinc-800 rounded-xl">
                <div className="flex flex-col items-center gap-6">
                    <div className="text-zinc-500 text-[10px] uppercase tracking-[0.5em] animate-pulse">
                        [ INITIATING SOVEREIGN REHEARSAL ENGINE ]
                    </div>
                </div>
            </div>
        );
    }

    const netPnL = backtest.equityCurve[backtest.equityCurve.length - 1].v - 10000;
    
    // Transform equityCurve for Recharts
    const chartData = backtest.equityCurve.map((pt, i) => ({
        step: i,
        equity: pt.v
    }));

    return (
        <div className="w-full h-full bg-[#000000] border border-zinc-800 rounded-xl p-6 flex flex-col font-mono relative overflow-hidden uppercase tracking-widest text-zinc-300">
            
            {/* Header: Benchmark Stats */}
            <div className="flex flex-col xl:flex-row xl:items-center justify-between mb-6 border-b border-zinc-900 pb-6 gap-6">
                <div className="flex items-center gap-4">
                    <div className="p-2 border border-zinc-800 bg-[#050505]">
                        <Activity size={16} className="text-zinc-500" />
                    </div>
                    <div>
                        <h2 className="text-xs font-bold text-zinc-100 uppercase tracking-[0.3em]">Sovereign Rehearsal Dashboard</h2>
                        <p className="text-[9px] text-zinc-600 uppercase tracking-widest mt-1">Institutional Benchmark // $10,000 Baseline</p>
                    </div>
                </div>

                <div className="flex gap-8 border-l border-zinc-900 pl-8">
                    <div className="flex flex-col items-end">
                        <span className="text-[8px] text-zinc-600 font-bold mb-1">NET P/L</span>
                        <span className={`text-sm font-bold tracking-tighter ${netPnL >= 0 ? 'text-emerald-500' : 'text-rose-500'}`}>
                            {netPnL >= 0 ? '+' : ''}${netPnL.toFixed(2)}
                        </span>
                    </div>
                    <div className="flex flex-col items-end">
                        <span className="text-[8px] text-zinc-600 font-bold mb-1">WIN RATE</span>
                        <span className="text-sm font-bold text-zinc-300">{(backtest.winRate * 100).toFixed(1)}%</span>
                    </div>
                    <div className="flex flex-col items-end">
                        <span className="text-[8px] text-zinc-600 font-bold mb-1">PROFIT FACTOR</span>
                        <span className="text-sm font-bold text-zinc-400">{backtest.profitFactor.toFixed(2)}</span>
                    </div>
                    <div className="flex flex-col items-end">
                        <span className="text-[8px] text-zinc-600 font-bold mb-1">ZELLA SCORE</span>
                        <span className="text-sm font-bold text-zinc-100 flex items-center gap-2">
                           {backtest.zellaScore.toFixed(1)}
                           <span className={`w-1.5 h-1.5 ${backtest.zellaScore > 60 ? 'bg-zinc-300' : 'bg-rose-500/50'}`} />
                        </span>
                    </div>
                </div>
            </div>

            {/* Layout Grid */}
            <div className="flex-1 flex gap-6 min-h-0">
                
                {/* Visualizer Tabs */}
                <div className="w-48 flex flex-col gap-2 shrink-0">
                    {[
                        { id: 'EQUITY', label: 'Equity Matrix', icon: TrendingUp },
                        { id: 'CALENDAR', label: 'Profit Calendar', icon: Calendar },
                        { id: 'TRADES', label: 'Trade Registry', icon: FileText }
                    ].map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id as any)}
                            className={`px-3 py-2 text-[9px] font-bold flex items-center gap-3 transition-colors border ${
                                activeTab === tab.id 
                                ? 'bg-zinc-900 border-zinc-700 text-zinc-100' 
                                : 'bg-[#020202] border-zinc-900 text-zinc-500 hover:text-zinc-300 hover:border-zinc-800'
                            }`}
                        >
                            <tab.icon size={12} />
                            <span>{tab.label}</span>
                        </button>
                    ))}

                    <div className="mt-auto p-4 bg-[#050505] border border-zinc-900 flex flex-col gap-3">
                        <div className="flex items-center gap-2">
                            <Settings size={10} className="text-zinc-500" />
                            <span className="text-[8px] text-zinc-400 font-bold border-b border-zinc-800 pb-1 flex-1">EXEC PROTOCOL</span>
                        </div>
                        <ul className="text-[8px] text-zinc-500 leading-relaxed font-mono space-y-1">
                           <li>• CITADEL_CONS_MODEL</li>
                           <li>• MAX_DD_FLOOR: 25%</li>
                           <li>• FUSION_ORACLE: ON</li>
                        </ul>
                    </div>
                </div>

                {/* Main Viewport */}
                <div className="flex-1 bg-[#020202] border border-zinc-900 relative overflow-hidden flex flex-col">
                    
                    {activeTab === 'EQUITY' && (
                        <div className="w-full h-full p-4 flex flex-col">
                           <div className="flex justify-between items-center mb-4 pb-2 border-b border-zinc-900">
                               <span className="text-[9px] text-zinc-500">SIMULATED EQUITY TRAJECTORY</span>
                               <span className="text-[9px] px-2 py-0.5 bg-zinc-900 text-zinc-400 border border-zinc-800">10K BASE</span>
                           </div>
                           <div className="flex-1 w-full relative">
                               <ResponsiveContainer width="100%" height="100%">
                                   <AreaChart data={chartData}>
                                       <defs>
                                           <linearGradient id="eqGrad" x1="0" y1="0" x2="0" y2="1">
                                               <stop offset="5%" stopColor="#d4d4d8" stopOpacity={0.1}/>
                                               <stop offset="95%" stopColor="#d4d4d8" stopOpacity={0}/>
                                           </linearGradient>
                                       </defs>
                                       <XAxis dataKey="step" hide />
                                       <YAxis hide domain={['auto', 'auto']} />
                                       <Tooltip 
                                            cursor={{ stroke: '#52525b', strokeWidth: 1, strokeDasharray: '4 4' }}
                                            contentStyle={{ backgroundColor: '#000', border: '1px solid #27272a', borderRadius: '0', padding: '8px' }}
                                            itemStyle={{ fontFamily: 'monospace', fontSize: '10px', color: '#e4e4e7' }}
                                            labelStyle={{ display: 'none' }}
                                            formatter={(value: number) => [`$${value.toFixed(2)}`, 'EQUITY']}
                                        />
                                        <ReferenceLine y={10000} stroke="#3f3f46" strokeDasharray="3 3" strokeWidth={1} />
                                        <Area type="monotone" dataKey="equity" stroke="#a1a1aa" strokeWidth={1} fillOpacity={1} fill="url(#eqGrad)" isAnimationActive={false} />
                                   </AreaChart>
                               </ResponsiveContainer>
                           </div>
                        </div>
                    )}

                    {activeTab === 'CALENDAR' && (
                        <div className="w-full h-full p-4 flex flex-col">
                            <span className="text-[9px] text-zinc-500 mb-4 pb-2 border-b border-zinc-900 block">DAILY P/L MATRIX</span>
                            <div className="grid grid-cols-7 gap-1 overflow-y-auto custom-scrollbar content-start">
                                {Array.from({ length: 31 }).map((_, i) => {
                                    const profit = (Math.random() - 0.4) * 400; // Mock data to fill calendar cells
                                    return (
                                        <div key={i} className={`aspect-square border flex flex-col items-center justify-center p-1 relative overflow-hidden ${
                                            profit > 0 ? 'bg-emerald-500/10 border-emerald-500/50 text-emerald-400' : 'bg-[#050505] border-transparent text-rose-500/50'
                                        }`}>
                                            <span className="text-[9px] font-bold">{i + 1}</span>
                                            <span className="text-[8px] mt-1">${Math.abs(profit).toFixed(0)}</span>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    )}

                    {activeTab === 'TRADES' && (
                        <div className="w-full h-full p-4 flex flex-col">
                            <div className="grid grid-cols-12 gap-4 text-[9px] text-zinc-500 font-bold border-b border-zinc-900 pb-2 mb-2 px-2">
                                <div className="col-span-1">DIR</div>
                                <div className="col-span-3">ASSET / ID</div>
                                <div className="col-span-3">CONFIDENCE</div>
                                <div className="col-span-2 text-right">DATE</div>
                                <div className="col-span-3 text-right">NET P/L</div>
                            </div>
                            <div className="flex flex-col gap-1 overflow-y-auto custom-scrollbar">
                                {backtest.trades.slice().reverse().map((trade) => (
                                    <div key={trade.id} className="grid grid-cols-12 gap-4 items-center p-2 border border-transparent hover:border-zinc-800 hover:bg-[#050505] transition-colors group">
                                        <div className="col-span-1">
                                            {trade.pnl > 0 ? <span className="text-emerald-400 px-1 border border-emerald-500/30 bg-emerald-500/10 uppercase text-[8px]">WIN</span> : <span className="text-rose-400 px-1 border border-rose-500/30 bg-rose-500/10 uppercase text-[8px]">LOSS</span>}
                                        </div>
                                        <div className="col-span-3 text-[10px] text-zinc-300 font-bold truncate">
                                            GBP/USD <span className="text-zinc-600 text-[8px] font-normal">{trade.id.substring(0,8)}</span>
                                        </div>
                                        <div className="col-span-3">
                                             <div className="w-full h-[2px] bg-zinc-900 flex">
                                                 <div className="h-full bg-zinc-500" style={{width: `${trade.truthConfidence * 100}%`}} />
                                             </div>
                                        </div>
                                        <div className="col-span-2 text-right text-[8px] text-zinc-600">
                                            {new Date(trade.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                                        </div>
                                        <div className="col-span-3 text-right">
                                            <span className={`text-[10px] font-bold ${trade.pnl > 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                                                {trade.pnl > 0 ? '+' : ''}${Math.abs(trade.pnl).toFixed(2)}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
            
        </div>
    );
}
