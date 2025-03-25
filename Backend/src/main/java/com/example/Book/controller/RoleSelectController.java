package com.example.Book.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.Book.model.RoleSelect;
import com.example.Book.service.UserService;

@RestController
@RequestMapping("/api/role")
public class RoleSelectController {
    
    @Autowired
    private UserService userService;
    
    @PostMapping("/select")
    public ResponseEntity<String> selectRole(@RequestBody RoleSelect roleSelect) {
        String role = roleSelect.getRole();
        boolean updated = userService.updateUserRole(role);
        if (updated) {
            return ResponseEntity.ok("Role updated successfully");
        } else {
            return ResponseEntity.badRequest().body("Failed to update role");
        }
    }
}
