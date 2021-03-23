package com.earth.cbr.models.survey;

import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.util.Set;

@Entity(name = "Survey")
@Table(name = "survey")
public class Survey {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(
            name = "name",
            columnDefinition = "TEXT"
    )
    @NotBlank(message = "Survey name is mandatory")
    private String name;

    @OneToMany(mappedBy = "survey")
    private Set<SurveyQuestion> questions;

    public Survey() {
    }

    public Survey(Long id, @NotBlank(message = "Survey name is mandatory") String name, Set<SurveyQuestion> questions) {
        this.id = id;
        this.name = name;
        this.questions = questions;
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

    public Set<SurveyQuestion> getQuestions() {
        return questions;
    }

    public void setQuestions(Set<SurveyQuestion> questions) {
        this.questions = questions;
    }
}
