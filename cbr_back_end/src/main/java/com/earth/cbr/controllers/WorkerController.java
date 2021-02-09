package com.earth.cbr.controllers;

import com.alibaba.fastjson.JSONObject;
import com.earth.cbr.models.Worker;
import com.earth.cbr.services.WorkerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping(value = "/api/v1/worker")
public class WorkerController {
    @Autowired
    private WorkerService workerService;

    @GetMapping
    public ResponseEntity<JSONObject> getAllWorkers() {
        List<Worker> workers = workerService.getAllWorkers();
        JSONObject responseJson = new JSONObject();
        responseJson.put("data", workers);
        return ResponseEntity.ok().body(responseJson);
    }

    @GetMapping(value = "/{username}")
    public ResponseEntity<JSONObject> getWorkerByUsername(@PathVariable String username) {
        Worker worker = workerService.getWorkerByUsername(username);
        JSONObject responseJson = new JSONObject();
        responseJson.put("data", worker);
        return ResponseEntity.ok().body(responseJson);
    }

    @GetMapping(value = "/{id}")
    public ResponseEntity<JSONObject> getWorkerById(@PathVariable Long id) {
        Worker worker = workerService.getWorkerById(id);
        JSONObject responseJson = new JSONObject();
        responseJson.put("data", worker);
        return ResponseEntity.ok().body(responseJson);
    }
}
