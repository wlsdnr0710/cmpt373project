package com.earth.cbr.services;

import com.earth.cbr.models.Worker;
import com.earth.cbr.repositories.WorkerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.validation.Valid;
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
    public Worker getWorkerById(Long id) {
        Optional<Worker> workerOptional = workerRepository.findById(id);
        Worker worker = workerOptional.get();
        return worker;
    }

    @Override
    public Worker addWorker(@Valid Worker worker) {
        return workerRepository.save(worker);
    }

    @Override
    public Worker updateWorkerById(@Valid Worker worker) { return workerRepository.save(worker); }

    @Override
    public void deleteWorkerById(Long id) {
        workerRepository.deleteById(id);
    }
}