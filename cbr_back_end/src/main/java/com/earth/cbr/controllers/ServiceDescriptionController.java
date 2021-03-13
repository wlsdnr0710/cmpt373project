package com.earth.cbr.controllers;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.earth.cbr.exceptions.ObjectDoesNotExist;
import com.earth.cbr.exceptions.MissingRequiredDataObjectException;
import com.earth.cbr.models.ServiceDescription;
import com.earth.cbr.services.ServiceDescriptionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping(value = "/api/v1/serviceDescription")
public class ServiceDescriptionController {
    @Autowired
    private ServiceDescriptionService serviceDescriptionService;

    @GetMapping
    public ResponseEntity<JSONObject> getAllServiceDescriptions() {
        List<ServiceDescription> serviceDescriptions = serviceDescriptionService.getAllServiceDescriptions();
        JSONObject responseJson = new JSONObject();
        responseJson.put("data", serviceDescriptions);
        return ResponseEntity.ok().body(responseJson);
    }

    @GetMapping(value = "/{id}")
    public ResponseEntity<JSONObject> getServiceDescriptionById(@PathVariable Long id) throws ObjectDoesNotExist {
        if(serviceDescriptionService.getServiceDescriptionById(id) == null) {
            throw new ObjectDoesNotExist("ServiceDescription with that ID does not exist");
        }

        ServiceDescription serviceDescription = serviceDescriptionService.getServiceDescriptionById(id);
        JSONObject responseJson = new JSONObject();
        responseJson.put("data", serviceDescription);
        return ResponseEntity.ok().body(responseJson);
    }

    @PostMapping
    public ResponseEntity<JSONObject> addServiceDescription(@RequestBody JSONObject payload)
            throws MissingRequiredDataObjectException {
        JSONObject serviceDescriptionJSON = payload.getJSONObject("data");

        if (serviceDescriptionJSON == null) {
            throw new MissingRequiredDataObjectException("Missing data object containing ServiceDescription data");
        }
        String serviceDescriptionString = serviceDescriptionJSON.toJSONString();

        JSONObject responseJson = new JSONObject();
        ServiceDescription serviceDescription = JSON.parseObject(serviceDescriptionString, ServiceDescription.class);

        ServiceDescription addedServiceDescription = serviceDescriptionService.addServiceDescription(serviceDescription);

        // Need to tell front-end the new serviceDescription's id
        // so front-end can update the UI
        responseJson.put("id", addedServiceDescription.getId());
        return ResponseEntity.ok().body(responseJson);
    }

    @PutMapping
    public ResponseEntity<JSONObject> updateServiceDescriptionById(@RequestBody JSONObject payload)
            throws MissingRequiredDataObjectException, ObjectDoesNotExist {
        JSONObject serviceDescriptionJSON = payload.getJSONObject("data");

        if (serviceDescriptionJSON == null) {
            throw new MissingRequiredDataObjectException("Missing data object containing ServiceDescription data");
        }

        if(serviceDescriptionService.getServiceDescriptionById(serviceDescriptionJSON.getLong("id")) == null) {
            throw new ObjectDoesNotExist("ServiceDescription with that ID does not exist");
        }

        String serviceDescriptionString = serviceDescriptionJSON.toJSONString();

        JSONObject responseJson = new JSONObject();
        ServiceDescription serviceDescription = JSON.parseObject(serviceDescriptionString, ServiceDescription.class);

        ServiceDescription updatedServiceDescription = serviceDescriptionService.updateServiceDescriptionById(serviceDescription);

        // Need to tell front-end the new serviceDescription's id
        // so front-end can update the UI
        responseJson.put("id", updatedServiceDescription.getId());
        return ResponseEntity.ok().body(responseJson);
    }

    @DeleteMapping(value = "/{id}")
    public ResponseEntity<JSONObject> deleteServiceDescriptionById(@PathVariable Long id) throws ObjectDoesNotExist {
        if(serviceDescriptionService.getServiceDescriptionById(id) == null) {
            throw new ObjectDoesNotExist("ServiceDescription with that ID does not exist");
        }

        serviceDescriptionService.deleteServiceDescriptionById(id);
        return ResponseEntity.ok().body(null);
    }
}
