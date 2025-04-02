package com.example.Book.model;

import java.time.LocalDateTime;
import java.util.Date;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "feedback")
public class Feedback {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long feedbackId;

    // Link to the Consumer (client_id)
    @ManyToOne
    @JoinColumn(name = "client_id", nullable = false) // Ensure column name matches database
    private Consumer consumer;

    // Link to the Booking (booking_id)
    @ManyToOne
    @JoinColumn(name = "booking_id", nullable = false) // Ensure column name matches database
    private Booking booking;

    @Column(columnDefinition = "TEXT")
    private String comments;

    private int rating;

    @Temporal(TemporalType.TIMESTAMP)
    private Date responseDate = new Date();

    public Feedback() {
    }

    public Feedback(Consumer consumer, Booking booking, String comments, int rating) {
        this.consumer = consumer;
        this.booking = booking;
        this.comments = comments;
        this.rating = rating;
        this.responseDate = new Date();
    }

    // Getters and Setters
    public Long getFeedbackId() {
        return feedbackId;
    }

    public void setFeedbackId(Long feedbackId) {
        this.feedbackId = feedbackId;
    }

    public Consumer getConsumer() {
        return consumer;
    }

    public void setConsumer(Consumer consumer) {
        this.consumer = consumer;
    }

    public Booking getBooking() {
        return booking;
    }

    public void setBooking(Booking booking) {
        this.booking = booking;
    }

    public String getComments() {
        return comments;
    }

    public void setComments(String comments) {
        this.comments = comments;
    }

    public int getRating() {
        return rating;
    }

    public void setRating(int rating) {
        this.rating = rating;
    }

    public Date getResponseDate() {
        return responseDate;
    }

    public void setResponseDate(Date responseDate) {
        this.responseDate = responseDate;
    }
}
