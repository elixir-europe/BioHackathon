package org.elixir.marref.model.bioschema

case class ValueReference(`@type`: String = "CategoryCode",
                          name: Option[String] = None,
                          codeValue: String,
                          url: String)

case class Property(`@type`: String = "PropertyValue",
                    name: String,
                    value: String,
                    valueReference: Option[Seq[ValueReference]] = None
                   )

case class TopLevel(`@context`: String,
                   `@type`: Seq[String],
                   `@id`: String,
                   identifier: Seq[String],
                   name: Seq[String],
                   description: String,
                   url: String,
                   //dataset: Seq[String],
                   additionalProperty: Seq[Property]
                   )
