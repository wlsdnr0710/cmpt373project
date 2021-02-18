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
    private Long worker_id;

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
    private int priority;
    
    public Message(){
        
    }

    public Message(Long id, Long worker_id, Date date, String message, int priority) {
        this.id = id;
        this.worker_id = worker_id;
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
        return worker_id;
    }

    public void setWorkerId(Long worker_id){
        this.worker_id = worker_id;
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

    public int getPriority(){
        return priority;
    }

    public void setPriority(int priority){
        this.priority = priority;
    }
}
