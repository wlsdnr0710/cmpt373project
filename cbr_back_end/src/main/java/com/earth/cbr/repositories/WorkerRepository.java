package com.earth.cbr.repositories;

import com.earth.cbr.models.Worker;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface WorkerRepository extends JpaRepository<Worker, Long> {
    Optional<Worker> findByUsername(String username);
    Optional<Worker> findByPhone(String Phone);
}
