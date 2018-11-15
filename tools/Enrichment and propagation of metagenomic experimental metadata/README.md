# Enrichment and propagation of metagenomic experimental metadata.

### Representative: Ola Tarkowska

## Community
---

Elixir Marine Metagenomics Community, Data clearing warehouse IS and Interoperability Platform

## Leads
---
Maxim Sheremetjew, Ola Tarkowska, Miguel Boland

## Background information
---
The use of marker gene amplification (e.g. SSU rRNA) is widespread in metagenomics, providing insights to the microbes that are present within a biome.  However, the primers and/or targeted variable region is often lacking (or mislabelled) in the metadata associated with the deposited sequence record. Resources such as MGnify, are dependent on this data when trying to compare datasets as different experimental methods introduce nuisance variables into statistical analyses. We propose the development of a new tool to infer the SSU rRNA variable region based on the analysed sequence data in MGnify. Thereafter, will also develop workflows to propagate the metadata (including inference method) to relevant resources.

## Expected outcomes
---

New tool to infer amplified SSU rRNA variable region, based on sequence analysis by MGnify, and pipeline to push this data to the various archiving resources, such as ENA and BioSamples. Integrating the new tool within MGnify API will help harmonise data and improve exchange between resources.

## Expected audience
---

Representatives from the service providers, such as ENA and BioSamples, who will help with structuring, propagating and harmonising the enriched metadata to their resources.
**Expected hacking days**: 3 days

## Related works and references
---

https://en.wikipedia.org/wiki/SSU_rRNA 
https://en.wikipedia.org/wiki/Hypervariable_region
https://www.ebi.ac.uk/metagenomics/

## GitHub or any other public repositories of your FOSS products (if any)
---

https://github.com/EBI-Metagenomics/emg-toolkit
https://github.com/EBI-Metagenomics/emgapi

## Hackers
---

## Achivements
---

Script infering variable regions from MGnify analysis results is avaialble on https://github.com/EBI-Metagenomics/elixir-biohackathon
MGnify API changes are avaible in https://github.com/EBI-Metagenomics/emgapi/tree/biohackathon
