package com.example.Book.model;

import java.math.BigDecimal;
import java.time.LocalTime;
import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.persistence.Transient;


@CrossOrigin(origins = "http://localhost:3000")
@Entity
@Table(name = "service_providers")
public class ServiceProvider {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long provider_id;

    @Column(unique = true, length = 50)
    private String username;

    @Column(nullable = false, unique = true, length = 50)
    private String email;
    
    @Column(nullable = false, length = 64, unique = true)
    private String password;
    @Transient
    private String category;
    private String description;
    private Integer duration;

    @Column(name = "start_time")
    private LocalTime startTime;

    @Column(name = "end_time")
    private LocalTime endTime;

    private BigDecimal price;
    private Boolean isActive;

    @OneToMany(mappedBy = "provider")
    private List<Schedule> schedules;

    @OneToMany(mappedBy = "serviceProvider")
    private List<Booking> bookings;

    public ServiceProvider() {}

    public ServiceProvider(String username, String email, String password, String confirmPassword, String category) {
        this.username = username;
        this.email = email;
        this.password = password;
        this.category = category;
    }

    // Getters and Setters
    public Long getProvider_id() { return provider_id; }
    public void setProvider_id(Long provider_id) { this.provider_id = provider_id; }
    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }
    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public BigDecimal getPrice() { return price; }
    public void setPrice(BigDecimal price) { this.price = price; }
    public Integer getDuration() { return duration; }
    public void setDuration(Integer duration) { this.duration = duration; }
    public Boolean getIsActive() { return isActive; }
    public void setIsActive(Boolean isActive) { this.isActive = isActive; }
    public LocalTime getStartTime() { return startTime; }
    public void setStartTime(LocalTime startTime) { this.startTime = startTime; }
    public LocalTime getEndTime() { return endTime; }
    public void setEndTime(LocalTime endTime) { this.endTime = endTime; }
    public List<Schedule> getSchedules() { return schedules; }
    public void setSchedules(List<Schedule> schedules) { this.schedules = schedules; }
    public List<Booking> getBookings() { return bookings; }
    public void setBookings(List<Booking> bookings) { this.bookings = bookings; }
}
