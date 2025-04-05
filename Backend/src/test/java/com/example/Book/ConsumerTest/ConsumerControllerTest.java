package com.example.Book.ConsumerTest;

import com.example.Book.controller.ConsumerController;
import com.example.Book.model.Consumer;
import com.example.Book.repo.ConsumerRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.*;
import org.springframework.http.ResponseEntity;

import java.util.*;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

public class ConsumerControllerTest {

    @InjectMocks
    private ConsumerController consumerController;

    @Mock
    private ConsumerRepository consumerRepository;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testGetConsumerById_Success() {
        Long consumerId = 1L;
        Consumer mockConsumer = new Consumer();
        mockConsumer.setClient_id(consumerId);
        when(consumerRepository.findById(consumerId)).thenReturn(Optional.of(mockConsumer));

        ResponseEntity<?> response = consumerController.getConsumerById(consumerId);

        assertEquals(200, response.getStatusCodeValue());
        assertEquals(mockConsumer, response.getBody());
    }

    @Test
    public void testGetConsumerById_NotFound() {
        Long consumerId = 1L;
        when(consumerRepository.findById(consumerId)).thenReturn(Optional.empty());

        ResponseEntity<?> response = consumerController.getConsumerById(consumerId);

        assertEquals(404, response.getStatusCodeValue());
        assertTrue(((Map<String, String>) response.getBody()).get("message").contains("Consumer not found with id"));
    }

    @Test
    public void testGetConsumerByUsername_Success() {
        String username = "testUser";
        Consumer mockConsumer = new Consumer();
        mockConsumer.setUsername(username);
        when(consumerRepository.findByUsername(username)).thenReturn(Optional.of(mockConsumer));

        ResponseEntity<?> response = consumerController.getConsumerByUsername(username);

        assertEquals(200, response.getStatusCodeValue());
        assertEquals(mockConsumer, response.getBody());
    }

    @Test
    public void testGetConsumerByUsername_NotFound() {
        String username = "testUser";
        when(consumerRepository.findByUsername(username)).thenReturn(Optional.empty());

        ResponseEntity<?> response = consumerController.getConsumerByUsername(username);

        assertEquals(404, response.getStatusCodeValue());
        assertTrue(((Map<String, String>) response.getBody()).get("message").contains("Consumer not found with username"));
    }

    @Test
    public void testGetCurrentConsumer() {
        ResponseEntity<?> response = consumerController.getCurrentConsumer();

        assertEquals(401, response.getStatusCodeValue());
        assertEquals("Authentication required", response.getBody());
    }

    @Test
    public void testUpdateConsumer_Success() {
        Long consumerId = 1L;
        Consumer mockConsumer = new Consumer();
        mockConsumer.setClient_id(consumerId);
        mockConsumer.setUsername("oldUsername");
        mockConsumer.setEmail("oldEmail@example.com");

        Consumer updateDetails = new Consumer();
        updateDetails.setUsername("newUsername");
        updateDetails.setEmail("newEmail@example.com");

        when(consumerRepository.findById(consumerId)).thenReturn(Optional.of(mockConsumer));
        when(consumerRepository.save(mockConsumer)).thenReturn(mockConsumer);

        ResponseEntity<?> response = consumerController.updateConsumer(consumerId, updateDetails);

        assertEquals(200, response.getStatusCodeValue());
        Consumer updatedConsumer = (Consumer) response.getBody();
        assertEquals("newUsername", updatedConsumer.getUsername());
        assertEquals("newEmail@example.com", updatedConsumer.getEmail());
    }

    @Test
    public void testUpdateConsumer_NotFound() {
        Long consumerId = 1L;
        Consumer updateDetails = new Consumer();
        updateDetails.setUsername("newUsername");

        when(consumerRepository.findById(consumerId)).thenReturn(Optional.empty());

        ResponseEntity<?> response = consumerController.updateConsumer(consumerId, updateDetails);

        assertEquals(404, response.getStatusCodeValue());
        assertTrue(((Map<String, String>) response.getBody()).get("message").contains("Consumer not found with id"));
    }

    @Test
    public void testUpdateConsumer_Exception() {
        Long consumerId = 1L;
        Consumer updateDetails = new Consumer();
        updateDetails.setUsername("newUsername");

        when(consumerRepository.findById(consumerId)).thenThrow(new RuntimeException("Database error"));

        ResponseEntity<?> response = consumerController.updateConsumer(consumerId, updateDetails);

        assertEquals(500, response.getStatusCodeValue());
        assertTrue(((String) response.getBody()).contains("Error updating consumer"));
    }
}

