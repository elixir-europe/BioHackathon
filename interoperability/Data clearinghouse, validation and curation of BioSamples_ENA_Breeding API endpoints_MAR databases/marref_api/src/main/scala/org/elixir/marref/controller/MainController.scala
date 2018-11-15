package org.elixir.marref.controller

import org.elixir.marref.model.SampleModel
import org.elixir.marref.service.SampleProviderTrait
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation._

@RestController
@RequestMapping(path = Array("/api/marref"))
class MainController(val sampleProvider: SampleProviderTrait) {

  @GetMapping(path = Array("/samples"))
  def getAllSamples: String = {
    sampleProvider.getAllSamples()
  }

  @GetMapping(path = Array("/ids")) //ex: /ids?name=MMP
  def getAllIds(@RequestParam(name="name", defaultValue="MMP", required=false) name: String): ResponseEntity[Any] = {
    name match {
      case "MMP" => ResponseEntity.ok(sampleProvider.getAllMmpIds())
      case _ => ResponseEntity.status(501).build()
    }
  }

  @GetMapping(path = Array("/samples/{id}"))
  def getSample(@PathVariable id: String) : ResponseEntity[Any] = {
    sampleProvider.getSample(id, (sm: SampleModel) => sm.toJson())
  }
}
