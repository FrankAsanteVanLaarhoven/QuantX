'use client';

import React, { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Search, ChevronRight, Book, HelpCircle, Activity, PlayCircle, Settings, ShieldAlert } from 'lucide-react';

const DOCS_SECTIONS = [
    { id: 'getting-started', title: 'GETTING STARTED & NAVIGATION', icon: <PlayCircle size={14} /> },
    { id: 'nexus-widgets', title: 'FEATURES: NEXUS DASHBOARD', icon: <Activity size={14} /> },
    { id: 'iqc-lab', title: 'HOW-TO: ALPHA ENGINEERING', icon: <Settings size={14} /> },
    { id: 'troubleshooting', title: 'TROUBLESHOOTING GUIDE', icon: <ShieldAlert size={14} /> },
    { id: 'support', title: 'SUPPORT & HELP CENTER', icon: <HelpCircle size={14} /> }
];

export default function DocsPage() {
    const [activeSection, setActiveSection] = useState('getting-started');

    const scrollToSection = (id: string) => {
        setActiveSection(id);
        const el = document.getElementById(id);
        if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    return (
        <DashboardLayout>
            <div className="flex h-[calc(100vh-64px)] overflow-hidden bg-[#020202]">
                
                {/* Left Sidebar Table of Contents */}
                <div className="w-80 border-r border-zinc-900 bg-[#050505] hidden md:flex flex-col font-mono shrink-0">
                    <div className="p-6 border-b border-zinc-900">
                        <div className="flex items-center gap-2 mb-4">
                            <span className="w-2 h-2 bg-emerald-500 animate-pulse"></span>
                            <span className="text-[10px] text-emerald-500 font-bold tracking-[0.2em] uppercase">User Manual & Help</span>
                        </div>
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-600" size={14} />
                            <input 
                                type="text"
                                placeholder="SEARCH FAQs..."
                                className="w-full bg-[#020202] border border-zinc-800 text-zinc-300 text-[10px] placeholder-zinc-600 px-9 py-2 uppercase tracking-widest focus:outline-none focus:border-emerald-900 transition-colors"
                            />
                        </div>
                    </div>
                    
                    <div className="flex-1 overflow-y-auto p-4 space-y-2">
                        {DOCS_SECTIONS.map((section) => (
                            <button
                                key={section.id}
                                onClick={() => scrollToSection(section.id)}
                                className={`w-full flex items-center justify-between px-4 py-3 text-[9px] uppercase tracking-widest font-bold transition-all border ${
                                    activeSection === section.id 
                                        ? 'bg-emerald-950/20 text-emerald-400 border-emerald-900/50' 
                                        : 'bg-transparent text-zinc-500 border-transparent hover:bg-[#020202] hover:border-zinc-800'
                                }`}
                            >
                                <span className="flex items-center gap-3">
                                    {section.icon}
                                    <span className="text-left">{section.title}</span>
                                </span>
                                {activeSection === section.id && <ChevronRight size={14} className="text-emerald-500" />}
                            </button>
                        ))}
                    </div>

                    <div className="p-4 border-t border-zinc-900 bg-[#020202]">
                        <span className="block text-[8px] text-zinc-600 uppercase tracking-widest mb-1">SUPPORT PORTAL</span>
                        <span className="text-[9px] text-zinc-400 font-bold uppercase tracking-widest font-mono">SUPPORT@QUANTX.INSTITUTIONAL</span>
                    </div>
                </div>

                {/* Right Content Area */}
                <div className="flex-1 overflow-y-auto scroll-smooth custom-scrollbar relative bg-[#020202] font-mono p-8 lg:p-12">
                    <div className="max-w-4xl mx-auto space-y-20 pb-32">
                        
                        {/* Header */}
                        <div className="space-y-4 border-b border-zinc-900 pb-12">
                            <h1 className="text-3xl font-black text-zinc-100 tracking-tight uppercase" style={{ fontFamily: 'Outfit, sans-serif' }}>
                                End-to-End User Manual
                            </h1>
                            <p className="text-zinc-500 text-[11px] leading-relaxed uppercase tracking-widest max-w-3xl">
                                Welcome to the complete instruction manual for the QuantX platform. This document explains how everything works step-by-step, what each feature is used for, how to seamlessly navigate the interface, and what to do if you encounter technical difficulties.
                            </p>
                        </div>

                        {/* SECTION 1: GETTING STARTED */}
                        <section id="getting-started" className="space-y-8 scroll-mt-8">
                            <div className="flex items-center gap-4 border-b border-zinc-800 pb-2">
                                <PlayCircle className="text-zinc-400" size={20} />
                                <h2 className="text-xl font-bold text-zinc-300 tracking-widest uppercase">1. Getting Started & Navigation</h2>
                            </div>
                            
                            <div className="space-y-6 text-[11px] text-zinc-400 leading-relaxed uppercase tracking-widest">
                                <p>
                                    When you first launch the platform, you will land on the primary <strong>Nexus Dashboard</strong>. The interface is completely modular—nothing dictates your workflow.
                                </p>
                                
                                <div className="bg-[#050505] p-6 border-l-4 border-l-emerald-600 border border-zinc-900">
                                    <h3 className="text-emerald-400 font-bold mb-4">Step-by-Step Navigation Flow:</h3>
                                    <ol className="list-decimal list-outside ml-6 space-y-3 font-mono text-[10px]">
                                        <li><strong>Summon the Sidebar:</strong> Hover your mouse cursor on the far left edge of your screen. The <strong>Glass Sidebar</strong> will dynamically slide out.</li>
                                        <li><strong>Spawn a Widget:</strong> Inside the sidebar, under "Platform Toolkit", click on any tool (e.g., "Market Intelligence", "Local Data Vault").</li>
                                        <li><strong>Arrange Your Workspace:</strong> The widget will spawn into your main dashboard. You can drag and drop it using its header. Build your custom command center.</li>
                                        <li><strong>Access Dedicated Labs:</strong> For full-screen intensive tasks, use the Top Navigation Bar (e.g., clicking "IQC 2026" or "Learn").</li>
                                    </ol>
                                </div>
                            </div>
                        </section>

                        {/* SECTION 2: NEXUS DASHBOARD */}
                        <section id="nexus-widgets" className="space-y-8 scroll-mt-8">
                            <div className="flex items-center gap-4 border-b border-zinc-800 pb-2">
                                <Activity className="text-zinc-400" size={20} />
                                <h2 className="text-xl font-bold text-zinc-300 tracking-widest uppercase">2. Features: The Nexus Dashboard</h2>
                            </div>
                            
                            <p className="text-zinc-500 text-[10px] tracking-widest uppercase mb-4">
                                The Nexus Dashboard exists on the root URL (`/`). It is a live-fire environment. Below is an explanation of what each spawnable widget does and how best to use it.
                            </p>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="bg-[#050505] border border-zinc-800 p-6">
                                    <h3 className="text-[11px] font-bold text-emerald-500 uppercase tracking-widest mb-3 border-b border-zinc-900 pb-2">Market Intelligence</h3>
                                    <p className="text-zinc-400 text-[9px] leading-loose">
                                        <strong>What it is:</strong> A live feed of global macroeconomic news run through a Kalman Filter AI. <br/><br/>
                                        <strong>How to use it:</strong> Keep this active during trading hours. Instead of reading news manually, look at the AI-generated "Risk Bias" meter. If it turns red, the system detects a highly probable structural breakdown in the sector.
                                    </p>
                                </div>
                                <div className="bg-[#050505] border border-zinc-800 p-6">
                                    <h3 className="text-[11px] font-bold text-emerald-500 uppercase tracking-widest mb-3 border-b border-zinc-900 pb-2">Oracle IQ Edge (Spot Tape)</h3>
                                    <p className="text-zinc-400 text-[9px] leading-loose">
                                        <strong>What it is:</strong> The High-Frequency Spot Tape. It visualizes micro-movements of market indices.<br/><br/>
                                        <strong>How to use it:</strong> Watch the continuous cyan area chart. If you're manually triggering an algorithm, wait for the Order Flow Imbalance (red/green bars) to skew heavily in your direction before executing.
                                    </p>
                                </div>
                                <div className="bg-[#050505] border border-zinc-800 p-6">
                                    <h3 className="text-[11px] font-bold text-emerald-500 uppercase tracking-widest mb-3 border-b border-zinc-900 pb-2">Financial Planner (Tail-Risk)</h3>
                                    <p className="text-zinc-400 text-[9px] leading-loose">
                                        <strong>What it is:</strong> A long-term portfolio survival tracking widget using Monte Carlo pathways.<br/><br/>
                                        <strong>How to use it:</strong> Drag this into the corner of your screen when validating an Alpha. It tells you the exact probabilistic risk of ruin over deep-time horizons (e.g., 20 years).
                                    </p>
                                </div>
                                <div className="bg-[#050505] border border-zinc-800 p-6">
                                    <h3 className="text-[11px] font-bold text-emerald-500 uppercase tracking-widest mb-3 border-b border-zinc-900 pb-2">Data Vault</h3>
                                    <p className="text-zinc-400 text-[9px] leading-loose">
                                        <strong>What it is:</strong> The recursive folder structure holding historic simulations.<br/><br/>
                                        <strong>How to use it:</strong> Click through the F-Class arrays to load past performance matrixes. It prevents you from needing to re-run expensive 10-year backtests.
                                    </p>
                                </div>
                            </div>
                        </section>

                        {/* SECTION 3: IQC LAB */}
                        <section id="iqc-lab" className="space-y-8 scroll-mt-8">
                            <div className="flex items-center gap-4 border-b border-zinc-800 pb-2">
                                <Settings className="text-zinc-400" size={20} />
                                <h2 className="text-xl font-bold text-zinc-300 tracking-widest uppercase">3. How-To: Alpha Engineering (IQC 2026)</h2>
                            </div>

                            <p className="text-zinc-500 text-[10px] tracking-widest uppercase mb-4">
                                Click `IQC 2026` in the Top Navigation to enter the dedicated engineering lab. Follow these steps to synthesize and submit a winning mathematical formula.
                            </p>

                            <div className="space-y-4 font-mono text-[10px]">
                                <div className="bg-[#050505] p-4 border border-zinc-900 flex flex-col md:flex-row gap-4">
                                    <div className="w-12 h-12 bg-zinc-900 flex items-center justify-center font-black text-xl text-zinc-600">1</div>
                                    <div className="flex-1">
                                        <h4 className="text-zinc-300 font-bold mb-2 uppercase tracking-widest">Enforce Overfitting Constraints</h4>
                                        <p className="text-zinc-500 leading-relaxed uppercase">Start in the top left. Never run a 10-year generic backtest. Ensure the "1Y ROLLING" window is engaged on the Overfitting Guard block. This proves the algorithm works in Out-Of-Sample conditions.</p>
                                    </div>
                                </div>

                                <div className="bg-[#050505] p-4 border border-zinc-900 flex flex-col md:flex-row gap-4">
                                    <div className="w-12 h-12 bg-zinc-900 flex items-center justify-center font-black text-xl text-zinc-600">2</div>
                                    <div className="flex-1">
                                        <h4 className="text-zinc-300 font-bold mb-2 uppercase tracking-widest">Extract the CMDP Boundaries</h4>
                                        <p className="text-zinc-500 leading-relaxed uppercase">Scroll to the CMDP Extractor. Click the "Optimize Trajectory Matrix" button. The system will calculate historical friction and establish hard stopping constraints for your trades.</p>
                                    </div>
                                </div>

                                <div className="bg-[#050505] p-4 border border-zinc-900 flex flex-col md:flex-row gap-4 flex-1">
                                    <div className="w-12 h-12 bg-zinc-900 flex items-center justify-center font-black text-xl text-zinc-600">3</div>
                                    <div className="flex-1">
                                        <h4 className="text-zinc-300 font-bold mb-2 uppercase tracking-widest">Allocate via RL</h4>
                                        <p className="text-zinc-500 leading-relaxed uppercase">In the RL Hyper-Allocator, click "Initiate Matrix Validation". Wait for the progress bars to complete. This utilizes AI to size your portfolio positions (e.g., heavily weighting liquid tech stocks over volatile pennystocks).</p>
                                    </div>
                                </div>

                                <div className="bg-[#050505] p-4 border border-rose-900/50 flex flex-col md:flex-row gap-4 flex-1 mt-4">
                                    <div className="w-12 h-12 bg-rose-900/50 flex items-center justify-center font-black text-xl text-rose-500">4</div>
                                    <div className="flex-1">
                                        <h4 className="text-rose-500 font-bold mb-2 uppercase tracking-widest">Deploy Stealth Submission</h4>
                                        <p className="text-rose-400/80 leading-relaxed uppercase">Finally, navigate to the WorldQuant Submitter block. Check the parameters. Click the Execution button. The automated stealth Chromium browser will secretly upload your derived equation directly to the live server.</p>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* SECTION 4: TROUBLESHOOTING */}
                        <section id="troubleshooting" className="space-y-8 scroll-mt-8">
                            <div className="flex items-center gap-4 border-b border-zinc-800 pb-2">
                                <ShieldAlert className="text-emerald-500" size={20} />
                                <h2 className="text-xl font-bold text-emerald-500 tracking-widest uppercase">4. Troubleshooting Guide</h2>
                            </div>

                            <div className="space-y-2 text-[10px] font-mono">
                                <details className="bg-[#050505] border border-zinc-800 group overflow-hidden">
                                    <summary className="p-4 uppercase tracking-widest text-zinc-300 font-bold cursor-pointer hover:bg-[#08080a] select-none flex items-center gap-2">
                                        <span className="text-emerald-500">Q:</span> The Oracle Spot Tape is flatlining (No Data).
                                    </summary>
                                    <div className="p-4 border-t border-zinc-900 text-zinc-400 uppercase leading-relaxed bg-[#020202]">
                                        <strong>Diagnosis:</strong> The local FastAPI kernel has detached. <br/><br/>
                                        <strong>Fix:</strong> Open your terminal window and verify that `uvicorn main:app --reload` is running inside the `/backend` folder. If it crashed due to memory limits, restart the command. The UI should automatically re-acquire the web socket.
                                    </div>
                                </details>

                                <details className="bg-[#050505] border border-zinc-800 group overflow-hidden">
                                    <summary className="p-4 uppercase tracking-widest text-zinc-300 font-bold cursor-pointer hover:bg-[#08080a] select-none flex items-center gap-2">
                                        <span className="text-emerald-500">Q:</span> GlassSidebar Widgets freeze when dragging.
                                    </summary>
                                    <div className="p-4 border-t border-zinc-900 text-zinc-400 uppercase leading-relaxed bg-[#020202]">
                                        <strong>Diagnosis:</strong> Browser rendering bottleneck heavily impacting the Framer Motion library. <br/><br/>
                                        <strong>Fix:</strong> Ensure you are not spawning more than 4 heavy L3 Dashboard widgets simultaneously on lower-end devices. Hard refresh the page (`Cmd+R`) to purge the React state.
                                    </div>
                                </details>

                                <details className="bg-[#050505] border border-zinc-800 group overflow-hidden">
                                    <summary className="p-4 uppercase tracking-widest text-zinc-300 font-bold cursor-pointer hover:bg-[#08080a] select-none flex items-center gap-2">
                                        <span className="text-emerald-500">Q:</span> MCP Submitter says "Failed to bypass Cloudflare".
                                    </summary>
                                    <div className="p-4 border-t border-zinc-900 text-zinc-400 uppercase leading-relaxed bg-[#020202]">
                                        <strong>Diagnosis:</strong> The target server flagged the headless browser parameters.<br/><br/>
                                        <strong>Fix:</strong> Contact support for an updated Pyppeteer/Playwright stealth evasion key. Do not repetitively spam the submit button, this will result in an IP throttling.
                                    </div>
                                </details>
                            </div>
                        </section>

                        {/* SECTION 5: SUPPORT */}
                        <section id="support" className="space-y-8 scroll-mt-8">
                            <div className="flex items-center gap-4 border-b border-zinc-800 pb-2">
                                <HelpCircle className="text-zinc-400" size={20} />
                                <h2 className="text-xl font-bold text-zinc-300 tracking-widest uppercase">5. Support & Help Center</h2>
                            </div>
                            
                            <div className="bg-[#0a0a0e] border border-zinc-800 p-8 text-center flex flex-col items-center justify-center">
                                <HelpCircle className="text-zinc-500 mb-4" size={32} />
                                <h3 className="text-zinc-300 font-bold uppercase tracking-widest mb-2">Need Direct Engineering Assistance?</h3>
                                <p className="text-zinc-500 text-[10px] uppercase tracking-widest max-w-lg mb-6 leading-relaxed">
                                    If the troubleshooting guide does not resolve the kernel detachments or if you require an upgraded API access key for the telemetry feeds, contact the Quantitative Engineering team directly.
                                </p>
                                <a href="mailto:support@quantx.institutional" className="px-6 py-3 bg-zinc-900 border border-zinc-700 text-emerald-400 text-[10px] font-bold uppercase tracking-widest hover:bg-zinc-800 transition-colors">
                                    EMAIL: SUPPORT@QUANTX.INSTITUTIONAL
                                </a>
                            </div>
                        </section>

                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}
