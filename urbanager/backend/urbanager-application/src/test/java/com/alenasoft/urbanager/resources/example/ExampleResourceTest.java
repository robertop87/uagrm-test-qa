package com.alenasoft.urbanager.resources.example;

import static org.assertj.core.api.Assertions.assertThat;

import com.alenasoft.urbanager.UrbanagerApp;
import com.alenasoft.urbanager.UrbanagerConf;
import com.alenasoft.urbanager.api.Example;
import io.dropwizard.client.JerseyClientBuilder;
import io.dropwizard.testing.ResourceHelpers;
import io.dropwizard.testing.junit.DropwizardAppRule;
import java.util.Random;
import javax.ws.rs.client.Client;
import javax.ws.rs.client.Entity;
import javax.ws.rs.core.Response;
import org.apache.http.HttpStatus;
import org.junit.After;
import org.junit.Before;
import org.junit.ClassRule;
import org.junit.Test;

/**
 * Example to Integration test in UnitTest style for ExampleResource.
 *
 * @author Luis Roberto Perez
 * @since 20-05-17
 */
public class ExampleResourceTest {

  @ClassRule
  public static final DropwizardAppRule<UrbanagerConf> RULE = new
      DropwizardAppRule<UrbanagerConf>(UrbanagerApp.class,
        ResourceHelpers.resourceFilePath("config-test.yml"));

  public final Random random = new Random();

  public Client client;

  @Before
  public void setUp() {
    this.client = new JerseyClientBuilder(RULE.getEnvironment())
        .build(String.format("tester-%d", this.random.nextInt()));
  }

  @After
  public void tearDown() {
    this.client.close();
    this.client = null;
  }

  @Test
  public void testToGetOkResponseWhenGettingAllExamples() {
    Response response = this.client.target(
        String.format("http://localhost:%d/api/example", RULE.getLocalPort()))
        .request().get();

    assertThat(response.getStatus()).isEqualTo(HttpStatus.SC_OK);
  }

  @Test
  public void testToCreateOneExampleAndGetCreatedResponse() {
    Example example = new Example();
    example.title = "Simple test";
    example.message = "Test message";

    Response response = this.client.target(
        String.format("http://localhost:%d/api/example", RULE.getLocalPort()))
        .request().post(Entity.json(example));

    assertThat(response.getStatus()).isEqualTo(HttpStatus.SC_CREATED);
  }

  @Test
  public void testAfterCreateOneExampleTheLocationShouldBeValid() {
    Example example = new Example();
    example.title = "Simple test";
    example.message = "Test message";

    // Create a new Example
    Response response = this.client.target(
        String.format("http://localhost:%d/api/example", RULE.getLocalPort()))
        .request().post(Entity.json(example));
    assertThat(response.getStatus()).isEqualTo(HttpStatus.SC_CREATED);

    // Test if created location header is valid
    Response responseWithExample = this.client.target(
        String.format(response.getHeaderString("location"), RULE.getLocalPort()))
        .request().get();
    assertThat(responseWithExample.getStatus()).isEqualTo(HttpStatus.SC_OK);
  }
}
