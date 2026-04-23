#!/bin/bash
# ------------------------------------------------------------------
# QuantX Sentinel Master Boot Script
# Orchestrates: FastAPI Backend, Python Autonomous Daemon, React Dashboard
# ------------------------------------------------------------------

set -e

# Export homebrew path for node/npm
export PATH="/opt/homebrew/bin:$PATH"

# Colors for terminal styling
GREEN='\032[0;32m'
CYAN='\032[0;36m'
RED='\032[0;31m'
NC='\032[0m' # No Color

echo -e "${CYAN}=================================================${NC}"
echo -e "${CYAN}  QUANTX SENTINEL: SYSTEM BOOT INITIALIZATION    ${NC}"
echo -e "${CYAN}=================================================${NC}"

# Ensure backend venv is active and start FastAPI
echo -e "${GREEN}[1/3] Booting FastAPI Telemetry & Core Endpoints...${NC}"
cd backend
source venv/bin/activate || echo "No venv found. Assuming global python."
uvicorn main:app --port 8000 &
FASTAPI_PID=$!
sleep 2

# Start the Autonomous Nava Daemon
echo -e "${GREEN}[2/3] Engaging Autonomous Trading Daemon (nava_daemon.py)...${NC}"
python app/engine/nava_daemon.py &
DAEMON_PID=$!
sleep 1

# Start the Spatial Frontend
echo -e "${GREEN}[3/3] Launching React Spatial matrix on PORT 3010...${NC}"
cd ../frontend
PORT=3010 npm run dev &
FRONTEND_PID=$!

echo -e "${CYAN}=================================================${NC}"
echo -e "${CYAN}  ALL SYSTEMS NOMINAL. ENTERING MATRIX.          ${NC}"
echo -e "${CYAN}  Access UI at: http://localhost:3010/matrix     ${NC}"
echo -e "${CYAN}=================================================${NC}"

# Handle graceful shutdown on Ctrl+C
trap 'echo -e "${RED}\nShutting down subsystems...${NC}"; kill $FASTAPI_PID; kill $DAEMON_PID; kill $FRONTEND_PID; exit' SIGINT SIGTERM

wait
