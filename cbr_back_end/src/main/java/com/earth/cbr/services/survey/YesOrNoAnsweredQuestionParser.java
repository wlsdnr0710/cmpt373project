package com.earth.cbr.services.survey;

import com.alibaba.fastjson.JSONObject;
import com.earth.cbr.models.survey.AnsweredQuestion;
import com.earth.cbr.models.survey.SurveyQuestion;

public class YesOrNoAnsweredQuestionParser implements AnsweredQuestionParser {
    @Override
    public AnsweredQuestion parse(JSONObject questionJSON, SurveyQuestion surveyQuestion) {
        Boolean isYes = (Boolean) questionJSON.get("value");
        return AnsweredQuestion.buildYesOrNo(surveyQuestion, isYes);
    }
}
