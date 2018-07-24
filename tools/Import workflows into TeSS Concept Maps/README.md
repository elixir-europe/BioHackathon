# Import workflows into TeSS Concept Maps

### Representative: Niall Beard

## Community
---

ELIXIR Training Platform

## Leads
---
Niall beard 

## Background information
---
TeSS has been developing Training Workflows (https://tess.elixir-europe.org/workflows) - a conceptual representation of typical data analysis pipelines. 
Each step of a Training Workflow in TeSS is annotated with an EDAM operation. These can be used to bring together relevant training, tools,  data, and other such information from ELIXIRs various registries. The goal is to offer an overview of the available resources and guidance bioinformaticians can use for a given topic. 
This task will look at devising a way to import workflows (CWL or Galaxy) that contain EDAM operation annotations into TeSS to turn the computational workflow into a Conceptual Training Workflow.

## Expected outcomes
---

Annotate a workflow with EDAM operations (This may take into account previous work done to annotate Galaxy tools with EDAM operations by cross-referencing with bio.tools).
Parse the workflow (CWL or Galaxy) using Ruby. 
Create a connected graph representation of the workflow in memory.
Use TeSS's existing modified Cytoscape JS plugin to plot the connected graph onto a canvas ready to be annotated and saved.  


## Expected audience
---

Programmers, workflow experts. Cytoscape JS, CWL/Galaxy, Ruby programmers (other languages welcome)
**Expected hacking days**: 4 days, 3 days, 2 days

## Related works and references
---

[TeSS workflows](https://tess.elixir-europe.org/workflows), [ELIXIR Implementation Study on Registry integration from a User Perspective (training workflows](https://docs.google.com/document/d/15HSBVrPKCsJ70Wj4DHUu36tVKRDnrt0Mz7pE4ecCmA4/edit#)
[Annotation of Galaxy tools with EDAM terms](https://github.com/inkuzmin/tools-iuc/commit/e79fb7a0a3c988c50366766b8770ae28cf7a3895)


## GitHub or any other public repositories of your FOSS products (if any)
---

[TeSS](https://github.com/ElixirTeSS/TeSS)

## Hackers
---

