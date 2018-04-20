package com.alenasoft.urbanager.resources.user;

import com.alenasoft.urbanager.api.User;
import java.util.ArrayList;
import java.util.List;

public class UserServiceStub implements UserService {

  private List<User> users = new ArrayList<>(0);

  @Override
  public User getUserById(long userId) throws Exception {
    return this.users.stream()
        .filter(u -> u.id == userId)
        .findFirst()
        .orElseThrow(() -> new Exception("User not found"));
  }

  @Override
  public long registerUser(User user) {
    this.users.add(user);
    return user.id;
  }
}
