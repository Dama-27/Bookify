package com.example.Book.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.Book.model.ServiceProvider;
import com.example.Book.service.UserService;

import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/service-provider")
public class ServiceProviderController {
    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody ServiceProvider serviceProvider) {
        ServiceProvider provider = new ServiceProvider(
            serviceProvider.getUsername(), 
            serviceProvider.getEmail(), 
            serviceProvider.getPassword().equals(serviceProvider.getConfirmPassword())? serviceProvider.getPassword() : null,
            serviceProvider.getConfirmPassword(),
            serviceProvider.getCategory()
    );
        userService.registerServiceProvider(provider);
        return ResponseEntity.ok("Service Provider registered successfully!");
    }
}