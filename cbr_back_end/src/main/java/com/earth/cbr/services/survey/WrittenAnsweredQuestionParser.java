package com.earth.cbr.services.survey;

import com.alibaba.fastjson.JSONObject;
import com.earth.cbr.models.survey.AnsweredQuestion;
import com.earth.cbr.models.survey.SurveyQuestion;

public class WrittenAnsweredQuestionParser implements AnsweredQuestionParser {
    @Override
    public AnsweredQuestion parse(JSONObject questionJSON, SurveyQuestion surveyQuestion) {
        String writtenAnswer = (String) questionJSON.get("value");
        return AnsweredQuestion.buildWrittenAnswer(surveyQuestion, writtenAnswer);
    }
}
