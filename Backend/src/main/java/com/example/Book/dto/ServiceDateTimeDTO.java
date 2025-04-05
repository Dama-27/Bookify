package com.example.Book.dto;

import com.example.Book.model.Services;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ServiceDateTimeDTO {

    private Long serviceDateTimeId;
    private LocalDateTime startTime;
    private LocalDateTime endTime;
    private Integer duration;
    private String date;
}
