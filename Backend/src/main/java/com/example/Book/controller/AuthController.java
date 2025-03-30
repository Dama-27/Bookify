package com.example.Book.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.Book.model.Consumer;
import com.example.Book.model.ServiceProvider;
import com.example.Book.service.UserService;


@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private UserService userService;

    // Register Service Provider
    @PostMapping("/service-provider/register")
    public void registerProvider(@RequestBody ServiceProvider provider) {
        try {
            String result = userService.registerServiceProvider(provider);
            ResponseEntity.ok(result);
        } catch (Exception e) {
            ResponseEntity.badRequest().body("Registration failed: " + e.getMessage());
        }
    }

    // Register Consumer
    @PostMapping("/consumer/register")
    public ResponseEntity<String> registerConsumer(@RequestBody Consumer consumer) {
        try {
            String result = userService.registerConsumer(consumer);
            return ResponseEntity.ok(result);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Registration failed: " + e.getMessage());
        }
    }

    // Login for both Service Provider and Consumer
    @PostMapping("/login")
    public ResponseEntity<Map<String, String>> login(@RequestBody Map<String, String> credentials) {
        String email = credentials.get("email");
        String password = credentials.get("password");
        String token = userService.loginUser(email, password);

        if (token == null) {
            return ResponseEntity.status(401).body(Map.of("error", "Invalid credentials"));
        }

        return ResponseEntity.ok(Map.of("token", "Bearer " + token));
    }

}
