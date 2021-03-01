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


}
