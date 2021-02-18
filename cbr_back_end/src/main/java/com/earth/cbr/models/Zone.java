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
}
