package com.alenasoft.urbanager;

import com.alenasoft.urbanager.api.Example;
import com.alenasoft.urbanager.api.Result;
import com.alenasoft.urbanager.core.modules.HibernateModule;
import com.alenasoft.urbanager.core.modules.MainModule;
import com.fasterxml.jackson.annotation.JsonInclude;
import io.dropwizard.Application;
import io.dropwizard.assets.AssetsBundle;
import io.dropwizard.db.DataSourceFactory;
import io.dropwizard.hibernate.HibernateBundle;
import io.dropwizard.setup.Bootstrap;
import io.dropwizard.setup.Environment;
import io.swagger.jaxrs.config.BeanConfig;
import io.swagger.jaxrs.listing.ApiListingResource;
import ru.vyarus.dropwizard.guice.GuiceBundle;

public class UrbanagerApp extends Application<UrbanagerConf> {

  private final HibernateBundle<UrbanagerConf> hibernate = new
      HibernateBundle<UrbanagerConf>(Example.class, Result.class) { // Register POJOs
        @Override
        public DataSourceFactory getDataSourceFactory(UrbanagerConf configuration) {
          return configuration.getDataSourceFactory();
      }
  };

  public static void main(final String[] args) throws Exception {
    new UrbanagerApp().run(args);
  }

  @Override
  public String getName() {
    return "Urbanager";
  }

  @Override
  public void initialize(final Bootstrap<UrbanagerConf> bootstrap) {
    bootstrap.addBundle(new AssetsBundle("/tools/swagger", "/swagger"));
    bootstrap.addBundle(hibernate);

    bootstrap.addBundle(GuiceBundle.builder()
        .enableAutoConfig(this.getClass().getPackage().getName())
        .modules(new MainModule(), new HibernateModule(hibernate))
        .build());
  }

  @Override
  public void run(final UrbanagerConf configuration, final Environment environment) {
    prepareSwaggerApiListingResource(environment);
  }

  private void prepareSwaggerApiListingResource(final Environment environment) {
    environment.jersey().register(new ApiListingResource());
    environment.getObjectMapper().setSerializationInclusion(JsonInclude.Include.NON_NULL);
    BeanConfig config = new BeanConfig();
    config.setTitle("Urbanization Manager REST Services");
    config.setVersion("0.0.1");
    config.setBasePath("/api");
    config.setResourcePackage(this.getClass().getPackage().getName());
    config.setScan(true);
  }

}
