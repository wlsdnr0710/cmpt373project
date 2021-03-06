package com.earth.cbr.models;

import com.earth.cbr.models.validation.UniqueRequiredServicesID;
import org.springframework.data.annotation.CreatedDate;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;
import java.sql.Date;

@Entity(name = "Referral")
@Table(name = "referral")
public class Referral {

    public enum ReferTo {
        DISABILITY_CENTRE,
        MOBILE_CLINIC
    }

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
            columnDefinition = "TEXT"
    )
    private String photo;

    @Column (
            name = "hip_width_in_inches",
            columnDefinition = "DECIMAL(4,2)"
    )
    @Positive(message = "Hip width must be positive")
    private Float hipWidthInInches;

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
    @NotNull(message = "Refer to is mandatory")
    @Enumerated(EnumType.STRING)
    private ReferTo referTo;

    @Column (
            name = "is_resolved",
            columnDefinition = "BOOLEAN"
    )
    @NotNull(message = "Resolution status is mandatory")
    private Boolean isResolved;

    @Column (
            name = "outcome",
            columnDefinition = "TEXT"
    )
    private String outcome;

    @Column(
            name = "date",
            columnDefinition = "DATE"
    )
    @CreatedDate
    private Date date;

    @Column (
            name = "worker_id",
            columnDefinition = "INT"
    )
    private Long workerId;

    @OneToOne(optional = false, cascade = CascadeType.ALL)
    @JoinColumn(name = "required_services_id", referencedColumnName = "id")
    @NotNull(message = "Required Services cannot be null")
    @UniqueRequiredServicesID(message = "Another referral is already linked to this service")
    private RequiredServices requiredServices;

    @ManyToOne
    @JoinColumn(name = "physiotherapy_id", referencedColumnName = "id")
    private Physiotherapy physiotherapy;

    @ManyToOne
    @JoinColumn(name = "client_id", referencedColumnName = "id", insertable = false, updatable = false)
    private Client client;

    @ManyToOne
    @JoinColumn(name = "worker_id", referencedColumnName = "id", insertable = false, updatable = false)
    private Worker worker;

    public Referral() {
    }

    public Referral(Long id,
                    Long clientId,
                    String photo,
                    Float hipWidthInInches,
                    Boolean isIntermediateUser,
                    Boolean hasExistingWheelchair,
                    Boolean doesRequireRepairs,
                    Boolean isBelowKnee,
                    Boolean isBelowElbow,
                    ReferTo referTo,
                    Boolean isResolved,
                    String outcome,
                    Date date,
                    Long workerId,
                    RequiredServices requiredServices,
                    Physiotherapy physiotherapy,
                    Client client,
                    Worker worker) {
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
        this.date = date;
        this.workerId = workerId;
        this.requiredServices = requiredServices;
        this.physiotherapy = physiotherapy;
        this.client = client;
        this.worker = worker;
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

    public Float getHipWidthInInches() {
        return hipWidthInInches;
    }

    public void setHipWidthInInches(Float hipWidthInInches) {
        this.hipWidthInInches = hipWidthInInches;
    }

    public Boolean getIntermediateUser() {
        return isIntermediateUser;
    }

    public void setIntermediateUser(Boolean intermediateUser) {
        isIntermediateUser = intermediateUser;
    }

    public void setIntermediateUserByWheelchairUserType(WheelchairUserType wheelchairUserType) {
        setIntermediateUser(wheelchairUserType == WheelchairUserType.INTERMEDIATE);
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

    public void setProstheticCondition(ProstheticConditionEnum condition) {
        setBelowKnee(condition == ProstheticConditionEnum.BELOW_KNEE);
    }

    public Boolean getBelowElbow() {
        return isBelowElbow;
    }

    public void setBelowElbow(Boolean belowElbow) {
        isBelowElbow = belowElbow;
    }

    public void setOrthoticCondition(OrthoticConditionEnum condition) {
        setBelowElbow(condition == OrthoticConditionEnum.BELOW_ELBOW);
    }

    public ReferTo getReferTo() {
        return referTo;
    }

    public void setReferTo(ReferTo referTo) {
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

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public Long getWorkerId() {
        return workerId;
    }

    public void setWorkerId(Long workerId) {
        this.workerId = workerId;
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

    public Client getClient() {
        return client;
    }

    public void setClient(Client client) {
        this.client = client;
    }

    public Worker getWorker() {
        return worker;
    }

    public void setWorker(Worker worker) {
        this.worker = worker;
    }
}
