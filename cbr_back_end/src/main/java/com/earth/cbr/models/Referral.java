package com.earth.cbr.models;

import javax.persistence.*;

@Entity(name = "Referral")
@Table(name = "referral")
public class Referral {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column (
            name = "wheelchair_photo",
            columnDefinition = "BOOLEAN"
    )
    private String wheelchairPhoto;

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

    public Referral() {
    }

    public Referral(Long id, String wheelchairPhoto, Boolean isIntermediateUser, Boolean hasExistingWheelchair, Boolean doesRequireRepairs, Boolean isBelowKnee, Boolean isBelowElbow) {
        this.id = id;
        this.wheelchairPhoto = wheelchairPhoto;
        this.isIntermediateUser = isIntermediateUser;
        this.hasExistingWheelchair = hasExistingWheelchair;
        this.doesRequireRepairs = doesRequireRepairs;
        this.isBelowKnee = isBelowKnee;
        this.isBelowElbow = isBelowElbow;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getWheelchairPhoto() {
        return wheelchairPhoto;
    }

    public void setWheelchairPhoto(String wheelchairPhoto) {
        this.wheelchairPhoto = wheelchairPhoto;
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
}
