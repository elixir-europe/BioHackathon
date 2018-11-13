from typing import TYPE_CHECKING

import yaml
import requests

import rdflib
from rdflib.namespace import RDF, FOAF

if TYPE_CHECKING:
    from publication_parser import SemanticPublication


with open('config.yaml') as fd:
    CONFIG = yaml.load(fd)


def add_entity(pub: 'SemanticPublication') -> None:
    """Add publication entry to ontology."""
    print('Adding...\n', pub)

    # setup ontology
    n = rdflib.Namespace('http://fubar.org/entities')
    g = rdflib.Graph()

    # add publication
    # TODO: make this actually work
    g.add((n[pub.doi], RDF.type, FOAF.Publication))
    g.add((n[pub.doi], FOAF.hasTitle, rdflib.Literal(pub.title)))
    g.add((n[pub.doi], FOAF.hasDOI, rdflib.Literal(pub.doi)))

    # add to ontology
    query = """
    INSERT IN GRAPH <http://foo.bar.baz>
    {
    %s
    }
    """ % g.serialize(format='nt').decode('utf-8')
    # print(query)

    session = requests.Session()
    session.headers = {'Accept': 'text/html'}

    data = {'query': query}
    resp = session.post(
        CONFIG['sparql_endpoint'],
        data=data)

    if not resp.ok:
        print('[ERROR]', resp.content)
