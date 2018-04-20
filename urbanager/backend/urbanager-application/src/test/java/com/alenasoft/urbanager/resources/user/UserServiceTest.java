package com.alenasoft.urbanager.resources.user;

import static org.junit.Assert.*;

import com.alenasoft.urbanager.api.User;
import org.junit.Before;
import org.junit.Test;

public class UserServiceTest {

  private UserService service;

  @Before
  public void setUp() {
    this.service = new UserServiceStub();
    this.service.registerUser(new User(1, 14515, "Luis"));
    this.service.registerUser(new User(2, 13335, "Luana"));
    this.service.registerUser(new User(3, 133335, "Juan"));
    this.service.registerUser(new User(4, 15465, "Andres"));
    this.service.registerUser(new User(5, 56565, "Kevin"));
  }

  @Test
  public void testRegisterNewUser() {
    long newId = this.service.registerUser(new User(1, 123456, "Roberto"));
    assertEquals(1, newId);

    newId = this.service.registerUser(new User(155, 14515, "Luis"));
    assertEquals(155, newId);
  }

  @Test
  public void testGetUserById() throws Exception {
    User user = this.service.getUserById(1);
    assertEquals("Luis", user.name);
  }

  @Test(expected = Exception.class)
  public void testGetNonExistingUserById() throws Exception {
    User user = this.service.getUserById(-6);
  }
}