package org.elixir.marref.service

import org.elixir.marref.model.SampleModel
import org.springframework.http.ResponseEntity

trait SampleProviderTrait {
  def getAllSamples(stringify: SampleModel => String, page: Int=0, size: Int=10): ResponseEntity[Any]
  def getAllMmpIds(): String
  def getAllBsIds(): String
  def getSample(id: String, stringify: SampleModel => String): ResponseEntity[Any]
}
