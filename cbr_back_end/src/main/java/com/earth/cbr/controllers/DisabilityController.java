package com.earth.cbr.controllers;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.earth.cbr.exceptions.ObjectDoesNotExist;
import com.earth.cbr.exceptions.MissingRequiredDataObjectException;
import com.earth.cbr.models.Worker;
import com.earth.cbr.services.WorkerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping(value = "/api/v1/disability")
public class DisabilityController {
    @Autowired
    private WorkerService workerService;

    @GetMapping
    public ResponseEntity<JSONObject> getAllWorkers() {
        List<Worker> workers = workerService.getAllWorkers();
        JSONObject responseJson = new JSONObject();
        responseJson.put("data", workers);
        return ResponseEntity.ok().body(responseJson);
    }
}
