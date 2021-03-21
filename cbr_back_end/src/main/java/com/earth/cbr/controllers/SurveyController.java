package com.earth.cbr.controllers;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.earth.cbr.exceptions.MissingRequiredDataObjectException;
import com.earth.cbr.models.survey.Survey;
import com.earth.cbr.services.SurveyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
@RequestMapping(value = "/api/v1/survey")
public class SurveyController {

    @Autowired
    private SurveyService surveyService;

    @PostMapping
    public ResponseEntity<JSONObject> addSurveys(@RequestBody JSONObject payload)
            throws MissingRequiredDataObjectException  {
        JSONObject surveyJSON = payload.getJSONObject("data");
        if (surveyJSON == null) {
            throw new MissingRequiredDataObjectException("Missing data object containing Client data");
        }

        String surveyString = surveyJSON.toJSONString();
        JSONObject responseJson = new JSONObject();

        Survey survey = JSON.parseObject(surveyString, Survey.class);


        return null;
    }
}
