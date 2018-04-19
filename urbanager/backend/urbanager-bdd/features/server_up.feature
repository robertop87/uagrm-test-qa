Feature: Verificar disponibilidad del Servidor
 Se debe verificar si el servidor esta disponible o no
 Como cliente del WEB API
 Quiero conocer la disponibilidad del servidor

 Scenario: Servidor activo
   When hago una solicitud GET al recurso /ping
   Then debo recibir una respuesta con codigo 200
      And un mensaje con el texto pong
      And el mensaje con el timestamp del servicio de urbanager
