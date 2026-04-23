import yfinance as yf
t = yf.Ticker('NVDA')
info = t.info
print("PE:", info.get('forwardPE'))
print("Rec:", info.get('recommendationKey'))
u = t.upgrades_downgrades
if u is not None and not u.empty:
    for idx, row in u.head(5).iterrows():
        print(row.to_dict())
