package com.earth.cbr.repositories;

import com.earth.cbr.models.RiskHistory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RiskHistoryRepository extends JpaRepository<RiskHistory, Long> {
    List<RiskHistory> findAllByHealthRiskAndClientZone(Integer healthRisk, Integer zoneId);
    List<RiskHistory> findAllBySocialRiskAndClientZone(Integer healthRisk, Integer zoneId);
    List<RiskHistory> findAllByEducationRiskAndClientZone(Integer healthRisk, Integer zoneId);
    List<RiskHistory> findAllByHealthRisk(Integer healthRisk);
    List<RiskHistory> findAllBySocialRisk(Integer healthRisk);
    List<RiskHistory> findAllByEducationRisk(Integer healthRisk);
}
