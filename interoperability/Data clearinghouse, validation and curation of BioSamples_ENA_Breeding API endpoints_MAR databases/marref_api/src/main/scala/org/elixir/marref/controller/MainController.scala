package org.elixir.marref.controller

import org.elixir.marref.model.SampleModel
import org.elixir.marref.service.SampleProviderTrait
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation._

@RestController
@RequestMapping(path = Array("/marref/api"), produces= Array("application/json"))
class MainController(val sampleProvider: SampleProviderTrait) {

  @GetMapping(path = Array("/samples"))
  def getAllSamples: ResponseEntity[Any] = {
    sampleProvider.getAllSamples((sm: SampleModel) => sm.toJson)
  }

  @GetMapping(path = Array("/ids")) //ex: /ids?accession=marref
  def getAllIds(@RequestParam(name="accession", defaultValue="marref", required=false) name: String): ResponseEntity[Any] = {
    name match {
      case "marref" => ResponseEntity.ok(sampleProvider.getAllMmpIds())
      case "biosample" => ResponseEntity.ok(sampleProvider.getAllBsIds())
      case _ => ResponseEntity.status(501).build()
    }
  }

  @GetMapping(path = Array("/samples/{id}"))
  def getSample(@PathVariable id: String) : ResponseEntity[Any] = {
    sampleProvider.getSample(id, (sm: SampleModel) => sm.toJson)
  }
}
