package edu.uagrm.core;

import static org.junit.Assert.assertEquals;

import edu.uagrm.core.FizzBuzz;
import org.junit.Test;

public class FizzBuzzTest {

    @Test
    public void testGetFizzBuzzIfNumberIsDivisibleByThreeReturnFizz(){
        String expectedValue = "Fizz";
        String result = FizzBuzz.eval(3);
        assertEquals(expectedValue, result);
    }

    @Test
    public void testGetFizzBuzzIfNumberIsDivisibleByFiveReturnBuzz(){
        String expectedValue = "Buzz";
        String result = FizzBuzz.eval(5);
        assertEquals(expectedValue, result);
    }

    @Test
    public void testGetFizzBuzzIfNumberIsDivisibleByFiveAndThreeReturnFizzBuzz(){
        String expectedValue = "FizzBuzz";
        String result = FizzBuzz.eval(15);
        assertEquals(expectedValue, result);
    }

    @Test
    public void testGetFizzBuzzIfNumberIsNoTDivisibleByFiveAndThreeReturnSameNumber(){
        String expectedValue = "1";
        String result = FizzBuzz.eval(1);
        assertEquals(expectedValue, result);
    }

    @Test
    public void testGetFizzBuzzIfNumberIsZeroReturnZero(){
        String expectedValue = "0";
        String result = FizzBuzz.eval(0);
        assertEquals(expectedValue, result);
    }
}
