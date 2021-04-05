package com.earth.cbr.services.survey;

import com.alibaba.fastjson.JSONObject;
import com.earth.cbr.models.survey.AnsweredQuestion;
import com.earth.cbr.models.survey.SurveyQuestion;
import com.earth.cbr.models.survey.SurveyQuestionOption;
import com.earth.cbr.repositories.SurveyQuestionOptionRepository;

import java.util.*;

public class MultipleChoiceAnsweredQuestionParser implements AnsweredQuestionParser {

    private SurveyQuestionOptionRepository surveyQuestionOptionRepository;

    public MultipleChoiceAnsweredQuestionParser(SurveyQuestionOptionRepository surveyQuestionOptionRepository) {
        this.surveyQuestionOptionRepository = surveyQuestionOptionRepository;
    }

    @Override
    public AnsweredQuestion parse(JSONObject questionJSON, SurveyQuestion surveyQuestion) {
        List<Map<String, Object>> optionList = (List<Map<String, Object>>) questionJSON.get("value");
        Set<SurveyQuestionOption> surveyQuestionOptionSet = parseSurveyQuestionOptions(optionList);
        return AnsweredQuestion.buildMultipleChoice(surveyQuestion, surveyQuestionOptionSet);
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
