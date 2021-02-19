package com.earth.cbr.models;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;

@Entity(name = "Zone")
@Table(name = "zone")
public class Zone {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(
            name = "name",
            columnDefinition = "TEXT"
    )
    @NotBlank(message = "Name is mandatory")
    private String name;

    public Zone() {

    }

    public Zone(Long id, @NotBlank(message = "Name is mandatory") String name) {
        this.id = id;
        this.name = name;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
