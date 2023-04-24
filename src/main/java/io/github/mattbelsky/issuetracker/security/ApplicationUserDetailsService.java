package io.github.mattbelsky.issuetracker.security;

import io.github.mattbelsky.issuetracker.model.Person;
import io.github.mattbelsky.issuetracker.repository.PersonRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class ApplicationUserDetailsService implements UserDetailsService {

    @Autowired
    PersonRepository personRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Person person = personRepository.findByUsername(username);
        String role = person.getRole().toUpperCase().replace(" ", "_");
        UserDetails user = User.builder()
                .username(person.getUsername())
                .password(person.getPassword())
                .roles(role)
                .build();
        return user;
    }
}
