package com.example.Book.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.Book.service.UserService;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/consumer/auth")
public class ConsumerAuthController {

    @Autowired
    private UserService userService;

    // Login for Consumer
    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> login(@RequestBody Map<String, Object> credentials) {
        try {
            String email = (String) credentials.get("email");
            String password = (String) credentials.get("password");
            String role = (String) credentials.get("role");
            
            if (email == null || password == null) {
                Map<String, Object> errorResponse = new HashMap<>();
                errorResponse.put("error", "Email and password are required");
                return ResponseEntity.status(400).body(errorResponse);
            }
            
            System.out.println("Consumer login attempt for email: " + email);
            Map<String, Object> response = userService.loginUser(email, password);
            
            if (response == null || !response.containsKey("token")) {
                Map<String, Object> errorResponse = new HashMap<>();
                errorResponse.put("error", "Login failed: Invalid credentials");
                return ResponseEntity.status(401).body(errorResponse);
            }

            // Format the response to match frontend expectations
            Map<String, Object> formattedResponse = new HashMap<>();
            formattedResponse.put("token", "Bearer " + response.get("token"));
            formattedResponse.put("user", response.get("userData"));
            formattedResponse.put("role", response.get("role"));
            
            System.out.println("Consumer login successful for email: " + email);
            return ResponseEntity.ok(formattedResponse);
        } catch (Exception e) {
            System.out.println("Consumer login error: " + e.getMessage());
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("error", e.getMessage());
            return ResponseEntity.status(401).body(errorResponse);
        }
    }
} 