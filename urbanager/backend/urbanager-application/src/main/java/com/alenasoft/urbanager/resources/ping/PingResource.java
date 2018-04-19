package com.alenasoft.urbanager.resources.ping;

import com.alenasoft.urbanager.resources.ping.service.PingService;
import javax.inject.Inject;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

@Path("ping")
public class PingResource {

  @Inject
  private PingService service;

  @GET
  @Produces(MediaType.APPLICATION_JSON)
  public Response sendOk() {
    return Response.ok(this.service.getServerStatus()).build();
  }
}

