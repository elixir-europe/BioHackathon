package org.elixir.marref.service

import java.nio.file.{Path, Paths}

import org.elixir.marref.model.{MarrefModel, SampleModel}
import org.elixir.marref.utils.json.Json
import org.springframework.stereotype.Service

import scala.io.Source

@Service
class SampleProvider extends SampleProviderTrait {
  override val dbPath: Path = Paths.get("C:\\Users\\marcadella\\Desktop\\data.json\\MarRef_2018-09-13.json")

  val bufferedSource = Source.fromFile(dbPath.toString)
  val dbString = bufferedSource.mkString
  bufferedSource.close

  val dbObject = Json.parse[MarrefModel](dbString)

  override def getAllSamples(): String = dbString

  override def getSample(id: String): String = {
    def getId(sm: SampleModel): String = if(id.startsWith("MMP"))
      sm.mmpID.value
    else
      sm.biosampleAccession.value
    dbObject.records.record find {r => getId(r) == id} match {
      case Some(sm) => sm.toString
      case None => s"'$id' not found in database"
    }
  }

  override def count(): String = s"${dbObject.records.record.length} samples"
}
