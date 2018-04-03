package com.alenasoft.urbanager.resources.example.service;

import static org.assertj.core.api.Assertions.assertThat;

import com.alenasoft.urbanager.api.Example;
import com.alenasoft.urbanager.resources.example.dao.ExampleDao;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.mockito.Matchers;
import org.mockito.Mockito;

/**
 * Unit test for Example Service Implementation.
 *
 * @author Luis Roberto Perez
 * @since 20-05-17
 */
public class ExampleServiceImplTest {

  private final ExampleDao dao = Mockito.mock(ExampleDao.class);
  private final Example expected = new Example(1, "Test title", "Test Message");

  @Before
  public void setUp() {
    Mockito.when(this.dao.findById(Matchers.anyLong())).thenReturn(this.expected);
  }

  @After
  public void tearDown() {
    Mockito.reset(this.dao);
  }

  @Test
  public void testGetAnExample() {
    ExampleService service = new ExampleServiceImpl(this.dao);
    Example result = service.findById(15);
    assertThat(result).isEqualTo(this.expected);
    Mockito.verify(dao).findById(15);
  }
}