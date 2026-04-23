import os, re

# QuantResearchTrader
filepath = "/Users/favl/Desktop/quantX/frontend/src/components/nexus/QuantResearchTrader.tsx"
with open(filepath, "r") as file:
    content = file.read()

# Fusing Signal Truth
content = content.replace(
    "text-[8px] text-zinc-500 font-bold border border-zinc-800 px-2 py-1 bg-zinc-950",
    "text-[8px] font-bold border px-2 py-1 transition-colors ${isSyncing ? 'text-emerald-500 bg-emerald-500/10 border-emerald-500/30 shadow-[0_0_8px_rgba(16,185,129,0.2)]' : 'text-zinc-500 border-zinc-800 bg-zinc-950'}"
)
content = content.replace(
    r"""<div className="flex items-center gap-2 text-[8px] font-bold border px-2 py-1 transition-colors ${isSyncing ? 'text-emerald-500 bg-emerald-500/10 border-emerald-500/30 shadow-[0_0_8px_rgba(16,185,129,0.2)]' : 'text-zinc-500 border-zinc-800 bg-zinc-950'}">
                                {isSyncing ? 'FUSING_SIGNAL_TRUTH' : 'IDLE_MONITORING'}
                            </div>""",
    r"""<div className={`flex items-center gap-2 text-[8px] font-bold border px-2 py-1 transition-colors ${isSyncing ? 'text-emerald-500 bg-emerald-500/10 border-emerald-500/30' : 'text-zinc-500 border-zinc-800 bg-zinc-950'}`}>
                                {isSyncing ? 'FUSING_SIGNAL_TRUTH' : 'IDLE_MONITORING'}
                            </div>"""
)

# Portfolio Day PNL logic
content = content.replace(
    "text-[9px] font-bold uppercase mt-1 px-1 bg-zinc-900 border border-zinc-800 ${portfolioState.day_pnl >= 0 ? 'text-zinc-300' : 'text-zinc-500'}",
    "text-[9px] font-bold uppercase mt-1 px-1 border ${portfolioState.day_pnl >= 0 ? 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30' : 'text-rose-400 bg-rose-500/10 border-rose-500/30'}"
)

# Unrealized PNL
content = content.replace(
    "text-[10px] font-bold ${p.unrealized_pnl >= 0 ? 'text-zinc-300' : 'text-zinc-500'}",
    "text-[10px] font-bold ${p.unrealized_pnl >= 0 ? 'text-emerald-400' : 'text-rose-400'}"
)

# Active Trades TrendingUp/Down Icons
content = content.replace(
    "{trade.type === 'LONG' ? <TrendingUp size={10} /> : <TrendingDown size={10} />}",
    "{trade.type === 'LONG' ? <TrendingUp size={10} className='text-emerald-500' /> : <TrendingDown size={10} className='text-rose-500' />}"
)

# Active Trades Collapse Pnl
content = content.replace(
    "text-[10px] text-zinc-500\">+${estimateTradeOutcome(stake, trade).toFixed(0)}",
    "text-[10px] text-emerald-400\">+${estimateTradeOutcome(stake, trade).toFixed(0)}"
)

# Buy/Sell density signature
content = content.replace(
    """f.type === 'ORDER_BLOCK' ? 'bg-zinc-300' :
                                                        f.type === 'STOP_HUNT' ? 'bg-zinc-500' : 'bg-zinc-700'""",
    """f.type === 'ORDER_BLOCK' ? 'bg-emerald-500/80 shadow-[0_0_8px_rgba(16,185,129,0.3)]' :
                                                        f.type === 'STOP_HUNT' ? 'bg-rose-500/80 shadow-[0_0_8px_rgba(244,63,94,0.3)]' : 'bg-zinc-700'"""
)


with open(filepath, "w") as file:
    file.write(content)

# VisualBacktestHub
filepath = "/Users/favl/Desktop/quantX/frontend/src/components/nexus/VisualBacktestHub.tsx"
with open(filepath, "r") as file:
    content = file.read()

content = content.replace(
    "text-sm font-bold ${netPnL >= 0 ? 'text-zinc-100' : 'text-zinc-500'}",
    "text-sm font-bold tracking-tighter ${netPnL >= 0 ? 'text-emerald-500' : 'text-rose-500'}"
)

content = content.replace(
    "profit > 0 ? 'bg-zinc-900 border-zinc-800 text-zinc-300' : 'bg-[#050505] border-transparent text-zinc-600'",
    "profit > 0 ? 'bg-emerald-500/10 border-emerald-500/50 text-emerald-400' : 'bg-[#050505] border-transparent text-rose-500/50'"
)

content = content.replace(
    "trade.pnl > 0 ? <span className=\"text-zinc-100 px-1 border border-zinc-700 bg-zinc-900 uppercase text-[8px]\">WIN</span> : <span className=\"text-zinc-600 px-1 border border-zinc-800 bg-zinc-950 uppercase text-[8px]\">LOSS</span>",
    "trade.pnl > 0 ? <span className=\"text-emerald-400 px-1 border border-emerald-500/30 bg-emerald-500/10 uppercase text-[8px]\">WIN</span> : <span className=\"text-rose-400 px-1 border border-rose-500/30 bg-rose-500/10 uppercase text-[8px]\">LOSS</span>"
)

content = content.replace(
    "text-[10px] font-bold ${trade.pnl > 0 ? 'text-zinc-100' : 'text-zinc-500'}",
    "text-[10px] font-bold ${trade.pnl > 0 ? 'text-emerald-400' : 'text-rose-400'}"
)

with open(filepath, "w") as file:
    file.write(content)

print("Widgets updated.")
