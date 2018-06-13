# JSON schema validation with ontologies

### Representative: Simon Jupp

## Community
---

ELIXIR-EMBL / EMBL-EBI

## Leads
---
Simon Jupp 

## Background information
---
JSON schema provides a way to describe and validate the structure and content of JSON documents. JSON schema is increasingly being adopted to validate data that gets submitted to life sciences archival databases. As resources increasingly look towards ontologies to provide a controlled vocabulary for describing metadata, there is a need for validation tools that are also ontology aware in order to ensure the ontology terms provided are valid and relevant. There are several examples of JSON schemas that use custom syntax to describe ontology fields, but there is currently no agreed standard for doing this nor a standard set of libraries for ontology aware JSON schema validators. 

## Expected outcomes
---

Agree on a standard for extending JSON schema with details of properties that require an ontology accession. This will build on existing implementations to provide a standard way fo doing this for life science data. This will include a reference implementation for JavaScript and Python based JSON schema validator. These validators will perform the validation against the Ontology Lookup Service, although a SPARQL and/or BioPortal based implementation would also be desirable. 

## Expected audience
---

Developers of metadata schema standards and data resources that accept data submissions in JSON format. Archival databases e.g. ENA, BioSamples, Human Cell Atlas. Programmers working with ontologies, python and/or javascript
**Expected hacking days**: 4 days

## Related works and references
---

- Human Cell Atlas metadata schema validation - https://github.com/HumanCellAtlas/ingest-validator 
- EMBL-EBI Unified submission interface - https://github.com/EMBL-EBI-SUBS/json-schema-validator 
- Elixir data validation implementation study - https://www.elixir-europe.org/about-us/implementation-studies/data-validation-2018 
- Functional Annotation of Animal Genomes project (FAANG) validator - https://www.ebi.ac.uk/vg/faang/rule_sets/FAANG%20Samples 
- CEDAR project JSON schema validation - https://github.com/metadatacenter/json-schema-validation-exp 
- ISA-JSON schema validator with ontology support - http://isa-specs.readthedocs.io/en/latest/isajson.html 
- JSON-LD for RDF representation of JSON https://json-ld.org 
- W3C Shapes and constraint language SHACL (https://www.w3.org/TR/shacl/) 
- Validata - RDF validator using ShEx, https://www.w3.org/2015/03/ShExValidata/


## GitHub or any other public repositories of your FOSS products (if any)
---



## Hackers
---

