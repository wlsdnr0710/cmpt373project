package com.earth.cbr.controllers;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.earth.cbr.models.Disability;
import com.earth.cbr.services.DisabilityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.earth.cbr.exceptions.ObjectDoesNotExistException;
import com.earth.cbr.exceptions.MissingRequiredDataObjectException;


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

    @GetMapping(value = "/{id}")
    public ResponseEntity<JSONObject> getDisabilityById(@PathVariable Long id) throws ObjectDoesNotExistException {
        if(disabilityService.getDisabilityById(id) == null) {
            throw new ObjectDoesNotExistException("Disability with that ID does not exist");
        }

        Disability disability = disabilityService.getDisabilityById(id);
        JSONObject responseJson = new JSONObject();
        responseJson.put("data", disability);
        return ResponseEntity.ok().body(responseJson);
    }

    @PostMapping
    public ResponseEntity<JSONObject> addDisability(@RequestBody JSONObject payload)
            throws MissingRequiredDataObjectException {
        JSONObject disabilityJSON = payload.getJSONObject("data");

        if (disabilityJSON == null) {
            throw new MissingRequiredDataObjectException("Missing data object containing Disability data");
        }
        String disabilityString = disabilityJSON.toJSONString();

        JSONObject responseJson = new JSONObject();
        Disability disability = JSON.parseObject(disabilityString, Disability.class);

        Disability addedDisability = disabilityService.addDisability(disability);

        // Need to tell front-end the new disability's id
        // so front-end can update the UI
        responseJson.put("id", addedDisability.getId());
        return ResponseEntity.ok().body(responseJson);
    }

    @PutMapping
    public ResponseEntity<JSONObject> updateDisabilityById(@RequestBody JSONObject payload)
            throws MissingRequiredDataObjectException, ObjectDoesNotExistException {
        JSONObject disabilityJSON = payload.getJSONObject("data");

        if (disabilityJSON == null) {
            throw new MissingRequiredDataObjectException("Missing data object containing Disability data");
        }

        if(disabilityService.getDisabilityById(disabilityJSON.getLong("id")) == null) {
            throw new ObjectDoesNotExistException("Disability with that ID does not exist");
        }

        String disabilityString = disabilityJSON.toJSONString();

        JSONObject responseJson = new JSONObject();
        Disability disability = JSON.parseObject(disabilityString, Disability.class);

        Disability updatedDisability = disabilityService.updateDisabilityById(disability);

        // Need to tell front-end the new disability's id
        // so front-end can update the UI
        responseJson.put("id", updatedDisability.getId());
        return ResponseEntity.ok().body(responseJson);
    }

    @DeleteMapping(value = "/{id}")
    public ResponseEntity<JSONObject> deleteDisabilityById(@PathVariable Long id) throws ObjectDoesNotExistException {
        if(disabilityService.getDisabilityById(id) == null) {
            throw new ObjectDoesNotExistException("Disability with that ID does not exist");
        }

        disabilityService.deleteDisabilityById(id);
        return ResponseEntity.ok().body(null);
    }
}
