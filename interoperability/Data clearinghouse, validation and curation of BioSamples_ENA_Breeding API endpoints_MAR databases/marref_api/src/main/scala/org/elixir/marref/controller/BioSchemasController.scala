package org.elixir.marref.controller

import org.elixir.marref.service.SampleProviderTrait
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.{GetMapping, PathVariable, RequestMapping, RestController}

@RestController
@RequestMapping(path = Array("/api/marref"), produces = Array("application/ld+json"))
class BioSchemasController(val sampleProvider: SampleProviderTrait) {

  @GetMapping(path = Array("/samples"))
  def getAllSamples: String = {
//    sampleProvider.getAllSamples()
    "hello world"
  }

  @GetMapping(path = Array("/samples/{id}"))
  def getSample(@PathVariable id: String) : ResponseEntity[Any] = {
    ResponseEntity.ok(s"This is a sample with Id $id")
//    sampleProvider.getSample(id)
  }

//  @GetMapping(path = Array("/count"))
//  def count : String = {
//    sampleProvider.count()
//  }
}
