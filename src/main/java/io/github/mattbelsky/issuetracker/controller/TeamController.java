package io.github.mattbelsky.issuetracker.controller;

import io.github.mattbelsky.issuetracker.model.Issue;
import io.github.mattbelsky.issuetracker.repository.IssueRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/team")
public class TeamController {

    private final String ISSUES = "issues";

    @Autowired
    IssueRepository issueRepository;

    @PostMapping(ISSUES)
    public void saveNewIssue(@RequestBody Issue issue) {
        issueRepository.save(issue);
    }

    @GetMapping(ISSUES)
    public Iterable<Issue> getAllIssues() {
        return issueRepository.findAll();
    }

    @PutMapping(ISSUES)
    // Must include "issueId" in argument, or issue will be added as a new entry.
    public void updateIssue(@RequestBody Issue issue) {
        issueRepository.save(issue);
    }

    @DeleteMapping(ISSUES)
    public void deleteIssue(@RequestParam("id") Integer issueId) {
        issueRepository.deleteById(issueId);
    }
}
