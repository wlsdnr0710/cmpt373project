package com.earth.cbr.repositories;

import com.earth.cbr.models.Visit;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface VisitRepository extends JpaRepository<Visit, Long> {
    List<Visit> findAllByCbrWorkerName(String cbrWorkerName);
    List<Visit> findAllByClientId(Long clientId);
    List<Visit> findAllByClientIdOrderByDateDesc(Long clientId);
    List<Visit> findAllByZone(Integer zoneId);
}
