import yaml
from SPARQLWrapper import SPARQLWrapper, JSON


with open('config.yaml') as fd:
    CONFIG = yaml.load(fd)

def get_total_papers():
    """Total number of papers stored into virtuoso"""
    return 100000

def execute_query(form_data):
    print(form_data)

    # SPARQL request
    sparql = SPARQLWrapper(CONFIG['sparql_endpoint'])
    sparql.setQuery('''
    select distinct ?Concept where {[] a ?Concept} LIMIT 100
    ''')
    sparql.setReturnFormat(JSON)
    results = sparql.query().convert()

    # parse result
    output = []
    for entry in results['results']['bindings']:
        # TODO: actually extract data
        print(entry)

        output.append({
            'title': 'VeryImportant',
            'doi': '42',
            'author': 'Mr. Egg',
            'year': '1337',
            'abstract': 'blabla',
            'url': 'example.org'
        })

    return output
