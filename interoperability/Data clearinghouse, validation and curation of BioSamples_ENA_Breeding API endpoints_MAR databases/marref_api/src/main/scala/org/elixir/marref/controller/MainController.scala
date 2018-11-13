package org.elixir.marref.controller

import org.elixir.marref.service.SampleProviderTrait
import org.springframework.web.bind.annotation.{GetMapping, PathVariable, RequestMapping, RestController}

@RestController
@RequestMapping(path = Array("/api"))
class MainController(val sampleProvider: SampleProviderTrait) {

  @GetMapping(path = Array("/samples"))
  def getAllSamples: String = {
    sampleProvider.getAllSamples()
  }

  @GetMapping(path = Array("/samples/{id}"))
  def getSample(@PathVariable id: String) : String = {
    sampleProvider.getSample(id)
  }

}
