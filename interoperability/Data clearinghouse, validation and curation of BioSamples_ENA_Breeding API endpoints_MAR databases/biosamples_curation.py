import requests
import json
from biosamples_v4.api import Client as biosd_client
from biosamples_v4.aap import Client as aap_client
from biosamples_v4.utilities import is_successful

marref_base_url = "http://localhost:7777/marref/api"
validation_url = "http://localhost:7788/validate"
biosamples_url = "http://localhost:8081/biosamples"


def get_marref_accessions():
    url = "{}/ids".format(marref_base_url)
    res = requests.get(url)
    if is_successful(res):
        return res.json()
    res.raise_for_status()


def get_marref_sample_bioschemas(mmp_id):
    url = "{}/samples/{}".format(marref_base_url, mmp_id)
    headers = {'accept': 'application/ld+json'}
    res = requests.get(url, headers=headers)
    if is_successful(res):
        return res.json()
    res.raise_for_status()


def validate(value, schema):
    res = requests.post(validation_url, json={"schema": schema, "object": value})
    return res.json()


if __name__ == "__main__":
    marref_accessions = get_marref_accessions()

    with open('sample_schema.json', 'r', encoding='UTF-8') as schema_file:
        bioschemas_sample_schema = json.load(fp=schema_file)

    for acc in marref_accessions[:10]:
        jsonld = get_marref_sample_bioschemas(acc)
        validation_response = validate(value=jsonld, schema=bioschemas_sample_schema)
        print(json.dumps(validation_response, indent=2))
