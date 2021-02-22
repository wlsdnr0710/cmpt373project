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
        name = "goal",
        columnDefinition = "TEXT"
    )
    private String goal;

    @Column(
        name = "outcome",
        columnDefinition = "TEXT"
    )
    private String outcome;

    @Column(
        name = "type",
        columnDefinition = "TEXT"
    )
    private String type;

    @JsonIgnore
    @ManyToOne(optional = false, cascade = CascadeType.PERSIST, fetch = FetchType.LAZY)
    @JoinColumn(name = "visit_id", referencedColumnName = "id", insertable = false, updatable = false)
    private Visit visit;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "id", referencedColumnName = "id", insertable = false, updatable = false)
    private ServiceOption serviceOption;
    
    public ServiceProvided(){
        
    }

    public ServiceProvided(Long id, Integer visitId, String description, String goal, String outcome, String type,
                           Visit visit, ServiceOption serviceOption) {
        this.id = id;
        this.visitId = visitId;
        this.description = description;
        this.goal = goal;
        this.outcome = outcome;
        this.type = type;
        this.visit = visit;
        this.serviceOption = serviceOption;
    }

    public Long getId(){
        return id;
    }

    public void setId(Long id){
        this.id = id;
    }

    public int getVisitId(){
        return visitId;
    }

    public void setVisitId(int visitId){
        this.visitId = visitId;
    }

    public String getDescription(){
        return description;
    }

    public void setDescription(String description){
        this.description = description;
    }

    public String getGoal(){
        return goal;
    }

    public void setGoal(String goal){
        this.goal = goal;
    }

    public String getOutcome(){
        return outcome;
    }

    public void setOutcome(String outcome){
        this.outcome = outcome;
    }

    public String getType(){
        return type;
    }

    public void setType(String type){
        this.type = type;
    }

    public void setVisitId(Integer visitId) {
        this.visitId = visitId;
    }

    public Visit getVisit() {
        return visit;
    }

    public void setVisit(Visit visit) {
        this.visit = visit;
    }

    public ServiceOption getServiceOption() {
        return serviceOption;
    }

    public void setServiceOption(ServiceOption serviceOption) {
        this.serviceOption = serviceOption;
    }
}