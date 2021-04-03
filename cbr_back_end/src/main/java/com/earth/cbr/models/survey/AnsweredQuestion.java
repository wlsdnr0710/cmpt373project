package com.earth.cbr.models.survey;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.Set;

@Entity(name = "AnsweredQuestion")
@Table(name = "answered_question")
public class AnsweredQuestion {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @JsonIgnore
    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    @JoinColumn(name = "answered_survey_id", referencedColumnName = "id", nullable = false)
    private AnsweredSurvey answeredSurvey;

    @ManyToOne
    private SurveyQuestion question;

    @ManyToMany
    private Set<SurveyQuestionOption> options;

    @Column(
            name = "written_answer",
            columnDefinition = "TEXT",
            nullable = true
    )
    private String writtenAnswer;

    public AnsweredQuestion() {
    }

    public AnsweredQuestion(
            Long id,
            AnsweredSurvey answeredSurvey,
            SurveyQuestion question,
            Set<SurveyQuestionOption> options,
            String writtenAnswer) {
        this.id = id;
        this.answeredSurvey = answeredSurvey;
        this.question = question;
        this.options = options;
        this.writtenAnswer = writtenAnswer;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public AnsweredSurvey getAnsweredSurvey() {
        return answeredSurvey;
    }

    public void setAnsweredSurvey(AnsweredSurvey answeredSurvey) {
        this.answeredSurvey = answeredSurvey;
    }

    public SurveyQuestion getQuestion() {
        return question;
    }

    public void setQuestion(SurveyQuestion question) {
        this.question = question;
    }

    public Set<SurveyQuestionOption> getOptions() {
        return options;
    }

    public void setOptions(Set<SurveyQuestionOption> options) {
        this.options = options;
    }

    public String getWrittenAnswer() {
        return writtenAnswer;
    }

    public void setWrittenAnswer(String writtenAnswer) {
        this.writtenAnswer = writtenAnswer;
    }
}
