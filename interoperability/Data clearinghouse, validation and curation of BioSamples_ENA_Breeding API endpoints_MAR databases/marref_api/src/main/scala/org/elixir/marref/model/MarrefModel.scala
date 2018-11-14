package org.elixir.marref.model

import org.elixir.marref.model.bioschema.TopLevel
import org.elixir.marref.utils.json.Json

case class UrlModel(url: String, value: String)
case class DateModel(`type`: String, date: String)
case class YearModel(`type`: String, year: String)
case class TypeValueModel(`type`: String, year: String)
case class ItemListModel(item: Seq[String])
case class AnnotationSoftwareRevisionModel(`type`: String, value: String)
case class AccessionModel(accession: Seq[UrlModel])
case class ValueModel(value: String)
case class LatLongModel(latitude: Double,
                        longitude: Double)

case class SampleModel(annotationProvider: Option[String] = None,
                       annotationDate: Option[DateModel],
                       annotationPipeline: Option[String],
                       annotationMethod: Option[ItemListModel],
                       annotationSoftwareRevision: Option[AnnotationSoftwareRevisionModel],
                       featuresAnnotated: Option[ItemListModel],
                       refseqCds: Option[Int],
                       ncbiRefseqAccession: Option[AccessionModel],
                       genes: Option[Int],
                       cds: Option[Int],
                       pseudoGenes: Option[Int],
                       partialRrnas: Option[Map[String, Int]],
                       trnas: Option[Int],
                       ncrna: Option[Int],
                       frameshiftedGenes: Option[Int],
                       sequencingCenters: Option[String],
                       seqMeth: Option[ItemListModel],
                       assemblyAccession: Option[UrlModel],
                       assembly: Option[ItemListModel],
                       gcContent: Option[Int],
                       numReplicons: Option[Int],
                       genomeLength: Option[Int],
                       plasmids: Option[Int],
                       hostCommonName: Option[String],
                       investigationType: Option[String],
                       sampleType: Option[String],
                       isolationSource: Option[String],
                       isolationCountry: Option[String],
                       envBiome: Option[UrlModel],
                       envFeature: Option[UrlModel],
                       envMaterial: Option[UrlModel],
                       envPackage: Option[String],
                       isolGrowthCondt: Option[AccessionModel],
                       refBiomaterial: Option[AccessionModel],
                       cultureCollection: Option[ItemListModel],
                       biosampleAccession: Option[UrlModel],
                       isolationComments: Option[String],
                       geoLocNameGaz: Option[String],
                       geoLocNameGazEnvo: Option[UrlModel],
                       analysisProjectType: Option[String],
                       fullScientificName: Option[String],
                       organism: Option[String],
                       taxonLineageNames: Option[ItemListModel],
                       taxonLineageIds: Option[AccessionModel],
                       ncbiTaxonIdentifier: Option[UrlModel],
                       strain: Option[ItemListModel],
                       kingdom: Option[String],
                       phylum: Option[String],
                       `class`: Option[String],
                       order: Option[String],
                       family: Option[String],
                       genus: Option[String],
                       species: Option[String],
                       cellShape: Option[String],
                       temperatureRange: Option[String],
                       oxygenRequirement: Option[String],
                       antismashTypes: Option[String],
                       antismashClusters: Option[String],
                       mmpID: Option[UrlModel],
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
                       mmpBiome: Option[String],
                       sequencingDepth: Option[ItemListModel],
                       collectionDate: Option[YearModel],
                       depth: Option[TypeValueModel],
                       latLon: Option[LatLongModel],
                       projectName: Option[String]
) {
  def toJson(): String = Json.serialize(this)
  def toBioschema(): TopLevel = ???
  def toJsonld(): String = Json.serialize(toBioschema())
}

case class RecordsModel(databaseType: String,
                        record: Seq[SampleModel])

case class MarrefModel(records: RecordsModel)
