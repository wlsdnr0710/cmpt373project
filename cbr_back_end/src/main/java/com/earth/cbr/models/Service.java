package com.earth.cbr.models;

import javax.persistence.*;

@Entity(name = "Service")
@Table(name = "service")
public class Service {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(
        name = "name",
        columnDefinition = "TEXT" 
    )
    private String name;
   
    @Column(
        name = "type",
        columnDefinition = "TEXT"
    )
    private String type;
    
    public Service(){
        
    }

    public Service(String name, String type) {
        this.name = name;
        this.type = type;
    }

    public Long getId(){
        return id;
    }

    public void setId(Long id){
        this.id = id;
    }

    public String getName(){
        return name;
    }

    public void setName(String name){
        this.name = name;
    }

    public String getType(){
        return type;
    }

    public void setType(String type){
        this.type = type;
    }
}