package com.earth.cbr.models;

import javax.persistence.*;

@Entity(name = "ClientVisits")
@Table(name = "client_visits")
public class ClientVisits {
    @Column(
            name = "client_id"
    )
    private Long clientId;

    @Column(
            name = "visit_id"
    )
    private Long visitId;
}
