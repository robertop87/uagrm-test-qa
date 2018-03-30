package edu.uagrm.main;

public interface FizzBuzz {
    static String eval(int value) {
        if (value == 0) return "0";
        if ((value % (3*5)) == 0) return "FizzBuzz";
        if (value % 3 == 0) return "Fizz";
        if (value % 5 == 0) return "Buzz";
        return Integer.toString(value);
    }
}
