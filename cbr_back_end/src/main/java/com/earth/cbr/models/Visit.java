package com.earth.cbr.models;

import javax.persistence.*;

@Entity(name = "Visit")
@Table(name = "visit")
public class Visit {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    public Visit() {

    }
}
