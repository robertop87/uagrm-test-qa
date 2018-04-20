const { Given, When, Then } = require('cucumber')
const { expect } = require('chai')
const {Builder, By, Key, until} = require('selenium-webdriver');

let userData = {};
let chromeDriver;
let showText;
Given('Dados datos de usuario nombre: {string} y ci: {int}', function (string, int) {
  userData.name = string;
  userData.ci = int;
});

When('Navego a la pagina principal', async function () {
  chromeDriver = await new Builder().forBrowser('chrome').build();
  await chromeDriver.get('http://localhost:8080/ui');
});

When('Llenar el campo de nombre', async function () {
  await chromeDriver.findElement(By.name('nameInput')).sendKeys(userData.name);
});

When('Llenar el campo de ci', async function () {
  await chromeDriver.findElement(By.name('ciInput')).sendKeys(userData.ci);
});

When('Hacer click en el boton Show', async function () {
  await chromeDriver.findElement(By.name('showButton')).click();
});

Then('Se debe mostrar la cadena {string}', async function (string) {
  await chromeDriver.findElement(By.name('showArea'))
    .getText().then(function (text) {
      showText = text;
    });

  expect(showText).to.eql(string);
  await chromeDriver.quit();
});