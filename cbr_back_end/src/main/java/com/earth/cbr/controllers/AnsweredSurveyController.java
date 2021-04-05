package com.earth.cbr.controllers;

import com.alibaba.fastjson.JSONObject;
import com.earth.cbr.exceptions.MissingRequiredDataObjectException;
import com.earth.cbr.models.survey.AnsweredSurvey;
import com.earth.cbr.repositories.AnsweredSurveyRepository;
import com.earth.cbr.services.AnsweredSurveyServiceImpl;
import com.earth.cbr.services.AnsweredSurveyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@CrossOrigin
@RestController
@RequestMapping(value = "/api/v1/answered_survey")
public class AnsweredSurveyController {

    @Autowired
    AnsweredSurveyService answeredSurveyService;

    @Autowired
    AnsweredSurveyRepository answeredSurveyRepository;

    @PostMapping
    public ResponseEntity<JSONObject> addAnsweredSurvey(@RequestBody JSONObject payload)
            throws MissingRequiredDataObjectException {

        JSONObject data = new JSONObject((Map<String, Object>) payload.get("data"));
        AnsweredSurvey answeredSurvey = answeredSurveyService.buildAnsweredSurvey(data);
        AnsweredSurvey addedAnsweredSurvey = answeredSurveyRepository.save(answeredSurvey);

        JSONObject responseJson = new JSONObject();
        responseJson.put("id", addedAnsweredSurvey.getId());
        return ResponseEntity.ok().body(responseJson);
    }
}
