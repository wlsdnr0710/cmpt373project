package com.earth.cbr.controllers;

import com.alibaba.fastjson.JSONObject;
import com.earth.cbr.exceptions.MissingRequiredDataObjectException;
import com.earth.cbr.models.authentication.Credential;
import com.earth.cbr.models.authentication.PassToken;
import com.earth.cbr.services.AuthenticationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
@RequestMapping(value = "/api/v1/authentication")
public class AuthenticationController {

    @Autowired
    private AuthenticationService authenticationService;

    private String credentialInvalidMessage = "Username/password are invalid.";

    @PassToken
    @PostMapping(value = "/worker")
    public ResponseEntity<JSONObject> authenticateWorker(@RequestBody Credential credential)
            throws MissingRequiredDataObjectException {
        JSONObject responseJson = new JSONObject();

        if (!authenticationService.isCredentialValid(credential)) {
            responseJson.put("message", credentialInvalidMessage);
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(responseJson);
        }

        String authToken = authenticationService.getAuthenticationToken(credential);
        responseJson.put("data", authToken);
        return ResponseEntity.ok().body(responseJson);
    }
}
