Feature: Verificar disponibilidad del Servidor
 Se debe verificar si el servidor esta disponible o no
 Como cliente del WEB API
 Quiero conocer la disponibilidad del servidor

 Scenario: Servidor activo
   When hago una solicitud GET al recurso /ping
   Then debo recibir una respuesta 200
