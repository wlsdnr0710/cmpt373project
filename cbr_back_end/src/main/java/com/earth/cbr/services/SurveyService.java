package com.earth.cbr.services;

import com.earth.cbr.models.survey.Survey;

import java.util.List;

public interface SurveyService {
    Survey addSurvey(Survey survey);
    List<Survey> getAllSurveys();
    Survey getSurveyById(Long id);
}
