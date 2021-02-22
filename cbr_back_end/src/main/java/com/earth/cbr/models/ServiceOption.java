package com.earth.cbr.models;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity(name = "Health_Option")
@Table(name = "health_option")
public class ServiceOption {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @JsonIgnore
    @ManyToOne(optional = false, cascade = CascadeType.PERSIST, fetch = FetchType.LAZY)
    @JoinColumn(name = "id", referencedColumnName = "visit_id")


    @Column(
        name = "health_option",
        columnDefinition = "TEXT" 
    )
    private String healthOption;

   
    @Column(
        name = "type",
        columnDefinition = "TEXT"
    )
    private String type;
    
    public ServiceOption(){
        
    }

    public ServiceOption(String healthOption, String type) {
        this.healthOption = healthOption;
        this.type = type;
    }

    public Long getId(){
        return id;
    }

    public void setId(Long id){
        this.id = id;
    }

    public String getHealthOption(){
        return healthOption;
    }

    public void setHealthOption(String healthOption){
        this.healthOption = healthOption;
    }

    public String getType(){
        return type;
    }

    public void setType(String type){
        this.type = type;
    }

    
}