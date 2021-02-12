// I used the following links:
// "https://zetcode.com/springboot/controlleradvice/"
// "https://www.springboottutorial.com/spring-boot-validation-for-rest-services"
// for information on how to set up exception handling and field validation with Spring Boot.

package com.earth.cbr.exceptions;

import com.alibaba.fastjson.JSONObject;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import javax.validation.ConstraintViolation;
import javax.validation.ConstraintViolationException;
import java.util.Set;


@ControllerAdvice
public class DefaultExceptionHandler extends ResponseEntityExceptionHandler {

    @ExceptionHandler(ConstraintViolationException.class)
    public ResponseEntity<Object> handleConstraintViolationException(
            ConstraintViolationException ex, WebRequest request) {

        JSONObject responseJson = new JSONObject();

        Set<ConstraintViolation<?>> constraintViolations = ex.getConstraintViolations();
        StringBuilder constraintMessages = new StringBuilder();
        for (ConstraintViolation<?> constraintViolation : constraintViolations) {
            constraintMessages.append(constraintViolation.getMessage());
        }
        responseJson.put("message", constraintMessages);

        return new ResponseEntity(responseJson, HttpStatus.BAD_REQUEST);
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
