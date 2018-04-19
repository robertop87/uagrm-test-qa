package com.alenasoft.urbanager.resources.ping.service;

import com.alenasoft.urbanager.api.ServerStatus;
import java.time.Instant;

public class PingServiceImpl implements PingService {

  @Override
  public ServerStatus getServerStatus() {
    ServerStatus serverStatus = new ServerStatus();
    serverStatus.message = "pong";
    serverStatus.timestamp = Instant.now().toEpochMilli();

    return serverStatus;
  }
}

