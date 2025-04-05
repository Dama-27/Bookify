package com.example.Book.AuthTest;

import com.example.Book.controller.AuthController;
import com.example.Book.dto.MessageResponse;
import com.example.Book.dto.PasswordResetRequest;
import com.example.Book.model.Consumer;
import com.example.Book.model.ServiceProvider;
import com.example.Book.service.UserService;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayNameGeneration;
import org.junit.jupiter.api.DisplayNameGenerator;
import org.junit.jupiter.api.Test;
import org.mockito.*;
import org.springframework.http.ResponseEntity;

import java.util.*;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@DisplayNameGeneration(DisplayNameGenerator.ReplaceUnderscores.class)
public class AuthControllerTest {
    @InjectMocks
    private AuthController authController;

    @Mock
    private UserService userService;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testRegisterProvider_Success() {
        ServiceProvider provider = new ServiceProvider();
        when(userService.registerServiceProvider(provider)).thenReturn("Registration successful");

        ResponseEntity<String> response = authController.registerProvider(provider);

        assertEquals(200, response.getStatusCodeValue());
        assertEquals("Registration successful", response.getBody());
    }

    @Test
    public void testRegisterProvider_Failure() {
        ServiceProvider provider = new ServiceProvider();
        when(userService.registerServiceProvider(provider)).thenThrow(new RuntimeException("Email already exists"));

        ResponseEntity<String> response = authController.registerProvider(provider);

        assertEquals(400, response.getStatusCodeValue());
        assertTrue(response.getBody().contains("Registration failed"));
    }

    @Test
    public void testRegisterConsumer_Success() {
        Consumer consumer = new Consumer();
        when(userService.registerConsumer(consumer)).thenReturn("Consumer registered");

        ResponseEntity<String> response = authController.registerConsumer(consumer);

        assertEquals(200, response.getStatusCodeValue());
        assertEquals("Consumer registered", response.getBody());
    }

    @Test
    public void testLogin_Success() {
        Map<String, String> credentials = new HashMap<>();
        credentials.put("email", "test@example.com");
        credentials.put("password", "password123");

        Map<String, Object> mockResponse = new HashMap<>();
        mockResponse.put("token", "abc123");
        mockResponse.put("userData", new HashMap<>());
        mockResponse.put("role", "consumer");

        when(userService.loginUser("test@example.com", "password123")).thenReturn(mockResponse);

        ResponseEntity<Map<String, Object>> response = authController.login(credentials);

        assertEquals(200, response.getStatusCodeValue());
        assertEquals("Bearer abc123", response.getBody().get("token"));
        assertEquals("consumer", response.getBody().get("role"));
    }

    @Test
    public void testLogin_Failure() {
        Map<String, String> credentials = new HashMap<>();
        credentials.put("email", "wrong@example.com");
        credentials.put("password", "wrongpass");

        when(userService.loginUser("wrong@example.com", "wrongpass"))
                .thenThrow(new RuntimeException("Invalid credentials"));

        ResponseEntity<Map<String, Object>> response = authController.login(credentials);

        assertEquals(401, response.getStatusCodeValue());
        assertEquals("Invalid credentials", response.getBody().get("error"));
    }

    @Test
    public void testResetPassword_Success() {
        PasswordResetRequest request = new PasswordResetRequest("user@example.com", "oldPass", "newPass");
        when(userService.resetPassword("user@example.com", "oldPass", "newPass")).thenReturn("Password changed");

        ResponseEntity<MessageResponse> response = authController.resetPassword(request);

        assertEquals(200, response.getStatusCodeValue());
        assertEquals("Password changed", response.getBody().getMessage());
    }

    @Test
    public void testResetPassword_Failure() {
        PasswordResetRequest request = new PasswordResetRequest("user@example.com", "oldPass", "newPass");
        when(userService.resetPassword("user@example.com", "oldPass", "newPass"))
                .thenThrow(new RuntimeException("Incorrect old password"));

        ResponseEntity<MessageResponse> response = authController.resetPassword(request);

        assertEquals(400, response.getStatusCodeValue());
        assertEquals("Incorrect old password", response.getBody().getMessage());
    }
}
