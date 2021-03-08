package com.earth.cbr.models;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.PositiveOrZero;

@Entity(name = "Service_Provided")
@Table(name = "service_provided")
public class ServiceProvided {

    private enum Type {
        health,
        social,
        education
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(
        name = "visit_id",
        columnDefinition = "INT"
    )
    @NotNull(message = "Visit ID cannot be null")
    @PositiveOrZero(message = "Visit ID should be positive or zero")
    private Integer visitId;

    @Column(
        name = "description",
        columnDefinition = "TEXT" 
    )
    @NotBlank(message = "Description is mandatory")
    private String description;

    @Column(
        name = "type",
        columnDefinition = "ENUM"
    )
    @NotNull(message = "Type cannot be null")
    @Enumerated(EnumType.STRING)
    private Type type;

    @Column(
            name = "service_id",
            columnDefinition = "INT"
    )
    @NotNull(message = "Service ID cannot be null")
    @PositiveOrZero(message = "Service ID should be positive or zero")
    private Integer serviceId;

    @JsonIgnore
    @ManyToOne(optional = false, cascade = CascadeType.PERSIST, fetch = FetchType.LAZY)
    @JoinColumn(name = "visit_id", referencedColumnName = "id", insertable = false, updatable = false)
    private Visit visit;

    @OneToOne
    @JoinColumn(name = "id", referencedColumnName = "id", insertable = false, updatable = false)
    private Service service;
    
    public ServiceProvided(){
        
    }

    public ServiceProvided(Integer visitId, String description, Integer serviceId, Type type, Visit visit, Service service) {
        this.visitId = visitId;
        this.description = description;
        this.type = type;
        this.serviceId = serviceId;
        this.visit = visit;
        this.service = service;
    }

    public Long getId(){
        return id;
    }

    public void setId(Long id){
        this.id = id;
    }

    public Integer getVisitId(){
        return visitId;
    }

    public void setVisitId(Integer visitId){
        this.visitId = visitId;
    }

    public String getDescription(){
        return description;
    }

    public void setDescription(String description){
        this.description = description;
    }

    public Type getType(){
        return type;
    }

    public void setType(Type type){
        this.type = type;
    }

    public Integer getServiceId() {
        return serviceId;
    }

    public void setServiceId(Integer serviceId) {
        this.serviceId = serviceId;
    }

    public Visit getVisit() {
        return visit;
    }

    public void setVisit(Visit visit) {
        this.visit = visit;
    }

    public Service getService() {
        return service;
    }

    public void setService(Service service) {
        this.service = service;
    }
}