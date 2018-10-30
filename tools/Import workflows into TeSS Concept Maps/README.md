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
TeSS has been developing a new feature called Concept Maps (demo: https://tess.oerc.ox.ac.uk/concept_maps). Concept Maps provide a conceptual representation of data analysis pipelines. The Concept Map is a medium for educating researchers about the steps a typical Workflow comrpises of, and informing them about what tools, databases, standards, and other resources are available to use when constructing one.

Each step of a Training Workflow in TeSS is annotated with an EDAM term. There are two step types; Data and Operations. 

- Data steps are annotated with an EDAM Data and EDAM Format term, and contain links to available databases through the FAIRSharing registry.
- Operation steps are annotated with an EDAM Operation term, and contain links to tools from the bio.tools registry. 

This task will look at devising a way to import workflows (CWL or Galaxy) into TeSS to turn the Computational Workflows into Conceptual Training Workflows that can educate and inform bioinformatics researchers.

![tuxedo](http://training.scicomp.jic.ac.uk/docs/galaxycourse_book/_images/4_list_paired_collection_workflow.png "Convert from this")
![tuxedo concept map](https://i.imgur.com/aRxoeA9.png "Convert to 'something like' this")

## Expected outcomes
---

1. Manually construct a Concept Map based on a Galaxy Workflow
2. Make the Concept Map again, but this time - automatically, by:
- Annotating the Galaxy/CWL workflow with EDAM terms (Operation and Data). 
- Parse the workflow (CWL or Galaxy) using Ruby. 
- Create a connected graph representation of the workflow in memory.
- Use TeSS's existing modified Cytoscape JS plugin to plot the connected graph onto a canvas ready to be annotated, assigned resources from bio.tools, FAIRSharing, and TeSS, and saved.


## Expected audience
---

Programmers, workflow experts. Cytoscape JS, CWL/Galaxy, Ruby programmers (other languages welcome)
**Expected hacking days**: 4 days, 3 days, 2 days

## Related works and references
---

[TeSS Concept Maps prototype](https://tess.oerc.ox.ac.uk/concept_maps), [ELIXIR Implementation Study on Registry integration from a User Perspective (training workflows](https://docs.google.com/document/d/15HSBVrPKCsJ70Wj4DHUu36tVKRDnrt0Mz7pE4ecCmA4/edit#)
[Annotation of Galaxy tools with EDAM terms](https://github.com/inkuzmin/tools-iuc/commit/e79fb7a0a3c988c50366766b8770ae28cf7a3895)


## GitHub or any other public repositories of your FOSS products (if any)
---
[TeSS](https://github.com/ElixirTeSS/TeSS)
[Concept Maps JS](https://gl.cs.ut.ee/inkuzmin/workflows-js/tree/master)

## Hackers
---

