package com.earth.cbr.models;

import javax.persistence.*;

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
    private Boolean isPhysiotherapy;

    @Column (
            name = "is_orthotic",
            columnDefinition = "BOOLEAN"
    )
    private Boolean isOrthotic;

    @Column (
            name = "is_prosthetic",
            columnDefinition = "BOOLEAN"
    )
    private Boolean isProsthetic;

    @Column (
            name = "is_wheelchair",
            columnDefinition = "BOOLEAN"
    )
    private Boolean isWheelchair;

    @Column (
            name = "is_other",
            columnDefinition = "BOOLEAN"
    )
    private Boolean isOther;

    @Column (
            name = "other_description",
            columnDefinition = "TEXT"
    )
    private String otherDescription;

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
