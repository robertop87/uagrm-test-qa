package com.alenasoft.urbanager.core.modules;

import com.alenasoft.urbanager.UrbanagerConf;
import com.alenasoft.urbanager.resources.example.dao.ExampleDao;
import com.alenasoft.urbanager.resources.example.dao.ExampleDaoImpl;
import com.google.inject.AbstractModule;
import com.google.inject.Provides;
import io.dropwizard.hibernate.HibernateBundle;

/**
 * Hibernate Module, injects any object with DAO dependency.
 *
 * @author Luis Roberto Perez
 * @since 20-05-17
 */
public class HibernateModule extends AbstractModule {

  private final HibernateBundle<UrbanagerConf> hibernate;

  public HibernateModule(HibernateBundle<UrbanagerConf> hibernate) {
    this.hibernate = hibernate;
  }

  @Override
  protected void configure() { }

  @Provides
  public ExampleDao providesCustomerDao(UrbanagerConf configuration) {
    return new ExampleDaoImpl(this.hibernate.getSessionFactory());
  }
}

