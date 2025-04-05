package com.example.Book.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.time.LocalDateTime;

@CrossOrigin(origins = "http://localhost:3001")
@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "service_date_time")
public class ServiceDateTime {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long serviceDateTimeId;
    private String date;
    private LocalDateTime startTime;
    private LocalDateTime EndTime;
    private Integer duration;

    @ManyToOne
    @JoinColumn(name = "service_id", nullable = false)
    private Services services;
}
