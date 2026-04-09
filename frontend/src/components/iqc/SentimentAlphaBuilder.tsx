'use client';

import React, { useState } from 'react';

export default function SentimentAlphaBuilder() {
    const [selectedAlpha, setSelectedAlpha] = useState<'news' | 'social'>('news');

    return (
        <div className="bg-[#0A0A0E] border border-white/5 rounded-xl overflow-hidden h-full flex flex-col">
            <div className="p-6 border-b border-white/5">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-white tracking-wide" style={{ fontFamily: 'Outfit, sans-serif' }}>
                        Sentiment Target Builder
                    </h3>
                    <div className="flex items-center gap-2">
                        <span className="relative flex h-3 w-3">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span>
                        </span>
                        <span className="text-blue-500 text-[10px] font-bold tracking-widest uppercase">
                            Anet Engine Active
                        </span>
                    </div>
                </div>

                <p className="text-white/50 text-sm leading-relaxed mb-6">
                    Harness non-traditional data sets to capture structural dislocations. Utilize SOTA exponential backfilling to smooth sparse events.
                </p>

                <div className="flex gap-2">
                    <button 
                        onClick={() => setSelectedAlpha('news')}
                        className={`flex-1 py-2 text-xs font-bold uppercase tracking-wider rounded border transition-colors ${
                            selectedAlpha === 'news'
                            ? 'bg-blue-500/10 border-blue-500/30 text-blue-400'
                            : 'bg-transparent border-white/10 text-white/40 hover:bg-white/5'
                        }`}
                    >
                        News Overreaction
                    </button>
                    <button 
                        onClick={() => setSelectedAlpha('social')}
                        className={`flex-1 py-2 text-xs font-bold uppercase tracking-wider rounded border transition-colors ${
                            selectedAlpha === 'social'
                            ? 'bg-purple-500/10 border-purple-500/30 text-purple-400'
                            : 'bg-transparent border-white/10 text-white/40 hover:bg-white/5'
                        }`}
                    >
                        Social Sentiment
                    </button>
                </div>
            </div>

            <div className="p-6 flex-1 bg-black/20">
                {selectedAlpha === 'news' ? (
                    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
                        <div>
                            <h4 className="text-blue-400 text-xs font-bold uppercase tracking-widest mb-2">Hypothesis</h4>
                            <p className="text-white/60 text-sm leading-relaxed">
                                If prices increase by more than 10% quickly after a news catalyst, it often indicates retail overreaction. Shorting the subsequent mean-reversion presents a massive advantage.
                            </p>
                        </div>
                        
                        <div>
                            <h4 className="text-blue-400 text-xs font-bold uppercase tracking-widest mb-2">SOTA Implementation</h4>
                            <p className="text-white/60 text-sm leading-relaxed mb-3">
                                We utilize <code className="text-white/80 bg-white/5 px-1 rounded">news_max_up_ret</code> scaled by <code className="text-white/80 bg-white/5 px-1 rounded">news_mins_10_pct_up</code>. 
                                Critically, because news is sparse, we inject <code className="text-blue-300 bg-blue-900/30 px-1 rounded">ts_backfill</code> up to 20 days to ensure statistical coverage across the sub-universe.
                            </p>
                            <div className="bg-black/60 border border-blue-500/20 p-4 rounded-lg">
                                <code className="block text-white font-mono text-sm break-all">
                                    <span className="text-blue-400">-ts_backfill</span>(news_max_up_ret, 20) / 
                                    <br />
                                    (<span className="text-blue-400">ts_backfill</span>(news_mins_10_pct_up, 20) + 1)
                                </code>
                            </div>
                        </div>

                        <div className="flex gap-4">
                             {/* Simulation Settings Badges */}
                             <div className="px-3 py-2 bg-white/5 rounded border border-white/10 flex-1">
                                <span className="block text-[10px] text-white/40 uppercase tracking-widest mb-1">Delay</span>
                                <span className="text-white font-mono text-sm">1</span>
                             </div>
                             <div className="px-3 py-2 bg-white/5 rounded border border-white/10 flex-1">
                                <span className="block text-[10px] text-white/40 uppercase tracking-widest mb-1">Decay</span>
                                <span className="text-white font-mono text-sm">0</span>
                             </div>
                             <div className="px-3 py-2 bg-white/5 rounded border border-white/10 flex-1">
                                <span className="block text-[10px] text-white/40 uppercase tracking-widest mb-1">Truncation</span>
                                <span className="text-white font-mono text-sm">0.01</span>
                             </div>
                        </div>
                    </div>
                ) : (
                    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
                        <div>
                            <h4 className="text-purple-400 text-xs font-bold uppercase tracking-widest mb-2">Hypothesis</h4>
                            <p className="text-white/60 text-sm leading-relaxed">
                                "Too much news is not good news." Stocks with poor performance tend to be discussed intensely on social media. High relative sentiment volume signals impending structural decay.
                            </p>
                        </div>
                        
                        <div>
                            <h4 className="text-purple-400 text-xs font-bold uppercase tracking-widest mb-2">SOTA Implementation</h4>
                            <p className="text-white/60 text-sm leading-relaxed mb-3">
                                Assign negative weights when <code className="text-white/80 bg-white/5 px-1 rounded">scl12_buzz</code> spikes. 
                                We apply a dual approach: <code className="text-purple-300 bg-purple-900/30 px-1 rounded">ts_backfill</code> across 5 days to close temporal gaps, then wrap the matrix in <code className="text-purple-300 bg-purple-900/30 px-1 rounded">zscore</code> for standard deviation normalization.
                            </p>
                            <div className="bg-black/60 border border-purple-500/20 p-4 rounded-lg">
                                <code className="block text-white font-mono text-sm break-all">
                                    -<span className="text-purple-400">zscore</span>(
                                    <span className="text-purple-400">ts_backfill</span>(scl12_buzz, 5)
                                    ) * (1+<span className="text-purple-400">rank</span>(cap))
                                </code>
                            </div>
                        </div>
                        
                        <div className="p-3 bg-purple-500/10 border border-purple-500/30 rounded-lg">
                            <span className="block text-[10px] text-purple-400 uppercase tracking-widest mb-1 font-bold">Liquid Stock Injector</span>
                            <p className="text-white/70 text-xs leading-relaxed">
                                SOTA execution requires factoring in scale. Multiply this matrix by liquidity datafield <code className="text-white font-mono bg-white/10 px-1 rounded">cap</code> to effortlessly pass the Sub-universe Sharpe verification barrier.
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
