package com.earth.cbr.utilities;

public class Utility {
    public static String formatPhoneNumber(String oldNumber) {
        if(oldNumber == null || oldNumber.length() == 0) {
            return null;
        }
        String newNumber = "";
        for(Integer i = 0; i < oldNumber.length(); i++) {
            if(Character.isDigit(oldNumber.charAt(i))) {
                newNumber += oldNumber.charAt(i);
            }
        }
        return newNumber;
    }
}
