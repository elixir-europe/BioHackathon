# Adding Bioschemas markup to data repositories and developing tools to find, consume and use it

[Presentation](https://github.com/elixir-europe/BioHackathon/raw/master/interoperability/Bioschemas/Bioschemas%20Findability%20and%20Interoperability.pptx)

## Tasks

### 1. Creating Markup

Hacking tasks:
- Generate markup for your resource: 
  - Use the [Bioschemas Markup Generator](http://www.macs.hw.ac.uk/~ajg33/BioschemasGenerator/) to help create your initial version of [Dataset](http://bioschemas.org/specifications/Dataset) and [DataCatalog](http://bioschemas.org/specifications/DataCatalog) markup.
  - Please provide [feedback](https://docs.google.com/forms/d/1xIbGIhQ-VaUl9V9JhpNzGXeluM31SDW2-1ggiQnITYE/edit) on the Bioschemas Generator
- Refine markup: manually hack generated JSON-LD to your purpose
- Submit markup as example to relevant directory: In the profile, click on the Links tab and then the Examples icod
  - [Dataset examples](https://github.com/BioSchemas/specifications/tree/master/Dataset/examples/)
  - [DataCatalog examples](https://github.com/BioSchemas/specifications/tree/master/DataCatalog/examples/)
  
Resources:
- [Bioschemas tutorial](https://bioschemas.gitbook.io/training-portal)

### 2. Profile Creation/Refinement

![Bioschemas Profile Creation Process](https://github.com/BioSchemas/bioschemas.github.io/raw/master/images/bioschemas-process.png)

Hacking tasks:
- Develop missing profiles/type, e.g. Chemistry
  - Need to create new spreadsheet for the crosswalk
- Refine existing profiles and types, e.g. how to state the position of a Gene in the representation for the Gene
  - Need to create a new version of the crosswalk spreadsheet
- Improve Bioschemas tutorial material and documentation
- Prepare schema.org submission for new types and properties

Resources:
- [Bioschemas tutorial](https://bioschemas.gitbook.io/training-portal)
- [GOWeb tool](https://github.com/BioSchemas/bioschemas-goweb): converts crosswalk spreadsheet to YAML for inclusion in web page

### 3. Developing Support Tools

#### 3.1 GOWeb: Profile Page Generation

#### 3.2 Validata: Markup Validation against Bioschema Profiles

#### 3.3. Buzzbang: Enhancing Search

### Representatives: 

- __Alasdair Gray__
- Leyla Garcia 
- Ricardo Arcila 
- Phil Barker 
- Michel Dumontier  

## Achievements

## Achievements:
### Day 1:
- Added Bioschemas markup to SynBioHub (DataCatalog, Dataset, DataRecord)
- Added Bioschemas markup to Bgee (Dataset)
- Added Bioschemas markup to Hamap (rules, profiles and proteomes Datasets)

### BioStudies
- Created BioSchema for BioStudy repository.
- Developed application that generates Bioschema for a BioStudy.
- 1 Example DataCatalog and 2 DataRecord examples are added to https://github.com/BioSchemas/specifications

### Ensembl
- Added draft Bioschemas to Gene and Species pages on feature branch https://github.com/Ensembl/ensembl-webcode/tree/feature/bioschemas

### Chemistry
  - Discussed and created BioSchema for MoleculeEntity. See [molecules.Md](molecules.Md)
  - Designed the implementation for the dataset type for the ChEMBL database. See [chembl-dataset-example.json](chembl-dataset-example.json)
  - Created a draft specification in the official Bioschemas repository. See https://github.com/BioSchemas/specifications/pull/234
  - Created an example for the MoleculeEntity implementation based on ChEMBL database. 



## Community
---

[Bioschemas Community](http://bioschemas.org) – ELIXIR Interoperability Platform


## Background information
---

Bioschemas is an open community project built on top of schema.org aiming to embed markup in life sciences Web resources to make them more findable and promoting interoperability. Its selling point is its simplicity, with just enough structure in schemas such as ‘DataSet’, ‘BioChemEntity’ and ‘LabProtocol’ to enable FAIRer data applications. Bioschemas markup is being deployed, but more work to develop and exploit it is required.

During the BioHackathon we want to advance development, deployment and exploitation of BioSchemas markup, as well as the tools that enable this. We also want to engage and connect with new groups and communities, such as those working on data indexing, visualization and the semantic web.


## Expected outcomes
---

1) Markup of core (and other) data resources, including deposition databases, developing new profiles as required
2) Development of tools supporting: Creation and embedding of markup, Validation of markup
3) Enhanced searching of life sciences resources based on BioSchemas markup: Crawling and indexing, Generation of life sciences knowledge graph, Rich search results
4) Training material for development and exploitation of Bioschemas markup using available tools
5) Publication about Bioschemas

## Expected audience
---

Anyone with ideas about how to get the most of Bioschemas, for instance:
- Ontologists,
- Developers with knowledge of JavaScript, Java, GO, Python or other languages are welcome
- Developers of data resources
- People interested in web search: data indexing, snippet generation, ranking, etc
- People interested in RDF and semantic web, 
- Developers interested in Bioschemas applications (data sync, search, knowledge graphs, etc.)
**Expected hacking days**: 4 days

## Related works and references
---

- [Bioschemas website](http://bioschemas.org/)
- [Bioschemas list of GSoC projects ](http://bioschemas.org/GSoC/)
- [Bioschemas tools](http://bioschemas.org/tools)
- [Bioschemas poster at SWAT4HCLS2017](http://ceur-ws.org/Vol-2042/)
- [Buzzbang prototype search engine](http://buzzbang.science)
- [schema.org](http://schema.org)
- [Google structured data testing tool](https://search.google.com/structured-data/testing-tool)
- [Validata: Validation tool](https://github.com/HW-SWeL/Validata)
- [The knowledge graph](http://www.grakn.ai/)
- [Common crawl](http://commoncrawl.org/)
- [Kibana](https://www.elastic.co/products/kibana)

## GitHub or any other public repositories of your FOSS products (if any)
---

- [Bioschemas repositories](https://github.com/bioschemas/)
- [Buzzbang project encompassing crawl/search components](https://github.com/buzzbangorg/buzzbang-doc/wiki)
- [Validata: Validation tool](https://github.com/HW-SWeL/Validata)

## Hackers
---

- [Egon Willighagen](http://github.com/egonw)

