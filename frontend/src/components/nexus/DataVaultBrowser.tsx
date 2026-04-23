"use client";

import React, { useState } from 'react';
import { FolderOpen, FileText, Database, Code, Terminal, PlaySquare, Workflow } from 'lucide-react';

const DATA_CATALOG = [
    { title: 'Global Omniscient Matrix Pipeline', type: 'Directory', iconType: 'folder', path: '/ollama_data/external_datasets/', open: true, children: [
        { title: 'Transcripts_Ghost_Logs', type: 'Directory', iconType: 'folder', path: '/ollama_data/external_datasets/Transcripts', open: true, children: [
            { title: 'Ghost_Fed_Minutes_0426.txt', type: 'TXT', size: '2.4 MB', path: '/.../Transcripts/Ghost_Fed_Minutes_0426.txt', iconType: 'text' },
            { title: 'Ghost_Earnings_MSFT_Q1.pdf', type: 'PDF', size: '15.1 MB', path: '/.../Transcripts/Ghost_Earnings_MSFT_Q1.pdf', iconType: 'text' },
            { title: 'Ghost_Earnings_NVDA_Q1.pdf', type: 'PDF', size: '12.8 MB', path: '/.../Transcripts/Ghost_Earnings_NVDA_Q1.pdf', iconType: 'text' },
        ]},
        { title: 'Orb_Configurations', type: 'Directory', iconType: 'folder', path: '/ollama_data/external_datasets/Orb_Configs', open: false, children: [] },
        { title: 'FinancialDatasets_Scraped', type: 'Directory', iconType: 'folder', path: '/ollama_data/external_datasets/FinancialDatasets_Scraped', open: true, children: [
            { title: 'signal_generator.py', type: 'PY', size: '12 KB', path: '/.../FinancialDatasets_Scraped/signal_generator.py', iconType: 'code' },
            { title: 'signal_generator_v2.py', type: 'PY', size: '18 KB', path: '/.../FinancialDatasets_Scraped/signal_generator_v2.py', iconType: 'code' },
            { title: 'financial_intelligence_raw.json', type: 'JSON', size: '245 MB', path: '/.../FinancialDatasets_Scraped/financial_intelligence_raw.json', iconType: 'db' },
            { title: 'trefis_momentum_scrape.csv', type: 'CSV', size: '1.2 MB', path: '/.../FinancialDatasets_Scraped/trefis_momentum_scrape.csv', iconType: 'db' },
        ]},
        { title: 'SEC_EDGAR_Stream', type: 'Directory', iconType: 'folder', path: '/ollama_data/external_datasets/SEC', open: true, children: [
            { title: '8K_Material_Events_Live.json', type: 'STREAM', size: 'LIVE', path: '/.../SEC/8K_Material_Events_Live.json', iconType: 'terminal' }
        ]}
    ]}
];

export const DataVaultBrowser = () => {
    const [selectedFile, setSelectedFile] = useState<string | null>('/.../FinancialDatasets_Scraped/financial_intelligence_raw.json');

    const getIcon = (type: string) => {
        switch(type) {
            case 'folder': return <FolderOpen size={13} className="text-zinc-500" />;
            case 'text': return <FileText size={13} className="text-zinc-400" />;
            case 'code': return <Code size={13} className="text-zinc-400" />;
            case 'db': return <Database size={13} className="text-zinc-400" />;
            case 'terminal': return <Terminal size={13} className="text-zinc-400" />;
            default: return <FileText size={13} className="text-zinc-400" />;
        }
    };

    const renderTree = (nodes: any[], level = 0) => {
        return nodes.map((node, i) => (
            <div key={i} className="flex flex-col">
                <div 
                    onClick={() => node.type !== 'Directory' && setSelectedFile(node.path)}
                    className={'flex items-start gap-2 py-1.5 px-3 cursor-pointer transition-colors ' + (selectedFile === node.path ? 'bg-zinc-800/80 border-l-[3px] border-zinc-300' : 'hover:bg-zinc-900 border-l-[3px] border-transparent')}
                    style={{ paddingLeft: (level * 16 + 12) + 'px' }}
                >
                    <div className="mt-0.5 shrink-0">{getIcon(node.iconType)}</div>
                    <div className="flex flex-col overflow-hidden">
                       <span className={`text-[11px] truncate tracking-wide ${node.type === 'Directory' ? 'font-semibold text-zinc-300' : 'text-zinc-400'}`}>{node.title}</span>
                       {node.size && <span className="text-[9px] text-zinc-600 font-mono tracking-widest mt-0.5">{node.type} // {node.size}</span>}
                    </div>
                </div>
                {node.children && node.open && (
                    <div className="border-l border-zinc-800 ml-[18px]">
                        {renderTree(node.children, level + 1)}
                    </div>
                )}
            </div>
        ));
    };

    return (
        <div className="w-full h-full bg-[#050505] rounded-xl flex font-mono border border-zinc-800 overflow-hidden shadow-2xl uppercase">
            {/* Left Sidebar */}
            <div className="w-80 border-r border-zinc-800 flex flex-col shrink-0">
               <div className="p-4 border-b border-zinc-800 flex flex-col gap-1">
                  <h3 className="text-[11px] font-bold text-zinc-100 tracking-[0.2em] flex items-center gap-2">
                     <Workflow size={14} className="text-zinc-500" />
                     Data Architecture
                  </h3>
                  <p className="text-[9px] text-zinc-500 tracking-widest">[INGESTION_ENGINE_V2_MAPPING]</p>
               </div>
               
               <div className="flex-1 overflow-y-auto custom-scrollbar p-1">
                   {renderTree(DATA_CATALOG)}
               </div>
            </div>

            {/* Right Preview */}
            <div className="flex-1 flex flex-col relative bg-[#020202]">
                <div className="p-4 border-b border-zinc-800 flex items-center justify-between z-10 bg-[#050505]">
                    <div className="flex items-center gap-3">
                       <div className="flex flex-col">
                           <span className="text-xs font-bold text-zinc-100 tracking-widest">financial_intelligence_raw.json</span>
                           <span className="text-[9px] text-zinc-500 tracking-widest">PATH: /ollama_data/external_datasets/FinancialDatasets_Scraped/</span>
                       </div>
                    </div>
                    <button className="px-3 py-1.5 bg-zinc-900 hover:bg-zinc-800 text-[10px] text-zinc-300 border border-zinc-700 tracking-[0.2em] transition flex items-center gap-2 font-bold">
                       <PlaySquare size={12} />
                       Exec Scraper Loop
                    </button>
                </div>

                <div className="flex-1 p-4 relative overflow-hidden">
                    <div className="absolute top-4 right-4 z-20">
                        <span className="text-zinc-300 bg-zinc-900 border border-zinc-700 px-2 py-1 text-[9px] font-bold tracking-[0.3em]">
                            [SYS_AUDIT: VALIDATED]
                        </span>
                    </div>

                    <pre className="text-[11px] text-zinc-400 bg-black p-6 border border-zinc-800 h-full overflow-y-auto custom-scrollbar leading-loose tracking-widest">
{`[
  {
    "ticker": "NVDA",
    "ingested_date": "2026-04-18T14:32:00Z",
    "source": "Zacks Institutional DB via Pipeline",
    "fundamental_metrics": {
      "pe_ratio": 34.2,
      "institutional_ownership_change": "+4.1%",
      "sentiment_score": 0.94
    },
    "text_corpus": "Institutional short interest dropping. Momentum traders aggressively piling into sector. EPS projection strongly upgraded."
  },
  {
    "ticker": "PLTR",
    "ingested_date": "2026-04-18T14:32:05Z",
    "source": "Trefis Momentum Breakouts",
    "fundamental_metrics": {
      "pe_ratio": 72.1,
      "institutional_ownership_change": "+12.4%",
      "sentiment_score": 0.88
    },
    "text_corpus": "AIP platform securing Department of Defense contracts. Commercial revenue accelerating 40% YoY. Buy."
  },
  {
    "ticker": "ADANIENS",
    "ingested_date": "2026-04-18T14:32:10Z",
    "source": "Global OSINT Crawl",
    "fundamental_metrics": {
      "trend_breakout": true,
      "sentiment_score": 0.89
    },
    "text_corpus": "Indian renewables infrastructure experiencing massive institutional inflow. Infrastructure targets locked."
  }
]`}
                    </pre>
                </div>
            </div>
        </div>
    );
};
