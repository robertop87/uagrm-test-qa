const { Given, When, Then } = require('cucumber')
const { expect } = require('chai')
const request = require('request')
const rp = require('request-promise')

let urbanagerResponse;

When('hago una solicitud GET al recurso /ping', async function () {
  await rp
    .get("http://localhost:8080/api/ping")
    .on('response', function (response) {
      urbanagerResponse = response;
    })
    .on('error', function (error) {
      urbanagerResponse = error;
    });
});

Then('debo recibir una respuesta con codigo {int}', function (int) {
  expect(urbanagerResponse.statusCode).to.eql(int);
});

Then('un mensaje con el texto pong', function () {
  let responseObj = JSON.parse(urbanagerResponse.body);
  expect(responseObj.message).to.eql("pong");
});

Then('el mensaje con el timestamp del servicio de urbanager', function () {
  let responseObj = JSON.parse(urbanagerResponse.body);
  expect(responseObj.timestamp).to.be.an('number');
});
