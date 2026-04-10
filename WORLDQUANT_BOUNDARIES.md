# WorldQuant Brain: Consultant Level Mathematical Boundaries

To ensure we never hit a syntax error or a restricted UI failure again, here is the absolute mathematically defined matrix of what is allowed and what is restricted on your current Consultant Tier.

## 1. Whitelisted Core Operators
You are completely unrestricted in using the following cross-sectional and time-series modifiers:
*   `ts_rank(x, d)`: Time-series ranking over `d` days. (Always safe)
*   `ts_mean(x, d)`: Moving average over `d` days. (Always safe)
*   `ts_std_dev(x, d)`: Standard deviation. (Always safe)
*   `ts_corr(x, y, d)`: Correlation between two datasets. (Extremely powerful)
*   `ts_delta(x, d)`: The `d` day absolute change in `x`.
*   `rank(x)`: Cross-sectional rank on the current day.
*   `delay(x, d)`: Lags the data `d` days to prevent lookahead bias.

## 2. Whitelisted Fundamental Datasets (ABSOLUTE STRICT LIST)
Do not guess data variable names or assume equivalence. Based on hard compiler testing, we can EXCLUSIVELY use:
*   **Pricing/Volume:** `close`, `open`, `high`, `low`, `volume`, `vwap`, `returns`
*   **Fundamental Anchorage:** `operating_income`, `cap`
*   *Critical Warning:* Variables like `net_income`, `gross_income`, or `sales` have failed the compiler test. We must construct strategies exclusively intersecting `operating_income` with the Pricing Array.

## 3. The Self-Correlation Trap (0.9988 Paradox)
WorldQuant's simulation engine is mathematically ruthless regarding identical vectors. 
**The VWAP/Close Illusion:** We learned that simply swapping `close` for `vwap` in a 252-day moving average `ts_mean(x, 252)` creates a `0.9988` correlation because long-term volume-weighted averages regress exactly to closing averages. To defeat the 0.70 Self-Correlation threshold, an alpha must change three structural vectors simultaneously:
1. **The Primary Anchor:** If Alpha 1 uses `operating_income`, Alpha 2 MUST use pure Liquidity (`ts_corr`) or Volatility (`ts_std_dev`) as the anchor.
2. **The Time Horizon:** If Alpha 1 operates on a 252-day lag, Alpha 2 MUST operate on a drastically different horizon (e.g., 20 days or 5 days).
3. **The Mechanism:** Switching from "Yield Reversion" to "Negative Liquidity Capitulation".

## 4. STRICTLY RESTRICTED (What causes automated script failures)
1. **Restricted Mathematical Wrappers:** `decay_exp`, `decay_linear` and `group_neutralize` inside the "Fast Expression" code block can often trigger the `inaccessible variable` flag. We must use the external UI dropdowns.
2. **Turnover & Correlation Ceilings:** Models firing >70% turnover fail. We learned that applying UI **Decay > 5** perfectly throttles an 82% turnover algorithm down to ~25% mechanically without altering core alpha logic.

## Our Forward Mandate:
From now on, we will build **pure mathematical cores** using *only* the operators in Section 1 and Section 2. We will engineer 0% correlation natively using the Horizon/Anchor shift identified in Section 3.

## 5. The Asynchronous Temporal Decoupling Protocol (Proven 8/8 Pass)

**Critical Learning (2026-04-10):** When all existing submitted alphas share a 252-day (annual) time horizon, even shifting to 63-day (quarterly) horizons can produce correlation >0.70 (we measured 0.7274) because quarterly earnings cycles are harmonics of annual cycles.

**The Solution:** Deploy *asynchronous* horizons within a single alpha — mix 63-day fundamental anchors with 20-day price reversion windows. This forces the portfolio to hold positions that are structurally distinct from any annual-horizon model.

**Proven Result:** Self-correlation dropped from 0.7274 → **0.4429** by changing only the VWAP reversion leg from 63→20 days, while retaining the 63-day fundamental anchor.

**Decay Tuning Data (Asynchronous Q-Class):**

| Decay | Sharpe | Turnover | Fitness | Result |
|-------|--------|----------|---------|--------|
| 0     | 2.18   | 51.86%   | 0.98    | 6/7 FAIL (Fitness) |
| 4     | 1.85   | 28.86%   | 1.03    | **8/8 PASS** |

**Key Takeaway:** The `sales` variable compiles successfully but generates insufficient Sharpe (1.03 vs 1.25 cutoff). `operating_income` remains the sole viable fundamental anchor. Future correlation isolation must come from temporal decoupling, NOT from swapping fundamental variables.
