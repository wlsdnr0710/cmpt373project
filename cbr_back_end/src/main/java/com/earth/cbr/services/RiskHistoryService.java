package com.earth.cbr.services;

import com.earth.cbr.models.RiskHistory;

import javax.validation.Valid;
import java.util.List;

public interface RiskHistoryService {
    List<RiskHistory> getAllRiskHistories();
    RiskHistory getRiskHistoryById(Long id);
    Integer getRiskHistoryByHealthRiskAndClientZone(Integer healthRisk, Integer zoneId);
    Integer getRiskHistoryBySocialRiskAndClientZone(Integer socialRisk, Integer zoneId);
    Integer getRiskHistoryByEducationRiskAndClientZone(Integer educationRisk, Integer zoneId);
    Integer getRiskHistoryByHealthRisk(Integer healthRisk);
    Integer getRiskHistoryBySocialRisk(Integer socialRisk);
    Integer getRiskHistoryByEducationRisk(Integer educationRisk);
    RiskHistory addRiskHistory(@Valid RiskHistory riskHistory);
    RiskHistory updateRiskHistoryById(@Valid RiskHistory riskHistory);
    void deleteRiskHistoryById(Long id);
}
