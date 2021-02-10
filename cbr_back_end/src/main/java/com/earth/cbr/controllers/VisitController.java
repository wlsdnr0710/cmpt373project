package com.earth.cbr.controllers;

import com.alibaba.fastjson.JSONObject;
import com.earth.cbr.models.Visit;
import com.earth.cbr.models.Worker;
import com.earth.cbr.services.VisitService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping(value = "/api/v1/visit")
public class VisitController {
    @Autowired
    private VisitService visitService;

    @GetMapping
    public ResponseEntity<JSONObject> getAllVisits() {
        List<Visit> visits = visitService.getAllVisits();
        JSONObject responseJson = new JSONObject();
        responseJson.put("data", visits);
        return ResponseEntity.ok().body(responseJson);
    }

    @GetMapping(value = "/{id}")
    public ResponseEntity<JSONObject> getVisitById(@PathVariable Long id) {
        Visit visit = visitService.getVisitById(id);
        JSONObject responseJson = new JSONObject();
        responseJson.put("data", visit);
        return ResponseEntity.ok().body(responseJson);
    }

    @PostMapping
    public ResponseEntity<JSONObject> addVisit(@RequestBody JSONObject payload) {
        Visit addedVisit = visitService.addVisit(payload);

        JSONObject responseJson = new JSONObject();
        // Need to tell front-end the new client's id
        // so front-end can update the UI
        responseJson.put("id", addedVisit.getId());

        return ResponseEntity.ok().body(responseJson);
    }

    @PutMapping(value = "/{id}")
    public ResponseEntity<JSONObject> updateVisitById(@PathVariable Long id, @RequestBody JSONObject payload) {
        Visit updatedVisit = visitService.updateVisitById(id, payload);

        JSONObject responseJson = new JSONObject();
        // Need to tell front-end the new client's id
        // so front-end can update the UI
        responseJson.put("id", updatedVisit.getId());

        return ResponseEntity.ok().body(responseJson);
    }
}