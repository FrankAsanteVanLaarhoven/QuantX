'use client';

import React, { useState } from 'react';
import { Network, DatabaseZap, ShieldAlert } from 'lucide-react';

export default function OrthogonalizationFoundry() {
    const [isConnecting, setIsConnecting] = useState(false);
    const [bingData, setBingData] = useState<any>(null);
    const [activeBeta, setActiveBeta] = useState<'neutralize' | 'group_rank'>('neutralize');

    const handleFetchBing = async () => {
        setIsConnecting(true);
        try {
            const res = await fetch('http://localhost:8000/api/sync/bing');
            const data = await res.json();
            setBingData(data);
        } catch (e) {
            console.error("Bing Scraper intercepted", e);
        }
        setIsConnecting(false);
    };

    return (
        <div className="bg-[#0A0A0E] border border-white/5 rounded-xl overflow-hidden h-full flex flex-col">
            <div className="p-6 border-b border-white/5">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-white tracking-wide" style={{ fontFamily: 'Outfit, sans-serif' }}>
                        Orthogonalization Foundry
                    </h3>
                    <div className="flex gap-2">
                        <button 
                            onClick={() => setActiveBeta('neutralize')}
                            className={`px-3 py-1 text-[10px] font-bold uppercase tracking-widest rounded ${activeBeta === 'neutralize' ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30' : 'bg-transparent text-white/40 hover:bg-white/5'}`}
                        >
                            Beta Neutralizer
                        </button>
                        <button 
                            onClick={() => setActiveBeta('group_rank')}
                            className={`px-3 py-1 text-[10px] font-bold uppercase tracking-widest rounded ${activeBeta === 'group_rank' ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' : 'bg-transparent text-white/40 hover:bg-white/5'}`}
                        >
                            Subindustry Rank
                        </button>
                    </div>
                </div>
                <p className="text-white/50 text-sm leading-relaxed mb-4">
                    Force signals through an intensive <code className="text-purple-400">neutralize(alpha, subindustry)</code> pipeline. Connect to the Stealth Crawler to inject Bing News semantic momentum directly into the orthogonalized array.
                </p>
                <button 
                    onClick={handleFetchBing}
                    disabled={isConnecting}
                    className="w-full py-2.5 bg-black border border-white/10 hover:border-purple-500/50 rounded flex justify-center items-center gap-2 text-xs font-bold text-white tracking-widest uppercase transition-all"
                >
                    {isConnecting ? <DatabaseZap className="animate-bounce text-purple-400" size={16} /> : <Network className="text-purple-500" size={16} />}
                    {isConnecting ? 'Bypassing Edge TLS...' : 'Fetch Bing Intelligence'}
                </button>
            </div>

            <div className="p-6 flex-1 bg-black/20 flex flex-col justify-center">
                {!bingData ? (
                    <div className="text-center py-8 opacity-50 flex flex-col items-center">
                        <ShieldAlert size={32} className="text-white/20 mb-3" />
                        <p className="text-white/40 text-sm font-mono uppercase tracking-widest">Awaiting Live Sentiment Feed</p>
                    </div>
                ) : (
                    <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
                        <div className="flex justify-between items-center bg-green-500/10 border border-green-500/20 p-3 rounded">
                            <span className="text-green-500 text-xs font-bold uppercase tracking-widest">TLS Status</span>
                            <span className="text-white font-mono text-sm">{bingData.crawler_status || 'Active'}</span>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-white/5 p-4 border border-white/10 rounded">
                                <span className="block text-[10px] text-white/40 uppercase tracking-widest mb-1">Live Buzz (scl12)</span>
                                <span className={`text-2xl font-black ${bingData.scl12_buzz_live > 0 ? 'text-green-500' : bingData.scl12_buzz_live < 0 ? 'text-red-500' : 'text-gray-400'}`}>
                                    {bingData.scl12_buzz_live > 0 ? '+' : ''}{bingData.scl12_buzz_live}
                                </span>
                            </div>
                            <div className="bg-purple-900/10 p-4 border border-purple-500/30 rounded">
                                <span className="block text-[10px] text-purple-400 uppercase tracking-widest mb-1 font-bold">Alpha Signal Fired</span>
                                <span className="text-white font-mono text-sm">
                                    {bingData.synthesized_alpha_trigger ? 'EXECUTE' : 'HOLD'}
                                </span>
                            </div>
                        </div>

                        <div className="bg-black p-3 border border-white/10 rounded max-h-32 overflow-y-auto">
                            <span className="block text-[10px] text-white/40 uppercase tracking-widest mb-2 sticky top-0 bg-black">Scraped Headlines</span>
                            <ul className="space-y-2">
                                {bingData.top_headlines?.map((hl: string, i: number) => (
                                    <li key={i} className="text-white/70 text-xs flex gap-2">
                                        <span className="text-purple-500 font-bold opacity-50">&gt;</span>
                                        {hl}
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
