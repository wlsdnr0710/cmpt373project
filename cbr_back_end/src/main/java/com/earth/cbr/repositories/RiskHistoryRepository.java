package com.earth.cbr.repositories;

import com.earth.cbr.models.RiskHistory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RiskHistoryRepository extends JpaRepository<RiskHistory, Long> {
    List<RiskHistory> findAllByHealthRiskAndClientZone(Integer healthRisk, Long zoneId);
}
