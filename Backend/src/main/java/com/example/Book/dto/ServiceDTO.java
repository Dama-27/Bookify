package com.example.Book.dto;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ServiceDTO {
    private Integer serviceId;
    private String name;
    private String specialization;
    private Integer duration;
    private Double price;
    private LocalDateTime startTime;
    private LocalDateTime endTime;
    private String date;
    private String description;
    private String category;
}