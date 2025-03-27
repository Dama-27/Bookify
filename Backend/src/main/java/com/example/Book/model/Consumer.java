package com.example.Book.model;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;


@CrossOrigin(origins = "http://localhost:3000")
@Entity
@Table(name = "consumers")
public class Consumer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long consumer_id;

    @Column(unique = true, length = 50)
    private String username;

    @Column(nullable = false, unique = true, length = 50)
    private String email;

    private String phone;
    private String address;
    private String status;

    @Column(nullable = false, length = 64)
    private String password;

    @Column(columnDefinition = "TEXT")
    private String notes;

    @OneToMany(mappedBy = "client", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Booking> bookings;


    @OneToMany(mappedBy = "client")
    private List<Notification> notifications;

    @OneToMany(mappedBy = "groupLeader")
    private List<GroupBooking> ledGroups;

    @OneToMany(mappedBy = "client")
    private List<Feedback> feedbacks;

    public Consumer() {}

    public Consumer(String username, String email, String password, String confirmPassword, String phone, String address, String status, String notes, List<Booking> bookings) {
        this.username = username;
        this.email = email;
        this.password = password;
        this.phone = phone;
        this.address = address;
        this.status = status;
        this.notes = notes;
        this.bookings = bookings;
    }

    // Getters and Setters
    public String getUsername() { return username; } 
    public void setUsername(String username) { this.username = username; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }
    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }
    public String getAddress() { return address; }
    public void setAddress(String address) { this.address = address; }
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
    public String getNotes() { return notes; }
    public void setNotes(String notes) { this.notes = notes; }
    
    public Long getConsumer_id() { return consumer_id; }
    public void setConsumer_id(Long consumer_id) { this.consumer_id = consumer_id; }
    
    public List<Booking> getBookings() { return bookings; }
    public void setBookings(List<Booking> bookings) { this.bookings = bookings; }
    
    public List<Notification> getNotifications() { return notifications; }
    public void setNotifications(List<Notification> notifications) { this.notifications = notifications; }
    
    public List<GroupBooking> getLedGroups() { return ledGroups; }
    public void setLedGroups(List<GroupBooking> ledGroups) { this.ledGroups = ledGroups; }
    
    public List<Feedback> getFeedbacks() { return feedbacks; }
    public void setFeedbacks(List<Feedback> feedbacks) { this.feedbacks = feedbacks; }
}