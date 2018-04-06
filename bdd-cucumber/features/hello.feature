Feature: Decir Hola
  Como PO
  Quiero que el sistema diga hola

  Scenario: Cualquiera
    #Given Un operador matematico
    When Recibo "Roberto"
    Then debo decir "Hola Roberto"

