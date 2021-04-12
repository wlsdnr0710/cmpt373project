package com.earth.cbr.services.survey;

import com.alibaba.fastjson.JSONObject;
import com.earth.cbr.models.survey.AnsweredSurvey;

import java.util.List;

public interface AnsweredSurveyService {
    AnsweredSurvey getAnsweredSurveyById(Long id);
    List<AnsweredSurvey> getAnsweredSurveysByClientId(Long id);
    AnsweredSurvey addAnsweredSurvey(AnsweredSurvey answeredSurvey);
    AnsweredSurvey buildAnsweredSurvey(JSONObject data);
    void deleteAnsweredSurveyById(Long id);
}
