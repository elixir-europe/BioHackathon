# Topic: PSICQUIC Outputs

- Export **.sif**

  - JAMI will support the .sif format
  - The algorithm will start with the IDs from MITAB columns 1 and 2 (IDA, IDB)
  - Take the causality from the subtree of the PSIMI ontology (molecular interaction => causal interaction => causal statement) and 
  diffirentiate between then down-regulates and up-regulates subtrees.
  - So, a dash '-' will represent a non-directional relationship, while the activation '->' and inhibition '-|' arrows will be 
  used for declaring directionality.
  - Remove duplicate interactions and other contradictions will be left to be checked by the final user
  - A mapping to gene names will provided either as a standalone module or within JAMI (more preference to the first option 
  because of user applicability of the format).
