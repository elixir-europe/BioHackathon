# Topic: PSICQUIC Outputs

- Export `.sif`
  - JAMI will support the .sif format
  - The algorithm will start with the IDs from MITAB columns 1 and 2 (IDA, IDB)
  - Take the causality from the subtree of the PSIMI ontology (molecular interaction => causal interaction => causal statement) and 
  diffirentiate between then down-regulates and up-regulates subtrees.
  - So, a dash '-' will represent a non-directional relationship, while the activation '->' and inhibition '-|' arrows will be 
  used for declaring directionality.
  - Remove duplicate interactions and other contradictions will be left to be checked by the final user
  - A mapping to gene names will provided either as a standalone module or within JAMI (more preference to the first option 
  because of user applicability of the format).

# Topic: PSICQUIC Extension

- Extend JAMI core model (`jami-core`) to include causality (as prototyped in the MITAB 2.8 format)
  - Biological effect A and B need to be added as separate fields in the participant A and B properties.
  - The causalRelationship interface in the `jami-core` module has two properties: (CvTerm relationType, Participant target). The relationType is the `causal statement` column of MITAB 2.8 and the target corresponds to participant B (by convention).
  - The 45th column of MITAB 2.8 'causal regulatory mechanism' also needs to be a new attribute on the 'interaction' level of the jami-core model.
  - Extend all related modules (`jami-interactionviewer-json`, `jami-mitab`, etc.). For the xml-related module create a new schema 3.0.1 that includes the causal output and keep the current version (3.0.0) intact. **Note:** To be discussed with the PSI-MI community.

- JAMI extra:
  - ~~Prune the empty interfaces (that seem to be there only for syntactic-sugar purposes) in the jami-core model - the ones that don't include any method names, e.g. `ExperimentalEntity.java` and `ExperimentalParticipantCandidate.java`~~ It broke a lot of things in other libraries and so it was decided to revert the changes and to not implement this.
