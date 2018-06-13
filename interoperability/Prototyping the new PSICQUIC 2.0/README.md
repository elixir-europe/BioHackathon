# Prototyping the new PSICQUIC 2.0

### Representative: Noemi del Toro

## Community
---

IntAct/IMEx (Elixir Core Resource)

## Leads
---
Noemi del Toro 

## Background information
---
This proposal covers the need to simplify the data deposition in PSICQUIC and improve the data consumption by migrating PSICQUIC from the current federated architecture to a distributed one.
 
The new PSICQUIC 2.0 will be based on two different concepts: myPSICQUIC and PSICQUIC Cloud. The main idea behind myPSICQUIC is to have the option of uploading the data through a fully automated process. PSICQUIC Cloud will provide molecular interaction data as a distributed, highly available, fault tolerant cluster of servers.
 
Initially, this new version of PSICQUIC will not replace the current one, it could be seen as an extension. In a second phase the data can be integrated into the PSICQUIC Cloud and it will be served as an unique data set.

## Expected outcomes
---

myPSICQUIC
Extension of the current PSI-MI validator by offering the option to upload the data and implementation of the data transfer to the PSICQUIC server.
 
PSICQUIC Cluster
Migration of Solr (back-end of PSICQUIC) from the current version to SolrCloud.

Other possible outcomes
Reusable web components for interaction network visualization. 
Integrating identifiers.org in PSICQUIC View for referencing external data.
New PSICQUIC clients in other languages like R or Python.

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

