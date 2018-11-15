
from .base_extractor import SemanticExtractor
from typing import Dict
import json
import requests


class EdamExtractor(SemanticExtractor):
    """
    The class that parses the document using EDAM ontology
    Externally calls the EDAM API from command line

    """
    def __init__(self):
        pass

    def parse(self, meta_info: Dict[str, str]):

        try:
            doi = meta_info['doi']
        except KeyError:
            print("doi does not exist as a meta info")
            return None

        try:
            path = "./publication_parser/extractors/edam_files/"
            with open(path + 'sample_input.json') as f:
                edam_inp = json.load(f)
        except IOError:
            print("could not read the sample_input.json file")
            return None

        # update the doi
        edam_inp['publicationIds'][0]['doi'] = doi

        r = requests.post("https://biit.cs.ut.ee/edammap/api", json=edam_inp,
                          headers={"Content-Type": "application/json"})

        response = None
        if r.ok:  # true if status code is < 400
            response = r.json()

        filtered_response = {}
        if response['success']:  # edam managed to parse
            for key in response['mapping']['results']:
                try:
                    lst = []
                    for item in response['mapping']['results'][key]:
                        lst.append({"value": item['label'], "uri": item['edamUri']})
                    filtered_response[key] = lst
                except TypeError as e:
                    print(type(e))
                    continue

        if filtered_response == {}:
            filtered_response = None

        return filtered_response
