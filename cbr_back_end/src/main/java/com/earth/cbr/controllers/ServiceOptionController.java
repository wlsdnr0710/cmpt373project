package com.earth.cbr.controllers;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.earth.cbr.exceptions.ObjectDoesNotExistException;
import com.earth.cbr.exceptions.MissingRequiredDataObjectException;
import com.earth.cbr.models.ServiceOption;
import com.earth.cbr.services.ServiceOptionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping(value = "/api/v1/serviceOption")
public class ServiceOptionController {
    @Autowired
    private ServiceOptionService serviceOptionService;

    @GetMapping
    public ResponseEntity<JSONObject> getAllServiceOptions() {
        List<ServiceOption> serviceOptions = serviceOptionService.getAllServiceOptions();
        JSONObject responseJson = new JSONObject();
        responseJson.put("data", serviceOptions);
        return ResponseEntity.ok().body(responseJson);
    }

    @GetMapping(value = "/{id}")
    public ResponseEntity<JSONObject> getServiceOptionById(@PathVariable Long id) throws ObjectDoesNotExistException {
        if(serviceOptionService.getServiceOptionById(id) == null) {
            throw new ObjectDoesNotExistException("ServiceOption with that ID does not exist");
        }

        ServiceOption serviceOption = serviceOptionService.getServiceOptionById(id);
        JSONObject responseJson = new JSONObject();
        responseJson.put("data", serviceOption);
        return ResponseEntity.ok().body(responseJson);
    }

    @PostMapping
    public ResponseEntity<JSONObject> addServiceOption(@RequestBody JSONObject payload)
            throws MissingRequiredDataObjectException {
        JSONObject serviceOptionJSON = payload.getJSONObject("data");

        if (serviceOptionJSON == null) {
            throw new MissingRequiredDataObjectException("Missing data object containing ServiceOption data");
        }
        String serviceOptionString = serviceOptionJSON.toJSONString();

        JSONObject responseJson = new JSONObject();
        ServiceOption serviceOption = JSON.parseObject(serviceOptionString, ServiceOption.class);

        ServiceOption addedServiceOption = serviceOptionService.addServiceOption(serviceOption);

        // Need to tell front-end the new serviceOption's id
        // so front-end can update the UI
        responseJson.put("id", addedServiceOption.getId());
        return ResponseEntity.ok().body(responseJson);
    }

    @PutMapping
    public ResponseEntity<JSONObject> updateServiceOptionById(@RequestBody JSONObject payload)
            throws MissingRequiredDataObjectException, ObjectDoesNotExistException {
        JSONObject serviceOptionJSON = payload.getJSONObject("data");

        if (serviceOptionJSON == null) {
            throw new MissingRequiredDataObjectException("Missing data object containing ServiceOption data");
        }

        if(serviceOptionService.getServiceOptionById(serviceOptionJSON.getLong("id")) == null) {
            throw new ObjectDoesNotExistException("ServiceOption with that ID does not exist");
        }

        String serviceOptionString = serviceOptionJSON.toJSONString();

        JSONObject responseJson = new JSONObject();
        ServiceOption serviceOption = JSON.parseObject(serviceOptionString, ServiceOption.class);

        ServiceOption updatedServiceOption = serviceOptionService.updateServiceOptionById(serviceOption);

        // Need to tell front-end the new serviceOption's id
        // so front-end can update the UI
        responseJson.put("id", updatedServiceOption.getId());
        return ResponseEntity.ok().body(responseJson);
    }

    @DeleteMapping(value = "/{id}")
    public ResponseEntity<JSONObject> deleteServiceOptionById(@PathVariable Long id) throws ObjectDoesNotExistException {
        if(serviceOptionService.getServiceOptionById(id) == null) {
            throw new ObjectDoesNotExistException("ServiceOption with that ID does not exist");
        }

        serviceOptionService.deleteServiceOptionById(id);
        return ResponseEntity.ok().body(null);
    }
}
