package com.earth.cbr.services;

import com.earth.cbr.models.RiskHistory;
import com.earth.cbr.repositories.RiskHistoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.validation.Valid;
import java.util.List;
import java.util.Optional;

@Service
public class RiskHistoryServiceImpl implements RiskHistoryService{

	@Autowired
	private RiskHistoryRepository riskHistoryRepository;

	@Override
	public List<RiskHistory> getAllRiskHistories() {
		return riskHistoryRepository.findAll();
	}

	@Override
	public RiskHistory getRiskHistoryById(Long id) {
		Optional<RiskHistory> riskHistoryOptional = riskHistoryRepository.findById(id);
		RiskHistory riskHistory = riskHistoryOptional.orElse(null);
		return riskHistory;
	}

	@Override
	public RiskHistory addRiskHistory(@Valid RiskHistory riskHistory) {
		return riskHistoryRepository.save(riskHistory);
	}

	@Override
	public RiskHistory updateRiskHistoryById(@Valid RiskHistory riskHistory) {
		return riskHistoryRepository.save(riskHistory);
	}

	@Override
	public void deleteRiskHistoryById(Long id) {
		riskHistoryRepository.deleteById(id);
	}
}
