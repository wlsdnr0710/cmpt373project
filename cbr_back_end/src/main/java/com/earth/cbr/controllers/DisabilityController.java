package com.earth.cbr.controllers;

import com.alibaba.fastjson.JSONObject;
import com.earth.cbr.models.Disability;
import com.earth.cbr.services.DisabilityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping(value = "/api/v1/disability")
public class DisabilityController {
    @Autowired
    private DisabilityService disabilityService;

    @GetMapping
    public ResponseEntity<JSONObject> getAllDisabilities() {
        List<Disability> disabilities = disabilityService.getAllDisabilities();
        JSONObject responseJson = new JSONObject();
        responseJson.put("data", disabilities);
        return ResponseEntity.ok().body(responseJson);
    }
}
