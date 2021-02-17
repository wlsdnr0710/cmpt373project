package com.earth.cbr.controllers;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.earth.cbr.exceptions.MissingRequiredDataObjectException;
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

    @GetMapping(value = "username/{username}")
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

//    @PostMapping
//    public ResponseEntity<JSONObject> addWorker(@RequestBody JSONObject payload) {
//        Worker addedWorker = workerService.addWorker(payload);
//
//        JSONObject responseJson = new JSONObject();
//        // Need to tell front-end the new client's id
//        // so front-end can update the UI
//        responseJson.put("id", addedWorker.getId());
//
//        return ResponseEntity.ok().body(responseJson);
//    }

    @PostMapping
    public ResponseEntity<JSONObject> addWorker(@RequestBody JSONObject payload)
            throws MissingRequiredDataObjectException {
        JSONObject workerJSON = payload.getJSONObject("data");

        if (workerJSON == null) {
            throw new MissingRequiredDataObjectException("Missing data object containing Worker data");
        }
        String workerString = workerJSON.toJSONString();

        JSONObject responseJson = new JSONObject();
        Worker worker = JSON.parseObject(workerString, Worker.class);

        Worker addedWorker = workerService.addWorker(worker);

        // get worker's id to update UI
        responseJson.put("id", addedWorker.getId());
        return ResponseEntity.ok().body(responseJson);
    }

    @PutMapping(value = "/{id}")
    public ResponseEntity<JSONObject> updateWorkerById(@PathVariable Long id, @RequestBody JSONObject payload)
                throws MissingRequiredDataObjectException {
            JSONObject workerJSON = payload.getJSONObject("data");

            if (workerJSON == null) {
                throw new MissingRequiredDataObjectException("Missing data object containing Worker data");
            }
            String workerString = workerJSON.toJSONString();

            JSONObject responseJson = new JSONObject();
            Worker worker = JSON.parseObject(workerString, Worker.class);

            Worker updatedWorker = workerService.updateWorkerById(worker);

            return ResponseEntity.ok().body(responseJson);
        }


    @DeleteMapping
    public ResponseEntity<JSONObject> deleteWorkerById(@RequestBody JSONObject payload) {
        Integer workerIdInt = (Integer) payload.get("id");
        Long workerId = Long.valueOf(workerIdInt);
        workerService.deleteWorkerById(workerId);
        return ResponseEntity.ok().body(null);
    }
}
