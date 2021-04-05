package com.earth.cbr.services;

import com.alibaba.fastjson.JSONObject;
import com.earth.cbr.models.survey.AnsweredSurvey;

public interface AnsweredSurveyService {
    AnsweredSurvey buildAnsweredSurvey(JSONObject data);
}
