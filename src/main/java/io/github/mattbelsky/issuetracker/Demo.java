package io.github.mattbelsky.issuetracker;

import io.github.mattbelsky.issuetracker.model.Issue;
import io.github.mattbelsky.issuetracker.model.Person;
import io.github.mattbelsky.issuetracker.model.Project;
import io.github.mattbelsky.issuetracker.repository.IssueRepository;
import io.github.mattbelsky.issuetracker.repository.PersonRepository;
import io.github.mattbelsky.issuetracker.repository.ProjectRespository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.sql.Date;
import java.util.List;

@Component
public class Demo implements CommandLineRunner {

    Logger logger = LoggerFactory.getLogger(Demo.class);
    private final IssueRepository issueRepository;
    private final PersonRepository personRepository;
    private final ProjectRespository projectRespository;

    @Autowired
    public Demo(IssueRepository issueRepository, PersonRepository personRepository, ProjectRespository projectRespository) {
        this.issueRepository = issueRepository;
        this.personRepository = personRepository;
        this.projectRespository = projectRespository;
    }

    @Override
    public void run(String... args) throws Exception {
//        loadDatabase();
        Iterable<Issue> issues = issueRepository.findAll();
        issues.forEach(p -> logger.info("id: " + p.getIssueId() + "; summary: " + p.getIssueSummary() +
                "; project: " + p.getRelatedProject()));
//        List<Integer> nums = issueRepository.findDaysLeftToResolveByPerson(8);
//        nums.forEach(n -> logger.info("days left to resolve: " + n));
    }

    private void loadDatabase() {
        // people
        Person p1 = new Person("Mike Holliday", "mholliday@evilemail.com", "manager",
                "mholliday", new Date(System.currentTimeMillis()), "Mike Holliday",
                new Date(System.currentTimeMillis()), "Mike Holliday");
        Person p2 = new Person("Max Power", "mpower@evilemail.com", "team member",
                "mpower", new Date(System.currentTimeMillis()), "Mike Holliday",
                new Date(System.currentTimeMillis()), "Mike Holliday");
        Person p3 = new Person("Midge Simpson", "msimpson@evilemail.com", "team member",
                "msimpson", new Date(System.currentTimeMillis()), "Mike Holliday",
                new Date(System.currentTimeMillis()), "Mike Holliday");
        personRepository.save(p1);
        personRepository.save(p2);
        personRepository.save(p3);

        // projects
        Project pr1 = new Project("Project 1", new Date(System.currentTimeMillis()), new Date(System.currentTimeMillis()+100000l),
                new Date(System.currentTimeMillis()), "Mike Holliday", new Date(System.currentTimeMillis()),
                "Mike Holliday");
        Project pr2 = new Project("Project 2", new Date(System.currentTimeMillis()), new Date(System.currentTimeMillis()+100000l),
                new Date(System.currentTimeMillis()), "Mike Holliday", new Date(System.currentTimeMillis()),
                "Mike Holliday");
        Project pr3 = new Project("Project 3", new Date(System.currentTimeMillis()), new Date(System.currentTimeMillis()+100000l),
                new Date(System.currentTimeMillis()), "Mike Holliday", new Date(System.currentTimeMillis()),
                "Mike Holliday");
        projectRespository.save(pr1);
        projectRespository.save(pr2);
        projectRespository.save(pr3);
    }
}
