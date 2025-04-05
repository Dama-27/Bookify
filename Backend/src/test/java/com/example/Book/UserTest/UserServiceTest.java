package com.example.Book.UserTest;

import com.example.Book.model.Consumer;
import com.example.Book.model.ServiceProvider;
import com.example.Book.repo.ConsumerRepository;
import com.example.Book.repo.ServiceProviderRepository;
import com.example.Book.service.JWTService;
import com.example.Book.service.UserService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.*;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

import java.util.Map;
import java.util.Optional;

class UserServiceTest {

    @Mock
    private ServiceProviderRepository serviceProviderRepository;

    @Mock
    private ConsumerRepository consumerRepository;

    @Mock
    private JWTService jwtService;

    private UserService userService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        userService = new UserService();
        userService.serviceProviderRepository = serviceProviderRepository;
        userService.consumerRepository = consumerRepository;
        userService.jwtService = jwtService;
    }

    @Test
    void testRegisterServiceProvider_Success() {
        ServiceProvider provider = new ServiceProvider();
        provider.setEmail("provider@example.com");
        provider.setPassword("password123");

        when(serviceProviderRepository.findByEmail(provider.getEmail())).thenReturn(Optional.empty());

        String result = userService.registerServiceProvider(provider);

        assertEquals("Service Provider registered successfully!", result);
        verify(serviceProviderRepository, times(1)).save(provider);
    }

    @Test
    void testRegisterServiceProvider_AlreadyExists() {
        ServiceProvider provider = new ServiceProvider();
        provider.setEmail("provider@example.com");
        provider.setPassword("password123");

        when(serviceProviderRepository.findByEmail(provider.getEmail())).thenReturn(Optional.of(provider));

        RuntimeException exception = assertThrows(RuntimeException.class, () -> {
            userService.registerServiceProvider(provider);
        });

        assertEquals("Service Provider already exists!", exception.getMessage());
        verify(serviceProviderRepository, never()).save(provider);
    }

    @Test
    void testRegisterConsumer_Success() {
        Consumer consumer = new Consumer();
        consumer.setEmail("consumer@example.com");
        consumer.setPassword("password123");

        when(consumerRepository.findByEmail(consumer.getEmail())).thenReturn(Optional.empty());

        String result = userService.registerConsumer(consumer);

        assertEquals("Consumer registered successfully!", result);
        verify(consumerRepository, times(1)).save(consumer);
    }

    @Test
    void testRegisterConsumer_AlreadyExists() {
        Consumer consumer = new Consumer();
        consumer.setEmail("consumer@example.com");
        consumer.setPassword("password123");

        when(consumerRepository.findByEmail(consumer.getEmail())).thenReturn(Optional.of(consumer));

        RuntimeException exception = assertThrows(RuntimeException.class, () -> {
            userService.registerConsumer(consumer);
        });

        assertEquals("Email already registered!", exception.getMessage());
        verify(consumerRepository, never()).save(consumer);
    }

    @Test
    void testLoginUser_Consumer_Success() {
        Consumer consumer = new Consumer();
        consumer.setEmail("consumer@example.com");
        consumer.setPassword(new BCryptPasswordEncoder().encode("password123"));

        when(consumerRepository.findByEmail(consumer.getEmail())).thenReturn(Optional.of(consumer));
        when(jwtService.generateToken(consumer.getEmail())).thenReturn("jwt_token");

        Map<String, Object> result = userService.loginUser("consumer@example.com", "password123");

        assertNotNull(result);
        assertEquals("jwt_token", result.get("token"));
        assertEquals(consumer, result.get("userData"));
        assertEquals("consumer", result.get("role"));
    }

    @Test
    void testLoginUser_ServiceProvider_Success() {
        ServiceProvider provider = new ServiceProvider();
        provider.setEmail("provider@example.com");
        provider.setPassword(new BCryptPasswordEncoder().encode("password123"));

        when(serviceProviderRepository.findByEmail(provider.getEmail())).thenReturn(Optional.of(provider));
        when(jwtService.generateToken(provider.getEmail())).thenReturn("jwt_token");

        Map<String, Object> result = userService.loginUser("provider@example.com", "password123");

        assertNotNull(result);
        assertEquals("jwt_token", result.get("token"));
        assertEquals(provider, result.get("userData"));
        assertEquals("service-provider", result.get("role"));
    }

    @Test
    void testLoginUser_InvalidEmailOrPassword() {
        when(consumerRepository.findByEmail("consumer@example.com")).thenReturn(Optional.empty());
        when(serviceProviderRepository.findByEmail("provider@example.com")).thenReturn(Optional.empty());

        RuntimeException exception = assertThrows(RuntimeException.class, () -> {
            userService.loginUser("consumer@example.com", "wrongPassword");
        });

        assertEquals("Invalid email or password!", exception.getMessage());
    }

    @Test
    void testResetPassword_Success() {
        ServiceProvider provider = new ServiceProvider();
        provider.setEmail("provider@example.com");
        provider.setPassword(new BCryptPasswordEncoder().encode("oldPassword123"));

        when(serviceProviderRepository.findByEmail("provider@example.com")).thenReturn(Optional.of(provider));

        String result = userService.resetPassword("provider@example.com", "oldPassword123", "newPassword123");

        assertEquals("Password updated successfully", result);
        verify(serviceProviderRepository, times(1)).save(provider);
    }

    @Test
    void testResetPassword_IncorrectOldPassword() {
        ServiceProvider provider = new ServiceProvider();
        provider.setEmail("provider@example.com");
        provider.setPassword(new BCryptPasswordEncoder().encode("oldPassword123"));

        when(serviceProviderRepository.findByEmail("provider@example.com")).thenReturn(Optional.of(provider));

        RuntimeException exception = assertThrows(RuntimeException.class, () -> {
            userService.resetPassword("provider@example.com", "wrongOldPassword", "newPassword123");
        });

        assertEquals("Current password is incorrect", exception.getMessage());
        verify(serviceProviderRepository, never()).save(provider);
    }
}
