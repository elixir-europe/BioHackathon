import collections
from typing import ValuesView, Dict, Optional

import yaml
from SPARQLWrapper import SPARQLWrapper, JSON

with open('config.yaml') as fd:
    CONFIG = yaml.load(fd)

DIRECT_MAPPING_FIELD_PROPERTIES = {
    "title": "http://purl.org/dc/terms/title",
    "doi": "http://purl.org/ontology/bibo/doi",
    "abstract": "http://purl.org/ontology/bibo/abstract"
}

REVERSE_MAPPING = {value: key for key, value in DIRECT_MAPPING_FIELD_PROPERTIES.items()}

INDIRECT_MAPPING_FIELD_PROPERTIES = {
    "authors": "",
    "year": ""
}


def get_properties():
    """All candidates of properties for advanced search."""
    return list(DIRECT_MAPPING_FIELD_PROPERTIES.keys() | INDIRECT_MAPPING_FIELD_PROPERTIES.keys())


def get_total_papers():
    """Total number of papers stored into virtuoso."""
    return 100000


def get_pattern_for(key: str, value: str, index: int) -> str:
    property_uri = DIRECT_MAPPING_FIELD_PROPERTIES.get(key)
    var_name = 'o' * (index + 2)
    if property_uri:
        tmp = f'?publication <{property_uri}> ?{var_name} . '
        tmp += f'FILTER contains(lcase(str(?{var_name})), "{value.lower()}") .'
    else:
        raise NotImplementedError("property not supported yet")
    return tmp


def form_to_sparql(form_data: str) -> Optional[str]:
    if 'q' not in form_data:
        return None
    msg = form_data['q']

    stmts = []
    for i, entry in enumerate(msg.split()):
        try:
            key, *vals = entry.split(':')
            val = ':'.join(vals)
        except ValueError:
            return None

        try:
            tmp = get_pattern_for(key, val, i)
        except NotImplementedError as e:
            print(e)
        else:
            stmts.append(tmp)

    statements = '\n'.join(stmts)
    query = f'''
    SELECT ?publication ?p ?o
    FROM <http://foo.bar.baz>
    WHERE
    {{
        {statements}
        ?publication ?p ?o
    }}
    '''

    # print(query)
    return query


def execute_query(form_data: str) -> ValuesView[Dict[str, str]]:
    # assemble query
    query = form_to_sparql(form_data)
    if query is None:
        return []

    # SPARQL request
    sparql = SPARQLWrapper(CONFIG['sparql_endpoint'])
    sparql.setQuery(query)
    sparql.setReturnFormat(JSON)
    results = sparql.query().convert()

    # parse result
    output: Dict[str, Dict[str, str]] = collections.defaultdict(dict)
    for entry in results['results']['bindings']:
        idx = entry['publication']['value']
        key = entry['p']['value']
        val = entry['o']['value']
        key = REVERSE_MAPPING.get(key, key)
        if key == 'doi':
            output[idx]["url"] = f'http://doi.org/{val}'
        output[idx][key] = val

    return output.values()
