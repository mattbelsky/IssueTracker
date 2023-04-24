package io.github.mattbelsky.issuetracker.security;

import java.util.HashSet;

import static io.github.mattbelsky.issuetracker.security.Permission.*;

public enum Role {
    MANAGER(PERSON_CREATE, PERSON_READ, PERSON_UPDATE, PERSON_DELETE,
            PROJECT_CREATE, PROJECT_READ, PROJECT_UPDATE, PROJECT_DELETE,
            ISSUE_CREATE, ISSUE_READ, ISSUE_UPDATE, ISSUE_DELETE),
    PROJECT_LEAD(PERSON_READ, PROJECT_READ,
            ISSUE_CREATE, ISSUE_READ, ISSUE_UPDATE, ISSUE_DELETE,
            ASSIGNED_PROJECT),
    TEAM_MEMBER(PROJECT_READ,
            ISSUE_CREATE, ISSUE_READ, ISSUE_UPDATE,
            ASSIGNED_PROJECT);

    private final HashSet<Permission> permissions;

    Role(Permission... permissions) {
        HashSet<Permission> userPermissions = new HashSet<>();
        for (Permission p :
                permissions) {
            userPermissions.add(p);
        }
        this.permissions = userPermissions;
    }

    public HashSet<Permission> getPermissions() {
        return permissions;
    }
}
