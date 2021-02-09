package com.earth.cbr.models;

import javax.persistence.*;

@Entity(name = "Worker")
@Table(name = "worker")
public class Worker {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    public Worker() {

    }
}
