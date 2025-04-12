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
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "feedback")
public class Feedback {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long feedbackId;

    @ManyToOne
    @JoinColumn(name = "consumer_id")
    private Consumer consumer;

    @ManyToOne
    @JoinColumn(name = "provider_id")
    private ServiceProvider serviceProvider;

    @Column(columnDefinition = "TEXT")
    private String comments;

    private int rating;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }

    public Long getConsumerId() {
        return consumer != null ? consumer.getClientId() : null;
    }

    public Long getProviderId() {
        return serviceProvider != null ? serviceProvider.getProviderId() : null;
    }

    public void setConsumerId(Long consumerId) {
        if (consumer == null) {
            consumer = new Consumer();
        }
        consumer.setClientId(consumerId);
    }

    public void setProviderId(Long providerId) {
        if (serviceProvider == null) {
            serviceProvider = new ServiceProvider();
        }
        serviceProvider.setProviderId(providerId);
    }
}
