package com.earth.cbr.repositories;

import com.earth.cbr.models.Visit;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface VisitRepository extends JpaRepository<Visit, Long> {
    Optional<Visit> findByCbrWorkerName(String cbrWorkerName);
    Optional<Visit> findByClientId(Long clientId);
}
