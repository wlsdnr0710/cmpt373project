package com.earth.cbr.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
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

    private enum Gender {
        M,
        F,
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
            name = "birthdate",
            columnDefinition = "DATE"
    )
    @NotNull(message = "Birthdate is mandatory")
    @PastOrPresent(message = "Birthdate must be in the past")
    private Date birthdate;

    @Transient
    private Integer age;

    @Column(
            name = "gender",
            columnDefinition = "ENUM"
    )
    @NotNull(message = "Gender is mandatory")
    @Enumerated(EnumType.STRING)
    private Gender gender;

    @Column(
            name = "photo",
            columnDefinition = "TEXT"
    )
    private String photo;

    @Column(
            name = "zone",
            columnDefinition = "INT"
    )
    @NotNull(message = "Zone is mandatory")
    @PositiveOrZero(message = "Zone ID should be positive or zero")
    private Integer zone;

    @Column(
            name = "village_no",
            columnDefinition = "INT"
    )
    @NotNull(message = "Village number is mandatory")
    @PositiveOrZero(message = "Village number should be positive or zero")
    private Integer villageNumber;

    @Column(
            name = "created_date",
            columnDefinition = "DATE"
    )
    @CreatedDate
    private Date signupDate;

    @Column(
            name = "contact_number",
            columnDefinition = "TEXT"
    )
    @Pattern(
            regexp = "\\d{10}",
            message = "Contact number should be 10 consecutive digits with no special characters ex. 0123456789"
    )
    private String contactNumber;

    @Column(
            name = "worker_id",
            columnDefinition = "INT"
    )
    @NotNull(message = "Worker ID is mandatory")
    @PositiveOrZero(message = "Worker ID should be positive or zero")
    private Long cbrWorkerId;

    @Column(
            name = "caregiver_name",
            columnDefinition = "TEXT"
    )
    private String caregiverName;

    @Column(
            name = "caregiver_number",
            columnDefinition = "TEXT"
    )
    @Pattern(
            regexp = "\\d{10}",
            message = "Caregiver contact should be 10 consecutive digits with no special characters ex. 0123456789"
    )
    private String caregiverNumber;

    @Column(
            name = "caregiver_photo",
            columnDefinition = "TEXT"
    )
    private String caregiverPhoto;

    @Column(
            name = "health_goal",
            columnDefinition = "TEXT"
    )
    @NotBlank(message = "Health Goal is mandatory")
    private String healthGoal;

    @Column(
            name = "social_goal",
            columnDefinition = "TEXT"
    )
    @NotBlank(message = "Social Goal is mandatory")
    private String socialGoal;

    @Column(
            name = "education_goal",
            columnDefinition = "TEXT"
    )
    @NotBlank(message = "Education Goal is mandatory")
    private String educationGoal;

    @OneToMany(mappedBy = "client")
    private Set<RiskHistory> riskHistories;

    @OneToOne
    @JoinColumn(name = "zone", referencedColumnName = "id", insertable = false, updatable = false)
    private Zone zoneName;

    @JsonIgnore
    @OneToMany(mappedBy = "client")
    private Set<Referral> referrals;

    @OneToMany(mappedBy = "client")
    private Set<Disabled> disabled;

    public Client() {

    }

    public Client(String firstName,
                  String lastName,
                  Date birthdate,
                  Integer age,
                  Gender gender,
                  String photo,
                  Integer zone,
                  Integer villageNumber,
                  Date signupDate,
                  String contactNumber,
                  Long cbrWorkerId,
                  String caregiverName,
                  String caregiverNumber,
                  String caregiverPhoto,
                  String healthGoal,
                  String socialGoal,
                  String educationGoal,
                  Set<Disabled> disabled,
                  Set<RiskHistory> riskHistories,
                  Zone zoneName,
                  Set<Referral> referrals) {
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
        this.caregiverName = caregiverName;
        this.caregiverNumber = caregiverNumber;
        this.caregiverPhoto = caregiverPhoto;
        this.healthGoal = healthGoal;
        this.socialGoal = socialGoal;
        this.educationGoal = educationGoal;
        this.disabled = disabled;
        this.riskHistories = riskHistories;
        this.zoneName = zoneName;
        this.referrals = referrals;
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

    public Gender getGender() {
        return gender;
    }

    public void setGender(Gender gender) {
        this.gender = gender;
    }

    public String getPhoto() {
        return photo;
    }

    public void setPhoto(String photo) {
        this.photo = photo;
    }

    public Integer getZone() {
        return zone;
    }

    public void setZone(Integer zone) {
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

    public String getCaregiverName() {
        return caregiverName;
    }

    public void setCaregiverName(String caregiverName) {
        this.caregiverName = caregiverName;
    }

    public String getCaregiverNumber() {
        return caregiverNumber;
    }

    public void setCaregiverNumber(String caregiverNumber) {
        this.caregiverNumber = caregiverNumber;
    }

    public String getCaregiverPhoto() {
        return caregiverPhoto;
    }

    public void setCaregiverPhoto(String caregiverPhoto) {
        this.caregiverPhoto = caregiverPhoto;
    }

    public String getHealthGoal() {
        return healthGoal;
    }

    public void setHealthGoal(String healthGoal) {
        this.healthGoal = healthGoal;
    }

    public String getSocialGoal() {
        return socialGoal;
    }

    public void setSocialGoal(String socialGoal) {
        this.socialGoal = socialGoal;
    }

    public String getEducationGoal() {
        return educationGoal;
    }

    public void setEducationGoal(String educationGoal) {
        this.educationGoal = educationGoal;
    }

    public Set<Disabled> getDisabled() {
        return disabled;
    }

    public void setDisabled(Set<Disabled> disabled) {
        this.disabled = disabled;
    }

    public Set<RiskHistory> getRiskHistories() {
        return riskHistories;
    }

    public void setRiskHistories(Set<RiskHistory> riskHistories) {
        this.riskHistories = riskHistories;
    }

    public Zone getZoneName() {
        return zoneName;
    }

    public void setZoneName(Zone zoneName) {
        this.zoneName = zoneName;
    }

    public Set<Referral> getReferrals() {
        return referrals;
    }

    public void setReferrals(Set<Referral> referrals) {
        this.referrals = referrals;
    }
}
