package io.github.mattbelsky.issuetracker.security;

public enum Permission {

    PERSON_CREATE, PERSON_READ, PERSON_UPDATE, PERSON_DELETE,
    PROJECT_CREATE, PROJECT_READ, PROJECT_UPDATE, PROJECT_DELETE,
    ISSUE_CREATE, ISSUE_READ, ISSUE_UPDATE, ISSUE_DELETE,
    // A role with this permission can be assigned a project.
    ASSIGNED_PROJECT;
}
