package com.earth.cbr.controllers;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.earth.cbr.exceptions.ObjectDoesNotExistException;
import com.earth.cbr.exceptions.MissingRequiredDataObjectException;
import com.earth.cbr.models.Worker;
import com.earth.cbr.models.authentication.Admin;
import com.earth.cbr.models.authentication.PassToken;
import com.earth.cbr.services.WorkerService;
import com.earth.cbr.utilities.Utility;
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

    @Admin
    @GetMapping
    public ResponseEntity<JSONObject> getAllWorkers() {
        System.out.println("hello");
        List<Worker> workers = workerService.getAllWorkers();
        JSONObject responseJson = new JSONObject();
        responseJson.put("data", workers);
        return ResponseEntity.ok().body(responseJson);
    }

    @GetMapping(value = "username/{username}")
    public ResponseEntity<JSONObject> getWorkerByUsername(@PathVariable String username) throws ObjectDoesNotExistException {
        if(workerService.getWorkerByUsername(username) == null) {
            throw new ObjectDoesNotExistException("Worker with that username does not exist");
        }

        Worker worker = workerService.getWorkerByUsername(username);
        JSONObject responseJson = new JSONObject();
        responseJson.put("data", worker);
        return ResponseEntity.ok().body(responseJson);
    }

    @GetMapping(value = "/{id}")
    public ResponseEntity<JSONObject> getWorkerById(@PathVariable Long id) throws ObjectDoesNotExistException {
        if(workerService.getWorkerById(id) == null) {
            throw new ObjectDoesNotExistException("Worker with that ID does not exist");
        }

        Worker worker = workerService.getWorkerById(id);
        JSONObject responseJson = new JSONObject();
        responseJson.put("data", worker);
        return ResponseEntity.ok().body(responseJson);
    }

    @PassToken
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

        worker.setPhone(Utility.formatPhoneNumber(worker.getPhone()));

        Worker addedWorker = workerService.addWorker(worker);

        // get worker's id to update UI
        responseJson.put("id", addedWorker.getId());
        return ResponseEntity.ok().body(responseJson);
    }

    @PutMapping
    public ResponseEntity<JSONObject> updateWorkerById(@RequestBody JSONObject payload)
            throws MissingRequiredDataObjectException, ObjectDoesNotExistException {
        JSONObject workerJSON = payload.getJSONObject("data");

        if (workerJSON == null) {
            throw new MissingRequiredDataObjectException("Missing data object containing Worker data");
        }

        if(workerService.getWorkerById(workerJSON.getLong("id")) == null) {
            throw new ObjectDoesNotExistException("Worker with that ID does not exist");
        }

        String workerString = workerJSON.toJSONString();
        
        JSONObject responseJson = new JSONObject();
        Worker worker = JSON.parseObject(workerString, Worker.class);

        worker.setPhone(Utility.formatPhoneNumber(worker.getPhone()));

        Worker updatedWorker = workerService.updateWorkerById(worker);

        // get worker's id to update UI
        responseJson.put("id", updatedWorker.getId());
        return ResponseEntity.ok().body(responseJson);
    }

    @DeleteMapping(value = "/{id}")
    public ResponseEntity<JSONObject> deleteWorkerById(@PathVariable Long id) throws ObjectDoesNotExistException {
        if(workerService.getWorkerById(id) == null) {
            throw new ObjectDoesNotExistException("Worker with that ID does not exist");
        }

        workerService.deleteWorkerById(id);
        return ResponseEntity.ok().body(null);
    }
}
