package com.alenasoft.urbanager.resources.ping.service;

import static org.junit.Assert.*;

import com.alenasoft.urbanager.api.ServerStatus;
import java.time.Instant;
import org.junit.Before;
import org.junit.Test;

public class PingServiceTest {

  private PingService service;

  @Before
  public void setUp() {
    this.service = new PingServiceImpl();
  }

  @Test
  public void testGetServerStatusHasMessagePong() {
    ServerStatus result = this.service.getServerStatus();
    assertEquals("pong", result.message);
  }

  @Test
  public void testGetServerStatusHasAvalidTimestamp() {
    ServerStatus result = this.service.getServerStatus();

    String timestamp = Long.toString(result.timestamp);
    assertEquals(13, timestamp.length());
  }
}
