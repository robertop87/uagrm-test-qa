const { Given, When, Then } = require('cucumber')
const { expect } = require('chai')
const rp = require('request-promise')

let userData = {};
let urbanagerResponse;
Given('Datos del usuario {string} con CI {int}', function (string, int) {
  userData.name = string;
  userData.ci = int;
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
