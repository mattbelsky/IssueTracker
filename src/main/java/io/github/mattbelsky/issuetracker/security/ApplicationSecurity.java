package io.github.mattbelsky.issuetracker.security;

import io.github.mattbelsky.issuetracker.model.Person;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;

import static io.github.mattbelsky.issuetracker.security.Role.MANAGER;
import static io.github.mattbelsky.issuetracker.security.Role.PROJECT_LEAD;

@Configuration
@EnableWebSecurity
public class ApplicationSecurity extends WebSecurityConfigurerAdapter {

    // spring.data.rest.base-path in application.properties is only for Spring Data REST
    @Value("${spring.data.rest.base-path}")
    private String BASE_PATH;
    private final String PEOPLE = "/people/**";
    private final String PROJECTS = "/projects/**";
    private final String ISSUES = "/issues/**";

    @Autowired
    ApplicationUserDetailsService userDetailsService;

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(this.userDetailsService).passwordEncoder(Person.PASSWORD_ENCODER);
    }

    // Configures web-based security for HTTP requests.
    @Override
    protected void configure(HttpSecurity http) throws Exception {

        http
                // If CSRF is enabled, a token must be sent with all requests, or they will be rejected.
                // Per documentation, CSRF is usually used only for users using a browser.
                .csrf().disable()
//                .csrfTokenRepository(CookieCsrfTokenRepository.withHttpOnlyFalse())
//                .and()
                .authorizeRequests()
                // People
                .antMatchers(HttpMethod.POST, BASE_PATH + PEOPLE).hasRole(MANAGER.name())
                .antMatchers(HttpMethod.GET, BASE_PATH + PEOPLE).hasAnyRole(MANAGER.name(), PROJECT_LEAD.name())
                .antMatchers(HttpMethod.PUT, BASE_PATH + PEOPLE).hasRole(MANAGER.name())
                .antMatchers(HttpMethod.DELETE, BASE_PATH + PEOPLE).hasRole(MANAGER.name())
                // Projects
                .antMatchers(HttpMethod.POST, BASE_PATH + PROJECTS).hasRole(MANAGER.name())
                .antMatchers(HttpMethod.PUT, BASE_PATH + PROJECTS).hasRole(MANAGER.name())
                .antMatchers(HttpMethod.DELETE, BASE_PATH + PROJECTS).hasRole(MANAGER.name())
                // Issues
                .antMatchers(HttpMethod.DELETE, BASE_PATH + ISSUES).hasAnyRole(MANAGER.name(), PROJECT_LEAD.name())
                // Other -- add ASSIGNED_PROJECT somehow
                .anyRequest().authenticated()
                .and()
                .formLogin() // Enables form-based authentication
                .loginPage("/login")
                .permitAll()
                .and()
                .logout()
                // Default behavior is NOT to clear cookies, apparently.
                .deleteCookies("JSESSIONID")
                // Default is "/login?success". Redirecting here seems to avoid the problem where one needs to enter
                // credentials twice to log in.
                .logoutSuccessUrl("/login");
    }
}
