package com.earth.cbr.services;

import com.earth.cbr.models.Visit;
import com.earth.cbr.repositories.VisitRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
        Visit visit = visitOptional.orElse(null);
        return visit;
    }

    @Override
    public List<Visit> getAllVisitsByCbrWorkerName(String cbrWorkerName) {
        return visitRepository.findAllByCbrWorkerName(cbrWorkerName);
    }

    @Override
    public List<Visit> getAllVisitsByClientId(Long clientId) {
        return visitRepository.findAllByClientId(clientId);
    }

    @Override
    public List<Visit> getAllVisitsByClientIdSortedByDate(Long clientId) {
        return visitRepository.findAllByClientIdOrderByDateDesc(clientId);
    }

    @Override
    public Long getAllVisitsCount() {
        return visitRepository.count();
    }

    @Override
    public Integer getAllVisitsByZoneCount(Integer zoneId) {
        return visitRepository.findAllByZone(zoneId).size();
    }

    @Override
    public Visit addVisit(@Valid Visit visit) {
        return visitRepository.save(visit);
    }

    @Override
    public Visit updateVisitById(@Valid Visit visit) { return visitRepository.save(visit); }

    @Override
    public void deleteVisitById(Long id) {
        visitRepository.deleteById(id);
    }
}
