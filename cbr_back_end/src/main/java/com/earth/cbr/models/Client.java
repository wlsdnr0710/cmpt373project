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
            name = "first_name",
            columnDefinition = "TEXT"
    )
    private String firstName;
    @Column(
            name = "last_name",
            columnDefinition = "TEXT"
    )
    private String lastName;
    @Column(
            name = "birthdate",
            columnDefinition = "DATE"
    )
    private Integer birthdate;

    @Transient
    private Integer age;

    @Column(
            name = "gender"
    )
    private Character gender;
    @Column(
            name = "photo"
    )
    private String photo;
    @Column(
            name = "zone"
    )
    private String zone;
    @Column(
            name = "village_no"
    )
    private Integer villageNumber;
    @Column(
            name = "date"
    )
    private LocalDate signupDate;
    @Column(
            name = "contact_number"
    )
    private String contactNumber;
    @Column(
            name = "worker_id"
    )
    private Long cbrWorkerId;
    @Column(
            name = "caregiver_contact",
            columnDefinition = "TEXT"
    )
    private String caregiverContact;
    @Column(
            name = "required_services",
            columnDefinition = "TEXT"
    )
    private String requiredServices;
    @Column(
            name = "goals",
            columnDefinition = "TEXT"
    )
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
        this.birthdate = birthDate;
        this.gender = gender;
        this.photo = image;
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

    public Integer getBirthdate() {
        return birthdate;
    }

    public Integer getAge() {
        return age;
    }

    public Character getGender() {
        return gender;
    }

    public String getPhoto() {
        return photo;
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

    public void setBirthdate(Integer birthdate) {
        this.birthdate = birthdate;
    }

    public void setGender(Character gender) {
        this.gender = gender;
    }

    public void setPhoto(String photo) {
        this.photo = photo;
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

    public void setGoals(String goals) {
        this.goals = goals;
    }
}
