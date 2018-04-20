Feature: Registrar un usuario
 Como cliente Web API
 Yo requiero crear un Usuario 
 El Usuario tiene las sgte. informacion {nombre, ci}

 Scenario: Registrar un usuario nuevo
  # Given Servidor en linea
  Given Datos del usuario con id 1 "Luis Roberto" con CI 1234567
   When Envio estos datos con POST a Urbanager
   Then El servidor responde con el estado 201
    And Contiene una localizacion valida
    And La respuesta contiene los datos 1 "Luis Roberto" y 1234567

    Scenario Outline: Registrar un usuario nuevo
     Given Datos del usuario con id <id> <name> con CI <ci>
     When Envio estos datos con POST a Urbanager
     Then El servidor responde con el estado 201
      And Contiene una localizacion valida
      And La respuesta contiene los datos <id> <name> y <ci>

     Examples: 
     |  id  | name    | ci      |
     |   3  | "Luis"    | 123456  | 
     |   4  | "Alexa"   | 434343  |
     |   5  | "Natalia" | 54343   |
     |   6  | "Soraya"  | 5434334 |
     |   7  | "Emanuel" | 33223   |


  
 