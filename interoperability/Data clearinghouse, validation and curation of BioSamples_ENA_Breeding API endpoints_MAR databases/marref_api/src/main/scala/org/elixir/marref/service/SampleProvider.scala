package org.elixir.marref.service

import org.springframework.stereotype.Service

@Service
class SampleProvider extends SampleProviderTrait {
  override def getAllSamples(): String = "Here all the samples"

  override def getSample(id: String): String = id
}
