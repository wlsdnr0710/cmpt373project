package com.earth.cbr.services;

import com.alibaba.fastjson.JSONObject;
import com.earth.cbr.models.Worker;
import com.earth.cbr.repositories.WorkerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class WorkerServiceImpl implements WorkerService {

    @Autowired
    private WorkerRepository workerRepository;

    @Override
    public List<Worker> getAllWorkers() {
        return workerRepository.findAll();
    }

    @Override
    public Worker getWorkerByUsername(String username) {
        Optional<Worker> workerOptional = workerRepository.findByUsername(username);
        Worker worker = workerOptional.get();
        return worker;
    }

    @Override
    public Worker addWorker(JSONObject payload) {
        String workerFirstName = (String) payload.get("first_name");
        String workerLastName = (String) payload.get("last_name");
        String workerUsername = (String) payload.get("username");
        String workerPassword = (String) payload.get("password");
        String workerPhone = (String) payload.get("phone");
        String workerEmail = (String) payload.get("email");
        String workerRole = (String) payload.get("role");
        String workerZone = (String) payload.get("zone");
        Worker worker = new Worker(workerFirstName, workerLastName, workerUsername, workerPassword, workerPhone,
                workerEmail, workerRole, workerZone);
        return workerRepository.save(worker);
    }

    @Override
    public void deleteWorkerById(Long id) {
        workerRepository.deleteById(id);
    }
}