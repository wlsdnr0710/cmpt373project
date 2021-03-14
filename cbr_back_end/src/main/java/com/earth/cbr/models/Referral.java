package com.earth.cbr.models;

import com.earth.cbr.models.validation.UniqueRequiredServicesID;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;

@Entity(name = "Referral")
@Table(name = "referral")
public class Referral {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column (
            name = "client_id",
            columnDefinition = "INT"
    )
    private Long clientId;

    @Column (
            name = "photo",
            columnDefinition = "BOOLEAN"
    )
    private String photo;

    @Column (
            name = "hip_width_in_inches",
            columnDefinition = "DECIMAL(4,2)"
    )
    @Positive(message = "Hip width must be positive")
    private float hipWidthInInches;

    @Column (
            name = "is_intermediate_user",
            columnDefinition = "BOOLEAN"
    )
    private Boolean isIntermediateUser;

    @Column (
            name = "has_existing_wheelchair",
            columnDefinition = "BOOLEAN"
    )
    private Boolean hasExistingWheelchair;

    @Column (
            name = "does_require_repairs",
            columnDefinition = "BOOLEAN"
    )
    private Boolean doesRequireRepairs;

    @Column (
            name = "is_below_knee",
            columnDefinition = "BOOLEAN"
    )
    private Boolean isBelowKnee;

    @Column (
            name = "is_below_elbow",
            columnDefinition = "BOOLEAN"
    )
    private Boolean isBelowElbow;

    @Column (
            name = "refer_to",
            columnDefinition = "TEXT"
    )
    private String referTo;

    @Column (
            name = "is_resolved",
            columnDefinition = "BOOLEAN"
    )
    @NotNull(message = "Resolution status cannot be null")
    private Boolean isResolved;

    @Column (
            name = "outcome",
            columnDefinition = "TEXT"
    )
    private String outcome;

    @OneToOne(optional = false)
    @JoinColumn(name = "required_services_id", referencedColumnName = "id")
    @NotNull(message = "Required Services cannot be null")
    @UniqueRequiredServicesID(message = "Another referral is already linked to this service")
    private RequiredServices requiredServices;

    @ManyToOne
    @JoinColumn(name = "physiotherapy_id", referencedColumnName = "id")
    private Physiotherapy physiotherapy;

    public Referral() {
    }

    public Referral(Long id,
                    Long clientId,
                    String photo,
                    float hipWidthInInches,
                    Boolean isIntermediateUser,
                    Boolean hasExistingWheelchair,
                    Boolean doesRequireRepairs,
                    Boolean isBelowKnee,
                    Boolean isBelowElbow,
                    String referTo,
                    Boolean isResolved,
                    String outcome,
                    RequiredServices requiredServices,
                    Physiotherapy physiotherapy) {
        this.id = id;
        this.clientId = clientId;
        this.photo = photo;
        this.hipWidthInInches = hipWidthInInches;
        this.isIntermediateUser = isIntermediateUser;
        this.hasExistingWheelchair = hasExistingWheelchair;
        this.doesRequireRepairs = doesRequireRepairs;
        this.isBelowKnee = isBelowKnee;
        this.isBelowElbow = isBelowElbow;
        this.referTo = referTo;
        this.isResolved = isResolved;
        this.outcome = outcome;
        this.requiredServices = requiredServices;
        this.physiotherapy = physiotherapy;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getClientId() {
        return clientId;
    }

    public void setClientId(Long clientId) {
        this.clientId = clientId;
    }

    public String getPhoto() {
        return photo;
    }

    public void setPhoto(String photo) {
        this.photo = photo;
    }

    public float getHipWidthInInches() {
        return hipWidthInInches;
    }

    public void setHipWidthInInches(float hipWidthInInches) {
        this.hipWidthInInches = hipWidthInInches;
    }

    public Boolean getIntermediateUser() {
        return isIntermediateUser;
    }

    public void setIntermediateUser(Boolean intermediateUser) {
        isIntermediateUser = intermediateUser;
    }

    public Boolean getHasExistingWheelchair() {
        return hasExistingWheelchair;
    }

    public void setHasExistingWheelchair(Boolean hasExistingWheelchair) {
        this.hasExistingWheelchair = hasExistingWheelchair;
    }

    public Boolean getDoesRequireRepairs() {
        return doesRequireRepairs;
    }

    public void setDoesRequireRepairs(Boolean doesRequireRepairs) {
        this.doesRequireRepairs = doesRequireRepairs;
    }

    public Boolean getBelowKnee() {
        return isBelowKnee;
    }

    public void setBelowKnee(Boolean belowKnee) {
        isBelowKnee = belowKnee;
    }

    public Boolean getBelowElbow() {
        return isBelowElbow;
    }

    public void setBelowElbow(Boolean belowElbow) {
        isBelowElbow = belowElbow;
    }

    public String getReferTo() {
        return referTo;
    }

    public void setReferTo(String referTo) {
        this.referTo = referTo;
    }

    public Boolean getResolved() {
        return isResolved;
    }

    public void setResolved(Boolean resolved) {
        isResolved = resolved;
    }

    public String getOutcome() {
        return outcome;
    }

    public void setOutcome(String outcome) {
        this.outcome = outcome;
    }

    public RequiredServices getRequiredServices() {
        return requiredServices;
    }

    public void setRequiredServices(RequiredServices requiredServices) {
        this.requiredServices = requiredServices;
    }

    public Physiotherapy getPhysiotherapy() {
        return physiotherapy;
    }

    public void setPhysiotherapy(Physiotherapy physiotherapy) {
        this.physiotherapy = physiotherapy;
    }
}
