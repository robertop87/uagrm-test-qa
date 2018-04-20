package com.alenasoft.urbanager.resources.user;

import com.alenasoft.urbanager.api.User;
import java.net.URI;
import javax.inject.Inject;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import org.apache.http.HttpStatus;

@Path("user")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
public class UserResource {

  @Inject
  private UserService service;

  @POST
  public Response registerUser(User user) {
    String path = "user/" + this.service.registerUser(user);
    return Response.created(URI.create(path)).build();
  }

  @GET
  @Path("{id}")
  public Response getUser(@PathParam("id") long userId) {
    try {
      return Response.ok(this.service.getUserById(userId)).build();
    } catch (Exception e) {
      return Response.status(HttpStatus.SC_NOT_FOUND).build();
    }
  }
}
