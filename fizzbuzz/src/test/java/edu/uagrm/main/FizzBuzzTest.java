package edu.uagrm.main;

import org.junit.Test;

import static org.junit.Assert.*;

public class FizzBuzzTest {

    @Test
    public void testInitShouldReturnsTrue() {
        FizzBuzz fizzBuzz = new FizzBuzz();
        assertTrue(fizzBuzz.init());
    }

    @Test
    public void testGetFizzBuzzIfNumberIsDivisibleByThreeReturnFizz(){
        FizzBuzz fizzBuzz = new FizzBuzz();
        String expectedValue = "Fizz";
        String result = fizzBuzz.eval(3);
        assertEquals(expectedValue, result);
    }

    @Test
    public void testGetFizzBuzzIfNumberIsDivisibleByFiveReturnBuzz(){
        FizzBuzz fizzBuzz = new FizzBuzz();
        String expectedValue = "Buzz";
        String result = fizzBuzz.eval(5);
        assertEquals(expectedValue, result);
    }

    @Test
    public void testGetFizzBuzzIfNumberIsDivisibleByFiveAndThreeReturnFizzBuzz(){
        FizzBuzz fizzBuzz = new FizzBuzz();
        String expectedValue = "FizzBuzz";
        String result = fizzBuzz.eval(15);
        assertEquals(expectedValue, result);
    }

    @Test
    public void testGetFizzBuzzIfNumberIsNoTDivisibleByFiveAndThreeReturnSameNumber(){
        FizzBuzz fizzBuzz = new FizzBuzz();
        String expectedValue = "1";
        String result = fizzBuzz.eval(1);
        assertEquals(expectedValue, result);
    }

    @Test
    public void testGetFizzBuzzIfNumberIsZeroReturnZero(){
        FizzBuzz fizzBuzz = new FizzBuzz();
        String expectedValue = "0";
        String result = fizzBuzz.eval(0);
        assertEquals(expectedValue, result);
    }



}