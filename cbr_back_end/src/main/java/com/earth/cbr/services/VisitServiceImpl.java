package com.earth.cbr.services;

import com.alibaba.fastjson.JSONObject;
import com.earth.cbr.models.Visit;
import com.earth.cbr.models.Worker;
import com.earth.cbr.repositories.VisitRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.List;
import java.util.Optional;
import javax.validation.Valid;

@Service
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
    public Visit addVisit(@Valid Visit visit) {
        return visitRepository.save(visit);
    }

    @Override
    public Visit updateVisitById(Long id, JSONObject payload) {
        int visitConsent = (int) payload.get("consent");
        java.sql.Date visitDate = formatDate((String) payload.get("date"));
        String visitCbrWorkerName = (String) payload.get("cbr_worker_name");
        String visitPurpose = (String) payload.get("purpose");
        String visitZone = (String) payload.get("zone");
        int visitVillageNumber = (int) payload.get("village_number");
        String visitHealthGoalProgress = (String) payload.get("health_goal_progress");
        String visitHealthOutcome = (String) payload.get("health_outcome");

        Optional<Visit> visitOptional = visitRepository.findById(id);
        Visit visit = visitOptional.get();

        visit.setConsent(visitConsent);
        visit.setDate(visitDate);
        visit.setCbrWorkerName(visitCbrWorkerName);
        visit.setPurpose(visitPurpose);
        visit.setZone(visitZone);
        visit.setVillageNumber(visitVillageNumber);
        visit.setHealthGoalProgress(visitHealthGoalProgress);
        visit.setHealthOutcome(visitHealthOutcome);
        return visitRepository.save(visit);
    }

    @Override
    public void deleteVisitById(Long id) {
        visitRepository.deleteById(id);
    }

    public java.sql.Date formatDate(String date) {
        Date longDate = null;
        try {
            SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
            longDate = dateFormat.parse(date);
        } catch (ParseException e) {
            e.printStackTrace();
        }
        java.sql.Date sqlDate = new java.sql.Date(longDate.getTime());

        return sqlDate;
    }
}
