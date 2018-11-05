# Prototyping the new PSICQUIC 2.0

### Representative: Noemi del Toro

## Community
---

IntAct/IMEx (Elixir Core Resource)

## Leads
---
Noemi del Toro 

## Background information
---
PSICQUIC (http://www.ebi.ac.uk/Tools/webservices/psicquic/view/) is an effort from the HUPO Proteomics Standards Initiative (HUPO-PSI) (http://www.psidev.info/) to standardise programmatic access to molecular interaction databases. Basically, PSICQUIC defines a minimum set of standard SOAP and REST methods to be implemented by every molecular interaction provider. These methods accept a MIQL query (http://psicquic.github.io/MiqlReference28.html) as input (MIQL defines a set of standard fields to query molecular interaction data, extending the syntax of the Apache Lucene query language on which it is based) and return, as output, molecular interaction information in one of the standard formats (e.g. PSI-XML 2.5, PSI-MITAB 2.5, PSI-MITAB 2.6, PSI-MITAB 2.7, PSI-MITAB 2.8).
 
Currently, users are expected to obtain the PSICQUIC web service SOAP or REST URLs by means of querying the PSICQUIC Registry that contains information about the status of the services and some general information about them. After having the different webservice end-points the clients can perform exactly the same query to each service for retrieving the data.

Many interaction databases are already serving their data through PSICQUIC by using the latest reference implementation based on the latest specification. This software, from the data provider’s perspective, allows a local PSICQUIC server to be easily set up and loaded with data in a valid PSI-MITAB format.
 
This local installation can be opened afterwards to data consumers by adding it to the PSICQUIC Registry (http://www.ebi.ac.uk/Tools/webservices/psicquic/registry/registry?action=STATUS). Currently, the registration process needs some human intervention and the new services need to be added to the registry manually.
 
This strategy has been proven to be successful especially if we take into account the number of services that have already adopted it, as we can see in the PSICQUIC registry. However, this implies certain level of long term commitment and maintenance from the data providers that they cannot always afford (e.g. deployment of the server hosting PSICQUIC, making small modifications to the default implementation to accommodate the data better, etc.).
 
This proposal to develop PSICQUIC 2.0 during the BioHackathon covers the need to simplify the data deposition in PSICQUIC and to reduce some of the highlighted difficulties. At the same time it is expected that the new version will improve the data consumption for end users by migrating PSICQUIC from the current federated architecture to a distributed one.
 
The new PSICQUIC 2.0 will be based on two different concepts: myPSICQUIC and PSICQUIC Cloud. The main idea behind myPSICQUIC is to have the option of uploading molecular interaction data through a fully automated process. PSICQUIC Cloud, as its name reflects, will provide molecular interaction data as a distributed, highly available, fault tolerant cluster of servers.
 
Initially, this new version of PSICQUIC will not replace the current one, it could be seen as an extension where the users could do their data deposition independently using myPSICQUIC through a new PSICQUIC service. In a second phase the data from the different services can be integrated into the PSICQUIC Cloud and it will be served as an unique data set.
 
One major advantage of hosting the information as a single distributed network is that the data will be served directly as a combined result and the option of sorting will be provided by default. This is in contrast to the current status where some data post-processing in the clients, i.e. concatenating results from the several sources and sorting them afterwards, is required to obtain the results.

## Expected outcomes
---

The output of the BioHackathon is expected to be in the two main components of PSICQUIC 2.0. Both components could be developed in parallel and be integrated at the end.
 
myPSICQUIC
Due to the complexity of the molecular interaction data, the data must be validated before it is uploaded to a PSICQUIC server. Currently, there is an online tool that offers that validation (https://www.ebi.ac.uk/intact/validator/start.xhtml). The participants will need to work on the extension of the current validator by offering the option to upload the data at the end of the validation process (if this has been successful). Apart from the different changes at the front-end to incorporate the new functionality, the data transfer from the validator to the PSICQUIC server will need to be implemented.
 
PSICQUIC Cluster
Currently, the reference implementation of PSICQUIC is based in a previous version of Apache Solr (http://lucene.apache.org/solr) that gives all the capabilities of indexing and searching molecular interaction data under the hood. During the hackathon it is expected that the participants will be involved in the migration of Solr from the current standalone version to SolrCloud with the extra capabilities that it provides (https://lucene.apache.org/solr/guide/7_3/getting-started-with-solrcloud.html). This will allow the continued use of Solr at the back-end and allow updating PSICQUIC to a distributed architecture.
 
Other possible outcomes
Due to the nature of the data some participants interested in network visualization could collaborate on the development of reusable web components for interaction network visualization. 
At the same time, improving existing clients like PSICQUIC view by integrating identifiers.org (http://identifiers.org/) for referencing external data, or developing new PSICQUIC clients in other languages like R or Python could be an interesting outcomes for the participants of the hackathon.


## Expected audience
---

Programmers. Previous knowledge in Java, Spring and Solr is recommended but not mandatory.

**Expected hacking days**: 4 days

## Related works and references
---

- [PSICQUIC and PSISCORE: accessing and scoring molecular interactions](https://www.nature.com/articles/nmeth.1637)
- [A new reference implementation of the PSICQUIC web service](https://academic.oup.com/nar/article/41/W1/W601/1100276)
- [PSICQUIC documentation](http://psicquic.github.io/)

## GitHub or any other public repositories of your FOSS products (if any)
---

- [PSI-MI Validator GitHub repository](https://github.com/MICommunity/psi-mi-validator)
- [PSICQUIC GitHub Organization](https://github.com/PSICQUIC)

## Hackers
---
Elisabet Barrera
John Zobolas
