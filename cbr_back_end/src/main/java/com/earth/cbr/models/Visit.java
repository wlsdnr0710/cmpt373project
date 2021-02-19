package com.earth.cbr.models;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.util.Date;

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
    private int consent;

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
            columnDefinition = "TEXT"
    )
    private String zone;

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
            name = "client_id",
            columnDefinition = "INT"
    )
    @NotNull(message = "Village number cannot be null")
    private Integer clientId;

    public Visit() {

    }

    public Visit(Integer consent, Date date, String cbrWorkerName, String purpose, String zone, Integer villageNumber,
                 String healthGoalProgress, String healthOutcome, Integer clientId) {
        this.consent = consent;
        this.date = date;
        this.cbrWorkerName = cbrWorkerName;
        this.purpose = purpose;
        this.zone = zone;
        this.villageNumber = villageNumber;
        this.healthGoalProgress = healthGoalProgress;
        this.healthOutcome = healthOutcome;
        this.clientId = clientId;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public int getConsent() {
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

    public String getZone() {
        return zone;
    }

    public void setZone(String zone) {
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

    public Integer getClientId() {
        return clientId;
    }

    public void setClientId(Integer clientId) {
        this.clientId = clientId;
    }
}
