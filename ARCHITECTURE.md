# QuantX Sentinel: Autonomous Engine Architecture

**QuantX Sentinel** is a state-of-the-art (SOTA) Institutional Quantitative Operating System. It departs from the paradigm of traditional web dashboards, presenting instead a spatial, neo-brutalist "Omniscient OS" built for high-frequency algorithmic research, portfolio hyper-allocation, and real-time execution telemetry.

## Platform Mission
To provide an uncompromised, zero-latency environment for quantitative analysts and institutional engineers to simulate, backtest, and deploy generative trading algorithms while maintaining absolute security through a decentralized deployment model.

---

## 🏗️ Core Architecture Breakdown

The architecture is divided into a specialized **Python Quantitative Core** and a **React Spatial Sandbox**.

### 1. The Spatial Frontend (React + Next.js + Framer Motion)
The interface is structured as an infinite spatial canvas rather than rigid pages.

* **Omni-Intent Engine**: The primary navigation is headless. Users issue text or Voice commands (via the Web Speech API) into the Omni-Intent bar. The OS parses commands (e.g., "Deploy Alpha Kernel", "Allocate Capital", "Open Comms") to dynamically render ephemeral floating panels.
* **Glassmorphic Draggability**: Widgets render as `DraggablePanel` modules. You can reposition limitless widgets across an infinite dark-mode grid (`bg-black` mapping).
* **WebRTC "Hoot and Holler" Mesh**: Real-time peer-to-peer audio bridging directly inside the dashboard, simulating a high-density institutional trading floor without traversing external servers.
* **Standalone Deployment**: The client is wrapped in `electron-builder`, allowing zero-click compilation into native macOS `.dmg` and Windows `.exe` binaries, alongside full Progressive Web App (PWA) manifest capabilities for local installation.

### 2. The Quantitative Backend (FastAPI + Python)
The backend acts as a highly optimized matrix to process stochastic mathematics and simulate data structures at scale.

* **Stochastic Density & CMDP Engine**: Processes raw financial data through mathematical bounds. It implements a 1D Numpy-based **Kalman Filter** to track latent pricing states under extreme noise, overlaying Constrained Markov Decision Processes (CMDP) to optimize execution trajectories.
* **RL Hyper-Allocator**: An advanced Reinforcement Learning framework intended to supersede traditional generic allocation algorithms. It visualizes systemic risk weights dynamically.
* **Generative Alpha Kernel**: Allows users to input mathematical rationale in plain text and dynamically recompiles executable Python logic (`alpha.py`) on the fly, simulating years of backtesting across emulated NVIDIA Tensor Cores.
* **HFT Telemetry Websockets**: Emits asynchronous JSON pulses simulating Limit Order Book (LOB) imbalances and algorithmic anomalies like "Iceberg Ask Detected" to drive the frontend UI at 60 frames per second.

### 3. Institutional Security Perimeter
* **Genesis Matrix**: Rather than trusting standard Oauth/Firebase loops, the platform employs a rigorous enclosed SQLite database (`quantx_auth.db`). The gateway intercepts all connections until an "Institutional ID" and "Root Cryptography Key" are provisioned via the Sentinel locking screen.

---

## 💠 Component Lexicon

### `page.tsx`
The primary Sentinel entrance gateway and layout wrapper. Handles authentication locking, the `Omni-Intent` logic loop, and orchestrates the rendering of active panels.

### `Widgets.tsx`
The arsenal of capabilities. Contains all deployable quantitative tools:
1. **Algorithmic Nexus**: The Generative AI backtesting sandbox.
2. **Sentinel Ascendancy Trace**: The visualizer mapping price streams, Kalman estimates, and Stochastic Density mapping.
3. **WebRTCHootPanel**: The decentralized institutional com-link.
4. **RL Hyper-Allocator**: The capital distribution neural net.
5. **Deep-RL Backtester & Order Imbalance Flow**: Live simulation feeds tracking liquidity depth and epoch execution states.

### `main.py`
The nervous system. Mounts the execution endpoints (`/api/auth/*`, `/api/simulate`, `/api/cmdp-optimize`), manages SQLite connections for user state persistence, and streams the High-Frequency WebSocket telemetry.

---

## 🎨 Design Philosophy (The SOTA Aesthetic)
QuantX Sentinel firmly rejects the current "SaaS" paradigm of rounded corners, pastel gradients, and heavy shadows. 

It aligns purely with an ultra-premium **Palantir/Tesla** institutional aesthetic:
* **True Deep Black (`#000000`, `#0a0a0a`)** bounds, enforcing an absolute void.
* **Pristine White Line-work** mapping boundaries, separated by fractional opacity logic (`bg-white/5` to `bg-white/20`).
* **Electric Red Action Nodes (`text-red-600`)** reserved strictly for active execution, glowing elements, or signal anomalies to enforce immediate user attention.
* **Typographic Rigidity**: Aggressively using `Montserrat` for headers to invoke monumental scale and `JetBrains Mono` for precise numeral telemetry readouts.

## 🚀 Execution Guide
To compile and launch the system from genesis:
```bash
# 1. Boot the Quantitative Core
cd backend
source venv/bin/activate
uvicorn main:app --reload --port 8000

# 2. Boot the Spatial Display
cd frontend
npm run dev

# 3. Enter Genesis State
# Access localhost:3000 -> Click "Request Genesis Access" to provision your admin Node.
```
