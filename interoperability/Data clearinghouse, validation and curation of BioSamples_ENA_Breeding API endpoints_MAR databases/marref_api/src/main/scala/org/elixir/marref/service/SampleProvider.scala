package org.elixir.marref.service

import org.elixir.marref.model.{MarrefModel, SampleModel}
import org.elixir.marref.utils.json.Json
import org.springframework.core.io.ClassPathResource
import org.springframework.http.ResponseEntity
import org.springframework.stereotype.Service

import scala.io.Source

@Service
class SampleProvider() extends SampleProviderTrait {

  val resource = new ClassPathResource("marrefdb.json")
  val bufferedSource = Source.fromFile(resource.getFile)
  val dbString = bufferedSource.mkString
  bufferedSource.close

  val marrefModel = Json.parse[MarrefModel](dbString)

  override def getAllSamples(): String = dbString

  override def getSample(id: String): ResponseEntity[Any] = {
    def getId(sm: SampleModel): Option[String] = if(id.startsWith("MMP"))
      sm.mmpID map {_.value}
    else
      sm.biosampleAccession map {_.value}

    marrefModel.records.record find {r => getId(r).getOrElse("notFound") == id} match {
      case Some(sm) => ResponseEntity.ok(Json.serialize(sm))
      case None => ResponseEntity.notFound().build()
    }
  }
}
