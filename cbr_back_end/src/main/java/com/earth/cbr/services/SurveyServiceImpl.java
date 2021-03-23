package com.earth.cbr.services;

import com.earth.cbr.models.survey.Survey;
import com.earth.cbr.models.survey.SurveyQuestion;
import com.earth.cbr.models.survey.SurveyQuestionOption;
import com.earth.cbr.repositories.QuestionOptionRepository;
import com.earth.cbr.repositories.QuestionRepository;
import com.earth.cbr.repositories.SurveyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Iterator;
import java.util.List;
import java.util.Optional;
import java.util.Set;

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
        setQuestionParent(survey);
        Survey savedSurvey = surveyRepository.save(survey);
        return savedSurvey;
    }

    private void setQuestionParent(Survey survey) {
        Set<SurveyQuestion> surveyQuestions = survey.getQuestions();
        Iterator<SurveyQuestion> iterator = surveyQuestions.iterator();
        while (iterator.hasNext()) {
            SurveyQuestion surveyQuestion = iterator.next();
            surveyQuestion.setSurvey(survey);
            setOptionParent(surveyQuestion);
        }
    }

    private void setOptionParent(SurveyQuestion surveyQuestion) {
        Set<SurveyQuestionOption> surveyQuestionOptions = surveyQuestion.getOptions();
        Iterator<SurveyQuestionOption> iterator = surveyQuestionOptions.iterator();
        while (iterator.hasNext()) {
            SurveyQuestionOption option = iterator.next();
            option.setSurveyQuestion(surveyQuestion);
        }
    }
}
