# Development of a GA4GH-compliant, language-agnostic workflow execution service

### Representative: [Alexander Kanitz](https://github.com/uniqueg)

## Community
---

ELIXIR-Europe

## Leads
---
- [Alexander Kanitz](https://github.com/uniqueg)
- [Foivos Gypas](https://github.com/fgypas)

## Background information
---
The [Global Alliance for Genomics and Health (GA4GH)](https://www.ga4gh.org/) has proposed a suite of API specifications to promote and support the [findability, accessibility, interoperability and reusability/reproducibility](https://www.force11.org/group/fairgroup/fairprinciples) of [cloud-based (bioinformatics) analyses work streams](https://github.com/ga4gh/wiki/wiki). Among these, the [Workflow Execution Service (WES)](https://github.com/ga4gh/workflow-execution-service-schemas/tree/develop) and [Task Execution Service (TES)](https://github.com/ga4gh/task-execution-schemas) schemas deal with executing workflows and individual tasks, respectively, based on workflows written in workflow specification languages like [CWL](https://github.com/common-workflow-language/common-workflow-language) and [WDL](https://software.broadinstitute.org/wdl/), which provide standardized, abstract specifications of tools and workflows.

What is currently missing are robust and language-agnostic implementations of these services that users can easily access. To this end, we are implementing GA4GH WES as a minimal Python/Flask service with a MongoDB backend. In the [current prototype](https://github.com/elixir-europe/WES-ELIXIR), we have (almost) fully implemented the latest WES specs ([v1.0.0](https://github.com/ga4gh/workflow-execution-service-schemas/blob/7f179319c5b1887a176ff40b2a03774e4ccd554d/openapi/workflow_execution_service.swagger.yaml); approved by GA4GH in October 2018), and the API is accessible via [Swagger](http://193.167.189.73:7777/ga4gh/wes/v1/ui/).  [`cwl-tes`](https://github.com/common-workflow-language/cwl-tes) is used to execute the workflows. Information on individual runs is stored in the database, with status updates being parsed from `cwl-tes` logs.

## Expected outcomes (needs more work!)
---
Develop an execution engine that natively supports WES/TES-based job control. Status changes and other execution information will be stored in the database. The engine must support different container-based job execution routes (e.g., Slurm, AWS). Scripts for generating WES/TES-compliant workflow JSON objects from specification languages will be developed/extended. To allow extensions of the engine a crucial concept enforced in the development of the service is encapsulation/modularization.

## Expected audience
---

**Expected audience**:
programmers, bioinformaticians, web developers, devops engineers

**Helpful skills**:
Python, Flask, workflow languages(CWL, WDL or other), Docker, Kubernetes, other devops

**Expected hacking days**: 4 days, 3 days

## Main GitHub repos
---
- [WES-ELIXIR](https://github.com/elixir-europe/WES-ELIXIR)
- [TESK](https://github.com/EMBL-EBI-TSI/TESK)

## Related works and references
---
- [CWL](https://github.com/common-workflow-language/common-workflow-language)
- [WDL](https://software.broadinstitute.org/wdl/)
- [GA4GH](https://www.ga4gh.org/)
- [FAIR data principles](https://www.force11.org/group/fairgroup/fairprinciples)
- [OpenStand](https://open-stand.org/)
- [WES schema](https://github.com/ga4gh/workflow-execution-service-schemas)
- [TES schema](https://github.com/ga4gh/task-execution-schemas)
- [Flask](http://flask.pocoo.org/)
- [cwl-tes](https://github.com/common-workflow-language/cwl-tes)
- [Cromwell](https://software.broadinstitute.org/wdl/)
- [Nextflow](https://www.nextflow.io/)
- [Snakemake](https://snakemake.readthedocs.io/en/stable/)

## Hackers
---
- https://github.com/uniqueg
- https://github.com/fgypas
- https://github.com/jsurkont
