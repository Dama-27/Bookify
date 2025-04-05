package com.example.Book.ReminderTest;

import com.example.Book.controller.ReminderController;
import com.example.Book.model.Booking;
import com.example.Book.model.Reminder;
import com.example.Book.service.ReminderService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.http.ResponseEntity;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

public class ReminderControllerTest {

    @Mock
    private ReminderService reminderService;

    @InjectMocks
    private ReminderController reminderController;

    @BeforeEach
    public void setUp() {
        // Initialize Mockito annotations
        org.mockito.MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testGetAllReminders_Success() {
        // Arrange
        Booking booking = new Booking();
        booking.setBookingId(1L);  // Set the Booking ID (Long)

        // Create the first Reminder
        Reminder reminder1 = new Reminder();
        reminder1.setReminderId(1);
        reminder1.setBooking(booking);
        reminder1.setDescription("Test Reminder");
        reminder1.setReminderDateTime(LocalDateTime.of(2025, 5, 1, 10, 0));
        reminder1.setStatus("Pending");

        // Create the second Reminder
        Reminder reminder2 = new Reminder();
        reminder2.setReminderId(2);
        reminder2.setBooking(booking);
        reminder2.setDescription("Another Reminder");
        reminder2.setReminderDateTime(LocalDateTime.of(2025, 5, 2, 11, 0));
        reminder2.setStatus("Inactive");

        // Create a list of reminders
        List<Reminder> reminders = Arrays.asList(reminder1, reminder2);

        // Mock the service call to return the list of reminders
        when(reminderService.getAllReminders()).thenReturn(reminders);

        // Act
        ResponseEntity<List<Reminder>> response = reminderController.getAllReminders();

        // Assert
        assertEquals(200, response.getStatusCodeValue());  // Check if the status code is 200 OK
        assertEquals(2, response.getBody().size());  // Ensure two reminders are returned
        assertEquals("Test Reminder", response.getBody().get(0).getDescription());  // Verify the first reminder's description
        assertEquals("Another Reminder", response.getBody().get(1).getDescription());  // Verify the second reminder's description
    }

    @Test
    public void testGetReminderById_Success() {
        // Arrange
        Booking booking = new Booking();
        booking.setBookingId(1L);  // Set the Booking ID (Long)

        Reminder reminder = new Reminder();
        reminder.setReminderId(1);
        reminder.setBooking(booking);
        reminder.setDescription("Test Reminder");
        reminder.setReminderDateTime(LocalDateTime.of(2025, 5, 1, 10, 0));
        reminder.setStatus("Pending");

        // Mock the service call to return the reminder
        when(reminderService.getReminderById(1)).thenReturn(reminder);

        // Act
        ResponseEntity<Reminder> response = reminderController.getReminderById(1);

        // Assert
        assertEquals(200, response.getStatusCodeValue());  // Check if the status code is 200 OK
        assertEquals("Test Reminder", response.getBody().getDescription());  // Verify the reminder's description
    }

    @Test
    public void testCreateReminder_Success() {
        // Arrange
        Booking booking = new Booking();
        booking.setBookingId(1L);  // Set the Booking ID (Long)

        Reminder reminder = new Reminder();
        reminder.setReminderId(1);
        reminder.setBooking(booking);
        reminder.setDescription("Test Reminder");
        reminder.setReminderDateTime(LocalDateTime.of(2025, 5, 1, 10, 0));
        reminder.setStatus("Pending");

        // Mock the service call to return the created reminder
        when(reminderService.createReminder(reminder)).thenReturn(reminder);

        // Act
        ResponseEntity<Reminder> response = reminderController.createReminder(reminder);

        // Assert
        assertEquals(200, response.getStatusCodeValue());  // Check if the status code is 200 OK
        assertEquals("Test Reminder", response.getBody().getDescription());  // Verify the reminder's description
    }

    @Test
    public void testDeleteReminder_Success() {
        // Arrange
        int reminderId = 1;

        // Mock the service to do nothing when deleteReminder is called
        doNothing().when(reminderService).deleteReminder(reminderId);

        // Act
        ResponseEntity<Void> response = reminderController.deleteReminder(reminderId);

        // Assert
        assertEquals(200, response.getStatusCodeValue());  // Check if the status code is 200 OK
        verify(reminderService).deleteReminder(reminderId);  // Verify that deleteReminder was called
    }
}
