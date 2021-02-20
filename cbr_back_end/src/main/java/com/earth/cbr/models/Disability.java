package com.earth.cbr.models;

import javax.persistence.*;
import java.util.Set;

@Entity(name = "Disability")
@Table(name = "disability")
public class Disability {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(
            name = "type",
            columnDefinition = "TEXT"
    )
    private String type;

    @ManyToMany(mappedBy = "disabilities")
    Set<Client> clients;

    public Disability() {
    }

    public Disability(Long id, String type) {
        this.id = id;
        this.type = type;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }
}
