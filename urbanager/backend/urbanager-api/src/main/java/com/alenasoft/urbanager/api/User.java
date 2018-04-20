package com.alenasoft.urbanager.api;

import com.fasterxml.jackson.annotation.JsonProperty;

public class User {

  @JsonProperty
  public long id; // DB id

  @JsonProperty
  public long ci;

  @JsonProperty
  public String name;

  public User() { }

  public User(long id, long ci, String name) {
    this.id = id;
    this.ci = ci;
    this.name = name;
  }
}
