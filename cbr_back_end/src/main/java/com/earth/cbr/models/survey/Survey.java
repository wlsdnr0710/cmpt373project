package com.earth.cbr.models.survey;

import java.util.Set;

public class Survey {
    private String name;
    private Set<SurveyQuestions> surveyQuestions;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Set<SurveyQuestions> getSurveyQuestions() {
        return surveyQuestions;
    }

    public void setSurveyQuestions(Set<SurveyQuestions> surveyQuestions) {
        this.surveyQuestions = surveyQuestions;
    }
}
