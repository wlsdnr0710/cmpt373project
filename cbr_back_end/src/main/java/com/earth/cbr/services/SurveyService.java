package com.earth.cbr.services;

import com.earth.cbr.models.survey.Survey;
import com.earth.cbr.models.survey.SurveyQuestion;
import com.earth.cbr.models.survey.SurveyQuestionOption;

import java.util.List;

public interface SurveyService {
    Survey addSurvey(Survey survey);
    List<Survey> getAllSurveys();
    List<SurveyQuestion> getAllQuestions();
    List<SurveyQuestionOption> getAllQuestionOptions();
    Survey getSurveyById(Long id);
    Survey updateSurveyById(Survey survey);
    void deleteSurveyById(Long id);
}
