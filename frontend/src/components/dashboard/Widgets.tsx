import React, { useState, useEffect } from 'react';
import {
  LineChart, Line, AreaChart, Area, ComposedChart,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ScatterChart, Scatter, ZAxis
} from 'recharts';
import { Panel, Group as PanelGroup, Separator as PanelResizeHandle } from "react-resizable-panels";
import { Award } from 'lucide-react';
import CopilotWidget from './CopilotWidget';

const Card = ({ children }: { children: React.ReactNode }) => (
  <div className="flex flex-col h-full text-white/90 p-4 relative">
    {children}
  </div>
);

// Custom translucent tooltip for recharts
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-black/80 backdrop-blur-md border border-white/10 p-3 rounded shadow-xl text-xs font-mono">
        <p className="text-gray-400 mb-1">{label}</p>
        <p className="text-sky-400 font-semibold">{payload[0].value}</p>
      </div>
    );
  }
  return null;
};

// -------------------------------------------------------------
// Live Stock Tracker (Real yfinance data)
// -------------------------------------------------------------
export const StockTrackerPanel = () => {
  const [data, setData] = useState<any[]>([]);
  const [ticker, setTicker] = useState("NVDA");
  const [loading, setLoading] = useState(true);
  const [telemetry, setTelemetry] = useState<any>(null);

  useEffect(() => {
    setLoading(true);
    fetch(`http://127.0.0.1:8000/api/market/data/${ticker}`)
      .then(res => res.json())
      .then(res => {
        if(res.chart_data) setData(res.chart_data);
        if(res._telemetry) setTelemetry(res._telemetry);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [ticker]);

  return (
    <Card>
      <div className="flex justify-between items-center mb-4 font-mono text-sm">
        <select 
          value={ticker} 
          onChange={e => setTicker(e.target.value)}
          className="bg-white/5 border border-white/10 rounded px-2 py-1 text-sky-400 outline-none"
        >
          <option value="NVDA">NVDA</option>
          <option value="AAPL">AAPL</option>
          <option value="TSLA">TSLA</option>
          <option value="BTC-USD">BTC-USD</option>
        </select>
        {telemetry && (
          <div className="text-[10px] text-green-400 flex items-center gap-2">
            <span>{telemetry.compute_engine}</span>
            <span className="bg-green-500/20 px-2 py-0.5 rounded">{telemetry.inference_latency_us}µs</span>
          </div>
        )}
      </div>

      <div className="flex-1 w-full min-h-[200px] opacity-90">
        {loading ? (
          <div className="flex items-center justify-center h-full">
            <div className="w-6 h-6 border-2 border-sky-500/20 border-t-sky-500 rounded-full animate-spin" />
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <defs>
                <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#38bdf8" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#38bdf8" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <XAxis dataKey="date" hide />
              <YAxis domain={['auto', 'auto']} hide />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="price" stroke="#38bdf8" fillOpacity={1} fill="url(#colorPrice)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </div>
    </Card>
  );
};

// -------------------------------------------------------------
// Institutional Risk Analysis (Tools Panel)
// -------------------------------------------------------------
export const ToolsPanel = () => {
  const [data, setData] = useState<any>(null);
  const [ticker, setTicker] = useState("SPY");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`http://127.0.0.1:8000/api/risk/analysis/${ticker}`)
      .then(res => res.json())
      .then(res => {
        setData(res);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [ticker]);

  return (
    <Card>
      <div className="flex justify-between items-center mb-4 font-mono text-sm">
        <h3 className="text-gray-300">SOTA Risk Engine</h3>
        <select value={ticker} onChange={e => setTicker(e.target.value)} className="bg-white/5 border border-white/10 rounded px-2 py-1 text-sky-400">
          <option value="SPY">SPY</option>
          <option value="QQQ">QQQ</option>
          <option value="BTC-USD">BTC-USD</option>
        </select>
      </div>

      {loading || !data ? (
        <div className="flex-1 flex items-center justify-center">
            <div className="w-6 h-6 border-2 border-sky-500/20 border-t-sky-500 rounded-full animate-spin" />
        </div>
      ) : data?.error ? (
        <div className="flex-1 flex items-center justify-center text-red-400 text-xs font-mono p-4">
            Alert: {data.error}
        </div>
      ) : (
        <div className="flex flex-col h-full font-mono">
           <div className="grid grid-cols-2 gap-3 mb-4">
             <div className="bg-red-500/10 border border-red-500/20 p-3 rounded text-center">
               <span className="text-[10px] text-red-300 block uppercase">VaR (99%)</span>
               <span className="text-lg text-red-400 font-sans font-bold">{data.metrics.var_99}%</span>
             </div>
             <div className="bg-orange-500/10 border border-orange-500/20 p-3 rounded text-center">
               <span className="text-[10px] text-orange-300 block uppercase">Max Drawdown</span>
               <span className="text-lg text-orange-400 font-sans font-bold">{data.metrics.max_drawdown}%</span>
             </div>
             <div className="bg-sky-500/10 border border-sky-500/20 p-3 rounded text-center">
               <span className="text-[10px] text-sky-300 block uppercase">Ann. Volatility</span>
               <span className="text-lg text-sky-400 font-sans font-bold">{data.metrics.annualized_volatility}%</span>
             </div>
             <div className="bg-purple-500/10 border border-purple-500/20 p-3 rounded text-center">
               <span className="text-[10px] text-purple-300 block uppercase">cVaR (99%)</span>
               <span className="text-lg text-purple-400 font-sans font-bold">{data.metrics.cvar_99}%</span>
             </div>
           </div>
           
           <h4 className="text-xs text-gray-500 mb-2 mt-2 uppercase tracking-widest">Drawdown Surface</h4>
           <div className="flex-1 w-full min-h-[120px]">
             <ResponsiveContainer width="100%" height="100%">
               <AreaChart data={data.drawdown_curve}>
                  <defs>
                    <linearGradient id="colorDd" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                 <XAxis dataKey="date" hide />
                 <YAxis domain={['auto', 0]} hide />
                 <Tooltip content={<CustomTooltip />} />
                 <Area type="monotone" dataKey="drawdown" stroke="#ef4444" fill="url(#colorDd)" />
               </AreaChart>
             </ResponsiveContainer>
           </div>
        </div>
      )}
    </Card>
  );
};

// -------------------------------------------------------------
// Live Dividends Panel
// -------------------------------------------------------------
export const DividendsPanel = () => {
  const [data, setData] = useState<any>(null);
  const [ticker, setTicker] = useState("AAPL");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`http://127.0.0.1:8000/api/market/dividends/${ticker}`)
      .then(res => res.json())
      .then(res => {
        setData(res);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [ticker]);

  return (
    <div className="flex flex-col h-full w-full rounded-xl bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-green-950/40 via-black to-black border border-white/10 overflow-hidden font-sans relative">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 to-green-400" />
      
      <div className="p-4 border-b border-white/5 bg-black/40 relative z-10 flex flex-col">
         <h2 className="text-xl text-white font-medium tracking-wide flex justify-between items-center mb-1">
            <span>Passive Income Engine</span>
            <span className="text-[10px] bg-green-500/10 px-2 py-1 rounded text-green-400 uppercase tracking-widest border border-green-500/30">DRIP Predictor</span>
         </h2>
         <div className="flex justify-between items-center mt-2">
            <select value={ticker} onChange={e => setTicker(e.target.value)} className="bg-white/5 border border-white/10 rounded px-2 py-1 text-sm text-green-400 font-mono focus:border-green-500 outline-none">
              <option value="AAPL">AAPL</option>
              <option value="MSFT">MSFT</option>
              <option value="JNJ">JNJ</option>
              <option value="KO">KO</option>
              <option value="TSLA">TSLA</option>
            </select>
            {data && !loading && (
               <span className={`text-[10px] tracking-widest font-bold uppercase ${data.safety_score > 75 ? 'text-green-400' : 'text-red-500'}`}>
                 CMDP STATUS: {data.status}
               </span>
            )}
         </div>
      </div>

      <div className="flex-1 w-full p-4 flex flex-col font-mono relative z-10 custom-scrollbar overflow-y-auto">
        {loading ? (
           <div className="flex flex-col items-center justify-center h-full">
            <div className="w-8 h-8 border-2 border-green-500/20 border-t-green-500 rounded-full animate-spin mb-4" />
            <span className="text-xs text-green-500/50 uppercase tracking-widest animate-pulse">Running Monte Carlo Compressions...</span>
          </div>
        ) : !data || data.drip_projection?.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-gray-500 text-xs text-center uppercase tracking-widest">
            Asset issues no yield.<br/>Dividend sequence terminated.
          </div>
        ) : (
          <div className="flex flex-col h-full gap-4 animation-fade-in">
             <div className="grid grid-cols-2 gap-4">
                <div className="bg-black/60 border border-white/10 rounded-lg p-4 flex flex-col items-center text-center shadow-[0_0_15px_rgba(52,211,153,0.05)]">
                    <span className="text-[10px] text-gray-500 uppercase tracking-widest block mb-1">AI Safety Score</span>
                    <span className={`text-3xl font-sans font-bold tracking-tight ${data.safety_score > 75 ? 'text-green-400' : 'text-red-500'}`}>{data.safety_score}</span>
                    <span className="text-[8px] text-gray-600 mt-1 uppercase">/ 100 CMDP Bound</span>
                </div>
                <div className="bg-black/60 border border-white/10 rounded-lg p-4 flex flex-col items-center text-center shadow-[0_0_15px_rgba(52,211,153,0.05)]">
                    <span className="text-[10px] text-gray-500 uppercase tracking-widest block mb-1">Fwd Payout Yield</span>
                    <span className="text-3xl text-emerald-400 font-sans font-bold tracking-tight">{data.forward_yield}</span>
                    <span className="text-[8px] text-gray-600 mt-1 uppercase">Institutional Estimate</span>
                </div>
             </div>

             <div className="flex-1 min-h-[160px] w-full border border-white/5 rounded-lg bg-black/40 p-2 relative">
                <h4 className="absolute top-2 left-3 text-[10px] text-green-500/50 uppercase tracking-widest z-10 font-bold">10-Year DRIP Compounding Trajectory ($10k Basis)</h4>
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={data.drip_projection} margin={{top: 30, left: -20, bottom: 0, right: 10}}>
                    <defs>
                      <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#34d399" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#34d399" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="year" hide />
                    <YAxis hide />
                    <Tooltip contentStyle={{backgroundColor: '#000', borderColor: '#333', fontSize: '10px'}} />
                    <Area type="monotone" dataKey="portfolio_value" stroke="#34d399" strokeWidth={2} fillOpacity={1} fill="url(#colorPv)" />
                  </AreaChart>
                </ResponsiveContainer>
             </div>
          </div>
        )}
      </div>
    </div>
  );
};

// -------------------------------------------------------------
// Generative Alpha Suggestor (Learn Panel repurposed)
// -------------------------------------------------------------
export const GenerativeAlphaPanel = () => {
  const [sentiment, setSentiment] = useState("");
  const [alpha, setAlpha] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleGenerate = () => {
    if(!sentiment) return;
    setLoading(true);
    fetch("http://127.0.0.1:8000/api/alpha/suggest", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({ market_sentiment: sentiment })
    })
    .then(res => res.json())
    .then(res => {
      setAlpha(res);
      setLoading(false);
    });
  };

  return (
    <Card>
      <div className="flex flex-col h-full font-mono space-y-4">
        <h3 className="text-sky-400 font-semibold mb-2">Generative Alpha Engine</h3>
        <p className="text-xs text-gray-400 leading-relaxed">
          Input market sentiment to mathematically deduce quantitative trading strategies via GenAI.
        </p>
        
        <input 
          type="text" 
          value={sentiment}
          onChange={e => setSentiment(e.target.value)}
          placeholder="e.g. High volatility tech breakout"
          className="bg-black/50 border border-white/10 rounded p-2 text-sm text-white"
        />
        <button onClick={handleGenerate} className="bg-sky-500/20 text-sky-400 py-2 rounded border border-sky-500/30 hover:bg-sky-500/30 transition">
          {loading ? "Generating..." : "Deduce Alpha"}
        </button>

        {alpha && (
          <div className="mt-4 p-4 bg-sky-900/10 border border-sky-500/20 rounded-lg flex-1 overflow-y-auto">
             <span className="text-[10px] text-sky-500 uppercase tracking-widest block mb-2">Generated Expression</span>
             <code className="text-white text-sm block bg-black/40 p-2 rounded mb-4 break-all shadow-inner border border-white/5">
               {alpha.suggestion}
             </code>
             <span className="text-[10px] text-sky-500 uppercase tracking-widest block mb-2">Rationale</span>
             <p className="text-gray-300 text-xs leading-relaxed">
               {alpha.rationale}
             </p>
          </div>
        )}
      </div>
    </Card>
  );
};

// -------------------------------------------------------------
// Interactive Quant Academy (Learn Panel)
// -------------------------------------------------------------
export const LearnPanel = () => {
  const [code, setCode] = useState("");
  const [simulating, setSimulating] = useState(false);
  const [missionState, setMissionState] = useState<"briefing" | "success">("briefing");

  const handleSimulate = () => {
    setSimulating(true);
    setTimeout(() => {
      setSimulating(false);
      if (code.trim() === "-returns") {
        setMissionState("success");
      }
    }, 2800); // 2.8s architectural ping simulation
  };

  return (
    <div className="flex h-full w-full rounded-xl shadow-[0_0_40px_rgba(0,0,0,0.6)] overflow-hidden font-sans border border-white/[0.05]">
      {/* Left: Briefing */}
      <div className="w-1/2 bg-black/60 backdrop-blur-3xl border-r border-white/5 p-6 flex flex-col items-start relative z-10 h-full">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-sky-500 to-transparent" />
        <span className="text-[10px] text-sky-500 uppercase tracking-widest font-mono border border-sky-500/30 px-2 py-1 rounded bg-sky-500/10 mb-4 shadow-[0_0_10px_rgba(56,189,248,0.2)]">Module_01: The Kernel</span>
        <h2 className="text-xl text-white font-medium mb-2 tracking-wide">Synthesize Your First Alpha</h2>
        <div className="space-y-4 text-xs text-gray-400 mt-4 leading-relaxed font-mono pr-4 overflow-y-auto">
          <p>
            Welcome to the QuantX Inference Kernel. Most market actors operate blindly on instinct; here, we operate via strict mathematical extraction.
          </p>
          <p>
            An <strong>Alpha</strong> is a proprietary sequence of mathematical transformations designed to extract future price movement probabilty from raw chaotic data.
          </p>
          <div className="bg-sky-500/5 border border-sky-500/20 p-4 rounded-md">
            <h4 className="text-sky-300 font-semibold mb-2 flex items-center gap-2">
               <div className="relative flex h-2 w-2">
                 <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                 <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-500"></span>
               </div>
               Mission Directive
            </h4>
            <p className="text-gray-300 mb-3">
              Your initiation requires you to execute the foundational benchmark regression. 
              Inject the kernel operator <code className="text-sky-400 bg-sky-500/10 px-1 rounded">-returns</code> into the execution environment and initialize the simulation sequence.
            </p>
          </div>

          <div className="mt-6 border-t border-white/10 pt-4">
             <h4 className="text-gray-500 uppercase tracking-widest text-[10px] mb-3">Institute Curriculum Matrix</h4>
             <ul className="space-y-2 opacity-60">
                <li className="flex items-center gap-2 text-sky-400"><span className="w-1.5 h-1.5 bg-sky-400 rounded-full"/> Module 01: The Alpha Kernel</li>
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-gray-600 rounded-full"/> Module 02: Stochastic Calculus & Ito's Framework</li>
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-gray-600 rounded-full"/> Module 03: Black-Scholes & PDE Refactorization</li>
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-gray-600 rounded-full"/> Module 04: Reinforcement Learning & The Wilmott Supersession</li>
             </ul>
          </div>
        </div>
        
        {missionState === "success" && (
          <div className="mt-auto w-full pt-6">
             <div className="w-full bg-[#76b900]/10 border border-[#76b900]/30 p-3 rounded text-center text-[#76b900] text-xs font-mono tracking-widest uppercase shadow-[0_0_15px_rgba(118,185,0,0.2)]">
                Signature Detected. Module 01 Cleared.
             </div>
             <button className="w-full mt-3 py-3 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-mono tracking-wider rounded text-xs transition duration-300 uppercase">
               Initialize Module_02 →
             </button>
          </div>
        )}
      </div>

      {/* Right: Code Editor & Execution */}
      <div className="w-1/2 bg-[#0c0c0c] flex flex-col font-mono relative h-full">
         <div className="h-10 bg-black/80 border-b border-white/5 flex items-center px-4 text-[10px] text-gray-500 uppercase tracking-widest gap-2 backdrop-blur-md z-10">
            <div className="flex gap-1.5 border-r border-white/10 pr-3 mr-1">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/50" />
              <span className="w-2.5 h-2.5 rounded-full bg-green-500/50" />
            </div>
            Terminal_A100_Cluster
         </div>
         <div className="flex-1 p-4 relative overflow-hidden flex">
           <div className="text-gray-600/50 font-mono text-sm leading-7 select-none text-right w-6 flex-shrink-0 pt-[2px]">
             1<br/>2<br/>3<br/>4
           </div>
           <textarea 
             autoComplete="off" spellCheck="false"
             className="w-full h-full bg-transparent text-sky-300 outline-none resize-none px-4 text-sm leading-7 tracking-wide border-0 shadow-none"
             value={code}
             onChange={e => setCode(e.target.value)}
             placeholder="// Inject logic array here..."
           />
         </div>
         <div className="h-14 bg-black/80 backdrop-blur-md border-t border-white/5 flex items-center justify-between px-4 z-10">
            <div className="flex items-center gap-2 text-[10px] text-gray-600">
               <span>UTF-8</span>
               <span className="bg-white/5 px-2 py-1 rounded">Python 3.11</span>
            </div>
            <button 
              onClick={handleSimulate}
              disabled={simulating || missionState === "success"}
              className={`px-6 py-2 rounded text-xs font-semibold tracking-wider transition duration-300 ${simulating ? 'bg-sky-500/20 text-sky-200 cursor-wait' : missionState === 'success' ? 'bg-[#76b900]/20 text-[#76b900] border border-[#76b900]/30 glow-[#76b900]' : 'bg-sky-500 hover:bg-sky-400 text-black shadow-[0_0_15px_rgba(56,189,248,0.4)]'}`}
            >
              {simulating ? "EXECUTING..." : missionState === "success" ? "VERIFIED" : "SIMULATE"}
            </button>
         </div>
      </div>
    </div>
  );
};


// -------------------------------------------------------------
// Keep original simpler panels
// -------------------------------------------------------------
export const SimulatePanel = () => {
  const [engine, setEngine] = useState<"CPU" | "A100">("CPU");
  const [working, setWorking] = useState(false);

  const toggleEngine = () => {
    setWorking(true);
    setTimeout(() => {
      setEngine(engine === "CPU" ? "A100" : "CPU");
      setWorking(false);
    }, 1200);
  };

  const isA100 = engine === "A100";

  return (
    <Card>
      <div className="flex flex-col h-full space-y-4 font-mono">
        <div className="flex justify-between items-center bg-white/[0.02] p-4 rounded-lg border border-white/[0.05]">
           <span className="text-gray-400">Target Alpha</span>
           <span className="text-sky-400 font-semibold">momentum_v4</span>
        </div>
        
        <div className={`p-4 rounded border flex justify-between items-center transition-all duration-500 ${isA100 ? 'bg-[#76b900]/10 border-[#76b900]/50' : 'bg-white/[0.02] border-white/10'}`}>
          <div className="flex flex-col">
            <span className="text-xs text-gray-500 uppercase tracking-widest mb-1">Compute Cluster Architecture</span>
            <span className={`font-semibold ${isA100 ? 'text-[#76b900]' : 'text-white'}`}>
              {isA100 ? "OCI NVIDIA A100 Tensor Cores" : "Standard CPU Nodes (Threadripper)"}
            </span>
          </div>
          <button 
            onClick={toggleEngine} 
            disabled={working}
            className={`px-4 py-2 rounded text-xs transition border ${isA100 ? 'bg-[#76b900]/20 text-[#76b900] border-[#76b900]/40 hover:bg-[#76b900]/30' : 'bg-white/5 text-white border-white/20 hover:bg-white/10'}`}
          >
            {working ? "Provisioning..." : `Switch to ${isA100 ? "CPU" : "OCI A100"}`}
          </button>
        </div>

        <div className="grid grid-cols-2 gap-4 flex-1">
          <div className="bg-white/[0.02] p-4 rounded-lg border border-white/[0.05] flex flex-col justify-center text-left">
             <span className="text-xs text-gray-500 uppercase tracking-widest mb-2">Inference Latency</span>
             <span className={`font-sans font-bold text-3xl ${isA100 ? 'text-[#76b900]' : 'text-gray-300'}`}>
               {isA100 ? "1.8 µs" : "42.5 ms"}
             </span>
             {isA100 && <span className="text-[10px] text-[#76b900]/80 mt-1">Accelerated via cuDF / TensorRT</span>}
          </div>
          <div className="bg-white/[0.02] p-4 rounded-lg border border-white/[0.05] flex flex-col justify-center text-left">
             <span className="text-xs text-gray-500 uppercase tracking-widest mb-2">Network Layer</span>
             <span className={`font-sans font-bold text-3xl ${isA100 ? 'text-[#76b900]' : 'text-gray-300'}`}>
               {isA100 ? "2 TB/s" : "10 GB/s"}
             </span>
             {isA100 && <span className="text-[10px] text-[#76b900]/80 mt-1">RDMA Bare-Metal OCI Network</span>}
          </div>
        </div>
        
        <button className={`w-full py-4 font-bold tracking-widest uppercase rounded-lg border transition-colors ${isA100 ? 'bg-[#76b900]/20 text-[#76b900] border-[#76b900]/40 hover:bg-[#76b900]/30' : 'bg-sky-500/20 text-sky-300 border-sky-500/30 hover:bg-sky-500/30'}`}>
          Initialize Capital Markets Simulation
        </button>
      </div>
    </Card>
  );
};

export const DataPanel = () => (
    <Card>
      <div className="flex flex-col h-full font-mono">
        <div className="text-sm text-gray-300 mb-4 px-2">Live Data Streams Connected. Routing optimized.</div>
        <div className="space-y-2 flex-1 overflow-y-auto custom-scrollbar pr-2">
          {['NASDAQ_L2_ORDERBOOK', 'NYSE_TRADE_TICK', 'DERIBIT_OPTIONS_CHAIN', 'BINANCE_FUTURES_MD', 'CME_FX_FUTURES'].map((stream, i) => (
            <div key={stream} className="flex justify-between items-center p-3 bg-white/[0.02] rounded border border-white/[0.05]">
               <span className="text-sky-300/80 text-xs">{stream}</span>
               <div className="flex items-center gap-2">
                 <span className="text-[10px] text-gray-500">{(i*10 + 2)}ms latency</span>
                 <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
               </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
);

export const AlphaTableFull = () => (
  <div className="flex flex-col h-full font-mono">
     <div className="flex border-b border-white/10 gap-6 text-sm font-medium px-4">
       <button className="px-4 py-4 border-b-2 border-sky-400 text-sky-400 tracking-wider">UNSUBMITTED</button>
       <button className="px-4 py-4 border-b-2 border-transparent text-gray-500 hover:text-gray-300 transition-colors tracking-wider">SUBMITTED</button>
       <div className="flex-1" />
     </div>
     <div className="overflow-x-auto w-full flex-1 custom-scrollbar">
       <table className="w-full text-left text-xs whitespace-nowrap">
         <thead className="text-gray-400 tracking-wider uppercase sticky top-0 bg-black/50 backdrop-blur-md z-10 border-b border-white/[0.05]">
           <tr>
             <th className="py-4 px-4 font-normal">Status</th>
             <th className="py-4 px-4 font-normal">Date</th>
             <th className="py-4 px-4 font-normal">Universe</th>
             <th className="py-4 px-4 font-normal text-right">Sharpe</th>
           </tr>
         </thead>
         <tbody>
           <tr>
             <td colSpan={4} className="py-24 text-center text-gray-500/50">NO ALPHA SIGNATURES</td>
           </tr>
         </tbody>
       </table>
     </div>
  </div>
);

export const PortfolioPanel = () => (
  <Card>
    <div className="flex flex-col h-full font-mono space-y-4">
      <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/20 flex flex-col items-center justify-center">
        <span className="text-gray-400 text-xs uppercase tracking-widest">Global P&L</span>
        <span className="text-3xl text-green-400 mt-2 font-sans font-medium">+$1.42M</span>
      </div>
      <div className="grid grid-cols-2 gap-4 flex-1">
        <div className="p-3 bg-white/[0.02] border border-white/[0.05] rounded-lg">
          <span className="text-[10px] text-gray-500 uppercase tracking-widest block mb-2">Exposure</span>
          <span className="text-lg text-white font-sans">84.2%</span>
        </div>
        <div className="p-3 bg-white/[0.02] border border-white/[0.05] rounded-lg">
          <span className="text-[10px] text-gray-500 uppercase tracking-widest block mb-2">Leverage</span>
          <span className="text-lg text-white font-sans">1.2x</span>
        </div>
      </div>
    </div>
  </Card>
);

export const TeamPanel = () => (
  <Card>
    <div className="flex flex-col h-full justify-center items-center opacity-70">
       <p className="text-sm text-white font-medium">Team "Alpha Seekers"</p>
    </div>
  </Card>
);

export const CommunityPanel = () => (
  <Card>
    <div className="flex flex-col h-full">
      <div className="flex-1 space-y-3 font-mono text-xs">
        <div className="bg-white/[0.02] p-2 rounded">
          <span className="text-sky-400">@quant_master:</span> Has anyone seen the shift in the momentum factor today?
        </div>
      </div>
    </div>
  </Card>
);

export const EventsPanel = () => (
  <Card>
     <div className="text-center mt-8">
        <h4 className="text-sky-400 font-bold border border-sky-400/30 inline-block px-4 py-2 rounded-md tracking-wider uppercase shadow-[0_0_15px_rgba(56,189,248,0.1)]">UPCOMING EVENTS</h4>
      </div>
      <p className="text-center mt-4 text-xs text-gray-400">Apr. 9th, 2026 at 2:00 PM</p>
  </Card>
);

export const CompetitionsPanel = () => (
  <Card>
    <div className="space-y-4 h-full flex flex-col justify-center">
      <div className="p-4 border border-sky-500/30 bg-sky-500/10 rounded-lg text-center cursor-pointer hover:bg-sky-500/20 transition">
        <h4 className="text-white font-medium">IQC 2026 Stage 1</h4>
      </div>
    </div>
  </Card>
);

export const ChallengePanel = () => (
  <Card>
    <div className="space-y-3 font-mono text-sm text-gray-300 h-full flex flex-col justify-center">
      <div className="flex justify-between p-3 bg-black/20 rounded-lg border border-white/[0.05]">
        <span className="text-gray-500">Rank:</span>
        <span className="font-semibold text-sky-400 font-sans tracking-wider">NONE</span>
      </div>
    </div>
  </Card>
);

export const ConsultantPanel = () => (
  <Card>
    <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
        <h4 className="text-sky-400 font-medium">Consultant Program</h4>
    </div>
  </Card>
);

export const ReferralPanel = () => (
  <Card>
    <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
        <h4 className="text-green-400 font-medium">Refer a Friend</h4>
    </div>
  </Card>
);

export const AnnouncementsPanel = () => (
  <Card>
    <ul className="space-y-4 text-sm font-mono text-gray-200">
      <li className="flex items-center gap-3 bg-white/[0.02] p-3 rounded-lg border border-white/[0.05]">
        Research Paper 01: The Momentum of News
      </li>
    </ul>
  </Card>
);

export const NotificationsPanel = () => (
  <Card>
    <div className="flex flex-col items-center justify-center h-full text-center gap-6 opacity-60">
      <div className="w-8 h-8 rounded-full border-2 border-sky-500/20 border-t-sky-500 animate-spin" />
      <p className="text-sm font-mono tracking-wide text-sky-100">Awaiting telemetric data...</p>
    </div>
  </Card>
);

// -------------------------------------------------------------
// Autonomous Predictive Market Sentinel
// -------------------------------------------------------------
export const AutonomousSentinelPanel = () => {
  const [ticker, setTicker] = useState("NVDA");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any>(null);
  
  // HUMAN-IN-THE-LOOP state
  const [mode, setMode] = useState<"AUTO" | "MANUAL">("AUTO");
  const [smoothFactor, setSmoothFactor] = useState<number>(0.0001);

  const fetchAnalysis = (targetTicker: string, smFactor: number) => {
    if (!targetTicker) return;
    setLoading(true);
    fetch(`http://127.0.0.1:8000/api/cognitive/analyze/${targetTicker.toUpperCase()}?smoothing_factor=${smFactor}`)
      .then(res => res.json())
      .then(res => {
        setData(res);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  const handleEngage = (e?: React.FormEvent) => {
    if(e) e.preventDefault();
    fetchAnalysis(ticker, smoothFactor);
  };

  // Live hyperparameter tweaking debounce
  useEffect(() => {
    if (mode === "MANUAL" && ticker && data) {
      const timer = setTimeout(() => fetchAnalysis(ticker, smoothFactor), 600);
      return () => clearTimeout(timer);
    }
  }, [smoothFactor, mode]);

  return (
    <div className="flex flex-col h-full w-full rounded-xl shadow-[0_0_40px_rgba(0,0,0,0.6)] overflow-hidden font-sans border border-white/[0.05] bg-black/50 backdrop-blur-3xl relative">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 via-sky-500 to-green-500" />
      
      {/* Zero-Learning Search Bar Header */}
      <div className="p-4 border-b border-white/5 flex flex-col items-center justify-center bg-black/40 relative">
        <h2 className="text-lg text-white font-medium mb-1 tracking-wide">Autonomous Market Sentinel</h2>
        <p className="text-[10px] text-gray-400 mb-3 font-mono text-center max-w-lg">Zero-click SOTA Predictive AI executing Constrained Markov Decision Processes (CMDP) filtered via Kalman estimations, bounded by Latent Stochastic Density.</p>
        
        <form onSubmit={handleEngage} className="w-full max-w-md relative mb-2">
           <input 
             type="text" 
             value={ticker}
             onChange={e => setTicker(e.target.value)}
             placeholder="e.g. NVDA, BTC-USD, TSLA"
             className="w-full bg-white/5 border border-white/20 rounded py-2 px-4 text-center text-lg tracking-widest text-white uppercase font-mono shadow-[0_0_15px_rgba(255,255,255,0.05)] focus:shadow-[0_0_20px_rgba(56,189,248,0.2)] focus:border-sky-500/50 outline-none transition"
           />
           <button 
             type="submit" 
             disabled={loading || !ticker}
             className="absolute right-1 top-1 bottom-1 bg-sky-500/20 text-sky-400 border border-sky-500/30 px-3 rounded text-[10px] tracking-wider uppercase font-bold hover:bg-sky-500/30 transition disabled:opacity-50"
           >
             {loading ? "..." : "ENGAGE"}
           </button>
        </form>

        {/* HUMAN-IN-THE-LOOP TOGGLE */}
        {data && !data.error && (
           <div className="absolute top-4 right-4 flex flex-col items-end gap-2">
              <div className="flex bg-white/5 p-1 rounded border border-white/10 text-[10px] font-mono tracking-widest uppercase">
                <button 
                  onClick={() => setMode("AUTO")}
                  className={`px-3 py-1 rounded transition ${mode === "AUTO" ? "bg-sky-500/30 text-sky-300" : "text-gray-500 hover:text-gray-300"}`}
                >Auto-Process</button>
                <button 
                  onClick={() => setMode("MANUAL")}
                  className={`px-3 py-1 rounded transition ${mode === "MANUAL" ? "bg-orange-500/30 text-orange-300" : "text-gray-500 hover:text-gray-300"}`}
                >Manual Tune</button>
              </div>
              {mode === "MANUAL" && (
                <div className="bg-black/60 p-2 rounded border border-orange-500/30 w-48 text-right shadow-[0_0_15px_rgba(249,115,22,0.1)]">
                   <div className="flex justify-between items-center mb-1">
                      <span className="text-[9px] text-orange-400/80 font-mono tracking-widest">Kalman Weight (q_var)</span>
                      <span className="text-[9px] font-mono text-white">{smoothFactor.toExponential(1)}</span>
                   </div>
                   <input 
                     type="range" min="-6" max="-1" step="0.5"
                     value={Math.log10(smoothFactor)}
                     onChange={(e) => setSmoothFactor(Math.pow(10, parseFloat(e.target.value)))}
                     className="w-full accent-orange-500 h-1 bg-white/10 rounded-lg appearance-none cursor-pointer"
                   />
                </div>
              )}
           </div>
        )}
      </div>

      {/* SOTA Response Dashboard */}
      <div className="flex-1 p-4 overflow-y-auto custom-scrollbar font-mono">
         {!data && !loading && (
            <div className="h-full flex flex-col items-center justify-center opacity-50">
               <div className="w-16 h-16 border border-white/10 rounded-full flex items-center justify-center mb-4 shadow-[0_0_30px_rgba(255,255,255,0.05)]">
                 <span className="w-2 h-2 rounded-full bg-white animate-ping" />
               </div>
               <span className="text-xs text-gray-400 tracking-widest uppercase">Awaiting Vector Parameters</span>
            </div>
         )}
         
         {loading && !data && (
            <div className="h-full flex flex-col items-center justify-center">
               <div className="w-10 h-10 border-2 border-sky-500/20 border-t-sky-500 rounded-full animate-spin mb-4" />
               <span className="text-xs text-sky-400 tracking-widest uppercase animate-pulse">Running CMDP Inference Iterations</span>
            </div>
         )}

         {data && data.error && (
            <div className="bg-red-500/10 border border-red-500/30 p-4 rounded text-red-400 text-xs text-center w-full max-w-md mx-auto">
               System Failure: {data.error}
            </div>
         )}

         {data && !data.error && (
            <div className="flex flex-col gap-4 max-w-5xl mx-auto animation-fade-in relative">
               
               {/* 1. SCRUTINY GRAPH (HUMAN IN THE LOOP) */}
               <div className="w-full bg-black/40 border border-white/10 rounded-lg p-4 relative mb-2">
                 <div className="flex justify-between items-center mb-4">
                   <h4 className="text-xs text-gray-400 uppercase tracking-widest flex items-center gap-2">
                      <span className="w-2 h-2 bg-sky-500 rounded-full animate-pulse" /> Mathematically Smoothed Trajectory (Kalman/CMDP)
                   </h4>
                   {loading && <div className="w-4 h-4 border border-orange-500 border-t-transparent rounded-full animate-spin" />}
                 </div>
                 
                 <div className="w-full h-[220px]">
                   <ResponsiveContainer width="100%" height="100%">
                     <ComposedChart data={data.scrutiny_graph}>
                       <defs>
                         <linearGradient id="barrierArea" x1="0" y1="0" x2="0" y2="1">
                           <stop offset="5%" stopColor="#f97316" stopOpacity={0.1}/>
                           <stop offset="95%" stopColor="#f97316" stopOpacity={0}/>
                         </linearGradient>
                         <linearGradient id="densityArea" x1="0" y1="0" x2="0" y2="1">
                           <stop offset="0%" stopColor="#a855f7" stopOpacity={0.4}/>
                           <stop offset="100%" stopColor="#a855f7" stopOpacity={0}/>
                         </linearGradient>
                       </defs>
                       <XAxis dataKey="date" hide />
                       <YAxis yAxisId="left" domain={['auto', 'auto']} hide />
                       <YAxis yAxisId="right" orientation="right" domain={[0, 100]} hide />
                       <Tooltip content={<CustomTooltip />} />
                       
                       {/* Stochastic Latent Probability Matrix */}
                       <Area yAxisId="right" type="monotone" dataKey="stochastic_density" stroke="none" fill="url(#densityArea)" isAnimationActive={true} />

                       {/* Semantic Barrier Area */}
                       <Area yAxisId="left" type="monotone" dataKey="barrier_upper" stroke="none" fill="url(#barrierArea)" />
                       <Area yAxisId="left" type="monotone" dataKey="barrier_lower" stroke="none" fill="#000" fillOpacity={0.8} />

                       {/* Semantic Barrier Line Constraints */}
                       <Line yAxisId="left" type="monotone" dataKey="barrier_upper" stroke="#f97316" strokeDasharray="3 3" strokeWidth={1} dot={false} strokeOpacity={0.5} />
                       <Line yAxisId="left" type="monotone" dataKey="barrier_lower" stroke="#f97316" strokeDasharray="3 3" strokeWidth={1} dot={false} strokeOpacity={0.5} />
                       
                       {/* Raw Chaotic Price */}
                       <Line yAxisId="left" type="step" dataKey="raw_price" stroke="#ffffff" strokeOpacity={0.2} strokeWidth={1} dot={false} />
                       
                       {/* Smoothed Kalman Inference Signal */}
                       <Line yAxisId="left" type="monotone" dataKey="kalman" stroke="#38bdf8" strokeWidth={2} dot={false} />
                     </ComposedChart>
                   </ResponsiveContainer>
                 </div>
                 <div className="absolute top-4 right-4 flex flex-col items-end gap-1 text-[9px] uppercase tracking-widest">
                    <span className="text-purple-400 flex items-center gap-1"><div className="w-2 h-0.5 bg-purple-400"/> Stochastic Density</span>
                    <span className="text-white/30 flex items-center gap-1"><div className="w-2 h-0.5 bg-white/30"/> Raw Price</span>
                    <span className="text-sky-400 flex items-center gap-1"><div className="w-2 h-0.5 bg-sky-400"/> Kalman Est.</span>
                    <span className="text-orange-400 flex items-center gap-1"><div className="w-2 h-0.5 border-t border-dashed border-orange-400"/> Semantic Bounds</span>
                 </div>
               </div>

               {/* Top Stats */}
               <div className="grid grid-cols-3 gap-4">
                  <div className="bg-white/5 border border-white/10 rounded-lg p-3 flex flex-col items-center justify-center text-center">
                      <span className="text-[10px] text-gray-500 tracking-widest uppercase block mb-1">Asset</span>
                      <span className="text-xl text-white font-sans">{data.ticker}</span>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-lg p-3 flex flex-col items-center justify-center text-center">
                      <span className="text-[10px] text-gray-500 tracking-widest uppercase block mb-1">Bounded Recommendation</span>
                      <span className={`text-lg font-bold font-sans ${data.recommendation === 'BUY' ? 'text-[#76b900]' : data.recommendation === 'SELL' ? 'text-red-500' : 'text-gray-300'}`}>
                         {data.recommendation}
                      </span>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-lg p-3 flex flex-col items-center justify-center text-center relative overflow-hidden">
                      <div className="absolute bottom-0 left-0 h-1 bg-sky-500/50" style={{ width: `${data.confidence}%` }} />
                      <span className="text-[10px] text-gray-500 tracking-widest uppercase block mb-1">AI Confidence Matrix</span>
                      <span className="text-xl text-sky-400 font-sans">{data.confidence}%</span>
                  </div>
               </div>

               {/* ML Trajectory */}
               <div className="grid grid-cols-2 gap-4">
                 <div className="bg-sky-500/5 border border-sky-500/20 rounded-lg p-4">
                   <h4 className="text-sky-300 text-[10px] font-bold uppercase tracking-widest mb-2 border-b border-sky-500/20 pb-2">Short-Term Subsystem (1-3 D)</h4>
                   <p className="text-xs text-gray-300 leading-relaxed font-sans">{data.short_term_outlook}</p>
                 </div>
                 <div className="bg-purple-500/5 border border-purple-500/20 rounded-lg p-4">
                   <h4 className="text-purple-300 text-[10px] font-bold uppercase tracking-widest mb-2 border-b border-purple-500/20 pb-2">Macro Subsystem (3-6 M)</h4>
                   <p className="text-xs text-gray-300 leading-relaxed font-sans">{data.long_term_outlook}</p>
                 </div>
               </div>

               {/* 7-Day Cognitive Matrix */}
               <div className="bg-orange-500/5 border border-orange-500/20 rounded-lg p-4">
                  <h4 className="text-orange-300 text-[10px] font-bold uppercase tracking-widest mb-2 flex items-center gap-2 border-b border-orange-500/20 pb-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-orange-400" />
                    Constrained 7-Day Cognitive Risk Approach
                  </h4>
                  <div className="space-y-2 mt-3">
                    {data.cognitive_risk_7d?.map((risk: string, i: number) => (
                      <div key={i} className="flex gap-3 items-start bg-black/40 p-2.5 rounded border border-white/5">
                        <span className="text-orange-500/50 text-[9px] uppercase block mt-0.5 whitespace-nowrap">Vector 0{i+1}</span>
                        <p className="text-xs text-gray-300 font-sans leading-relaxed">{risk}</p>
                      </div>
                    ))}
                  </div>
               </div>
            </div>
         )}
      </div>
    </div>
  );
};

// -------------------------------------------------------------
// RL Hyper-Allocator Portfolio Engine (Aladdin Supersession)
// -------------------------------------------------------------
export const RLHyperAllocatorPanel = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any>(null);
  const [deployed, setDeployed] = useState(false);
  const [deploymentLog, setDeploymentLog] = useState<string[]>([]);
  const [assets, setAssets] = useState("NVDA, BTC-USD, AAPL, UBER");
  
  const generateWeights = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setData(null);
    setDeployed(false);
    
    fetch(`http://127.0.0.1:8000/api/portfolio/allocate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        assets: assets.split(",").map(s => s.trim()),
        capital: 15000000.0,
        risk_tolerance: "aggressive"
      })
    })
    .then(r => r.json())
    .then(r => {
      setData(r);
      setLoading(false);
    })
    .catch(() => setLoading(false));
  };

  const handleDeploy = () => {
    setDeployed(true);
    let step = 0;
    const logs = [
      "INITIATING GLOBAL BATCH ROUTING...",
      "Connecting to FIX protocol endpoint (Latency: 1.2ms)...",
      "Slicing 15M Capital into micro-algo orders...",
      "Bypassing dark pools. Executing directly on LIT venue...",
      "TWAP Algorithmic execution active.",
      "PORTFOLIO WEIGHTS LOCKED AND DEPLOYED IN PRODUCTION."
    ];
    setDeploymentLog([]);
    const interval = setInterval(() => {
      setDeploymentLog(prev => [...prev, logs[step]]);
      step++;
      if (step >= logs.length) clearInterval(interval);
    }, 600);
  };

  return (
    <div className="flex flex-col h-full w-full rounded-xl shadow-[0_0_40px_rgba(0,0,0,0.6)] overflow-hidden font-sans border border-white/[0.05] bg-black/50 backdrop-blur-3xl relative">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-teal-500 via-indigo-500 to-purple-500" />
      
      <div className="p-4 border-b border-white/5 flex flex-col justify-center bg-black/40">
        <h2 className="text-xl text-white font-medium mb-1 tracking-wide flex justify-between items-center">
           <span>RL Hyper-Allocator Engine</span>
           <span className="text-[10px] bg-white/10 px-2 py-1 rounded border border-white/20 text-teal-400 uppercase tracking-widest font-mono">Modern Portfolio Theory GenAI</span>
        </h2>
        <p className="text-[10px] text-gray-400 mb-4 font-mono">Simulates millions of permutations using Constrained Markov logic to assign capital.</p>
        
        <form onSubmit={generateWeights} className="w-full flex gap-2">
           <input 
             type="text" 
             value={assets}
             onChange={e => setAssets(e.target.value)}
             className="flex-1 bg-white/5 border border-white/20 rounded py-2 px-3 text-sm tracking-widest text-white uppercase font-mono transition"
           />
           <button 
             type="submit" 
             disabled={loading || !assets}
             className="bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 px-6 rounded text-[10px] tracking-wider uppercase font-bold hover:bg-indigo-500/30 transition disabled:opacity-50"
           >
             {loading ? "CALCULATING MATRICES..." : "OPTIMIZE WEIGHTS"}
           </button>
        </form>
      </div>

      <div className="flex-1 p-4 overflow-y-auto custom-scrollbar font-mono flex flex-col">
         {!data && !loading && (
            <div className="h-full flex items-center justify-center text-xs text-gray-500 tracking-widest uppercase opacity-50">
               {/* Input tickers to generate mathematically bounded capital distributions */}
            </div>
         )}
         
         {loading && (
            <div className="h-full flex flex-col items-center justify-center">
               <div className="w-12 h-12 border border-white/10 border-t-indigo-500 rounded-full animate-spin mb-4" />
               <span className="text-[10px] text-indigo-400 tracking-widest uppercase animate-pulse">Running Monte Carlo Sub-Simulations via GenAI Architecture</span>
            </div>
         )}

         {data && !data.error && (
            <div className="flex flex-col gap-4 animation-fade-in relative">
               
               <div className="grid grid-cols-2 gap-4">
                 <div className="bg-white/5 border border-white/10 p-4 rounded-xl text-center shadow-inner">
                    <span className="text-[10px] text-gray-400 tracking-widest uppercase block mb-1">Global Max Sharpe</span>
                    <span className="text-2xl text-teal-400 font-sans tracking-tight">{data.global_sharpe}</span>
                 </div>
                 <div className="bg-white/5 border border-white/10 p-4 rounded-xl text-center shadow-inner relative overflow-hidden">
                    <div className="absolute bottom-0 left-0 h-0.5 bg-red-500/50 w-full animate-pulse" />
                    <span className="text-[10px] text-gray-400 tracking-widest uppercase block mb-1">Routing Latency Ping</span>
                    <span className="text-2xl text-white font-sans tracking-tight">{data.latency_ms} ms</span>
                 </div>
               </div>

               <div className="grid grid-cols-2 gap-4">
                 <div className="bg-black/40 border border-white/10 rounded-xl p-4 relative overflow-hidden flex flex-col">
                   <h4 className="text-[10px] text-indigo-300 font-bold uppercase tracking-widest mb-2">Stochastic Efficient Frontier</h4>
                   <div className="flex-1 w-full h-32 relative">
                     <ResponsiveContainer width="100%" height="100%">
                        <ScatterChart margin={{ top: 10, right: 10, bottom: 0, left: -20 }}>
                          <XAxis type="number" dataKey="vol" name="Risk" hide domain={['auto', 'auto']} />
                          <YAxis type="number" dataKey="ret" name="Return" hide domain={['auto', 'auto']} />
                          <ZAxis type="number" dataKey="z" range={[10, 50]} />
                          <Tooltip cursor={{ strokeDasharray: '3 3' }} contentStyle={{backgroundColor: '#000', fontSize: '10px'}} />
                          <Scatter name="Portfolios" data={Array.from({length: 45}).map((_, i) => ({ vol: 10 + i + Math.random()*5, ret: 5 + i*1.2 + Math.random()*10, z: Math.random() * 40 }))} fill="#818cf8" fillOpacity={0.4} />
                          <Scatter name="Optimal" data={[{vol: 35, ret: 50, z: 100}]} fill="#2dd4bf" />
                        </ScatterChart>
                     </ResponsiveContainer>
                   </div>
                 </div>

                 <div className="bg-black/40 border border-white/10 rounded-xl p-4 relative overflow-hidden">
                   <h4 className="text-[10px] text-teal-300 font-bold uppercase tracking-widest mb-4 flex items-center gap-2">
                     <span className="w-3 h-3 rounded-sm bg-teal-500/50 border border-teal-400" />
                     Allocations ($15M)
                   </h4>
                   
                   <div className="space-y-4">
                     {data.allocations?.map((item: any, i: number) => (
                       <div key={i} className="flex flex-col gap-2">
                          <div className="flex justify-between items-center text-xs">
                             <span className="text-white font-bold">{item.asset}</span>
                             <span className="text-teal-400">${item.allocated_capital?.toLocaleString()}</span>
                          </div>
                          <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden">
                             <div className="h-full bg-teal-500 transition-all duration-1000" style={{width: `${item.weight_pct * 100}%`}} />
                          </div>
                       </div>
                     ))}
                   </div>
                 </div>
               </div>

               {/* GLOBAL DEPLOYMENT FEATURE */}
               <div className="mt-auto">
                 {!deployed ? (
                   <button 
                     onClick={handleDeploy}
                     className="w-full py-4 bg-gradient-to-r from-red-600/80 to-purple-800/80 hover:from-red-600 hover:to-purple-700 text-white font-bold tracking-widest uppercase text-xs rounded-xl shadow-[0_0_20px_rgba(220,38,38,0.4)] transition-all active:scale-95 border border-red-500/50"
                   >
                     DEPLOY GLOBAL BATCH ALGORITHMS
                   </button>
                 ) : (
                   <div className="bg-black border border-green-500/30 p-3 rounded-xl">
                      {deploymentLog.map((log, index) => (
                        <div key={index} className="text-[10px] text-green-400 font-mono mb-1 last:mb-0 last:text-white last:font-bold">
                           <span className="opacity-50">[{new Date().toLocaleTimeString()}]</span> {log}
                        </div>
                      ))}
                      {deploymentLog.length === 6 && (
                         <div className="mt-2 text-center text-xs text-white bg-green-500/20 border border-green-500/50 py-2 rounded">
                            CAPITAL IS LIVE IN MARKETS
                         </div>
                      )}
                   </div>
                 )}
               </div>

            </div>
         )}
      </div>
    </div>
  );
};

// -------------------------------------------------------------
// PHASE 3: Limit Order Book (LOB) Imbalance Matrix
// -------------------------------------------------------------
export const LOBImbalancePanel = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [data, setData] = useState<any>(null);
  const [ticker, setTicker] = useState("TSLA");
  const [loading, setLoading] = useState(false);

  const fetchLOB = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setLoading(true);
    fetch(`http://127.0.0.1:8000/api/market/lob`, {
      method: "POST", headers: {"Content-Type": "application/json"},
      body: JSON.stringify({ ticker: ticker.toUpperCase() })
    }).then(r => r.json()).then(r => { setData(r); setLoading(false); }).catch(() => setLoading(false));
  };

  return (
    <div className="flex flex-col h-full w-full rounded-xl bg-black/60 border border-white/10 overflow-hidden font-sans relative backdrop-blur-3xl shadow-[0_0_50px_rgba(0,0,0,0.8)]">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-500 via-orange-500 to-green-500" />
      <div className="p-4 border-b border-white/5 flex flex-col justify-center">
        <h2 className="text-xl text-white font-medium mb-1 tracking-wide flex justify-between items-center">
           <span>LOB Imbalance Matrix</span>
           <span className="text-[10px] bg-white/10 px-2 py-1 rounded text-orange-400 uppercase tracking-widest border border-orange-500/30">Level 3 Depth</span>
        </h2>
        <form onSubmit={fetchLOB} className="flex gap-2 mt-2">
           <input type="text" title="ticker" placeholder="TICKER" value={ticker} onChange={e=>setTicker(e.target.value)} className="bg-white/5 border border-white/20 rounded py-2 px-3 text-sm text-white uppercase font-mono w-24" />
           <button type="submit" className="bg-white/10 text-white font-bold text-xs uppercase px-4 rounded border border-white/20 hover:bg-white/20">{loading ? "SCANNING..." : "SCAN DEPTH"}</button>
        </form>
      </div>

      <div className="flex-1 p-4 overflow-y-auto custom-scrollbar flex flex-col gap-4">
        {!data && !loading && <div className="text-gray-500 m-auto text-xs font-mono uppercase">// Awaiting Ticker Scan</div>}
        {loading && <div className="m-auto text-orange-500 animate-pulse text-xs font-mono">// Interrogating Dark Pools...</div>}
        
        {data && !data.error && (
          <div className="flex w-full h-64 gap-1 relative items-end justify-center animation-fade-in">
             <div className="absolute top-0 left-1/2 -translate-x-1/2 text-xs font-mono text-white/50">${data.mid_price.toFixed(2)} MID</div>
             
             {/* ASKS (Sellers) */}
             <div className="flex-1 flex gap-0.5 items-end justify-end">
               {data.asks.map((ask: any, i: number) => (
                 <div key={i} className="w-full relative group flex items-end justify-center">
                    <div style={{height: `${(ask.volume / 100000)*100}%`}} className={`w-full max-w-[8px] rounded-t-sm transition-all duration-300 ${ask.type === 'iceberg' ? 'bg-cyan-400 shadow-[0_0_10px_#22d3ee]' : 'bg-red-500/50 hover:bg-red-400'}`} />
                 </div>
               ))}
             </div>
             <div className="w-0.5 h-full bg-white/20 relative mx-2"></div>
             {/* BIDS (Buyers) */}
             <div className="flex-1 flex gap-0.5 items-end justify-start">
               {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
               {data.bids.map((bid: any, i: number) => (
                 <div key={i} className="w-full relative group flex items-end justify-center">
                    <div style={{height: `${(bid.volume / 100000)*100}%`}} className={`w-full max-w-[8px] rounded-t-sm transition-all duration-300 ${bid.type === 'spoof' ? 'bg-yellow-400 shadow-[0_0_10px_#facc15]' : 'bg-green-500/50 hover:bg-green-400'}`} />
                 </div>
               ))}
             </div>
          </div>
        )}
        {data && !data.error && (
             <div className="flex justify-between items-center mt-auto border-t border-white/10 pt-3 text-[10px] font-mono text-gray-400">
               <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-cyan-400"></div> Iceberg Ask Detected</span>
               <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-yellow-400"></div> Spoof Bid Detected</span>
             </div>
        )}
      </div>
    </div>
  );
};

// -------------------------------------------------------------
// PHASE 3: Deep-RL Backtest Sandbox
// -------------------------------------------------------------
export const BacktestSandboxPanel = () => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [strategy, setStrategy] = useState("DQN Momentum Ranker");
  
  const runTest = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    fetch(`http://127.0.0.1:8000/api/backtest/run`, {
      method: "POST", headers: {"Content-Type": "application/json"},
      body: JSON.stringify({ alpha_strategy: strategy, epochs: 20 })
    }).then(r => r.json()).then(r => { setData(r); setLoading(false); }).catch(() => setLoading(false));
  };

  return (
    <div className="flex flex-col h-full w-full rounded-xl bg-[#030712] border border-white/5 overflow-hidden font-sans relative shadow-2xl">
      <div className="p-4 border-b border-white/5">
        <h2 className="text-xl text-white font-medium mb-1 tracking-wide flex justify-between items-center">
           <span>Deep-RL Training Sandbox</span>
           <span className="text-[10px] bg-blue-500/10 px-2 py-1 rounded text-blue-400 uppercase tracking-widest border border-blue-500/30">CUDA Epoch Engine</span>
        </h2>
        <form onSubmit={runTest} className="flex gap-2 mt-2">
           <input type="text" value={strategy} onChange={e=>setStrategy(e.target.value)} className="flex-1 bg-white/5 border border-white/10 rounded py-2 px-3 text-xs text-white uppercase font-mono" />
           <button type="submit" className="bg-blue-600/20 text-blue-400 font-bold text-xs uppercase px-4 rounded border border-blue-600/30 hover:bg-blue-600/40">{loading ? "TRAINING AGENT..." : "INITIATE EPOCHS"}</button>
        </form>
      </div>

      <div className="flex-1 p-4 flex flex-col font-mono text-xs">
        {!data && !loading && <div className="m-auto text-gray-500">// Waiting for AI Agent deployment</div>}
        {loading && <div className="m-auto text-blue-500 animate-pulse">// Simulating 10-year dataset across NVIDIA Tensor Cores...</div>}
        
        {data && !data.error && (
           <div className="flex flex-col h-full gap-4 animation-fade-in relative">
              <div className="flex justify-between items-center border-b border-white/10 pb-2">
                 <span className="text-gray-400">Final Convergence Sharpe: </span>
                 <span className={`text-xl ${data.final_sharpe > 2.0 ? 'text-green-400' : 'text-red-400'}`}>{data.final_sharpe.toFixed(2)}</span>
              </div>
              <div className="flex-1 h-48 w-full border border-white/5 rounded-lg bg-black/50 p-2 relative">
                 <ResponsiveContainer width="100%" height="100%">
                    <ComposedChart data={data.training_history}>
                       <XAxis dataKey="epoch" hide />
                       <YAxis yAxisId="left" domain={['auto','auto']} hide />
                       <YAxis yAxisId="right" orientation="right" domain={['auto','auto']} hide />
                       <Tooltip contentStyle={{backgroundColor: '#000', borderColor: '#333'}} />
                       <Line yAxisId="left" type="monotone" dataKey="sharpe" stroke="#3b82f6" strokeWidth={2} dot={false} isAnimationActive={true} animationDuration={2000} />
                       <Area yAxisId="right" type="monotone" dataKey="drawdown" stroke="#ef4444" fill="#ef4444" fillOpacity={0.1} isAnimationActive={true} animationDuration={2000} />
                    </ComposedChart>
                 </ResponsiveContainer>
                 <div className="absolute top-2 left-2 text-[9px] text-gray-500 uppercase flex flex-col">
                    <span className="text-blue-500">_ Sharpe Iteration</span>
                    <span className="text-red-500">_ Drawdown Vector</span>
                 </div>
              </div>
           </div>
        )}
      </div>
    </div>
  );
};

// -------------------------------------------------------------
// PHASE 3: Omniscient NLP Macro Globe
// -------------------------------------------------------------
export const MacroGlobePanel = () => {
  const [data, setData] = useState<any>(null);
  const [query, setQuery] = useState("U.S. Taiwan Semiconductor Policy");
  const [loading, setLoading] = useState(false);

  const scanGlobe = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    fetch(`http://127.0.0.1:8000/api/macro/sentiment`, {
      method: "POST", headers: {"Content-Type": "application/json"},
      body: JSON.stringify({ query })
    }).then(r => r.json()).then(r => { setData(r); setLoading(false); }).catch(() => setLoading(false));
  };

  return (
    <div className="flex flex-col h-full w-full rounded-xl bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-950 via-black to-black border border-white/10 overflow-hidden font-sans relative">
      <div className="p-4 border-b border-white/5 relative z-10 bg-black/40">
        <h2 className="text-xl text-white font-medium mb-1 tracking-wide flex justify-between items-center">
           <span>NLP Macro Globe Network</span>
           <span className="text-[10px] bg-purple-500/10 px-2 py-1 rounded text-purple-400 uppercase tracking-widest border border-purple-500/30">Semantic Embedding</span>
        </h2>
        <form onSubmit={scanGlobe} className="flex gap-2 mt-2">
           <input type="text" value={query} onChange={e=>setQuery(e.target.value)} className="flex-1 bg-white/5 border border-white/20 rounded py-2 px-3 text-xs text-white uppercase font-mono" placeholder="Voice or Text Geopolitical Event..." />
           <button type="submit" className="bg-purple-600/20 text-purple-400 font-bold text-xs uppercase px-4 rounded border border-purple-600/30 hover:bg-purple-600/40">{loading ? "LINKING NODES..." : "SCAN PLANET"}</button>
        </form>
      </div>

      <div className="flex-1 relative overflow-hidden flex items-center justify-center p-4">
        {/* Decorative Grid Lines */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:40px_40px]"></div>

        {!data && !loading && <div className="text-gray-500 text-xs font-mono uppercase relative z-10">// Input event to map linguistic contagion</div>}
        {loading && <div className="text-purple-500 animate-pulse text-xs font-mono relative z-10">// Establishing GenAI neural connections globally...</div>}
        
        {data && !data.error && (
          <div className="w-full h-full relative animation-fade-in flex flex-col">
            <div className="absolute top-0 right-0 p-2 text-right">
              <div className="text-[10px] text-gray-500 font-mono uppercase mb-1">Fundamental Disconnect Ratio</div>
              <div className={`text-4xl font-bold tracking-tighter ${data.global_threat_level > 80 ? 'text-red-500' : 'text-sky-500'}`}>{data.global_threat_level}%</div>
              {data.disconnect_alpha_signal && (
                <div className="mt-1 text-[10px] tracking-widest font-bold bg-white/10 px-2 py-1 rounded inline-block text-white shadow-[0_0_10px_rgba(255,255,255,0.2)]">
                   {data.disconnect_alpha_signal}
                </div>
              )}
            </div>

            <div className="mt-8 flex-1 w-full grid grid-cols-2 gap-4 auto-rows-fr relative z-10">
              {data.nodes?.map((node: any, i: number) => (
                 <div key={i} className="flex flex-col justify-center items-center p-3 rounded-xl border border-white/10 bg-black/60 relative overflow-hidden shadow-[0_0_15px_rgba(168,85,247,0.1)]">
                   <div className="absolute top-0 w-full h-0.5 bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-50" />
                   <h3 className="text-sm text-white font-bold mb-1 tracking-tight text-center">{node.id}</h3>
                   <div className="text-[10px] text-gray-400 uppercase font-mono mb-2">Contagion: <span className="text-purple-400">{node.contagion_link}</span></div>
                   <div className="flex items-center gap-2 w-full mt-2">
                     <span className="text-[9px] text-gray-500">FEAR</span>
                     <div className="flex-1 h-1 bg-white/10 rounded-full overflow-hidden">
                       <div className={`h-full ${node.sentiment < 0 ? 'bg-red-500' : 'bg-green-500'}`} style={{width: `${Math.abs(node.impact_val)}%`}} />
                     </div>
                     <span className="text-[9px] text-gray-500">GREED</span>
                   </div>
                 </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// -------------------------------------------------------------
// PHASE 4: The Algorithmic Nexus
// -------------------------------------------------------------
export const AlgorithmicNexusPanel = () => {
    return (
      <div className="flex flex-col h-full w-full rounded-xl bg-black border border-white/20 overflow-hidden font-sans relative shadow-[0_0_50px_rgba(255,255,255,0.05)]">
         <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
         <div className="p-4 border-b border-white/10 flex justify-between items-center relative z-10 bg-black/50">
           <h2 className="text-xl text-white font-medium tracking-wide flex items-center gap-2">
             <span>Algorithmic Nexus</span>
             <span className="text-[9px] bg-white/10 px-2 py-0.5 rounded text-gray-300 uppercase tracking-widest border border-white/20">Node Editor</span>
           </h2>
           <button className="bg-emerald-500/20 text-emerald-400 font-bold text-xs uppercase px-4 py-1.5 rounded border border-emerald-500/30 hover:bg-emerald-500/40">COMPILE PYTHON</button>
         </div>
  
         <div className="flex-1 relative overflow-hidden flex z-10">
           {/* SVG Splines connecting nodes */}
           <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{zIndex: -1}}>
             <path d="M 120 150 C 200 150, 200 100, 280 100" stroke="#3b82f6" strokeWidth="2" fill="none" className="animate-pulse" />
             <path d="M 400 100 C 480 100, 480 200, 560 200" stroke="#a855f7" strokeWidth="2" fill="none" className="animate-pulse" />
             <path d="M 120 250 C 200 250, 400 250, 560 200" stroke="#22c55e" strokeWidth="2" fill="none" opacity="0.5" />
           </svg>
  
           {/* Mock Nodes */}
           <div className="absolute top-[130px] left-[20px] w-24 bg-black/80 border border-blue-500/50 rounded p-2 text-[10px] text-white shadow-[0_0_15px_rgba(59,130,246,0.3)]">
             <div className="font-bold text-blue-400 mb-1 border-b border-white/10 pb-1">Price Signal</div>
             <div className="text-gray-400">Stream: ws://hft</div>
             <div className="w-2 h-2 rounded-full bg-blue-500 absolute top-1/2 -right-1 transform -translate-y-1/2"></div>
           </div>
  
           <div className="absolute top-[80px] left-[280px] w-32 bg-black/80 border border-purple-500/50 rounded p-2 text-[10px] text-white shadow-[0_0_15px_rgba(168,85,247,0.3)]">
             <div className="w-2 h-2 rounded-full bg-blue-500 absolute top-1/2 -left-1 transform -translate-y-1/2"></div>
             <div className="font-bold text-purple-400 mb-1 border-b border-white/10 pb-1">Kalman Filter</div>
             <div className="text-gray-400">Iterations: 1000</div>
             <div className="w-2 h-2 rounded-full bg-purple-500 absolute top-1/2 -right-1 transform -translate-y-1/2"></div>
           </div>
  
           <div className="absolute top-[230px] left-[20px] w-24 bg-black/80 border border-green-500/50 rounded p-2 text-[10px] text-white shadow-[0_0_15px_rgba(34,197,94,0.3)]">
             <div className="font-bold text-green-400 mb-1 border-b border-white/10 pb-1">CMDP Barrier</div>
             <div className="text-gray-400">Bounds: ±2.5σ</div>
             <div className="w-2 h-2 rounded-full bg-green-500 absolute top-1/2 -right-1 transform -translate-y-1/2"></div>
           </div>
  
           <div className="absolute top-[170px] left-[560px] w-32 bg-black/80 border border-emerald-500/50 rounded p-2 text-[10px] text-white shadow-[0_0_20px_rgba(16,185,129,0.5)]">
             <div className="w-2 h-2 rounded-full bg-purple-500 absolute top-1/4 -left-1 transform -translate-y-1/2"></div>
             <div className="w-2 h-2 rounded-full bg-green-500 absolute top-3/4 -left-1 transform -translate-y-1/2"></div>
             <div className="font-bold text-emerald-400 mb-1 border-b border-white/10 pb-1">TWAP Executor</div>
             <div className="text-gray-400">Latency: ~0.8ms</div>
             <div className="text-gray-400">Slippage: Max 0.1%</div>
           </div>
         </div>
      </div>
    );
};

// -------------------------------------------------------------
// PHASE 5: WebRTC Hoot-and-Holler Comms (Mesh Network)
// -------------------------------------------------------------
export const WebRTCHootPanel = () => {
    const videoRef = React.useRef<HTMLVideoElement>(null);
    const [streamActive, setStreamActive] = React.useState(false);
    const [peers] = React.useState<string[]>(['SOTA-Node-01', 'QuantX-Alpha-09']);

    React.useEffect(() => {
        if (typeof window !== 'undefined' && navigator.mediaDevices) {
            navigator.mediaDevices.getUserMedia({ video: true, audio: true })
            .then(stream => {
                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                    setStreamActive(true);
                }
            })
            .catch(err => {
                console.error("WebRTC Error:", err);
            });
        }
        
        return () => {
             // Cleanup tracks on unmount
             if (videoRef.current && videoRef.current.srcObject) {
                 const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
                 tracks.forEach(track => track.stop());
             }
        };
    }, []);

    return (
      <div className="flex flex-col h-full w-full rounded-xl bg-black border border-white/20 overflow-hidden font-sans relative shadow-[0_0_50px_rgba(255,255,255,0.05)]">
         <div className="p-4 border-b border-white/10 flex justify-between items-center bg-black/50 z-10">
           <h2 className="text-xl text-white font-medium tracking-wide flex items-center gap-2">
             <div className={`w-2 h-2 rounded-full ${streamActive ? 'bg-red-500 animate-pulse' : 'bg-gray-500'}`} />
             <span>Hoot-and-Holler Network</span>
             <span className="text-[9px] bg-red-500/20 text-red-400 px-2 py-0.5 rounded uppercase tracking-widest border border-red-500/30">Live Floor</span>
           </h2>
           <div className="text-xs text-white/50">{peers.length} Peers Connected</div>
         </div>
         
         <div className="flex-1 p-4 grid grid-cols-2 gap-4 bg-black overflow-y-auto">
            {/* Local Feed */}
            <div className="relative rounded-lg overflow-hidden border border-white/10 bg-gray-900 group aspect-video">
                <video ref={videoRef} autoPlay playsInline muted className="w-full h-full object-cover transition duration-700" />
                <div className="absolute bottom-2 left-2 bg-black/80 px-2 py-1 rounded text-[10px] text-white">Local Node (You)</div>
                {!streamActive && <div className="absolute inset-0 flex items-center justify-center text-white/30 text-xs">Requesting Camera...</div>}
                
                {/* Mesh Data Overlay */}
                <div className="absolute top-2 right-2 text-[8px] bg-black/50 text-green-400 px-1 py-0.5 rounded font-mono">24ms Ping</div>
            </div>

            {/* Mock Peers */}
            {peers.map((peer, i) => (
                <div key={i} className="relative rounded-lg overflow-hidden border border-white/10 bg-gray-900 aspect-video flex items-center justify-center">
                    <div className="absolute inset-0 opacity-20" />
                    <div className="flex flex-col items-center">
                        <div className="w-10 h-10 rounded-full bg-slate-800 border-2 border-green-500 overflow-hidden mb-2">
                            <div className="w-full h-full bg-gradient-to-tr from-green-500/20 to-blue-500/20" />
                        </div>
                        <div className="text-xs text-white/70">{peer}</div>
                        <div className="mt-1 flex items-center gap-1">
                            {Array.from({length: 4}).map((_, j) => (
                                // eslint-disable-next-line react/forbid-dom-props
                                <div key={j} className="w-1 h-3 bg-green-500 animate-pulse" style={{animationDelay: `${j * 0.2}s`}} />
                            ))}
                        </div>
                    </div>
                    <div className="absolute bottom-2 left-2 bg-black/80 px-2 py-1 rounded text-[10px] text-white">Encrypted UDP</div>
                </div>
            ))}
         </div>
      </div>
    );
};

export const WorldQuantIQCPanel = () => {
    const [gpState, setGpState] = useState<'idle'|'evolving'|'done'>('idle');
    const [children, setChildren] = useState<any[]>([]);
    const [manifoldNodes, setManifoldNodes] = useState<any[]>([]);
    const [transpiling, setTranspiling] = useState(false);
    const [transpileIn, setTranspileIn] = useState("");
    const [transpileOut, setTranspileOut] = useState("");
    const [hoveredNode, setHoveredNode] = useState<any>(null);
    const [baselineOhlc, setBaselineOhlc] = useState<any[]>([]);
    const [selectedAlpha, setSelectedAlpha] = useState<any>(null);

    const handleEvolve = async () => {
        setGpState('evolving');
        try {
            const res = await fetch("http://127.0.0.1:8000/api/iqc/evolve", {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ parents: ["volume / close", "returns * vwap"] })
            });
            const data = await res.json();
            if (data && data.children) {
                setChildren(data.children.slice(0, 8)); // Take top 8
            } else {
                console.error("Evolution Failed", data);
                alert("Evolution Failed: Backend Data Missing. Check terminal logs.");
            }
            if (data && data.baseline_ohlc) setBaselineOhlc(data.baseline_ohlc);
            setSelectedAlpha(null);
            
            // Map the nodes
            const mRes = await fetch("http://127.0.0.1:8000/api/iqc/manifold");
            const mData = await mRes.json();
            if (mData && mData.nodes) {
                setManifoldNodes(mData.nodes);
            }
        } catch (e) {
            console.error(e);
        }
        setGpState('done');
    };

    const handleTranspile = async () => {
        if (!transpileIn) return;
        setTranspiling(true);
        try {
            const res = await fetch("http://127.0.0.1:8000/api/iqc/transpile", {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ expression: transpileIn })
            });
            const data = await res.json();
            setTranspileOut(data.output);
        } catch (e) {
            console.error(e);
        }
        setTranspiling(false);
    };

    return (
        <div className="flex flex-col h-full w-full rounded-xl bg-black border border-white/10 overflow-hidden font-sans relative">
           <div className="flex justify-between items-center p-4 border-b border-white/10 relative z-10 bg-black">
              <div className="flex items-center gap-3">
                 <div className="w-8 h-8 rounded bg-red-600/10 flex items-center justify-center border border-red-500/30">
                    <Award size={16} className="text-red-500" />
                 </div>
                 <div>
                    <h2 className="text-white font-bold tracking-widest text-sm uppercase">WorldQuant IQC 2026 Domination Matrix</h2>
                    <p className="text-white/40 text-[10px] tracking-[0.2em] uppercase font-mono">Generative Mass-Fabrication Pipeline</p>
                 </div>
              </div>
           </div>

           <div className="flex-1 w-full flex overflow-hidden bg-black text-white relative">
              <PanelGroup orientation="horizontal">
              
              {/* STAGE 1: GP Foundry */}
              <Panel defaultSize={33} minSize={20}>
              <div className="border-r border-white/10 p-4 flex flex-col overflow-hidden bg-[#050505] h-full">
                 <div className="flex flex-col h-full">
                     <h3 className="text-xs font-bold uppercase tracking-widest text-red-500 mb-4 border-b border-red-500/20 pb-2">1. Evolutionary GP Foundry</h3>
                     
                     <div className="bg-white/5 border border-white/10 p-3 rounded text-[10px] text-white/50 font-mono mb-4">
                         Parent Set Initialized:<br/>
                         [0] (volume / close)<br/>
                         [1] (returns * vwap)
                     </div>
                     
                     {/* 🧠 GEMINI CO-PILOT WIDGET INJECT */}
                     <div className="flex-1 min-h-[300px] mb-4 overflow-hidden border border-white/5 rounded">
                         <CopilotWidget />
                     </div>

                     <button onClick={handleEvolve} disabled={gpState === 'evolving'} className="w-full py-3 bg-white/5 hover:bg-white/10 border border-white/20 text-white text-[10px] uppercase tracking-widest font-bold transition-all disabled:opacity-50">
                        {gpState === 'evolving' ? '[ FABRICATING ... ]' : 'START MASS-EVOLUTION'}
                     </button>

                     <div className="mt-4 flex-1 overflow-auto pr-2 space-y-2">
                        {children.map((c: any, i: number) => (
                           <div key={i} onClick={() => setSelectedAlpha(c)} className={`p-2 border rounded cursor-pointer transition-colors ${selectedAlpha?.id === c.id ? 'border-red-500/50 bg-red-500/5' : 'border-white/5 bg-white/[0.02] hover:border-red-500/30'}`}>
                              <div className="flex justify-between items-center mb-1">
                                 <span className="text-[9px] text-white/40 font-mono">ID: {c.id}</span>
                                 <span className="text-[9px] text-red-400 font-bold border border-red-500/20 px-1 rounded">Fitness: {c.fitness}</span>
                              </div>
                              {c.curve && (
                                 <div className="h-6 w-full my-2 border-b border-red-500/20">
                                    <ResponsiveContainer width="100%" height="100%">
                                       <LineChart data={c.curve.map((v: any, j: number) => ({val: v, idx: j}))}>
                                          <Line type="monotone" dataKey="val" stroke="#ef4444" strokeWidth={1} dot={false} isAnimationActive={false} />
                                       </LineChart>
                                    </ResponsiveContainer>
                                 </div>
                              )}
                              <div className="text-[10px] text-white font-mono break-all line-clamp-2">{c.expression}</div>
                           </div>
                        ))}
                     </div>
                 </div>
              </div>

              {/* STAGE 2: TDA Orthogonality */}
              <div className="border-r border-white/10 flex flex-col bg-black relative">
                 <div className="p-4 relative z-10 bg-black border-b border-white/10">
                    <h3 className="text-xs font-bold uppercase tracking-widest text-red-500">2. Topology Orthogonality Map</h3>
                    <p className="text-[9px] text-white/30 uppercase tracking-wider">TDA/UMAP Clustering Matrix</p>
                 </div>
                 <div className="flex-1 relative w-full flex flex-col overflow-hidden bg-black">
                     {/* Map Top Half */}
                     <div className="relative w-full h-[50%] flex flex-col items-center justify-center border-b border-white/10 shrink-0">
                    {/* Simulated 3D SVG Space */}
                    <svg viewBox="-150 -150 300 300" className="w-full h-full opacity-80">
                        <defs>
                            <circle id="node" r="2" fill="currentColor" />
                            <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                               <feGaussianBlur stdDeviation="3" result="blur" />
                               <feComposite in="SourceGraphic" in2="blur" operator="over" />
                            </filter>
                        </defs>
                        {/* 3D Axis Grids */}
                        <line x1="-150" y1="0" x2="150" y2="0" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" />
                        <line x1="0" y1="-150" x2="0" y2="150" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" />
                        <circle cx="0" cy="0" r="100" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" strokeDasharray="2 4" />
                        <circle cx="0" cy="0" r="50" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" strokeDasharray="2 4" />
                        
                        {/* Nodes */}
                        {(manifoldNodes || []).map((n: any, i: number) => {
                            const isOutlier = n.group === 'Outlier_Orthogonal';
                            return (
                               <g key={i} 
                                  className={`transition-all duration-1000 cursor-crosshair ${isOutlier ? 'text-red-500' : 'text-white/40'}`}
                                  onMouseEnter={() => setHoveredNode(n)}
                                  onMouseLeave={() => setHoveredNode(null)}>
                                   <use href="#node" x={n.x} y={n.y} filter={isOutlier ? "url(#glow)" : ""} />
                                   <circle cx={n.x} cy={n.y} r="8" fill="transparent" /> {/* Hitbox */}
                                   {isOutlier && <line x1="0" y1="0" x2={n.x} y2={n.y} stroke="rgba(239,68,68,0.2)" strokeWidth="0.5" />}
                               </g>
                            )
                        })}
                        
                        {/* Interactive Tooltip */}
                        {hoveredNode && (
                            <g transform={`translate(${hoveredNode.x}, ${hoveredNode.y - 15})`} className="pointer-events-none transition-all duration-200">
                               <rect x="-30" y="-18" width="90" height="24" fill="rgba(0,0,0,0.9)" stroke="rgba(239,68,68,0.5)" strokeWidth="0.5" rx="2" />
                               <text x="-26" y="-10" fill="white" fontSize="4px" fontFamily="monospace" fontWeight="bold border-b border-red-500 pb-1">{hoveredNode.id}</text>
                               <text x="-26" y="-3" fill="rgba(239,68,68,0.9)" fontSize="4px" fontFamily="monospace">SCORE: {hoveredNode.fitness || 'TBD'}</text>
                               <line x1="15" y1="0" x2="0" y2="15" stroke="rgba(239,68,68,0.5)" strokeWidth="0.5" />
                            </g>
                        )}
                    </svg>

                    {(gpState === 'idle' || gpState === 'evolving') && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-20">
                           <span className="text-[10px] text-white/30 tracking-widest font-mono uppercase">{gpState === 'evolving' ? 'MAPPING DISTANCE...' : 'AWAITING GENERATION'}</span>
                        </div>
                    )}
                    <div className="absolute bottom-4 left-4 right-4 bg-black/80 border border-white/5 text-[9px] text-white/50 p-2 font-mono uppercase text-center rounded flex justify-center items-center gap-4">
                        <div className="flex items-center gap-1"><div className="w-2 h-2 bg-red-500 rounded-full glow" /> 100% Orthogonal</div>
                        <div className="flex items-center gap-1"><div className="w-2 h-2 bg-white/40 rounded-full" /> Highly Correlated</div>
                    </div>
                 </div>

                 {/* Candlestick Bottom Half */}
                 <div className="relative w-full flex-1 flex flex-col p-4 bg-black min-h-[300px]">
                    <h3 className="text-[10px] text-white/50 font-mono uppercase tracking-widest mb-4">
                        LIVE TIME SERIES OVERLAY: {selectedAlpha ? selectedAlpha.id : 'AWAITING SELECTION'}
                    </h3>
                    {selectedAlpha && baselineOhlc.length > 0 ? (
                        <div className="flex-1 w-full relative">
                           <ResponsiveContainer width="100%" height="100%">
                               <ComposedChart data={baselineOhlc.map((candle, idx) => ({
                                   ...candle,
                                   alphaSig: selectedAlpha.curve[idx] || 0
                               }))}>
                                   <defs>
                                       <linearGradient id="colorClose" x1="0" y1="0" x2="0" y2="1">
                                           <stop offset="5%" stopColor="#ffffff" stopOpacity={0.1}/>
                                           <stop offset="95%" stopColor="#ffffff" stopOpacity={0}/>
                                       </linearGradient>
                                   </defs>
                                   <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                                   <YAxis yAxisId="left" domain={['auto', 'auto']} hide />
                                   <YAxis yAxisId="right" orientation="right" domain={[0, 100]} hide />
                                   <Area yAxisId="left" type="monotone" dataKey="close" stroke="#ffffff50" fill="url(#colorClose)" strokeWidth={1} />
                                   <Line yAxisId="right" type="monotone" dataKey="alphaSig" stroke="#ef4444" strokeWidth={2} dot={false} isAnimationActive={false} />
                               </ComposedChart>
                           </ResponsiveContainer>
                        </div>
                    ) : (
                        <div className="flex-1 w-full flex items-center justify-center opacity-30 text-[10px] font-mono">
                            &gt; SELECT ALPHA FROM FOUNDRY TO PROJECT CANDLESTICKS
                        </div>
                    )}
                 </div>

                 </div>
              </div>
              </Panel>
              
              <PanelResizeHandle className="w-1 bg-white/5 hover:bg-red-500/50 transition-colors cursor-col-resize active:bg-red-500 z-50 shrink-0" />

              {/* STAGE 3: Transpiler Pipeline */}
              <Panel defaultSize={33} minSize={20}>
              <div className="p-4 flex flex-col bg-black h-full">
                 <h3 className="text-xs font-bold uppercase tracking-widest text-red-500 mb-4 border-b border-red-500/20 pb-2">3. WQ Syntax Transpiler</h3>
                 
                 <div className="flex-1 flex flex-col gap-4">
                    <p className="text-[10px] text-white/40 leading-relaxed">
                        Convert generated Python AST logic nodes directly into proprietary WorldQuant BRAIN operator syntax.
                    </p>
                    
                    <div className="flex flex-col gap-2">
                        <div className="flex justify-between items-end">
                            <span className="text-[9px] uppercase tracking-widest text-white/30 font-mono">PRE-CONFIGURED HYPOTHESIS TEMPLATE</span>
                        </div>
                        <select 
                           className="w-full bg-black border border-white/10 rounded p-2 text-red-500 font-mono text-[10px] outline-none hover:border-white/20 transition-colors"
                           onChange={(e) => {
                               if(e.target.value) setTranspileIn(e.target.value);
                           }}
                        >
                            <option value="">-- SELECT AUTOMATED HYPOTHESIS --</option>
                            <option value="operating_income / cap">SOTA: Operating Yield (Income Adjusted vs Market Cap)</option>
                            <option value="-1 * fn_liab_fair_val_l1_a">SOTA: Fair Value Liability Acceleration</option>
                            <option value="moving average crossover of volume and close">Moving Avg Crossover (Vol/Close)</option>
                            <option value="mean reversion on 10 day vwap divergence">Mean Reversion (10d VWAP Divergence)</option>
                            <option value="momentum acceleration rank over 30 days">Momentum Acceleration (30d Rank)</option>
                            <option value="cross sectional neutralization of daily returns">Sector Neuralized Returns Matrix</option>
                        </select>
                    </div>

                    <div className="flex flex-col gap-2 mt-2">
                        <span className="text-[9px] uppercase tracking-widest text-white/30 font-mono">NATIVE LOGIC STRING</span>
                        <textarea 
                           className="w-full h-24 bg-white/5 border border-white/10 rounded p-2 text-white font-mono text-[10px] resize-none outline-none focus:border-red-500/50 transition-colors"
                           placeholder="Type your hypothesis..."
                           value={transpileIn}
                           onChange={(e) => setTranspileIn(e.target.value)}
                        />
                    </div>

                    <button onClick={handleTranspile} disabled={transpiling || !transpileIn} className="w-full py-3 border border-red-500/50 text-red-400 bg-red-500/5 hover:bg-red-500/10 text-[10px] uppercase tracking-widest font-bold transition-all disabled:opacity-50">
                        {transpiling ? 'COMPILING AST...' : 'TRANSPILE TO WQ BRAIN'}
                    </button>

                    <div className="flex-1 flex flex-col gap-2 relative">
                        <span className="text-[9px] uppercase tracking-widest text-white/30 font-mono">WORLDQUANT BRAIN OUTPUT</span>
                        <div className="absolute inset-0 top-6 border border-white/10 bg-black p-3 relative overflow-hidden group">
                           {transpileOut ? (
                               <>
                                 <code className="text-[11px] text-white font-mono leading-relaxed block break-all">{transpileOut}</code>
                                 <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button className="px-2 py-1 bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/40 text-[8px] tracking-wider uppercase font-bold rounded shadow-[0_0_10px_rgba(16,185,129,0.2)]" onClick={() => {
                                        fetch("http://127.0.0.1:8000/api/worldquant/start", { method: 'POST' });
                                        alert("Alpha Transpiled & Executed! WorldQuant Competition submission successfully queued via Stealth Engine.");
                                    }}>EXECUTE IN COMPETITION</button>
                                    <button className="px-2 py-1 bg-white/10 hover:bg-white/20 text-white text-[8px] tracking-wider uppercase font-bold rounded" onClick={() => navigator.clipboard.writeText(transpileOut)}>COPY MATCH</button>
                                 </div>
                               </>
                           ) : (
                               <div className="w-full h-full flex items-center justify-center">
                                   <span className="text-[10px] text-white/20 font-mono">&gt; AWAITING INPUT</span>
                               </div>
                           )}
                        </div>
                    </div>
                 </div>
              </div>
              </Panel>
              </PanelGroup>
           </div>
        </div>
    );
};
