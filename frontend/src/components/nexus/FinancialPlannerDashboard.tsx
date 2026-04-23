"use client";

import React, { useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';

export const FinancialPlannerDashboard = () => {
    const baselineAUM = 5000000; // $5M Mock
    
    // Generate Monte Carlo simulation data (Geometric Brownian Motion approx)
    const simulationData = useMemo(() => {
        const data = [];
        let path1 = baselineAUM;
        let path2 = baselineAUM;
        let path3 = baselineAUM;
        
        for (let i = 2026; i <= 2056; i += 2) {
            data.push({
                year: i,
                ExpectedPath: Math.round(path1),
                BullCase: Math.round(path2),
                BearCase: Math.round(path3)
            });
            
            // Compound with random variance
            path1 = path1 * (1.08 + (Math.random() * 0.04 - 0.02)); // ~8% expected
            path2 = path2 * (1.14 + (Math.random() * 0.06 - 0.03)); // ~14% bull
            path3 = path3 * (1.04 + (Math.random() * 0.08 - 0.06)); // ~4% bear
        }
        return data;
    }, []);

    const formatCurrency = (val: number) => `$${(val / 1000000).toFixed(1)}M`;

    return (
        <div className="w-full h-full bg-[#000000] p-6 flex gap-6 overflow-hidden border border-zinc-800 rounded-xl shadow-2xl font-mono text-zinc-300">
            
            {/* Left Column: Asset Allocation & Strategy */}
            <div className="w-[340px] flex flex-col gap-4 shrink-0">
                <div className="bg-[#050505] p-5 border border-zinc-800 relative">
                   <div className="absolute top-0 left-0 w-full h-[2px] bg-zinc-500" />
                   <h3 className="text-[10px] font-bold text-zinc-400 tracking-[0.2em] mb-3">
                      [ CURRENT AUM ]
                   </h3>
                   <span className="text-3xl font-sans tracking-tight text-zinc-100 font-semibold block mb-2">
                     $5,000,000
                   </span>
                   <p className="text-[9px] text-zinc-400 tracking-widest border-t border-zinc-800 pt-2">+12.4% YTD // TAX_OPTIMIZED</p>
                </div>

                <div className="bg-[#050505] p-5 border border-zinc-800 flex-1 flex flex-col">
                    <h3 className="text-[10px] font-bold text-zinc-400 tracking-[0.2em] mb-5 border-b border-zinc-800 pb-3">TARGET ASSET ALLOCATION</h3>
                    
                    <div className="space-y-6 flex-1">
                       <div className="flex flex-col gap-2">
                          <div className="flex justify-between items-end text-[10px]">
                             <span className="text-zinc-200 uppercase tracking-wide font-sans">Equities (Vanguard / Growth)</span>
                             <span className="text-zinc-300">60%</span>
                          </div>
                          <div className="w-full h-[1px] bg-zinc-900 relative">
                              <div className="absolute top-0 left-0 h-full bg-zinc-400" style={{width: '60%'}} />
                          </div>
                       </div>

                       <div className="flex flex-col gap-2">
                          <div className="flex justify-between items-end text-[10px]">
                             <span className="text-zinc-200 uppercase tracking-wide font-sans">Algorithmic Trading (Swarm)</span>
                             <span className="text-zinc-300">25%</span>
                          </div>
                          <div className="w-full h-[1px] bg-zinc-900 relative">
                              <div className="absolute top-0 left-0 h-full bg-zinc-500" style={{width: '25%'}} />
                          </div>
                       </div>

                       <div className="flex flex-col gap-2">
                          <div className="flex justify-between items-end text-[10px]">
                             <span className="text-zinc-200 uppercase tracking-wide font-sans">Fixed Income / Cash</span>
                             <span className="text-zinc-300">15%</span>
                          </div>
                          <div className="w-full h-[1px] bg-zinc-900 relative">
                              <div className="absolute top-0 left-0 h-full bg-zinc-700" style={{width: '15%'}} />
                          </div>
                       </div>
                    </div>
                </div>

                {/* Tax Loss Harvesting Meta */}
                <div className="bg-[#050505] p-4 border border-zinc-800">
                   <h3 className="text-[10px] font-bold text-zinc-400 tracking-[0.2em] mb-2">[ TAX-LOSS HARVESTED: FY26 ]</h3>
                   <span className="text-xl font-sans text-zinc-300 block mb-2">+$14,250.00</span>
                   <p className="text-[8px] text-zinc-500 tracking-widest leading-relaxed">Aggregated via execution drops and Vanguard rebalancing sweeps.</p>
                </div>
            </div>

            {/* Right Column: Monte Carlo Engine */}
            <div className="flex-1 flex flex-col bg-[#020202] border border-zinc-800 p-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-6 pointer-events-none z-10 flex gap-4">
                    <span className="text-zinc-500 text-[9px] tracking-[0.2em]">[ ALGORITHMIC_MONTE_CARLO ]</span>
                    <span className="text-zinc-500 text-[9px] tracking-[0.2em]">HORIZON: 30 YR</span>
                </div>

                <div className="mb-10 z-10">
                   <h2 className="text-lg font-sans font-bold text-zinc-100 tracking-[0.15em] mb-2">MULTI-GENERATIONAL TRAJECTORY</h2>
                   <p className="text-[9px] text-zinc-500 tracking-widest">Simulating 1,000 geometric paths based on current allocations.</p>
                </div>

                <div className="flex-1 w-full min-h-[300px] z-10">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={simulationData} margin={{ top: 20, right: 30, left: 10, bottom: 5 }}>
                            <XAxis dataKey="year" stroke="#3f3f46" tick={{fill: '#71717a', fontSize: 9, fontFamily: 'monospace'}} tickLine={false} axisLine={false} />
                            <YAxis stroke="#3f3f46" tick={{fill: '#71717a', fontSize: 9, fontFamily: 'monospace'}} tickFormatter={formatCurrency} tickLine={false} axisLine={false} />
                            
                            {/* Extremely stark, single color tooltip */}
                            <Tooltip 
                                cursor={{ stroke: '#3f3f46', strokeWidth: 1, strokeDasharray: '4 4' }}
                                contentStyle={{ backgroundColor: '#000', border: '1px solid #27272a', borderRadius: '0', padding: '12px' }}
                                itemStyle={{ fontFamily: 'monospace', fontSize: '10px', color: '#a1a1aa' }}
                                labelStyle={{ color: '#fff', fontWeight: 'bold', marginBottom: '8px', fontFamily: 'monospace', fontSize: '10px' }}
                                formatter={(val: number, name: string) => [`$${val.toLocaleString()}`, name.toUpperCase()]}
                            />
                            
                            <ReferenceLine y={baselineAUM} stroke="#3f3f46" strokeDasharray="2 2" strokeWidth={1} />
                            
                            {/* 1px Thin Lines, muted institutional Palette */}
                            <Line type="monotone" dataKey="BullCase" stroke="#10b981" strokeWidth={1} dot={false} strokeOpacity={0.8} isAnimationActive={false} />
                            <Line type="monotone" dataKey="ExpectedPath" stroke="#0ea5e9" strokeWidth={1.5} dot={false} isAnimationActive={false} />
                            <Line type="monotone" dataKey="BearCase" stroke="#f59e0b" strokeWidth={1} dot={false} strokeOpacity={0.8} isAnimationActive={false} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>
            
            {/* Mesh overlay */}
            <div className="absolute inset-0 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/black-scales.png')] opacity-[0.03] z-0" />
        </div>
    );
};
