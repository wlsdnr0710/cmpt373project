package com.earth.cbr.models;

import javax.persistence.*;

@Entity(name = "Visit")
@Table(name = "visit")
public class Visit {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(
            name = "consent",
            columnDefinition = "BINARY"
    )
    private String consent;

    @Column(
            name = "date",
            columnDefinition = "DATE"
    )
    private String date;

    @Column(
            name = "cbr_worker_name",
            columnDefinition = "TEXT"
    )
    private String cbrWorkerName;

    @Column(
            name = "purpose",
            columnDefinition = "TEXT"
    )
    private String purpose;

    @Column(
            name = "zone",
            columnDefinition = "TEXT"
    )
    private String zone;

    @Column(
            name = "village_number",
            columnDefinition = "INT"
    )
    private String villageNumber;

    @Column(
            name = "health_goal_progress",
            columnDefinition = "TEXT"
    )
    private String healthGoalProgress;

    @Column(
            name = "health_outcome",
            columnDefinition = "TEXT"
    )
    private String healthOutcome;

    public Visit() {

    }
}
