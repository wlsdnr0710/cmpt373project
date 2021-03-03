package com.earth.cbr.controllers;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.earth.cbr.exceptions.IdDoesNotExistException;
import com.earth.cbr.exceptions.MissingRequiredDataObjectException;
import com.earth.cbr.models.Visit;
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
    public ResponseEntity<JSONObject> getVisitById(@PathVariable Long id) throws IdDoesNotExistException {
        if(visitService.getVisitById(id) == null) {
            throw new IdDoesNotExistException("Visit ID does not exist");
        }

        Visit visit = visitService.getVisitById(id);
        JSONObject responseJson = new JSONObject();
        responseJson.put("data", visit);
        return ResponseEntity.ok().body(responseJson);
    }

    @GetMapping(value = "/clientId/{clientId}")
    public ResponseEntity<JSONObject> getAllVisitsByClientId(@PathVariable Long clientId) throws IdDoesNotExistException {
        if(visitService.getAllVisitsByClientId(clientId) == null) {
            throw new IdDoesNotExistException("Client not associated with any visits");
        }

        List<Visit> visits = visitService.getAllVisitsByClientId(clientId);
        JSONObject responseJson = new JSONObject();
        responseJson.put("data", visits);
        return ResponseEntity.ok().body(responseJson);
    }

    @GetMapping(value = "/workerName/{cbrWorkerName}")
    public ResponseEntity<JSONObject> getAllVisitsByCbrWorkerName(@PathVariable String cbrWorkerName)
            throws IdDoesNotExistException{
        if(visitService.getAllVisitsByCbrWorkerName(cbrWorkerName) == null) {
            throw new IdDoesNotExistException("CBR worker not associated with any visits");
        }

        List<Visit> visits = visitService.getAllVisitsByCbrWorkerName(cbrWorkerName);
        JSONObject responseJson = new JSONObject();
        responseJson.put("data", visits);
        return ResponseEntity.ok().body(responseJson);
    }

    @PostMapping
    public ResponseEntity<JSONObject> addVisit(@RequestBody JSONObject payload)
            throws MissingRequiredDataObjectException {
        JSONObject visitJSON = payload.getJSONObject("data");

        if (visitJSON == null) {
            throw new MissingRequiredDataObjectException("Missing data object containing Visit data");
        }
        String visitString = visitJSON.toJSONString();

        JSONObject responseJson = new JSONObject();
        Visit visit = JSON.parseObject(visitString, Visit.class);

        Visit addedVisit = visitService.addVisit(visit);

        // get visit's id to update UI
        responseJson.put("id", addedVisit.getId());
        return ResponseEntity.ok().body(responseJson);
    }

    @PutMapping
    public ResponseEntity<JSONObject> updateVisitById(@RequestBody JSONObject payload)
            throws MissingRequiredDataObjectException, IdDoesNotExistException {
        JSONObject visitJSON = payload.getJSONObject("data");

        if (visitJSON == null) {
            throw new MissingRequiredDataObjectException("Missing data object containing Visit data");
        }

        if(visitService.getVisitById(visitJSON.getLong("id")) == null) {
            throw new IdDoesNotExistException("Visit ID does not exist");
        }

        String visitString = visitJSON.toJSONString();

        JSONObject responseJson = new JSONObject();
        Visit visit = JSON.parseObject(visitString, Visit.class);

        Visit updatedVisit = visitService.updateVisitById(visit);

        // get visit's id to update UI
        responseJson.put("id", updatedVisit.getId());
        return ResponseEntity.ok().body(responseJson);
    }

    @DeleteMapping(value = "/{id}")
    public ResponseEntity<JSONObject> deleteVisitById(@PathVariable Long id) throws IdDoesNotExistException {
        if(visitService.getVisitById(id) == null) {
            throw new IdDoesNotExistException("Visit ID does not exist");
        }

        visitService.deleteVisitById(id);
        return ResponseEntity.ok().body(null);
    }
}