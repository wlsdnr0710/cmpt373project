package com.earth.cbr.models.survey;

import java.util.Set;

public class Survey {
    private Long id;
    private String name;
    private Set<SurveyQuestions> questions;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Set<SurveyQuestions> getQuestions() {
        return questions;
    }

    public void setQuestions(Set<SurveyQuestions> questions) {
        this.questions = questions;
    }
}
