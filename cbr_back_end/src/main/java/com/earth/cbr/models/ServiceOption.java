package com.earth.cbr.models;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Entity(name = "ServiceOption")
@Table(name = "service_option")
public class ServiceOption {

    private enum Type {
        HEALTH,
        SOCIAL,
        EDUCATION
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(
            name = "name",
            columnDefinition = "TEXT"
    )
    @NotBlank(message = "Name is mandatory")
    private String name;

    @Column(
            name = "type",
            columnDefinition = "ENUM"
    )
    @NotNull(message = "Type cannot be null")
    @Enumerated(EnumType.STRING)
    private Type type;

    public ServiceOption(){

    }

    public ServiceOption(String name, Type type) {
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

    public Type getType(){
        return type;
    }

    public void setType(Type type){
        this.type = type;
    }
}