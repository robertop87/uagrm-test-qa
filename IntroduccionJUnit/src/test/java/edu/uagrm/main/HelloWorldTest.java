package edu.uagrm.main;

import org.junit.Test;

import static org.junit.Assert.*;

public class HelloWorldTest {

    @Test
    // El nombre del método de prueba debe ser descriptivo
    public void testMethodSayHelloReturnsHelloWorld() {
        // Definir el contexto
        // Preparar el escenario
        HelloWorld helloWorld = new HelloWorld();
        // El/los resultado(s) esperado(s)
        String expected = "Hello World";
        // El resultado "real"
        String result = helloWorld.sayHello();
        // Prueba, la revisión
        assertEquals(expected, result);
    }

    @Test
    public void testSayHelloWithAname() {
        HelloWorld helloWorld = new HelloWorld();
        String name = "Janeth";
        String expected = "Hello " + name;
        String result = helloWorld.sayHello(name);
        assertEquals(expected, result);
    }

    @Test
    public void testSayHelloWithNullShouldReturnsHelloWorld() {
        HelloWorld helloWorld = new HelloWorld();
        String expected = "Hello World";
        String result = helloWorld.sayHello(null);
        assertEquals(expected, result);
    }

    @Test(expected = Exception.class)
    public void testSayHelloWithNullShouldReturnsException() throws Exception {
        HelloWorld helloWorld = new HelloWorld();
        String result = helloWorld.sayHelloException(null);
    }
}