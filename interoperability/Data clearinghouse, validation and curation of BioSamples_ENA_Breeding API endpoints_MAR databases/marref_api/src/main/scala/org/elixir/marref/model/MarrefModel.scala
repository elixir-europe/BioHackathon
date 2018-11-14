package org.elixir.marref.model

import com.fasterxml.jackson.annotation.JsonProperty

case class UrlModel(url: String, value: String)

case class SampleModel(@JsonProperty mmpID: UrlModel,
                       @JsonProperty biosampleAccession: UrlModel)

case class RecordsModel(databaseType: String,
                        record: Seq[SampleModel])

case class MarrefModel(records: RecordsModel)
