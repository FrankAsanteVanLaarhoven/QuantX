"use client";

import React, { useState, useEffect } from 'react';
import { AreaChart, Area, Line, XAxis, YAxis, ResponsiveContainer, ComposedChart } from 'recharts';

export const MarketIntelligenceDashboard = () => {
  const [cmdp, setCmdp] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
      const fetchCMDP = async () => {
          try {
              const res = await fetch('http://localhost:8000/api/cognitive/analyze/NVDA');
              const data = await res.json();
              if (data && data.recommendation) {
                  setCmdp(data);
              }
          } catch(e) {
              // Ignore failure, fallback offline UI
          } finally {
              setLoading(false);
          }
      };
      fetchCMDP();
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-[#030303] text-zinc-300 font-mono p-4 md:p-6 lg:p-8 uppercase tracking-widest selection:bg-zinc-800 relative z-10 w-full h-full">
      
      {/* Header */}
      <header className="mb-6 pb-4 border-b border-zinc-900 flex justify-between items-end">
        <div>
           <h1 className="text-xl font-bold text-zinc-100 tracking-[0.3em]">Market Intelligence</h1>
           <p className="text-[9px] text-zinc-500 mt-2">SEC EDGAR INTEGRATION // GLOBAL OSINT MATRIX</p>
        </div>
        
        {/* Navigation Tabs */}
        <div className="flex gap-4">
           <button className="pb-1 border-b-2 border-zinc-300 text-zinc-100 text-[10px] font-bold">OVERVIEW</button>
           <button className="pb-1 border-b-2 border-transparent text-zinc-600 hover:text-zinc-400 transition text-[10px] font-bold">LATEST NEWS</button>
           <button className="pb-1 border-b-2 border-transparent text-zinc-600 hover:text-zinc-400 transition text-[10px] font-bold">ECON CALENDAR</button>
           <button className="pb-1 border-b-2 border-transparent text-zinc-500 flex items-center gap-2 text-[10px] font-bold">
              EDGAR <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
           </button>
        </div>
      </header>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* CMDP COGNITIVE ENGINE REPLACES LATEST NEWS */}
          <div className="col-span-1 lg:col-span-2 flex flex-col gap-4">
             <div className="flex items-center gap-2 mb-2">
                 <div className="w-1.5 h-1.5 bg-rose-500 animate-pulse shadow-[0_0_8px_rgba(244,63,94,0.5)]" />
                 <h2 className="text-[10px] font-bold text-rose-500/80">GEMINI AUTONOMOUS CMDP ENGINE</h2>
             </div>
             
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 {/* Hero CMDP Graph Block */}
                 <div className="col-span-1 md:col-span-2 relative h-72 border border-zinc-800 bg-[#050505] p-2 flex flex-col group">
                     {/* Strict Overlay */}
                     <span className="absolute top-4 left-4 text-[8px] bg-zinc-100 text-black px-2 py-1 font-bold z-20">KALMAN TRAJECTORY</span>
                     
                     <div className="flex-1 w-full relative z-10 pt-10 px-2 overflow-hidden">
                        {loading && <div className="absolute inset-0 flex items-center justify-center text-[10px] text-zinc-500 animate-pulse">SYNTHESIZING...</div>}
                        {!loading && cmdp && cmdp.scrutiny_graph && (
                            <ResponsiveContainer width="100%" height="100%">
                                <ComposedChart data={cmdp.scrutiny_graph}>
                                    <XAxis dataKey="date" hide />
                                    <YAxis domain={['auto', 'auto']} hide />
                                    <Area type="monotone" dataKey="barrier_upper" stroke="none" fill="#18181b" isAnimationActive={false} />
                                    <Area type="monotone" dataKey="barrier_lower" stroke="none" fill="#000" isAnimationActive={false} />
                                    <Line type="stepBefore" dataKey="raw_price" stroke="#52525b" dot={false} strokeWidth={1} isAnimationActive={false} />
                                    <Line type="monotone" dataKey="kalman" stroke="#e4e4e7" dot={false} strokeWidth={2} isAnimationActive={false} />
                                </ComposedChart>
                            </ResponsiveContainer>
                        )}
                        {!loading && !cmdp && (
                           <div className="absolute inset-0 flex items-center justify-center border border-zinc-900 border-l-2 border-l-rose-500 bg-[#000]/80">
                               <div className="p-4">
                                   <h3 className="text-sm font-bold text-rose-500 mb-2">SYSTEM OFFLINE</h3>
                                   <p className="text-[10px] text-zinc-500">Autonomous cognitive engine disconnected.</p>
                               </div>
                           </div>
                        )}
                     </div>
                 </div>

                 {/* Secondary CMDP Block 1 */}
                 <div className="relative h-40 border border-zinc-800 bg-[#020202] p-4 flex flex-col justify-between transition-colors">
                     <span className="text-[8px] text-zinc-600 border border-zinc-800 self-start px-2 py-0.5">SHORT TERM</span>
                     <div className="overflow-hidden">
                         <h3 className="text-[11px] font-bold text-zinc-300 mb-2">1-3 DAY SENTINEL</h3>
                         <p className="text-[8px] text-zinc-500 leading-relaxed overflow-hidden text-ellipsis line-clamp-4">
                            {cmdp ? cmdp.short_term_outlook : "AWAITING INFERENCE..."}
                         </p>
                     </div>
                 </div>

                 {/* Secondary CMDP Block 2 */}
                 <div className="relative h-40 border border-zinc-800 bg-[#020202] p-4 flex flex-col justify-between transition-colors">
                     <div className="flex justify-between items-start">
                        <span className="text-[8px] text-zinc-600 border border-zinc-800 px-2 py-0.5">ACTION MATRIX</span>
                        {cmdp && (
                           <span className={`text-[9px] font-bold px-2 py-0.5 border border-zinc-800 ${cmdp.recommendation === 'BUY' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/50' : 'bg-rose-500/10 text-rose-400 border-rose-500/50'}`}>
                              {cmdp.recommendation} // {cmdp.confidence}%
                           </span>
                        )}
                     </div>
                     <div className="overflow-hidden mt-2">
                         <h3 className="text-[11px] font-bold text-zinc-300 mb-2">COGNITIVE RISK VECTOR</h3>
                         <ul className="text-[8px] text-zinc-500 space-y-1 ml-3 list-square line-clamp-3">
                            {cmdp ? cmdp.cognitive_risk_7d?.map((risk: string, i: number) => <li key={i}>{risk}</li>) : <li>AWAITING DATA</li>}
                         </ul>
                     </div>
                 </div>
             </div>
          </div>

          {/* ECONOMIC CALENDAR BLOCK */}
          <div className="col-span-1 flex flex-col gap-4">
              <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center gap-2">
                     <div className="w-1.5 h-1.5 bg-zinc-600" />
                     <h2 className="text-[10px] font-bold text-zinc-400">ECONOMIC CALENDAR</h2>
                  </div>
                  <span className="text-[8px] border border-zinc-800 px-2 py-0.5 text-zinc-600">DATA: DOW_JONES</span>
              </div>

              <div className="bg-[#050505] border border-zinc-800 flex flex-col flex-1 pb-4">
                 
                 {/* Calendar Date Tabs */}
                 <div className="flex border-b border-zinc-900 bg-[#020202]">
                    <button className="flex-1 py-2 text-[9px] text-zinc-600 hover:text-zinc-400 transition">YESTERDAY</button>
                    <button className="flex-1 py-2 text-[9px] text-zinc-600 hover:text-zinc-400 transition">TODAY</button>
                    <button className="flex-1 py-2 text-[9px] text-zinc-200 border-b border-zinc-400 bg-zinc-900/50">THIS WEEK</button>
                 </div>

                 {/* Calendar Headers */}
                 <div className="grid grid-cols-12 text-[8px] font-bold text-zinc-600 p-3 border-b border-zinc-900 bg-[#050505]">
                    <div className="col-span-2">TIME</div>
                    <div className="col-span-5">EVENT</div>
                    <div className="col-span-1 text-center">ACT</div>
                    <div className="col-span-2 text-center">EST</div>
                    <div className="col-span-2 text-right">PAIR</div>
                 </div>

                 {/* Events List */}
                 <div className="flex-1 overflow-y-auto max-h-[460px] custom-scrollbar px-2 pt-2">
                     {/* Event 1 */}
                     <div className="grid grid-cols-12 items-center text-[9px] p-2 border border-transparent hover:border-zinc-800 hover:bg-[#020202] transition-colors mb-1">
                         <div className="col-span-2 text-zinc-500">00:00</div>
                         <div className="col-span-5 text-zinc-400 truncate pr-2">AU FLASH PMI</div>
                         <div className="col-span-1 text-center text-zinc-600">-</div>
                         <div className="col-span-2 text-center text-zinc-600">-</div>
                         <div className="col-span-2 text-right text-zinc-500 font-bold">AUD/USD</div>
                     </div>

                     {/* Event 2 */}
                     <div className="grid grid-cols-12 items-center text-[9px] p-2 border border-transparent hover:border-zinc-800 hover:bg-[#020202] transition-colors mb-1">
                         <div className="col-span-2 text-zinc-500">01:00</div>
                         <div className="col-span-5 text-zinc-400 truncate pr-2">BOE GOV REMARKS</div>
                         <div className="col-span-1 text-center text-zinc-600">-</div>
                         <div className="col-span-2 text-center text-zinc-600">-</div>
                         <div className="col-span-2 text-right text-zinc-500 font-bold">GBP/USD</div>
                     </div>

                     {/* Event 3 - High Impact */}
                     <div className="grid grid-cols-12 items-center text-[9px] p-2 border-l border-l-emerald-500 border-zinc-800 bg-emerald-500/5 mb-1">
                         <div className="col-span-2 text-zinc-300 flex items-center gap-1">
                             <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full shadow-[0_0_8px_rgba(16,185,129,0.5)]" /> 06:00
                         </div>
                         <div className="col-span-5 text-zinc-200 font-bold truncate pr-2">CORE CPI YY%</div>
                         <div className="col-span-1 text-center text-emerald-400 font-bold">0.8%</div>
                         <div className="col-span-2 text-center text-zinc-500">0.8%</div>
                         <div className="col-span-2 text-right text-emerald-400 font-bold">USD/SGD</div>
                     </div>

                     {/* Event 4 */}
                     <div className="grid grid-cols-12 items-center text-[9px] p-2 border border-transparent hover:border-zinc-800 hover:bg-[#020202] transition-colors">
                         <div className="col-span-2 text-zinc-500">14:00</div>
                         <div className="col-span-5 text-zinc-400 truncate pr-2">FED RATE DECISION</div>
                         <div className="col-span-1 text-center text-zinc-600">-</div>
                         <div className="col-span-2 text-center text-zinc-500">5.25%</div>
                         <div className="col-span-2 text-right text-zinc-500 font-bold">USD/MAJ</div>
                     </div>
                 </div>
              </div>
          </div>
      </div>

      {/* FINVIZ STYLE SECTOR HEATMAP */}
      <div className="mt-8 border-t border-zinc-900 pt-6">
           <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                 <div className="w-1.5 h-1.5 bg-zinc-500" />
                 <h2 className="text-[10px] font-bold text-zinc-400">MARKET VISUALIZATIONS (RADAR)</h2>
              </div>
              <div className="flex gap-2">
                 <span className="bg-[#089981] text-[9px] px-2 py-0.5 text-white font-bold">S&P 500</span>
                 <span className="border border-zinc-800 text-[9px] px-2 py-0.5 text-zinc-500">NASDAQ</span>
              </div>
           </div>
           
           <div className="bg-[#020202] border border-zinc-800 p-1 font-sans">
              {/* FINVIZ TREEMAP GRID REPRESENTATION */}
              <div className="h-[300px] grid grid-cols-12 grid-rows-6 gap-1 w-full text-[10px] text-center overflow-hidden">
                   
                   {/* TECHNOLOGY SECTOR */}
                   <div className="col-span-6 row-span-6 bg-emerald-600 flex flex-col p-2 relative hover:brightness-110 cursor-pointer border border-emerald-500/20">
                       <span className="absolute top-2 left-2 text-[8px] uppercase tracking-widest text-white/60 font-mono">Technology</span>
                       <div className="flex-1 flex flex-col justify-center items-center">
                           <span className="text-xl font-bold text-white">MSFT</span>
                           <span className="text-sm text-white/80 font-mono">+1.61%</span>
                       </div>
                   </div>

                   {/* SEMICONDUCTORS */}
                   <div className="col-span-3 row-span-4 bg-emerald-500 flex flex-col p-2 relative hover:brightness-110 cursor-pointer border border-emerald-400/20">
                      <div className="flex-1 flex flex-col justify-center items-center">
                           <span className="text-lg font-bold text-white">NVDA</span>
                           <span className="text-xs text-white/90 font-mono">+3.96%</span>
                       </div>
                   </div>

                   {/* CONSUMER CYCLICAL */}
                   <div className="col-span-3 row-span-3 bg-emerald-500 flex flex-col p-2 relative hover:brightness-110 cursor-pointer border border-emerald-400/20">
                       <span className="absolute top-1 left-1 text-[8px] uppercase tracking-widest text-white/60 font-mono">Cons. Cycl.</span>
                       <div className="flex-1 flex flex-col justify-center items-center text-white">
                           <span className="text-lg font-bold">AMZN</span>
                           <span className="text-xs font-mono text-white/90">+4.14%</span>
                       </div>
                   </div>

                   {/* FINANCIALS */}
                   <div className="col-span-2 row-span-2 bg-emerald-500 text-white flex flex-col p-2 relative hover:brightness-110 cursor-pointer border border-emerald-400/20 font-sans">
                       <span className="absolute top-1 left-1 text-[8px] uppercase tracking-widest font-mono font-bold text-white/60">Financials</span>
                       <div className="flex-1 flex flex-col justify-center items-center">
                           <span className="font-bold">JPM</span>
                           <span className="text-[10px] font-mono">+3.40%</span>
                       </div>
                   </div>

                   {/* HEALTHCARE */}
                   <div className="col-span-1 row-span-2 bg-rose-500 text-white flex flex-col p-1 relative hover:brightness-110 cursor-pointer border border-rose-500/40">
                       <div className="flex-1 flex flex-col justify-center items-center">
                           <span className="font-bold text-[10px]">LLY</span>
                           <span className="text-[8px] font-mono text-white/90">-1.4%</span>
                       </div>
                   </div>

                   {/* DEFENSE / CYBER (Swarm Specializations) */}
                   <div className="col-span-3 row-span-3 bg-[#18181b] text-white flex flex-col p-1 relative border border-zinc-800">
                       <span className="absolute top-1 left-1 text-[8px] uppercase tracking-widest font-mono text-zinc-500 z-10">Defense/Cyber</span>
                       <div className="grid grid-cols-2 grid-rows-2 h-full w-full gap-1 pt-4">
                           <div className="bg-emerald-500 hover:brightness-110 cursor-pointer flex flex-col justify-center items-center font-sans tracking-normal border border-emerald-500/20">
                               <span className="font-bold text-[10px] text-white">PLTR</span>
                               <span className="text-[9px] font-mono text-white/90">+8.2%</span>
                           </div>
                           <div className="bg-emerald-500 hover:brightness-110 cursor-pointer flex flex-col justify-center items-center font-sans tracking-normal border border-emerald-500/20">
                               <span className="font-bold text-[10px] text-white">CRWD</span>
                               <span className="text-[9px] font-mono text-white/90">+4.1%</span>
                           </div>
                           <div className="bg-rose-500 hover:brightness-110 cursor-pointer flex flex-col justify-center items-center border border-rose-500/40 text-white">
                               <span className="font-bold text-[10px]">LMT</span>
                               <span className="text-[9px] font-mono text-white/90">-1.1%</span>
                           </div>
                           <div className="bg-emerald-500 hover:brightness-110 cursor-pointer flex flex-col justify-center items-center font-sans tracking-normal border border-emerald-500/20 text-white">
                               <span className="font-bold text-[10px]">RKLB</span>
                               <span className="text-[9px] font-mono text-white/90">+14.2%</span>
                           </div>
                       </div>
                   </div>
               </div>
           </div>
      </div>
    </div>
  );
};
