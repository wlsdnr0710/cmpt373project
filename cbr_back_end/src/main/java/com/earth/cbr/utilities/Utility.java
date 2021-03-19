package com.earth.cbr.utilities;

public class Utility {
    public static String formatPhoneNumber(String oldNumber) {
        String newNumber = "";
        for(Integer i = 0; i < oldNumber.length(); i++) {
            if(Character.isDigit(oldNumber.charAt(i))) {
                newNumber += oldNumber.charAt(i);
            }
        }
        return newNumber;
    }
}
