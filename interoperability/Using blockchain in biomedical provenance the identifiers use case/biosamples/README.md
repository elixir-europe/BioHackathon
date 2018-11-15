# BioSamples in Hyperledger

BioSamples stores and supplies descriptions and metadata about biological samples. For use in industry and academia. Some of the functionalities of this database is submit new samples and curate exiting example. In addition is allows users to search (query) for different samples using different filters.

This business network defines:

**Participant**
`researcher`

**Asset**
`Sample`

**Transaction**
`Submit` 
`curation`

**Event**
`curation_event`

## Provenance in sample submission 

Provenance in sample submission is based on identifying which users are submitting the samples and how samples are related to existing samples. Hyperledger blockchain provides a registry for the participants `researcher` and assets `Sample`. We can introduce a field in `Sample` that will provide information on the `researcher` involved in the submission.

Initially a `Sample` is created by a `researcher` and submitted to BioSamples database. The link between a researcher and a sample is a domain name `Sample:domain_bs` and `researcher:domain_bs`  

To test this Business Network Definition in the **Test** tab:

Create a `researcher` that will make a `Sample` submission:

```
{
  "$class": "org.biosamples.researcher",
  "email": "researcher.one@org",
  "firstName": "One",
  "lastName": "Researcher",
  "institution": "ORG",
  "domain_bs": "self.BioSamplesMigration"
}
```

Create a `Sample` (submission) asset:

```

{
  "$class": "org.biosamples.sample",
  "accession": "SAMEG22185",
  "author": "resource:org.biosamples.researcher#researcher.one@org",
  "nocuration": 0,
  "name": "E-MEXP-113",
  "domain_bs": "self.BioSamplesMigration",
  "release": "2005-09-19T23:00:00Z",
  "char": [
    {
      "$class": "org.biosamples.characteristics",
      "name": "Submission Description",
      "description": "Multiple tumour specimens of different anatomical origin arrayed against a common reference."
    },
    {
      "$class": "org.biosamples.characteristics",
      "name": "Submission Identifier",
      "description": "GAE-MEXP-113"
    },
    {
      "$class": "org.biosamples.characteristics",
      "name": "Submission Reference Layer",
      "description": "false"
    },
    {
      "$class": "org.biosamples.characteristics",
      "name": "Submission Title",
      "description": "Transcription profiling of multiple human tumour specimens of different anatomical origin arrayed against a common reference"
    }
  ],
  "externalReferences": [
    "http://www.ebi.ac.uk/arrayexpress/experiments/E-MEXP-113"
  ]
}
```

Another dimension of provenance in the submission proces is to establish relationships across `Sample`(s).

First we create a 


Create a `Sample` (submission) asset with a realationship to a previous sample:

```
{
  "$class": "org.biosamples.sample",
  "accession": "SAMEA489862",
  "author": "resource:org.biosamples.researcher#researcher.one@org",
  "nocuration": 0,
  "name": "source SourceUP069",
  "domain_bs": "self.BioSamplesMigration",
  "release": "2005-09-19T23:00:00Z",
  "char": [
    {
      "$class": "org.biosamples.characteristics",
      "name": "Organism",
      "description": "Homo sapiens",
      "ontologyTerms": "9606"
    }, 
    {
      "$class": "org.biosamples.characteristics",
      "name": "biosource type",
      "description": "frozen sample",
      "ontologyTerms": ""
    },
    {
      "$class": "org.biosamples.characteristics",
      "name": "disease state",
      "description": "colorectal adenocarcinoma",
      "ontologyTerms": "EFO_0000365"
    }
  ],
  "externalReferences": [
    "http://www.ebi.ac.uk/arrayexpress/experiments/E-MEXP-113"
  ],
  "rsamples": [
    {
      "$class": "org.biosamples.relationships",
      "target": "resource:org.biosamples.sample#SAMEG22188",
      "type_r": "has member"
    }
  ]
}
```
## Provenance in sample curation

We build a transaction to track curation on the `Sample`. We observe that most of the current curration links capture changes in the characteristics. These changes may involve two cases. First the introcution of new characteristics on the sample or the modifications in the field of existing characteristics. The transaction will also emit an event to tract the changes in the characteristics from the pre-curation state to the post curation state.

Create a curator `researcher`  

```
{
  "$class": "org.biosamples.researcher",
  "email": "curator@org",
  "firstName": "Curator",
  "lastName": "Researcher",
  "institution": "ORG",
  "domain_bs": "self.BioSamplesMigration"
}
```
Execute a `curation` transaction that updates the ontologyTerms

```
{
  "$class": "org.biosamples.curation",
  "author": "resource:org.biosamples.researcher#curator@org",
  "precuration": "resource:org.biosamples.sample#SAMEA489862",
  "postcuration": [
    {
      "$class": "org.biosamples.characteristics",
      "name": "Organism",
      "description": "Homo sapiens",
      "ontologyTerms": "http://purl.obolibrary.org/obo/NCBITaxon_9606"
    }
  ]
}
```

 This curation transaction emits a curation event that track the changes in the sample for each curation layer.
```
{
 "$class": "org.biosamples.curation_event",
 "precuration": [
  {
   "$class": "org.biosamples.characteristics",
   "name": "Organism",
   "description": "Homo sapiens",
   "ontologyTerms": "9606"
  },
  {
   "$class": "org.biosamples.characteristics",
   "name": "biosource type",
   "description": "frozen sample",
   "ontologyTerms": ""
  },
  {
   "$class": "org.biosamples.characteristics",
   "name": "disease state",
   "description": "colorectal adenocarcinoma",
   "ontologyTerms": "EFO_0000365"
  }
 ],
 "postcuration": [
  {
   "$class": "org.biosamples.characteristics",
   "name": "Organism",
   "description": "Homo sapiens",
   "ontologyTerms": "http://purl.obolibrary.org/obo/NCBITaxon_9606"
  },
  {
   "$class": "org.biosamples.characteristics",
   "name": "biosource type",
   "description": "frozen sample",
   "ontologyTerms": ""
  },
  {
   "$class": "org.biosamples.characteristics",
   "name": "disease state",
   "description": "colorectal adenocarcinoma",
   "ontologyTerms": "EFO_0000365"
  }
 ],
 "eventId": "62d4757b-ee07-4f34-ad86-b59587e70c3a#0",
 "timestamp": "2018-11-15T13:15:30.149Z"
}
```

Execute a `curation` transaction that creates a new characteristic

```
{
  "$class": "org.biosamples.curation",
  "author": "resource:org.biosamples.researcher#curator@org",
  "precuration": "resource:org.biosamples.sample#SAMEA489862",
  "postcuration": [
    {
      "$class": "org.biosamples.characteristics",
      "name": "individual",
      "description": "P00961",
      "ontologyTerms": ""
    }
  ]
}
```
 This curation transaction also emits a curation event that track the changes in the sample for each curation layer.