import collections

import yaml
from SPARQLWrapper import SPARQLWrapper, JSON


with open('config.yaml') as fd:
    CONFIG = yaml.load(fd)

def get_total_papers():
    """Total number of papers stored into virtuoso"""
    return 100000

def execute_query(form_data):
    query = f'''
    SELECT ?s ?pp ?oo
    FROM <http://foo.bar.baz>
    WHERE
    {{
        ?s ?p ?o .
        FILTER contains(lcase(str(?o)), "{form_data["q"]}") .
        ?s ?pp ?oo
    }}
    '''
    # print(query)

    # SPARQL request
    sparql = SPARQLWrapper(CONFIG['sparql_endpoint'])
    sparql.setQuery(query)
    sparql.setReturnFormat(JSON)
    results = sparql.query().convert()

    # parse result
    output = collections.defaultdict(dict)
    for entry in results['results']['bindings']:
        idx = entry['s']['value']
        key = entry['pp']['value'].split('/')[-1][3:].lower()
        val = entry['oo']['value']

        # print(entry)
        # print(idx, key, val)

        output[idx][key] = val

    return output.values()
