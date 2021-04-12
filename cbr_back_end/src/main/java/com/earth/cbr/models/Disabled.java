package com.earth.cbr.models;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Entity(name = "Disabled")
@Table(name = "disabled")
public class Disabled {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column (
            name = "client_id",
            columnDefinition = "INT"
    )
    @NotNull(message = "clientId is mandatory")
    private Long clientId;

    @Column (
            name = "disability_id",
            columnDefinition = "INT"
    )
    @NotNull(message = "disabilityId is mandatory")
    private Long disabilityId;

    @Column (
            name = "other_description",
            columnDefinition = "TEXT"
    )
    private String otherDescription;

    @JsonIgnore
    @ManyToOne(optional = false, cascade = CascadeType.PERSIST, fetch = FetchType.LAZY)
    @JoinColumn(name = "client_id", referencedColumnName = "id", insertable = false, updatable = false)
    private Client client;

    @OneToOne
    @JoinColumn(name = "disability_id", referencedColumnName = "id", insertable = false, updatable = false)
    private Disability disability;

    public Disabled() {

    }

    public Disabled(Long id, Long clientId, Long disabilityId, String otherDescription, Client client, Disability disability) {
        this.id = id;
        this.clientId = clientId;
        this.disabilityId = disabilityId;
        this.otherDescription = otherDescription;
        this.client = client;
        this.disability = disability;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getClientId() {
        return clientId;
    }

    public void setClientId(Long clientId) {
        this.clientId = clientId;
    }

    public Long getDisabilityId() {
        return disabilityId;
    }

    public void setDisabilityId(Long disabilityId) {
        this.disabilityId = disabilityId;
    }

    public String getOtherDescription() {
        return otherDescription;
    }

    public void setOtherDescription(String otherDescription) {
        this.otherDescription = otherDescription;
    }

    public Client getClient() {
        return client;
    }

    public void setClient(Client client) {
        this.client = client; }

    public Disability getDisability() {
        return disability;
    }

    public void setDisability(Disability disability) {
        this.disability = disability;
    }
}
