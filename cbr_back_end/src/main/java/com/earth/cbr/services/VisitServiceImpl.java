package com.earth.cbr.services;

import com.earth.cbr.models.Visit;
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
    public Visit getVisitByCbrWorkerName(String cbrWorkerName) {
        Optional<Visit> visitOptional = visitRepository.findByCbrWorkerName(cbrWorkerName);
        Visit visit = visitOptional.get();
        return visit;
    }

    @Override
    public Visit getVisitByClientId(Long clientId) {
        Optional<Visit> visitOptional = visitRepository.findByClientId(clientId);
        Visit visit = visitOptional.get();
        return visit;
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
