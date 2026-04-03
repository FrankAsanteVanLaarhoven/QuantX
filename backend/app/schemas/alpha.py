from pydantic import BaseModel, ConfigDict
from typing import List, Dict, Optional
from datetime import datetime
from enum import Enum
import uuid

class AlphaStatus(str, Enum):
    UNSUBMITTED = "Unsubmitted"
    ACTIVE = "Active"
    DECOMMISSIONED = "Decommissioned"

class AlphaMetrics(BaseModel):
    sharpe: float
    returns: float
    turnover: float
    margin: float

class AlphaBase(BaseModel):
    expression: str
    region: str
    universe: str
    tags: List[str] = []

class AlphaCreate(AlphaBase):
    pass

class Alpha(AlphaBase):
    id: str
    status: AlphaStatus
    metrics: Optional[AlphaMetrics] = None
    created_at: datetime
    
    model_config = ConfigDict(from_attributes=True)
