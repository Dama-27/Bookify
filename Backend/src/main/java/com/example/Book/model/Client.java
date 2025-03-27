package com.example.Book.model;

import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name = "client")
public class Client {
    @Id
    @Column(name = "client_id", nullable = false, unique = true, length = 50)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer clientId;
    @Column(nullable = false, unique = true, length = 50)
    private String email;
    @Column(nullable = false, length = 64)
    private String password;
    @Transient
    private String confirmPassword;

    private String phone;
    private String address;
    private String status;

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

    public Client() {}

    public Client( String email, String password, String confirmPassword) {

        this.email = email;
        this.password = password;
        this.confirmPassword = confirmPassword;
    }

    // Getters and Setters

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }
    public String getConfirmPassword() { return confirmPassword; }
    public void setConfirmPassword(String confirmPassword) { this.confirmPassword = confirmPassword; }


}