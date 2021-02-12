// I used the following link "https://zetcode.com/springboot/controlleradvice/" for information on how to set up
// exception handling with Spring Boot.

package com.earth.cbr.exceptions;

import com.alibaba.fastjson.JSONObject;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import javax.validation.ConstraintViolationException;


@ControllerAdvice
public class DefaultExceptionHandler extends ResponseEntityExceptionHandler {

    @ExceptionHandler(ConstraintViolationException.class)
    public ResponseEntity<Object> handleConstraintViolationException(
            ConstraintViolationException ex, WebRequest request) {

        JSONObject errorDetails = new JSONObject();
        return new ResponseEntity(errorDetails, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(MissingRequiredKeyException.class)
    public ResponseEntity<Object> handleMissingRequiredKeyException(
            MissingRequiredKeyException ex, WebRequest request) {

        JSONObject responseJson = new JSONObject();
        responseJson.put("message", ex.getMessage());

        return ResponseEntity.badRequest().body(responseJson);
    }

    @ExceptionHandler(InvalidDataException.class)
    public ResponseEntity<Object> handleInvalidDataException(
            InvalidDataException ex, WebRequest request) {

        JSONObject responseJson = new JSONObject();
        responseJson.put("message", ex.getMessage());

        return ResponseEntity.badRequest().body(responseJson);
    }
}
