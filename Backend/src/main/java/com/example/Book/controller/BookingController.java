package com.example.Book.controller;

import java.util.List;

import com.example.Book.dto.BookingDTO;
import com.example.Book.dto.ScheduleDTO;
import com.example.Book.model.Booking;
import com.example.Book.model.Schedule;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.Book.dto.ServiceProviderDTO;
import com.example.Book.service.BookingService;

@RestController
@RequestMapping("/api/booking")
@CrossOrigin(origins = "http://localhost:3000")
public class BookingController {

    @Autowired
    private BookingService bookingService;



    @GetMapping("/providers")
    public ResponseEntity<List<ServiceProviderDTO>> getAllServiceProvidersWithServices() {
        List<ServiceProviderDTO> providers = bookingService.getAllServiceProvidersWithServices();
        return ResponseEntity.ok(providers);
    }

    @GetMapping("/provider/{providerId}")
    public ResponseEntity<List<ScheduleDTO>> getSchedulesByProviderId(@PathVariable Long providerId) {
        List<ScheduleDTO> schedules = bookingService.getSchedulesByProviderId(providerId);
        return ResponseEntity.ok(schedules);
    }

    @PostMapping("/addBooking")
    public ResponseEntity<Booking> createBooking(@RequestBody BookingDTO requestDTO) {
        Booking savedBooking = bookingService.saveBooking(requestDTO);
        return new ResponseEntity<>(savedBooking, HttpStatus.CREATED);
    }

    @PostMapping("/addSchedule")
    public ResponseEntity<Schedule> createSchedule(@RequestBody ScheduleDTO scheduleDTO) {
        Schedule savedSchedule = bookingService.createSchedule(scheduleDTO);
        return new ResponseEntity<>(savedSchedule, HttpStatus.CREATED);
    }


}