package edu.uagrm.main;

import edu.uagrm.core.FizzBuzz;

public class Main {

  public static void main(String[] args) {
    for (int i = 1; i <= 100; i++) {
      System.out.println(FizzBuzz.eval(i));
    }
  }
}
