package com.earth.cbr.models;

import javax.persistence.*;
import java.time.LocalDate;

@Entity(name = "Client")
@Table(name = "client")
public class Client {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(
            name = "name",
            columnDefinition = "TEXT"
    )
    private String firstName;
    private String lastName;
    private Integer birthDate;

    @Transient
    private Integer age;

    private Character gender;
    private String image;
    private String zone;
    private Integer villageNumber;
    private LocalDate signupDate;
    private String contactNumber;
    private Long cbrWorkerId;
    private String caregiverContact;
    private String requiredServices;
    private String goals;

    public Client() {
    }

    public Client(String firstName,
                  String lastName,
                  Integer birthDate,
                  Character gender,
                  String image,
                  String zone,
                  Integer villageNumber,
                  LocalDate signupDate,
                  String contactNumber,
                  Long cbrWorkerId,
                  String caregiverContact,
                  String requiredServices,
                  String goals) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.birthDate = birthDate;
        this.gender = gender;
        this.image = image;
        this.zone = zone;
        this.villageNumber = villageNumber;
        this.signupDate = signupDate;
        this.contactNumber = contactNumber;
        this.cbrWorkerId = cbrWorkerId;
        this.caregiverContact = caregiverContact;
        this.requiredServices = requiredServices;
        this.goals = goals;
    }

    public Long getId() {
        return id;
    }

    public String getFirstName() {
        return firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public Integer getBirthDate() {
        return birthDate;
    }

    public Integer getAge() {
        return age;
    }

    public Character getGender() {
        return gender;
    }

    public String getImage() {
        return image;
    }

    public String getZone() {
        return zone;
    }

    public Integer getVillageNumber() {
        return villageNumber;
    }

    public LocalDate getSignupDate() {
        return signupDate;
    }

    public String getContactNumber() {
        return contactNumber;
    }

    public Long getCbrWorkerId() {
        return cbrWorkerId;
    }

    public String getCaregiverContact() {
        return caregiverContact;
    }

    public String getRequiredServices() {
        return requiredServices;
    }

    public String getGoals() {
        return goals;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public void setBirthDate(Integer birthDate) {
        this.birthDate = birthDate;
    }

    public void setGender(Character gender) {
        this.gender = gender;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public void setZone(String zone) {
        this.zone = zone;
    }

    public void setVillageNumber(Integer villageNumber) {
        this.villageNumber = villageNumber;
    }

    public void setSignupDate(LocalDate signupDate) {
        this.signupDate = signupDate;
    }

    public void setContactNumber(String contactNumber) {
        this.contactNumber = contactNumber;
    }

    public void setCbrWorkerId(Long cbrWorkerId) {
        this.cbrWorkerId = cbrWorkerId;
    }

    public void setCaregiverContact(String caregiverContact) {
        this.caregiverContact = caregiverContact;
    }

    public void setRequiredServices(String requiredServices) {
        this.requiredServices = requiredServices;
    }
}
