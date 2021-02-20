package com.earth.cbr.models;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import javax.validation.constraints.*;
import java.time.LocalDate;
import java.time.Period;
import java.time.ZoneId;
import java.util.Date;
import java.util.Set;

@Entity(name = "Client")
@Table(name = "client")
@EntityListeners(AuditingEntityListener.class)
public class Client {
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
            name = "birthdate",
            columnDefinition = "DATE"
    )
    @NotNull(message = "Birthdate cannot be null")
    @PastOrPresent(message = "Birthdate must be in the past")
    private Date birthdate;

    @Transient
    private Integer age;

    @Column(
            name = "gender"
    )
    @NotNull(message = "Gender cannot be null")
    private Character gender;

    @Column(
            name = "photo"
    )
    private String photo;

    @Column(
            name = "zone"
    )
    @NotBlank(message = "Zone is mandatory")
    private String zone;

    @Column(
            name = "village_no"
    )
    @NotNull(message = "Village number cannot be null")
    @PositiveOrZero(message = "Village number should be positive or zero")
    private Integer villageNumber;

    @Column(
            name = "created_date",
            columnDefinition = "DATE"
    )
    @CreatedDate
    private Date signupDate;

    @Column(
            name = "contact_number"
    )
    @Pattern(
            regexp = "\\d{10}",
            message = "Contact number should be 10 consecutive digits with no special characters ex. 0123456789"
    )
    private String contactNumber;

    @Column(
            name = "worker_id"
    )
    @NotNull(message = "Worker ID cannot be null")
    @PositiveOrZero(message = "Worker ID should be positive or zero")
    private Long cbrWorkerId;

    @Column(
            name = "caregiver_contact",
            columnDefinition = "TEXT"
    )
    @Pattern(
            regexp = "\\d{10}",
            message = "Caregiver contact should be 10 consecutive digits with no special characters ex. 0123456789"
    )
    private String caregiverContact;

    @Column(
            name = "caregiver_photo",
            columnDefinition = "TEXT"
    )
    private String caregiverPhoto;

    @Column(
            name = "required_services",
            columnDefinition = "TEXT"
    )
    @NotNull(message = "Required services cannot be null")
    private String requiredServices;

    @Column(
            name = "individual_goals",
            columnDefinition = "TEXT"
    )
    @NotNull(message = "Individual goals cannot be null")
    private String individualGoals;

    @ManyToMany
    @JoinTable(
            name = "disabled",
            joinColumns = @JoinColumn(name = "client_id"),
            inverseJoinColumns = @JoinColumn(name = "disability_id")
    )
    Set<Disability> disabilities;

    @OneToMany(mappedBy = "client")
    private Set<RiskHistory> riskHistories;

    public Client() {
    }

    public Client(String firstName,
                  String lastName,
                  Date birthdate,
                  Integer age,
                  Character gender,
                  String photo,
                  String zone,
                  Integer villageNumber,
                  Date signupDate,
                  String contactNumber,
                  Long cbrWorkerId,
                  String caregiverContact,
                  String caregiverPhoto,
                  String requiredServices,
                  String individualGoals,
                  Set<Disability> disabilities,
                  Set<RiskHistory> riskHistories) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.birthdate = birthdate;
        this.gender = gender;
        this.photo = photo;
        this.zone = zone;
        this.villageNumber = villageNumber;
        this.signupDate = signupDate;
        this.contactNumber = contactNumber;
        this.cbrWorkerId = cbrWorkerId;
        this.caregiverContact = caregiverContact;
        this.caregiverPhoto = caregiverPhoto;
        this.requiredServices = requiredServices;
        this.individualGoals = individualGoals;
        this.disabilities = disabilities;
        this.riskHistories = riskHistories;
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

    public Date getBirthdate() {
        return birthdate;
    }

    public void setBirthdate(Date birthdate) {
        this.birthdate = birthdate;
    }

    public Integer getAge() {
        LocalDate currentDate = LocalDate.now();
        LocalDate localBirthdate = birthdate.toInstant().atZone(ZoneId.systemDefault()).toLocalDate();
        return Period.between(localBirthdate, currentDate).getYears();
    }

    public void setAge(Integer age) {
        this.age = age;
    }

    public Character getGender() {
        return gender;
    }

    public void setGender(Character gender) {
        this.gender = gender;
    }

    public String getPhoto() {
        return photo;
    }

    public void setPhoto(String photo) {
        this.photo = photo;
    }

    public String getZone() {
        return zone;
    }

    public void setZone(String zone) {
        this.zone = zone;
    }

    public Integer getVillageNumber() {
        return villageNumber;
    }

    public void setVillageNumber(Integer villageNumber) {
        this.villageNumber = villageNumber;
    }

    public Date getSignupDate() {
        return signupDate;
    }

    public void setSignupDate(Date signupDate) {
        this.signupDate = signupDate;
    }

    public String getContactNumber() {
        return contactNumber;
    }

    public void setContactNumber(String contactNumber) {
        this.contactNumber = contactNumber;
    }

    public Long getCbrWorkerId() {
        return cbrWorkerId;
    }

    public void setCbrWorkerId(Long cbrWorkerId) {
        this.cbrWorkerId = cbrWorkerId;
    }

    public String getCaregiverContact() {
        return caregiverContact;
    }

    public void setCaregiverContact(String caregiverContact) {
        this.caregiverContact = caregiverContact;
    }

    public String getCaregiverPhoto() {
        return caregiverPhoto;
    }

    public void setCaregiverPhoto(String caregiverPhoto) {
        this.caregiverPhoto = caregiverPhoto;
    }

    public String getRequiredServices() {
        return requiredServices;
    }

    public void setRequiredServices(String requiredServices) {
        this.requiredServices = requiredServices;
    }

    public String getIndividualGoals() {
        return individualGoals;
    }

    public void setIndividualGoals(String individualGoals) {
        this.individualGoals = individualGoals;
    }

    public Set<Disability> getDisabilities() {
        return disabilities;
    }

    public void setDisabilities(Set<Disability> disabilities) {
        this.disabilities = disabilities;
    }

    public Set<RiskHistory> getRiskHistories() {
        return riskHistories;
    }

    public void setRiskHistories(Set<RiskHistory> riskHistories) {
        this.riskHistories = riskHistories;
    }
}
