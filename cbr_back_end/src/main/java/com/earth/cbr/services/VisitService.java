package com.earth.cbr.services;

import com.alibaba.fastjson.JSONObject;
import com.earth.cbr.models.Visit;

import java.util.List;

public interface VisitService {
    List<Visit> getAllVisits();
    //Visit getVisitById(Long id);
    //Visit addVisit(JSONObject payload);
    //Visit updateVisitById(Long id, JSONObject payload);
    //void deleteVisitById(Long id);
}
