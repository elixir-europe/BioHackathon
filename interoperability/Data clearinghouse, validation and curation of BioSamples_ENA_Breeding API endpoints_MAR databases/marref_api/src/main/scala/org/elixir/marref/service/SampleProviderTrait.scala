package org.elixir.marref.service

import java.nio.file.Path

trait SampleProviderTrait {
  def dbPath: Path

  def getAllSamples(): String

  def getSample(id: String): String

  def count(): String
}
