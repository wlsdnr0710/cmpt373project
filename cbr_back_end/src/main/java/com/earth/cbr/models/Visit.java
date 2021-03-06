package com.earth.cbr.models;

import org.hibernate.validator.constraints.Range;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.util.Date;
import java.util.Set;

@Entity(name = "Visit")
@Table(name = "visit")
public class Visit {

    private enum Progress {
        CANCELLED,
        ONGOING,
        CONCLUDED
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(
            name = "consent",
            columnDefinition = "BINARY"
    )
    @NotNull(message = "Consent is mandatory")
    private Integer consent;

    @Column(
            name = "date",
            columnDefinition = "DATE"
    )
    @NotNull(message = "Date is mandatory")
    @PastOrPresent(message = "Date must be in the past or past")
    private Date date;

    @Column(
            name = "cbr_worker_name",
            columnDefinition = "TEXT"
    )
    @NotBlank(message = "CBR Worker name is mandatory")
    private String cbrWorkerName;

    @Column(
            name = "latitude",
            columnDefinition = "DECIMAL(8, 6)"
    )
    @Range(min = -90, max = 90)
    private Double latitude;

    @Column(
            name = "longitude",
            columnDefinition = "DECIMAL(9, 6)"
    )
    @Range(min = -180, max = 180)
    private Double longitude;

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
    @NotNull(message = "Zone is mandatory")
    @PositiveOrZero(message = "Zone should be positive or zero")
    private Integer zone;

    @Column(
            name = "village_number",
            columnDefinition = "INT"
    )
    @NotNull(message = "Village number is mandatory")
    @PositiveOrZero(message = "Village Number should be positive or zero")
    private Integer villageNumber;

    @Column(
            name = "health_goal_progress",
            columnDefinition = "ENUM"
    )
    @NotNull(message = "Health goal progress is mandatory")
    @Enumerated(EnumType.STRING)
    private Progress healthGoalProgress;

    @Column(
            name = "health_outcome",
            columnDefinition = "TEXT"
    )
    private String healthOutcome;

    @Column(
            name = "social_goal_progress",
            columnDefinition = "ENUM"
    )
    @NotNull(message = "Social goal progress is mandatory")
    @Enumerated(EnumType.STRING)
    private Progress socialGoalProgress;

    @Column(
            name = "social_outcome",
            columnDefinition = "TEXT"
    )
    private String socialOutcome;

    @Column(
            name = "education_goal_progress",
            columnDefinition = "ENUM"
    )
    @NotNull(message = "Education goal progress is mandatory")
    @Enumerated(EnumType.STRING)
    private Progress educationGoalProgress;

    @Column(
            name = "education_outcome",
            columnDefinition = "TEXT"
    )
    private String educationOutcome;

    @Column(
            name = "client_id",
            columnDefinition = "INT"
    )
    @NotNull(message = "Client ID is mandatory")
    @PositiveOrZero(message = "Client ID should be positive or zero")
    private Long clientId;

    @Column(
            name = "worker_id",
            columnDefinition = "INT"
    )
    @NotNull(message = "Worker ID is mandatory")
    @PositiveOrZero(message = "Worker ID should be positive or zero")
    private Long workerId;

    @OneToOne
    @JoinColumn(name = "zone", referencedColumnName = "id", insertable = false, updatable = false)
    private Zone zoneName;

    @OneToMany(mappedBy = "visit")
    private Set<ServiceDescription> serviceDescription;

    public Visit() {

    }

    public Visit(Integer consent,
                 Date date,
                 String cbrWorkerName,
                 Double latitude,
                 Double longitude,
                 String purpose,
                 Integer zone,
                 Integer villageNumber,
                 Progress healthGoalProgress,
                 String healthOutcome,
                 Progress socialGoalProgress,
                 String socialOutcome,
                 Progress educationGoalProgress,
                 String educationOutcome,
                 Long clientId,
                 Long workerId,
                 Zone zoneName,
                 Set<ServiceDescription> serviceDescription) {
        this.consent = consent;
        this.date = date;
        this.cbrWorkerName = cbrWorkerName;
        this.latitude = latitude;
        this.longitude = longitude;
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
        this.workerId = workerId;
        this.zoneName = zoneName;
        this.serviceDescription = serviceDescription;
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

    public Double getLatitude() {
        return latitude;
    }

    public void setLatitude(Double latitude) {
        this.latitude = latitude;
    }

    public Double getLongitude() {
        return longitude;
    }

    public void setLongitude(Double longitude) {
        this.longitude = longitude;
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

    public Progress getHealthGoalProgress() {
        return healthGoalProgress;
    }

    public void setHealthGoalProgress(Progress healthGoalProgress) {
        this.healthGoalProgress = healthGoalProgress;
    }

    public String getHealthOutcome() {
        return healthOutcome;
    }

    public void setHealthOutcome(String healthOutcome) {
        this.healthOutcome = healthOutcome;
    }

    public Progress getSocialGoalProgress() {
        return socialGoalProgress;
    }

    public void setSocialGoalProgress(Progress socialGoalProgress) {
        this.socialGoalProgress = socialGoalProgress;
    }

    public String getSocialOutcome() {
        return socialOutcome;
    }

    public void setSocialOutcome(String socialOutcome) {
        this.socialOutcome = socialOutcome;
    }

    public Progress getEducationGoalProgress() {
        return educationGoalProgress;
    }

    public void setEducationGoalProgress(Progress educationGoalProgress) {
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

    public Long getWorkerId() {
        return workerId;
    }

    public void setWorkerId(Long workerId) {
        this.workerId = workerId;
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

    public Set<ServiceDescription> getServiceDescription() {
        return serviceDescription;
    }

    public void setServiceDescription(Set<ServiceDescription> serviceDescription) {
        this.serviceDescription = serviceDescription;
    }
}
