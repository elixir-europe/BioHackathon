# Building an ontology for biology publications in real-time using event stream processing

### Representative: Mustafa Anil Tuncel

## Community
---

ETH-Zurich Computational Biology Group

## Leads
---
- Mustafa Anil Tuncel
- mustafa.tuncel@bsse.ethz.ch
- Kim Philipp Jablonski
- kim.jablonski@bsse.ethz.ch
- Ivan Topolsky
- ivan.topolsky@bsse.ethz.ch

## Background information
---
Keeping up with the constant flow of new articles being published in various Journals is a challenge. Recent mitigation techniques, such as twitter and email notifications, address this problem but still require complex efforts and non-trivial filtering and selection queries in order to be useful.
We try to ease this burden by providing a system to continuously analyses new articles while leveraging smart queries using BioSchemas, CSPARQL and BioRxiv as the underlying data source.

![](https://raw.githubusercontent.com/elixir-europe/BioHackathon/master/data/C-SPARQL%20powered%20querying%20pipeline%20of%20bioRxiv%20publications/system_overview.png)

## Expected outcomes
---

1) A service that monitors the BioRxiv twitter feed and continuously parses relevant metainformation into easily machine-readable BioSchemas.

2) A notification system with a powerful query-language to perform complex pattern matching and thus focusing the user on the most relevant subset of topics within the stream of publications.

3) An interface to allow users to perform SPARQL queries on the continuously updated publications ontology.

## Call for additional expertise from biohackathon attendees
* NLP experts to extract biological information from text
* Experience in web-technologies
* Experience in RDF, SPARQL, ontologies
* Biologists for domain knowledge e.g. what information to parse from the publications
* People with curiosity :) <br>
**Expected hacking days**: 5 days

## Tasks
* Retrieving stream data from ArXiv/BioarXiv feeds using twitter stream api
* Retrieving the pdf/latex of the publication from ArXiv/BioarXiv/PubMed
* Extracting information from the latex/pdf files
* Creating/reusing the ontology
* Updating the ontology whenever a new paper is published
* Starting the sparql server (apache jena fuseki, python flask/rdflib, etc.)
* User interface
* Querying page UI
* Results in both text and graph

## Related works and references
---

- https://github.com/RDFLib/rdflib
- http://bioschemas.org/
- https://github.com/streamreasoning/CSPARQL-engine
- https://developer.twitter.com/en/docs/tutorials/consuming-streaming-data.html
- https://jena.apache.org/documentation/fuseki2/


## Hackers
---
- https://github.com/anilbey
- https://github.com/kpj
- https://github.com/dryak
