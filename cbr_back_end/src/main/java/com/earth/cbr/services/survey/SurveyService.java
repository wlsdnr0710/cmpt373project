package com.earth.cbr.services.survey;

import com.earth.cbr.models.survey.Survey;
import com.earth.cbr.models.survey.SurveyQuestion;
import com.earth.cbr.models.survey.SurveyQuestionOption;

import javax.validation.Valid;
import java.util.List;

public interface SurveyService {
    Survey addSurvey(@Valid Survey survey);
    List<Survey> getAllSurveys();
    List<SurveyQuestion> getAllQuestions();
    List<SurveyQuestionOption> getAllQuestionOptions();
    Survey getSurveyById(Long id);
    Survey updateSurveyById(@Valid Survey survey);
    void deleteSurveyById(Long id);
}
