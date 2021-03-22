package com.earth.cbr.models.survey;

import java.util.Set;

public class SurveyQuestions {
    private Long id;
    private String question;
    private SurveyQuestionType questionType;
    private Set<SurveyQuestionOption> options;
    private boolean isRequired;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getQuestion() {
        return question;
    }

    public void setQuestion(String question) {
        this.question = question;
    }

    public SurveyQuestionType getQuestionType() {
        return questionType;
    }

    public void setQuestionType(SurveyQuestionType questionType) {
        this.questionType = questionType;
    }

    public Set<SurveyQuestionOption> getOptions() {
        return options;
    }

    public void setOptions(Set<SurveyQuestionOption> options) {
        this.options = options;
    }

    public boolean isRequired() {
        return isRequired;
    }

    public void setRequired(boolean required) {
        isRequired = required;
    }
}
