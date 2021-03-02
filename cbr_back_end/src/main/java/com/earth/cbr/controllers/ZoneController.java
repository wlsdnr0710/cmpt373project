package com.earth.cbr.controllers;

import com.alibaba.fastjson.JSONObject;
import com.earth.cbr.models.Zone;
import com.earth.cbr.services.ZoneService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping(value = "/api/v1/zone")
public class ZoneController {
    @Autowired
    private ZoneService zoneService;

    @GetMapping
    public ResponseEntity<JSONObject> getAllZones() {
        List<Zone> zones = zoneService.getAllZones();
        JSONObject responseJson = new JSONObject();
        responseJson.put("data", zones);
        return ResponseEntity.ok().body(responseJson);
    }
}
