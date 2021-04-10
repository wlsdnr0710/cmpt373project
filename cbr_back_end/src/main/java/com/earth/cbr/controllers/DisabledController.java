package com.earth.cbr.controllers;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.earth.cbr.exceptions.ObjectDoesNotExistException;
import com.earth.cbr.exceptions.MissingRequiredDataObjectException;
import com.earth.cbr.models.Disabled;
import com.earth.cbr.services.DisabledService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping(value = "/api/v1/disabled")
public class DisabledController {
    @Autowired
    private DisabledService disabledService;

    @GetMapping
    public ResponseEntity<JSONObject> getAllDisableds() {
        List<Disabled> zones = disabledService.getAllDisableds();
        JSONObject responseJson = new JSONObject();
        responseJson.put("data", zones);
        return ResponseEntity.ok().body(responseJson);
    }

    @GetMapping(value = "/{id}")
    public ResponseEntity<JSONObject> getDisabledById(@PathVariable Long id) throws ObjectDoesNotExistException {
        if(disabledService.getDisabledById(id) == null) {
            throw new ObjectDoesNotExistException("Client disability with that ID does not exist");
        }

        Disabled disabled = disabledService.getDisabledById(id);
        JSONObject responseJson = new JSONObject();
        responseJson.put("data", disabled);
        return ResponseEntity.ok().body(responseJson);
    }

    @PostMapping
    public ResponseEntity<JSONObject> addDisabled(@RequestBody JSONObject payload)
            throws MissingRequiredDataObjectException {
        JSONObject disabledJSON = payload.getJSONObject("data");

        if (disabledJSON == null) {
            throw new MissingRequiredDataObjectException("Missing data object containing client disability data");
        }
        String disabledString = disabledJSON.toJSONString();

        JSONObject responseJson = new JSONObject();
        Disabled disabled = JSON.parseObject(disabledString, Disabled.class);

        Disabled addedDisabled = disabledService.addDisabled(disabled);

        // Need to tell front-end the new zone's id
        // so front-end can update the UI
        responseJson.put("id", addedDisabled.getId());
        return ResponseEntity.ok().body(responseJson);
    }

    @PutMapping
    public ResponseEntity<JSONObject> updateDisabledById(@RequestBody JSONObject payload)
            throws MissingRequiredDataObjectException, ObjectDoesNotExistException {
        JSONObject disabledJSON = payload.getJSONObject("data");

        if (disabledJSON == null) {
            throw new MissingRequiredDataObjectException("Missing data object containing client disability data");
        }

        if(disabledService.getDisabledById(disabledJSON.getLong("id")) == null) {
            throw new ObjectDoesNotExistException("Client disability with that ID does not exist");
        }

        String disabledString = disabledJSON.toJSONString();

        JSONObject responseJson = new JSONObject();
        Disabled disabled = JSON.parseObject(disabledString, Disabled.class);

        Disabled updatedDisabled = disabledService.updateDisabledById(disabled);

        // Need to tell front-end the new zone's id
        // so front-end can update the UI
        responseJson.put("id", updatedDisabled.getId());
        return ResponseEntity.ok().body(responseJson);
    }

    @DeleteMapping(value = "/{id}")
    public ResponseEntity<JSONObject> deleteDisabledById(@PathVariable Long id) throws ObjectDoesNotExistException {
        if(disabledService.getDisabledById(id) == null) {
            throw new ObjectDoesNotExistException("Client disability with that ID does not exist");
        }

        disabledService.deleteDisabledById(id);
        return ResponseEntity.ok().body(null);
    }
}
