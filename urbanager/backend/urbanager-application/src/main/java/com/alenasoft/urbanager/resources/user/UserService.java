package com.alenasoft.urbanager.resources.user;

import com.alenasoft.urbanager.api.User;

public interface UserService {

  User getUserById(long userId) throws Exception;

  long registerUser(User user);
}
