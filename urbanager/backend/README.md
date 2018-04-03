# Urbanager (Urbanization Manager)

How to start the Urbanager application
---

1. Run `mvn clean install` to build your application
2. Start application with `java -jar urbanager-application/target/urbanager-application-0.0.1.jar server config.yml`
3. To check that your application is running enter url `http://localhost:8080`

Run Tests
---

Run `mvn test`

Health Check
---

To see your applications health enter url `http://localhost:8081/healthcheck`

API Docs with swagger
---

To see your API docs enter url `http://localhost:8080/swagger/index.html`
