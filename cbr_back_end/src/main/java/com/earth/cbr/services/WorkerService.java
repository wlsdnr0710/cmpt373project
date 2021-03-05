package com.earth.cbr.services;

import com.earth.cbr.models.Worker;

import javax.validation.Valid;
import java.util.List;

public interface WorkerService {
    List<Worker> getAllWorkers();
    Worker getWorkerByUsername(String username);
    Worker getWorkerById(Long id);
    Worker addWorker(@Valid Worker worker);
    Worker updateWorkerById(@Valid Worker worker);
    void deleteWorkerById(Long id);
}

