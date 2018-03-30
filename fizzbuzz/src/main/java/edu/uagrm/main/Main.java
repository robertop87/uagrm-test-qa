package edu.uagrm.main;

public class Main {

  public static void main(String[] args) {
    FizzBuzz fizzBuzz = new FizzBuzz();
    for (int i = 1; i <= 100; i++) {
      System.out.println(fizzBuzz.eval(i));
    }
  }
}
