'use client';

import React, { useState } from 'react';
import { Network, Zap, LayoutList, CheckCircle2 } from 'lucide-react';

export default function RlAllocator() {
    const [isAllocating, setIsAllocating] = useState(false);
    const [allocationData, setAllocationData] = useState<any>(null);
    const [assets, setAssets] = useState('NVDA, AAPL, MSFT, TSLA, META');
    const [riskTolerance, setRiskTolerance] = useState<'aggressive' | 'moderate' | 'conservative'>('moderate');

    const handleAllocate = async () => {
        setIsAllocating(true);
        const parsedAssets = assets.split(',').map(a => a.trim()).filter(a => a.length > 0);
        try {
            const res = await fetch('http://localhost:8000/api/portfolio/allocate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    assets: parsedAssets,
                    capital: 10000000.0,
                    risk_tolerance: riskTolerance
                })
            });
            const data = await res.json();
            setAllocationData(data);
        } catch (e) {
            console.error("RL Node failed", e);
        }
        setIsAllocating(false);
    };

    return (
        <div className="bg-[#0A0A0E] border border-white/5 rounded-xl overflow-hidden relative">
            <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                        <Network className="text-orange-500" size={24} />
                        <h3 className="text-xl font-bold text-white tracking-wide" style={{ fontFamily: 'Outfit, sans-serif' }}>
                            RL Hyper-Allocator
                        </h3>
                    </div>
                    <div className="px-3 py-1 bg-orange-500/10 text-orange-400 text-[10px] font-bold tracking-widest uppercase rounded border border-orange-500/20 flex items-center gap-2">
                        <LayoutList size={14} /> Stage IV
                    </div>
                </div>

                <p className="text-white/50 text-sm mb-6 leading-relaxed">
                    Shatter equal-weight constraints. Deploy deep reinforcement learning to dynamically map risk parity against asset volatility, extracting the absolute mathematical maximum Sharpe ratio across the universe arrays.
                </p>

                <div className="space-y-4 mb-6">
                    <div>
                        <label className="text-[10px] text-white/40 uppercase tracking-widest font-bold mb-2 block">Alpha Vector Array (Tickers)</label>
                        <input 
                            type="text" 
                            value={assets}
                            onChange={(e) => setAssets(e.target.value.toUpperCase())}
                            className="w-full bg-black border border-white/10 rounded px-4 py-2 text-white font-mono text-sm focus:outline-none focus:border-orange-500/50 uppercase tracking-wider"
                        />
                    </div>
                    
                    <div className="flex gap-2">
                        {(['conservative', 'moderate', 'aggressive'] as const).map(risk => (
                            <button
                                key={risk}
                                onClick={() => setRiskTolerance(risk)}
                                className={`flex-1 py-1.5 text-[10px] uppercase tracking-widest font-bold border rounded transition-all ${
                                    riskTolerance === risk 
                                    ? 'bg-orange-500/20 border-orange-500/40 text-orange-400' 
                                    : 'bg-black border-white/10 text-white/40 hover:bg-white/5'
                                }`}
                            >
                                {risk}
                            </button>
                        ))}
                    </div>
                </div>

                <button 
                    onClick={handleAllocate}
                    disabled={isAllocating}
                    className="w-full bg-gradient-to-r from-orange-900/40 to-black hover:from-orange-800/50 border border-orange-500/30 text-white px-6 py-3 rounded text-sm font-bold uppercase tracking-widest flex items-center justify-center gap-3 transition-colors disabled:opacity-50"
                >
                    {isAllocating ? <Zap className="animate-spin text-orange-500" size={18} /> : <Zap className="text-orange-500" size={18} />}
                    {isAllocating ? 'Mapping Neural Grid...' : 'Execute Hyper-Allocation'}
                </button>

                {allocationData && allocationData.allocations && (
                    <div className="mt-6 animate-in fade-in slide-in-from-top-2">
                        <div className="flex items-center justify-between p-3 bg-black border border-white/10 rounded mb-4">
                            <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Global Sharpe Achieved</span>
                            <span className="text-xl font-black text-green-500 flex items-center gap-2">
                                <CheckCircle2 size={16} /> {allocationData.global_sharpe}
                            </span>
                        </div>
                        
                        <div className="space-y-3">
                            {allocationData.allocations.map((alloc: any, i: number) => (
                                <div key={i} className="bg-white/5 border border-white/5 p-3 rounded">
                                    <div className="flex justify-between items-center mb-2">
                                        <div className="flex items-center gap-2">
                                            <span className="text-orange-400 font-black font-mono text-lg">{alloc.asset}</span>
                                            <span className="px-2 py-0.5 bg-black rounded text-[10px] font-mono text-white/60">
                                                ${(alloc.allocated_capital / 1000000).toFixed(2)}M
                                            </span>
                                        </div>
                                        <span className="text-white font-bold">{Math.round(alloc.weight_pct * 100)}%</span>
                                    </div>
                                    <div className="h-1.5 w-full bg-black rounded-full overflow-hidden mb-2">
                                        <div 
                                            className="h-full bg-orange-500 transition-all duration-1000" 
                                            style={{ width: `${alloc.weight_pct * 100}%` }}
                                        />
                                    </div>
                                    <p className="text-[10px] text-white/40 leading-relaxed">{alloc.logic}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
                
                {allocationData?.error && (
                    <div className="mt-4 p-3 bg-red-950/20 border border-red-500/20 text-red-400 text-xs text-center rounded">
                        {allocationData.error}
                    </div>
                )}
            </div>
        </div>
    );
}
