package com.earth.cbr.models;

import com.earth.cbr.models.authentication.UniqueUsername;

import javax.persistence.*;
import javax.validation.constraints.*;

@Entity(name = "Worker")
@Table(name = "worker")
public class Worker {

    private enum Role{
        admin,
        clinician,
        worker
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(
            name = "first_name",
            columnDefinition = "TEXT"
    )
    @NotBlank(message = "First name is mandatory")
    private String firstName;

    @Column(
            name = "last_name",
            columnDefinition = "TEXT"
    )
    @NotBlank(message = "Last name is mandatory")
    private String lastName;

    @Column(
            name = "username",
            columnDefinition = "TEXT"
    )
    @UniqueUsername(message = "Username must be unique")
    @NotBlank(message = "Username is mandatory")
    private String username;

    @Column(
            name = "password",
            columnDefinition = "TEXT"
    )
    @NotBlank(message = "Password is mandatory")
    private String password;

    @Column(
            name = "phone",
            columnDefinition = "TEXT"
    )
    @Pattern(
            regexp = "\\d{10}",
            message = "Contact number should be 10 consecutive digits with no special characters ex. 0123456789"
    )
    private String phone;

    @Column(
            name = "email",
            columnDefinition = "TEXT"
    )
    private String email;

    @Column(
            name = "role",
            columnDefinition = "ENUM"
    )
    @Enumerated(EnumType.STRING)
    private Role role;

    @Column(
            name = "zone",
            columnDefinition = "INT"
    )
    @PositiveOrZero(message = "Zone should be positive or zero")
    private Integer zone;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "zone", referencedColumnName = "id", insertable = false, updatable = false)
    private Zone zoneName;

    public Worker() {

    }

    public Worker(String firstName, String lastName, String username, String password, String phone, String email,
                  Role role, Integer zone, Zone zoneName) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.username = username;
        this.password = password;
        this.phone = phone;
        this.email = email;
        this.role = role;
        this.zone = zone;
        this.zoneName = zoneName;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }

    public Integer getZone() {
        return zone;
    }

    public void setZone(Integer zone) {
        this.zone = zone;
    }

    public Zone getZoneName() {
        return zoneName;
    }

    public void setZoneName(Zone zoneName) {
        this.zoneName = zoneName;
    }
}
