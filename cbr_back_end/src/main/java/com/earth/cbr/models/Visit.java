package com.earth.cbr.models;

import javax.persistence.*;
import java.sql.Date;
import javax.validation.constraints.*;


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
    @PastOrPresent(message = "Date must be in the past or present")
    @NotBlank(message = "Date is mandatory")
    private Date date;

    @Column(
            name = "cbr_worker_name",
            columnDefinition = "TEXT"
    )
    @NotBlank(message = "CBR worker name is mandatory")
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
    private int villageNumber;

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

    public Visit() {

    }

    public Visit(int consent, Date date, String cbrWorkerName, String purpose, String zone, int villageNumber, String healthGoalProgress, String healthOutcome) {
        this.consent = consent;
        this.date = date;
        this.cbrWorkerName = cbrWorkerName;
        this.purpose = purpose;
        this.zone = zone;
        this.villageNumber = villageNumber;
        this.healthGoalProgress = healthGoalProgress;
        this.healthOutcome = healthOutcome;
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

    public void setConsent(int consent) {
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

    public int getVillageNumber() {
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
}
