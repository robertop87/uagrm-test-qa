package com.alenasoft.urbanager.resources.hello;

import com.alenasoft.urbanager.api.Result;
import io.dropwizard.hibernate.UnitOfWork;

import javax.inject.Inject;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.net.URI;

@Path("hello")
public class HelloResource {

    @Inject
    private HelloService service;

    @GET
    public String helloWorld() {
        return "Hello World";
    }

    @GET
    @UnitOfWork
    @Path("{id}")
    @Produces(MediaType.APPLICATION_JSON)
    public Result getResult(@PathParam("id") long id) {
        return this.service.getById(id);
    }

    @GET
    @Path("query")
    public String helloWorldQuery(@QueryParam("data") String data,
                                  @QueryParam("second") String second) {
        return data + second;
    }

    @GET
    @UnitOfWork
    @Path("{num1}/{num2}")
    public Response sumNumbers(@PathParam("num1") int num1,
                               @PathParam("num2") int num2) {
        long idCreated = this.service.sum(num1, num2);
        return Response
                .created(URI.create("/api/hello/" + idCreated))
                //.entity(this.service.sum(num1, num2))
                .build();
    }
}

