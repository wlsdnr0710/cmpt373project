package com.earth.cbr.services.survey;

import com.alibaba.fastjson.JSONObject;
import com.earth.cbr.models.survey.AnsweredQuestion;
import com.earth.cbr.models.survey.SurveyQuestion;
import com.earth.cbr.models.survey.SurveyQuestionOption;
import com.earth.cbr.repositories.SurveyQuestionOptionRepository;

import java.util.Optional;

public class DropdownAnsweredQuestionParser implements AnsweredQuestionParser {

    private SurveyQuestionOptionRepository surveyQuestionOptionRepository;

    public DropdownAnsweredQuestionParser(SurveyQuestionOptionRepository surveyQuestionOptionRepository) {
        this.surveyQuestionOptionRepository = surveyQuestionOptionRepository;
    }

    @Override
    public AnsweredQuestion parse(JSONObject questionJSON, SurveyQuestion surveyQuestion) {
        long optionId = (int) questionJSON.get("value");
        SurveyQuestionOption option = getOptionById(optionId);
        return AnsweredQuestion.buildDropdown(surveyQuestion, option);
    }

    private SurveyQuestionOption getOptionById(Long id) {
        Optional<SurveyQuestionOption> optionOptional = surveyQuestionOptionRepository.findById(id);
        return optionOptional.orElse(null);
    }
}
