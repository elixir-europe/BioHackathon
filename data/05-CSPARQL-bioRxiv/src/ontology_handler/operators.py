from typing import TYPE_CHECKING

import rdflib
import requests
import yaml
from rdflib.namespace import RDF, DCTERMS, XSD, RDFS, FOAF

if TYPE_CHECKING:
    from publication_parser import SemanticPublication

with open('config.yaml') as fd:
    CONFIG = yaml.load(fd)

BIBO = rdflib.Namespace('http://purl.org/ontology/bibo/')
IDENTIFIERS = rdflib.Namespace('http://identifiers.org/')
CUSTOM = rdflib.Namespace('http://foo.bar.baz/')
EDAM = rdflib.Namespace('http://edamontology.org/')


def add_entity(pub: 'SemanticPublication') -> None:
    """Add publication entry to ontology."""
    print('Adding...\n', pub)

    # setup ontology
    g = rdflib.Graph()

    # add publication
    subject = IDENTIFIERS[f"doi/{pub.doi}"]
    g.add((subject, RDF.type, BIBO.AcademicArticle))
    g.add((subject, BIBO.doi, rdflib.Literal(pub.doi, datatype=XSD.string)))
    g.add((subject, RDFS.seeAlso, rdflib.URIRef(pub.pdf_url)))

    if pub.data:
        for dd in pub.data:
            g.add((subject, CUSTOM.containsData, rdflib.URIRef(dd['uri'])))

    if pub.format:
        for dd in pub.format:
            g.add(
                (subject, CUSTOM.containsDataFormat, rdflib.URIRef(dd['uri'])))

    if pub.operation:
        for dd in pub.operation:
            g.add(
                (subject, CUSTOM.containsOperation, rdflib.URIRef(dd['uri'])))

    if pub.topic:
        for dd in pub.topic:
            g.add((subject, EDAM.has_topic, rdflib.URIRef(dd['uri'])))

    if pub.publication_date:
        g.add((subject, DCTERMS.created,
               rdflib.Literal(
                   pub.publication_date.utcnow(), datatype=XSD.datetime)))
    if pub.title:
        g.add((subject, DCTERMS.title,
               rdflib.Literal(pub.title, datatype=XSD.string)))
    if pub.abstract:
        g.add((subject, BIBO.abstract,
               rdflib.Literal(pub.abstract, datatype=XSD.string)))
    if pub.authors:
        list_authors = rdflib.BNode()
        g.add((subject, BIBO.authorList, list_authors))
        for author in pub.authors:
            author_node = rdflib.BNode()
            g.add((author_node, RDF.type, FOAF.person))
            surname = author.get('surname')
            if surname:
                g.add((author_node, FOAF.familyName,
                       rdflib.Literal(surname, datatype=XSD.string)))
            given_names = author.get('given_names')
            if given_names:
                g.add((author_node, FOAF.givenName,
                       rdflib.Literal(given_names, datatype=XSD.string)))
            email = author.get('email')
            if email:
                g.add((author_node, FOAF.mbox,
                       rdflib.Literal(email, datatype=XSD.string)))
            full_name = f'{given_names} {surname}'
            g.add((author_node, FOAF.name,
                   rdflib.Literal(full_name, datatype=XSD.string)))
            g.add((list_authors, RDFS.member, author_node))
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
    resp = session.post(CONFIG['sparql_endpoint'], data=data)

    if not resp.ok:
        print('[ERROR]', resp.content)
