package com.earth.cbr.services;

import com.earth.cbr.models.survey.Survey;
import com.earth.cbr.models.survey.SurveyQuestion;
import com.earth.cbr.models.survey.SurveyQuestionOption;
import com.earth.cbr.repositories.QuestionOptionRepository;
import com.earth.cbr.repositories.QuestionRepository;
import com.earth.cbr.repositories.SurveyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class SurveyServiceImpl implements SurveyService {

    @Autowired
    private SurveyRepository surveyRepository;

    @Autowired
    private QuestionRepository questionRepository;

    @Autowired
    private QuestionOptionRepository questionOptionRepository;

    @Override
    public List<Survey> getAllSurveys() {
        return surveyRepository.findAll();
    }

    @Override
    public List<SurveyQuestion> getAllQuestions() {
        return questionRepository.findAll();
    }

    @Override
    public List<SurveyQuestionOption> getAllQuestionOptions() {
        return questionOptionRepository.findAll();
    }

    @Override
    public Survey getSurveyById(Long id) {
        Optional<Survey> surveyOptional = surveyRepository.findById(id);
        return surveyOptional.orElse(null);
    }

    @Override
    public Survey addSurvey(Survey survey) {
        Survey savedSurvey = surveyRepository.save(survey);
        return savedSurvey;
    }
}
