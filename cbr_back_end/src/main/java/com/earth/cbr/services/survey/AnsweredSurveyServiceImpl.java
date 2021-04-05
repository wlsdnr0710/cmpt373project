package com.earth.cbr.services.survey;

import com.alibaba.fastjson.JSONObject;
import com.earth.cbr.models.Client;
import com.earth.cbr.models.survey.*;
import com.earth.cbr.repositories.ClientRepository;
import com.earth.cbr.repositories.SurveyQuestionOptionRepository;
import com.earth.cbr.repositories.SurveyQuestionRepository;
import com.earth.cbr.repositories.SurveyRepository;
import com.earth.cbr.services.survey.AnsweredSurveyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class AnsweredSurveyServiceImpl implements AnsweredSurveyService {

    @Autowired
    private SurveyRepository surveyRepository;

    @Autowired
    private SurveyQuestionRepository surveyQuestionRepository;

    @Autowired
    private SurveyQuestionOptionRepository surveyQuestionOptionRepository;

    @Autowired
    ClientRepository clientRepository;

    @Override
    public AnsweredSurvey buildAnsweredSurvey(JSONObject data) {
        Map<String, Object> surveyInputs = (Map<String, Object>) data.get("surveyInputs");
        Set<String> questionIds = surveyInputs.keySet();
        List<AnsweredQuestion> answeredQuestions = new ArrayList<>();
        for (String questionIdString : questionIds) {
            JSONObject questionValueJSON = new JSONObject((Map<String, Object>) surveyInputs.get(questionIdString));

            Long questionId = Long.valueOf(questionIdString);
            Optional<SurveyQuestion> surveyQuestionOptional = surveyQuestionRepository.findById(questionId);
            SurveyQuestion surveyQuestion = surveyQuestionOptional.orElse(null);
            if (surveyQuestion == null) {
                return null;
            }
            SurveyQuestionType questionType = surveyQuestion.getType();
            AnsweredQuestion answeredQuestion = null;
            switch (questionType) {
                case MULTIPLE_CHOICE:
                    List<Map<String, Object>> optionList = (List<Map<String, Object>>) questionValueJSON.get("value");
                    Set<SurveyQuestionOption> surveyQuestionOptionSet = parseSurveyQuestionOptions(optionList);
                    answeredQuestion = AnsweredQuestion.buildMultipleChoice(surveyQuestion, surveyQuestionOptionSet);
                    break;
                case YES_OR_NO:
                    Boolean isYes = (Boolean) questionValueJSON.get("value");
                    answeredQuestion = AnsweredQuestion.buildYesOrNo(surveyQuestion, isYes);
                    break;
                case DROPDOWN:
                    long optionId = (int) questionValueJSON.get("value");
                    SurveyQuestionOption option = getOptionById(optionId);
                    answeredQuestion = AnsweredQuestion.buildDropdown(surveyQuestion, option);
                    break;
                case WRITTEN:
                    String writtenAnswer = (String) questionValueJSON.get("value");
                    answeredQuestion = AnsweredQuestion.buildWrittenAnswer(surveyQuestion, writtenAnswer);
                    break;
            }
            answeredQuestions.add(answeredQuestion);
        }

        long surveyId = (int) data.get("surveyId");
        Survey survey = surveyRepository.findById(surveyId).orElse(null);
        long clientId = (int) data.get("clientId");
        Client client = clientRepository.findById(clientId).orElse(null);
        AnsweredSurvey answeredSurvey = new AnsweredSurvey();
        answeredSurvey.setSurvey(survey);
        for (AnsweredQuestion answeredQuestion : answeredQuestions) {
            answeredQuestion.setAnsweredSurvey(answeredSurvey);
        }
        answeredSurvey.setAnsweredQuestions(new HashSet<>(answeredQuestions));
        answeredSurvey.setClient(client);
        return answeredSurvey;
    }

    private Set<SurveyQuestionOption> parseSurveyQuestionOptions(List<Map<String, Object>> list) {
        Set<SurveyQuestionOption> surveyQuestionOptionSet = new HashSet<>();
        for (Map<String, Object> optionMap : list) {
            SurveyQuestionOption surveyQuestionOption = parseSurveyQuestionOption(optionMap);
            surveyQuestionOptionSet.add(surveyQuestionOption);
        }
        return surveyQuestionOptionSet;
    }

    private SurveyQuestionOption parseSurveyQuestionOption(Map<String, Object> map) {
        long optionId = (int) map.get("id");
        Optional<SurveyQuestionOption> surveyQuestionOptionOptional = surveyQuestionOptionRepository.findById(optionId);
        return surveyQuestionOptionOptional.orElse(null);
    }

    private SurveyQuestionOption getOptionById(Long id) {
        Optional<SurveyQuestionOption> optionOptional = surveyQuestionOptionRepository.findById(id);
        return optionOptional.orElse(null);
    }
}
