package org.elixir.marref.model

import org.elixir.marref.model.bioschema._
import org.elixir.marref.utils.json.Json

case class UrlModel(url: String, value: String)
case class InnerDateModel(date: Option[String],
                          yearMonth: Option[String],
                          year: Option[String]) {
  lazy val value = date
    .orElse(yearMonth)
    .orElse(year)
}
case class DateModel(`type`: String,
                     date: Option[String],
                     yearMonth: Option[String],
                     year: Option[String],
                     to: Option[InnerDateModel],
                     from: Option[InnerDateModel]
                    ) {
  lazy val value = date
      .orElse(yearMonth)
      .orElse(year)
      .orElse(to.flatMap{t => from.map{f => s"${f.value.getOrElse("NotDefined")}/${t.value.getOrElse("NotDefined")}"}})
}
case class ValueModel(`type`: Option[String] = None, value: String)
case class StringListModel(item: Seq[String])
case class AccessionModel(accession: Seq[UrlModel])
case class LatLongModel(latitude: Float,
                        longitude: Float) {
  lazy val value: String = s"${f"$latitude%1.4f"} N ${f"$longitude%1.4f"} E"
}
case class RrnaModel(rrna5S: Int, rrna16S: Int, rrna23S: Int)
case class TypingModel(typing: String, term: String)

case class SampleModel(annotationProvider: Option[String] = None,
                       annotationDate: Option[DateModel],
                       annotationPipeline: Option[String],
                       annotationMethod: Option[StringListModel],
                       annotationSoftwareRevision: Option[ValueModel],
                       featuresAnnotated: Option[StringListModel],
                       refseqCds: Option[Int],
                       ncbiRefseqAccession: Option[AccessionModel],
                       genes: Option[Int],
                       cds: Option[Int],
                       pseudoGenes: Option[Int],
                       rrnas: Option[RrnaModel],
                       completeRrnas: Option[RrnaModel],
                       partialRrnas: Option[RrnaModel],
                       trnas: Option[Int],
                       ncrna: Option[Int],
                       frameshiftedGenes: Option[Int],
                       sequencingCenters: Option[String],
                       seqMeth: Option[StringListModel],
                       sequencingDepth: Option[StringListModel],
                       assemblyAccession: Option[UrlModel],
                       assembly: Option[StringListModel],
                       assemblyVersion: Option[StringListModel],
                       gcContent: Option[Int],
                       contigs: Option[Int],
                       numReplicons: Option[Int],
                       genomeLength: Option[Int],
                       plasmids: Option[Int],
                       //binning,
                       //binningVersion,
                       //estimatedCompleteness,
                       //estimatedContamination,
                       //mapping,
                       //mappingVersion,
                       //qualityAssessment,
                       //qualityAssessmentVersion,
                       hostCommonName: Option[String],
                       hostScientificName: Option[String],
                       hostSex: Option[String],
                       hostHealthStage: Option[String],
                       //hostAge,
                       pathogenicity: Option[String],
                       disease: Option[String],
                       bodySampleSite: Option[String],
                       //bodySampleSubSite,
                       otherClinical: Option[String],
                       investigationType: Option[String],
                       sampleType: Option[String],
                       isolationSource: Option[String],
                       collectionDate: Option[DateModel],
                       altElev: Option[ValueModel],
                       depth: Option[ValueModel],
                       envSalinity: Option[Int],
                       envTemp: Option[ValueModel],
                       geoLocName: Option[Seq[String]],
                       latLon: Option[LatLongModel],
                       isolationCountry: Option[String],
                       envBiome: Option[UrlModel],
                       envFeature: Option[UrlModel],
                       envMaterial: Option[UrlModel],
                       envPackage: Option[String],
                       isolGrowthCondt: Option[AccessionModel],
                       refBiomaterial: Option[AccessionModel],
                       cultureCollection: Option[StringListModel],
                       collectedBy: Option[String],
                       biosampleAccession: Option[UrlModel],
                       isolationComments: Option[String],
                       projectName: Option[String],
                       geoLocNameGaz: Option[String],
                       geoLocNameGazEnvo: Option[UrlModel],
                       analysisProjectType: Option[String],
                       fullScientificName: Option[String],
                       organism: Option[String],
                       taxonLineageNames: Option[StringListModel],
                       taxonLineageIds: Option[AccessionModel],
                       ncbiTaxonIdentifier: Option[UrlModel],
                       strain: Option[StringListModel],
                       kingdom: Option[String],
                       phylum: Option[String],
                       `class`: Option[String],
                       order: Option[String],
                       family: Option[String],
                       genus: Option[String],
                       species: Option[String],
                       gramStain: Option[String],
                       cellShape: Option[String],
                       motility: Option[Boolean],
                       sporulation: Option[Boolean],
                       temperatureRange: Option[String],
                       optimalTemperature: Option[ValueModel],
                       halotolerance: Option[String],
                       oxygenRequirement: Option[String],
                       biovar: Option[String],
                       serovar: Option[String],
                       //pathovar,
                       otherTyping: Option[TypingModel],
                       typeStrain: Option[Boolean],
                       antismashTypes: Option[String],
                       antismashClusters: Option[String],
                       chebiId: Option[UrlModel],
                       chebiName: Option[String],
                       chemblId: Option[UrlModel],
                       compoundName: Option[String],
                       uniprotId: Option[UrlModel],
                       //uniprotDescription,
                       mmpID: Option[UrlModel],
                       bacdiveId: Option[UrlModel],
                       curationDate: Option[String],
                       implementationDate: Option[String],
                       bioprojectAccession: Option[UrlModel],
                       genbankAccession: Option[AccessionModel],
                       silvaAccessionSSU: Option[UrlModel],
                       silvaAccessionLSU: Option[UrlModel],
                       uniprotAccession: Option[AccessionModel],
                       publicationPmid: Option[AccessionModel],
                       comments: Option[String],
                       baseID: Option[ValueModel],
                       genomeStatus: Option[String],
                       mmpBiome: Option[String]
) {
  lazy val toJson: String = Json.serialize(this)
  lazy val toBioschema: TopLevel = {
    TopLevel(
      `@context` = "http://schema.org",
      `@type` = Seq("BioChemEntity","Sample"),
      `@id` = mmpID.map{_.url}.getOrElse("NotDefined"),
      identifier = Seq(s"mmp:${mmpID.map{_.value}.getOrElse{"NotDefined"}}", s"biosample:${biosampleAccession.map{_.value}.getOrElse("NotDefined")}"),
      name = Seq(fullScientificName.getOrElse("NotDefined")),
      description = comments.getOrElse("NotDefined"),
      url = mmpID.map{_.url}.getOrElse("NotDefined"),
      /*dataset = Seq(assemblyAccession.toSeq.map{_.url},
        bioprojectAccession.toSeq.map{_.url},
        silvaAccessionSSU.toSeq.map{_.url},
        silvaAccessionLSU.toSeq.map{_.url},
        genbankAccession.toSeq.flatMap{t => t.accession}.map{_.url},
        ncbiRefseqAccession.toSeq.flatMap{t => t.accession}.map{_.url},
        uniprotAccession.toSeq.flatMap{t => t.accession}.map{_.url}
      ).flatten,*/
      additionalProperty = Seq(
        Seq(Property(name = "Sequencing Depth",
          value = sequencingDepth.map{_.item.mkString(", ")}.getOrElse("NotDefined")
        )),
        Seq(Property(name = "Sequencing Centers",
          value = sequencingCenters.getOrElse("NotDefined")
        )),
        Seq(Property(name = "Comments",
          value = comments.getOrElse("NotDefined")
        )),
        Seq(Property(name = "Isolation Comments",
          value = isolationComments.getOrElse("NotDefined")
        )),
        Seq(Property(name = "Isolation Country",
          value = isolationCountry.getOrElse("NotDefined")
        )),
        publicationPmid.toSeq.flatMap{_.accession}.map{a =>
          Property(name = "Publication PMID",
            value = a.value
          )
        },
        Seq(Property(name = "Collection Date",
          value = collectionDate.flatMap{_.value}.getOrElse("NotDefined")
        )),
        Seq(Property(name = "Depth",
          value = depth.map{_.value}.getOrElse("NotDefined")
        )),
        Seq(Property(name = "Latitude and Longitude",
          value = latLon.map{_.value}.getOrElse("NotDefined")
        )),
        Seq(Property(name = "Project Name",
          value = projectName.getOrElse("NotDefined")
        )),
        Seq(Property(name = "Curation Date",
          value = curationDate.getOrElse("NotDefined")
        )),
        Seq(Property(name = "MMP ID",
          value = mmpID.map{_.value}.getOrElse("NotDefined")
        )),
        Seq(Property(name = "Silva Accession SSU",
          value = silvaAccessionSSU.map{_.value}.getOrElse("NotDefined")
        )),
        Seq(Property(name = "Silva Accession LSU",
          value = silvaAccessionLSU.map{_.value}.getOrElse("NotDefined")
        )),
        uniprotAccession.toSeq.flatMap{_.accession}.map{a =>
          Property(name = "Uniprot Accession",
            value = a.value
          )
        },
        Seq(Property(name = "ENA Assembly accession identifier",
          value = assemblyAccession.map{_.value}.getOrElse("NotDefined")
        )),
        Seq(Property(name = "ENA BioProject accession identifier",
          value = bioprojectAccession.map{_.value}.getOrElse("NotDefined")
        )),
        Seq(Property(name = "ENA BioSample accession identifier",
          value = biosampleAccession.map{_.value}.getOrElse("NotDefined")
        )),
        genbankAccession.toSeq.flatMap{_.accession}.map{a =>
          Property(name = "ENA GenBank accession identifier",
            value = a.value
          )
        },
        ncbiRefseqAccession.toSeq.flatMap{_.accession}.map{a =>
          Property(name = "NCBI Refseq accession identifier",
            value = a.value
          )
        },
        cultureCollection.toSeq.flatMap{_.item.map{i =>
          Property(name = "Culture Collection(s)",
            value = i
          )
        }},
        Seq(Property(name = "Temperature Range",
          value = temperatureRange.getOrElse("NotDefined")
        )),
        refBiomaterial.toSeq.flatMap{_.accession}.map{a =>
          Property(name = "Reference for Biomaterial",
            value = a.value)
        },
        Seq(Property(name = "Geographic Location (GAZ)",
          value = geoLocNameGaz.getOrElse("NotDefined"),
          valueReference = Some(Seq(ValueReference(
            codeValue = geoLocNameGazEnvo.map{_.value}.getOrElse("NotDefined"),
            url = geoLocNameGazEnvo.map{_.url}.getOrElse("NotDefined")
          ))))
        ),
        Seq({
          val ov = envFeature.map{_.value.split('(').head.stripLineEnd}
          Property(name = "Environment Feature",
          value = ov.getOrElse("NotDefined"),
          valueReference = Some(Seq(ValueReference(
            name = ov,
            codeValue = envFeature.flatMap{_.value.split('(').tail.headOption}.flatMap{_.split(')').headOption}.getOrElse("NotDefined"),
            url = envFeature.map{_.url}.getOrElse("NotDefined")
          )))
        )}),
        Seq({
          val ov = envMaterial.map{_.value.split('(').head.stripLineEnd}
          Property(name = "Environment Material",
          value = ov.getOrElse("NotDefined"),
          valueReference = Some(Seq(ValueReference(
            name = ov,
            codeValue = envMaterial.flatMap{_.value.split('(').tail.headOption}.flatMap{_.split(')').headOption}.getOrElse("NotDefined"),
            url = envFeature.map{_.url}.getOrElse("NotDefined")
          )))
        )}),
        Seq(Property(name = "Organism",
          value = organism.getOrElse("NotDefined"),
          valueReference = Some(Seq(ValueReference(
            name = Some("NCBI Taxon Identifier"),
            codeValue = ncbiTaxonIdentifier.map{i => s"NCBITaxon:$i"}.getOrElse("NotDefined"),
            url = ncbiTaxonIdentifier.map{_.url}.getOrElse("NotDefined")
          )))
        )),
        Seq(Property(name = "Full Scientific Name",
          value = fullScientificName.getOrElse("NotDefined"),
          valueReference = Some(Seq(ValueReference(
            name = fullScientificName,
            codeValue = ncbiTaxonIdentifier.map{i => s"NCBITaxon:$i"}.getOrElse("NotDefined"),
            url = ncbiTaxonIdentifier.map{_.url}.getOrElse("NotDefined")
          )))
        ))
      ).flatten
    )
  }
  lazy val toJsonld: String = Json.serialize(toBioschema)
}

case class RecordsModel(databaseType: String,
                        record: Seq[SampleModel])

case class MarrefModel(records: RecordsModel)
