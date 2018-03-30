package edu.uagrm.main;

public interface FizzBuzz {
    static String eval(int value) {
        if (isFizz(value)) return "Fizz";
        if (isBuzz(value)) return "Buzz";
        if (isFizzBuzz(value)) return "FizzBuzz";
        return Integer.toString(value);
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
}
