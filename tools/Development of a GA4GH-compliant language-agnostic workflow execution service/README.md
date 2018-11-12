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

What is currently missing are robust and language-agnostic implementations of these services that users can easily access. To this end, we are implementing [WES-ELIXIR](https://github.com/elixir-europe/WES-ELIXIR), a minimal [Python/Flask](http://flask.pocoo.org/)-based service with a [MongoDB](https://www.mongodb.com/) database backend that relies on a TES instance (tested with [TESK](https://github.com/EMBL-EBI-TSI/TESK), but [Funnel](https://github.com/ohsu-comp-bio/funnel) should work as well). To allow extensions and improvements the most crucial concept enforced in the development of the service is encapsulation/modularization and separation of concerns. In the [current prototype](http://193.167.189.73:7777/ga4gh/wes/v1/ui/), we have (almost fully) implemented the latest WES specs ([v1.0.0](https://github.com/ga4gh/workflow-execution-service-schemas/blob/7f179319c5b1887a176ff40b2a03774e4ccd554d/openapi/workflow_execution_service.swagger.yaml); approved by GA4GH in October 2018), and the API can be explored via a [Swagger UI](https://swagger.io/). Full compliance with the specifications is planned for the end of 2018.

Currently, WES-ELIXIR only supports CWL workflows as [`cwl-tes`](https://github.com/common-workflow-language/cwl-tes) being used as the sole engine for interpreting worflows, resolving dependencies and staging tasks to be sent to the TES instance. Information on individual runs is stored in the database, with status updates being parsed from `cwl-tes` logs.

## Expected outcomes (needs more work!)
---
Several aspects of the service are up for improvements, according to preference/skills. They are organized into distinct work packages, each of which could be tackled by small groups of people (up to 4), depending on availability. The work packages are listed below, each with a few keywords/brief explanations:
* **WP1: Pluggable workflow engines**
  - Refactor and harmonize the service to be able to run different workflow engines next to each other; define API/requirements for supporting future workflow engines
  - Handle mapping of workflow types (e.g. CWL, WDL) and versions to workflow engines
  - Start writing workflow run submission functions and log parsers for [Cromwell](https://software.broadinstitute.org/wdl/) & [Nextflow](https://www.nextflow.io/)
* **WP2: Task distribution**
  - WES in principle supports sending individual tasks to different TES instances depending on preferences (e.g., price vs speed) and constraints (e.g., access rights, infrastructure requirements, data privacy constraints)
  - Current TES-enabled workflow engines have not implemented distribution logic
  - Idea: point workflow engines to "proxy" TES service that implements distribution logic outside of workflow engines; proxy can also be used to decorate TES calls with authorizatino headers to harmonize authentication/authorization flow
* **WP3: [OpenID Connect](https://openid.net/connect/) authorization**
  - As a proof of concept, [ELIXIR AAI](https://www.elixir-europe.org/services/compute/aai) is used as the identity provider
  - Currently, WES requests can be decorated with [JWT](https://jwt.io/)-based access tokens that are used to link workflow runs to users; tokens are passed on to protect TES endpoints
  - Current setup limits workflows to max 1h runtime
  - Idea: Implement OIDC authorization code flow (WES-ELIXIR as OIDC Relying Party) and request refresh token to obtain fresh access tokens
* **WP4: Production-grade deployment**
  - Packaging WES-ELIXIR & TESK
  - Setting up [Gunicorn](https://gunicorn.org/) & [NGINX](https://www.nginx.com/) HTTP servers
  - Write [Kubernetes](https://kubernetes.io/) deployment scripts

If you have any **QUESTIONS**, please write us in the Gitter channel: https://gitter.im/bh2018paris/15-GA4GH-WES

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
- [Funnel](https://github.com/ohsu-comp-bio/funnel)

## Hackers
---
- https://github.com/uniqueg
- https://github.com/fgypas
- https://github.com/jsurkont
