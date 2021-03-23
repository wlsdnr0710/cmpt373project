package com.earth.cbr.models.survey;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;

@Entity(name = "QuestionOption")
@Table(name = "question_option")
public class SurveyQuestionOption {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(
            name = "name",
            columnDefinition = "TEXT"
    )
    @NotBlank(message = "Survey question option name is mandatory")
    private String name;

    @JsonIgnore
    @ManyToOne(optional = false, cascade = CascadeType.PERSIST, fetch = FetchType.LAZY)
    @JoinColumn(name = "question_id", referencedColumnName = "id")
    private SurveyQuestion surveyQuestion;

    public SurveyQuestionOption() {
    }

    public SurveyQuestionOption(
            Long id,
            @NotBlank(message = "Survey question option name is mandatory") String name,
            SurveyQuestion surveyQuestion
    ) {
        this.id = id;
        this.name = name;
        this.surveyQuestion = surveyQuestion;
    }

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

    public SurveyQuestion getSurveyQuestion() {
        return surveyQuestion;
    }

    public void setSurveyQuestion(SurveyQuestion surveyQuestion) {
        this.surveyQuestion = surveyQuestion;
    }
}
