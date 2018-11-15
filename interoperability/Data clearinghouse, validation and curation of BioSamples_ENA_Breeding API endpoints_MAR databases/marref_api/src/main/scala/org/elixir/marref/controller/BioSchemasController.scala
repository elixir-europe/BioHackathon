package org.elixir.marref.controller

import org.elixir.marref.model.SampleModel
import org.elixir.marref.service.SampleProviderTrait
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.{GetMapping, PathVariable, RequestMapping, RestController}

@RestController
@RequestMapping(path = Array("/marref/api"), produces = Array("application/ld+json"))
class BioSchemasController(val sampleProvider: SampleProviderTrait) {
  @GetMapping(path = Array("/samples"))
  def getAllSamples: String = {
    sampleProvider.getAllSamples((sm: SampleModel) => sm.toJsonld())
  }

  @GetMapping(path = Array("/samples/{id}"))
  def getSample(@PathVariable id: String) : ResponseEntity[Any] = {
    sampleProvider.getSample(id, (sm: SampleModel) => sm.toJsonld())
  }
}
