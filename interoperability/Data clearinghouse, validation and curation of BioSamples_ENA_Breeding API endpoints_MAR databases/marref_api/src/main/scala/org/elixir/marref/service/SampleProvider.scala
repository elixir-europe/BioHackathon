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
  val count = marrefModel.records.record.length

  override def getAllSamples(stringify: SampleModel => String, page: Int, size: Int): ResponseEntity[Any] = {
    val fistIndex: Int = page * size
    val lastIndex: Int = (page+1) * size
    ResponseEntity.ok(
      s"""{
         |"pageMeta": {
         |"pageSize": $size,
         |"pageNumber": $page,
         |"totalSamples": $count
         |},
         |"content": [${marrefModel.records.record.slice(fistIndex, lastIndex).map{sm => stringify(sm)}.mkString(",")}]
         |}""".stripMargin)
  }

  private def getSampleObj(id:String): Option[SampleModel] = {
    def getId(sm: SampleModel): Option[String] = if(id.startsWith("MMP"))
      sm.mmpID map {_.value}
    else
      sm.biosampleAccession map {_.value}

    marrefModel.records.record find {r => getId(r).getOrElse("notFound") == id}
  }

  override def getSample(id: String, stringify: SampleModel => String): ResponseEntity[Any] = {
    getSampleObj(id) match {
      case Some(sm) => ResponseEntity.ok(stringify(sm))
      case None => ResponseEntity.notFound().build()
    }
  }

  override def getAllMmpIds(): String = {
    val list: Seq[String] = marrefModel.records.record.flatMap{_.mmpID}.map{_.value}
    Json.serialize[Seq[String]](list)
  }

  override def getAllBsIds(): String = {
    val list: Seq[String] = marrefModel.records.record.flatMap{_.biosampleAccession}.map{_.value}
    Json.serialize[Seq[String]](list)
  }
}
