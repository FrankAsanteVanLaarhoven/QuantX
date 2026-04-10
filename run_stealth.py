import asyncio
import os
import sys

# Append backend to path so we can import wq_agent
sys.path.append(os.path.join(os.path.dirname(__file__), 'backend'))

from app.services.wq_agent import wq_submitter

async def run_autonomous_strike():
    print("[SOTA OMEGA] Booting Autonomous Matrix Strike...")
    await wq_submitter.start_raid()
    # Keep alive endlessly
    while True:
        await asyncio.sleep(10)
        status = await wq_submitter.get_status()
        print(f"[METRICS] Stealth Status: {status['status']} | Logs: {len(status['logs'])}")

if __name__ == "__main__":
    try:
        asyncio.run(run_autonomous_strike())
    except KeyboardInterrupt:
        print("Terminating Strike.")
