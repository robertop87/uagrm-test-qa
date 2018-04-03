package com.alenasoft.urbanager.api;

import com.fasterxml.jackson.annotation.JsonProperty;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import org.hibernate.annotations.NamedQueries;
import org.hibernate.annotations.NamedQuery;
import org.hibernate.annotations.Table;

/**
 * Example POJO.
 *
 * @author Luis Roberto Perez
 * @since 20-05-17
 */
@Entity
@Table(appliesTo = "Example")
@ApiModel(value = "Example Data Object", description = "Example Data")
@NamedQueries({
    @NamedQuery(
        name = "com.alenasoft.urbanager.api.Example.findAll",
        query = "SELECT e FROM Example e"
    )})
public class Example {

  @Id
  @JsonProperty
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @ApiModelProperty(value = "The Example id")
  public long id;

  @JsonProperty
  @ApiModelProperty(value = "The Example's title")
  public String title;

  @JsonProperty
  @ApiModelProperty(value = "The Example's message")
  public String message;

  /**
   * Empty constructor, this is needed for Jackson parsing.
   */
  public Example() {  }

  /**
   * Full constructor for Example POJO.
   *
   * @param id        The unique id
   * @param title     The example title
   * @param message   The example message
   */
  public Example(long id, String title, String message) {
    this.id = id;
    this.title = title;
    this.message = message;
  }

  @Override
  public boolean equals(Object obj) {
    if (this == obj) {
      return true;
    }
    if (obj == null || getClass() != obj.getClass()) {
      return false;
    }

    Example example = (Example) obj;

    return id == example.id && title.equals(example.title) && message.equals(example.message);
  }

  @Override
  public int hashCode() {
    int result = (int) (id ^ (id >>> 32));
    result = 31 * result + title.hashCode();
    result = 31 * result + message.hashCode();
    return result;
  }
}
