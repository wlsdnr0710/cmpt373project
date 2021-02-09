package com.earth.cbr.services;

import com.alibaba.fastjson.JSONObject;
import com.earth.cbr.models.Worker;

import java.util.List;

public interface WorkerService {
    List<Worker> getAllWorkers();
    Worker getWorkerById(Long id);
    Worker addWorker(JSONObject payload);
    void deleteWorkerById(Long id);
}
