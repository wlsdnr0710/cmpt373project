package com.earth.cbr.models;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Entity(name = "Required_Services")
@Table(name = "required_services")
public class RequiredServices {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column (
            name = "is_physiotherapy",
            columnDefinition = "BOOLEAN"
    )
    @NotNull(message = "Must indicate whether physiotherapy is required")
    private Boolean isPhysiotherapy = false;

    @Column (
            name = "is_orthotic",
            columnDefinition = "BOOLEAN"
    )
    @NotNull(message = "Must indicate whether orthotic support is required")
    private Boolean isOrthotic = false;

    @Column (
            name = "is_prosthetic",
            columnDefinition = "BOOLEAN"
    )
    @NotNull(message = "Must indicate whether prosthetic support is required")
    private Boolean isProsthetic = false;

    @Column (
            name = "is_wheelchair",
            columnDefinition = "BOOLEAN"
    )
    @NotNull(message = "Must indicate whether wheelchair support is required")
    private Boolean isWheelchair = false;

    @Column (
            name = "is_other",
            columnDefinition = "BOOLEAN"
    )
    @NotNull(message = "Must indicate whether other services are required")
    private Boolean isOther = false;

    @Column (
            name = "other_description",
            columnDefinition = "TEXT"
    )
    private String otherDescription;

    @JsonIgnore
    @OneToOne(mappedBy = "requiredServices")
    private Referral referral;

    public RequiredServices() {
    }

    public RequiredServices(Long id,
                            Boolean isPhysiotherapy,
                            Boolean isOrthotic,
                            Boolean isProsthetic,
                            Boolean isWheelchair,
                            Boolean isOther,
                            String otherDescription,
                            Referral referral) {
        this.id = id;
        this.isPhysiotherapy = isPhysiotherapy;
        this.isOrthotic = isOrthotic;
        this.isProsthetic = isProsthetic;
        this.isWheelchair = isWheelchair;
        this.isOther = isOther;
        this.otherDescription = otherDescription;
        this.referral = referral;
    }

    public void includeRequiredServices(RequiredServicesEnum requiredServicesEnum) {
        switch (requiredServicesEnum) {
            case PHYSIOTHERAPY:
                isPhysiotherapy = true;
                break;
            case ORTHOTIC:
                isOrthotic = true;
                break;
            case PROSTHETIC:
                isProsthetic = true;
                break;
            case WHEELCHAIR:
                isWheelchair = true;
                break;
            case OTHER:
                isOther = true;
                break;
        }
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Boolean getPhysiotherapy() {
        return isPhysiotherapy;
    }

    public void setPhysiotherapy(Boolean physiotherapy) {
        isPhysiotherapy = physiotherapy;
    }

    public Boolean getOrthotic() {
        return isOrthotic;
    }

    public void setOrthotic(Boolean orthotic) {
        isOrthotic = orthotic;
    }

    public Boolean getProsthetic() {
        return isProsthetic;
    }

    public void setProsthetic(Boolean prosthetic) {
        isProsthetic = prosthetic;
    }

    public Boolean getWheelchair() {
        return isWheelchair;
    }

    public void setWheelchair(Boolean wheelchair) {
        isWheelchair = wheelchair;
    }

    public Boolean getOther() {
        return isOther;
    }

    public void setOther(Boolean other) {
        isOther = other;
    }

    public String getOtherDescription() {
        return otherDescription;
    }

    public void setOtherDescription(String otherDescription) {
        this.otherDescription = otherDescription;
    }

    public Referral getReferral() {
        return referral;
    }

    public void setReferral(Referral referral) {
        this.referral = referral;
    }
}
