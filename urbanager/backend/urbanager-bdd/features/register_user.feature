Feature: Registrar un usuario
 Como cliente Web API
 Yo requiero crear un Usuario 
 El Usuario tiene las sgte. informacion {nombre, ci}

 Scenario: Registrar un usuario nuevo
  # Given Servidor en linea
  Given Datos del usuario "Luis Roberto" con CI 1234567
   When Envio estos datos con POST a Urbanager
   Then El servidor responde con el estado 201

  
 