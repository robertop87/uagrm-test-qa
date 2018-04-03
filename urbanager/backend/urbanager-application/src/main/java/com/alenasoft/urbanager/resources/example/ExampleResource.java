package com.alenasoft.urbanager.resources.example;

import com.alenasoft.urbanager.api.Example;
import com.alenasoft.urbanager.resources.example.service.ExampleService;
import com.google.inject.Inject;
import io.dropwizard.hibernate.UnitOfWork;
import io.dropwizard.jersey.params.LongParam;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import io.swagger.annotations.ApiResponse;
import java.net.URI;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

/**
 * This is a simple Example resource.
 *
 * @author Luis Roberto Perez
 * @since 20-05-17
 */
@Path(ExampleResource.NAME)
@Api(value = ExampleResource.NAME, description = "Simple example resource")
public class ExampleResource {

  protected static final String NAME = "example";

  private final ExampleService service;

  @Inject
  public ExampleResource(ExampleService service) {
    this.service = service;
  }

  @GET
  @UnitOfWork
  @Path("/{exampleId}")
  @ApiOperation(value = "Get an Example with id", response = Example.class)
  @ApiResponse(code = 200, message = "Simple 200 Response with an Example JSON object")
  @Produces(MediaType.APPLICATION_JSON)
  public Response getExampleById(
      @ApiParam(value = "Example's ID", required = true)
      @PathParam("exampleId") LongParam exampleId) {
    return Response.ok(this.service.findById(exampleId.get())).build();
  }

  @GET
  @UnitOfWork
  @ApiOperation(
      value = "Get all Examples message with id",
      response = Example.class,
      responseContainer = "List")
  @ApiResponse(code = 200, message = "Simple 200 Response with a list of Example JSON objects")
  @Produces(MediaType.APPLICATION_JSON)
  public Response getExamples() {
    return Response.ok(this.service.findAll()).build();
  }

  /**
   * POST method to create a new Example Object.
   *
   * @param example The new example to be created
   * @return A Http Response with location for Example created
   */
  @POST
  @UnitOfWork
  @Consumes(MediaType.APPLICATION_JSON)
  @ApiOperation(value = "Creates a new Example")
  @ApiResponse(code = 201, message = "Created a new Example")
  public Response createExample(Example example) {
    long idCreated = this.service.create(example);
    String resourcePath = String.format("./%s/%d", ExampleResource.NAME, idCreated);
    return Response.created(URI.create(resourcePath)).build();
  }
}
