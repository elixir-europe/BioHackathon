package org.elixir.marref

import org.springframework.context.annotation.Configuration
import org.springframework.http.MediaType
import org.springframework.web.servlet.config.annotation.{ContentNegotiationConfigurer, WebMvcConfigurerAdapter}

@Configuration
class WebappConfiguration extends WebMvcConfigurerAdapter{

  override def configureContentNegotiation(configurer: ContentNegotiationConfigurer): Unit = {
    configurer.mediaType("ldjson", new MediaType("application", "ld+json"))
    configurer.mediaType( "json", new MediaType("application", "json"))
  }

}
