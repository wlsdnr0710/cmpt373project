package com.earth.cbr.services;

import com.alibaba.fastjson.JSONObject;
import com.earth.cbr.models.Visit;

import javax.validation.Valid;
import java.util.List;

public interface VisitService {
    List<Visit> getAllVisits();
    Visit getVisitById(Long id);
    Visit addVisit(@Valid Visit visit);
    Visit updateVisitById(@Valid Visit visit);
    void deleteVisitById(Long id);
}
