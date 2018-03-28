package edu.uagrm.main;

public class Main {

    public boolean init() {
        return true;
    }

    public String getFizzBuzz(int Val){
        if(Val==0){
            return  String.valueOf(Val);
        }
        String result = "";
        if (Val % 3 == 0){
            result += "Fizz";
        }
        if (Val % 5 == 0){
            result += "Buzz";
        }
        if (result == ""){
            result = String.valueOf(Val);
        }

        return  result;


    }
}
