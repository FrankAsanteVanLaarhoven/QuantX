'use client';

import React, { useState } from 'react';

export default function ConcentrationManager() {
    const [enabled, setEnabled] = useState(true);

    return (
        <div className="bg-[#0A0A0E] border border-white/5 rounded-xl overflow-hidden relative">
            <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-white tracking-wide" style={{ fontFamily: 'Outfit, sans-serif' }}>
                        Concentration Overrider
                    </h3>
                    <label className="relative inline-flex items-center cursor-pointer">
                        <input 
                            type="checkbox" 
                            className="sr-only peer" 
                            checked={enabled}
                            onChange={(e) => setEnabled(e.target.checked)}
                        />
                        <div className="w-11 h-6 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
                    </label>
                </div>

                <p className="text-white/50 text-sm mb-6 leading-relaxed">
                    Managing low concentration limits and constrained capital requires synthetically expanding target coverage without breaking rank dynamics. We deploy SOTA backfill chaining to achieve this.
                </p>

                <div className={`transition-all duration-500 overflow-hidden ${enabled ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                    <div className="space-y-4">
                        {/* Group Backfill Example */}
                        <div className="bg-black/50 border border-white/5 p-4 rounded-lg">
                            <div className="flex items-center gap-2 mb-2 text-xs font-bold uppercase tracking-widest text-green-500">
                                <span>1. Liquidity Expansion Mapping</span>
                            </div>
                            <code className="block w-full text-white/80 font-mono text-xs p-2 bg-white/5 rounded border border-white/10 break-all mb-2">
                                group_backfill(ts_backfill(base_alpha, 5), subindustry)
                            </code>
                            <p className="text-white/40 text-[11px] leading-relaxed">
                                Fills sparse operator gaps across time (5 days), then recursively fills across subinduistry constraints. Maximizes execution footprint for scarce signals.
                            </p>
                        </div>

                        {/* Rank Stabilization Example */}
                        <div className="bg-black/50 border border-white/5 p-4 rounded-lg">
                            <div className="flex items-center gap-2 mb-2 text-xs font-bold uppercase tracking-widest text-green-500">
                                <span>2. Weight Concentration Normalization</span>
                            </div>
                            <code className="block w-full text-white/80 font-mono text-xs p-2 bg-white/5 rounded border border-white/10 break-all mb-2">
                                rank(group_backfill(ts_backfill(base_alpha, 5), subindustry))
                            </code>
                            <p className="text-white/40 text-[11px] leading-relaxed">
                                Wraps the expanded matrix in a cross-sectional `rank()`. This mathematically flattens extreme outlier assignments, protecting low-capital accounts from catastrophic over-leverage on a single node.
                            </p>
                        </div>
                    </div>
                </div>
                
                {!enabled && (
                    <div className="p-4 bg-white/5 rounded-lg border border-white/10 text-center">
                        <span className="text-white/40 text-xs uppercase tracking-widest font-bold">Override offline. High portfolio concentration risk active.</span>
                    </div>
                )}
            </div>
        </div>
    );
}
