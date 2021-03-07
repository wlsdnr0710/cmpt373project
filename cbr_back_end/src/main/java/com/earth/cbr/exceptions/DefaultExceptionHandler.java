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
import java.sql.SQLIntegrityConstraintViolationException;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;


@ControllerAdvice
public class DefaultExceptionHandler extends ResponseEntityExceptionHandler {

    @ExceptionHandler(ConstraintViolationException.class)
    public ResponseEntity<Object> handleConstraintViolationException(
            ConstraintViolationException ex,
            WebRequest request) {

        JSONObject responseJson = new JSONObject();

        Set<ConstraintViolation<?>> constraintViolations = ex.getConstraintViolations();
        List<String> constraintMessages = new ArrayList<>();
        for (ConstraintViolation<?> constraintViolation : constraintViolations) {
            constraintMessages.add(constraintViolation.getMessage());
        }

        responseJson.put("exception type", ex.getClass().getSimpleName());
        responseJson.put("messages", constraintMessages);

        return new ResponseEntity(responseJson, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(SQLIntegrityConstraintViolationException.class)
    public ResponseEntity<Object> handleSQLIntegrityConstraintViolationException(
            SQLIntegrityConstraintViolationException ex,
            WebRequest request) {
        return standardExceptionHandling(ex);
    }

    @ExceptionHandler(MissingRequiredDataObjectException.class)
    public ResponseEntity<Object> handleMissingRequiredDataObjectException(
            MissingRequiredDataObjectException ex,
            WebRequest request) {
        return standardExceptionHandling(ex);
    }

    @ExceptionHandler(ObjectDoesNotExist.class)
    public ResponseEntity<Object> handleIdDoesNotExistException(
            ObjectDoesNotExist ex,
            WebRequest request) {
        return standardExceptionHandling(ex);
    }

    @ExceptionHandler(NumberFormatException.class)
    public ResponseEntity<Object> handleNumberFormatException(
            NumberFormatException ex,
            WebRequest request) {
        return standardExceptionHandling(ex);
    }

    private ResponseEntity<Object> standardExceptionHandling(Exception ex) {
        JSONObject responseJson = new JSONObject();
        // Put into a list for consistent output
        List<String> constraintMessages = new ArrayList<>();
        constraintMessages.add(ex.getMessage());
        responseJson.put("exception type", ex.getClass().getSimpleName());
        responseJson.put("message", constraintMessages);

        return ResponseEntity.badRequest().body(responseJson);
    }
}
