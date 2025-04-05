package com.example.Book.controller;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.Book.dto.BookingDTO;
import com.example.Book.dto.ScheduleDTO;
import com.example.Book.dto.ServiceDateTimeDTO;
import com.example.Book.dto.ServiceProviderDTO;
import com.example.Book.model.Booking;
import com.example.Book.model.Schedule;
import com.example.Book.service.BookingService;

@RestController
@RequestMapping("/api/booking")
@CrossOrigin(origins = "http://localhost:3000")
public class BookingController {

    private static final Logger logger = LoggerFactory.getLogger(BookingController.class);

    @Autowired
    private BookingService bookingService;

    @GetMapping("/all")
    public ResponseEntity<?> getAllBookings() {
        try {
            List<Booking> bookings = bookingService.getAllBookings();
            return ResponseEntity.ok(bookings);
        } catch (Exception e) {
            logger.error("Error fetching all bookings: ", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error fetching bookings: " + e.getMessage());
        }
    }

    @GetMapping("/providers")
    public ResponseEntity<?> getAllServiceProvidersWithServices() {
        try {
            List<ServiceProviderDTO> providers = bookingService.getAllServiceProvidersWithServices();
            return ResponseEntity.ok(providers);
        } catch (Exception e) {
            logger.error("Error fetching service providers: ", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error fetching service providers: " + e.getMessage());
        }
    }

    @GetMapping("/provider/{providerId}")
    public ResponseEntity<?> getSchedulesByProviderId(@PathVariable Long providerId) {
        try {
            List<ScheduleDTO> schedules = bookingService.getSchedulesByProviderId(providerId);
            return ResponseEntity.ok(schedules);
        } catch (Exception e) {
            logger.error("Error fetching schedules for provider {}: ", providerId, e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error fetching schedules: " + e.getMessage());
        }
    }

    @PostMapping("/addBooking")
    public ResponseEntity<?> createBooking(@RequestBody BookingDTO requestDTO) {
        try {
            Booking savedBooking = bookingService.saveBooking(requestDTO);
            return new ResponseEntity<>(savedBooking, HttpStatus.CREATED);
        } catch (Exception e) {
            logger.error("Error creating booking: ", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error creating booking: " + e.getMessage());
        }
    }

    @PostMapping("/addSchedule")
    public ResponseEntity<?> createSchedule(@RequestBody ScheduleDTO scheduleDTO) {
        try {
            Schedule savedSchedule = bookingService.createSchedule(scheduleDTO);
            return new ResponseEntity<>(savedSchedule, HttpStatus.CREATED);
        } catch (Exception e) {
            logger.error("Error creating schedule: ", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error creating schedule: " + e.getMessage());
        }
    }

    @GetMapping("/service-datetime/{providerId}")
    public ResponseEntity<?> getServiceDateTimesByProviderId(@PathVariable Long providerId) {
        try {
            List<ServiceDateTimeDTO> serviceDateTimes = bookingService.getServiceDateTimeByProviderId(providerId);
            return ResponseEntity.ok(serviceDateTimes);
        } catch (Exception e) {
            logger.error("Error fetching service date times for provider {}: ", providerId, e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error fetching service date times: " + e.getMessage());
        }
    }
}
