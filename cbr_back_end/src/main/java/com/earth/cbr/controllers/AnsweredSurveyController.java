package com.earth.cbr.controllers;

import com.alibaba.fastjson.JSONObject;
import com.earth.cbr.exceptions.MissingRequiredDataObjectException;
import com.earth.cbr.exceptions.ObjectDoesNotExistException;
import com.earth.cbr.models.survey.AnsweredSurvey;
import com.earth.cbr.services.survey.AnsweredSurveyService;
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

    @GetMapping(value = "/{id}")
    public ResponseEntity<JSONObject> getAnsweredSurveyById(@PathVariable Long id)
            throws ObjectDoesNotExistException {
        AnsweredSurvey answeredSurvey = answeredSurveyService.getAnsweredSurveyById(id);
        if (answeredSurvey == null) {
            throw new ObjectDoesNotExistException("Answered survey with that ID does not exist");
        }
        JSONObject responseJson = new JSONObject();
        responseJson.put("data", answeredSurvey);
        return ResponseEntity.ok().body(responseJson);
    }

    @PostMapping
    public ResponseEntity<JSONObject> addAnsweredSurvey(@RequestBody JSONObject payload)
            throws MissingRequiredDataObjectException {

        JSONObject data = new JSONObject((Map<String, Object>) payload.get("data"));
        AnsweredSurvey answeredSurvey = answeredSurveyService.buildAnsweredSurvey(data);
        AnsweredSurvey addedAnsweredSurvey = answeredSurveyService.addAnsweredSurvey(answeredSurvey);

        JSONObject responseJson = new JSONObject();
        responseJson.put("id", addedAnsweredSurvey.getId());
        return ResponseEntity.ok().body(responseJson);
    }

    @DeleteMapping(value = "/{id}")
    public ResponseEntity<JSONObject> deleteAnsweredSurveyById(@PathVariable Long id)
            throws ObjectDoesNotExistException {
        AnsweredSurvey answeredSurvey = answeredSurveyService.getAnsweredSurveyById(id);
        if (answeredSurvey == null) {
            throw new ObjectDoesNotExistException("Answered survey with that ID does not exist");
        }
        answeredSurveyService.deleteAnsweredSurveyById(id);
        return ResponseEntity.ok().body(null);
    }
}
