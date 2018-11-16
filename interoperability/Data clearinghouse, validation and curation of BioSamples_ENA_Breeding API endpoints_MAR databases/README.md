# Data clearinghouse, validation and curation of BioSamples/ENA/Breeding API endpoints/MAR databases

### Representative: Luca Cherubin

## Community
---

ELIXIR Data clearinghouse, ELIXIR Data Validation and Bioschemas

## Leads
---
- Luca Cherubin
- Melanie Courtot
- Philippe Rocca Serra
- Nils Peder Willassen
- Cyril Pommier 

## Presentation
https://docs.google.com/presentation/d/1zfH3h-c0g2t_Wna9ixm5ZqKilpJmLEQ5wSPXETJ0-eI/edit?usp=sharing

## Background information
---
Regular practice in life science is to curate and publish high quality metadata describing experiments performed on biological sample(s).
Unfortunately this curated, high quality metadata is often not linked to the original assay and results, reducing data FAIRness.

A possible solution to this issue would be to integrate this diversity of resources by
1. Having metadata that can be easily extracted with bots/crawlers, 
2. Storing it in a central repository and
3. Validating it against predefined schema. 

These overlap with the goals of different ELIXIR implementation studies, including Bioschemas, Data Validation and the Establishment of an ELIXIR Contextual Data Clearinghouse Implementation study.

## Expected outcomes
---

A small subset of publications and curated data resources will be selected to build a proof of concept of an accession mapping - data clearing house - data validation and curation service to support the positive feedback loop to BioSamples, ENA and BrAPi repositories. 
We will:
Create an accessioning mapping service which leverages literature references to establish correspondence between services; Develop a clearinghouse for curation storage; Define JSON schema(s) and validate the metadata;

## Expected audience
---

Developers interested in Bioschemas applications;
Developers with knowledge on any of JavaScript, Java, GO, Python, data indexing tools;
Developers with knowledge on MongoDB, JSON and JSON Schema;
Data resource developers and owners;
Curator and data validators;
Ontologists
**Expected hacking days**: 4 days

## Tasks
During our hacking session we are going to focus on two different use cases:
1. BioSamples & MarRef use case
2. Plant phenotype usecase

### BioSamples and MarRef use case
For the BioSamples and MarRef use case we are planning the session this way:

#### Day 1
- Integration of Bioschemas into MarRef 
    - We are going to build a simple API service for MarRef to serve json-ld (Scala)
- Possibly start to work on a JSON schema version of the Sample bioschemas profile for validation purposes
    
#### Day 2
- Continue to work on JSON schema to validate the bioschemas exported from MarRef
- Start to curate BioSamples creating curation objects based on MarRef exported metadata

#### Day 3
- Continue to work on the curation of BioSamples
- Start to work on a prototype for the data clearing house

#### Day 4
- Continue as much as we can to develop the data clearing house

### Plant phenotype use case
For the plant phenotype use case, we are planning the session this way:

#### Day 1
- BrAPI v1.2 JSON-LD context 
- BrAPI v1.2 JSON Schemas 
- BrAPI 2 JSON-LD

#### Day 2
- Continue with unfinished tasks from day 1
- Validate BrAPi2ISA on all uses cases
  - Single experiment
  - Phenotyping network
  - Perenial plants

#### Day 3
- Continue with unfinished tasks from day 2
- Integrate BrAPi 2 ISA as a service

#### Day 4
- Continue with unfinished tasks from day 3
- Validate datasets 
  - Ontologies & JSON-LD
  - JSON-Schemas
  - ISA framework

## Related works and references
---

- [ELIXIR data validation implementation study](https://www.elixir-europe.org/about-us/implementation-studies/data-validation-2018)
- [ELIXIR Bioschemas](http://bioschemas.org/)
- [Establishment of an ELIXIR Contextual Data Clearinghouse](https://www.elixir-europe.org/news/new-portfolio-implementation-studies-selected-data-platform)
- [Data flow for the ELIXIR Contextual Data Clearinghouse](https://docs.google.com/drawings/d/1olEoapldmrJDfTRomHeCFdpxhJknJ7GFJO-WEMYzp5Y/edit)
- [Mar databases](https://mmp.sfb.uit.no/databases/)
- [MarRef data exchange with Bioschemas proof of concept](https://github.com/EBIBioSamples/bioschemas_marref_demo)
- [Human Cell Atlas metadata schema validation](https://github.com/HumanCellAtlas/ingest-validator)
- [EMBL-EBI Unified submission interface](https://github.com/EMBL-EBI-SUBS/json-schema-validator)
- [HipSci publication](https://www.ebi.ac.uk/biostudies/studies/S-BSST16) 
- [Breeding API](https://www.brapi.org)

## GitHub or any other public repositories of your FOSS products (if any)
---
- [Elixir JSON schema validator](https://github.com/elixir-europe/json-schema-validator)
- [MarRef data exchange with Bioschemas proof of concept](https://github.com/EBIBioSamples/bioschemas_marref_demo)
- [Bioschemas specifications](https://github.com/BioSchemas/specifications)
- [MIAPPE Specifications](https://github.com/MIAPPE/MIAPPE/tree/v1.1-rfc)
- [MIAPPE Ontology](https://github.com/MIAPPE/MIAPPE-ontology)
- [Elixir plant search Crawler/data harvester)](https://github.com/elixir-europe/plant-brapi-etl-data-lookup-gnpis)

## Hackers
- Guillaume Cornut
- ...
---

