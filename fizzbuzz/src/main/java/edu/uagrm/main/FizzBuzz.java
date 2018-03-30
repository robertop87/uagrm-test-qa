package edu.uagrm.main;

public class FizzBuzz {

    public boolean init() {
        return true;
    }

    public String eval(int value){
        if (value == 0) {
            return String.valueOf(value);
        }

        String result = "";

        if (value % 3 == 0) {
            result += "Fizz";
        }

        if (value % 5 == 0) {
            result += "Buzz";
        }

        if (result == "") {
            result = String.valueOf(value);
        }

        return  result;
    }
}
