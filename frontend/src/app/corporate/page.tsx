import React from 'react';

export default function CorporatePage() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center font-sans overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white via-black to-black" />
        <div className="relative z-10 flex flex-col items-center">
            <h1 className="text-6xl font-bold tracking-tighter mb-4">QuantX<span className="text-red-500">OS</span></h1>
            <p className="text-white/50 tracking-widest uppercase text-sm mb-12">Institutional Grade Intelligence Layer</p>
            
            <div className="flex gap-4 mb-24">
                <button className="px-6 py-3 border border-red-500/50 bg-red-500/10 hover:bg-red-500/20 text-red-500 text-xs tracking-widest font-bold z-10 transition-colors uppercase">
                    Research Division
                </button>
                <button className="px-6 py-3 border border-white/20 hover:border-white/50 text-white/50 hover:text-white text-[11px] tracking-widest font-bold z-10 transition-colors uppercase">
                    Fleet Deployment Core
                </button>
            </div>
            
            <div className="border-t border-white/5 pt-8 w-full max-w-sm text-center flex flex-col items-center gap-2">
                <div className="w-1 h-4 bg-red-500/50" />
                <p className="text-[10px] text-white/20 tracking-[0.2em] uppercase">SYSTEMS ONLINE: AWAITING PROTOCOL INITIATION</p>
            </div>
        </div>
    </div>
  )
}
