package org.elixir.marref.model.bioschema

case class ValueReference(`@type`: String,
                          name: Option[String] = None,
                          codeValue: String,
                          url: String)

case class Property(`type`: String,
                    name: String,
                    value: String,
                    valueReference: Option[ValueReference] = None
                   )

case class TopLevel(`@context`: String,
                   `@type`: Seq[String],
                   identifier: Seq[String],
                   name: String,
                   description: String,
                   url: String,
                   dataset: Seq[String],
                   additionalProperty: Seq[Property]
                   )
