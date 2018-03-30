package edu.uagrm.main;

public interface FizzBuzz {


    /**
     * @deprecated
     * This method is not flexible and String is mandatory and, use getNumberType instead
    */
    @Deprecated
    static String eval(int value) {
      switch (getNumberType(value)) {
        case FIZZ: return "Fizz";
        case BUZZ: return "Buzz";
        case FIZZBUZZ: return "FizzBuzz";
        default: return Integer.toString(value);
      }
    }

    static boolean isFizz(int value) {
        return value % 3 == 0
            && value % 5 != 0;
    }

    static boolean isBuzz(int value) {
        return value % 5 == 0
            && value % 3 != 0;
    }

    static boolean isFizzBuzz(int value) {
        return (value % (3*5)) == 0 && value != 0;
    }

    static FizzBuzzType getNumberType(int value) {
      if (isFizz(value)) return FizzBuzzType.FIZZ;
      if (isBuzz(value)) return FizzBuzzType.BUZZ;
      if (isFizzBuzz(value)) return FizzBuzzType.FIZZBUZZ;
      return FizzBuzzType.NUMBER;
    }
}
