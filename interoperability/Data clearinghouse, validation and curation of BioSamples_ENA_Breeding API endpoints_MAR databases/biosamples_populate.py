import configparser
import requests
from biosamples_v4.utilities import is_successful, is_status
from biosamples_v4.api import Client as BiosdClient
from biosamples_v4.aap import Client as AapClient


def read_config(filename):
    """
    Read configuration from file
    :param filename: name of the configuration file
    :return: the config object
    """
    config = configparser.RawConfigParser()
    config.read_file(open(filename))
    return config


def get_marref_accessions(mmp_url):
    url = "{}/ids".format(mmp_url)
    res = requests.get(url=url, params={'accession': 'biosample'})
    if is_successful(res):
        return res.json()
    res.raise_for_status()


def is_error_status(e, status_code):
    return is_status(e.args[1], status_code)


if __name__ == "__main__":
    config = read_config("configuration.ini")

    aap_url = config['AAP']['aap_url']
    aap_username = config['AAP']['aap_username']
    aap_password = config['AAP']['aap_password']

    bsd_source_url = config['BIOSAMPLES']['remote_url']
    bsd_dest_url = config['BIOSAMPLES']['local_url']

    mmp_local_url = config['MARREF']['local_url']

    bsd_remote_client = BiosdClient(url=bsd_source_url)
    bsd_local_client = BiosdClient(url=bsd_dest_url)
    aap_client = AapClient(url=aap_url, username=aap_username, password=aap_password)

    all_sample_accessions_in_marref = get_marref_accessions(mmp_url=mmp_local_url)
    for acc in all_sample_accessions_in_marref:
        try:
            sample = bsd_remote_client.fetch_sample(accession=acc)
        except Exception as err:
            if is_error_status(err, 403):
                print("Sample {} is private".format(acc))
                continue
        local_sample = bsd_local_client.persist_sample(sample=sample, jwt=aap_client.get_token())

        # Check if sapmle exist locally now
        check_sample = bsd_local_client.fetch_sample(accession=acc)
        print("Sample {} has been persisted in the local BioSamples".format(acc))
