import os
import sys
sys.path.insert(0, os.path.abspath('backend/app'))
from ingestion_engine import OSINTDataAggregator
import pprint

agg = OSINTDataAggregator()
res = agg.fetch_unified_intelligence('NVDA')
pprint.pprint(res)
