package com.example.Book.model;

import java.time.LocalDateTime;
import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "booking")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Booking {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "booking_id")
    private Integer bookingId;

    @ManyToOne
    @JoinColumn(name = "consumer_id")
    private Consumer client;

    @ManyToOne
    @JoinColumn(name = "provider_id")
    private ServiceProvider serviceProvider;

    @Column(name = "booking_date_time")
    private LocalDateTime bookingDateTime;

    private String status;

    @Column(name = "special_requests", columnDefinition = "TEXT")
    private String specialRequests;

    @OneToMany(mappedBy = "booking")
    private List<Reminder> reminders;

    @OneToMany(mappedBy = "booking")
    private List<RecurringAppointment> recurringAppointments;

    @OneToMany(mappedBy = "booking")
    private List<Feedback> feedbacks;
}