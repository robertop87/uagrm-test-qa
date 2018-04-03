package com.alenasoft.urbanager.resources.example.dao;

import com.alenasoft.urbanager.api.Example;
import java.util.List;

/**
 * Example DAO.
 *
 * @author Luis Roberto Perez
 * @since 20-05-17
 */
public interface ExampleDao {

  Example findById(long id);

  List<Example> findAll();

  long create(Example example);
}
