package com.earth.cbr.services;

import com.alibaba.fastjson.JSONObject;
import com.earth.cbr.models.survey.AnsweredQuestion;
import com.earth.cbr.models.survey.SurveyQuestion;
import com.earth.cbr.models.survey.SurveyQuestionOption;
import com.earth.cbr.models.survey.SurveyQuestionType;
import com.earth.cbr.repositories.SurveyQuestionOptionRepository;
import com.earth.cbr.repositories.SurveyQuestionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class AnsweredSurveyServiceImpl implements AnsweredSurveyService {

    @Autowired
    private SurveyQuestionRepository surveyQuestionRepository;

    @Autowired
    private SurveyQuestionOptionRepository surveyQuestionOptionRepository;

    @Override
    public AnsweredSurveyServiceImpl buildAnsweredSurvey(JSONObject data) {
        Set<String> questionIds = data.keySet();
        List<AnsweredQuestion> answeredQuestions = new ArrayList<>();
        for (String questionIdString : questionIds) {
            JSONObject questionValueJSON = new JSONObject((Map<String, Object>) data.get(questionIdString));

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

            }
            answeredQuestions.add(answeredQuestion);
        }
        return null;
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
}
