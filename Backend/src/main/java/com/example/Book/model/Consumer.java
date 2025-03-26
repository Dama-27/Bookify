package com.example.Book.model;

import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Getter
@Setter
@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "consumers")
public class Consumer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "consumer_id")
    private Integer consumerId;
    
    @Column(nullable = false, unique = true, length = 50)
    private String username;
    
    @Column(nullable = false, unique = true, length = 50)
    private String email;
    
    @Column(nullable = false, length = 64)
    private String password;
    
    private String address;
    
    private String status;

    @Column(columnDefinition = "TEXT")
    private String notes;

    @OneToMany(mappedBy = "consumer", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Booking> bookings;


    @OneToMany(mappedBy = "consumer")
    private List<Notification> notifications;

    @OneToMany(mappedBy = "groupLeader")
    private List<GroupBooking> ledGroups;

    @OneToMany(mappedBy = "consumer")
    private List<Feedback> feedbacks;

    public Consumer(String username, String email, String password, String confirmPassword) {
        this.username = username;
        this.email = email;
        this.password = password;
    }

    // Getters and Setters
    public String getUsername() { return username; } 
    public void setUsername(String username) { this.username = username; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }
}