package com.example.Book.controller;

import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.example.Book.service.FileUploadService;
import com.example.Book.service.JWTService;
import com.example.Book.repo.ConsumerRepository;
import com.example.Book.model.Consumer;

@RestController
@RequestMapping("/api/upload")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class FileUploadController {

    private static final Logger logger = LoggerFactory.getLogger(FileUploadController.class);

    @Autowired
    private FileUploadService fileUploadService;

    @Autowired
    private JWTService jwtService;

    @Autowired
    private ConsumerRepository consumerRepository;

    @PostMapping("/profile-image")
    public ResponseEntity<?> uploadProfileImage(
            @RequestHeader("Authorization") String token,
            @RequestParam("file") MultipartFile file,
            @RequestParam("userId") Long userId) {
        try {
            logger.info("Processing request: POST /api/upload/profile-image");
            logger.info("Received token: {}", token);
            
            // Validate token
            if (token == null || token.isEmpty()) {
                logger.error("No token provided");
                return ResponseEntity.status(401).body(Map.of("message", "No token provided"));
            }

            if (!token.startsWith("Bearer ")) {
                logger.error("Invalid token format - missing Bearer prefix");
                return ResponseEntity.status(401).body(Map.of("message", "Invalid token format"));
            }

            String actualToken = token.substring(7); // Remove "Bearer " prefix
            logger.info("Validating token: {}", actualToken);

            try {
                String email = jwtService.extractUserName(actualToken);
                if (email == null) {
                    logger.error("Failed to extract email from token");
                    return ResponseEntity.status(401).body(Map.of("message", "Invalid token"));
                }

                // Verify user exists and token matches user
                Consumer consumer = consumerRepository.findById(userId)
                    .orElseThrow(() -> new RuntimeException("User not found"));
                
                if (!consumer.getEmail().equals(email)) {
                    logger.error("Token email does not match user email");
                    return ResponseEntity.status(403).body(Map.of("message", "Unauthorized access"));
                }

                String imageUrl = fileUploadService.uploadFile(file);
                logger.info("File uploaded successfully for user: {}", email);

                // Update user's profile image in database
                consumer.setProfileImage(imageUrl);
                consumerRepository.save(consumer);
                logger.info("User profile updated with new image URL");

                return ResponseEntity.ok(Map.of("imageUrl", imageUrl));
            } catch (Exception e) {
                logger.error("Token validation error: {}", e.getMessage());
                return ResponseEntity.status(401).body(Map.of("message", "Invalid token format: " + e.getMessage()));
            }
        } catch (Exception e) {
            logger.error("Error during file upload: {}", e.getMessage(), e);
            return ResponseEntity.badRequest().body(Map.of("message", "Failed to upload image: " + e.getMessage()));
        }
    }
} 