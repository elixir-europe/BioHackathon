package org.elixir.marref.utils.json

import org.elixir.marref.utils.StringUtils
import org.json4s.{Formats, NoTypeHints}
import org.json4s.jackson.Serialization

import scala.util.Try

class Json(formats: Formats) {

  private implicit val fo: Formats = formats

  def parse[T: Manifest](input: String): T = {
    val t: Try[T] = Try {
      Serialization.read[T](input)
    } recover {
      case e: Throwable =>
        println(
          s"Error while parsing type ${implicitly[Manifest[T]].runtimeClass.getName} with input:\n${StringUtils
            .truncateString(input)}",
          e)
        throw e
    }
    t.get
  }

  def serialize[T <: AnyRef: Manifest](input: T): String = {
    val t: Try[String] = Try {
      Serialization.write(input)
    } recover {
      case e: Throwable =>
        println(
          s"Error while serializing type ${implicitly[Manifest[T]].runtimeClass.getName} with input:\n${StringUtils
            .truncateString(input.toString)}",
          e)
        throw e
    }
    t.get
  }

  def prettyPrint[T <: AnyRef: Manifest](input: T): String = {
    val t: Try[String] = Try {
      Serialization.writePretty(input)
    } recover {
      case e: Throwable =>
        println(
          s"Error while serializing type ${implicitly[Manifest[T]].runtimeClass.getName} with input:\n${StringUtils
            .truncateString(input.toString)}",
          e)
        throw e
    }
    t.get
  }
}

object Json extends Json(Serialization.formats(NoTypeHints))
