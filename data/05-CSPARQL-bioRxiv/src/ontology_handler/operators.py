import os

from typing import TYPE_CHECKING

import yaml
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
    g.add((n[pub.doi], RDF.type, FOAF.Publication))
    g.add((n[pub.doi], FOAF.hasTitle, rdflib.Literal(pub.title)))
    g.add((n[pub.doi], FOAF.hasDOI, rdflib.Literal(pub.doi)))

    # save ontology
    # TODO: don't overwrite existing ontology
    fname = CONFIG['ontology_file']
    os.makedirs(os.path.dirname(fname), exist_ok=True)
    g.serialize(destination=fname, format='xml')
