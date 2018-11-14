package org.elixir.marref.service

import java.io.InputStream

import org.elixir.marref.model.{MarrefModel, SampleModel}
import org.elixir.marref.utils.json.Json
import org.springframework.http.ResponseEntity
import org.springframework.stereotype.Service

import scala.io.{BufferedSource, Source}

@Service
class SampleProvider() extends SampleProviderTrait {

  val classloader: ClassLoader = Thread.currentThread().getContextClassLoader
  val is: InputStream = classloader.getResourceAsStream("marrefdb.json")
  val bufferedSource: BufferedSource = Source.fromInputStream(is)
  val dbString: String = bufferedSource.mkString
  bufferedSource.close

  val marrefModel: MarrefModel = Json.parse[MarrefModel](dbString)

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
