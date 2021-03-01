package com.earth.cbr.models;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;

@Entity(name = "Service_Provided")
@Table(name = "service_provided")
public class ServiceProvided {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(
        name = "visit_id",
        columnDefinition = "INT"
    )
    private Integer visitId;

    @Column(
        name = "description",
        columnDefinition = "TEXT" 
    )
    private String description;

    @Column(
        name = "type",
        columnDefinition = "TEXT"
    )
    private String type;

    @Column(
            name = "service_id",
            columnDefinition = "INT"
    )
    private Integer serviceId;

    @JsonIgnore
    @ManyToOne(optional = false, cascade = CascadeType.PERSIST, fetch = FetchType.LAZY)
    @JoinColumn(name = "visit_id", referencedColumnName = "id", insertable = false, updatable = false)
    private Visit visit;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "id", referencedColumnName = "id", insertable = false, updatable = false)
    private Service service;
    
    public ServiceProvided(){
        
    }

    public ServiceProvided(Integer visitId, String description, Integer serviceId, String type, Visit visit, Service service) {
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

    public String getType(){
        return type;
    }

    public void setType(String type){
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