package edu.uagrm.main;

public class Main {

    public static void main(String[] args) {
        Main main = new Main();
        for (int i = 1; i <= 100; i++) {
            System.out.println(main.eval(i));
        }
    }

    public boolean init() {
        return true;
    }

    public String eval(int value){
        if(value==0){
            return  String.valueOf(value);
        }
        String result = "";
        if (value % 3 == 0){
            result += "Fizz";
        }
        if (value % 5 == 0){
            result += "Buzz";
        }
        if (result == ""){
            result = String.valueOf(value);
        }

        return  result;
    }
}
