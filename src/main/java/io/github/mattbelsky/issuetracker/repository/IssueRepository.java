package io.github.mattbelsky.issuetracker.repository;

import io.github.mattbelsky.issuetracker.model.Issue;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;

import java.util.List;

public interface IssueRepository extends PagingAndSortingRepository<Issue, Integer> {

    String FIND_OVERDUE = "SELECT * FROM issues " +
            "WHERE DATE(NOW()) > target_resolution_date " +
            "AND actual_resolution_date IS NULL"; // Why does non-native query not work?
    String RECENTLY_CREATED = "3"; // Used to find projects created within the past 2 days. Should be set elsewhere.

    List<Issue> findByRelatedProject(int projectId);
    List<Issue> findByRelatedProjectAndActualResolutionDateIsNull(int projectId); // open issues by project
    List<Issue> findByAssignedToIsNull(); // issues with no one assigned
    List<String> findIssueSummaryByRelatedProject(int projectId); // summary by project
    @Query(value = FIND_OVERDUE, nativeQuery = true) // SQL query
    List<Issue> findOverdue(); // overdue issues
    @Query(value = FIND_OVERDUE + " AND related_project = ?1", nativeQuery = true)
    List<Issue> findOverdueByProject(int projectId); // overdue issues by project
    @Query(value = "SELECT * FROM issues WHERE DATEDIFF(DATE(NOW()), created_on) < " + RECENTLY_CREATED, nativeQuery = true)
    List<Issue> findRecentlyCreated();
    @Query(value = "SELECT * FROM issues WHERE MONTH(identified_date) = ?1 AND YEAR(identified_date) = ?2", nativeQuery = true)
    List<Issue> findByMonthIdentified(int month, int year);
    @Query(value = "SELECT DATEDIFF(target_resolution_date, DATE(NOW())) FROM issues " +
            "WHERE assigned_to = ?1 AND target_resolution_date IS NOT NULL", nativeQuery = true)
    List<Integer> findDaysLeftToResolveByPerson(int personId);
}
