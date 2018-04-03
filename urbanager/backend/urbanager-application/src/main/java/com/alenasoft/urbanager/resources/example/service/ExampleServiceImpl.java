package com.alenasoft.urbanager.resources.example.service;

import com.alenasoft.urbanager.api.Example;
import com.alenasoft.urbanager.resources.example.dao.ExampleDao;
import com.google.inject.Inject;
import java.util.List;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * A basic implementation of Example Service interface.
 *
 * @author Luis Roberto Perez
 * @since 20-05-17
 */
public class ExampleServiceImpl implements ExampleService {

  private final Logger logger = LoggerFactory.getLogger(this.getClass().getCanonicalName());

  private final ExampleDao dao;

  @Inject
  public ExampleServiceImpl(ExampleDao dao) {
    this.dao = dao;
  }

  @Override
  public Example findById(long id) {
    logger.debug("Getting Example by ID");
    return this.dao.findById(id);
  }

  @Override
  public List<Example> findAll() {
    return this.dao.findAll();
  }

  @Override
  public long create(Example example) {
    return this.dao.create(example);
  }
}
