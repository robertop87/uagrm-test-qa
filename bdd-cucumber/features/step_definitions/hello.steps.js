'use strict';

var {defineSupportCode} = require('cucumber');
var assert = require("assert");

defineSupportCode(function({Given, When, Then}) {

  var name = "";

  When('Recibo {string}', function (string) {
    // Write code here that turns the phrase above into concrete actions
    name = string;
  });

  Then('debo decir {string}', function (string) {
    // Write code here that turns the phrase above into concrete actions
    var resultado = "Hola " + name;
    assert.equal("Hola Roberto", resultado);
  });
});
