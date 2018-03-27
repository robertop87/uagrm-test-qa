package edu.uagrm.main;

import org.junit.Test;

import static org.junit.Assert.*;

public class MainTest {

    @Test
    public void testInitShouldReturnsTrue() {
        Main main = new Main();
        assertTrue(main.init());
    }
}