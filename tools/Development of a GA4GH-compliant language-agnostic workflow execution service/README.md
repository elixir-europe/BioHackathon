# Development of a GA4GH-compliant, language-agnostic workflow execution service

### Representative: Alexander Kanitz

## Community
---

ELIXIR-Europe

## Leads
---
- Alexander Kanitz
- Foivos Gypas

## Background information
---
Workflow specification languages like CWL provide standardized, abstract specifications of tools and workflows that preserve the relevant information and remain independent of actual execution services. GA4GH WES and TES are API specifications that add another layer of abstraction on top of workflow languages for workflow and task management, respectively. What is currently missing is an implementation of these services that users can easily install and run. We are implementing GA4GH WES as a minimal Python/Flask service. In the current prototype , we create WES objects from CWL workflows and store them in a database. Toil executes the workflows and the execution parameters are parsed from Toil log files and stored in the database.

## Expected outcomes
---

Develop an execution engine that natively supports WES/TES-based job control. Status changes and other execution information will be stored in the database. The engine must support different container-based job execution routes (e.g., Slurm, AWS). Scripts for generating WES/TES-compliant workflow JSON objects from specification languages will be developed/extended. To allow extensions of the engine a crucial concept enforced in the development of the service is encapsulation/modularization.

## Expected audience
---

Expected audience:
programmers, bioinformaticians, web developers
Required knowledge:
Python
Additional helpful skills:
Flask, CWL, WDL or other workflow language
**Expected hacking days**: 4 days, 3 days

## Related works and references
---

- [krini-cwl](https://git.scicore.unibas.ch/krini/krini-cwl)
- [CWL](https://github.com/common-workflow-language/common-workflow-language)
- [wdl](https://software.broadinstitute.org/wdl/)
- [ga4gh](https://www.ga4gh.org/)
- [workflow-execution-service-schemas](https://github.com/ga4gh/workflow-execution-service-schemas)
- [task-execution-schemas](https://github.com/ga4gh/task-execution-schemas)
- [flask](http://flask.pocoo.org/)
- [krini-cwl](https://git.scicore.unibas.ch/krini/krini-cwl)
- [toil](https://github.com/BD2KGenomics/toil)
- [nextflow](https://www.nextflow.io/)
- [snakemake](https://snakemake.readthedocs.io/en/stable/)
- (open-stand)[https://open-stand.org/]

## GitHub or any other public repositories of your FOSS products (if any)
---

- [krini-cwl](https://git.scicore.unibas.ch/krini/krini-cwl)
- [TECtool](https://git.scicore.unibas.ch/zavolan_public/TECtool)
- [Dockerfiles](https://github.com/zavolanlab/Dockerfiles)
- [MIRZAG](https://github.com/zavolanlab/MIRZAG)
- [snoRNAHybridSearchPipeline](https://github.com/zavolanlab/snoRNAHybridSearchPipeline)

## Hackers
---

