package com.earth.cbr.controllers;

import com.alibaba.fastjson.JSONObject;
import com.earth.cbr.exceptions.MissingRequiredDataObjectException;
import com.earth.cbr.models.authentication.Credential;
import com.earth.cbr.models.authentication.PassToken;
import com.earth.cbr.models.authentication.PhoneAuthentication;
import com.earth.cbr.services.AuthenticationService;
import com.google.firebase.auth.FirebaseAuthException;
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

        String authenticationToken = authenticationService.getAuthenticationTokenByCredential(credential);
        responseJson.put("data", authenticationToken);
        //change the token to the token taken from the front end

        return ResponseEntity.ok().body(responseJson);
    }

    @PassToken
    @PostMapping(value = "/worker-phone")
    public ResponseEntity<JSONObject> authenticateWorkerByPhone(@RequestBody PhoneAuthentication phoneAuthentication)
            throws MissingRequiredDataObjectException, FirebaseAuthException {
        JSONObject responseJson = new JSONObject();

        if (!authenticationService.isPhoneAuthenticationValid(phoneAuthentication)) {
            responseJson.put("message", credentialInvalidMessage);
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(responseJson);
        }

        String authenticationToken = authenticationService.getAuthenticationTokenByPhoneVerify(phoneAuthentication);
        responseJson.put("data", authenticationToken);


        return ResponseEntity.ok().body(responseJson);
    }
}
