"use client";

import React, { useState } from 'react';

// Hardcoded explicit list containing Vanguard, Indian Renewables, AI Tech, and Trefis momentum breakouts.
const ALPHA_TICKERS = [
  { ticker: 'VOO', name: 'Vanguard S&P 500 ETF', type: 'ETF / Index', spot: 479.23, target: 512.40, prob: 94.2, sentiment: 'BULLISH', category: 'Macro' },
  { ticker: 'SPY', name: 'SPDR S&P 500 ETF', type: 'ETF / Index', spot: 510.15, target: 545.00, prob: 92.1, sentiment: 'BULLISH', category: 'Macro' },
  { ticker: 'QQQ', name: 'Invesco QQQ Trust', type: 'ETF / Index', spot: 445.62, target: 480.00, prob: 78.5, sentiment: 'STABLE', category: 'Macro' },
  { ticker: 'PLTR', name: 'Palantir Technologies', type: 'Gov-Tech / AI', spot: 24.18, target: 31.50, prob: 88.4, sentiment: 'BULLISH', category: 'AI & Tech' },
  { ticker: 'MSFT', name: 'Microsoft Corp', type: 'Big Tech', spot: 412.33, target: 450.00, prob: 95.1, sentiment: 'BULLISH', category: 'AI & Tech' },
  { ticker: 'GOOGL', name: 'Alphabet Inc', type: 'Big Tech', spot: 145.22, target: 160.00, prob: 74.2, sentiment: 'STABLE', category: 'AI & Tech' },
  { ticker: 'CRWD', name: 'CrowdStrike', type: 'Cybersecurity', spot: 320.10, target: 380.00, prob: 85.5, sentiment: 'BULLISH', category: 'Defense & Cyber' },
  { ticker: 'LMT', name: 'Lockheed Martin', type: 'Defense', spot: 450.15, target: 440.00, prob: 41.2, sentiment: 'BEARISH / HOLD', category: 'Defense & Cyber' },
  { ticker: 'ASTS', name: 'AST SpaceMobile', type: 'Frontier Space', spot: 4.88, target: 12.50, prob: 66.8, sentiment: 'SPECULATIVE', category: 'Frontier' },
  { ticker: 'RKLB', name: 'Rocket Lab USA', type: 'Frontier Space', spot: 4.25, target: 8.00, prob: 72.1, sentiment: 'BULLISH', category: 'Frontier' },
  { ticker: 'AVAV', name: 'AeroVironment', type: 'Frontier Defense', spot: 155.60, target: 180.00, prob: 81.3, sentiment: 'BULLISH', category: 'Frontier' },
  { ticker: 'ADANIENS', name: 'Adani Energy Solutions', type: 'Indian Renewables', spot: 1045.20, target: 1400.00, prob: 89.9, sentiment: 'BULLISH', category: 'Energy & Renewables' },
  { ticker: 'SUZLON', name: 'Suzlon Energy', type: 'Indian Renewables', spot: 41.25, target: 65.00, prob: 91.4, sentiment: 'BULLISH', category: 'Energy & Renewables' },
  { ticker: 'SNDK', name: 'SanDisk (Trefis Target)', type: 'Semiconductors', spot: 88.40, target: 120.00, prob: 96.5, sentiment: 'MOMENTUM', category: 'Momentum Breakout' },
  { ticker: 'AAOI', name: 'Applied Optoelectronics', type: 'Fiber Optics', spot: 14.50, target: 22.00, prob: 84.2, sentiment: 'MOMENTUM', category: 'Momentum Breakout' },
];

export const AlphaTickerMatrix = () => {
    const [filter, setFilter] = useState('ALL');

    const categories = ['ALL', ...Array.from(new Set(ALPHA_TICKERS.map(t => t.category)))];
    
    const displayed = filter === 'ALL' 
        ? ALPHA_TICKERS 
        : ALPHA_TICKERS.filter(t => t.category === filter);

    const getSentimentColor = (sentiment: string) => {
        if (sentiment.includes('BULL') || sentiment === 'MOMENTUM') return 'text-emerald-500 font-medium';
        if (sentiment.includes('BEAR')) return 'text-rose-500 font-medium';
        return 'text-zinc-400';
    };

    return (
        <div className="w-full h-full bg-[#030303] flex flex-col font-mono text-zinc-300 border border-zinc-800 rounded-xl shadow-2xl relative overflow-hidden uppercase tracking-widest">
            
            {/* Header Area */}
            <div className="p-6 border-b border-zinc-800 bg-[#050505] flex flex-col md:flex-row justify-between items-start md:items-end gap-6 shrink-0 z-10">
                <div>
                   <h1 className="text-sm font-bold text-zinc-100 mb-1 tracking-[0.3em]">
                       Institutional Target Matrix
                   </h1>
                   <p className="text-[9px] text-zinc-500">
                      RL-Allocated Watchlist // Swarm Consensus Probabilities
                   </p>
                </div>

                <div className="flex flex-wrap gap-2">
                    {categories.map(c => (
                        <button 
                           key={c}
                           onClick={() => setFilter(c)}
                           className={'px-3 py-1 text-[9px] font-bold transition-all border ' + (filter === c ? 'bg-zinc-800 text-white border-zinc-600' : 'bg-transparent text-zinc-600 border-zinc-800 hover:text-zinc-400 hover:border-zinc-700')}
                        >
                            {c}
                        </button>
                    ))}
                </div>
            </div>

            {/* Table Header */}
            <div className="grid grid-cols-12 gap-4 px-6 py-3 border-b border-zinc-800 bg-[#020202] text-[9px] font-bold text-zinc-600 shrink-0">
                <div className="col-span-1">Ticker</div>
                <div className="col-span-3">Security / Entity</div>
                <div className="col-span-2">Classification</div>
                <div className="col-span-1">Spot</div>
                <div className="col-span-1">Target</div>
                <div className="col-span-2">Exec. Probability</div>
                <div className="col-span-2 text-right">Consensus</div>
            </div>

            {/* Table Body */}
            <div className="flex-1 overflow-y-auto custom-scrollbar p-2 bg-[#000000]">
                <div className="flex flex-col gap-1">
                    {displayed.map((item, i) => (
                        <div key={i} className="grid grid-cols-12 gap-4 px-4 py-3 border border-transparent hover:border-zinc-800 hover:bg-[#050505] transition-colors items-center text-[10px]">
                            
                            {/* Ticker */}
                            <div className="col-span-1 flex items-center">
                                <span className="font-bold text-white tracking-widest">{item.ticker}</span>
                            </div>

                            {/* Name */}
                            <div className="col-span-3 text-zinc-400 font-sans tracking-normal opacity-90 truncate pr-4">
                                {item.name}
                            </div>

                            {/* Classification */}
                            <div className="col-span-2">
                                <span className="text-zinc-600 border border-zinc-900 bg-zinc-950 px-2 py-0.5">{item.type}</span>
                            </div>

                            {/* Spot */}
                            <div className="col-span-1 text-zinc-300 font-mono tracking-tighter">
                                ${item.spot.toFixed(2)}
                            </div>

                            {/* Target */}
                            <div className="col-span-1">
                                <span className={item.target > item.spot ? 'text-emerald-500 font-medium tracking-tighter' : 'text-rose-500 font-medium tracking-tighter'}>
                                   ${item.target.toFixed(2)} {item.target > item.spot ? '▲' : '▼'}
                                </span>
                            </div>

                            {/* Logic Bar */}
                            <div className="col-span-2 flex items-center gap-3 pr-4">
                                <div className="flex-1 h-[2px] bg-zinc-900 overflow-hidden relative">
                                    <div 
                                      className={'absolute top-0 left-0 h-full ' + (item.prob > 80 ? 'bg-emerald-500' : item.prob > 60 ? 'bg-emerald-500/50' : 'bg-rose-500/50')} 
                                      style={{ width: item.prob + '%' }}
                                    />
                                </div>
                                <span className="text-[9px] text-white font-mono w-8 text-right shrink-0">{item.prob.toFixed(1)}%</span>
                            </div>

                            {/* Sentiment */}
                            <div className="col-span-2 flex justify-end">
                                <span className={`text-[9px] font-bold border border-zinc-800 px-2 py-1 tracking-widest ${getSentimentColor(item.sentiment)}`}>
                                    [ {item.sentiment} ]
                                </span>
                            </div>

                        </div>
                    ))}
                    
                    {displayed.length === 0 && (
                        <div className="p-8 text-center text-zinc-600 text-[10px] tracking-widest">
                            [ NO TARGETS CORRESPONDING TO CRITERIA ]
                        </div>
                    )}
                </div>
            </div>

            {/* Minimal Footer */}
            <div className="p-2 border-t border-zinc-800 bg-[#050505] text-[9px] text-zinc-600 tracking-widest flex justify-between px-6 shrink-0 z-10">
                <span>ORACLE IQ TARGETING LOGIC ENABLED</span>
                <span>DATA LAG: 14MS</span>
            </div>
            
            {/* Extremely subtle background scanline mesh overlay */}
            <div className="absolute inset-0 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/black-scales.png')] opacity-[0.03] z-0" />
        </div>
    );
};
