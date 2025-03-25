package com.example.Book.model;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "recurring_appointment")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class RecurringAppointment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "booking_id")
    private Booking booking;

    private String frequency; // DAILY, WEEKLY, MONTHLY
    private LocalDateTime startDate;
    private LocalDateTime endDate;
    private Boolean isActive;

    @Column(name = "payment_confirmed")
    private Boolean paymentConfirmed;
}