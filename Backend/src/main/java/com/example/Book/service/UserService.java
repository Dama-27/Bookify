package com.example.Book.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.Book.model.Consumer;
import com.example.Book.model.ServiceProvider;
import com.example.Book.repo.ConsumerRepository;
import com.example.Book.repo.ServiceProviderRepository;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@Service
public class UserService {
    @Autowired
    private ConsumerRepository consumerRepository;
    
    @Autowired
    private ServiceProviderRepository serviceProviderRepository;
    
    @Autowired
    private JWTService jwtService;
    
    private final BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder();

    // Register Service Provider with password hashing
    public String registerServiceProvider(ServiceProvider provider) {
        Optional<ServiceProvider> exist = serviceProviderRepository.findByEmail(provider.getEmail());
        if (exist.isPresent()) {
            throw new RuntimeException("Service Provider already exists!");
        }
        try {
            provider.setPassword(bCryptPasswordEncoder.encode(provider.getPassword()));
            serviceProviderRepository.save(provider);
            return "Service Provider registered successfully!";
        } catch (Exception e) {
            throw new RuntimeException("Service Provider registration failed: " + e.getMessage());
        }
    }

    // Register Consumer with password hashing
    public String registerConsumer(Consumer consumer) {
        Optional<Consumer> exist = consumerRepository.findByEmail(consumer.getEmail());
        if (exist.isPresent()) {
            throw new RuntimeException("Email already registered!");
        }
        try {
            consumer.setPassword(bCryptPasswordEncoder.encode(consumer.getPassword()));
            consumerRepository.save(consumer);
            return "Consumer registered successfully!";
        } catch (Exception e) {
            throw new RuntimeException("Registration failed: " + e.getMessage());
        }
    }

    // Login both - verify password and return JWT token with user data
    public Map<String, Object> loginUser(String email, String password) {
        Map<String, Object> response = new HashMap<>();
        
        System.out.println("Login attempt for email: " + email);
        
        try {
            // Try to find consumer first
            Optional<Consumer> consumerOpt = consumerRepository.findByEmail(email);
            if (consumerOpt.isPresent()) {
                Consumer consumer = consumerOpt.get();
                if (bCryptPasswordEncoder.matches(password, consumer.getPassword())) {
                    String token = jwtService.generateToken(email);
                    
                    Map<String, Object> userData = new HashMap<>();
                    userData.put("id", consumer.getClient_id());
                    userData.put("email", consumer.getEmail());
                    userData.put("username", consumer.getUsername());
                    userData.put("phone", consumer.getPhone());
                    userData.put("address", consumer.getAddress());
                    userData.put("bio", consumer.getBio());
                    userData.put("notes", consumer.getNotes());
                    
                    response.put("token", token);
                    response.put("userData", userData);
                    response.put("role", "consumer");
                    return response;
                }
            }
            
            // Try to find service provider
            Optional<ServiceProvider> providerOpt = serviceProviderRepository.findByEmail(email);
            if (providerOpt.isPresent()) {
                ServiceProvider provider = providerOpt.get();
                if (bCryptPasswordEncoder.matches(password, provider.getPassword())) {
                    String token = jwtService.generateToken(email);
                    
                    Map<String, Object> userData = new HashMap<>();
                    userData.put("id", provider.getProvider_id());
                    userData.put("email", provider.getEmail());
                    userData.put("username", provider.getUsername());
                    userData.put("firstName", provider.getFirstName());
                    userData.put("lastName", provider.getLastName());
                    userData.put("contact", provider.getContact());
                    userData.put("address", provider.getAddress());
                    userData.put("bio", provider.getBio());
                    userData.put("experience", provider.getExperience());
                    userData.put("isActive", provider.getIsActive());
                    userData.put("profileImage", provider.getProfileImage());
                    
                    response.put("token", token);
                    response.put("userData", userData);
                    response.put("role", "service-provider");
                    return response;
                }
            }
            
            throw new RuntimeException("Invalid email or password");
            
        } catch (Exception e) {
            System.out.println("Login failed: " + e.getMessage());
            throw new RuntimeException("Login failed: " + e.getMessage());
        }
    }

    public Optional<?> getUserByEmail(String email) {
        Optional<Consumer> consumer = consumerRepository.findByEmail(email);
        if (consumer.isPresent()) {
            return Optional.of(consumer.get());
        }

        Optional<ServiceProvider> provider = serviceProviderRepository.findByEmail(email);
        if (provider.isPresent()) {
            return Optional.of(provider.get());
        }

        return Optional.empty();
    }

    public String resetPassword(String email, String oldPassword, String newPassword) {
        // Find service provider by email
        ServiceProvider provider = serviceProviderRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Service provider not found"));

        // Verify old password using BCrypt
        if (!bCryptPasswordEncoder.matches(oldPassword, provider.getPassword())) {
            throw new RuntimeException("Current password is incorrect");
        }

        // Hash and update new password
        provider.setPassword(bCryptPasswordEncoder.encode(newPassword));
        serviceProviderRepository.save(provider);

        return "Password updated successfully";
    }
}
