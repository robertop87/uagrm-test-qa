package edu.uagrm.main;

import edu.uagrm.ui.FizzBuzzStringUi;

public class ClientUi {

  public static void main(String[] args) {
    for (int value = 1; value <= 100; value++) {
      System.out.println(FizzBuzzStringUi.showFizzBuzzFor(value));
    }
  }
}
