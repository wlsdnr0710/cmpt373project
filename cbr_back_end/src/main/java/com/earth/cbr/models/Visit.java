package com.earth.cbr.models;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.util.Date;
import java.util.Set;

@Entity(name = "Visit")
@Table(name = "visit")
public class Visit {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(
            name = "consent",
            columnDefinition = "BINARY"
    )
    @NotNull(message = "Consent cannot be null")
    private Integer consent;

    @Column(
            name = "date",
            columnDefinition = "DATE"
    )
    @NotNull(message = "Date cannot be null")
    @PastOrPresent(message = "Date must be in the past or past")
    private Date date;

    @Column(
            name = "cbr_worker_name",
            columnDefinition = "TEXT"
    )
    @NotBlank(message = "CBR Worker name is mandatory")
    private String cbrWorkerName;

    @Column(
            name = "purpose",
            columnDefinition = "TEXT"
    )
    @NotBlank(message = "Purpose is mandatory")
    private String purpose;

    @Column(
            name = "zone",
            columnDefinition = "INT"
    )
    @NotNull(message = "Zone cannot be null")
    @PositiveOrZero(message = "Zone should be positive or zero")
    private Integer zone;

    @Column(
            name = "village_number",
            columnDefinition = "INT"
    )
    @NotNull(message = "Village number cannot be null")
    private Integer villageNumber;

    @Column(
            name = "health_goal_progress",
            columnDefinition = "TEXT"
    )
    @NotBlank(message = "Health goal progress is mandatory")
    private String healthGoalProgress;

    @Column(
            name = "health_outcome",
            columnDefinition = "TEXT"
    )
    private String healthOutcome;

    @Column(
            name = "social_goal_progress",
            columnDefinition = "TEXT"
    )
    @NotBlank(message = "Social goal progress is mandatory")
    private String socialGoalProgress;

    @Column(
            name = "social_outcome",
            columnDefinition = "TEXT"
    )
    private String socialOutcome;

    @Column(
            name = "education_goal_progress",
            columnDefinition = "TEXT"
    )
    @NotBlank(message = "Education goal progress is mandatory")
    private String educationGoalProgress;

    @Column(
            name = "education_outcome",
            columnDefinition = "TEXT"
    )
    private String educationOutcome;

    @Column(
            name = "client_id",
            columnDefinition = "INT"
    )
    @NotNull(message = "Village number cannot be null")
    private Long clientId;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "zone", referencedColumnName = "id", insertable = false, updatable = false)
    private Zone zoneName;

    @OneToMany(mappedBy = "visit")
    private Set<ServiceProvided> serviceProvided;

    public Visit() {

    }

    public Visit(Integer consent, Date date, String cbrWorkerName, String purpose, Integer zone, Integer villageNumber,
                 String healthGoalProgress, String healthOutcome, String socialGoalProgress, String socialOutcome,
                 String educationGoalProgress, String educationOutcome, Long clientId, Zone zoneName, Set<ServiceProvided> serviceProvided) {
        this.consent = consent;
        this.date = date;
        this.cbrWorkerName = cbrWorkerName;
        this.purpose = purpose;
        this.zone = zone;
        this.villageNumber = villageNumber;
        this.healthGoalProgress = healthGoalProgress;
        this.healthOutcome = healthOutcome;
        this.socialGoalProgress = socialGoalProgress;
        this.socialOutcome = socialOutcome;
        this.educationGoalProgress = educationGoalProgress;
        this.educationOutcome = educationOutcome;
        this.clientId = clientId;
        this.zoneName = zoneName;
        this.serviceProvided = serviceProvided;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getConsent() {
        return consent;
    }

    public void setConsent(Integer consent) {
        this.consent = consent;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public String getCbrWorkerName() {
        return cbrWorkerName;
    }

    public void setCbrWorkerName(String cbrWorkerName) {
        this.cbrWorkerName = cbrWorkerName;
    }

    public String getPurpose() {
        return purpose;
    }

    public void setPurpose(String purpose) {
        this.purpose = purpose;
    }

    public Integer getZone() {
        return zone;
    }

    public void setZone(Integer zone) {
        this.zone = zone;
    }

    public Integer getVillageNumber() {
        return villageNumber;
    }

    public void setVillageNumber(int villageNumber) {
        this.villageNumber = villageNumber;
    }

    public String getHealthGoalProgress() {
        return healthGoalProgress;
    }

    public void setHealthGoalProgress(String healthGoalProgress) {
        this.healthGoalProgress = healthGoalProgress;
    }

    public String getHealthOutcome() {
        return healthOutcome;
    }

    public void setHealthOutcome(String healthOutcome) {
        this.healthOutcome = healthOutcome;
    }

    public String getSocialGoalProgress() {
        return socialGoalProgress;
    }

    public void setSocialGoalProgress(String socialGoalProgress) {
        this.socialGoalProgress = socialGoalProgress;
    }

    public String getSocialOutcome() {
        return socialOutcome;
    }

    public void setSocialOutcome(String socialOutcome) {
        this.socialOutcome = socialOutcome;
    }

    public String getEducationGoalProgress() {
        return educationGoalProgress;
    }

    public void setEducationGoalProgress(String educationGoalProgress) {
        this.educationGoalProgress = educationGoalProgress;
    }

    public String getEducationOutcome() {
        return educationOutcome;
    }

    public void setEducationOutcome(String educationOutcome) {
        this.educationOutcome = educationOutcome;
    }

    public Long getClientId() {
        return clientId;
    }

    public void setClientId(Long clientId) {
        this.clientId = clientId;
    }

    public Zone getZoneName() {
        return zoneName;
    }

    public void setZoneName(Zone zoneName) {
        this.zoneName = zoneName;
    }

    public void setVillageNumber(Integer villageNumber) {
        this.villageNumber = villageNumber;
    }

    public Set<ServiceProvided> getServiceProvided() {
        return serviceProvided;
    }

    public void setServiceProvided(Set<ServiceProvided> serviceProvided) {
        this.serviceProvided = serviceProvided;
    }
}
