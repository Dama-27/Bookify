package com.example.Book.model;

import jakarta.persistence.*;

@Entity
@Table(name = "service_providers")
public class ServiceProvider {
    @Id
    @Column(name = "provider_id", nullable = false, unique = true, length = 50)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer providerId;


    @Column(nullable = false, unique = true, length = 50)
    private String email;
    @Column(nullable = false, length = 64, unique = true)
    private String password;
    @Transient
    private String confirmPassword;
    private String category;

    private String name;
    private String contact;
    private String address;
    private String specialization;
    private Integer experience;
    public ServiceProvider() {}

    public ServiceProvider(String email, String password, String confirmPassword, String category) {

        this.email = email;
        this.password = password;
        this.confirmPassword = confirmPassword;
        this.category = category;
    }


    // Getters and Setters

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }
    public String getConfirmPassword() { return confirmPassword; }
    public void setConfirmPassword(String confirmPassword) { this.confirmPassword = confirmPassword; }
    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }
}
