package com.earth.cbr.models;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.PositiveOrZero;

@Entity(name = "Service_Description")
@Table(name = "service_description")
public class ServiceDescription {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(
            name = "visit_id",
            columnDefinition = "INT"
    )
    @NotNull(message = "Visit ID is mandatory")
    @PositiveOrZero(message = "Visit ID should be positive or zero")
    private Long visitId;

    @Column(
            name = "description",
            columnDefinition = "TEXT"
    )
    @NotBlank(message = "Description is mandatory")
    private String description;

    @Column(
            name = "service_option_id",
            columnDefinition = "INT"
    )
    @NotNull(message = "Service Option ID is mandatory")
    @PositiveOrZero(message = "Service Option ID should be positive or zero")
    private Long serviceOptionId;

    @JsonIgnore
    @ManyToOne(optional = false, cascade = CascadeType.PERSIST, fetch = FetchType.LAZY)
    @JoinColumn(name = "visit_id", referencedColumnName = "id", insertable = false, updatable = false)
    private Visit visit;

    @OneToOne
    @JoinColumn(name = "service_option_id", referencedColumnName = "id", insertable = false, updatable = false)
    private ServiceOption serviceOption;

    public ServiceDescription(){

    }

    public ServiceDescription(Long visitId,
                              String description,
                              Long serviceOptionId,
                              Visit visit,
                              ServiceOption serviceOption) {
        this.visitId = visitId;
        this.description = description;
        this.serviceOptionId = serviceOptionId;
        this.visit = visit;
        this.serviceOption = serviceOption;
    }

    public Long getId(){
        return id;
    }

    public void setId(Long id){
        this.id = id;
    }

    public Long getVisitId(){
        return visitId;
    }

    public void setVisitId(Long visitId){
        this.visitId = visitId;
    }

    public String getDescription(){
        return description;
    }

    public void setDescription(String description){
        this.description = description;
    }

    public Long getServiceOptionId() {
        return serviceOptionId;
    }

    public void setServiceOptionId(Long serviceOptionId) {
        this.serviceOptionId = serviceOptionId;
    }

    public Visit getVisit() {
        return visit;
    }

    public void setVisit(Visit visit) {
        this.visit = visit;
    }

    public ServiceOption getServiceOption() { return serviceOption; }

    public void setServiceOption(ServiceOption serviceOption) {
        this.serviceOption = serviceOption;
    }
}