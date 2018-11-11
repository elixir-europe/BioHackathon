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

- [Human Cell Atlas metadata schema validation](https://github.com/HumanCellAtlas/ingest-validator)
- [EMBL-EBI Unified submission interface](https://github.com/EMBL-EBI-SUBS/json-schema-validator)
- [MarRef data exchange with Bioschemas proof of concept](https://github.com/EBIBioSamples/bioschemas_marref_demo)
- [Bioschemas specifications](https://github.com/BioSchemas/specifications)
- [MIAPPE Specifications](https://github.com/MIAPPE/MIAPPE/tree/v1.1-rfc)
- [MIAPPE Ontology](https://github.com/MIAPPE/MIAPPE-ontology)
- [Elixir plant search Crawler/data harvester)](https://github.com/elixir-europe/plant-brapi-etl-data-lookup-gnpis)

## Hackers
- Guillaume Cornut
- ...
---

