package org.elixir.marref.service

import org.elixir.marref.model.SampleModel
import org.springframework.http.ResponseEntity

trait SampleProviderTrait {
  def getAllSamples(): String
  def getAllMmpIds(): String
  def getAllBsIds(): String
  def getSample(id: String, stringify: SampleModel => String): ResponseEntity[Any]
}
