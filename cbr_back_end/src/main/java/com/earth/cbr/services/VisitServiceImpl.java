package com.earth.cbr.services;

import com.alibaba.fastjson.JSONObject;
import com.earth.cbr.models.Visit;
import com.earth.cbr.models.Worker;
import com.earth.cbr.repositories.VisitRepository;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;
import java.util.Optional;

public class VisitServiceImpl implements VisitService{

    @Autowired
    private VisitRepository visitRepository;

    @Override
    public List<Visit> getAllVisits() {
        return visitRepository.findAll();
    }

    @Override
    public Visit getVisitById(Long id) {
        Optional<Visit> visitOptional = visitRepository.findById(id);
        Visit visit = visitOptional.get();
        return visit;
    }

    @Override
    public Visit addVisit(JSONObject payload) {
        String visitConsent = (String) payload.get("consent");
        String visitDate = (String) payload.get("date");
        String visitCbrWorkerName = (String) payload.get("cbr_worker_name");
        String visitPurpose = (String) payload.get("purpose");
        String visitZone = (String) payload.get("zone");
        int visitVillageNumber = (int) payload.get("village_number");
        String visitHealthGoalProgress = (String) payload.get("health_goal_progress");
        String visitHealthOutcome = (String) payload.get("health_outcome");
        Visit visit = new Visit(visitConsent, visitDate, visitCbrWorkerName, visitPurpose, visitZone,
                visitVillageNumber, visitHealthGoalProgress, visitHealthOutcome);
        return visitRepository.save(visit);
    }
}
