package com.earth.cbr.models.survey;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.util.Set;

@Entity(name = "Question")
@Table(name = "question")
public class SurveyQuestion {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @JsonIgnore
    @ManyToOne(optional = false, cascade = CascadeType.PERSIST, fetch = FetchType.LAZY)
    @JoinColumn(name = "survey_id", referencedColumnName = "id")
    private Survey survey;

    @Column(
            name = "name",
            columnDefinition = "TEXT"
    )
    @NotBlank(message = "Question name is mandatory")
    private String name;

    @Column(
            name = "type",
            columnDefinition = "ENUM"
    )
    @NotNull(message = "Survey question type cannot be null")
    @Enumerated(EnumType.STRING)
    private SurveyQuestionType type;

    @JsonIgnore
    @OneToMany(mappedBy = "surveyQuestion")
    private Set<SurveyQuestionOption> options;

    @Column(
            name = "is_required",
            columnDefinition = "BOOLEAN"
    )
    @NotBlank(message = "Is survey question required is mandatory")
    private Boolean isRequired;

    public SurveyQuestion() {
    }

    public SurveyQuestion(
            Long id,
            Survey survey,
            @NotBlank(message = "Question name is mandatory") String name,
            @NotNull(message = "Survey question type cannot be null") SurveyQuestionType type,
            Set<SurveyQuestionOption> options,
            @NotBlank(message = "Is survey question required is mandatory") Boolean isRequired
    ) {
        this.id = id;
        this.survey = survey;
        this.name = name;
        this.type = type;
        this.options = options;
        this.isRequired = isRequired;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Survey getSurvey() {
        return survey;
    }

    public void setSurvey(Survey survey) {
        this.survey = survey;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public SurveyQuestionType getType() {
        return type;
    }

    public void setType(SurveyQuestionType type) {
        this.type = type;
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
