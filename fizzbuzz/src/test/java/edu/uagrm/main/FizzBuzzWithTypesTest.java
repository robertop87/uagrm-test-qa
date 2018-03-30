package edu.uagrm.main;

import static org.junit.Assert.assertEquals;

import org.junit.Test;

public class FizzBuzzWithTypesTest {

    @Test
    public void testGetFizzBuzzIfNumberIsDivisibleByThreeReturnFizz(){
        assertEquals(FizzBuzzType.FIZZ, FizzBuzz.getNumberType(3));
    }

    @Test
    public void testGetFizzBuzzIfNumberIsDivisibleByFiveReturnBuzz(){
        assertEquals(FizzBuzzType.BUZZ, FizzBuzz.getNumberType(5));
    }

    @Test
    public void testGetFizzBuzzIfNumberIsDivisibleByFiveAndThreeReturnFizzBuzz(){
        assertEquals(FizzBuzzType.FIZZBUZZ, FizzBuzz.getNumberType(15));
    }

    @Test
    public void testGetFizzBuzzIfNumberIsNoTDivisibleByFiveAndThreeReturnSameNumber(){
        assertEquals(FizzBuzzType.NUMBER, FizzBuzz.getNumberType(1));
    }

    @Test
    public void testGetFizzBuzzIfNumberIsZeroReturnZero(){
        assertEquals(FizzBuzzType.NUMBER, FizzBuzz.getNumberType(0));
    }
}
