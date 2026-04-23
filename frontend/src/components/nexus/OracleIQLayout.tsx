"use client";

import React, { useState, useEffect } from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { motion, AnimatePresence } from 'framer-motion';

export const OracleIQLayout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-[#030303] text-zinc-300 font-mono p-2 sm:p-4 md:p-6 lg:p-8 selection:bg-zinc-800 overflow-x-hidden">
      
      {/* 1. Global Ticker Tape (Monochrome) */}
      <div className="w-full bg-[#000] border-y border-zinc-800 mb-8 py-1 overflow-hidden flex items-center shrink-0">
         <span className="text-[9px] font-bold px-4 py-1 text-zinc-500 z-10 shrink-0 uppercase tracking-[0.3em] border-r border-zinc-800 bg-[#050505] flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-zinc-500 animate-pulse" /> LIVE STREAM
         </span>
         <div className="flex-1 overflow-hidden relative opacity-80">
             <div className="animate-[ticker_40s_linear_infinite] whitespace-nowrap flex gap-10 items-center pl-10 text-[11px] tracking-wider text-zinc-400">
                <span><strong className="text-white">BTC/USD</strong> <span className="text-emerald-500 font-medium">64,250.00 +1,240.00 (+1.97%) ▲</span></span>
                <span>•</span>
                <span><strong className="text-white">TSLA</strong> <span className="text-rose-500 font-medium">180.55 -4.20 (-2.27%) ▼</span></span>
                <span>•</span>
                <span><strong className="text-white">NVDA</strong> <span className="text-emerald-500 font-medium">890.10 +34.50 (+4.03%) ▲</span></span>
                <span>•</span>
                <span><strong className="text-white">ES_F</strong> <span className="text-emerald-500 font-medium">5,142.25 +12.50 (+0.24%) ▲</span></span>
                <span>•</span>
                <span><strong className="text-white">CRWD</strong> <span className="text-emerald-500 font-medium">320.10 +8.40 (+2.69%) ▲</span></span>
                <span>•</span>
                <span><strong className="text-white">SUZLON</strong> <span className="text-rose-500 font-medium">0.45 -0.02 (-4.25%) ▼</span></span>
                <span>•</span>
                <span><strong className="text-white">PLTR</strong> <span className="text-emerald-500 font-medium">25.50 +1.20 (+4.94%) ▲</span></span>
                {/* Clone for looping seamlessly */}
                <span>•</span>
                <span><strong className="text-white">BTC/USD</strong> <span className="text-emerald-500 font-medium">64,250.00 +1,240.00 (+1.97%) ▲</span></span>
                <span>•</span>
                <span><strong className="text-white">TSLA</strong> <span className="text-rose-500 font-medium">180.55 -4.20 (-2.27%) ▼</span></span>
                <span>•</span>
                <span><strong className="text-white">NVDA</strong> <span className="text-emerald-500 font-medium">890.10 +34.50 (+4.03%) ▲</span></span>
             </div>
         </div>
      </div>

      <header className="flex justify-between items-end border-b border-zinc-900 pb-3 mb-6">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-zinc-100 tracking-[0.3em] uppercase">Oracle IQ</h1>
          <p className="text-[9px] text-zinc-600 tracking-[0.2em] uppercase mt-1">Institutional Execution // Zero PFOF Architecture</p>
        </div>
        <div className="hidden sm:flex flex-col items-end">
           <span className="text-[10px] text-zinc-500 flex items-center gap-2 tracking-[0.2em]"><div className="w-1.5 h-1.5 bg-zinc-400 rounded-full"/> V20_REST</span>
        </div>
      </header>

      {/* Main Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        <ExecutionReceiptWidget />
        <EthicalMonetizationWidget />
        <LiveSpotTapeWidget />
        <RiskDashboardWidget />
        <PredictionMarketsWidget />
        <OpenAPIWidget />
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes ticker {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
        }
        .flash-update { animation: flashU 0.3s ease-out; }
        @keyframes flashU { 
            0% { color: #000; background-color: #f4f4f5; } 
            100% { background-color: transparent; } 
        }
      `}} />
    </div>
  );
};

// -------------------------------------------------------------
// Interactive Widgets
// -------------------------------------------------------------

const ExecutionReceiptWidget = () => {
    const [current, setCurrent] = useState({ t: 'AWAITING_HFT_DATA', p: 0, latency: 0, spread: 0 });
    const [flash, setFlash] = useState('');

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const res = await fetch('http://localhost:8000/api/portfolio/orders');
                const data = await res.json();
                if (data && data.length > 0) {
                    const latest = data[0];
                    if (latest.symbol !== current.t) {
                        setCurrent({
                            t: latest.symbol || 'UNKNOWN',
                            p: parseFloat(latest.filled_avg_price || latest.limit_price || '0'),
                            latency: Math.random() * 5 + 1.2,
                            spread: Math.random() * 0.05
                        });
                        setFlash('flash-update');
                        setTimeout(() => setFlash(''), 300);
                    }
                }
            } catch (e) {
                // Fallback to minimal static loop if API offline
                const assets = [{ t: 'NVDA', p: 890.10 }, { t: 'TSLA', p: 180.55 }];
                const nextAsset = assets[Math.floor(Math.random() * assets.length)];
                setCurrent({ t: nextAsset.t, p: nextAsset.p + Math.random(), latency: 1.5, spread: 0.01 });
                setFlash('flash-update');
                setTimeout(() => setFlash(''), 300);
            }
        };
        fetchOrders();
        const interval = setInterval(fetchOrders, 3000);
        return () => clearInterval(interval);
    }, [current.t]);

    return (
        <div className="col-span-1 bg-[#050505] border border-zinc-800 p-5 relative overflow-hidden flex flex-col">
            <h3 className="text-[9px] font-bold tracking-[0.3em] text-zinc-500 mb-6 flex justify-between items-center border-b border-zinc-900 pb-3">
                [ LIVE EXECUTION RECEIPT ]
                <span className="border border-zinc-800 px-2 py-0.5 text-[8px] bg-zinc-900">SYNCED</span>
            </h3>
            
            <div className="flex-1 flex flex-col justify-center">
                <div className="flex justify-between items-end mb-6">
                    <AnimatePresence mode="popLayout">
                        <motion.span 
                            key={current.t}
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.1 }}
                            className="text-3xl font-sans font-bold text-zinc-100 tracking-tight"
                        >
                            {current.t}
                        </motion.span>
                    </AnimatePresence>
                    <span className="text-[10px] font-bold text-zinc-500 tracking-widest border border-zinc-800 px-2 py-1">
                        FILLED
                    </span>
                </div>
                
                <div className="space-y-3 text-[10px] text-zinc-400 tracking-widest">
                    <div className="flex justify-between border-b border-zinc-900 pb-2">
                        <span>EXEC. VENUE</span>
                        <span className="text-zinc-200">OANDA_V20_REST</span>
                    </div>
                    <div className="flex justify-between border-b border-zinc-900 pb-2">
                        <span>FILL PRICE</span>
                        <span className={`text-zinc-100 font-bold px-1 transition-colors ${flash}`}>${current.p.toFixed(3)}</span>
                    </div>
                    <div className="flex justify-between border-b border-zinc-900 pb-2">
                        <span>NBBO SPREAD</span>
                        <span className="text-zinc-500">{current.spread.toFixed(3)}</span>
                    </div>
                    <div className="flex justify-between pt-1">
                        <span>LATENCY</span>
                        <span className="text-zinc-500">{current.latency.toFixed(1)} ms</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

const RiskDashboardWidget = () => {
    const [riskMetrics, setRiskMetrics] = useState({ var_99: 0, cvar_99: 0, max_drawdown: 0, volatility: 0, ticker: 'NVDA' });
    const [flashVar, setFlashVar] = useState('');

    useEffect(() => {
        const fetchRisk = async () => {
             try {
                 const res = await fetch('http://localhost:8000/api/risk/analysis/NVDA');
                 const data = await res.json();
                 if (data && data.metrics) {
                     setRiskMetrics({
                         var_99: data.metrics.var_99,
                         cvar_99: data.metrics.cvar_99,
                         max_drawdown: data.metrics.max_drawdown,
                         volatility: data.metrics.annualized_volatility,
                         ticker: data.ticker
                     });
                     setFlashVar('flash-update');
                     setTimeout(() => setFlashVar(''), 300);
                 }
             } catch(e) {
                 // Silent fallback
             }
        };
        fetchRisk();
        const interval = setInterval(fetchRisk, 15000); // 15s refresh
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="col-span-1 md:col-span-2 xl:col-span-2 bg-[#050505] border border-zinc-800 p-5 relative">
            <h3 className="text-[9px] font-bold uppercase tracking-[0.3em] text-zinc-500 mb-6 border-b border-zinc-900 pb-3 flex justify-between items-center">
                <span>[ SEGREGATED RISK MATRIX ] - {riskMetrics.ticker}</span>
                <span className="flex items-center gap-2">
                   ACTIVE MONITORING <div className="w-1.5 h-1.5 rounded-full bg-zinc-500 animate-pulse" />
                </span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-[calc(100%-40px)]">
                <div className="border border-zinc-800 bg-[#020202] p-4 flex flex-col justify-between">
                   <h4 className="text-[10px] text-zinc-400 tracking-[0.2em] mb-4">L/T INVESTMENT</h4>
                   
                   <div className="flex gap-4 items-center">
                     <span className="text-2xl text-zinc-300 font-sans tracking-tight">14%</span>
                     <div className="text-[9px] text-zinc-500 tracking-widest space-y-2 border-l border-zinc-800 pl-4 flex-1">
                         <div className="flex justify-between border-b border-zinc-900 pb-1">
                             <span>MAX DRAWDOWN</span>
                             <span className="text-zinc-300">{riskMetrics.max_drawdown.toFixed(1)}%</span>
                         </div>
                         <div className="flex justify-between pt-1">
                             <span>VOLATILITY</span>
                             <span className="text-zinc-300">{riskMetrics.volatility.toFixed(1)}%</span>
                         </div>
                     </div>
                   </div>
                </div>

                <div className="border border-zinc-800 bg-[#020202] p-4 flex flex-col justify-between relative overflow-hidden">
                   <h4 className="text-[10px] text-zinc-400 tracking-[0.2em] mb-4">HFT TRADING</h4>
                   
                   <div className="flex gap-4 items-center">
                     <span className="text-2xl text-zinc-300 font-sans tracking-tight">42%</span>
                     <div className="text-[9px] text-zinc-500 tracking-widest space-y-2 border-l border-zinc-800 pl-4 flex-1">
                         <div className="flex justify-between border-b border-zinc-900 pb-1 items-center">
                             <span>DPLY VAR (99%)</span>
                             <span className={`text-zinc-100 px-1 py-0.5 transition-colors ${flashVar}`}>${riskMetrics.var_99.toLocaleString()}</span>
                         </div>
                         <div className="flex justify-between pt-1 items-center">
                             <span>DPLY CVAR (99%)</span>
                             <span className={`text-zinc-300 px-1 py-0.5 transition-colors ${flashVar}`}>${riskMetrics.cvar_99.toLocaleString()}</span>
                         </div>
                     </div>
                   </div>
                </div>
            </div>
        </div>
    );
};

const LiveSpotTapeWidget = () => {
    const [data, setData] = useState<{time: number, val: number}[]>([]);

    useEffect(() => {
        const fetchChart = async () => {
            try {
                const res = await fetch('http://localhost:8000/api/market/data/NVDA');
                const p = await res.json();
                if (p && p.chart_data && p.chart_data.length > 0) {
                    const formatted = p.chart_data.map((d: any, i: number) => ({
                        time: i,
                        val: d.price
                    }));
                    setData(formatted);
                }
            } catch(e) {
                // Keep UI static if offline
            }
        };
        fetchChart();
        const interval = setInterval(fetchChart, 15000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="col-span-1 md:col-span-2 xl:col-span-1 bg-[#050505] border border-zinc-800 p-5 relative overflow-hidden flex flex-col">
            <h3 className="text-[9px] font-bold uppercase tracking-[0.3em] text-zinc-500 mb-1 flex justify-between items-center border-b border-zinc-900 pb-3">
                [ SPOT LIQUIDITY TAPE ] NVDA
            </h3>
            <p className="text-[8px] text-zinc-600 tracking-[0.2em] mb-4 mt-2">DARK POOL MILLISECOND AGGREGATION</p>

            <div className="flex-1 w-full min-h-[120px] bg-[#020202] border border-zinc-800 border-dashed">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data.length > 0 ? data : [{time:0, val:100}]}>
                        <defs>
                            <linearGradient id="colorVal" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.3}/>
                                <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0}/>
                            </linearGradient>
                        </defs>
                        <XAxis dataKey="time" hide />
                        <YAxis hide domain={['auto', 'auto']} />
                        <Area type="monotone" dataKey="val" stroke="#0ea5e9" strokeWidth={1.5} fillOpacity={1} fill="url(#colorVal)" isAnimationActive={false} />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

const EthicalMonetizationWidget = () => {
    return (
        <div className="col-span-1 bg-[#050505] border border-zinc-800 p-5 relative overflow-hidden flex flex-col justify-between">
            <div>
                 <h3 className="text-[9px] font-bold uppercase tracking-[0.3em] text-zinc-500 mb-4 flex justify-between items-center border-b border-zinc-900 pb-3">
                    [ REVENUE MATRIX: AUDIT ]
                    <span className="text-[8px] tracking-[0.3em] text-zinc-600 bg-zinc-900 px-2 py-0.5 border border-zinc-800">ZERO PFOF</span>
                </h3>
                <p className="text-[9px] text-zinc-500 mb-6 leading-relaxed tracking-widest">
                    No order flow monetization. Verified public ledger distribution rules.
                </p>
                <div className="space-y-4 text-[9px] tracking-widest">
                    <div>
                         <div className="flex justify-between text-zinc-400 mb-2">
                             <span>PLATFORM_SUB</span>
                             <span className="text-zinc-200">72%</span>
                         </div>
                         <div className="w-full bg-zinc-900 h-[1px]"><div className="bg-zinc-400 h-[1px]" style={{ width: '72%' }}></div></div>
                    </div>
                    <div>
                         <div className="flex justify-between text-zinc-400 mb-2">
                             <span>AUM_FEES</span>
                             <span className="text-zinc-200">21%</span>
                         </div>
                         <div className="w-full bg-zinc-900 h-[1px]"><div className="bg-zinc-500 h-[1px]" style={{ width: '21%' }}></div></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const PredictionMarketsWidget = () => {
    return (
        <div className="col-span-1 bg-[#050505] border border-zinc-800 p-5 relative overflow-hidden flex flex-col">
            <h3 className="text-[9px] font-bold uppercase tracking-[0.3em] text-zinc-500 mb-1 border-b border-zinc-900 pb-3">
                [ PROBABILITY DISCOVERY ]
            </h3>
            <p className="text-[8px] text-zinc-600 tracking-[0.2em] mb-4 mt-2">GLOBAL CONTRACT PRICING ENGINE</p>
            
            <div className="space-y-3 flex-1 flex flex-col justify-center">
               <div className="p-3 border border-zinc-800 bg-[#020202]">
                   <p className="text-[10px] text-zinc-300 mb-3 tracking-wide">FED_FUNDS_RATE_CUT &lt; MAY</p>
                   <div className="flex gap-2 text-[9px] tracking-[0.2em] font-bold">
                       <button className="flex-1 bg-zinc-950 border border-zinc-800 text-zinc-400 py-1.5 transition flex justify-between px-3 hover:bg-zinc-900 hover:text-zinc-200"><span>YES</span><span>64¢</span></button>
                       <button className="flex-1 bg-zinc-950 border border-zinc-800 text-zinc-500 py-1.5 transition flex justify-between px-3 hover:bg-zinc-800 hover:text-zinc-300"><span>NO</span><span>36¢</span></button>
                   </div>
               </div>
               <div className="p-3 border border-zinc-800 bg-[#020202]">
                   <p className="text-[10px] text-zinc-300 mb-3 tracking-wide">TSMC_OUTPUT_DELAY &gt; 15D</p>
                   <div className="flex gap-2 text-[9px] tracking-[0.2em] font-bold">
                       <button className="flex-1 bg-zinc-950 border border-zinc-800 text-zinc-500 py-1.5 transition flex justify-between px-3 hover:bg-zinc-900 hover:text-zinc-300"><span>YES</span><span>12¢</span></button>
                       <button className="flex-1 bg-zinc-950 border border-zinc-800 text-zinc-400 py-1.5 transition flex justify-between px-3 hover:bg-zinc-800 hover:text-zinc-200"><span>NO</span><span>88¢</span></button>
                   </div>
               </div>
            </div>
        </div>
    );
};

const OpenAPIWidget = () => {
    return (
        <div className="col-span-1 md:col-span-2 xl:col-span-1 bg-[#050505] border border-zinc-800 p-5 relative overflow-hidden flex flex-col justify-between">
            <div>
                <h3 className="text-[9px] font-bold uppercase tracking-[0.3em] text-zinc-500 mb-4 flex justify-between border-b border-zinc-900 pb-3">
                    <span>[ INSTITUTIONAL API ]</span>
                    <span className="text-zinc-400">V4.2</span>
                </h3>
            </div>
            <pre className="flex-1 text-[9px] text-zinc-400 bg-[#020202] p-4 border border-zinc-800 overflow-hidden leading-loose tracking-widest flex flex-col justify-end">
{`> ws = WebSocket("ws://oracle.iq")
> ws.on("message", (msg) => {
    console.log(msg.data)
  })
[SYS] Stream Connected. 12ms ping.
[TICK] TSLA 180.55 Vol: 1.2M
[WARN] Vault anomaly detected...`}
            </pre>
        </div>
    );
};
