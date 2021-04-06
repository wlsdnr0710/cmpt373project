package com.earth.cbr.models;

public class ReferralAdapterImpl implements ReferralAdapter {

    private RequiredServicesEnum[] requiredServices;
    private String requiredServiceOtherDescription;
    private Integer hipWidthInInches;
    private Integer userType;
    private Boolean doTheyHaveExistingWheelchair;
    private Boolean canExistingWheelchairRepaired;
    private Integer prostheticCondition;
    private Integer orthoticCondition;
    private Integer physiotherapyCondition;
    private Integer physiotherapyConditionOtherDesc;

    private Referral referral = new Referral();

    @Override
    public Referral buildReferral() {
        RequiredServices requiredServices = buildRequiredServices();


        return referral;
    }

    private RequiredServices buildRequiredServices() {
        RequiredServices requiredServices = new RequiredServices();
        requiredServices = includeRequiredServices(requiredServices);
        requiredServices.setOtherDescription(requiredServiceOtherDescription);
        return requiredServices;
    }

    private RequiredServices includeRequiredServices(RequiredServices requiredServices) {
        for (RequiredServicesEnum service : this.requiredServices) {
            requiredServices.includeRequiredServices(service);
        }
        return requiredServices;
    }

    public RequiredServicesEnum[] getRequiredServices() {
        return requiredServices;
    }

    public void setRequiredServices(RequiredServicesEnum[] requiredServices) {
        this.requiredServices = requiredServices;
    }

    public String getRequiredServiceOtherDescription() {
        return requiredServiceOtherDescription;
    }

    public void setRequiredServiceOtherDescription(String requiredServiceOtherDescription) {
        this.requiredServiceOtherDescription = requiredServiceOtherDescription;
    }

    public Integer getHipWidthInInches() {
        return hipWidthInInches;
    }

    public void setHipWidthInInches(Integer hipWidthInInches) {
        this.hipWidthInInches = hipWidthInInches;
    }

    public Integer getUserType() {
        return userType;
    }

    public void setUserType(Integer userType) {
        this.userType = userType;
    }

    public Boolean getDoTheyHaveExistingWheelchair() {
        return doTheyHaveExistingWheelchair;
    }

    public void setDoTheyHaveExistingWheelchair(Boolean doTheyHaveExistingWheelchair) {
        this.doTheyHaveExistingWheelchair = doTheyHaveExistingWheelchair;
    }

    public Boolean getCanExistingWheelchairRepaired() {
        return canExistingWheelchairRepaired;
    }

    public void setCanExistingWheelchairRepaired(Boolean canExistingWheelchairRepaired) {
        this.canExistingWheelchairRepaired = canExistingWheelchairRepaired;
    }

    public Integer getProstheticCondition() {
        return prostheticCondition;
    }

    public void setProstheticCondition(Integer prostheticCondition) {
        this.prostheticCondition = prostheticCondition;
    }

    public Integer getOrthoticCondition() {
        return orthoticCondition;
    }

    public void setOrthoticCondition(Integer orthoticCondition) {
        this.orthoticCondition = orthoticCondition;
    }

    public Integer getPhysiotherapyCondition() {
        return physiotherapyCondition;
    }

    public void setPhysiotherapyCondition(Integer physiotherapyCondition) {
        this.physiotherapyCondition = physiotherapyCondition;
    }

    public Integer getPhysiotherapyConditionOtherDesc() {
        return physiotherapyConditionOtherDesc;
    }

    public void setPhysiotherapyConditionOtherDesc(Integer physiotherapyConditionOtherDesc) {
        this.physiotherapyConditionOtherDesc = physiotherapyConditionOtherDesc;
    }

    public Referral getReferral() {
        return referral;
    }

    public void setReferral(Referral referral) {
        this.referral = referral;
    }
}
