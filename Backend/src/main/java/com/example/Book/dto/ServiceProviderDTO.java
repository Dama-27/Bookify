package com.example.Book.dto;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ServiceProviderDTO {
    private Long providerId;
    private String username;
    private String email;
    private String address;
    private String contact;
    private Integer experience;
    private Boolean isActive;
    private List<ServiceDTO> services;
}
