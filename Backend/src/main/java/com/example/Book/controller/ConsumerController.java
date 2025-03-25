package com.example.Book.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.Book.model.Consumer;
import com.example.Book.service.UserService;

//import org.springframework.web.bind.annotation.CrossOrigin;

//@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/consumer")
public class ConsumerController {
    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody Consumer consumerselect) {
        Consumer consumer = new Consumer(
            consumerselect.getUsername(), 
            consumerselect.getEmail(), 
            consumerselect.getPassword()
                .equals(consumerselect.getConfirmPassword())? consumerselect.getPassword() : null,
            consumerselect.getConfirmPassword()
        );
            userService.registerConsumer(consumer);
            return ResponseEntity.ok("Consumer registered successfully!");
}
}