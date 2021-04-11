package com.earth.cbr.models;

import com.earth.cbr.context.SpringContext;
import com.earth.cbr.repositories.ClientRepository;
import com.earth.cbr.repositories.PhysiotherapyRepository;
import com.earth.cbr.repositories.WorkerRepository;

import java.sql.Date;

public class ReferralAdapterImpl implements ReferralAdapter {

    private PhysiotherapyRepository physiotherapyRepository;
    private ClientRepository clientRepository;
    private WorkerRepository workerRepository;

    private Long workerId;
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
    private Boolean isResolved;
    private String outcome;
    private Referral.ReferTo referTo;

    private Referral referral = new Referral();

    public ReferralAdapterImpl() {
        physiotherapyRepository = SpringContext.getBean(PhysiotherapyRepository.class);
        clientRepository = SpringContext.getBean(ClientRepository.class);
        workerRepository = SpringContext.getBean(WorkerRepository.class);
    }

    @Override
    public Referral buildReferral() {
        setReferralFields(referral);
        return referral;
    }

    private Referral setReferralFields(Referral referral) {
        RequiredServices requiredServices = buildRequiredServices();
        referral.setRequiredServices(requiredServices);
        referral.setClientId(clientId);
        referral.setWorkerId(workerId);
        referral.setHipWidthInInches(hipWidthInInches);
        referral.setIntermediateUserByWheelchairUserType(wheelchairUserType);
        referral.setHasExistingWheelchair(doTheyHaveExistingWheelchair);
        referral.setDoesRequireRepairs(canExistingWheelchairRepaired);
        referral.setProstheticCondition(prostheticCondition);
        referral.setOrthoticCondition(orthoticCondition);
        referral.setPhysiotherapy(physiotherapyRepository.findById(physiotherapyCondition).orElse(null));
        referral.setClient(clientRepository.findById(clientId).orElse(null));
        referral.setResolved(isResolved);
        referral.setOutcome(outcome);
        referral.setReferTo(referTo);
        referral.setWorker(workerRepository.findById(workerId).orElse(null));
        referral.setDate(new Date(System.currentTimeMillis()));
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

    public Long getWorkerId() {
        return workerId;
    }

    public void setWorkerId(Long workerId) {
        this.workerId = workerId;
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

    public Boolean getResolved() {
        return isResolved;
    }

    public void setResolved(Boolean resolved) {
        isResolved = resolved;
    }

    public Referral.ReferTo getReferTo() {
        return referTo;
    }

    public void setReferTo(Referral.ReferTo referTo) {
        this.referTo = referTo;
    }

    public String getOutcome() {
        return outcome;
    }

    public void setOutcome(String outcome) {
        this.outcome = outcome;
    }
}
