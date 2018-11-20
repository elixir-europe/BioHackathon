import configparser

import requests
import json
from biosamples_v4.models import Curation
from biosamples_v4.api import Client as biosd_client
from biosamples_v4.aap import Client as aap_client
from biosamples_v4.utilities import is_successful


def read_config(filename):
    """
    Read configuration from file
    :param filename: name of the configuration file
    :return: the config object
    """
    config = configparser.RawConfigParser()
    config.read_file(open(filename))
    return config


config = read_config("configuration.ini")

aap_url = config['AAP']['aap_url']
aap_username = config['AAP']['aap_bh_user']
aap_password = config['AAP']['aap_bh_password']
aap_curation_domain = config['AAP']['aap_bh_curation_domain']

marref_base_url = config['MARREF']['local_url']
validation_url = config['VALIDATION']['validation_url']
biosamples_url = config['BIOSAMPLES']['local_url']

bsd_client = biosd_client(url=biosamples_url)
aap_client = aap_client(username=aap_username, password=aap_password, url=aap_url)

def get_marref_accessions():
    """
    Get all the MarRef ids
    :return:
    """
    url = "{}/ids".format(marref_base_url)
    res = requests.get(url)
    if is_successful(res):
        return res.json()
    res.raise_for_status()


def get_marref_sample_bioschemas(mmp_id):
    """
    Get the jsonld version of a marref sample usin the API
    :param mmp_id:
    :return:
    """
    url = "{}/samples/{}".format(marref_base_url, mmp_id)
    headers = {'accept': 'application/ld+json'}
    res = requests.get(url, headers=headers)
    if is_successful(res):
        return res.json()
    res.raise_for_status()


def validate(data, schema):
    """
    Validate the provided data against the schema using an external json schema validator
    :param data:
    :param schema:
    :return:
    """
    res = requests.post(validation_url, json={"schema": schema, "object": data})
    if is_successful(res):
        return res.json()
    res.raise_for_status()


def is_data_valid_against_schema(data, schema):
    """
    Check if the provided data is valid against the schema
    :param data:
    :param schema:
    :return:
    """
    validation_result = validate(data=data, schema=schema)
    if validation_result['validationState'] == "VALID":
        return True
    else:
        return False


def get_biosamples_accession(jsonld):
    identifier_org_id = [acc for acc in jsonld['identifier'] if acc.startswith("biosample")][0]
    return identifier_org_id.replace("biosample:", "")


def create_curation_object_for_sample(marref, biosd):
    curation_obj = Curation()
    attributesPre = list()
    for k, v in biosd['characteristics'].items():
        sing_attr = {'type': k, 'value': v[0]['text']}
        if 'ontologyTerms' in v[0]:
            sing_attr['iri'] = [x for x in v[0]['ontologyTerms']]
        attributesPre.append(sing_attr)
    externalRefPre = list()
    attributesPost = list()

    for pv in [_pv for _pv in marref['additionalProperty'] if _pv['value'] != 'NotDefined']:
        apost = {
            "type": pv['name'],
            "value": pv['value']
        }
        if 'valueReference' in pv:
            apost['iri'] = [x['url'] for x in pv['valueReference']]
        attributesPost.append(apost)
    externalRefPost = [{'url': marref['url']}]

    curation_obj.attr_pre = attributesPre
    curation_obj.attr_post = attributesPost
    curation_obj.rel_pre = externalRefPre
    curation_obj.rel_post = externalRefPost

    return curation_obj


def use_valid_marref_sample(jsonld):
    biosamples_accession = get_biosamples_accession(jsonld)
    bsd_sample = bsd_client.fetch_sample(accession=biosamples_accession)
    cobj = create_curation_object_for_sample(marref=jsonld, biosd=bsd_sample)
    bsd_client.curate_sample(sample=bsd_sample, curation_object=cobj,
                             domain=aap_curation_domain, jwt=aap_client.get_token())


if __name__ == "__main__":
    config = read_config("configuration.ini")
    marref_accessions = get_marref_accessions()

    with open('sample_schema.json', 'r', encoding='UTF-8') as schema_file:
        bioschemas_sample_schema = json.load(fp=schema_file)

    for acc in marref_accessions:
        jsonld = get_marref_sample_bioschemas(acc)
        if is_data_valid_against_schema(data=jsonld, schema=bioschemas_sample_schema):
            # Check if sample exists in BioSamples
            use_valid_marref_sample(jsonld)
            print("Sample {} has been curated to MarRef standard".format(acc))
        else:
            print("Sample {} is not bioschemas valid".format(acc))
