# Using blockchain in biomedical provenance: Tracking BioSamples.

### Representative: Richard Shute

## Community
---

The Pistoia Alliance (www.pistoiaalliance.org)

## Leads
---
- Carlos Castro 
- Alexander Garcia Castro 
- Olga Giraldo
- Richard Shute

## Background information
---
Blockchain is a collection of technologies (cryptographic security, decentralization, digital registry, smart contracts, rules and incentives to collaborate among institutions with different levels of trust) that is currently being tested in different industries and organizations (financial, government, shipping,...). OpenScience requires provenance, transparency, and availability. Blockchain delivers the trust layer in OpenScience. Our hacking proposal reuses blockchain tech, Hyperledger in particular, to support provenance and sample supply chain management. We are currently looking at BioSamples as a system that stores and supplies descriptions and metadata about biological samples for industry and academica. The system can be used to track samples through a workflow and provide additional layers of security to the identifiers. In addition, having a blockchain for BioSamples will also make it possible to establish a reward mechanisms that incentivises the creation & curation of samples, so helping to drive improved trust and reputation.

## Expected outcomes
---

- Identify the added value of Blockchain technologies on BioSamples and similar sample management tools. 
- Create a prototype on Hyperledger Composer of a Business Network (BNA) that includes the data standards and current functionalities (workflows) of BioSamples.
- High-level design of the (Fabric) network that will support the BNA.
- Extend BioSamples to include other complementary digital assets: protocols, laboratory notebooks (if time permits).

Our code will also contribute to the https://github.com/Blockchain4openscience/sample-networks project. We also expect to start the discussion about using blockchain technology for keeping the trail of evidence in the annotation process.  

## Expected audience
---

Bioinformaticians, chemoinformaticians, data scientists, researchers with some programming skills and wet-lab researchers who can provide the context for the problem and can lead the programmers into a useful solution. Participants should have minimal knowledge of JSON and Javascript (ideally Angular). Researchers working with identifiers and also people involved in [BioSamples](https://www.ebi.ac.uk/biosamples/). During the first day of hacking there will be a tutorial on Blockchain technologies and Hyperledger Composer for participants and open to all others that are interested. 

**Expected hacking days**: 4 days

### Tasks 

#### Day 1  WE ARE IN ROOM SILVERSTONE FOR THE TUTORIAL
Blockchain technologies and Biosamples (data and workflows)
  1. Tutorial on Blockchain technologies (9-11)
  2. Tutorial on Hyperledger Composer (11-12, 13-15). 
  3. Sample use cases: Blockchain4openscience and Digital Diplomas. 
      - Skills: JS. 
      - Output: learn Composer-Playground.
  4. Understanding BioSamples: data management and workflows (15-19).
      - Skills: BioSamples. 
      - Output: Identify data structures and workflows.

#### Day 2
Supply chain management in BioSamples
  1. How would BioSamples benefit from blockchain technologies: How would the distributed ledger be used across industry and     academia? (9-12). 
      - Skills: BioSamples. 
      - Output: BioSamples workflow.
  2. Designing and implementing a business network application (.bna) on Hyperledger Composer for the project.
      - Define assets and participants (13-14).
      - Define transactions and logic in JS (13-19). 
      - Skills: JS. 
      - Output: BioSamples.bna

#### Day 3
Supply chain management in BioSamples
  1. Write-up first report and document (.bna) for PoC on Composer-Playground (9-11:30). 
  2. Report (11:30-12).
  3. High-level introduction to Hyperledger Fabric. (13-15).
  4. Designing a distributed ledger for BioSamples and similar sample management tools for deployment in Hyperledger Fabric   (15-19). 
      - Output: Value chain in Biosamples (organization, channels..)
  4. Designing front-ends (15-19). 
      - Skills: AngularJS. 
      - Output: Mock-ups.

#### Day 4
Presentation and roadmap
  1. Writing-up a presentation for the project (9-11:30).
  2. Report (11:30-12).
  3. Documenting (GitHub repo) and roadmap.

## Related works and references
---
- http://blockchain4openscience.com/
- https://ip3.pistoiaalliance.org/subdomain/main/end/node/1841

## GitHub or any other public repositories of your FOSS products (if any)
---
https://github.com/Blockchain4openscience/B4OS-frontend

## Hackers
---

