import collections

import yaml
from SPARQLWrapper import SPARQLWrapper, JSON

from typing import ValuesView, Dict, Optional


with open('config.yaml') as fd:
    CONFIG = yaml.load(fd)


def get_properties():
    """All candidates of properties for advanced search."""
    return ["hasTitle", "hasAuthors", "hasYear", "hasUrl", "hasDoi", "hasAbstract"]


def get_total_papers():
    """Total number of papers stored into virtuoso."""
    return 100000


def form_to_sparql(form_data: str) -> Optional[str]:
    if 'q' not in form_data:
        return None
    msg = form_data['q']

    stmts = []
    for i, entry in enumerate(msg.split()):
        try:
            key, val = entry.split(':')
        except ValueError:
            return None

        varname = 'o' * (i+1)  # need different variable per filter

        tmp = f'?foo <http://fubar.org/properties/{key}> ?{varname} . '
        tmp += f'FILTER contains(lcase(str(?{varname})), "{val.lower()}") .'
        stmts.append(tmp)

    statements = '\n'.join(stmts)
    query = f'''
    SELECT ?foo ?bar ?baz
    FROM <http://foo.bar.baz>
    WHERE
    {{
        {statements}
        ?foo ?bar ?baz
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
        idx = entry['foo']['value']
        key = entry['bar']['value'].split('/')[-1][3:].lower()
        val = entry['baz']['value']

        output[idx][key] = val

    return output.values()
