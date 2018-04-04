package com.alenasoft.urbanager.api;

import com.fasterxml.jackson.annotation.JsonProperty;
import org.hibernate.annotations.Table;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

// POJO: Plain Old Java Object
@Entity
@Table(appliesTo = "Result")
public class Result {

    @Id
    @JsonProperty
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public long id;

    @JsonProperty
    public String operation;

    @JsonProperty
    public int number1;

    @JsonProperty
    public int number2;

    @JsonProperty
    public int result;
}

