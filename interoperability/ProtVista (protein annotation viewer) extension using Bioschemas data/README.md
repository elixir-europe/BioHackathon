# ProtVista (protein annotation viewer) extension using Bioschemas data

### Representative: Leyla Garcia

## Community
---

ELIXIR Interoperability platform, Bioschemas

## Leads
---
Gustavo Salazar  
Leyla Garcia  
Rafael Jimenez  
Xavier Watkins  

## Background information
---
Back in the days, the Distributed Annotation Protocol (DAS) provided protein annotation from multiple resources in a uniform format. Such data was fed to DASTY, a protein annotation viewer that could be embedded on any website. DASTY was used in UniProt to display annotations coming from other data resources. Bioschemas can take place of DAS as it provides a specification for marking up protein annotations on web pages. As for the visualization, ProtVista provides a highly modular, reusable and extensible set of web components to visualize protein annotation. Sources not fully compliant with the data model are supported via adapters. We propose to combine Bioschemas data with ProtVista in order to support protein annotation visualization.

## Expected outcomes
---

* ProtVista adapter to use Bioschemas data
* ProtVista extension to display Bioschemas protein annotations from multiple sources
* Integration with BioJS (if possible)


## Expected audience
---

People interested in
* Bioschemas
* Visualization, BioJS
* Web components
* Protein annotations
**Expected hacking days**: 4 days

## Related works and references
---

1. [Integrating biological data --the Distributed Annotation System](https://www.ncbi.nlm.nih.gov/pubmed/18673527)
2. [Dasty3, a web framework for DAS](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC3167052/) 
3. [Bioschemas](https://www.bioschemas.org) 
4.  [ProtVista: visualization of protein sequence annotations](https://www.ncbi.nlm.nih.gov/pubmed/28334231)

## GitHub or any other public repositories of your FOSS products (if any)
---

[ProtVista web components](https://github.com/ebi-webcomponents)

## Tasks
---
1. Review and adjust the [Bioschemas ProteinAnnotation profile](http://bioschemas.org/specifications/ProteinAnnotation/) as needed
2. Get some protein related sources marked up with the [Bioschemas ProteinAnnotation profile](http://bioschemas.org/specifications/ProteinAnnotation/), e.g., InterPro, UniProt, maybe CATH
3. Implement a way to retrieve protein annotations from marked up resources, maybe crawler, indexer or so
4. Implement a ProtVista adapter to transform Bioschemas ProteinAnnotation data. See [ProtVista web components repo](https://github.com/ebi-webcomponents/nightingale), particularly those packages ending on -adapter, e.g., [protvista-structure-adapter](https://github.com/ebi-webcomponents/nightingale/tree/master/packages/protvista-structure-adapter)
5. Implement a proof-of-concept using at least one Bioschemas ProteinAnnotation source and the adapter to render a [protvista-track](https://github.com/ebi-webcomponents/nightingale/tree/master/packages/protvista-track) with real or mocked up data

Notes:
* Tasks 2 and 4 require 1
* Task 4 can be done with mocked data just to see how the adapter works
* Task 5 requires 4

## Hackers
---
Gustavo Salazar, mainly task 1 and 2, maybe task 4  
Leyla Garcia, mainly for taks 1  
