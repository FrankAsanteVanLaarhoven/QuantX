'use client';

import React, { useState } from 'react';

export default function CopilotWidget() {
    const [prompt, setPrompt] = useState("");
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<any>(null);

    const handleGenerate = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!prompt.trim()) return;
        setLoading(true);
        setResult(null);

        try {
            const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
            const res = await fetch(`${apiUrl}/api/copilot/generate`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ prompt })
            });
            const data = await res.json();
            setResult(data);
        } catch (err) {
            setResult({ code: "Exception", explanation: "Network engine failure." });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full h-full flex flex-col bg-[#050508] text-white p-4 overflow-hidden relative">
            <div className="absolute top-0 right-0 p-4 opacity-10 blur-xl pointer-events-none">
                <div className="w-32 h-32 bg-green-500 rounded-full" />
            </div>
            
            <div className="flex items-center justify-between mb-4 border-b border-white/5 pb-2 relative z-10">
                <div className="flex items-center gap-2">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="1.5">
                        <polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5 12 2" />
                        <circle cx="12" cy="12" r="3" />
                    </svg>
                    <h2 className="text-sm font-semibold tracking-widest uppercase" style={{fontFamily: 'Outfit, sans-serif'}}>SOTA Alpha Lab</h2>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto pr-2 mb-4 space-y-4 relative z-10 w-full">
                {result ? (
                    <div className="flex flex-col gap-4">
                        {result.isComparison ? (
                            <>
                                {/* Baseline Alpha Card */}
                                <div className="bg-white/5 border border-white/10 p-3 rounded-lg flex flex-col gap-2">
                                    <div className="flex items-center justify-between">
                                        <span className="text-white/40 text-xs font-bold uppercase tracking-widest">Baseline Logic</span>
                                        {result.baseSharpe && (
                                            <span className="text-white/70 text-xs px-2 py-0.5 bg-black/50 rounded font-mono">
                                                Sharpe: {result.baseSharpe.toFixed(2)}
                                            </span>
                                        )}
                                    </div>
                                    <code className="text-white/70 bg-black/50 p-2 rounded text-xs break-all border border-white/5 font-mono">
                                        {result.baseCode}
                                    </code>
                                </div>
                                
                                {/* SOTA Upgrade Arrow */}
                                <div className="flex justify-center -my-1">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-green-500">
                                        <polyline points="6 9 12 15 18 9" />
                                    </svg>
                                </div>

                                {/* SOTA Alpha Card */}
                                <div className="bg-green-500/10 border border-green-500/30 p-3 rounded-lg flex flex-col gap-2 shadow-[0_0_15px_rgba(34,197,94,0.1)]">
                                    <div className="flex items-center justify-between">
                                        <span className="text-green-500 text-xs font-bold uppercase tracking-widest">SOTA Exponential</span>
                                        {result.sotaSharpe && (
                                            <span className="text-green-400 text-xs px-2 py-0.5 bg-green-900/50 rounded font-mono font-bold animate-pulse">
                                                Sharpe: {result.sotaSharpe.toFixed(2)}
                                            </span>
                                        )}
                                    </div>
                                    <code className="text-white bg-black/60 p-2 rounded text-xs break-all border border-green-500/20 font-mono">
                                        {result.sotaCode}
                                    </code>
                                </div>
                            </>
                        ) : (
                            <div className="bg-white/5 border border-white/10 p-3 rounded-lg flex flex-col gap-2">
                                <div className="flex items-center gap-2 text-green-500 text-xs font-bold uppercase tracking-widest">
                                    <span>Engine Result</span>
                                </div>
                                <code className="text-white bg-black/50 p-2 rounded text-xs break-all border border-white/5 font-mono">
                                    {result.code}
                                </code>
                            </div>
                        )}
                        <p className="text-white/60 text-xs leading-relaxed max-w-full overflow-hidden text-ellipsis">
                            {result.explanation}
                        </p>
                    </div>
                ) : (
                    <div className="h-full flex items-center justify-center text-white/30 text-xs italic tracking-widest uppercase text-center px-4">
                        Awaiting prompt... Try "Mean reversion on SPY" to see exponential enhancements.
                    </div>
                )}
            </div>

            <form onSubmit={handleGenerate} className="flex flex-col gap-2 relative z-10 w-full mt-auto">
                <div className="flex bg-[#0A0A0E] border border-white/10 rounded overflow-hidden shadow-lg focus-within:border-green-500/50 transition-colors w-full">
                    <input 
                        type="text" 
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        placeholder="e.g. Generate an alpha for tech operating yield..."
                        className="flex-1 bg-transparent px-3 py-2 text-sm outline-none w-full min-w-0"
                        disabled={loading}
                    />
                    <button 
                        type="submit" 
                        disabled={loading || !prompt.trim()}
                        className="bg-green-500/10 hover:bg-green-500/20 text-green-500 px-4 text-xs font-bold uppercase tracking-wider transition-colors disabled:opacity-50 whitespace-nowrap"
                    >
                        {loading ? 'Synthesizing...' : 'SOTA Upgrade'}
                    </button>
                </div>
            </form>
        </div>
    );
}
