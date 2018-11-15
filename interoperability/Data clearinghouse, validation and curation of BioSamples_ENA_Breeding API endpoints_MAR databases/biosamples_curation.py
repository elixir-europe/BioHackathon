import requests
import json
from biosamples_v4.api import Client as biosd_client
from biosamples_v4.aap import Client as aap_client

if __name__ == "__main__":
    acc = "MMP07276874"
    sample_url = "http://localhost:7777/marref/api/samples" . acc
    res = requests.get(sample_url)
    if res.status_code == 200:
        print(json.dumps(res.json(), indent=2))
