'use client';

import React from 'react';
import { 
  Play, Save, Plus, Settings, Star, Eye, Filter, Zap, 
  ChevronUp, Activity, BarChart2, CheckCircle2, XCircle
} from 'lucide-react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Area, ComposedChart
} from 'recharts';

// PnL Chart Mock Data
const pnlData = Array.from({ length: 40 }).map((_, i) => ({
  date: `Month ${i+1}`,
  val: 1000 * Math.exp(i * 0.05) * (1 + (Math.random() * 0.1 - 0.05))
}));

export default function WorldQuantStealthSimulator() {
  return (
    <div className="min-h-screen bg-[#050505] text-white flex flex-col font-sans overflow-hidden h-screen">
      
      {/* Top Protocol Ribbon */}
      <div className="h-14 border-b border-white/5 bg-black/80 flex items-center justify-between px-4 sticky top-0 z-50">
        <div className="flex items-center gap-4">
           {/* Badge Status */}
           <div className="px-2 py-0.5 bg-red-500/10 border border-red-500/30 text-red-500 font-black tracking-widest text-[10px] uppercase rounded flex items-center gap-1 shadow-[0_0_10px_rgba(239,68,68,0.2)]">
               <Zap size={10} /> UNSUB
           </div>
           {/* Alpha Logo Mimic */}
           <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center font-serif italic text-white font-bold text-sm">
             α
           </div>
           <span className="text-[10px] uppercase tracking-widest text-white/30 font-mono">
             Created 04/09/2026 EDT
           </span>
        </div>

        {/* Central Title */}
        <div className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center group">
           <input 
             type="text" 
             className="bg-transparent text-center text-sm font-medium tracking-wide text-white outline-none w-[300px] hover:bg-white/[0.02] transition-colors rounded py-1 px-4 cursor-text"
             defaultValue={"omega_sota_anonymous_v1"} 
           />
           <span className="text-[8px] text-white/20 uppercase tracking-widest font-bold opacity-0 group-hover:opacity-100 transition-opacity">RENAME ALPHA</span>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-4 text-white/50">
           <button className="flex items-center gap-2 text-[10px] uppercase tracking-widest font-bold hover:text-blue-400 transition-colors">
              <Plus size={14} /> Add Alpha to Matrix
           </button>
           <div className="h-4 w-px bg-white/10 mx-2" />
           <button className="hover:text-amber-400 transition-colors"><Star size={16} /></button>
           <button className="hover:text-blue-400 transition-colors"><Eye size={16} /></button>
           <button className="hover:text-white transition-colors"><Settings size={16} /></button>
        </div>
      </div>

      {/* Main Structural Grid */}
      <div className="flex flex-1 w-full relative h-[calc(100vh-56px)] overflow-hidden">
         
         {/* LEFT PANE (Code & Visualizer) - 60% */}
         <div className="w-[60%] flex flex-col border-r border-white/5 bg-[#08080A]">
            
            {/* Syntax Editor Interface */}
            <div className="flex flex-col p-4">
               <h2 className="flex items-center gap-2 text-xs font-bold text-white uppercase tracking-widest mb-4">
                  <span className="text-blue-500 font-mono">{">_"}</span> Code
               </h2>
               
               <div className="w-full bg-[#0F0F13] border border-white/5 rounded-lg overflow-hidden font-mono text-xs flex shadow-[inset_0_0_20px_rgba(0,0,0,0.5)] h-[220px]">
                  {/* Line Numbers */}
                  <div className="bg-[#050505] p-4 text-white/20 border-r border-white/5 text-right select-none flex flex-col gap-1 w-12 shrink-0">
                     {[1,2,3,4,5,6,7,8,9,10,11].map(n => <span key={n}>{n}</span>)}
                  </div>
                  {/* Syntax */}
                  <div className="p-4 flex-1 overflow-auto text-white/80 leading-relaxed font-mono">
                      <span className="text-green-500/50">/*</span><br/>
                      <span className="text-green-500/50"> HYPOTHESIS: If operating yield outperforms sector...</span><br/>
                      <span className="text-green-500/50"> </span><br/>
                      <span className="text-blue-400"> [SOTA UPGRADE ENFORCEMENT PROTOCOL ACTIVE]</span><br/>
                      <span className="text-green-500/50"> Integrating Volume-Price adjustments mapping strictly to competitive threshold.</span><br/>
                      <span className="text-green-500/50">*/</span><br/><br/>
                      
                      <span className="text-orange-300">decay_exp</span>(<br/>
                      &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-orange-300">group_neutralize</span>(<br/>
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-orange-300">ts_rank</span>(<span className="text-sky-300">operating_income</span> <span className="text-white">/</span> <span className="text-orange-300">ts_mean</span>(<span className="text-sky-300">volume</span> <span className="text-white">*</span> <span className="text-sky-300">close</span>, <span className="text-purple-400">252</span>), <span className="text-purple-400">63</span>),<br/>
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-pink-400">subindustry</span><br/>
                      &nbsp;&nbsp;&nbsp;&nbsp;), <span className="text-purple-400">12</span><br/>
                      )
                  </div>
               </div>
            </div>

            {/* Simulation Settings Matrix */}
            <div className="px-4 pb-4 border-b border-white/5 flex flex-col">
               <h3 className="text-[10px] font-bold uppercase tracking-widest text-white/50 mb-2">Simulation Architecture</h3>
               <div className="w-full overflow-x-auto border border-white/5 rounded-lg bg-black/40">
                  <table className="w-full text-left text-[10px]">
                     <thead className="bg-[#15151A] text-white/60 font-mono uppercase">
                        <tr>
                           <th className="p-2 font-medium">Instrument</th>
                           <th className="p-2 font-medium">Region</th>
                           <th className="p-2 font-medium">Universe</th>
                           <th className="p-2 font-medium">Language</th>
                           <th className="p-2 font-medium text-center">Decay</th>
                           <th className="p-2 font-medium text-center">Delay</th>
                           <th className="p-2 font-medium">Neutralization</th>
                           <th className="p-2 font-medium">Pasteurization</th>
                        </tr>
                     </thead>
                     <tbody className="divide-y divide-white/5 text-white">
                        <tr>
                           <td className="p-2 font-bold text-sky-400">Equity</td>
                           <td className="p-2">USA</td>
                           <td className="p-2 font-bold">TOP3000</td>
                           <td className="p-2">Fast Expression</td>
                           <td className="p-2 text-center text-purple-400">0</td>
                           <td className="p-2 text-center text-purple-400">1</td>
                           <td className="p-2 text-pink-400 font-mono">Subindustry</td>
                           <td className="p-2 text-green-400">On</td>
                        </tr>
                     </tbody>
                  </table>
               </div>
               
               {/* Controls */}
               <div className="flex justify-end gap-3 mt-4">
                  <button className="px-6 py-2 bg-white/5 hover:bg-white/10 text-white text-[10px] font-bold uppercase tracking-widest rounded transition-colors border border-white/10">
                    Purge Simulation
                  </button>
                  <button className="px-6 py-2 bg-blue-600/20 hover:bg-blue-600/40 text-blue-400 border border-blue-500/30 text-[10px] font-bold uppercase tracking-widest rounded transition-all shadow-[0_0_15px_rgba(37,99,235,0.2)]">
                    Execute SOTA Variant
                  </button>
               </div>
            </div>

            {/* Chart Module */}
            <div className="flex flex-col flex-1 relative bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.03)_0%,rgba(0,0,0,0)_100%)]">
               <div className="p-4 flex justify-between items-center z-10 relative">
                  <h3 className="flex items-center gap-2 text-xs font-bold text-white uppercase tracking-widest">
                     <BarChart2 className="text-emerald-500" size={14} /> PnL Projection
                  </h3>
                  <select className="bg-black border border-white/10 text-[10px] text-white uppercase px-2 py-1 outline-none rounded">
                     <option>PnL (Relative)</option>
                     <option>Cumulative</option>
                  </select>
               </div>
               
               <div className="absolute inset-0 top-12 bottom-8">
                  <ResponsiveContainer width="100%" height="100%">
                     <ComposedChart data={pnlData}>
                        <defs>
                           <linearGradient id="pnlGlow" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="0%" stopColor="#10b981" stopOpacity="0.4"/>
                              <stop offset="100%" stopColor="#10b981" stopOpacity="0"/>
                           </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                        <XAxis dataKey="date" hide />
                        <YAxis domain={['auto', 'auto']} tick={{fontSize: 9, fill: 'rgba(255,255,255,0.3)'}} axisLine={false} tickLine={false} />
                        <Area type="monotone" dataKey="val" stroke="#10b981" fill="url(#pnlGlow)" strokeWidth={2} />
                     </ComposedChart>
                  </ResponsiveContainer>
               </div>
               
               {/* Chart Timeline Bar */}
               <div className="absolute bottom-4 left-10 right-4 h-4 bg-white/5 rounded overflow-hidden border border-white/10 flex">
                  <div className="h-full bg-blue-500/20 w-1/4" />
                  <div className="h-full bg-emerald-500/40 w-1/2 border-l border-r border-emerald-500/50 shadow-[0_0_10px_rgba(16,185,129,0.3)] relative">
                     <div className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 text-[7px] font-bold text-emerald-100 uppercase tracking-widest">Selected Validation Period</div>
                  </div>
                  <div className="h-full bg-blue-500/20 w-1/4" />
               </div>
            </div>

         </div>

         {/* RIGHT PANE (Metrics & Meta) - 40% */}
         <div className="w-[40%] flex flex-col bg-black overflow-y-auto">
            
            {/* IS Summary Grid */}
            <div className="p-6 border-b border-white/5">
                <div className="flex justify-between items-center mb-6">
                   <h2 className="flex items-center gap-2 text-sm font-bold text-white uppercase tracking-widest">
                      <Activity className="text-blue-500" size={16} /> IS Summary
                   </h2>
                   <div className="flex gap-2">
                       <span className="px-3 py-1 bg-white/5 border border-white/10 text-white/60 text-[9px] uppercase font-bold rounded">Train</span>
                       <span className="px-3 py-1 bg-blue-500/20 border border-blue-500/30 text-blue-400 text-[9px] uppercase font-bold rounded shadow-[0_0_10px_rgba(59,130,246,0.1)]">Test</span>
                   </div>
                </div>

                {/* Top Metrics Row */}
                <div className="flex items-center gap-3 mb-8">
                   <span className="px-3 py-1.5 flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[10px] font-bold uppercase tracking-widest rounded">
                      <CheckCircle2 size={12} /> SOTA Verified
                   </span>
                   <span className="px-3 py-1.5 bg-blue-500/10 border border-blue-500/30 text-blue-400 text-[10px] font-bold uppercase tracking-widest rounded">
                      Multi Data Matrix
                   </span>
                </div>

                <div className="grid grid-cols-4 gap-6 mb-8">
                    <div className="flex flex-col">
                       <span className="text-[10px] uppercase font-bold text-white/40 tracking-widest mb-1 flex items-center gap-1">Sharpe <div className="w-1.5 h-1.5 bg-blue-500 rounded-full" /></span>
                       <span className="text-2xl font-mono text-white tracking-tighter">1.84</span>
                    </div>
                    <div className="flex flex-col">
                       <span className="text-[10px] uppercase font-bold text-white/40 tracking-widest mb-1 flex items-center gap-1">Turnover <div className="w-1.5 h-1.5 bg-blue-500 rounded-full" /></span>
                       <span className="text-2xl font-mono text-white tracking-tighter">12.3%</span>
                    </div>
                    <div className="flex flex-col">
                       <span className="text-[10px] uppercase font-bold text-white/40 tracking-widest mb-1 flex items-center gap-1">Fitness <div className="w-1.5 h-1.5 bg-blue-500 rounded-full" /></span>
                       <span className="text-2xl font-mono text-white tracking-tighter">1.49</span>
                    </div>
                    <div className="flex flex-col">
                       <span className="text-[10px] uppercase font-bold text-white/40 tracking-widest mb-1 flex items-center gap-1">Returns <div className="w-1.5 h-1.5 bg-blue-500 rounded-full" /></span>
                       <span className="text-2xl font-mono text-green-400 tracking-tighter">11.2%</span>
                    </div>
                </div>

                {/* Annual Matrix Table */}
                <div className="w-full border border-white/5 rounded-lg overflow-hidden bg-[#0A0A0E] shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
                    <table className="w-full text-[10px]">
                        <thead className="bg-[#15151A] text-white/50 text-left font-mono">
                           <tr>
                              <th className="py-2 px-3">Year</th>
                              <th className="py-2 px-3">Sharpe</th>
                              <th className="py-2 px-3">Turnover</th>
                              <th className="py-2 px-3">Fitness</th>
                              <th className="py-2 px-3 text-right">Returns</th>
                           </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5 font-mono text-white/90">
                           <tr className="hover:bg-white/[0.02]">
                              <td className="py-2 px-3 text-white/40">2019</td>
                              <td className="py-2 px-3">1.21</td>
                              <td className="py-2 px-3">14.2%</td>
                              <td className="py-2 px-3">0.93</td>
                              <td className="py-2 px-3 text-right text-green-400">4.12%</td>
                           </tr>
                           <tr className="hover:bg-white/[0.02]">
                              <td className="py-2 px-3 text-white/40">2020</td>
                              <td className="py-2 px-3">1.88</td>
                              <td className="py-2 px-3">11.8%</td>
                              <td className="py-2 px-3">1.54</td>
                              <td className="py-2 px-3 text-right text-green-400">18.4%</td>
                           </tr>
                           <tr className="hover:bg-white/[0.02] bg-blue-500/5">
                              <td className="py-2 px-3 text-white/40">2021</td>
                              <td className="py-2 px-3 text-blue-400 font-bold">2.45</td>
                              <td className="py-2 px-3">12.1%</td>
                              <td className="py-2 px-3 text-blue-400 font-bold">2.11</td>
                              <td className="py-2 px-3 text-right text-emerald-400 font-bold">22.8%</td>
                           </tr>
                           <tr className="hover:bg-white/[0.02]">
                              <td className="py-2 px-3 text-white/40">2022</td>
                              <td className="py-2 px-3">1.62</td>
                              <td className="py-2 px-3">10.9%</td>
                              <td className="py-2 px-3">1.34</td>
                              <td className="py-2 px-3 text-right text-green-400">9.31%</td>
                           </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Properties Configurations */}
            <div className="p-6 flex flex-col flex-1">
               <div className="flex justify-between items-center mb-6">
                 <h2 className="flex items-center gap-2 text-sm font-bold text-white uppercase tracking-widest">
                    <Settings className="text-white/40" size={16} /> Properties Layout
                 </h2>
                 <span className="text-[9px] font-mono text-green-500">Auto-saved moments ago</span>
               </div>
               
               <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="flex flex-col gap-1.5">
                     <label className="text-[10px] text-white/40 font-bold uppercase tracking-widest">Alpha Name</label>
                     <input type="text" defaultValue="OS_OperatingYield_252d_SOTA" className="bg-black border border-white/10 rounded px-3 py-2 text-xs text-white font-mono outline-none focus:border-blue-500/50" />
                  </div>
                  <div className="flex flex-col gap-1.5">
                     <label className="text-[10px] text-white/40 font-bold uppercase tracking-widest">Risk Category</label>
                     <select className="bg-black border border-white/10 rounded px-3 py-2 text-xs text-white outline-none focus:border-blue-500/50" defaultValue="Fundamental">
                        <option value="None">None</option>
                        <option value="Fundamental">Fundamental</option>
                        <option value="Price Momentum">Price Momentum</option>
                        <option value="Price Reversion">Price Reversion</option>
                     </select>
                  </div>
               </div>

               <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="flex flex-col gap-1.5">
                     <label className="text-[10px] text-white/40 font-bold uppercase tracking-widest">System Tags</label>
                     <input type="text" defaultValue="Value, Momentum, Market-Neutral" className="bg-black border border-white/10 rounded px-3 py-2 text-xs text-white font-mono outline-none focus:border-blue-500/50" />
                  </div>
                  <div className="flex flex-col gap-1.5">
                     <label className="text-[10px] text-white/40 font-bold uppercase tracking-widest">Classification Heatmap</label>
                     <div className="flex h-[30px] rounded overflow-hidden border border-white/10">
                         <div className="flex-1 bg-red-500/80 cursor-pointer hover:opacity-80" />
                         <div className="flex-1 bg-amber-500/80 cursor-pointer hover:opacity-80" />
                         <div className="flex-1 bg-yellow-400/80 cursor-pointer hover:opacity-80" />
                         <div className="flex-1 bg-emerald-500/80 cursor-pointer hover:opacity-80 border-2 border-white" />
                         <div className="flex-1 bg-blue-500/80 cursor-pointer hover:opacity-80" />
                         <div className="flex-1 bg-purple-500/80 cursor-pointer border-l hover:opacity-80" />
                     </div>
                  </div>
               </div>

               <div className="flex flex-col gap-1.5 flex-1 mt-2">
                  <label className="text-[10px] text-white/40 font-bold uppercase tracking-widest">Strategic Descriptor</label>
                  <textarea 
                    className="bg-[#050505] border border-white/10 rounded px-3 py-2 text-xs text-white/60 font-mono outline-none focus:border-blue-500/50 flex-1 resize-none h-[120px]"
                    defaultValue={"HYPOTHESIS: Operating income growth is naturally biased upward over time due to inflation. By dividing core fundamental income by a 252-day moving average of stock liquidity (volume * close), we create an 'Operating Yield' indicator that identifies companies outperforming their structural market valuation.\n\nIMPLEMENTATION: \ndecay_exp(group_neutralize(ts_rank(operating_income / ts_mean(volume*close, 252), 63), subindustry), 12)\n\nThis maps directly to SOTA Rank 1 vectors by applying subindustry neutralization and 12-day exponential smoothing to the newly created yield divergence."} 
                  />
               </div>
            </div>

         </div>
      </div>
    </div>
  );
}
