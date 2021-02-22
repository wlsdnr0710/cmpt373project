package com.earth.cbr.models;

import javax.persistence.*;

@Entity(name = "Health_Provided")
@Table(name = "health_provided")
public class ServiceProvided {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(
        name = "visit_id",
        columnDefinition = "INT"
    )
    private int visitId;

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
    
    public ServiceProvided(){
        
    }

    public ServiceProvided(int visitId, String description, String goal, String outcome, String type) {
        this.visitId = visitId;
        this.description = description;
        this.goal = goal;
        this.outcome = outcome;
        this.type = type;
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
}