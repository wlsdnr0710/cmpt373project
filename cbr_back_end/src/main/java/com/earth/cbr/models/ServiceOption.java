package com.earth.cbr.models;

import javax.persistence.*;

@Entity(name = "Service_Option")
@Table(name = "service_option")
public class ServiceOption {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

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

    public ServiceOption(Long id, String healthOption, String type) {
        this.id = id;
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