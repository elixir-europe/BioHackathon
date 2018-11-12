# Pathway effect prediction for protein targets

### Representative: Rabie Saidi 

## Community
---

Elixir interoperability platform

## Leads
---
Rabie Saidi,
Andrew Nightingale 

## Background information
---
Drug discovery pipelines are immensely expensive in time and resources, which are wasted if a drug is rejected due to toxicities discovered in late stages. Better pathway effect prediction tools would enable scientists to qualify protein targets in early stages with more confidence, resulting in higher success rates. Using UniProt, HPO, pathway, protein interaction data and more, we will explore mapping and integration approaches to build a "queryable" structure (dataset, knowledge network,..)  of these data. This will help create tools for scientists to better understand effects of drugs on potential protein targets in multiple pathways.

## Expected outcomes
---

Outcomes include:
- Understanding the data involved
- Mapping and connecting data to create a network
- Enable exploration of network via querying/visualisation
- Identifying scenarios of pathways being affected by the chosen target

## Expected audience
---

Data Scientists, Bioinformaticians or programmers interested in proteins data and pathways, drug discovery scientists/ systems biologists.
**Expected hacking days**: 4 days

## Technologies and tools
---

Apache Spark, Apache Zeppelin, GraphFrame, Neo4j

## Related works and references
---

### Suggested Resources for consuming data
There are numerous data resources we could utilise in this Biohackathon. In this section we have outlined some resources that we think could be useful for achieving our goal.   As part of Day 2’s morning hack we will review and decide which resources we wish to use, any additional resources will be considered by the group. 


##### UniProt:
UniProt will act as the main resource for protein information and lining to other resources as it has cross-references to the majority of the resources discussed below. We can access UniProt data using it REST API: https://www.ebi.ac.uk/proteins/api/doc/
This API has a number of end-points for accessing specific elements of UniProt data.

#### Disease Ontologies or Sources

##### Human Phenotype Ontology (HPO) 

https://hpo.jax.org/app/ 

Provides human phenotypes associated to genes and pathways with cross-references to other related resources such as MeSH, SNOMED-CT.
Data is available in different file formats but the easiest to start with as the two mapping csv files:
ALL_SOURCES_ALL_FREQUENCIES_genes_to_phenotype.txt 
ALL_SOURCES_ALL_FREQUENCIES_phenotype_to_genes.txt
Plus the main data file:
https://raw.githubusercontent.com/obophenotype/human-phenotype-ontology/master/hp.obo
Example data:
```
[Term]
id: HP:0000028
name: Cryptorchidism
alt_id: HP:0000797
def: "Testis in inguinal canal. That is, absence of one or both testes from the scrotum owing to failure of the testis or testes to descend through the inguinal canal to the testis." [HPO:probinson, pmid:23650202]
comment: The gonad is mobile and can be retracted superiorly by the cremaster muscle reflex stimulated, for instance, by cold or touch. A retracted testis is not cryptorchidism. An abdominal testis cannot be distinguished by physical examination from an (Apparently) absent testis and requires radiological (or, rarely, surgical) procedures for assessment.
synonym: "Cryptorchism" EXACT [ORCID:0000-0001-5208-3432]
synonym: "Undescended testes" EXACT layperson []
synonym: "Undescended testis" EXACT layperson []
xref: Fyler:4493
xref: MSH:D003456
xref: SNOMEDCT_US:204878001
xref: UMLS:C0010417
is_a: HP:0000035 ! Abnormality of the testis
```



##### Decipher 
Is part of the delayed development disorders (DDD) consortium.  Not all available data is free for download but some data can be obtained from this file:
Development Disorder Genotype – Phenotype Database (DDG2P)  
This file provides a summary of genes to diseases to HPO terms.

#### Pathways 
##### Reactome 
Provides a comprehensive set of annotated pathways with additional annotations and cross-references.  Data can be directly downloaded in bulk or they have a REST API with a number of end-points for querying the database or retrieving data eg: https://reactome.org/ContentService/#/diseases/getDiseasesUsingGET 

##### KEGG 
Is complementary to Reactome in providing manually curated pathways and reactions. It also provides a set of disease related pathways with known drugs and protein targets.  We can retrieve data from KEGG using their REST API: https://www.kegg.jp/kegg/rest/keggapi.html

##### WikiPathways
Is complementary to the first two in providing manually curated pathways and reactions. It is a ten year old community projects lead by the Glandstone Institutes and Maastricht University. It provides a REST API, various download formats, and a monthly updated SPARQL endpoint: https://www.wikipathways.org/ Also, three participatns know it very well: Andra, Chris, and [Egon](http://github.com/egonw].


#### Protein interactions
##### InACT
Provides molecular interactions from multiple resources and links to interacting partners involved in specific diseases. Basic data is provided in a tab delimited file. Current data set is available from: ftp://ftp.ebi.ac.uk/pub/databases/intact/current/psi30

#### Drug and Drug Activity 
##### DrugBank
DrugBank is a database providing details about approved drugs. It has a number of cross-references to known protein targets, pathways and in some case known side-effects. Data can be downloaded from: https://www.drugbank.ca/releases/latest


##### ChEMBL
ChEMBL is slightly different from DrugBank in that it primary mission is to report chemical entity assays on protein targets.  It has a set of approved drugs as well with further cross-references to other resources.  They provide as API for retrieving data:
https://www.ebi.ac.uk/chembl/api/data/docs



[Human Phenotype Ontology HPO](https://hpo.jax.org)
[Open Targets](https://www.opentargets.org/)
[UniProt](https://www.uniprot.org/)
[Intact](https://www.ebi.ac.uk/intact)
[Reactome](https://www.reactome.org/)
[PathwaysCommons](http://www.pathwaycommons.org)

## GitHub or any other public repositories of your FOSS products (if any)
---



## Hackers
---

