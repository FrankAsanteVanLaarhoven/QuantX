'use client';

import React, { useState } from 'react';

export default function OverfittingGuard() {
    const [period, setPeriod] = useState<'1Y' | '2Y' | '5Y'>('1Y');

    return (
        <div className="bg-[#0A0A0E] border border-white/5 rounded-xl overflow-hidden relative">
            <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-white tracking-wide" style={{ fontFamily: 'Outfit, sans-serif' }}>
                        Overfitting Guard
                    </h3>
                    <div className="px-2 py-1 bg-green-500/10 text-green-500 text-[10px] font-bold tracking-widest uppercase rounded">
                        OOS Enforced
                    </div>
                </div>

                <p className="text-white/50 text-sm mb-6 leading-relaxed">
                    Default 5-year testing periods inherently lead to historical curve-fitting against macro cycles. 
                    Enforce strict 1-to-2 year sliding evaluation windows to prove Out-of-Sample resilience.
                </p>

                <div className="grid grid-cols-3 gap-3 mb-6">
                    {(['1Y', '2Y', '5Y'] as const).map((p) => (
                        <button
                            key={p}
                            onClick={() => setPeriod(p)}
                            className={`py-3 rounded-lg border text-sm font-bold transition-all ${
                                period === p 
                                    ? p === '5Y' 
                                        ? 'bg-red-500/10 border-red-500/50 text-red-500' // Warning state for 5Y
                                        : 'bg-green-500/10 border-green-500/50 text-green-500 hover:bg-green-500/20' // Safe state
                                    : 'bg-white/5 border-white/10 text-white/40 hover:bg-white/10 hover:text-white/80'
                            }`}
                        >
                            {p === '5Y' ? '5 Year (Risk)' : `${p} Rolling`}
                        </button>
                    ))}
                </div>

                <div className={`p-4 rounded-lg border flex gap-3 ${period === '5Y' ? 'bg-red-950/30 border-red-900/50' : 'bg-black/40 border-white/10'}`}>
                    {period === '5Y' ? (
                        <>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2" className="mt-0.5 shrink-0">
                                <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
                                <line x1="12" y1="9" x2="12" y2="13"/>
                                <line x1="12" y1="17" x2="12.01" y2="17"/>
                            </svg>
                            <div className="text-sm text-red-200/80 leading-relaxed">
                                <strong className="text-red-400 block mb-1">Overfitting Warning Triggered</strong>
                                The BRAIN engine penalizes models optimized for 5-year macro regimes. High risk of poor live-market turnover mapping.
                            </div>
                        </>
                    ) : (
                        <>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2" className="mt-0.5 shrink-0">
                                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                                <polyline points="22 4 12 14.01 9 11.01"/>
                            </svg>
                            <div className="text-sm text-green-200/70 leading-relaxed">
                                <strong className="text-green-400 block mb-1">Optimum SOTA Alignment</strong>
                                Constraining evaluation to 12-24 month vectors forces the Alpha to extract pure structural edge rather than broad market beta.
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
