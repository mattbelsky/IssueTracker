package io.github.mattbelsky.issuetracker.model;

import javax.persistence.*;
import java.sql.Date;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty.Access;
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
    @Column(name = "email")
    private String email;
    @Column(name = "role")
    private String role;
    private String username;
    // Use @JsonProperty annotation instead of @JsonIgnore, which the guide suggests, as the latter will ignore all
    // associated methods, both getters and setters, making it impossible to submit this property to the database.
    @JsonProperty(access = Access.WRITE_ONLY)
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

    public Person(String personName, String email, String role, String username, String password,
                  Date createdOn, String createdBy, Date modifiedOn, String modifiedBy) {
        this.personName = personName;
        this.email = email;
        this.role = role;
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

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() { return password; }

    public void setPassword(String password) { this.password = PASSWORD_ENCODER.encode(password); }

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
