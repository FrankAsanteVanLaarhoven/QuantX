'use client';

import React, { useState } from 'react';
import { Activity, RefreshCcw, Lock, Unlock, PlayCircle } from 'lucide-react';

export default function HyperTuner() {
    const [delay, setDelay] = useState(1);
    const [decay, setDecay] = useState(0);
    const [truncation, setTruncation] = useState(0.01);
    
    const [isLocked, setIsLocked] = useState(false);
    const [isSweeping, setIsSweeping] = useState(false);
    const [progress, setProgress] = useState(0);
    const [apiData, setApiData] = useState<any>(null);

    const handleSweep = async () => {
        if (isLocked) return;
        setIsSweeping(true);
        setProgress(0);
        
        // Simulate progress bar
        const interval = setInterval(() => {
            setProgress(prev => {
                if (prev >= 90) return prev;
                return prev + 10;
            });
        }, 150);

        try {
            const res = await fetch('http://localhost:8000/api/sync/yfinance');
            const data = await res.json();
            setApiData(data);
        } catch (e) {
            console.error("Stealth tunnel failed", e);
        }

        clearInterval(interval);
        setProgress(100);
        
        setTimeout(() => {
            setIsSweeping(false);
        }, 500);
    };

    return (
        <div className="bg-[#0A0A0E] border border-white/5 rounded-xl overflow-hidden relative col-span-1 lg:col-span-2">
            <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                        <Activity className="text-red-500" size={24} />
                        <h3 className="text-xl font-bold text-white tracking-wide" style={{ fontFamily: 'Outfit, sans-serif' }}>
                            SOTA Neural Parameter Sweep
                        </h3>
                    </div>
                    <button 
                        onClick={() => setIsLocked(!isLocked)}
                        className={`px-4 py-2 text-xs font-bold uppercase tracking-widest rounded transition-all flex items-center gap-2 ${
                            isLocked ? 'bg-red-500/20 text-red-400 border border-red-500/30' : 'bg-white/5 text-gray-400 border border-white/10 hover:bg-white/10'
                        }`}
                    >
                        {isLocked ? <><Lock size={14} /> Matrix Locked</> : <><Unlock size={14} /> Matrix Unlocked</>}
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                    {/* Delay Slider */}
                    <div className="space-y-3">
                        <div className="flex justify-between text-sm">
                            <span className="text-white/50 uppercase font-bold tracking-widest text-[10px]">Delay</span>
                            <span className="text-red-400 font-mono">{delay}</span>
                        </div>
                        <input 
                            type="range" min="0" max="5" step="1"
                            value={delay} onChange={(e) => setDelay(parseInt(e.target.value))}
                            disabled={isLocked}
                            className="w-full accent-red-500 cursor-pointer disabled:opacity-50"
                        />
                    </div>
                    
                    {/* Decay Slider */}
                    <div className="space-y-3">
                        <div className="flex justify-between text-sm">
                            <span className="text-white/50 uppercase font-bold tracking-widest text-[10px]">Decay</span>
                            <span className="text-red-400 font-mono">{decay}</span>
                        </div>
                        <input 
                            type="range" min="0" max="30" step="5"
                            value={decay} onChange={(e) => setDecay(parseInt(e.target.value))}
                            disabled={isLocked}
                            className="w-full accent-red-500 cursor-pointer disabled:opacity-50"
                        />
                    </div>

                    {/* Truncation Slider */}
                    <div className="space-y-3">
                        <div className="flex justify-between text-sm">
                            <span className="text-white/50 uppercase font-bold tracking-widest text-[10px]">Truncation</span>
                            <span className="text-red-400 font-mono">{truncation.toFixed(2)}</span>
                        </div>
                        <input 
                            type="range" min="0.01" max="0.10" step="0.01"
                            value={truncation} onChange={(e) => setTruncation(parseFloat(e.target.value))}
                            disabled={isLocked}
                            className="w-full accent-red-500 cursor-pointer disabled:opacity-50"
                        />
                    </div>
                </div>

                {/* Sweep Action Button */}
                <button 
                    onClick={handleSweep}
                    disabled={isLocked || isSweeping}
                    className="w-full py-4 bg-gradient-to-r from-red-900/40 to-black border border-red-500/20 hover:border-red-500/50 rounded-xl flex items-center justify-center gap-3 transition-all disabled:opacity-50 group font-bold tracking-widest uppercase text-sm"
                >
                    {isSweeping ? (
                        <RefreshCcw className="animate-spin text-red-500" size={20} />
                    ) : (
                        <PlayCircle className="text-red-500 group-hover:scale-110 transition-transform" size={20} />
                    )}
                    <span className="text-white">{isSweeping ? 'Tunneling Live Data...' : 'Execute Hyper-Sweep'}</span>
                </button>

                {/* Progress Bar / Data Response */}
                {isSweeping && (
                    <div className="mt-4 h-1 w-full bg-white/5 rounded overflow-hidden">
                        <div className="h-full bg-red-500 transition-all duration-150" style={{ width: `${progress}%` }}></div>
                    </div>
                )}
                
                {apiData && !isSweeping && (
                    <div className="mt-6 p-4 bg-black/40 border border-green-500/20 rounded-lg animate-in fade-in">
                        <h4 className="text-green-400 text-xs font-bold uppercase tracking-widest mb-3 flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                            Live Stealth Tunnel Connected
                        </h4>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {Object.entries(apiData).slice(0, 4).map(([ticker, metrics]: any) => (
                                <div key={ticker} className="p-3 bg-white/5 rounded border border-white/10">
                                    <div className="text-white font-bold mb-1">{ticker}</div>
                                    <div className="text-white/50 text-xs font-mono">Spot: ${metrics.close?.toFixed(2)}</div>
                                    <div className="text-green-400/80 text-[10px] uppercase mt-1 break-all">Cap: {(metrics.simulated_cap / 1e9).toFixed(2)}B</div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
