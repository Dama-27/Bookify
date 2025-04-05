package com.example.Book.ServiceProviderTest;

import com.example.Book.controller.ServiceProviderController;
import com.example.Book.model.ServiceProvider;
import com.example.Book.repo.ServiceProviderRepository;
import com.example.Book.service.JWTService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.*;
import org.springframework.http.ResponseEntity;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.util.Map;
import java.util.Optional;

import static org.mockito.Mockito.*;
import static org.mockito.ArgumentMatchers.*;
import static org.junit.jupiter.api.Assertions.assertEquals;

public class ServiceProviderControllerTest {

    private MockMvc mockMvc;

    @Mock
    private ServiceProviderRepository serviceProviderRepository;

    @Mock
    private JWTService jwtService;

    @InjectMocks
    private ServiceProviderController serviceProviderController;

    @BeforeEach
    public void setUp() {
        // Initialize the mocks and the controller
        MockitoAnnotations.openMocks(this);
        mockMvc = MockMvcBuilders.standaloneSetup(serviceProviderController).build();
    }

    @Test
    public void testGetServiceProviderProfile_Success() {
        // Arrange
        String token = "Bearer validToken";
        String email = "provider@example.com";
        ServiceProvider serviceProvider = new ServiceProvider();
        serviceProvider.setEmail(email);
        serviceProvider.setUsername("Test Provider");
        serviceProvider.setFirstName("John");
        serviceProvider.setLastName("Doe");

        when(jwtService.extractUserName(anyString())).thenReturn(email);
        when(serviceProviderRepository.findByEmail(email)).thenReturn(Optional.of(serviceProvider));

        // Act
        ResponseEntity<?> response = serviceProviderController.getServiceProviderProfile(token);

        // Assert
        assertEquals(200, response.getStatusCodeValue());
        Map<String, Object> responseBody = (Map<String, Object>) response.getBody();
        assertEquals("Test Provider", responseBody.get("username"));
        assertEquals("provider@example.com", responseBody.get("email"));
        assertEquals("John", responseBody.get("firstName"));
        assertEquals("Doe", responseBody.get("lastName"));
    }

    @Test
    public void testGetServiceProviderProfile_TokenNotFound() {
        // Arrange
        String token = "Bearer invalidToken";
        when(jwtService.extractUserName(anyString())).thenReturn(null);

        // Act
        ResponseEntity<?> response = serviceProviderController.getServiceProviderProfile(token);

        // Assert
        assertEquals(401, response.getStatusCodeValue());
        assertEquals("Invalid token: Could not extract email", response.getBody());
    }

    @Test
    public void testUpdateServiceProviderProfile_Success() {
        // Arrange
        String token = "Bearer validToken";
        String email = "provider@example.com";
        ServiceProvider existingProvider = new ServiceProvider();
        existingProvider.setEmail(email);
        existingProvider.setUsername("Old Username");

        Map<String, Object> profileData = Map.of("username", "Updated Username", "address", "New Address");

        when(jwtService.extractUserName(anyString())).thenReturn(email);
        when(serviceProviderRepository.findByEmail(email)).thenReturn(Optional.of(existingProvider));
        when(serviceProviderRepository.save(any(ServiceProvider.class))).thenReturn(existingProvider);

        // Act
        ResponseEntity<?> response = serviceProviderController.updateServiceProviderProfile(token, profileData);

        // Assert
        assertEquals(200, response.getStatusCodeValue());
        Map<String, Object> responseBody = (Map<String, Object>) response.getBody();
        assertEquals("Updated Username", responseBody.get("username"));
        assertEquals("New Address", responseBody.get("address"));
    }

    @Test
    public void testUpdateServiceProviderProfile_ServiceProviderNotFound() {
        // Arrange
        String token = "Bearer validToken";
        String email = "provider@example.com";
        Map<String, Object> profileData = Map.of("username", "Updated Username");

        when(jwtService.extractUserName(anyString())).thenReturn(email);
        when(serviceProviderRepository.findByEmail(email)).thenReturn(Optional.empty());

        // Act
        ResponseEntity<?> response = serviceProviderController.updateServiceProviderProfile(token, profileData);

        // Assert
        assertEquals(404, response.getStatusCodeValue());
        assertEquals("Service provider not found", response.getBody());
    }

    @Test
    public void testUpdateServiceProviderProfile_InvalidToken() {
        // Arrange
        String token = "Bearer invalidToken";
        Map<String, Object> profileData = Map.of("username", "Updated Username");

        when(jwtService.extractUserName(anyString())).thenReturn(null);

        // Act
        ResponseEntity<?> response = serviceProviderController.updateServiceProviderProfile(token, profileData);

        // Assert
        assertEquals(401, response.getStatusCodeValue());
        assertEquals("Invalid token: Could not extract email", response.getBody());
    }
}
