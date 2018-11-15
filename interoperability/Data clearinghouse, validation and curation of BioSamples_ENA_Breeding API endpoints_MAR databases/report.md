# Data Clearinghouse, validation and curation of BioSamples, ENA, Breeding API endpoints and MAR databases

## Tuesday 13 November 2018

- Worked with DDBJ to review current BioSamples RDF model. Agreed on using Bioschemas for this purpose. EBI RDF platform will load it. Required change to sample profile in bioschemas to add type of property (eg, “organism” is of type http://purl.obolibrary.org/obo/OBI_0100026”). Changes have been made in the bioschemas spreadsheets to be pushed by maintainers to the draft spec page.

- Discussion with Bioschemas about sample profile and representation of structured data.

- Dominique was able to validate the BioSamples Bioschemas export against a JSON schema representation of the Sample Bioschemas spec. All committed under GH

- Started to work on a simple API layer for MarRef database using Scala and Spring to expose samples using json+ld and json format




## Wednesday 14 November 2018

- Built a proof of concept for a MarRef API able to expose both JSON and JSON-LD (Bioschemas) 

- Initialized a docker environment to facilitate the integration of the MarRef API with the JSON schema validator and the client to curate BioSamples

- Uploaded a biosamples-v4 python client to Pypi to be easily accessible from one of our scripts


## Thursday 15 November 2018

