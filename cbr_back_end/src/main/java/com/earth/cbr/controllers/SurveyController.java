package com.earth.cbr.controllers;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.earth.cbr.exceptions.MissingRequiredDataObjectException;
import com.earth.cbr.exceptions.ObjectDoesNotExistException;
import com.earth.cbr.models.survey.Survey;
import com.earth.cbr.services.SurveyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping(value = "/api/v1/survey")
public class SurveyController {

    @Autowired
    private SurveyService surveyService;

    @GetMapping
    public ResponseEntity<JSONObject> getAllSurveys() {
        List<Survey> surveys = surveyService.getAllSurveys();
        JSONObject responseJson = new JSONObject();
        responseJson.put("data", surveys);
        return ResponseEntity.ok().body(responseJson);
    }

    @GetMapping(value = "/{id}")
    public ResponseEntity<JSONObject> getSurveyById(@PathVariable Long id) throws ObjectDoesNotExistException {
        Survey survey = surveyService.getSurveyById(id);
        if (survey == null) {
            throw new ObjectDoesNotExistException("Client with that ID does not exist");
        }
        JSONObject responseJson = new JSONObject();
        responseJson.put("data", survey);
        return ResponseEntity.ok().body(responseJson);
    }

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
        Survey addedSurvey = surveyService.addSurvey(survey);

        responseJson.put("id", addedSurvey.getId());
        return ResponseEntity.ok().body(responseJson);
    }
}
