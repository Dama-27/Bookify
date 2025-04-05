package com.example.Book.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.Book.model.ServiceDateTime;
import com.example.Book.model.ServiceProvider;
import com.example.Book.model.Services;
import com.example.Book.repo.ServiceDateTimeRepository;
import com.example.Book.repo.ServiceProviderRepository;
import com.example.Book.repo.ServiceRepository;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

@RestController
@RequestMapping("/api/service-providers")
@CrossOrigin(origins = "http://localhost:3000")
public class ServiceController {

    @Autowired
    private ServiceRepository serviceRepository;

    @Autowired
    private ServiceProviderRepository serviceProviderRepository;

    @Autowired
    private ServiceDateTimeRepository serviceDateTimeRepository;

    @GetMapping("/services")
    public ResponseEntity<List<Services>> getProviderServices(@RequestHeader("Authorization") String token) {
        Long providerId = extractProviderIdFromToken(token);
        ServiceProvider provider = serviceProviderRepository.findById(providerId)
                .orElseThrow(() -> new RuntimeException("Provider not found"));
        
        List<Services> services = serviceRepository.findByProvider(provider);
        return ResponseEntity.ok(services);
    }

    @PostMapping("/services")
    public ResponseEntity<Services> createService(@RequestBody Map<String, Object> serviceData,
                                                @RequestHeader("Authorization") String token) {
        Long providerId = extractProviderIdFromToken(token);
        ServiceProvider provider = serviceProviderRepository.findById(providerId)
                .orElseThrow(() -> new RuntimeException("Provider not found"));

        // Create and save the service
        Services service = new Services();
        service.setProvider(provider);
        service.setName((String) serviceData.get("name"));
        service.setSpecialization((String) serviceData.get("specialization"));
        service.setPrice(Double.parseDouble(serviceData.get("price").toString()));
        service.setDescription((String) serviceData.get("description"));
        service.setCategory((String) serviceData.get("category"));
        
        Services savedService = serviceRepository.save(service);

        // Create and save the service date time settings
        ServiceDateTime serviceDateTime = new ServiceDateTime();
        serviceDateTime.setServices(savedService);

        @SuppressWarnings("unchecked")
        Map<String, String> workHours = (Map<String, String>) serviceData.get("workHours");
        serviceDateTime.setWorkHoursStart(workHours.get("start"));
        serviceDateTime.setWorkHoursEnd(workHours.get("end"));
        
        @SuppressWarnings("unchecked")
        Map<String, Boolean> workingDays = (Map<String, Boolean>) serviceData.get("workingDays");
        try {
            serviceDateTime.setWorkingDays(new ObjectMapper().writeValueAsString(workingDays));
        } catch (JsonProcessingException e) {
            throw new RuntimeException("Error processing working days", e);
        }
        
        serviceDateTime.setTimePackages((Integer) serviceData.get("timePackages"));
        
        serviceDateTimeRepository.save(serviceDateTime);

        return ResponseEntity.ok(savedService);
    }

    @PutMapping("/services")
    public ResponseEntity<Services> updateService(@RequestBody Map<String, Object> serviceData,
                                                @RequestHeader("Authorization") String token) {
        Long providerId = extractProviderIdFromToken(token);
        ServiceProvider provider = serviceProviderRepository.findById(providerId)
                .orElseThrow(() -> new RuntimeException("Provider not found"));

        // Find existing service for this provider
        List<Services> existingServices = serviceRepository.findByProvider(provider);
        Services service = existingServices.isEmpty() ? new Services() : existingServices.get(0);
        
        // Update service details
        service.setProvider(provider);
        service.setName((String) serviceData.get("name"));
        service.setSpecialization((String) serviceData.get("specialization"));
        service.setPrice(Double.parseDouble(serviceData.get("price").toString()));
        service.setDescription((String) serviceData.get("description"));
        service.setCategory((String) serviceData.get("category"));
        
        Services savedService = serviceRepository.save(service);

        // Update service date time settings
        ServiceDateTime serviceDateTime = serviceDateTimeRepository.findByServices(service)
                .orElseGet(() -> {
                    ServiceDateTime newServiceDateTime = new ServiceDateTime();
                    newServiceDateTime.setServices(savedService);
                    return newServiceDateTime;
                });

        @SuppressWarnings("unchecked")
        Map<String, String> workHours = (Map<String, String>) serviceData.get("workHours");
        serviceDateTime.setWorkHoursStart(workHours.get("start"));
        serviceDateTime.setWorkHoursEnd(workHours.get("end"));
        
        @SuppressWarnings("unchecked")
        Map<String, Boolean> workingDays = (Map<String, Boolean>) serviceData.get("workingDays");
        try {
            serviceDateTime.setWorkingDays(new ObjectMapper().writeValueAsString(workingDays));
        } catch (JsonProcessingException e) {
            throw new RuntimeException("Error processing working days", e);
        }
        
        serviceDateTime.setTimePackages((Integer) serviceData.get("timePackages"));
        
        serviceDateTimeRepository.save(serviceDateTime);

        return ResponseEntity.ok(savedService);
    }

    private Long extractProviderIdFromToken(String token) {
        // Implement token extraction logic here
        return 1L; // Replace with actual provider ID from token
    }
} 