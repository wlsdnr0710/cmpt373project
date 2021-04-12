package com.earth.cbr.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.validator.constraints.Range;
import org.springframework.data.annotation.CreatedDate;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

import java.util.Date;

@Entity(name = "Risk_History")
@Table(name = "risk_history")
public class RiskHistory {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @JsonIgnore
    @ManyToOne(optional = false, cascade = CascadeType.PERSIST, fetch = FetchType.LAZY)
    @JoinColumn(name = "client_id", referencedColumnName = "id", insertable = false, updatable = false)
    private Client client;

    @Column(
            name = "date",
            columnDefinition = "DATE"
    )
    @CreatedDate
    private Date createdDate;

    @Column(
            name = "client_id",
            columnDefinition = "INT"
    )
    @NotNull(message = "client ID is mandatory")
    private Long clientId;

    @Column(
            name = "education_risk",
            columnDefinition = "INT"
    )
    @Range(min=1, max=4)
    private Integer educationRisk;

    @Column(
            name = "education_risk_description",
            columnDefinition = "TEXT"
    )
    @NotBlank(message = "Education Risk Description is mandatory")
    private String educationRiskDescription;

    @Column(
            name = "health_risk",
            columnDefinition = "INT"
    )
    @Range(min=1, max=4)
    private Integer healthRisk;

    @Column(
            name = "health_risk_description",
            columnDefinition = "TEXT"
    )
    @NotBlank(message = "Health Risk Description is mandatory")
    private String healthRiskDescription;

    @Column(
            name = "social_risk",
            columnDefinition = "INT"
    )
    @Range(min=1, max=4)
    private Integer socialRisk;

    @Column(
            name = "social_risk_description",
            columnDefinition = "TEXT"
    )
    @NotBlank(message = "Social Risk Description is mandatory")
    private String socialRiskDescription;

    @Transient
    private Integer riskSum;

    public RiskHistory() {

    }

    public RiskHistory(Long id,
                       Long clientId,
                       Client client,
                       Date createdDate,
                       Integer educationRisk,
                       String educationRiskDescription,
                       Integer healthRisk,
                       String healthRiskDescription,
                       Integer socialRisk,
                       String socialRiskDescription) {
        this.id = id;
        this.clientId = clientId;
        this.client = client;
        this.createdDate = createdDate;
        this.educationRisk = educationRisk;
        this.educationRiskDescription = educationRiskDescription;
        this.healthRisk = healthRisk;
        this.healthRiskDescription = healthRiskDescription;
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

    public Long getClientId() {
        return clientId;
    }

    public void setClientId(Long clientId) {
        this.clientId = clientId;
    }

    public Date getCreatedDate() {
        return createdDate;
    }

    public void setCreatedDate(Date createdDate) {
        this.createdDate = createdDate;
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

    public Integer getRiskSum() {
        return healthRisk + socialRisk + educationRisk;
    }
}
