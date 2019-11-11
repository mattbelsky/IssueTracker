package io.github.mattbelsky.issuetracker.model;

import javax.persistence.*;
import java.sql.Date;

@Entity
@Table(name = "issues")
public class Issue {

    @Id
    @Column(name = "issue_id")
    private int issueId;
    @Column(name = "issue_summary")
    private String issueSummary;
    @Column(name = "issue_description")
    private String issueDescription;
    @Column(name = "identified_by_person_id")
    private String identifiedByPersonId;
    @Column(name = "identified_date")
    private Date identifiedDate;
    @Column(name = "related_project")
    private Integer relatedProject;
    @Column(name = "assigned_to")
    private Integer assignedTo;
    private String status;
    private String priority;
    @Column(name = "target_resolution_date")
    private Date targetResolutionDate;
    private String progress;
    @Column(name = "actual_resolution_date")
    private Date actualResolutionDate;
    @Column(name = "resolution_summary")
    private String resolutionSummary;
    @Column(name = "created_on")
    private Date createdOn;
    @Column(name = "created_by")
    private String createdBy;
    @Column(name = "modified_on")
    private Date modifiedOn;
    @Column(name = "modified_by")
    private String modifiedBy;

    public Issue(String issueSummary, String identifiedByPersonId, Date identifiedDate, int relatedProject,
                 String status, Date createdOn, String createdBy, Date modifiedOn, String modifiedBy) {
        this.issueSummary = issueSummary;
        this.identifiedByPersonId = identifiedByPersonId;
        this.identifiedDate = identifiedDate;
        this.relatedProject = relatedProject;
        this.status = status;
        this.createdOn = createdOn;
        this.createdBy = createdBy;
        this.modifiedOn = modifiedOn;
        this.modifiedBy = modifiedBy;
    }

    public Issue() {
    }

    public int getIssueId() {
        return issueId;
    }

    public String getIssueSummary() {
        return issueSummary;
    }

    public void setIssueSummary(String issueSummary) {
        this.issueSummary = issueSummary;
    }

    public String getIssueDescription() {
        return issueDescription;
    }

    public void setIssueDescription(String issueDescription) {
        this.issueDescription = issueDescription;
    }

    public String getIdentifiedByPersonId() {
        return identifiedByPersonId;
    }

    public void setIdentifiedByPersonId(String identifiedByPersonId) {
        this.identifiedByPersonId = identifiedByPersonId;
    }

    public Date getIdentifiedDate() {
        return identifiedDate;
    }

    public void setIdentifiedDate(Date identifiedDate) {
        this.identifiedDate = identifiedDate;
    }

    public Integer getRelatedProject() {
        return relatedProject;
    }

    public void setRelatedProject(Integer relatedProject) {
        this.relatedProject = relatedProject;
    }

    public Integer getAssignedTo() {
        return assignedTo;
    }

    public void setAssignedTo(Integer assignedTo) {
        this.assignedTo = assignedTo;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getPriority() {
        return priority;
    }

    public void setPriority(String priority) {
        this.priority = priority;
    }

    public Date getTargetResolutionDate() {
        return targetResolutionDate;
    }

    public void setTargetResolutionDate(Date targetResolutionDate) {
        this.targetResolutionDate = targetResolutionDate;
    }

    public String getProgress() {
        return progress;
    }

    public void setProgress(String progress) {
        this.progress = progress;
    }

    public Date getActualResolutionDate() {
        return actualResolutionDate;
    }

    public void setActualResolutionDate(Date actualResolutionDate) {
        this.actualResolutionDate = actualResolutionDate;
    }

    public String getResolutionSummary() {
        return resolutionSummary;
    }

    public void setResolutionSummary(String resolutionSummary) {
        this.resolutionSummary = resolutionSummary;
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
