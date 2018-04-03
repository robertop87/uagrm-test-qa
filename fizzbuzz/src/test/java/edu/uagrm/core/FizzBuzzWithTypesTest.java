package edu.uagrm.core;

import static org.junit.Assert.assertEquals;

import edu.uagrm.core.FizzBuzz;
import edu.uagrm.core.FizzBuzzType;
import org.junit.Test;

public class FizzBuzzWithTypesTest {

    @Test
    public void testWhenNumberIsDivisibleBy3ThenReturnsFizz(){
        assertEquals(FizzBuzzType.FIZZ, FizzBuzz.getNumberType(3));
    }

    @Test
    public void testWhenNumberIsDivisibleBy5ThenReturnsBuzz(){
        assertEquals(FizzBuzzType.BUZZ, FizzBuzz.getNumberType(5));
    }

    @Test
    public void testWhenNumberIsDivisibleBy3and5ThenReturnsFizzBuzz(){
        assertEquals(FizzBuzzType.FIZZBUZZ, FizzBuzz.getNumberType(15));
    }

    @Test
    public void testWhenNumberIsNotDivisibleBy3nor5ThenReturnsNumber(){
        assertEquals(FizzBuzzType.NUMBER, FizzBuzz.getNumberType(1));
    }

    @Test
    public void testWhenNumberIs0ThenReturnsNumber(){
        assertEquals(FizzBuzzType.NUMBER, FizzBuzz.getNumberType(0));
    }
}
