package com.earth.cbr.models;

import com.fasterxml.jackson.annotation.JsonIgnore;

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

    @JsonIgnore
    @ManyToMany(mappedBy = "disabilities")
    private Set<Client> clients;

    public Disability() {
    }

    public Disability(Long id, String type, Set<Client> clients) {
        this.id = id;
        this.type = type;
        this.clients = clients;
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

    public Set<Client> getClients() {
        return clients;
    }

    public void setClients(Set<Client> clients) {
        this.clients = clients;
    }
}
