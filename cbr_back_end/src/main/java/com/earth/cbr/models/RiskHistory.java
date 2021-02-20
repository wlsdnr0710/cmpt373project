package com.earth.cbr.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.validator.constraints.Range;
import org.springframework.data.annotation.CreatedDate;

import javax.persistence.*;
import java.util.Date;

@Entity(name = "Risk_History")
@Table(name = "risk_history")
public class RiskHistory {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @JsonIgnore
    @ManyToOne(optional = false, cascade = CascadeType.PERSIST, fetch = FetchType.LAZY)
    @JoinColumn(name = "client_id", referencedColumnName = "id")
    Client client;

    @Column(
            name = "date",
            columnDefinition = "DATE"
    )
    @CreatedDate
    private Date createdDate;

    @Column(
            name = "education_goal",
            columnDefinition = "TEXT"
    )
    private String educationGoal;

    @Column(
            name = "education_risk"
    )
    @Range(min=1, max=4)
    private Integer educationRisk;

    @Column(
            name = "education_risk_description",
            columnDefinition = "TEXT"
    )
    private String educationRiskDescription;

    @Column(
            name = "health_goal",
            columnDefinition = "TEXT"
    )
    private String healthGoal;

    @Column(
            name = "health_risk"
    )
    @Range(min=1, max=4)
    private Integer healthRisk;

    @Column(
            name = "health_risk_description",
            columnDefinition = "TEXT"
    )
    private String healthRiskDescription;

    @Column(
            name = "social_goal",
            columnDefinition = "TEXT"
    )
    private String socialGoal;

    @Column(
            name = "social_risk"
    )
    @Range(min=1, max=4)
    private Integer socialRisk;

    @Column(
            name = "social_risk_description",
            columnDefinition = "TEXT"
    )
    private String socialRiskDescription;

    public RiskHistory() {
    }

    public RiskHistory(Long id,
                       Client client,
                       Date createdDate,
                       String educationGoal,
                       Integer educationRisk,
                       String educationRiskDescription,
                       String healthGoal,
                       Integer healthRisk,
                       String healthRiskDescription,
                       String socialGoal,
                       Integer socialRisk,
                       String socialRiskDescription) {
        this.id = id;
        this.client = client;
        this.createdDate = createdDate;
        this.educationGoal = educationGoal;
        this.educationRisk = educationRisk;
        this.educationRiskDescription = educationRiskDescription;
        this.healthGoal = healthGoal;
        this.healthRisk = healthRisk;
        this.healthRiskDescription = healthRiskDescription;
        this.socialGoal = socialGoal;
        this.socialRisk = socialRisk;
        this.socialRiskDescription = socialRiskDescription;
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

    public Date getCreatedDate() {
        return createdDate;
    }

    public void setCreatedDate(Date createdDate) {
        this.createdDate = createdDate;
    }

    public String getEducationGoal() {
        return educationGoal;
    }

    public void setEducationGoal(String educationGoal) {
        this.educationGoal = educationGoal;
    }

    public Integer getEducationRisk() {
        return educationRisk;
    }

    public void setEducationRisk(Integer educationRisk) {
        this.educationRisk = educationRisk;
    }

    public String getEducationRiskDescription() {
        return educationRiskDescription;
    }

    public void setEducationRiskDescription(String educationRiskDescription) {
        this.educationRiskDescription = educationRiskDescription;
    }

    public String getHealthGoal() {
        return healthGoal;
    }

    public void setHealthGoal(String healthGoal) {
        this.healthGoal = healthGoal;
    }

    public Integer getHealthRisk() {
        return healthRisk;
    }

    public void setHealthRisk(Integer healthRisk) {
        this.healthRisk = healthRisk;
    }

    public String getHealthRiskDescription() {
        return healthRiskDescription;
    }

    public void setHealthRiskDescription(String healthRiskDescription) {
        this.healthRiskDescription = healthRiskDescription;
    }

    public String getSocialGoal() {
        return socialGoal;
    }

    public void setSocialGoal(String socialGoal) {
        this.socialGoal = socialGoal;
    }

    public Integer getSocialRisk() {
        return socialRisk;
    }

    public void setSocialRisk(Integer socialRisk) {
        this.socialRisk = socialRisk;
    }

    public String getSocialRiskDescription() {
        return socialRiskDescription;
    }

    public void setSocialRiskDescription(String socialRiskDescription) {
        this.socialRiskDescription = socialRiskDescription;
    }
}
