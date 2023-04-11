package io.github.mattbelsky.issuetracker.repository;

import io.github.mattbelsky.issuetracker.model.Person;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import java.util.List;

@RepositoryRestResource(collectionResourceRel = "people", path = "people")
public interface PersonRepository extends CrudRepository<Person, Integer> {

    List<Person> findByPersonName(String name);
}
