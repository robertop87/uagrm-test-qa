Feature: Sumar dos numeros
  Como PO
  Yo quiero sumar dos numeros

  Scenario: Sumar 2 numeros enteros positivos
    #Given Un operador matematico
    When Recibo 4 y 6
    Then debo obtener 10
