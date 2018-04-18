const { Given, When, Then } = require('cucumber')
const { expect } = require('chai')
const request = require('request')
const rp = require('request-promise')

let urbanagerResponse;

When('hago una solicitud GET al recurso /ping', async function () {
  await rp
    .get("http://locahost:8080/ping")
    .on('response', function (response) {
      console.log("### Response:", response);
      urbanagerResponse = response;
    })
    .on('error', function (error) {
      console.log("### Error:", error);
      urbanagerResponse = error;
    });
});

Then('debo recibir una respuesta {int}', function (int) {
  expect(urbanagerResponse.statusCode).to.eql(int);
});
