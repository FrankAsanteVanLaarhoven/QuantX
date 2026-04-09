'use client';

import React, { useState, useEffect } from 'react';
import { TerminalSquare, Play, Square, Activity, Database, Crosshair } from 'lucide-react';

export default function McpSubmitter() {
    const [status, setStatus] = useState<any>({
        is_running: false,
        status: "Offline",
        logs: [],
        snapshot_b64: null,
        leaderboard_intel: []
    });

    useEffect(() => {
        const fetchStatus = async () => {
            try {
                const res = await fetch('http://localhost:8000/api/worldquant/status');
                const data = await res.json();
                setStatus(data);
            } catch (e) {
                // Backend not reachable
            }
        };
        fetchStatus();
        const interval = setInterval(fetchStatus, 3000);
        return () => clearInterval(interval);
    }, []);

    const handleToggle = async () => {
        const endpoint = status.is_running ? 'stop' : 'start';
        await fetch(`http://localhost:8000/api/worldquant/${endpoint}`, { method: 'POST' });
    };

    return (
        <div className="bg-[#0A0A0E] border border-red-500/20 rounded-xl overflow-hidden relative col-span-1 lg:col-span-2">
            <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                        <TerminalSquare className={status.is_running ? 'text-red-500 animate-pulse' : 'text-gray-500'} size={24} />
                        <h3 className="text-xl font-bold text-white tracking-wide" style={{ fontFamily: 'Outfit, sans-serif' }}>
                            WorldQuant MCP Agent
                        </h3>
                    </div>
                    <button 
                        onClick={handleToggle}
                        className={`px-4 py-2 text-xs font-bold uppercase tracking-widest rounded transition-all flex items-center gap-2 border ${
                            status.is_running 
                                ? 'bg-red-900/40 text-red-500 border-red-500 hover:bg-red-900/60' 
                                : 'bg-green-900/40 text-green-500 border-green-500 hover:bg-green-900/60'
                        }`}
                    >
                        {status.is_running ? <><Square size={14} /> Abort Raid</> : <><Play size={14} /> Execute SOTA Simulation</>}
                    </button>
                </div>

                <p className="text-white/50 text-sm mb-6 leading-relaxed">
                    This deploys the WorldQuant Stealth Agent into a headless Chromium context. Utilizing Bezier-curve mouse pathing and strict Cloudflare evasions, it will parse the Top 10 champions and strictly synthesize continuous alpha uploads.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Left: Telemetry Data */}
                    <div className="col-span-1 flex flex-col gap-4">
                        <div className="bg-black border border-white/10 p-4 rounded uppercase tracking-widest text-[10px]">
                            <span className="text-white/40 block mb-1">State Vector</span>
                            <span className={`font-bold ${status.is_running ? 'text-red-400' : 'text-gray-500'}`}>{status.status}</span>
                        </div>
                        
                        {status.leaderboard_intel?.length > 0 && (
                            <div className="bg-black/60 border border-green-500/20 p-4 rounded flex-1">
                                <h4 className="text-[10px] text-green-500 uppercase tracking-widest font-bold mb-3 flex items-center gap-2">
                                    <Database size={12} /> Target Recon: Top Champions
                                </h4>
                                <div className="space-y-3">
                                    {status.leaderboard_intel.map((intel: any, i: number) => (
                                        <div key={i} className="text-xs bg-white/5 p-2 rounded border border-white/5">
                                            <div className="flex justify-between items-center mb-1">
                                                <span className="text-white font-bold">#{intel.rank} {intel.alias}</span>
                                                <span className="text-green-400 font-mono">{intel.score}pts</span>
                                            </div>
                                            <div className="text-[9px] text-white/50 font-mono truncate">{intel.est_logic}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Middle: Terminal Logs */}
                    <div className="col-span-1 md:col-span-2 bg-black border border-white/10 rounded overflow-hidden flex flex-col">
                        <div className="bg-white/5 p-2 border-b border-white/10 flex items-center gap-2">
                            <Activity size={12} className="text-white/40" />
                            <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest">MCP Output Stream</span>
                        </div>
                        <div className="flex-1 p-4 overflow-y-auto max-h-64 font-mono text-[10px] space-y-1.5 flex flex-col-reverse">
                            {status.logs?.length === 0 ? (
                                <span className="text-white/20">Awaiting execution matrix...</span>
                            ) : (
                                status.logs.map((log: string, idx: number) => (
                                    <div key={idx} className={`${idx === 0 ? 'text-red-400 font-bold' : 'text-green-500/70'} break-all`}>
                                        {log}
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>

                {/* Secret Visual Telemetry Viewer */}
                {status.snapshot_b64 && (
                    <div className="mt-6 border border-white/10 rounded overflow-hidden">
                        <div className="bg-white/5 p-2 border-b border-white/10 flex items-center gap-2">
                            <Crosshair size={12} className="text-white/40" />
                            <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest">Headless Telemetry Stream</span>
                        </div>
                        <div className="w-full bg-black flex justify-center p-4">
                            <img 
                                src={`data:image/jpeg;base64,${status.snapshot_b64}`} 
                                alt="Headless Browser Context" 
                                className="max-h-96 rounded shadow-lg shadow-black/50 border border-white/10"
                            />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
