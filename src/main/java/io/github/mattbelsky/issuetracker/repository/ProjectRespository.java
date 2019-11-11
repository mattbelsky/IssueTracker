package io.github.mattbelsky.issuetracker.repository;

import io.github.mattbelsky.issuetracker.model.Project;
import org.springframework.data.repository.CrudRepository;

public interface ProjectRespository extends CrudRepository<Project, Integer> {
}
