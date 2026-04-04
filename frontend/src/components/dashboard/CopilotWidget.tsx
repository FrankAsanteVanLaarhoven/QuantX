'use client';

import React, { useState } from 'react';

export default function CopilotWidget() {
    const [prompt, setPrompt] = useState("");
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<{code: string; explanation: string} | null>(null);

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
                <div className="w-32 h-32 bg-red-500 rounded-full" />
            </div>
            
            <div className="flex items-center gap-2 mb-4 border-b border-white/5 pb-2">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FF143C" strokeWidth="1.5">
                    <polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5 12 2" />
                    <circle cx="12" cy="12" r="3" />
                </svg>
                <h2 className="text-sm font-semibold tracking-widest uppercase" style={{fontFamily: 'Outfit, sans-serif'}}>Gemini Co-Pilot</h2>
            </div>

            <div className="flex-1 overflow-y-auto pr-2 mb-4 space-y-4">
                {result ? (
                    <div className="bg-white/5 border border-white/10 p-3 rounded-lg flex flex-col gap-2">
                        <div className="flex items-center gap-2 text-red-500 text-xs font-bold uppercase tracking-widest">
                            <span>SOTA Engine Result</span>
                        </div>
                        <code className="text-white bg-black/50 p-2 rounded text-xs break-all border border-white/5 font-mono">
                            {result.code}
                        </code>
                        <p className="text-white/60 text-xs leading-relaxed">
                            {result.explanation}
                        </p>
                    </div>
                ) : (
                    <div className="h-full flex items-center justify-center text-white/30 text-xs italic tracking-widest uppercase text-center px-4">
                        Awaiting natural language parameters...
                    </div>
                )}
            </div>

            <form onSubmit={handleGenerate} className="flex flex-col gap-2 relative z-10 w-full mt-auto">
                <div className="flex bg-[#0A0A0E] border border-white/10 rounded overflow-hidden shadow-lg focus-within:border-red-500/50 transition-colors w-full">
                    <input 
                        type="text" 
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        placeholder="e.g., Mean reversion on SPY over 5 days..."
                        className="flex-1 bg-transparent px-3 py-2 text-sm outline-none w-full"
                        disabled={loading}
                    />
                    <button 
                        type="submit" 
                        disabled={loading || !prompt.trim()}
                        className="bg-red-500/10 hover:bg-red-500/20 text-red-500 px-4 text-xs font-bold uppercase tracking-wider transition-colors disabled:opacity-50 whitespace-nowrap"
                    >
                        {loading ? 'Synthesizing...' : 'Generate'}
                    </button>
                </div>
            </form>
        </div>
    );
}
