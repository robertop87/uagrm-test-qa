package edu.uagrm.main;

import static edu.uagrm.main.FizzBuzzType.BUZZ;
import static edu.uagrm.main.FizzBuzzType.FIZZ;
import static edu.uagrm.main.FizzBuzzType.FIZZBUZZ;

public interface FizzBuzzStringUi {

  static String evalFizzBuzz(int value) {
    switch (FizzBuzz.getNumberType(value)) {
      case FIZZ: return "Fizz";
      case BUZZ: return "Buzz";
      case FIZZBUZZ: return "FizzBuzz";
      default: return Integer.toString(value);
    }
  }
}
