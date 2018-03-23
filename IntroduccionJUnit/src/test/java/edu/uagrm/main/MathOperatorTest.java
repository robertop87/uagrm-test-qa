package edu.uagrm.main;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;

import static org.junit.Assert.*;

public class MathOperatorTest {

    private MathOperator mathOperator;

    @Before
    public void setUp() {
        this.mathOperator = new MathOperator();
    }

    // Ejemplo extremo
    @After
    public void tearDown() {
        this.mathOperator = null;
    }

    @Test
    public void testMethodSumTwoIntegerNumbers() {
        //context
        int value1 = 10;
        int value2 = 5;
        int expectedValue = 15;
        int result = this.mathOperator.sum(value1, value2);
        assertEquals(expectedValue, result);
    }

    // El problema de desbordamiento sigue vigente
    @Test
    public void testMethodSumMaxIntegerValue(){
        int expected = Integer.MAX_VALUE + 1;
        int result = this.mathOperator.sum(Integer.MAX_VALUE, 1);
        assertEquals(expected,result);
    }

    @Test
    public void testMethodDivisionTwoIntegers(){
        int expected = 9;
        int valueInitial = 18;
        int valueFinal = 2;

        int result = this.mathOperator.divide(valueInitial, valueFinal);

        assertEquals(expected, result);
    }

    @Test(expected = ArithmeticException.class)
    public void testMethodDivisionWithZero() {
        this.mathOperator.divide(5, 0);
    }
}