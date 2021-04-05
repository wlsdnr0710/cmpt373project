package com.earth.cbr.models.survey;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.HashSet;
import java.util.List;
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
    private Set<SurveyQuestionOption> options = new HashSet<>();

    @Column(
            name = "written_answer",
            columnDefinition = "TEXT",
            nullable = true
    )
    private String writtenAnswer;

    @Column(
            name = "is_true",
            columnDefinition = "BOOLEAN",
            nullable = true
    )
    private Boolean isTrue;

    public AnsweredQuestion() {
    }

    public AnsweredQuestion(
            Long id,
            AnsweredSurvey answeredSurvey,
            SurveyQuestion question,
            Set<SurveyQuestionOption> options,
            String writtenAnswer,
            Boolean isTrue) {
        this.id = id;
        this.answeredSurvey = answeredSurvey;
        this.question = question;
        this.options = options;
        this.writtenAnswer = writtenAnswer;
        this.isTrue = isTrue;
    }

    public static AnsweredQuestion buildYesOrNo(
            SurveyQuestion question,
            Boolean isTrue
    ) {
        AnsweredQuestion answeredQuestion = new AnsweredQuestion();
        answeredQuestion.setQuestion(question);
        answeredQuestion.setIsTrue(isTrue);
        return answeredQuestion;
    }

    public static AnsweredQuestion buildMultipleChoice(
            SurveyQuestion question,
            Set<SurveyQuestionOption> options
    ) {
        AnsweredQuestion answeredQuestion = new AnsweredQuestion();
        answeredQuestion.setQuestion(question);
        answeredQuestion.setOptions(options);
        return answeredQuestion;
    }

    public static AnsweredQuestion buildDropdown(
            SurveyQuestion question,
            SurveyQuestionOption option
    ) {
        AnsweredQuestion answeredQuestion = new AnsweredQuestion();
        answeredQuestion.setQuestion(question);
        answeredQuestion.addOption(option);
        return answeredQuestion;
    }

    public static AnsweredQuestion buildWrittenAnswer(
            SurveyQuestion question,
            String writtenAnswer
    ) {
        AnsweredQuestion answeredQuestion = new AnsweredQuestion();
        answeredQuestion.setQuestion(question);
        answeredQuestion.setWrittenAnswer(writtenAnswer);
        return answeredQuestion;
    }

    public void addOption(SurveyQuestionOption option) {
        options.add(option);
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

    public Boolean getIsTrue() {
        return isTrue;
    }

    public void setIsTrue(Boolean isTrue) {
        this.isTrue = isTrue;
    }
}
