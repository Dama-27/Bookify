package com.example.Book.BookingTest;

import com.example.Book.controller.BookingController;
import com.example.Book.dto.BookingDTO;
import com.example.Book.dto.ScheduleDTO;
import com.example.Book.dto.ServiceDateTimeDTO;
import com.example.Book.dto.ServiceProviderDTO;
import com.example.Book.model.Booking;
import com.example.Book.model.Schedule;
import com.example.Book.service.BookingService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.*;
import org.springframework.http.ResponseEntity;

import java.util.*;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

public class BookingControllerTest {

    @InjectMocks
    private BookingController bookingController;

    @Mock
    private BookingService bookingService;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testGetAllBookings_Success() {
        List<Booking> mockBookings = List.of(new Booking(), new Booking());
        when(bookingService.getAllBookings()).thenReturn(mockBookings);

        ResponseEntity<?> response = bookingController.getAllBookings();

        assertEquals(200, response.getStatusCodeValue());
        assertEquals(mockBookings, response.getBody());
    }

    @Test
    public void testGetAllServiceProvidersWithServices_Success() {
        List<ServiceProviderDTO> mockProviders = List.of(new ServiceProviderDTO(), new ServiceProviderDTO());
        when(bookingService.getAllServiceProvidersWithServices()).thenReturn(mockProviders);

        ResponseEntity<?> response = bookingController.getAllServiceProvidersWithServices();

        assertEquals(200, response.getStatusCodeValue());
        assertEquals(mockProviders, response.getBody());
    }

    @Test
    public void testGetSchedulesByProviderId_Success() {
        Long providerId = 1L;
        List<ScheduleDTO> mockSchedules = List.of(new ScheduleDTO(), new ScheduleDTO());
        when(bookingService.getSchedulesByProviderId(providerId)).thenReturn(mockSchedules);

        ResponseEntity<?> response = bookingController.getSchedulesByProviderId(providerId);

        assertEquals(200, response.getStatusCodeValue());
        assertEquals(mockSchedules, response.getBody());
    }

    @Test
    public void testCreateBooking_Success() {
        BookingDTO requestDTO = new BookingDTO();
        Booking mockBooking = new Booking();
        when(bookingService.saveBooking(requestDTO)).thenReturn(mockBooking);

        ResponseEntity<?> response = bookingController.createBooking(requestDTO);

        assertEquals(201, response.getStatusCodeValue());
        assertEquals(mockBooking, response.getBody());
    }

    @Test
    public void testCreateSchedule_Success() {
        ScheduleDTO scheduleDTO = new ScheduleDTO();
        Schedule mockSchedule = new Schedule();
        when(bookingService.createSchedule(scheduleDTO)).thenReturn(mockSchedule);

        ResponseEntity<?> response = bookingController.createSchedule(scheduleDTO);

        assertEquals(201, response.getStatusCodeValue());
        assertEquals(mockSchedule, response.getBody());
    }

    @Test
    public void testGetServiceDateTimesByProviderId_Success() {
        Long providerId = 2L;
        List<ServiceDateTimeDTO> mockList = List.of(new ServiceDateTimeDTO(), new ServiceDateTimeDTO());
        when(bookingService.getServiceDateTimeByProviderId(providerId)).thenReturn(mockList);

        ResponseEntity<?> response = bookingController.getServiceDateTimesByProviderId(providerId);

        assertEquals(200, response.getStatusCodeValue());
        assertEquals(mockList, response.getBody());
    }
}
