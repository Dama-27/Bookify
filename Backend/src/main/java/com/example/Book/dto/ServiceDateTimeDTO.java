package com.example.Book.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ServiceDateTimeDTO {
    private Long serviceDateTimeId;
    private String workHoursStart;
    private String workHoursEnd;
    private Integer timePackages;
}
