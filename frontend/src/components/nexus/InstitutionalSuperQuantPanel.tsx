"use client";

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { BrainCircuit, Cpu, Database, Network, Server, Webhook } from 'lucide-react';

export function InstitutionalSuperQuantPanel() {
    return (
        <div className="w-full h-full bg-[#03060c] font-sans text-white p-6 relative overflow-hidden flex flex-col md:flex-row gap-6 shadow-[inset_0_0_100px_rgba(8,145,178,0.05)] border border-emerald-800/20 rounded-3xl group">
            
            {/* Grid Line Deep Background */}
            <div className="absolute inset-0 opacity-[0.05] pointer-events-none" 
                 style={{ backgroundImage: 'linear-gradient(to right, #10b981 1px, transparent 1px), linear-gradient(to bottom, #10b981 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
            
            {/* Ambient Corner Glows */}
            <div className="absolute -top-32 -left-32 w-96 h-96 bg-emerald-600/10 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-rose-600/10 rounded-full blur-[100px] pointer-events-none" />

            {/* Left Panel: Core Innovation */}
            <div className="flex-1 max-w-[280px] flex flex-col gap-6 relative z-10">
                <div className="relative p-6 border-l-[3px] border-t-[3px] border-emerald-500/40 rounded-tl-xl bg-gradient-to-br from-emerald-950/40 to-transparent flex-1 flex flex-col">
                    <div className="absolute top-0 right-0 w-8 h-[3px] bg-emerald-500/40" />
                    <div className="absolute bottom-0 left-0 w-[3px] h-8 bg-emerald-500/40" />
                    
                    <h2 className="text-sm font-light text-white uppercase tracking-widest mb-6">CORE INNOVATION</h2>
                    
                    <ul className="space-y-2 mb-10 text-xs font-light text-slate-300">
                        <li className="flex items-center gap-2 before:content-[''] before:w-1 before:h-1 before:bg-emerald-500 before:rounded-full">Large Language Model</li>
                        <li className="flex items-center gap-2 before:content-[''] before:w-1 before:h-1 before:bg-emerald-500 before:rounded-full">Adversarial Simulation</li>
                        <li className="flex items-center gap-2 before:content-[''] before:w-1 before:h-1 before:bg-emerald-500 before:rounded-full">Dynamic Playbook Generation</li>
                    </ul>

                    <div className="mt-auto">
                        <h3 className="text-xs font-medium text-slate-300 uppercase tracking-wider mb-2 leading-relaxed">TIME-TO-PLAYBOOK<br/>REDUCTION<br/><span className="font-black text-emerald-400">{"<"}4 HOURS</span></h3>
                        
                        {/* Red Downward Chart SVG */}
                        <div className="w-full h-32 mt-4 relative border-l border-b border-emerald-500/20 pt-2 pr-2">
                             <div className="absolute bottom-[-15px] left-0 right-0 flex justify-between text-[6px] text-emerald-500/50">
                                 <span>8</span><span>7</span><span>6</span><span>5</span><span>4</span><span>3</span><span>2</span><span>1</span><span>0</span>
                             </div>
                             <div className="absolute left-[-15px] top-0 bottom-0 flex flex-col justify-between text-[6px] text-emerald-500/50">
                                 <span>1.0</span><span>0.8</span><span>0.6</span><span>0.4</span><span>0.2</span><span>0</span>
                             </div>
                             
                             <svg className="w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 100 100">
                                 <motion.path 
                                    initial={{ pathLength: 0 }}
                                    animate={{ pathLength: 1 }}
                                    transition={{ duration: 2, ease: "easeOut" }}
                                    d="M 0,20 Q 20,20 30,50 T 60,80 T 100,95"
                                    fill="none"
                                    stroke="#f43f5e"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                 />
                                 <path d="M 0,20 Q 20,20 30,50 T 60,80 T 100,95 L 100,100 L 0,100 Z" fill="url(#redGlow)" opacity="0.1" />
                                 <defs>
                                     <linearGradient id="redGlow" x1="0" y1="0" x2="0" y2="1">
                                         <stop offset="0%" stopColor="#f43f5e" />
                                         <stop offset="100%" stopColor="transparent" />
                                     </linearGradient>
                                 </defs>
                             </svg>
                        </div>
                    </div>
                </div>
            </div>

            {/* Central Area: Generative Red-Teaming Core */}
            <div className="flex-[2] relative flex flex-col items-center justify-center z-10 px-4">
                
                {/* Floating Brain Node */}
                <motion.div 
                    animate={{ y: [-5, 5, -5], opacity: [0.8, 1, 0.8] }} 
                    transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                    className="absolute top-4 flex flex-col items-center gap-4"
                >
                    <BrainCircuit className="w-20 h-20 text-emerald-400 drop-shadow-[0_0_15px_rgba(16,185,129,0.5)]" />
                    <div className="text-center">
                        <h1 className="text-xl font-light tracking-[0.2em] text-slate-200">GENERATIVE RED-</h1>
                        <div className="flex items-center gap-4">
                            <div className="h-[1px] w-12 bg-emerald-500/50" />
                            <h1 className="text-xl font-light tracking-[0.2em] text-slate-200">TEAMING AI</h1>
                        </div>
                    </div>
                </motion.div>

                {/* Cybernetic Logic Network Graphic */}
                <div className="relative w-full h-[350px] mt-24">
                     {/* Horizontal Origin Beam */}
                     <div className="absolute top-1/2 left-0 right-0 h-[2px] bg-rose-500/40 shadow-[0_0_15px_#f43f5e] skew-y-[-10deg] opacity-50" />
                     <div className="absolute top-1/2 left-0 right-0 h-[2px] bg-emerald-500/40 shadow-[0_0_15px_#10b981] skew-y-[15deg] opacity-50" />
                     
                     {/* Center Core Hub */}
                     <motion.div 
                         initial={{ scale: 0.8 }} animate={{ scale: 1.1 }} transition={{ repeat: Infinity, duration: 2, repeatType: "reverse" }}
                         className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-emerald-400 rounded-lg blur-[20px] opacity-70"
                     />
                     <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 border border-emerald-400 bg-emerald-950/80 rounded flex items-center justify-center rotate-45 shadow-[0_0_20px_#10b981]">
                         <Network className="w-4 h-4 text-emerald-300 -rotate-45" />
                     </div>

                     {/* Server Nodes (Isometric proxy) */}
                     <div className="absolute top-[20%] left-[20%] w-12 h-16 bg-transparent border border-rose-500/50 flex flex-col justify-end p-1 shadow-[0_0_15px_rgba(239,68,68,0.2)] hover:border-rose-400 transition-colors cursor-pointer group/node">
                         <div className="w-full h-[2px] bg-rose-500/80 mb-1" />
                         <div className="w-full h-[2px] bg-rose-500/80 mb-1" />
                         <div className="w-full h-[2px] bg-rose-500/80 mb-1" />
                         <div className="h-[2px] w-full bg-rose-500 mt-2 scale-x-0 group-hover/node:scale-x-100 transition-transform origin-left" />
                     </div>
                     <div className="absolute bottom-[20%] right-[15%] w-10 h-20 bg-transparent border border-rose-500/50 flex flex-col justify-end p-1 shadow-[0_0_15px_rgba(245,158,11,0.2)] hover:border-rose-400 transition-colors cursor-pointer">
                         <div className="w-full h-1 bg-rose-500/80 mb-1" />
                         <div className="w-full h-1 bg-rose-500/80 mb-1" />
                     </div>
                     <div className="absolute top-[30%] right-[30%] w-8 h-8 bg-transparent border border-emerald-500/50 shadow-[0_0_15px_rgba(16,185,129,0.2)] rotate-45 flex items-center justify-center hover:bg-emerald-500/20 transition-colors cursor-pointer">
                          <Eye className="w-3 h-3 text-emerald-300 -rotate-45" />
                     </div>

                     {/* Connecting Wires */}
                     <svg className="w-full h-full absolute inset-0 pointer-events-none">
                         <motion.line x1="50%" y1="50%" x2="25%" y2="28%" stroke="#f43f5e" strokeWidth="1" strokeDasharray="4 4" 
                              initial={{ strokeDashoffset: 100 }} animate={{ strokeDashoffset: 0 }} transition={{ repeat: Infinity, duration: 4, ease: "linear" }} />
                         <motion.line x1="50%" y1="50%" x2="80%" y2="70%" stroke="#fb7185" strokeWidth="1.5" strokeDasharray="4 4" 
                              initial={{ strokeDashoffset: -100 }} animate={{ strokeDashoffset: 0 }} transition={{ repeat: Infinity, duration: 4, ease: "linear" }} />
                         <motion.line x1="50%" y1="50%" x2="70%" y2="30%" stroke="#10b981" strokeWidth="1.5" />
                         <circle cx="25%" cy="28%" r="3" fill="#f43f5e" />
                         <circle cx="80%" cy="70%" r="3" fill="#fb7185" />
                         <circle cx="70%" cy="30%" r="3" fill="#10b981" />
                     </svg>
                </div>
            </div>

            {/* Right Panel: Status & Hardware */}
            <div className="flex-1 max-w-[320px] flex flex-col gap-6 relative z-10">
                
                {/* SYSTEM STATUS */}
                <div className="p-6 border-r-[3px] border-t-[3px] border-emerald-500/40 rounded-tr-xl bg-gradient-to-bl from-emerald-950/40 to-transparent relative">
                    <div className="absolute top-0 left-0 w-8 h-[3px] bg-emerald-500/40" />
                    <div className="absolute bottom-0 right-0 w-[3px] h-8 bg-emerald-500/40" />
                    
                    <h2 className="text-sm font-light text-white uppercase tracking-widest mb-6">SYSTEM STATUS</h2>
                    
                    <div className="space-y-4">
                        <div className="flex justify-between items-center text-xs">
                            <span className="font-light text-slate-300">SCENARIO NOVELTY:</span>
                            <span className="font-mono text-emerald-400">{">"}30%</span>
                        </div>
                        <div className="flex justify-between items-center text-xs">
                            <span className="font-light text-slate-300 uppercase">Coverage Expansion</span>
                        </div>
                        <div className="flex justify-between items-center text-[11px] uppercase">
                            <span className="font-light text-slate-300">TTPs TESTED</span>
                            <span className="font-mono text-emerald-400">+236+</span>
                        </div>
                        <div className="flex justify-between items-center text-xs uppercase mt-4">
                            <span className="font-light text-slate-300 leading-tight">MVIDIA ATT&CK<br/>Framework</span>
                            <span className="font-mono text-emerald-400">+25%<br/><span className="text-[10px]">250+</span></span>
                        </div>
                    </div>
                </div>

                {/* HARDWARE COMPONENTS */}
                <div className="p-6 border-r-[3px] border-b-[3px] border-emerald-500/40 rounded-br-xl bg-gradient-to-tl from-emerald-950/40 to-transparent flex-1 relative flex flex-col">
                    <div className="absolute bottom-0 left-0 w-8 h-[3px] bg-emerald-500/40" />
                    <div className="absolute top-0 right-0 w-[3px] h-8 bg-emerald-500/40" />
                    
                    <h2 className="text-sm font-light text-white uppercase tracking-widest mb-6">HARDWARE COMPONENTS</h2>
                    
                    {/* Logos section proxy */}
                    <div className="flex justify-between items-center mb-8">
                        <div className="flex flex-col items-center gap-2">
                             <div className="w-8 h-8 bg-slate-900 border border-slate-700 flex items-center justify-center transform -skew-x-[15deg]">
                                 <Cpu className="w-4 h-4 text-emerald-500 skew-x-[15deg]" />
                             </div>
                             <span className="text-[6px] uppercase tracking-widest text-slate-400">MVIDIA A100 GPU</span>
                        </div>
                        <div className="flex flex-col items-center gap-2">
                             <div className="w-8 h-8 bg-slate-900 border border-slate-700 flex items-center justify-center">
                                 <Server className="w-4 h-4 text-orange-500" />
                             </div>
                             <span className="text-[6px] uppercase tracking-widest text-slate-400">AWS ARR <span className="text-xs">3</span></span>
                        </div>
                        <div className="flex flex-col items-center gap-2">
                             <div className="w-8 h-8 bg-slate-900 border border-slate-700 flex items-center justify-center transform skew-x-[15deg]">
                                 <Webhook className="w-4 h-4 text-emerald-500 -skew-x-[15deg]" />
                             </div>
                             <span className="text-[6px] uppercase tracking-widest text-slate-400">LlamaScale TreepScale</span>
                        </div>
                    </div>

                    {/* Multi-line Hardware Chart SVG */}
                    <div className="w-full h-24 mt-auto relative border-l border-b border-emerald-500/20 pt-2 pr-2">
                             <div className="absolute left-[-15px] top-0 bottom-0 flex flex-col justify-between text-[6px] text-emerald-500/50">
                                 <span>8k</span><span>6k</span><span>4k</span><span>2k</span><span>0</span>
                             </div>
                             
                             <svg className="w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 100 100">
                                 {/* Blue/Cyan Line */}
                                 <motion.path 
                                    initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 2, ease: "easeOut" }}
                                    d="M 0,90 L 10,85 L 20,88 L 30,70 L 40,80 L 50,60 L 60,65 L 70,50 L 80,45 L 90,20 L 100,5"
                                    fill="none" stroke="#10b981" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
                                 />
                                 {/* Red Line */}
                                 <motion.path 
                                    initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 2.2, ease: "easeOut" }}
                                    d="M 0,95 L 10,92 L 20,80 L 30,75 L 40,85 L 50,65 L 60,70 L 70,55 L 80,48 L 90,30 L 100,10"
                                    fill="none" stroke="#f43f5e" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
                                 />
                             </svg>
                    </div>
                </div>
            </div>
        </div>
    );
}

// Icon helper
function Eye(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  )
}
