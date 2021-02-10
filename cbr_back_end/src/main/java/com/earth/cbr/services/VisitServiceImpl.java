package com.earth.cbr.services;

import com.earth.cbr.models.Visit;
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

}
