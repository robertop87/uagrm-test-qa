package edu.uagrm.main;

public class HelloWorld {

    private final String helloTemplate = "Hello %s";
    private final String world = "World";

    /**
     * Hello World.
     *
     * @return a String with Hello World
     */
    public String sayHello() {
        return String.format(this.helloTemplate, this.world);
    }

    /**
     * Retorna un saludo con "Hola" adjuntado el nombre del usuario.
     *
     * @param name User's name
     * @return  String with Hello + name
     */
    public String sayHello(String name) {
        // Supplier: Entrada invalida -> Salida Valida
        if (name == null) return this.sayHello();
        return String.format(this.helloTemplate, name);
    }

    public String sayHelloException(String name) throws Exception {
        if (name == null) throw new Exception("The name should not be null");
        return this.sayHello(name);
    }
}

