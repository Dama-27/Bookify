package com.example.Book.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ServiceDateTimeDTO {

    private Long serviceDateTimeId;
    private String startTime;
    private String endTime;
    private Integer duration;
    private String date;
}
