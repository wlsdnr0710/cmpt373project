package com.earth.cbr.controllers;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.earth.cbr.exceptions.MissingRequiredDataObjectException;
import com.earth.cbr.exceptions.ObjectDoesNotExistException;
import com.earth.cbr.models.RequiredServices;
import com.earth.cbr.services.RequiredServicesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping(value = "/api/v1/requiredServices")
public class RequiredServicesController {
    @Autowired
    private RequiredServicesService requiredServicesService;

    @GetMapping
    public ResponseEntity<JSONObject> getAllRequiredServices() {
        List<RequiredServices> requiredServices = requiredServicesService.getAllRequiredServices();
        JSONObject responseJson = new JSONObject();
        responseJson.put("data", requiredServices);
        return ResponseEntity.ok().body(responseJson);
    }

    @GetMapping(value = "/{id}")
    public ResponseEntity<JSONObject> getRequiredServicesById(@PathVariable Long id)
            throws ObjectDoesNotExistException {
        if (requiredServicesService.getRequiredServicesById(id) == null) {
            throw new ObjectDoesNotExistException("RequiredServices with that ID does not exist");
        }
        RequiredServices requiredServices = requiredServicesService.getRequiredServicesById(id);
        JSONObject responseJson = new JSONObject();
        responseJson.put("data", requiredServices);
        return ResponseEntity.ok().body(responseJson);
    }

    @PostMapping
    public ResponseEntity<JSONObject> addRequiredServices(@RequestBody JSONObject payload)
            throws MissingRequiredDataObjectException {
        JSONObject requiredServicesJSON = payload.getJSONObject("data");

        if (requiredServicesJSON == null) {
            throw new MissingRequiredDataObjectException("Missing data object containing RequiredServices data");
        }
        String requiredServicesString = requiredServicesJSON.toJSONString();

        JSONObject responseJson = new JSONObject();
        RequiredServices requiredServices = JSON.parseObject(requiredServicesString, RequiredServices.class);

        RequiredServices addedRequiredServices = requiredServicesService.addRequiredServices(requiredServices);

        // Need to tell front-end the new RequiredServices's id
        // so front-end can update the UI
        responseJson.put("id", addedRequiredServices.getId());
        return ResponseEntity.ok().body(responseJson);
    }

    @PutMapping
    public ResponseEntity<JSONObject> updateRequiredServicesById(@RequestBody JSONObject payload)
            throws MissingRequiredDataObjectException, ObjectDoesNotExistException {
        JSONObject requiredServicesJSON = payload.getJSONObject("data");

        if (requiredServicesJSON == null) {
            throw new MissingRequiredDataObjectException("Missing data object containing RequiredServices data");
        }

        if(requiredServicesService.getRequiredServicesById(requiredServicesJSON.getLong("id")) == null) {
            throw new ObjectDoesNotExistException("RequiredServices with that ID does not exist");
        }

        String requiredServicesString = requiredServicesJSON.toJSONString();

        JSONObject responseJson = new JSONObject();
        RequiredServices requiredServices = JSON.parseObject(requiredServicesString, RequiredServices.class);

        RequiredServices updatedRequiredServices = requiredServicesService.updateRequiredServicesById(requiredServices);

        // get RequiredServices's id to update UI
        responseJson.put("id", updatedRequiredServices.getId());
        return ResponseEntity.ok().body(responseJson);
    }

    @DeleteMapping(value = "/{id}")
    public ResponseEntity<JSONObject> deleteRequiredServicesById(@PathVariable Long id)
            throws ObjectDoesNotExistException {
        if(requiredServicesService.getRequiredServicesById(id) == null) {
            throw new ObjectDoesNotExistException("RequiredServices with that ID does not exist");
        }

        requiredServicesService.deleteRequiredServicesById(id);
        return ResponseEntity.ok().body(null);
    }
}
