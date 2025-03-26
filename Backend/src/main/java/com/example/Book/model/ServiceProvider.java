package com.example.Book.model;

import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "service_providers")
@Data
@NoArgsConstructor
public class ServiceProvider {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "provider_id")
    private Long providerId;

    @Column(nullable = false, length = 50)
    private String username;
    
    @Column(nullable = false, unique = true, length = 50)
    private String email;
    
    @Column(nullable = false, length = 64)
    private String password;

    @Column(length = 20)
    private String contact;

    @Column(length = 255)
    private String address;

    @Column(length = 100)
    private String experience;

    @Column(length = 50)
    private String category;

    @OneToMany(mappedBy = "provider", cascade = jakarta.persistence.CascadeType.ALL)
    private List<Service> services;

    @OneToMany(mappedBy = "provider", cascade = jakarta.persistence.CascadeType.ALL)
    private List<GroupBooking> groupBookings;

    @OneToMany(mappedBy = "provider", cascade = jakarta.persistence.CascadeType.ALL)
    private List<Feedback> feedbacks;

    public ServiceProvider(String username, String email, String password, String category) {
        this.username = username;
        this.email = email;
        this.password = password;
        this.category = category;
    }

    // Getters and Setters
    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }
    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }
    
    public Long getProviderId() {
        return providerId;
    }

    public void setProviderId(Long providerId) {
        this.providerId = providerId;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }
}
