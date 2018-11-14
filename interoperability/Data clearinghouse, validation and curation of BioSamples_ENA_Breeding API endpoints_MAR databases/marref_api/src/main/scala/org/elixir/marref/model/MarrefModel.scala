package org.elixir.marref.model

case class UrlModel(url: String, value: String)

case class SampleModel(mmpID: UrlModel,
                       biosampleAccession: UrlModel)

case class RecordsModel(databaseType: String,
                        record: Seq[SampleModel])

case class MarrefModel(records: RecordsModel)
