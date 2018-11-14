package org.elixir.marref.service

import java.nio.file.{Path, Paths}

import org.elixir.marref.model.{MarrefModel, SampleModel}
import org.elixir.marref.utils.json.Json
import org.json4s.JsonAST.{JArray, JObject, JValue}
import org.springframework.beans.factory.annotation.{Autowired, Value}
import org.springframework.http.{HttpEntity, ResponseEntity}
import org.springframework.stereotype.Service
import org.springframework.core.io.ClassPathResource
import org.springframework.core.io.Resource

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
    def getId(sm: SampleModel): String = if(id.startsWith("MMP"))
      sm.mmpID.value
    else
      sm.biosampleAccession.value
    marrefModel.records.record find {r => getId(r) == id} match {
      case Some(sm) => ResponseEntity.ok(Json.serialize(sm))
      case None => ResponseEntity.notFound().build()
//      case None => s"'$id' not found in database"
    }

//    def getId(sm: JObject): String = if(id.startsWith("MMP"))
//      marrefRecords.find( r => r.asInstanceOf[JObject].values("mmpID") == id)
//    else
//      marrefRecords.find( r => r.asInstanceOf[JObject].values("mmpID") == id) match {
//      case Some(jValue) => jValue.toString
//      case None => s"'$id' not found in database"
//    }
  }

}
