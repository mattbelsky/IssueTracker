package io.github.mattbelsky.issuetracker.model;

import javax.persistence.*;
import java.sql.Date;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@Entity
@Table(name = "people")
public class Person {

    public static final PasswordEncoder PASSWORD_ENCODER = new BCryptPasswordEncoder();
    @Id
    @Column(name = "person_id")
    private int personId;
    @Column(name = "person_name")
    private String personName;
    @Column(name = "person_email")
    private String personEmail;
    @Column(name = "person_role")
    private String personRole;
    private String username;
    @JsonIgnore
    private String password;
    @Column(name = "assigned_project")
    private Integer assignedProject;
    @Column(name = "created_on")
    private Date createdOn;
    @Column(name = "created_by")
    private String createdBy;
    @Column(name = "modified_on")
    private Date modifiedOn;
    @Column(name = "modified_by")
    private String modifiedBy;

    public Person(String personName, String personEmail, String personRole, String username, String password,
                  Date createdOn, String createdBy, Date modifiedOn, String modifiedBy) {
        this.personName = personName;
        this.personEmail = personEmail;
        this.personRole = personRole;
        this.username = username;
        this.setPassword(password);
        this.createdOn = createdOn;
        this.createdBy = createdBy;
        this.modifiedOn = modifiedOn;
        this.modifiedBy = modifiedBy;
    }

    public Person() {
    }

    public int getPersonId() {
        return personId;
    }

    public String getPersonName() {
        return personName;
    }

    public void setPersonName(String personName) {
        this.personName = personName;
    }

    public String getPersonEmail() {
        return personEmail;
    }

    public void setPersonEmail(String personEmail) {
        this.personEmail = personEmail;
    }

    public String getPersonRole() {
        return personRole;
    }

    public void setPersonRole(String personRole) {
        this.personRole = personRole;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public void setPassword(String password) { this.password = PASSWORD_ENCODER.encode(password); }

    public String getPassword() { return password; }

    public Integer getAssignedProject() {
        return assignedProject;
    }

    public void setAssignedProject(Integer assignedProject) {
        this.assignedProject = assignedProject;
    }

    public Date getCreatedOn() {
        return createdOn;
    }

    public void setCreatedOn(Date createdOn) {
        this.createdOn = createdOn;
    }

    public String getCreatedBy() {
        return createdBy;
    }

    public void setCreatedBy(String createdBy) {
        this.createdBy = createdBy;
    }

    public Date getModifiedOn() {
        return modifiedOn;
    }

    public void setModifiedOn(Date modifiedOn) {
        this.modifiedOn = modifiedOn;
    }

    public String getModifiedBy() {
        return modifiedBy;
    }

    public void setModifiedBy(String modifiedBy) {
        this.modifiedBy = modifiedBy;
    }
}
