package com.earth.cbr.models;

import javax.persistence.*;
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
    private Long workerId;

    @Column(
        name = "date",
        columnDefinition = "DATE"
    )
    private Date date;

    @Column(
        name = "message",
        columnDefinition = "TEXT"
    )
    private String message;

    @Column(
        name = "priority",
        columnDefinition = "INT"
    )
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
