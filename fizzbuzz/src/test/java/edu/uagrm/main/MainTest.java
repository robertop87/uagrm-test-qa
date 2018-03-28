package edu.uagrm.main;

import org.junit.Assert;
import org.junit.Test;

import static org.junit.Assert.*;

public class MainTest {

    @Test
    public void testInitShouldReturnsTrue() {
        Main main = new Main();
        assertTrue(main.init());
    }

    @Test
    public void testGetFizzBuzzIfNumberIsDivisibleByThreeReturnFizz(){
        Main main = new Main();
        String expectedValue = "Fizz";
        String result = main.getFizzBuzz(3);
        assertEquals(expectedValue, result);
    }

    @Test
    public void testGetFizzBuzzIfNumberIsDivisibleByFiveReturnBuzz(){
        Main main = new Main();
        String expectedValue = "Buzz";
        String result = main.getFizzBuzz(5);
        assertEquals(expectedValue, result);
    }

    @Test
    public void testGetFizzBuzzIfNumberIsDivisibleByFiveAndThreeReturnFizzBuzz(){
        Main main = new Main();
        String expectedValue = "FizzBuzz";
        String result = main.getFizzBuzz(15);
        assertEquals(expectedValue, result);
    }

    @Test
    public void testGetFizzBuzzIfNumberIsNoTDivisibleByFiveAndThreeReturnSameNumber(){
        Main main = new Main();
        String expectedValue = "1";
        String result = main.getFizzBuzz(1);
        assertEquals(expectedValue, result);
    }

    @Test
    public void testGetFizzBuzzIfNumberIsZeroReturnZero(){
        Main main = new Main();
        String expectedValue = "0";
        String result = main.getFizzBuzz(0);
        assertEquals(expectedValue, result);
    }



}