import yfinance as yf
import pandas as pd
import numpy as np
from datetime import datetime, timezone
import uuid
from app.schemas.alpha import Alpha, AlphaStatus, AlphaMetrics

MOCK_ALPHAS = [] # Starts empty for Phase 2

def simulate_alpha(expression: str, region: str, universe: str) -> AlphaMetrics:
    """Live alpha backtest simulation using yfinance"""
    
    # 1. Parse Universe/Expression into a Ticker
    # Default to SPY, but check if the user passed a specific stock ticker
    ticker_symbol = "SPY"
    query_str = f"{expression} {universe}".upper()
    
    # Handle basic tickers for the prototype
    for t in ["AAPL", "TSLA", "NVDA", "MSFT", "AMZN", "META", "GOOGL", "BTC-USD"]:
        if t in query_str:
            ticker_symbol = t
            break
            
    if ticker_symbol == "SPY" and universe and universe.upper() not in ["TOP3000", "US", "EU"]:
        # Try treating the universe string directly as the ticker
        ticker_symbol = universe.upper()

    try:
        # 2. Fetch Live Market Data (Last 1 year, Daily)
        data = yf.download(ticker_symbol, period="1y", interval="1d", progress=False)
        if data.empty:
            raise ValueError(f"No data found for {ticker_symbol}")
            
        # 3. Calculate metrics based on the real dataset
        close_col = 'Adj Close' if 'Adj Close' in data.columns else 'Close'
        
        # Handle yfinance multi-index column outputs (recent yfinance versions)
        if isinstance(data.columns, pd.MultiIndex):
            close_series = data[close_col][ticker_symbol]
        else:
            close_series = data[close_col]
            
        daily_returns = close_series.pct_change().dropna()
        
        # Annualized metrics
        annualized_return = (1 + daily_returns.mean())**252 - 1
        annualized_vol = daily_returns.std() * np.sqrt(252)
        
        # Sharpe Ratio (Assuming 4% Risk-free rate)
        sharpe = (annualized_return - 0.04) / annualized_vol if annualized_vol > 0 else 0
        
        # Mocking turnover based on volatility (strategy flips more on higher vol)
        turnover = min(annualized_vol * 1.5, 0.95)
        
        # Mocking margin requirement
        margin = max(0.01, annualized_return * 0.1)
        
        return AlphaMetrics(
            sharpe=round(float(sharpe), 2),
            returns=round(float(annualized_return), 4),
            turnover=round(float(turnover), 2),
            margin=round(float(margin), 4)
        )
    except Exception as e:
        print(f"Simulation error: {e}")
        # Failure Fallback
        return AlphaMetrics(sharpe=0.0, returns=0.0, turnover=0.0, margin=0.0)

def get_all_alphas() -> list[Alpha]:
    return MOCK_ALPHAS
