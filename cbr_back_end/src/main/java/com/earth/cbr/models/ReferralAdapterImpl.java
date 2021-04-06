package com.earth.cbr.models;

public class ReferralAdapterImpl implements ReferralAdapter {

    private Long clientId;
    private RequiredServicesEnum[] requiredServices;
    private String requiredServiceOtherDescription;
    private Float hipWidthInInches;
    private WheelchairUserType wheelchairUserType;
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
        referral.setRequiredServices(requiredServices);
        referral.setClientId(clientId);
        referral.setHipWidthInInches(hipWidthInInches);
        referral.setIntermediateUserByWheelchairUserType(wheelchairUserType);
        referral.setHasExistingWheelchair(doTheyHaveExistingWheelchair);

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

    public Long getClientId() {
        return clientId;
    }

    public void setClientId(Long clientId) {
        this.clientId = clientId;
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

    public Float getHipWidthInInches() {
        return hipWidthInInches;
    }

    public void setHipWidthInInches(Float hipWidthInInches) {
        this.hipWidthInInches = hipWidthInInches;
    }

    public WheelchairUserType getWheelchairUserType() {
        return wheelchairUserType;
    }

    public void setWheelchairUserType(WheelchairUserType wheelchairUserType) {
        this.wheelchairUserType = wheelchairUserType;
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
