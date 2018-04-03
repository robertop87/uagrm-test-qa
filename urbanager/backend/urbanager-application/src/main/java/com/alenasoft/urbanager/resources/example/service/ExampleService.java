package com.alenasoft.urbanager.resources.example.service;

import com.alenasoft.urbanager.api.Example;
import java.util.List;

/**
 * This is a sample interfaces Service.
 *
 * @author Luis Roberto Perez
 * @since 20-05-17
 */
public interface ExampleService {

  Example findById(long id);

  List<Example> findAll();

  long create(Example example);
}
