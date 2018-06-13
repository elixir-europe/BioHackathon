# OmicsPath: Finding Relevant omics datasets using pathway information

### Representative: Yasset Perez-Riverol

## Community
---

Elixir EOSC pilot

## Leads
---
Gaurhari Dass 

## Background information
---
In the context of the Elixir EOSC pilot, we propose this project as a early study for innovative discovery of dataset similarity. In 2016, we released the first version of the Omics Discovery Index as a light-weight system to aggregate datasets across multiple public omics data resources. We have proposed a novel algorithm to detect relevant datasets based on similarity with other omics datasets. This algorithm allows OmicsDI to suggest to users different OmicsDI datasets similar to the dataset the user is reviewing. This proposal aims to extend the concept of dataset similarity to use the pathway information contained in Reactome. 

## Expected outcomes
---

- Integrates the Reactome Pathway database into OmicsDI as a new provider.  (1st day). 
- Reuse the Pathway Analyzer tool from Reactome to infer the most relevant pathway for a set of molecules. (2nd day). An example of a mapper implemented for BioModels can be found at https://github.com/reactome/biomodels-mapper.
- Compute the similarity metrics for the datasets taking into account the pathway information (3rd - 4th days).   

## Expected audience
---

programmers, bioinformatics, pathway analysis, MongoDB/Java/AngularJS 
**Expected hacking days**: 4 days

## Related works and references
---

www.omicsdi.org, reactome.org, wikipathways,

## GitHub or any other public repositories of your FOSS products (if any)
---

- https://github.com/OmicsDI

## Hackers
---

