package org.elixir.marref.controller

import org.elixir.marref.model.SampleModel
import org.elixir.marref.service.SampleProviderTrait
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation._

@RestController
@RequestMapping(path = Array("/marref/api"), produces = Array("application/ld+json"))
class BioSchemasController(val sampleProvider: SampleProviderTrait) {
  @GetMapping(path = Array("/samples"))
  def getAllSamples(@RequestParam(name="page", defaultValue="0", required=false) page: Int,
                    @RequestParam(name="size", defaultValue="10", required=false) size: Int): ResponseEntity[Any] = {
    sampleProvider.getAllSamples((sm: SampleModel) => sm.toJsonld, page, size)
  }

  @GetMapping(path = Array("/samples/{id}"))
  def getSample(@PathVariable id: String) : ResponseEntity[Any] = {
    sampleProvider.getSample(id, (sm: SampleModel) => sm.toJsonld)
  }
}
