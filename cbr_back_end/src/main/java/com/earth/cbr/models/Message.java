package com.earth.cbr.models;

import org.hibernate.validator.constraints.Range;
import org.springframework.data.annotation.CreatedDate;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.PositiveOrZero;
import java.sql.Date;

@Entity(name = "Message")
@Table(name = "message")
public class Message {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(
        name = "worker_id",
        columnDefinition = "LONG" 
    )
    @NotNull(message = "WorkerId cannot be null")
    @PositiveOrZero(message = "WorkerId should be positive or zero")
    private Long workerId;

    @Column(
        name = "date",
        columnDefinition = "DATE"
    )
    @CreatedDate
    private Date date;

    @Column(
        name = "message",
        columnDefinition = "TEXT"
    )
    @NotBlank(message = "Message is mandatory")
    private String message;

    @Column(
        name = "priority",
        columnDefinition = "INT"
    )
    @Range(min=1, max=3)
    private Integer priority;
    
    public Message() {
        
    }

    public Message(Long workerId, Date date, String message, Integer priority) {
        this.workerId = workerId;
        this.date = date;
        this.message = message;
        this.priority = priority;
    }

    public Long getId(){
        return id;
    }

    public void setId(Long id){
        this.id = id;
    }

    public Long getWorkerId(){
        return workerId;
    }

    public void setWorkerId(Long workerId){
        this.workerId = workerId;
    }

    public Date getDate(){
        return date;
    }

    public void setDate(Date date){
        this.date = date;
    }

    public String getMessage(){
        return message;
    }

    public void setMessage(String message){
        this.message = message;
    }

    public Integer getPriority(){
        return priority;
    }

    public void setPriority(Integer priority){
        this.priority = priority;
    }
}
