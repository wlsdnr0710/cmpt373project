package com.earth.cbr.services.survey;

import com.alibaba.fastjson.JSONObject;
import com.earth.cbr.models.survey.AnsweredQuestion;
import com.earth.cbr.models.survey.SurveyQuestion;

public interface AnsweredQuestionParser {
    AnsweredQuestion parse(JSONObject questionJSON, SurveyQuestion surveyQuestion);
}
