package com.earth.cbr.controllers;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.earth.cbr.exceptions.MissingRequiredDataObjectException;
import com.earth.cbr.exceptions.ObjectDoesNotExistException;
import com.earth.cbr.models.survey.Survey;
import com.earth.cbr.models.survey.SurveyQuestion;
import com.earth.cbr.models.survey.SurveyQuestionOption;
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

    @GetMapping(value = "/question")
    public ResponseEntity<JSONObject> getAllQuestions() {
        List<SurveyQuestion> questions = surveyService.getAllQuestions();
        JSONObject responseJson = new JSONObject();
        responseJson.put("data", questions);
        return ResponseEntity.ok().body(responseJson);
    }

    @GetMapping(value = "/option")
    public ResponseEntity<JSONObject> getAllQuestionOptions() {
        List<SurveyQuestionOption> questionOptions = surveyService.getAllQuestionOptions();
        JSONObject responseJson = new JSONObject();
        responseJson.put("data", questionOptions);
        return ResponseEntity.ok().body(responseJson);
    }

    @GetMapping(value = "/{id}")
    public ResponseEntity<JSONObject> getSurveyById(@PathVariable Long id) throws ObjectDoesNotExistException {
        Survey survey = surveyService.getSurveyById(id);
        if (survey == null) {
            throw new ObjectDoesNotExistException("Survey with that ID does not exist");
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
            throw new MissingRequiredDataObjectException("Missing data object containing Survey data");
        }

        String surveyString = surveyJSON.toJSONString();
        JSONObject responseJson = new JSONObject();

        Survey survey = JSON.parseObject(surveyString, Survey.class);
        Survey addedSurvey = surveyService.addSurvey(survey);

        responseJson.put("id", addedSurvey.getId());
        return ResponseEntity.ok().body(responseJson);
    }

    @PutMapping
    public ResponseEntity<JSONObject> updateSurveyById(@RequestBody JSONObject payload)
            throws MissingRequiredDataObjectException, ObjectDoesNotExistException {
        JSONObject surveyJSON = payload.getJSONObject("data");
        if (surveyJSON == null) {
            throw new MissingRequiredDataObjectException("Missing data object containing Survey data");
        }

        Long surveyId = surveyJSON.getLong("id");
        if (surveyId == null) {
            throw new ObjectDoesNotExistException("Survey ID is required.");
        }

        if (surveyService.getSurveyById(surveyId) == null) {
            throw new ObjectDoesNotExistException("Survey with that ID does not exist");
        }

        String surveyString = surveyJSON.toJSONString();
        Survey willUpdateSurvey = JSON.parseObject(surveyString, Survey.class);
        Survey updatedSurvey = surveyService.updateSurveyById(willUpdateSurvey);

        JSONObject responseJson = new JSONObject();
        responseJson.put("id", updatedSurvey.getId());
        return ResponseEntity.ok().body(responseJson);
    }

    @DeleteMapping(value = "/{id}")
    public ResponseEntity<JSONObject> deleteSurveyById(@PathVariable Long id) throws ObjectDoesNotExistException {
        if(surveyService.getSurveyById(id) == null) {
            throw new ObjectDoesNotExistException("Survey with that ID does not exist");
        }
        surveyService.deleteSurveyById(id);
        return ResponseEntity.ok().body(null);
    }
}
