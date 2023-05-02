package io.github.mattbelsky.issuetracker.controller;

import io.github.mattbelsky.issuetracker.security.ApplicationUserDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletResponse;

@Controller
public class MainController {

    @Autowired
    ApplicationUserDetailsService userDetailsService;

    @GetMapping("/")
    public String index(HttpServletResponse response) {
        response.setHeader("Content-Type","text/html");
        return "index";
    }

    @GetMapping("login")
    public String getLogin() {
        return "login";
    }

    @GetMapping("user")
    // Annotation that indicates a method return value should be bound to the web response body.
    // Supported for annotated handler methods.
    @ResponseBody
    public User getAuthenticationPrincipal() {
        return userDetailsService.getAuthenticationPrincipal();
    }
}
