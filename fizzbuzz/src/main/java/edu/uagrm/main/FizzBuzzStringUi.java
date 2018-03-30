package edu.uagrm.main;

public interface FizzBuzzStringUi {

  static String showFizzBuzzFor(int value) {
    switch (FizzBuzz.getNumberType(value)) {
      case FIZZ: return "Fizz";
      case BUZZ: return "Buzz";
      case FIZZBUZZ: return "FizzBuzz";
      default: return Integer.toString(value);
    }
  }
}
