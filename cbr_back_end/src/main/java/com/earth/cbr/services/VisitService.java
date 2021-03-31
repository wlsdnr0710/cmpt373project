package com.earth.cbr.services;

import com.earth.cbr.models.Visit;

import javax.validation.Valid;
import java.util.List;

public interface VisitService {
    List<Visit> getAllVisits();
    Visit getVisitById(Long id);
    List<Visit> getAllVisitsByCbrWorkerName(String cbrWorkerName);
    List<Visit> getAllVisitsByClientId(Long clientId);
    List<Visit> getAllVisitsByClientIdSortedByDate(Long clientId);
    Long getAllVisitsCount();
    Integer getAllVisitsByZoneCount(Integer zoneId);
    Visit addVisit(@Valid Visit visit);
    Visit updateVisitById(@Valid Visit visit);
    void deleteVisitById(Long id);
}
