package com.earth.cbr.models.survey;

import com.earth.cbr.models.Client;

import javax.persistence.*;
import java.util.Set;

@Entity(name = "AnsweredSurvey")
@Table(name = "answered_survey")
public class AnsweredSurvey {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    @JoinColumn(name = "client_id", referencedColumnName = "id", nullable = false)
    private Client client;

    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    @JoinColumn(name = "survey_id", referencedColumnName = "id", nullable = false)
    private Survey survey;

    @OneToMany(mappedBy = "answeredSurvey", cascade = CascadeType.ALL, fetch = FetchType.LAZY, orphanRemoval = true)
    private Set<AnsweredQuestion> answeredQuestions;

    public AnsweredSurvey() {
    }

    public AnsweredSurvey(Long id, Client client, Survey survey, Set<AnsweredQuestion> answeredQuestions) {
        this.id = id;
        this.client = client;
        this.survey = survey;
        this.answeredQuestions = answeredQuestions;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Client getClient() {
        return client;
    }

    public void setClient(Client client) {
        this.client = client;
    }

    public Survey getSurvey() {
        return survey;
    }

    public void setSurvey(Survey survey) {
        this.survey = survey;
    }

    public Set<AnsweredQuestion> getAnsweredQuestions() {
        return answeredQuestions;
    }

    public void setAnsweredQuestions(Set<AnsweredQuestion> answeredQuestions) {
        this.answeredQuestions = answeredQuestions;
    }
}
