const { Given, When, Then } = require('cucumber')
const { expect } = require('chai')
const rp = require('request-promise')

let userData = {};
let urbanagerResponse;

Given('Datos del usuario con id {int} {string} con CI {int}', function (int, string, int2) {
  userData.id = int;
  userData.name = string;
  userData.ci = int2;
});

When('Envio estos datos con POST a Urbanager', async function () {
  let options = {
    method: 'POST',
    uri: 'http://localhost:8080/api/user',
    json: true,
    body: userData,
    resolveWithFullResponse: true
  };

  await rp(options)
    .then(function(response) {
      urbanagerResponse = response;
    })
    .catch(function(error) {
      urbanagerResponse = error;
    });
});

Then('El servidor responde con el estado {int}', function (int) {
  expect(urbanagerResponse.statusCode).to.eql(int);
});

Then('Contiene una localizacion valida', async function () {
  let location = urbanagerResponse.headers.location;
  let options = {
    method: 'GET',
    uri: location,
    json: true,//
    resolveWithFullResponse: true
  };

  await rp(options)
    .then(function(response) {
      urbanagerResponse = response;
    })
    .catch(function(error) {
      urbanagerResponse = error;
    });

    expect(urbanagerResponse.statusCode).to.eql(200);
});

Then('La respuesta contiene los datos {int} {string} y {int}', function (int, string, int2) {
  let userDataResponse = urbanagerResponse.body;
  expect(userDataResponse.id).to.eql(int);
  expect(userDataResponse.name).to.eql(string);
  expect(userDataResponse.ci).to.eql(int2);
});
