import requests
import jwt
from datetime import datetime, timedelta, timezone

JWT_SECRET_KEY = "quantx_institutional_secret_2026"
token = jwt.encode({"sub": "admin", "exp": datetime.now(timezone.utc) + timedelta(hours=1)}, JWT_SECRET_KEY, algorithm="HS256")

res = requests.post("http://localhost:8000/api/iqc/simulate_guard", 
              json={"period": "1Y", "component_type": "overfitting", "active": True},
              headers={"Authorization": f"Bearer {token}"})
print(res.json())
