package com.earth.cbr.models;

import com.earth.cbr.context.SpringContext;
import com.earth.cbr.repositories.PhysiotherapyRepository;
import org.springframework.beans.factory.annotation.Autowired;

public class ReferralAdapterImpl implements ReferralAdapter {

    private PhysiotherapyRepository physiotherapyRepository;

    private Long clientId;
    private RequiredServicesEnum[] requiredServices;
    private String requiredServiceOtherDescription;
    private Float hipWidthInInches;
    private WheelchairUserType wheelchairUserType;
    private Boolean doTheyHaveExistingWheelchair;
    private Boolean canExistingWheelchairRepaired;
    private ProstheticConditionEnum prostheticCondition;
    private OrthoticConditionEnum orthoticCondition;
    private Long physiotherapyCondition;
    private Integer physiotherapyConditionOtherDesc;

    private Referral referral = new Referral();

    public ReferralAdapterImpl() {
        physiotherapyRepository = SpringContext.getBean(PhysiotherapyRepository.class);
    }

    @Override
    public Referral buildReferral() {
        RequiredServices requiredServices = buildRequiredServices();
        referral.setRequiredServices(requiredServices);
        referral.setClientId(clientId);
        referral.setHipWidthInInches(hipWidthInInches);
        referral.setIntermediateUserByWheelchairUserType(wheelchairUserType);
        referral.setHasExistingWheelchair(doTheyHaveExistingWheelchair);
        referral.setDoesRequireRepairs(canExistingWheelchairRepaired);
        referral.setProstheticCondition(prostheticCondition);
        referral.setOrthoticCondition(orthoticCondition);
        referral.setPhysiotherapy(physiotherapyRepository.findById(physiotherapyCondition).orElse(null));

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

    public ProstheticConditionEnum getProstheticCondition() {
        return prostheticCondition;
    }

    public void setProstheticCondition(ProstheticConditionEnum prostheticCondition) {
        this.prostheticCondition = prostheticCondition;
    }

    public OrthoticConditionEnum getOrthoticCondition() {
        return orthoticCondition;
    }

    public void setOrthoticCondition(OrthoticConditionEnum orthoticCondition) {
        this.orthoticCondition = orthoticCondition;
    }

    public Long getPhysiotherapyCondition() {
        return physiotherapyCondition;
    }

    public void setPhysiotherapyCondition(Long physiotherapyCondition) {
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
