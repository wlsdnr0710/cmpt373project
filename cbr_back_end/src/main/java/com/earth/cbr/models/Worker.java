package com.earth.cbr.models;

import javax.persistence.*;
import javax.validation.constraints.*;

@Entity(name = "Worker")
@Table(name = "worker")
public class Worker {
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
    @NotBlank(message = "Email is mandatory")
    private String email;

    @Column(
            name = "role",
            columnDefinition = "TEXT"
    )
    @NotBlank(message = "Role is mandatory")
    private String role;

    @Column(
            name = "zone",
            columnDefinition = "TEXT"
    )
    @NotBlank(message = "Zone is mandatory")
    private String zone;

    public Worker() {

    }

    public Worker(String firstName, String lastName, String username, String password, String phone, String email, String role, String zone) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.username = username;
        this.password = password;
        this.phone = phone;
        this.email = email;
        this.role = role;
        this.zone = zone;
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

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public String getZone() {
        return zone;
    }

    public void setZone(String zone) {
        this.zone = zone;
    }
}
