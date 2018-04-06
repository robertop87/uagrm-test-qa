'use strict';

var {defineSupportCode} = require('cucumber');
var assert = require("assert");

defineSupportCode(function({Given, When, Then}) {
  var result = 0;
  
  When('Recibo {int} y {int}', function (int, int2) {
    // Write code here that turns the phrase above into concrete actions
    result = int + int2;
    //return 'pending';
  });

  Then('debo obtener {int}', function (int) {
    // Write code here that turns the phrase above into concrete actions
    assert.equal(int, result);
  });
});
