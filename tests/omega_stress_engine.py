import asyncio
import aiohttp
import time
import json
import statistics

# -------------------------------------------------------------
# OMEGA ARCHITECTURE STRESS ENGINE
# -------------------------------------------------------------
# Designed to benchmark the FastAPI WebSocket and REST capacity
# by bombarding it with concurrent asynchronous payloads.

TARGET_URL = "http://127.0.0.1:8000/api/macro/sentiment"
CONCURRENT_USERS = 500

async def fire_request(session, req_id):
    start = time.perf_counter()
    payload = {"query": f"Geopolitical constraint check {req_id}"}
    try:
        # Pinging the Fundamental Disconnect Endpoint
        async with session.post(TARGET_URL, json=payload, timeout=aiohttp.ClientTimeout(total=5)) as response:
            await response.text()
            latency = time.perf_counter() - start
            return {"status": response.status, "latency": latency}
    except Exception as e:
        return {"status": "FAILED", "latency": time.perf_counter() - start, "error": str(e)}

async def main():
    print(f"\n[OMEGA CORE] INITIATING STRESS TEST: {CONCURRENT_USERS} CONCURRENT ASYNC REQUESTS")
    print(f"Target: {TARGET_URL}\n")
    
    start_time = time.time()
    
    async with aiohttp.ClientSession() as session:
        tasks = [fire_request(session, i) for i in range(CONCURRENT_USERS)]
        results = await asyncio.gather(*tasks)

    total_time = time.time() - start_time
    
    successes = [r for r in results if r["status"] == 200]
    failures = [r for r in results if r["status"] != 200]
    
    if successes:
        latencies = [r["latency"] for r in successes]
        avg_lat = statistics.mean(latencies) * 1000
        p95_lat = statistics.quantiles(latencies, n=20)[18] * 1000  # 95th Percentile
    else:
        avg_lat = p95_lat = 0
        
    print("="*50)
    print("                STRESS TEST RESULTS                 ")
    print("="*50)
    print(f"Total Requests  : {CONCURRENT_USERS}")
    print(f"Concurrency     : {CONCURRENT_USERS} simul-threads")
    print(f"Total Time      : {total_time:.2f} seconds")
    print(f"Throughput      : {CONCURRENT_USERS / total_time:.2f} req/sec")
    print("\n--- LATENCY METRICS ---")
    print(f"Average Latency : {avg_lat:.2f} ms")
    print(f"p95 Latency     : {p95_lat:.2f} ms")
    print("\n--- STABILITY ---")
    print(f"Successes (200) : {len(successes)}")
    print(f"Failures / Drops: {len(failures)}")
    if failures:
        print(f"Sample Error    : {failures[0].get('error')}")
    print("="*50)

if __name__ == "__main__":
    # Note: Install aiohttp before running: pip install aiohttp
    asyncio.run(main())
