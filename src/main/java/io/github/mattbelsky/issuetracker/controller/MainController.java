package io.github.mattbelsky.issuetracker.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

import javax.servlet.http.HttpServletResponse;

@Controller
public class MainController {

    @GetMapping("/")
    public String index(HttpServletResponse response) {
        response.setHeader("Content-Type","text/html");
        return "index";
    }
}
