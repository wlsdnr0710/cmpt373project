package com.earth.cbr.models;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.util.Set;

@Entity(name = "Physiotherapy")
@Table(name = "physiotherapy")
public class Physiotherapy {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(
            name = "type",
            columnDefinition = "TEXT"
    )
    @NotBlank(message = "Type is mandatory")
    private String type;

    @Column(
            name = "description",
            columnDefinition = "TEXT"
    )
    @NotBlank(message = "Description is mandatory")
    private String description;

    @JsonIgnore
    @OneToMany(mappedBy = "physiotherapy")
    private Set<Referral> referrals;

    public Physiotherapy() {

    }

    public Physiotherapy(Long id, @NotBlank(message = "Type is mandatory") String type, @NotBlank(message = "Description is mandatory") String description) {
        this.id = id;
        this.type = type;
        this.description = description;
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

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
