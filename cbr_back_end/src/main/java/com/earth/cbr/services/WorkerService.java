package com.earth.cbr.services;

import com.alibaba.fastjson.JSONObject;
import com.earth.cbr.models.Worker;

import javax.validation.Valid;
import java.util.List;

public interface WorkerService {
    List<Worker> getAllWorkers();
    Worker getWorkerByUsername(String username);
    Worker getWorkerById(Long id);
    Worker addWorker(JSONObject payload);
    Worker addWorker(@Valid Worker worker);
    Worker updateWorkerById(Long id, JSONObject payload);
    void deleteWorkerById(Long id);
}
