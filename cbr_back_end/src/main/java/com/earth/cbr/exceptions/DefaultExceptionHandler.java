// I used the following link "https://zetcode.com/springboot/controlleradvice/" for information on how to set up
// exception handling with Spring Boot.

package com.earth.cbr.exceptions;

import com.alibaba.fastjson.JSONObject;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;


@ControllerAdvice
public class DefaultExceptionHandler extends ResponseEntityExceptionHandler {

    @ExceptionHandler(MissingRequiredKeyException.class)
    public ResponseEntity<Object> handleMissingRequiredKeyException(
            MissingRequiredKeyException e, WebRequest request) {

        JSONObject responseJson = new JSONObject();
        responseJson.put("message", e.getMessage());

        return ResponseEntity.badRequest().body(responseJson);
    }
}
