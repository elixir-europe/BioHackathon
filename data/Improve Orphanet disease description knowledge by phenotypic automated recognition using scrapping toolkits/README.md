# Improve Orphanet disease description knowledge by phenotypic automated recognition using scrapping toolkits.

### Representatives:  David Lagorce , Marc Hanauer

## Community
---

Orphanet INSERM US14 - Elixir FR - Excelerate WP8 Rare diseases

## Leads
---
- David Lagorce
- david.lagorce@inserm.fr
- Marc Hanauer
- marc.hanauer@inserm.fr

## Background information
---
Orphanet is a website dedicated to rare diseases, providing several kind of information such nomenclature, classifications, textual information, disorders/genes relations and also dedicated resources in the field (Experts centres, Diagnostic tests, clinical trials, orphandrugs, registries and biobanks, supports groups etc.) for more than 40 countries. 
The site has a huge audience, around 1 million unique visitors/month and 8 languages.
![Orphanet](https://github.com/elixir-europe/BioHackathon/blob/master/interoperability/Development%20of%20a%20catalog%20of%20federated%20SPARQL%20queries%20in%20the%20field%20of%20Rare%20Diseases/images/Orphanet.png/Orphanet.png)

 Orphanet produce also the Orphanet Rare Diseases Ontology and clinical description of diseases using HPO ontology. Each disease concept has a unique, stable, identifier (Orphacode) which could be used to identify diseases in health information system. The orphacode has been integrated in several countries.


## Expected outcomes
---

Orphanet provides for around 3000 described diseases more than 60000 diseases/HPO annotations curated by experts.
The aim of this proposal, by using several toolkits, will help us to try to: 
1) Speed-up the process of disease-HPO annotation by using text-mining recognition on Orphanet textual information / or pubmed publication. 
2) Improve the curation process by comparison between the automated recognition and the annotations already provided by Orphanet.

To this end, through a dedicated pipeline we propose to text-mine data from our database and/or from elsewhere (url, text files) in order to scrap HPO terms.

## Approaches to reach goals

1) Phenopacket-Scrapper:

Extracts information from life-science websites and texts, generating phenopackets with the extracted information and correct external ontology references.

https://github.com/monarch-initiative/phenopacket-scraper-core

https://github.com/monarch-initiative/phenopacket-scraper-webapp

https://github.com/monarch-initiative/phenopacket-scraper-api


2) Phenomics-hippo

This is a search browser written in React JS to provide a user interface for Phenomics backend services (Phantom)

https://github.com/KCCG/phenomics-hippo

3) MER

MER is a tool which given any lexicon and any input text returns the list of terms recognized in the text, including their exact location (annotations). MER is a Named-Entity Recognition tool which given any lexicon and any input text returns the list of terms recognized in the text, including their exact location (annotations) and link entities with a given ontology 

http://labs.rd.ciencias.ulisboa.pt/mer/

https://github.com/lasigeBioTM/MER


3) IHP

Framework for identifying Human Phenotype entities

https://github.com/lasigeBioTM/IHP

## Expected audience
---

programmers, developers - Python, ReactJS, Web APIs - XML, JSON, RDF/owl files formats.

**Expected hacking days**: 4 days

## Related works and references
---

- https://www.orpha.net
- http://www.orphadata.org

## GitHub or any other public repositories of your FOSS products (if any)
---

https://github.com/Orphanet/Orphadata.org

## Hackers
---

