package com.alenasoft.urbanager.api;

import com.fasterxml.jackson.annotation.JsonProperty;

public class ServerStatus {

  @JsonProperty
  public String message;

  @JsonProperty
  public long timestamp;
}
