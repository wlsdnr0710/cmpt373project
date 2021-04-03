package com.earth.cbr.services;

import com.earth.cbr.models.RiskHistory;

import javax.validation.Valid;
import java.util.List;

public interface RiskHistoryService {
    List<RiskHistory> getAllRiskHistories();
    RiskHistory getRiskHistoryById(Long id);
    Integer getRiskHistoryByHealthRiskAndClientZone(Integer healthRisk, Long zoneId);
    RiskHistory addRiskHistory(@Valid RiskHistory riskHistory);
    RiskHistory updateRiskHistoryById(@Valid RiskHistory riskHistory);
    void deleteRiskHistoryById(Long id);
}
