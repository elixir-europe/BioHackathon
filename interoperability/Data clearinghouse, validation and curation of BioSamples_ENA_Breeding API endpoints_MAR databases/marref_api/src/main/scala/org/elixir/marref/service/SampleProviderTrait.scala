package org.elixir.marref.service

import java.nio.file.Path

import org.elixir.marref.model.SampleModel
import org.springframework.http.ResponseEntity

trait SampleProviderTrait {
//  def dbPath: Path

  def getAllSamples(): String

  def getSample(id: String): ResponseEntity[Any]

//  def count(): String
}
